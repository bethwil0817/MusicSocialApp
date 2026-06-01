import * as styles from "../styles/App.module.css";
import Login from "./Login";
import { useLocation } from "react-router-dom";

export default function UserHome() {
	const location = useLocation();

	return <div>Hello {location.state.id} and welcome to your page</div>;
}
