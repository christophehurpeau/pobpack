import babelPresetEnv from 'babel-preset-env';

export default {
  presets: [
    [babelPresetEnv, {
      targets: { node: 'current' },
      modules: false,
      useBuiltIns: true,
    }],
  ],

  plugins: [
  ],
};
