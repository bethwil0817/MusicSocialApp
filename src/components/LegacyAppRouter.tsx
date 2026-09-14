"use client";

import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import your components using your relative or configured paths
import App, { Home } from "./App";
import About from "./About";
import Contact from "./Contact";
import Experiences from "./Experiences";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <About /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/experiences", element: <Experiences /> },
		],
	},
]);

export default function LegacyAppRouter() {
	const [mounted, setMounted] = useState(false);

	// useEffect only fires on the client side after mounting
	useEffect(() => {
		setMounted(true);
	}, []);

	// Return null on the server to prevent standard HTML hydration mismatches
	if (!mounted) return null;

	return <RouterProvider router={router} />;
}
