const nextTranslate = require("next-translate");
module.exports = nextTranslate({
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputStandalone: true,
	},
	webpack: (config, { isServer, webpack }) => {
		return config;
	},
});
