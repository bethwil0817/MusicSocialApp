import type { Metadata } from "next";
import logo from "../../images/iconrev.png";
import Experiences from "../../components/Experiences";
import App from "../../components/App";
import "../../styles/globals.css";

export const metadata: Metadata = {
	title: "Curated Cultural Experiences | Revolūtiō",
	description:
		"Discover meaningful travel, local culture, music, food, art, and community through curated experiences with Revolūtiō.",
	alternates: {
		canonical: "/experiences",
	},
	openGraph: {
		title: "Curated Cultural Experiences | Revolūtiō",
		description:
			"Discover meaningful travel, local culture, music, food, art, and community through curated experiences with Revolūtiō.",
		url: "https://joinrevolutio.com/experiences",
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
		title: "Curated Cultural Experiences | Revolūtiō",
		description:
			"Discover meaningful travel, local culture, music, food, art, and community through curated experiences with Revolūtiō.",
		images: [logo.src],
	},
};

export default function NextExperiencesPage() {
	return (
		<App>
			<Experiences />
		</App>
	);
}
