import babelPresetEnv from 'babel-preset-env';

export default {
  presets: [
    [babelPresetEnv, {
      // targets: { ie: 9 },
      modules: false,
      useBuiltIns: true,
    }],
  ],

  plugins: [
  ],
};
