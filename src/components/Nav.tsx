import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Nav() {
	const [showExperienceNav, setShowExperienceNav] = useState(false);
	const [showAboutNav, setShowAboutNav] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showNav, setShowNav] = useState(true);
	const [scrollUp, setScrollUp] = useState(0);
	const [originalScroll, setOriginalScroll] = useState(0);

	useEffect(() => {
		let timeoutRef: any = null;

		const handleScrollUp = () => {
			setScrollUp(window.scrollY);

			if (scrollUp > originalScroll) {
				setShowNav(false);
				console.log(scrollUp, originalScroll);
			} else {
				setShowNav(true);
			}

			timeoutRef = setTimeout(() => {
				setOriginalScroll(scrollUp);
			}, 0.5);
			console.log(scrollUp, originalScroll);
		};

		window.addEventListener("scroll", handleScrollUp, { passive: true });

		return () => {
			removeEventListener("scroll", handleScrollUp);
			if (timeoutRef) {
				clearTimeout(timeoutRef);
			}
		};
	}, [window.scrollY, scrollUp, originalScroll]);

	return (
		<div>
			<div
				className={`flex flex-col transition-all ease-in-out duration-200 md:hidden bg-[rgba(255,255,255,0.6)] justify-end h-15 w-full fixed top-0 right-0 z-40 pl-6 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
			>
				<div>
					<button
						id="mobile-menu-button"
						type="button"
						className="text-gray-700 w-auto bg-transparent focus:outline-none cursor-pointer justify-self-end"
						onClick={() => {
							setShowMobileMenu(!showMobileMenu);
						}}
					>
						<svg
							className="h-10 w-10"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					<div
						className={`bg-[rgba(255,255,255,0.6)] fixed -ml-4 top-15 text-[#88572c] flex-col flex p-3 w-full text-xl gap-2 rounded-b-lg transition-all ease-in-out ${showMobileMenu ? "visible opacity-100" : "hidden invisible opacity-0"}`}
					>
						<a
							className="hover:text-[#ffffff] cursor-pointer"
							id="montFont"
							href="/"
						>
							HOME
						</a>
						<hr></hr>
						<a
							className="hover:text-[#ffffff] cursor-pointer"
							id="montFont"
						>
							DESTINATIONS
						</a>
						{/* <a className="hover:text-[#ffffff] cursor-pointer">
										RESIDENCIES
									</a> */}
						<a
							href="/experiences"
							className="hover:text-[#ffffff] cursor-pointer"
						>
							EXPERIENCES
						</a>
						<hr></hr>
						{/* <a className="hover:text-[#ffffff] cursor-pointer">
										MEMBERSHIP
									</a> */}
						{/* <a className="hover:text-[#ffffff] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#ffffff] cursor-pointer">
										CONSULTING
									</a> */}
						{/* <a className="hover:text-[#ffffff] cursor-pointer">ARTISTS</a> */}
						<a
							href="/contact"
							className="hover:text-[#ffffff] cursor-pointer"
						>
							CONTACT/APPLY
						</a>
						<a
							href="/about"
							className="hover:text-[#ffffff] cursor-pointer"
						>
							ABOUT
						</a>
					</div>
				</div>
			</div>
			<div
				className={`hidden md:flex transition-all duration-200 ease-in-out bg-[rgba(255,255,255,0.7)] h-20 w-full gap-16 justify-end fixed top-0 right-0 z-40 p-6 pr-10 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
			>
				<div className="text-[#88572c] text-2xl">
					<a
						className="hover:cursor-pointer montserrat"
						href="/"
					>
						HOME
					</a>
				</div>
				<div
					className="text-2xl montserrat"
					onMouseOver={() => {
						setShowExperienceNav(true);
						console.log(showExperienceNav);
					}}
					onMouseLeave={() => {
						setShowExperienceNav(false);
						console.log(showExperienceNav);
					}}
				>
					<div className="text-[#88572c] hover:cursor-pointer">EXPERIENCES</div>
					<div
						className={`bg-[rgba(255,255,255,0.9)] text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg transition-all ease-in-out ${showExperienceNav ? "visible opacity-100" : "invisible opacity-0"}`}
					>
						<a
							className="hover:text-[#8c6e56] cursor-pointer"
							id="montFont"
						>
							DESTINATIONS
						</a>
						{/* <a
										className="hover:text-[#8c6e56] cursor-pointer"
										id="montFont"
									>
										RESIDENCIES
									</a> */}
						<a
							href="/experiences"
							className="hover:text-[#8c6e56] cursor-pointer"
						>
							EXPERIENCES
						</a>
					</div>
				</div>
				<div
					className="text-2xl montserrat mr-10"
					onMouseOver={() => setShowAboutNav(true)}
					onMouseOut={() => setShowAboutNav(false)}
				>
					<div className="text-[#88572c] hover:cursor-pointer">ABOUT</div>
					<div
						className={`bg-[rgba(255,255,255,0.9)] text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg ${showAboutNav ? "visible opacity-100" : "invisible opacity-0"}`}
					>
						{/* <a className="hover:text-[#8c6e56] cursor-pointer">
										MEMBERSHIP
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										CONSULTING
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">ARTISTS</a> */}
						<a
							href="/contact"
							className="hover:text-[#8c6e56] cursor-pointer"
						>
							CONTACT/APPLY
						</a>
						<a
							href="/about"
							className="hover:text-[#8c6e56] cursor-pointer"
						>
							ABOUT
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
