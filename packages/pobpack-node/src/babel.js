import babelPresetLatestNode from 'babel-preset-latest-node';

export default {
  presets: [
    [
      babelPresetLatestNode,
      {
        target: 'current',
        modules: false,
        useBuiltIns: true,
      },
    ],
  ],

  plugins: [],
};
