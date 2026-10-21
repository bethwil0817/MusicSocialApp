import type { Metadata } from "next";
import logo from "../../images/iconrev.png";
import App from "../../components/App";
import "../../styles/globals.css";
import { Destinations } from "@/src/components/Destinations";

export default function NextExperiencesPage() {
	return (
		<App>
			<Destinations />
		</App>
	);
}
