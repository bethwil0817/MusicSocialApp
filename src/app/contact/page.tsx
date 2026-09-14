"use client";
import { useEffect, useState } from "react";
import React from "react";
import Contact from "../../components/Contact";
import App from "../../components/App";

export default function NextContactPage() {
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
					background: "linear-gradient(45deg, rgb(59,33,2), rgb(59,33,2))",
				}}
			/>
		);
	}

	return (
		<App>
			<Contact />
		</App>
	);
}
