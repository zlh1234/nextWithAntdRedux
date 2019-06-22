const cssLoaderConfig = require("@zeit/next-css/css-loader-config");

module.exports = (nextConfig = {}) => {
	return Object.assign({}, nextConfig, {
		webpack(config, options) {
			if (!options.defaultLoaders) {
				throw new Error(
					"This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
				);
			}

			const { dev, isServer } = options;
			const {
				cssModules,
				cssLoaderOptions,
				postcssLoaderOptions,
				lessLoaderOptions = {},
				excludes = []
			} = nextConfig;

			options.defaultLoaders.less = cssLoaderConfig(config, {
				extensions: ["less"],
				cssModules,
				cssLoaderOptions,
				postcssLoaderOptions,
				dev,
				isServer,
				loaders: [
					{
						loader: "less-loader",
						options: lessLoaderOptions
					}
				]
			});

			config.module.rules.push({
				test: /\.less$/,
				exclude: excludes,
				use: options.defaultLoaders.less
			});

			// 禁用antd的cssModules
			config.module.rules.push({
				test: /\.less$/,
				include: excludes,
				use: cssLoaderConfig(config, {
					extensions: ["less"],
					cssModules: false,
					cssLoaderOptions: {},
					dev,
					isServer,
					loaders: [
						{
							loader: "less-loader",
							options: lessLoaderOptions
						}
					]
				})
			});

			if (typeof nextConfig.webpack === "function") {
				return nextConfig.webpack(config, options);
			}

			return config;
		}
	});
};
