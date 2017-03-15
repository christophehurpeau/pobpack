import babelPresetEnv from 'babel-preset-env';

export default {
  presets: [
    [babelPresetEnv, {
      modules: false,
      useBuiltIns: true,
    }],
  ],

  plugins: [
  ],
};
