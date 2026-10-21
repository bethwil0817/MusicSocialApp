import type { Metadata } from "next";
import logo from "../../images/iconrev.png";
import { Residencies } from "@/src/components/Residencies";
import App from "../../components/App";
import "../../styles/globals.css";

export const metadata: Metadata = {
	title: "Artist Residencies | Revolūtiō",
	description:
		"Find an artist residency with Revolūtiō. Create meaningful work through cultural exchange, local connection, and time to focus.",
	alternates: {
		canonical: "/residencies",
	},
	openGraph: {
		title: "Artist Residencies | Revolūtiō",
		description:
			"Find an artist residency with Revolūtiō. Create meaningful work through cultural exchange, local connection, and time to focus.",
		url: "https://joinrevolutio.com/residencies",
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
		title: "Artist Residencies | Revolūtiō",
		description:
			"Find an artist residency with Revolūtiō. Create meaningful work through cultural exchange, local connection, and time to focus.",
		images: [logo.src],
	},
};

export default function NextResidenciesPage() {
	return (
		<App>
			<Residencies />
		</App>
	);
}
