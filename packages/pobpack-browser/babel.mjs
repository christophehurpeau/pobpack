import presetEnv from '@babel/preset-env';

export default function (context, opts) {
  return {
    presets: [
      [
        presetEnv,
        // pass options but force modules to false
        { ...opts, modules: false },
      ],
    ],

    plugins: [],
  };
}
