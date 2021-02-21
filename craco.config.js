const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: getThemeVariables({
            // dark: true,
            // compact: true,
            // }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
