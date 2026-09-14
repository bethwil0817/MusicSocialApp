import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// SSR is fully active now (no 'output: "export"' needed)
	turbopack: {
		rules: {
			// Tells Next.js to treat .mp4 files as static URLs
			// instead of trying to parse them as JavaScript code
			"*.mp4": {
				type: "asset",
			},
		},
	},

	webpack(config) {
		config.module.rules.push({
			// Match all popular media file extensions
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
			// Treat them exactly like Webpack's asset/resource rule (generates static URLs)
			type: "asset/resource",
			generator: {
				filename: "static/media/[name].[hash:8][ext]",
			},
		});

		return config;
	},

	// Your fallback environment variables
	env: {
		NEXT_PUBLIC_SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST || "localhost",
		NEXT_PUBLIC_SERVER_PORT: process.env.NEXT_PUBLIC_SERVER_PORT || "8001",
	},
};

export default nextConfig;
