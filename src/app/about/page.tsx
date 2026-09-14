"use client";
import { useEffect, useState } from "react";
import React from "react";
import About from "../../components/About";
import App from "../../components/App";

export default function NextAboutPage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div
				style={{
					minHeight: "100vh",
					width: "100%",
					background:
						"linear-gradient(45deg, rgb(255,246,234), rgb(255,246,234)",
				}}
			/>
		);
	}

	return (
		<App>
			<title>Home | Music Social App</title>
			<meta
				name="description"
				content="Welcome to the ultimate music social app."
			/>
			<meta
				property="og:title"
				content="Home | Music Social App"
			/>
			<About />
		</App>
	);
}
