const cssWith = require('@zeit/next-css');
const lessWith = require('@zeit/next-less');
if (typeof require !== 'undefined') {
    require.extensions['.css'] = (file) => { }
    require.extensions['.less'] = (file) => { }
}
module.exports = {
    webpack (config, ...args) {
        config = cssWith({
            webpack: (config, { isServer }) => {
                if (isServer) {
                    const antStyles = /antd\/.*?\/style\/css.*?/
                    const origExternals = [...config.externals]
                    config.externals = [
                        (context, request, callback) => {
                            if (request.match(antStyles)) return callback()
                            if (typeof origExternals[0] === 'function') {
                                origExternals[0](context, request, callback)
                            } else {
                                callback()
                            }
                        },
                        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
                    ]

                    config.module.rules.unshift({
                        test: antStyles,
                        use: 'null-loader',
                    })
                }
                return config
            },
        }).webpack(config, ...args);
        config = lessWith({
            cssModules: true
        }).webpack(config, ...args);
        return config;
    }
}