const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
    stylesDir: path.join(__dirname, './src/style'),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, './src/style/vars.less'),
    themeVariables: [
        '@primary-color',
        '@secondary-color',
        '@text-color',
        '@text-color-secondary',
        '@heading-color',
        '@layout-body-background',
        '@btn-primary-bg',
        '@layout-header-background'
    ],
    indexFileName: 'index.html',
    outputFilePath: path.join(__dirname, './src/static/color.less'),
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully');
})
.catch(error => {
    console.log('Error', error);
});