import type { Metadata } from "next";
import "../styles/globals.css";
import { Montserrat, Blinker } from "next/font/google";

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
	title: "Music Social App",
	description: "Built with Next.js",
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
			<body>
				{/* Next.js renders the CatchAllSPA page contents inside here */}
				{children}
			</body>
		</html>
	);
}
