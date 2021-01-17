import { realpathSync } from 'fs';
import { resolve, dirname } from 'path';
import findUp from 'find-up';
import type { Options } from 'pobpack-types';
import resolveFrom from 'resolve-from';
import type { Configuration } from 'webpack';
// with node 10.12
// import { createRequireFromPath } from 'module';
// const requireFromPwd = createRequireFromPath(process.cwd());

const ExcludesFalsy = (Boolean as unknown) as <T>(
  x: T | boolean | null | undefined,
) => x is T;

export default function createModuleConfig(
  options: Options,
): NonNullable<Configuration['module']> {
  return {
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // tsx? / jsx?
      {
        test: options.typescript ? /\.(mjs|[jt]sx?)$/ : /\.(mjs|jsx?)$/,
        include: [
          resolve(options.paths.src as string),
          ...options.includeModules
            .map((includeModule) => {
              const packageJson = findUp.sync('package.json', {
                cwd: dirname(
                  // requireFromPwd.resolve(includeModule)
                  realpathSync(resolveFrom(process.cwd(), includeModule)),
                ),
              });

              if (!packageJson) return;
              return packageJson.slice(0, -'package.json'.length);
            })
            .filter(ExcludesFalsy),
          ...options.includePaths,
        ],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              cacheDirectory: true,
              ...options.babel,
            },
          },
          ...(options.jsLoaders || []),
        ],
      },

      // other rules
      ...(options.moduleRules || []),
    ],
  };
}
