import * as styles from "../styles/App.module.css";
import { useIsVisible } from "./App";
import Login from "./Login";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

interface FadeInImageProps {
	image: string;
}

export const FadeInImage = ({ image }: FadeInImageProps) => {
	const imageRef = useRef(null);
	const isVisible = useIsVisible(imageRef);

	return (
		<img
			ref={imageRef}
			src={image}
			style={{
				width: "100%",
				opacity: isVisible ? "1" : "0",
				transition: "opacity 0.8s ease-in-out",
			}}
		/>
	);
};
