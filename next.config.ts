import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			"*.mp4": { type: "asset" },
			"*.webm": { type: "asset" },
			"*.mp3": { type: "asset" },
			"*.wav": { type: "asset" },
		},
	},

	// Keeps your media asset loaders active so your .mp4 files compile smoothly
	webpack(config) {
		config.module.rules.push({
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
			type: "asset/resource",
			generator: {
				filename: "static/media/[name].[hash:8][ext]",
			},
		});
		return config;
	},
};

export default nextConfig;
