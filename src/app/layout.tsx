import type { Metadata } from "next";
import "../styles/globals.css";
import { Montserrat, Blinker } from "next/font/google";
import logo from "../images/iconrev.png";

const montserratFont = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-montserrat", // This sets up a CSS variable we can use in our styles
});

const blinkerFont = Blinker({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800", "900"],
	variable: "--font-blinker", // This sets up a CSS variable we can use in our styles
});

export const metadata: Metadata = {
	metadataBase: new URL("https://joinrevolutio.com"),
	title: "Revolūtiō | Global Culture Club & Artist Residencies",
	description:
		"Discover meaningful travel, artist residencies, cultural experiences, events, and creative partnerships with Revolūtiō.",
	applicationName: "Revolūtiō",
	openGraph: {
		title: "Revolūtiō | Global Culture Club & Artist Residencies",
		description:
			"Discover meaningful travel, artist residencies, cultural experiences, events, and creative partnerships with Revolūtiō.",
		url: "https://joinrevolutio.com",
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
		title: "Revolūtiō | Global Culture Club & Artist Residencies",
		description:
			"Discover meaningful travel, artist residencies, cultural experiences, events, and creative partnerships with Revolūtiō.",
		images: [logo.src],
	},
	alternates: {
		canonical: "/",
	},
	keywords: [
		"residencies",
		"global",
		"travel",
		"consulting",
		"artists",
		"artist residencies",
		"global culture club",
		"experiences",
		"partnership",
		"business growth",
	],
	robots: {
		index: true, // Allow indexing
		follow: true, // Follow links
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${montserratFont.variable} ${blinkerFont.variable}`}
		>
			<link
				rel="icon"
				type="image"
				href={logo.src}
			/>
			<body>
				{/* Next.js renders the CatchAllSPA page contents inside here */}
				{children}
			</body>
		</html>
	);
}
