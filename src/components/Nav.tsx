"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import revlogo from "../images/revlogoonly.png";

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
			} else {
				setShowNav(true);
			}

			timeoutRef = setTimeout(() => {
				setOriginalScroll(scrollUp);
			}, 0.5);
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
				className={`flex flex-col transition-all ease-in-out duration-200 md:hidden bg-[rgba(10,25,15,0.7)] justify-end h-15 w-full fixed top-0 right-0 z-40 px-6 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
			>
				<div>
					<div className="flex flex-row justify-between">
						<div className="mb-auto pb-1">
							<Link href="/">
								<img
									className="max-w-[90px] opacity-90"
									src={revlogo.src}
								/>
							</Link>
						</div>
						<button
							id="mobile-menu-button"
							type="button"
							className="text-[rgb(253,240,214)] w-auto bg-transparent focus:outline-none cursor-pointer justify-self-end"
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
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`bg-[rgba(10,25,15,0.7)] fixed -ml-4 top-15 text-[rgb(253,240,214)] flex-col flex p-3 w-full text-xl gap-2 rounded-b-lg transition-all ease-in-out ${showMobileMenu ? "visible opacity-100" : "hidden invisible opacity-0"}`}
					>
						<Link
							className="hover:text-[#88572c] cursor-pointer"
							id="montFont"
							href="/"
						>
							HOME
						</Link>
						<hr></hr>
						{/* <Link
							to="/destinations"
							className="hover:text-[#ffffff] cursor-pointer"
							id="montFont"
						>
							DESTINATIONS
						</Link> */}
						<Link
							href="/residencies"
							className="hover:text-[#88572c] cursor-pointer"
						>
							RESIDENCIES
						</Link>
						<Link
							href="/experiences"
							className="hover:text-[#88572c] cursor-pointer"
						>
							EXPERIENCES
						</Link>
						<Link
							href="/memberships"
							className="hover:text-[#88572c] cursor-pointer"
						>
							MEMBERSHIPS
						</Link>
						<hr></hr>
						{/* <a className="hover:text-[#ffffff] cursor-pointer">
										MEMBERSHIP
									</a> */}
						{/* <a className="hover:text-[#ffffff] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#ffffff] cursor-pointer">
										CONSULTING
									</a> */}
						{/* <a className="hover:text-[#ffffff] cursor-pointer">ARTISTS</a> */}
						<Link
							href="/contact"
							className="hover:text-[#88572c] cursor-pointer"
						>
							CONTACT/APPLY
						</Link>
						<Link
							href="/about"
							className="hover:text-[#88572c] cursor-pointer"
						>
							ABOUT
						</Link>
					</div>
				</div>
			</div>
			<div
				className={`hidden w-full md:flex transition-all duration-200 ease-in-out bg-[rgba(10,25,15,0.7)] h-20 justify-between fixed top-0 right-0 z-40 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
			>
				<div className="pl-15 mb-auto pt-2">
					<Link href="/">
						<img
							className="max-w-[110px] opacity-90"
							src={revlogo.src}
						/>
					</Link>
				</div>
				<div className="flex justify-end w-full gap-16 py-6.5">
					<div
						className="text-xl montserrat"
						onMouseOver={() => setShowExperienceNav(true)}
						onMouseOut={() => setShowExperienceNav(false)}
					>
						<div
							className={`uppercase hover:cursor-pointer ${showExperienceNav ? "text-[#88572c]" : "text-[rgb(253,240,214)] hover:text-[#88572c]"}`}
						>
							JOIN Revolūtiō
						</div>
						<div
							className={`bg-[rgba(10,25,15,0.9)] mr-10 text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg ${showExperienceNav ? "visible opacity-100" : "invisible opacity-0"}`}
						>
							{/* 
									<a className="hover:text-[#8c6e56] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										CONSULTING
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">ARTISTS</a> */}
							<Link
								href="/experiences"
								className="text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat"
							>
								EXPERIENCES
							</Link>
							<Link
								href="/residencies"
								className="text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat"
							>
								RESIDENCIES
							</Link>
							<Link
								href="/memberships"
								className="text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat"
							>
								MEMBERSHIPS
							</Link>
						</div>
					</div>
					<div
						className="text-xl montserrat"
						onMouseOver={() => setShowAboutNav(true)}
						onMouseOut={() => setShowAboutNav(false)}
					>
						<div
							className={` hover:cursor-pointer ${showAboutNav ? "text-[#88572c]" : "text-[rgb(253,240,214)] hover:text-[#88572c]"}`}
						>
							ABOUT
						</div>
						<div
							className={`bg-[rgba(10,25,15,0.9)] mr-10 text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg ${showAboutNav ? "visible opacity-100" : "invisible opacity-0"}`}
						>
							{/* <a className="hover:text-[#8c6e56] cursor-pointer">
										MEMBERSHIP
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										CONSULTING
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">ARTISTS</a> */}
							<Link
								href="/contact"
								className="text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat"
							>
								CONTACT/APPLY
							</Link>
							<Link
								href="/about"
								className="text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat"
							>
								ABOUT
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
