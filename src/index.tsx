import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App, { Home } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";

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

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
