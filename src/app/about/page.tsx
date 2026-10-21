import type { Metadata } from "next";
import logo from "../../images/iconrev.png";
import About from "../../components/About";
import App from "../../components/App";
import "../../styles/globals.css";

export const metadata: Metadata = {
	title: "About Revolūtiō | Global Culture Club",
	description:
		"Learn about Revolūtiō, a global culture club connecting meaningful travel, artists, local communities, and creative experiences.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "About Revolūtiō | Global Culture Club",
		description:
			"Learn about Revolūtiō, a global culture club connecting meaningful travel, artists, local communities, and creative experiences.",
		url: "https://joinrevolutio.com/about",
		siteName: "Revolūtiō",
		images: [
			{
				url: logo.src,
				width: logo.width,
				height: logo.height,
				alt: "Revolūtiō logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "About Revolūtiō | Global Culture Club",
		description:
			"Learn about Revolūtiō, a global culture club connecting meaningful travel, artists, local communities, and creative experiences.",
		images: [logo.src],
	},
};

export default function NextAboutPage() {
	return (
		<App>
			<About />
		</App>
	);
}
