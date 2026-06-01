import { useState } from "react";
import axios from "axios";
import * as styles from "../styles/App.module.css";
import { Link } from "react-router-dom";

interface LoginProps {
	login: boolean;
}

export default function App({ login }: LoginProps) {
	const [loginPage, setLoginPage] = useState(login);
	const [error, setError] = useState("");
	const [signUpFullName, setSignUpFullName] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const submitSignUp = async (e: any) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8000/signup", {
				signUpFullName,
				signUpEmail,
				signUpPassword,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const submitLogin = async (e: any) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8000/login", {
				loginEmail,
				loginPassword,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="center">
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						{error && <div className="text-red-500">{error}</div>}
						{!login && (
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Create an account
								</h1>
								<form
									className="space-y-4 md:space-y-6"
									action="POST"
								>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Your full name
										</label>
										<input
											type="text"
											name="fullName"
											id="fullName"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => setSignUpFullName(e.target.value)}
											placeholder="John Doe"
											required
											value={signUpFullName}
										/>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => setSignUpEmail(e.target.value)}
											placeholder="name@company.com"
											required
											value={signUpEmail}
										/>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => setSignUpPassword(e.target.value)}
											required
											value={signUpPassword}
										/>
									</div>
									{/* <div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Confirm password
										</label>
										<input
											type="confirm-password"
											name="confirm-password"
											id="confirm-password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required
										/>
									</div> */}
									<button
										className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
										onClick={submitSignUp}
									>
										Create an account
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Already have an account?
										<a
											onClick={() => setLoginPage(true)}
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Login here
										</a>
									</p>
								</form>
							</div>
						)}
						{login && (
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Log In
								</h1>
								<form
									className="space-y-4 md:space-y-6"
									action="POST"
								>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											onChange={(e) => setLoginEmail(e.target.value)}
											required
											value={loginEmail}
										/>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => setLoginPassword(e.target.value)}
											required
											value={loginPassword}
										/>
									</div>
									<button
										type="submit"
										className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
										onClick={submitLogin}
									>
										Create an account
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Don't have an account?
										<br />
										<a
											onClick={() => setLoginPage(false)}
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Sign up here
										</a>
									</p>
								</form>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
