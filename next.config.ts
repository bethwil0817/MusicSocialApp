import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
