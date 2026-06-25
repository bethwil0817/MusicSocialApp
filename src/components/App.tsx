import "../styles/App.module.css";
import Login from "./Login";
import UserHome from "./UserHome";
import {
	HashRouter,
	BrowserRouter,
	Routes,
	Route,
	Link,
} from "react-router-dom";
import bannerVideo from "../images/revolutiobannercompress.mp4";
import bannerVideoMobile from "../images/mobilebannercompress.mp4";
import leftMountain from "../images/leftmountain.png";
import sandy from "../images/sandyyy.png";
import arrowRight from "../images/Arrowright.png";
import arrowLeft from "../images/Arrowleft.png";
import partner from "../images/partnerwhite.png";
import culture from "../images/culturewhite.png";
import artist from "../images/artistwhite.png";
import mountains from "../images/mountains.jpg";
import dessert from "../images/dessert.jpg";
import beach from "../images/beach.jpg";
import wisco from "../images/wisco.jpg";
import location from "../images/locationIcon.png";
import saverDesktop from "../images/saverDesktopjp.jpg";
import mobileSaver from "../images/mobilesaverjp.jpg";
import airplaneVideo from "../images/Airplane.mp4";
import painter from "../images/gallery2.png";
import beachView from "../images/beachview.jpg";
import artistGuitar from "../images/artist.jpg";
import lake from "../images/lakeView.jpg";
import event from "../images/eventoverhead.jpg";
import bioPic1 from "../images/biopic.jpg";
import wavesComing from "../images/sunsetwaves.mp4";
import { Reveal } from "./Reveal";
import { useState, useEffect, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";

export default function App() {
	const [showExperienceNav, setShowExperienceNav] = useState(false);
	const [showAboutNav, setShowAboutNav] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [selectedPath, setSelectedPath] = useState("artist");
	const [world, setWorld] = useState("beach");
	const [scrollUp, setScrollUp] = useState(0);
	const [originalScroll, setOriginalScroll] = useState(0);
	const [showNav, setShowNav] = useState(true);
	const [showRLoad, setShowRLoad] = useState(true);
	const [showRevolLoad, setShowRevolLoad] = useState(false);
	const videoRef = useRef(null);

	const isInView = useInView(videoRef);

	useEffect(() => {
		document.body.style.overflow = "hidden";

		// Timer 1: Show the div after 2.5 seconds
		const showTimer = setTimeout(() => {
			setShowRLoad(false);
			setShowRevolLoad(true);
		}, 3000); // 2500 milliseconds = 2.5 seconds

		// Timer 2: Hide the div after 5 seconds total
		const hideTimer = setTimeout(() => {
			setShowRevolLoad(false);
			document.body.style.overflow = "auto";
		}, 5000); // 5000 milliseconds = 5 seconds

		// Clean up both timers to avoid memory leaks if the user navigates away
		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
		};
	}, []);

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
			}, 1);
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

	const getBg = () => {
		if (world === "beach") {
			return beach;
		} else if (world === "wisco") {
			return wisco;
		} else if (world === "mountains") {
			return mountains;
		} else if (world === "dessert") {
			return dessert;
		}
	};

	return (
		<HashRouter>
			<div
				className="w-full mx-auto"
				style={{ fontFamily: "'Montserrat', sans-serif" }}
			>
				<div
					id="container"
					className={`fixed top-0 flex transition-all duration-400 justify-center items-center bottom-0 left-0 right-0 min-h-screen bg-radial from-[rgb(10,25,15)] via-[rgb(10,25,15)] to-[rgb(33,45,37)] ${!showRLoad && !showRevolLoad ? "opacity-0 z-0" : "z-100 opacity-100"}`}
					style={{ fontFamily: "'Montserrat', sans-serif" }}
				>
					<div
						className={`absolute right-0 left-0 flex transition-all duration-200 ease-in-out flex-col items-center justify-center my-auto ${showRLoad ? "opacity-100 " : "opacity-0"}`}
					>
						<Reveal
							xVal={-500}
							delayVal={0.5}
						>
							<div className="my-8 z-101 text-5xl flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#f3e5cd] text-center uppercase">
								Revive
							</div>
						</Reveal>
						<Reveal
							xVal={-500}
							delayVal={0.7}
						>
							<div className="my-8 z-101 text-5xl flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#f3e5cd] text-center uppercase">
								Retreat
							</div>
						</Reveal>
						<Reveal
							xVal={-500}
							delayVal={0.9}
						>
							<div className="my-8 z-101 text-5xl flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#f3e5cd] text-center uppercase">
								Rethink
							</div>
						</Reveal>
						<Reveal
							xVal={-500}
							delayVal={1.2}
						>
							<div className="my-8 z-101 text-5xl flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#f3e5cd] text-center uppercase">
								Recharge
							</div>
						</Reveal>
					</div>
					<AnimatePresence>
						{showRevolLoad && (
							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 2,
								}}
								exit={{ opacity: 0, scale: 100 }}
								style={{
									position: "fixed",
									zIndex: "1001",
									top: "0",
									bottom: "0",
									right: "0",
									left: "0",
									width: "screen",
									height: "screen",
									marginTop: "auto",
									marginBottom: "auto",
									display: "flex",
								}}
							>
								<div className="my-auto w-full text-6xl lg:text-8xl gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#f3e5cd] text-center uppercase">
									Revolūtiō
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<Routes>
					<Route
						path="/login"
						element={<Login login={true} />}
					/>
					<Route
						path="/signup"
						element={<Login login={false} />}
					/>
					<Route
						path="/home"
						element={<UserHome />}
					/>
				</Routes>
				<div
					className="center text-2xl"
					style={{ fontFamily: "'Montserrat', sans-serif" }}
				>
					<div>
						<div className="block lg:hidden absolute top-0 right-0 left-0 w-full h-200">
							<video
								className="w-full h-140 sm:h-200 object-cover"
								autoPlay
								loop
								muted
								playsInline
								poster={mobileSaver}
								preload="auto"
							>
								<source
									src={bannerVideoMobile}
									type="video/mp4"
								/>
							</video>
						</div>
						<div className="hidden lg:block absolute top-0 right-0 left-0 w-full h-200">
							<video
								className="w-full h-200 object-cover"
								autoPlay
								loop
								muted
								playsInline
								poster={saverDesktop}
								preload="auto"
							>
								<source
									src={bannerVideo}
									type="video/mp4"
								/>
							</video>
						</div>
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
									<a className="hover:text-[#ffffff] cursor-pointer">
										RESIDENCIES
									</a>
									<a className="hover:text-[#ffffff] cursor-pointer">
										EXPERIENCES
									</a>
									<hr></hr>
									<a className="hover:text-[#ffffff] cursor-pointer">
										MEMBERSHIP
									</a>
									<a className="hover:text-[#ffffff] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#ffffff] cursor-pointer">
										CONSULTING
									</a>
									<a className="hover:text-[#ffffff] cursor-pointer">ARTISTS</a>
									<a className="hover:text-[#ffffff] cursor-pointer">
										CONTACT/APPLY
									</a>
									<a className="hover:text-[#ffffff] cursor-pointer">ABOUT</a>
								</div>
							</div>
						</div>
						<div
							className={`hidden md:flex transition-all duration-200 ease-in-out bg-[rgba(255,255,255,0.7)] h-20 w-full gap-16 justify-end fixed top-0 right-0 z-40 p-6 pr-10 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
						>
							<div className="text-[#88572c] text-2xl">
								<div className="hover:cursor-pointer montserrat">HOME</div>
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
								<div className="text-[#88572c] hover:cursor-pointer">
									EXPERIENCES
								</div>
								<div
									className={`bg-[rgba(255,255,255,0.9)] text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg transition-all ease-in-out ${showExperienceNav ? "visible opacity-100" : "invisible opacity-0"}`}
								>
									<a
										className="hover:text-[#8c6e56] cursor-pointer"
										id="montFont"
									>
										DESTINATIONS
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										RESIDENCIES
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
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
									<a className="hover:text-[#8c6e56] cursor-pointer">
										MEMBERSHIP
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">EVENTS</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										CONSULTING
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">ARTISTS</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">
										CONTACT/APPLY
									</a>
									<a className="hover:text-[#8c6e56] cursor-pointer">ABOUT</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-137.5 sm:mt-200">
					<div className="bg-gradient-to-b from-[rgb(10,25,15)] to-[rgb(253,240,214)] p-6 py-16 justify-center flex flex-col pb-20">
						<div className="mb-20">
							<Reveal>
								<>
									<img
										className="w-40 h-full max-h-20 object-contain mx-auto"
										src={leftMountain}
									/>
									<div className="my-6 text-4xl md:text-5xl hidden lg:flex flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#b6c7c0] text-center uppercase">
										Global Culture Club
										<div className="border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"></div>
										Artist Residency
										<div className="border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"></div>
										Community Consultancy
									</div>
									<div className="my-6 text-4xl md:text-5xl flex lg:hidden flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#b6c7c0] text-center uppercase">
										Revolūtiō Global Culture Club
										<div className="border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"></div>
										Artist Residency
										<div className="border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"></div>
										Community Consultancy
									</div>
								</>
							</Reveal>
							<Reveal delayVal={0.8}>
								<>
									<div className="text-xl md:text-2xl text-[#548868] mx-10 text-center mb-6">
										Meaningful travel, artist residencies, cultural experiences,
										events, and creative partnerships across the sea, woods,
										desert, and mountains.
									</div>
									<div className="mb-8 text-base md:text-xl text-[#d4e4da] mx-auto max-w-200 text-center">
										We personally curate local, cultural, all-inclusive
										experiences rooted in story, music, food, art, nature, and
										community.
									</div>
									<div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
										<button className="p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-white cursor-pointer">
											Plan My Experience
										</button>
										<button className="p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-white cursor-pointer">
											Explore Residencies
										</button>
										<button className="p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-white cursor-pointer">
											Join the Culture Club
										</button>
									</div>
								</>
							</Reveal>
						</div>
						<hr className="mb-20"></hr>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Reveal xVal={-200}>
								<div className="flex flex-col items-center justify-center">
									<div className="my-6 text-5xl xl:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase">
										What is Revolūtiō?
									</div>
									<div className="text-[rgb(23,57,35)] text-xl">
										A More Personal Way to <strong>Travel</strong>,{" "}
										<strong>Create</strong>, and <strong>Connect</strong>
									</div>
								</div>
							</Reveal>
							<Reveal xVal={200}>
								<div>
									<div className="border-b border-b-[rgb(31,73,45)] p-6 text-center text-xl text-[rgb(20,48,29)]">
										Revolūtiō is a <strong>global</strong> culture club for
										people who want travel to feel more <strong>human</strong>,
										more <strong>local</strong>, and more{" "}
										<strong>meaningful</strong>.
									</div>
									<div className="border-b border-b-[rgb(31,73,45)] p-6 text-center text-xl text-[rgb(20,48,29)]">
										We create curated <strong>experiences</strong> that{" "}
										<strong>connect</strong> guests with artists, hosts, chefs,
										musicians, guides, cultural workers, and communities.
									</div>
									<div className="border-b border-b-[rgb(31,73,45)] p-6 text-center text-xl text-[rgb(20,48,29)]">
										Whether you are planning a restorative retreat, an artist
										residency, a private celebration, a creative journey, or a
										deeper cultural experience, <strong>Revolūtiō</strong> helps
										design the right path for you.
									</div>
								</div>
							</Reveal>
						</div>
						{/* <div
							className="carousel border-x border-x-white flex overflow-x-hidden pointer-none"
							style={{ margin: "3rem -20rem" }}
						>
							<div className="group mr-6 gap-6 flex shrink-0 items-center jusitify-center ">
								{images.map((image, key) => {
									return (
										<img
											className="image object-cover h-[300px] md:h-[500px] basic-[300px] md:basic-[500px]"
											src={image}
											key={key}
											style={{
												width: "100%",
												flex: "0 0",
												borderRadius: "1rem",
											}}
										/>
									);
								})}
							</div>
							<div
								aria-hidden
								className="group mr-6 gap-6 flex shrink-0 items-center jusitify-center "
							>
								{images.map((image, key) => {
									return (
										<img
											className="image object-cover h-[300px] md:h-[500px] basic-[300px] md:basic-[500px]"
											src={image}
											key={key}
											style={{
												width: "100%",
												flex: "0 0",
												borderRadius: "1rem",
											}}
										/>
									);
								})}
							</div>
						</div> */}
					</div>
					<div className="bg-[rgb(253,240,214)] h-2"></div>
					<div
						className="p-6 pb-20"
						style={{
							backgroundImage: `linear-gradient(to bottom, rgba(253,240,214), rgba(253,240,214,0) 100%), url(${sandy})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					>
						<div className="flex flex-row mb-4">
							<Reveal
								className="hidden! lg:flex!"
								xVal={-200}
							>
								<img
									className="w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]"
									src={arrowRight}
								/>
							</Reveal>
							<Reveal>
								<div className="my-6 md:mx-auto lg:m-0 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase">
									Choose Your Path
								</div>
							</Reveal>
							<Reveal
								className="hidden! lg:flex!"
								xVal={200}
							>
								<img
									src={arrowLeft}
									className="w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]"
								/>
							</Reveal>
						</div>
						<div>
							<Reveal delayVal={1}>
								<div className="flex flex-col items-center justify-center mx-auto max-w-[680px] w-full">
									<div className="flex flex-nowrap items-stretch justify-center">
										<button
											className={`p-4 rounded-tl-lg transition-all border-r border-r-white ease-in-out cursor-pointer text-white duration-200
                                        ${selectedPath === "artist" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`}
											onClick={() => {
												setSelectedPath("artist");
											}}
										>
											I Am an Artist
										</button>
										<button
											className={`p-4 transition-all ease-in-out border-r border-r-white cursor-pointer text-white duration-200
                                        ${selectedPath === "join" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`}
											onClick={() => {
												setSelectedPath("join");
											}}
										>
											I Want to Join the Culture Club
										</button>
										<button
											className={`p-4 rounded-tr-lg transition-all border-r border-r-white ease-in-out cursor-pointer text-white duration-200
                                        ${selectedPath === "partner" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`}
											onClick={() => {
												setSelectedPath("partner");
											}}
										>
											I Want to Partner or Consult
										</button>
									</div>
									<div className="relative w-full p-6 rounded-b-lg bg-[#a86933]! text-white flex-col flex-grow flex items-center justify-center min-h-[600px] sm:min-h-[450px]">
										<div
											className={`absolute inset-0 justify-center flex flex-col p-6 py-4 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "artist" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
										>
											<img
												className="mx-auto"
												src={artist}
												style={{ height: "200px", width: "200px" }}
											/>
											<div className="text-xl mb-4 text-center">
												For musicians, writers, filmmakers, photographers,
												visual artists, performers, and creative entrepreneurs
												seeking space to create, connect, and share work.
											</div>
											<button className="p-2 mx-auto cursor-pointer bg-[#e7cdb6] hover:bg-white text-[#a86933] rounded-lg w-max">
												Apply for a Residency
											</button>
										</div>
										<div
											className={`absolute inset-0 justify-center flex flex-col p-6 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "join" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
										>
											<img
												className="mx-auto"
												src={culture}
												style={{ height: "200px", width: "200px" }}
											/>
											<div className="text-xl mb-4 text-center">
												For members who want ongoing access to curated
												experiences, entertainment, travel planning, events,
												artist showcases, and cultural opportunities.
											</div>
											<button className="p-2 mx-auto cursor-pointer bg-[#e7cdb6] hover:bg-white text-[#a86933] rounded-lg w-max">
												Join the Culture Club
											</button>
										</div>
										<div
											className={`absolute inset-0 justify-center flex flex-col p-6 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "partner" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
										>
											<img
												className="mx-auto"
												src={partner}
												style={{ height: "200px", width: "200px" }}
											/>
											<div className="text-xl mb-4 text-center">
												For property owners, venues, nonprofits, municipalities,
												artists, organizations, and businesses seeking
												programming, events, funding strategy, creative
												direction, or cultural development.
											</div>
											<button className="p-2 mx-auto cursor-pointer bg-[#e7cdb6] hover:bg-white text-[#a86933] rounded-lg w-max">
												Work With Revolūtiō
											</button>
										</div>
									</div>
								</div>
							</Reveal>
						</div>
					</div>
					<div
						id="container"
						className="px-1 z-30 relative py-16 bg-radial from-[rgb(10,25,15)] via-[rgb(10,25,15)] to-[rgb(86,109,94)]"
					>
						<Reveal delayVal={0.5}>
							<div className="my-6 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(187,227,200)] text-center uppercase">
								The Four Worlds
							</div>
						</Reveal>
						<hr className="text-[rgb(86,109,94)] mb-6"></hr>
						<Reveal delayVal={1}>
							<div
								className="w-full overflow-auto left-0 p-2 pb-4 md:p-6 rounded-lg max-w-[80%] h-auto min-h-[600px] sm:min-h-[500px] flex flex-col justify-center items-center mx-auto transition-all ease-in-out duration-100"
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${getBg()})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "bottom",
								}}
							>
								<div className="relative w-full flex-grow flex items-center justify-center min-h-[600px] sm:min-h-[500px]">
									<div
										className={`absolute inset-0 justify-center flex flex-col m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "beach" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
									>
										<img
											src={location}
											style={{ height: "70px", width: "auto", opacity: "0.7" }}
											loading="lazy"
										/>
										<div className="text-3xl text-white font-bold">
											Yucatán, Mexico
										</div>
										<div className="text-xl md:text-2xl text-white font-medium">
											Creative residencies, coastal retreats, cultural exchange,
											food, music, wellness, nature, and beachside experiences.
										</div>
										<div className="text-2xl text-white font-medium">
											Status: Year One Booking Focus
										</div>
									</div>
									<div
										className={`absolute inset-0 flex justify-center flex-col m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "wisco" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
									>
										<img
											src={location}
											style={{ height: "70px", width: "auto", opacity: "0.7" }}
											loading="lazy"
										/>
										<div className="text-3xl text-white font-bold">
											Phelps, Land O’ Lakes, Watersmeet, and the UP
										</div>
										<div className="text-xl md:text-2xl text-white font-medium">
											Recording retreats, rural creative economy, storytelling,
											seasonal events, forest gatherings, music, and
											community-rooted programming.
										</div>
										<div className="text-2xl text-white font-medium">
											Status: Year One Booking Focus
										</div>
									</div>
									<div
										className={`absolute inset-0 flex flex-col justify-center m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "mountains" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
									>
										<img
											src={location}
											style={{ height: "70px", width: "auto", opacity: "0.7" }}
											loading="lazy"
										/>
										<div className="text-3xl text-white font-bold">
											Guatemala
										</div>
										<div className="text-xl md:text-2xl text-white font-medium">
											Future creative retreats, cultural exchange, textiles,
											ecology, music, food, and artist residencies rooted in
											local partnership.
										</div>
										<div className="text-2xl text-white font-medium">
											Status: Year Two / In Development
										</div>
									</div>
									<div
										className={`absolute inset-0 flex flex-col justify-center m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "dessert" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`}
									>
										<img
											src={location}
											style={{ height: "70px", width: "auto", opacity: "0.7" }}
											loading="lazy"
										/>
										<div className="text-3xl text-white font-bold">
											Northern Arizona, Navajo and Hopi Land
										</div>
										<div className="text-2xl text-white font-medium">
											Locally led cultural experiences, entrepreneurship,
											storytelling, artist exchange, and creative economy
											partnerships.
										</div>
										<div className="text-2xl text-white font-medium">
											Status: Year Two / In Development
										</div>
									</div>
									<div className="flex flex-row flex-nowrap gap-10 justify-center items-center mx-auto mt-auto">
										<button
											className={`rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-5 w-5 border-white ${
												world === "beach" ? "border-8" : "border-2"
											}`}
											onClick={() => {
												if (world !== "beach") {
													setWorld("beach");
												}
											}}
										></button>
										<button
											className={`rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-5 w-5 border-white ${
												world === "wisco" ? "border-8" : "border-2"
											}`}
											onClick={() => {
												if (world !== "wisco") {
													setWorld("wisco");
												}
											}}
										></button>
										<button
											className={`rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-5 w-5 border-white ${
												world === "mountains" ? "border-8" : "border-2"
											}`}
											onClick={() => {
												if (world !== "mountains") {
													setWorld("mountains");
												}
											}}
										></button>
										<button
											className={`rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-5 w-5 border-white ${
												world === "dessert" ? "border-8" : "border-2"
											}`}
											onClick={() => {
												if (world !== "dessert") {
													setWorld("dessert");
												}
											}}
										></button>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
					<div className="relative w-full min-h-[200vh]">
						<div className="w-full sticky h-screen bg-[rgba(253,240,214,0.7)] top-0 flex items-center justify-center">
							<div className="w-full p-4 md:p-6 py-20 relative">
								<video
									className="w-full h-full md:bg-center object-right object-cover absolute top-0 right-0 z-10 opacity-50"
									playsInline
									autoPlay
									muted
									preload="auto"
									ref={videoRef}
								>
									<source
										src={airplaneVideo}
										type="video/mp4"
									/>
								</video>
								<div className="relative bg-[rgba(253,240,214,0.4)] p-7 z-20 flex h-full bg- items-center flex-col justify-between">
									<Reveal>
										<div className="my-2 md:my-6 sm:text-xl lg:text-2xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(61,105,75)] text-center uppercase">
											Your Personal Entertainment & Experience Concierge
										</div>
									</Reveal>
									<Reveal>
										<div
											id="paratitle"
											className="my-2 md:my-6 text-3xl sm:text-5xl lg:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(136,174,149)] text-center uppercase"
										>
											Global Culture Club Membership
										</div>
									</Reveal>
									<div className="mt-5 md:mt-20 flex flex-col md:flex-row items-center h-auto justify-between gap-6 text-white">
										<Reveal xVal={-200}>
											<div className="text-sm sm:text-base lg:text-xl h-full rounded-lg p-6 bg-[#1d4c397f]">
												The Revolūtiō Global Culture Club is a membership for
												people who want access to more meaningful experiences,
												local connections, artist-led events, private
												performances, curated travel, and cultural
												opportunities.
											</div>
										</Reveal>
										<Reveal xVal={200}>
											<div className="text-sm sm:text-base lg:text-xl h-full rounded-lg p-6 bg-[#1d4c397f] text-white">
												Members can receive help planning experiences, booking
												entertainment, discovering artists, joining retreats,
												accessing private events, and creating custom travel
												itineraries across Revolūtiō destinations.
											</div>
										</Reveal>
									</div>
								</div>
							</div>
						</div>
						<div
							className="z-20 sticky top-0"
							style={{ overscrollBehavior: "auto" }}
						>
							<div
								className="grid lg:grid-cols-2 bg-cover bg-linear-to-b to-[#a86933] from-[#4c3a2b] bg-no-repeat min-h-screen h-full"
								style={{
									backgroundColor: "#a86933",
									backgroundImage:
										"repeating-radial-gradient( circle at 0 0, transparent 0, #a47f5e 7px ), repeating-linear-gradient(#4c3a2b55, #4c3a2b)",
								}}
							>
								<div className="p-6 pt-20 w-full sticky top-0 h-screen flex flex-col justify-center items-center">
									<div className="flex gap-12 items-center justify-center p-6 pb-4 sm:pb-1">
										<Reveal xVal={-200}>
											<div className="whitespace-normal sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap text-2xl text-[rgb(255,228,203)]">
												<strong>Create</strong> With Purpose.
											</div>
										</Reveal>
										<Reveal xVal={200}>
											<div className="whitespace-normal sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap text-2xl text-[rgb(255,228,203)]">
												<strong>Connect</strong> With Place.
											</div>
										</Reveal>
									</div>
									<div>
										<Reveal delayVal={1}>
											<div className="mt-2 xl:mt-6 text-[30px] sm:text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
												Artist Residencies
											</div>
										</Reveal>
										<Reveal delayVal={1.1}>
											<div className="text-[rgb(255,228,203)] mt-1 m-10 items-center flex">
												Revolūtiō residencies give artists time, space, support,
												and community connection.
											</div>
										</Reveal>
										<div className="text-[rgb(251,206,165)] flex flex-col items-center">
											<Reveal delayVal={1.2}>
												<div className="text-xl sm:text-2xl mb-2 uppercase">
													Residencies may include:
												</div>
											</Reveal>
											<Reveal delayVal={1.3}>
												<div className="mt-1 m-10 text-sm sm:text-base xl:text-lg items-center flex text-[rgb(255,228,203)]">
													Lodging coordination | Creative check-ins | Local
													experiences | Performance opportunities |Workshops |
													Documentation Cultural exchange
												</div>
											</Reveal>
										</div>
										<hr className="mt-8 m-6" />
										<div className="flex flex-col">
											<Reveal delayVal={1.5}>
												<div className="text-[rgb(251,206,165)] uppercase mb-4 text-xl sm:text-2xl">
													Primary Year One residency locations:
												</div>
											</Reveal>
											<Reveal delayVal={1.6}>
												<div className="mt-1 m-10 text-[rgb(255,228,203)] text-sm sm:text-base xl:text-lg">
													<ul>
														<li>
															<strong>The Sea:</strong> Yucatán
														</li>
														<li>
															<strong>The Woods:</strong> Northern Wisconsin /
															Upper Peninsula region
														</li>
													</ul>
												</div>
											</Reveal>
										</div>
									</div>
								</div>
								<div className="lg:pt-20 w-full relative flex flex-col p-6 md:p-10 gap-10 bg-[#a47f5e90] lg:bg-linear-to-b lg:from-[#a8693355] lg:to-[#a47f5e55]">
									<img
										className="image image1 sticky z-[30] shadow-2xl shadow-[#0000006d] top-16 min-h-[150px] md:min-h-[200px] rounded-lg w-full h-auto"
										src={painter}
										loading="lazy"
									/>
									<img
										className="image image2 sticky z-[31] top-24 shadow-2xl shadow-[#0000006d] min-h-[150px] md:min-h-[200px] rounded-lg w-full h-auto ml-auto"
										src={lake}
										loading="lazy"
									/>
									<img
										className="image image3 sticky z-[32] top-36 shadow-2xl shadow-[#0000006d] min-h-[150px] md:min-h-[200px] rounded-lg w-full h-auto"
										src={artistGuitar}
										loading="lazy"
									/>
									<img
										className="image image4 sticky z-[33] top-48 shadow-2xl shadow-[#0000006d] min-h-[150px] md:min-h-[200px] rounded-lg w-full h-auto ml-auto"
										src={beachView}
										loading="lazy"
									/>
								</div>
							</div>
							<div className="relative">
								<div
									className="py-10 bg-cover bg-fixed bg-linear-to-b to-[#3d5e47] from-[#18281d] bg-no-repeat min-h-screen h-full"
									style={{
										backgroundColor: "#18281d",
										backgroundImage: `linear-gradient(rgba(10,25,15,0.6), rgba(10,25,15,0.6)), url(${event})`,
									}}
								>
									<Reveal>
										<div className="mt-2 xl:mt-6 text-[30px] sm:text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(224,198,167)] text-center justify-center items-center uppercase">
											Events
										</div>
									</Reveal>
									<Reveal>
										<div className="mt-2 xl:mt-6 text-[24px] pb-3 border-b sm:text-2xl md:text-3xl xl:text-4xl flex text-[rgb(234,223,211)] text-center justify-center items-center">
											Gatherings That Bring Culture to Life
										</div>
									</Reveal>
									<div className="grid md:grid-cols-2 p-6 gap-6 bg-[rgba(35,49,38,0.56)] border-b border-b-white">
										<Reveal>
											<div className="xl:mt-6 p-3 flex flex-col text-[rgb(245,227,205)] text-center justify-center items-center">
												<div className="text-xl uppercase md:text-2xl pb-6 flex tracking-wide sm:tracking-[0.35em]">
													Event types:
												</div>
												<ul className="grid md:grid-cols-2 gap-6 text-base md:text-xl font-bold">
													<li>Live music nights</li>
													<li>Chef dinners</li>
													<li>Art openings</li>
													<li>Creative markets</li>
													<li>Songwriter circles</li>
													<li>Recording retreats</li>
													<li>Seasonal festivals</li>
													<li>Cultural exchange events</li>
													<li>Residency showcases</li>
													<li>Wellness and nature-based gatherings</li>
												</ul>
											</div>
										</Reveal>
										<Reveal>
											<div className="flex flex-col justify-center gap-8 m-auto items-center text-center">
												<button className="bg-[rgb(224,198,167)] p-6 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[rgb(224,198,167)] hover:border-[rgb(224,198,167)]">
													See Upcoming Events
												</button>
												<button className="bg-[rgb(224,198,167)] p-6 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[rgb(224,198,167)] hover:border-[rgb(224,198,167)]">
													Host an Event With Revolūtiō
												</button>
											</div>
										</Reveal>
									</div>
								</div>
							</div>
							<div className="bg-gradient-to-b to-[rgb(10,25,15)] from-[rgb(253,240,214)] py-10">
								<div className="my-20">
									<div className="carousel flex overflow-x-hidden pointer-none">
										<div className="group text-[rgb(20,48,29)] min-w-full text-2xl whitespace-nowrap flex shrink-0 items-center justify-center">
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Creative Direction
											</div>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Programming
											</div>

											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Funding Strategy
											</div>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Cultural Development
											</div>
										</div>
										<div
											className="group min-w-full text-2xl whitespace-nowrap flex shrink-0 items-center justify-center"
											aria-hidden={true}
										>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Creative Direction
											</div>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Programming
											</div>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Funding Strategy
											</div>
											<div
												className="border-r border-r-[rgb(189,123,43)] px-36"
												style={{
													width: "100%",
													flex: "0 0",
												}}
											>
												Cultural Development
											</div>
										</div>
									</div>
									<div className="mt-20 flex flex-col justify-center items-center text-center">
										<Reveal>
											<div className="mt-2 xl:mt-6 text-[30px] sm:text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(20,48,29)] text-center justify-center items-center uppercase">
												Consulting
											</div>
										</Reveal>
										<Reveal>
											<div className="m-4 md:m-auto max-w-[1000px] xl:mt-6 text-[20px] flex text-[rgb(20,48,29)] text-center justify-center items-center">
												Revolūtiō also works with artists, venues, businesses,
												nonprofits, museums, municipalities, and cultural spaces
												to develop programming, events, funding strategies,
												creative campaigns, artist residencies, and sustainable
												cultural ecosystems.
											</div>
										</Reveal>
										<Reveal>
											<button className="bg-[#a86933] mt-4 p-2 md:p-6 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
												View Consulting Services
											</button>
										</Reveal>
									</div>
								</div>
								<div className="mt-40 flex flex-col justify-center items-center text-center">
									<Reveal>
										<div className="mt-2 xl:mt-6 text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,226,190)] text-center justify-center items-center uppercase">
											Featured Artists
										</div>
									</Reveal>
									<Reveal>
										<div className="mt-2 xl:mt-6 text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(219,187,146)] text-center justify-center items-center uppercase">
											Artists in the Revolūtiō Network
										</div>
									</Reveal>
									<Reveal>
										<div className="m-4 md:m-10 artist-1 mt-10 p-4 md:p-4 border rounded-lg border-[rgb(232,202,162)]">
											<div className="grid lg:grid-cols-2">
												<div className="text-center justify-center flex flex-col items-center p-4 md:p-6">
													<div className="mt-2 font-bold xl:mt-6 text-4xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,226,190)] text-center justify-center items-center uppercase">
														Thomas Dijkstra
													</div>
													<div className="mt-2 xl:mt-6 text-xl md:text-2xl flex text-[rgb(211,198,178)] text-center justify-center items-center uppercase">
														Musician and Songwriter
													</div>
													<div className="mt-2 xl:mt-6 text-base md:text-xl flex flex-col text-[rgb(211,198,178)] text-center justify-center items-center">
														<img
															src={location}
															style={{
																height: "30px",
																width: "auto",
																opacity: "0.5",
															}}
															loading="lazy"
														/>
														Wisconsin
													</div>
													<div className="mt-2 xl:mt-6 text-sm md:text-base text-[rgb(211,198,178)] text-center justify-center items-center">
														My name is Thomas Dijkstra. I've been involved in
														the music scene since I could ride my bike to the
														local music store. I've been so lucky to play all
														over Wisconsin and am exapnding my music scene to be
														international!
														<br />
														<br />
														Folk and outlaw county have always been my main
														focus and what you can expect if you see me out
														playing! I sing a variety of covers and original
														music and am a releasing artist on Spotify.
													</div>
													<div className="mt-4 md:mt-6 flex flex-col gap-6">
														<button className="bg-[#a86933] p-2 w-max rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
															Link Tree
														</button>
													</div>
													<div className="mt-4 xl:mt-6 text-base md:text-xl text-[rgb(255,226,190)] text-center justify-center items-center">
														<strong className="text-[rgb(255,226,190)] mr-2">
															Status:
														</strong>{" "}
														Available for Booking, Residency, and Collaboration
													</div>
												</div>
												<div className="text-center justify-center flex items-center">
													<img
														className="w-[80%] lg:w-[450px] xl:w-[500px] h-auto rounded-lg"
														loading="lazy"
														src={bioPic1}
													/>
												</div>
											</div>
										</div>
									</Reveal>
								</div>
							</div>
							<div className="relative w-full">
								<video
									className="w-full h-full md:bg-center object-right object-cover absolute top-0 right-0 z-10"
									playsInline
									autoPlay
									loop
									muted
									preload="auto"
									ref={videoRef}
								>
									<source
										src={wavesComing}
										type="video/mp4"
									/>
								</video>
								<div className="relative p-7 z-20 flex h-full bg-[rgba(30,47,37,0.7)] items-center flex-col justify-between">
									<div className="mt-2 xl:mt-6 text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,226,190)] text-center justify-center items-center uppercase">
										<div className="mb-8 mt-2 xl:mt-6 grid gap-6 text-[40px] tracking-wide sm:tracking-[0.35em] text-[rgb(255,226,190)] text-center m-auto uppercase">
											<Reveal
												xVal={-200}
												delayVal={0.2}
											>
												<div>
													<strong>Come</strong> as a traveler.
												</div>
											</Reveal>
											<Reveal
												xVal={-200}
												delayVal={0.4}
											>
												<div>
													<strong>Come</strong> as an artist.
												</div>
											</Reveal>
											<Reveal
												xVal={-200}
												delayVal={0.6}
											>
												<div>
													<strong>Come</strong> as a partner.
												</div>
											</Reveal>
											<Reveal
												xVal={-200}
												delayVal={0.8}
											>
												<div>
													<strong>Come</strong> as a supporter.
												</div>
											</Reveal>
										</div>
									</div>
									<Reveal>
										<div className="mt-2 xl:mt-6 mb-6 font-bold grid gap-6 text-2xl text-[rgb(255,226,190)] text-center m-auto">
											However you enter the Revolūtiō ecosystem, the invitation
											is the same:
											<ul className="text-xl font-normal flex flex-col gap-6">
												<li>Travel with intention</li>
												<li>Create with purpose</li>
												<li>Connect with people</li>
												<li>Help build a more meaningful cultural economy</li>
											</ul>
										</div>
									</Reveal>
									<div className="mt-6 grid grid-cols-1 md:grid-cols-2">
										<div className="md:border-r border-[#a86933] px-2 md:px-6 md:py-10">
											<Reveal xVal={-200}>
												<button className="bg-[#a86933] mt-4 p-2 md:p-6 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
													Plan My Experience
												</button>
											</Reveal>
											<Reveal xVal={-200}>
												<button className="bg-[#a86933] border-b mt-4 p-2 md:p-6 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
													Apply as an Artist
												</button>
											</Reveal>
										</div>
										<div className="md:px-6 py-4 md:py-10">
											<Reveal xVal={200}>
												<button className="bg-[#a86933] mt-4 p-2 md:p-6 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
													Join the Culture Club
												</button>
											</Reveal>
											<Reveal xVal={200}>
												<button className="bg-[#a86933] mt-4 p-2 md:p-6 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]">
													Partner With Us
												</button>
											</Reveal>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-[rgb(10,25,15)] -mt-6 text-[rgb(255,226,190)]">
								<div className="grid gap-6 md:grid-cols-2 relative w-full px-4 lg:px-20 pt-20">
									<div className="lg:border-r border-[rgb(255,226,190)] p-8 my-auto">
										<div className="mb-8 mt-2 xl:mt-6 grid gap-6 text-[30px] md:text-[40px] tracking-wide sm:tracking-[0.35em] text-[rgb(255,226,190)] text-center m-auto uppercase">
											Revolūtiō Global Culture Club
										</div>
										<div className="flex-col md:flex-row flex mb-6 text-xl w-full justify-between text-[rgb(255,226,190)] text-center m-auto">
											<div>Story.</div>
											<div>Culture.</div>
											<div>Connection.</div>
											<div>Experience.</div>
										</div>
									</div>
									<div>
										<div className="underline uppercase flex text-center text-[rgb(255,226,190)] justify-center underline-offset-8 text-xl tracking-wide sm:tracking-[0.35em] pb-6">
											Navigation
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 text-[rgb(255,226,190)]">
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Home
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Experiences
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Residencies
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Destinations
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Membership
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Events
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Consulting
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Artists
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												About
											</button>
											<button className="p-2 lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
												Contact
											</button>
										</div>
									</div>
								</div>
								<div className="text-center m-auto p-6">
									Revolūtiō Global Culture Club © 2026 Beth Willner. All Rights
									Reserved.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HashRouter>
	);
}
