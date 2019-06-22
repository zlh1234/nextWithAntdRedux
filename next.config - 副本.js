const cssWith = require('@zeit/next-css');
const lessWith = require('./customConfig/withLess');
if (typeof require !== "undefined") {
    require.extensions[".less"] = (file) => { };
}
module.exports = {
    webpack (config, ...args) {
        config = cssWith().webpack(config, ...args);
        config = lessWith({
            cssModules: true,
            lessLoaderOptions: {
                javascriptEnabled: true
            },
            excludes: [/node_modules/] //指定文件不开启模块化
        }).webpack(config, ...args);
        return config;
    }
}
/**

cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: "[local]_[hash:base64:7]"
            },
 */