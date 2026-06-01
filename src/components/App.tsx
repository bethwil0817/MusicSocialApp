import "../styles/App.module.css";
import Login from "./Login";
import UserHome from "./UserHome";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import { useState, useEffect, useRef } from "react";

export const useIsVisible = (ref) => {
	const [isIntersecting, setIntersecting] = useState(false);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIntersecting(entry.isIntersecting),
			{ threshold: 0.2 },
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref]);
	return isIntersecting;
};

export default function App() {
	const [showExperienceNav, setShowExperienceNav] = useState(false);
	const [showAboutNav, setShowAboutNav] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [selectedPath, setSelectedPath] = useState("artist");
	const [world, setWorld] = useState("beach");
	const imageRef = useRef(null);
	const isVisible = useIsVisible(imageRef);

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
		<BrowserRouter>
			<div
				className="w-full mx-auto overflow-y-auto"
				style={{ fontFamily: "'Montserrat', sans-serif" }}
			>
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
						<div className="flex flex-col md:hidden bg-[rgba(255,255,255,0.6)] justify-end h-20 w-full fixed top-0 right-0 z-10 p-4">
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
									className={`bg-[rgba(255,255,255,0.6)] fixed -ml-4 top-20 text-[#88572c] flex-col flex p-3 w-full text-xl gap-2 rounded-b-lg transition-all ease-in-out ${showMobileMenu ? "visible opacity-100" : "hidden invisible opacity-0"}`}
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
						<div className="hidden md:flex bg-[rgba(255,255,255,0.7)] h-20 w-full gap-16 justify-end fixed top-0 right-0 z-10 p-6 pr-10">
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
							<img
								className="w-40 h-full max-h-20 object-contain mx-auto"
								src={leftMountain}
							/>
							<div className="my-6 text-4xl md:text-5xl hidden lg:flex flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#b6c7c0] text-center uppercase">
								Global Culture Club
								<div className="border-b m-4 border-2 border-white opacity-50 max-w-[50px] w-full"></div>
								Artist Residency
								<div className="border-b m-4 border-2 border-white opacity-50 max-w-[50px] w-full"></div>
								Community Consultancy
							</div>
							<div className="my-6 text-4xl md:text-5xl flex lg:hidden flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[#b6c7c0] text-center uppercase">
								Revolūtiō Global Culture Club
								<div className="border-b m-4 border-2 border-white opacity-50 max-w-[50px] w-full"></div>
								Artist Residency
								<div className="border-b m-4 border-2 border-white opacity-50 max-w-[50px] w-full"></div>
								Community Consultancy
							</div>

							<div className="text-xl md:text-2xl text-[#548868] mx-10 text-center mb-6">
								Meaningful travel, artist residencies, cultural experiences,
								events, and creative partnerships across the sea, woods, desert,
								and mountains.
							</div>
							<div className="mb-8 text-base md:text-xl text-[#d4e4da] mx-auto max-w-200 text-center">
								We personally curate local, cultural, all-inclusive experiences
								rooted in story, music, food, art, nature, and community.
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
						</div>
						<hr className="mb-20"></hr>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex flex-col items-center justify-center">
								<div className="my-6 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase">
									What is Revolūtiō?
								</div>
								<div className="text-[rgb(23,57,35)] text-xl">
									A More Personal Way to <strong>Travel</strong>,{" "}
									<strong>Create</strong>, and <strong>Connect</strong>
								</div>
							</div>
							<div>
								<div className="border-b border-b-[rgb(31,73,45)] p-6 text-center text-xl text-[rgb(20,48,29)]">
									Revolūtiō is a <strong>global</strong> culture club for people
									who want travel to feel more <strong>human</strong>, more{" "}
									<strong>local</strong>, and more <strong>meaningful</strong>.
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
							<img
								className="w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]"
								src={arrowRight}
							/>
							<div className="my-6 mx-auto lg:m-0 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase">
								Choose Your Path
							</div>
							<img
								src={arrowLeft}
								className="w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]"
							/>
						</div>
						<div>
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
											For musicians, writers, filmmakers, photographers, visual
											artists, performers, and creative entrepreneurs seeking
											space to create, connect, and share work.
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
											programming, events, funding strategy, creative direction,
											or cultural development.
										</div>
										<button className="p-2 mx-auto cursor-pointer bg-[#e7cdb6] hover:bg-white text-[#a86933] rounded-lg w-max">
											Work With Revolūtiō
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="px-1 py-16 bg-radial from-[rgb(10,25,15)] via-[rgb(10,25,15)] to-[rgb(86,109,94)]">
						<div className="my-6 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(187,227,200)] text-center uppercase">
							The Four Worlds
						</div>
						<hr className="text-[rgb(86,109,94)] mb-6"></hr>
						<div
							className="w-full p-2 pb-4 md:p-6 rounded-lg max-w-[80%] h-auto min-h-[600px] sm:min-h-[500px] flex flex-col justify-center items-center mx-auto transition-all ease-in-out duration-100"
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
									/>
									<div className="text-3xl text-white font-bold">Guatemala</div>
									<div className="text-xl md:text-2xl text-white font-medium">
										Future creative retreats, cultural exchange, textiles,
										ecology, music, food, and artist residencies rooted in local
										partnership.
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
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}
