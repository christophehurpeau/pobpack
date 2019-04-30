import { realpathSync } from 'fs';
import { resolve, dirname } from 'path';
import resolveFrom from 'resolve-from';
import findUp from 'find-up';
import { Options } from 'pobpack-types';
// with node 10.12
// import { createRequireFromPath } from 'module';
// const requireFromPwd = createRequireFromPath(process.cwd());

export default function createModuleConfig(options: Options) {
  return {
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // tsx? / jsx?
      {
        test: options.typescript ? /\.[tj]sx?$/ : /\.jsx?$/,
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
            .filter(Boolean),
          ...options.includePaths,
        ],
        loaders: [
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
