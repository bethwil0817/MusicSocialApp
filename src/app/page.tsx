"use client";
import { useEffect, useState } from "react";
import React from "react";
import App, { Home } from "../components/App";

export default function NextHomePage() {
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
						"linear-gradient(45deg, rgb(10, 25, 15), rgb(86, 109, 94))",
				}}
			/>
		);
	}

	return (
		<App>
			<Home />
		</App>
	);
}
