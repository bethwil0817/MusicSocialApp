import type { Metadata } from "next";
import logo from "../../images/iconrev.png";
import App from "../../components/App";
import "../../styles/globals.css";
import { Membership } from "@/src/components/Membership";

export const metadata: Metadata = {
	title: "Culture Club Membership | Revolūtiō",
	description:
		"Join the Revolūtiō Global Culture Club for curated experiences, travel planning, artist-led events, private performances, and cultural opportunities.",
	alternates: {
		canonical: "/memberships",
	},
	openGraph: {
		title: "Culture Club Membership | Revolūtiō",
		description:
			"Join the Revolūtiō Global Culture Club for curated experiences, travel planning, artist-led events, private performances, and cultural opportunities.",
		url: "https://joinrevolutio.com/memberships",
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
		title: "Culture Club Membership | Revolūtiō",
		description:
			"Join the Revolūtiō Global Culture Club for curated experiences, travel planning, artist-led events, private performances, and cultural opportunities.",
		images: [logo.src],
	},
};

export default function NextMembershipsPage() {
	return (
		<App>
			<Membership />
		</App>
	);
}
