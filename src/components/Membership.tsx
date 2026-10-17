"use client";
import { useInView } from "framer-motion";
import { Reveal } from "./Reveal";
import { useRef } from "react";
import airplaneVideo from "../images/Airplane.mp4";
import Link from "next/link";

export interface PricingData {
	title: string;
	desc: string;
	price?: string;
	time?: string;
	subTitle?: string;
	bulletPoints?: string[];
}

export const Membership = () => {
	const videoRef = useRef(null);
	const isInView = useInView(videoRef);

	const membershipPricing: PricingData[] = [
		{
			title: "Explorer Member",
			desc: "Best for people who want to stay connected and receive early access.",
			price: "$250/year",
			subTitle: "Includes:",
			bulletPoints: [
				"Newsletter and member updates",
				"Early event announcements",
				"Access to member-only opportunities",
				"Priority inquiry review",
				"Featured artist updates",
			],
		},
		{
			title: "Culture Club Member",
			desc: "Best for people who want concierge-style support and priority access.",
			price: "$1,000/year",
			subTitle: "Includes:",
			bulletPoints: [
				"One annual experience design session",
				"Priority booking support",
				"Early access to retreats and events",
				"Member pricing opportunities when available",
				"Artist showcase invitations",
				"Help sourcing entertainment or experiences",
			],
		},
		{
			title: "Patron Member",
			desc: "Best for supporters, donors, frequent travelers, and people who want deeper access.",
			price: "$2,500/year",
			subTitle: "Includes:",
			bulletPoints: [
				"Two annual experience design sessions",
				"Priority concierge support",
				"Private event invitations",
				"Artist residency updates",
				"Recognition as a Revolūtiō supporter if desired",
				"Preferred access to VIP retreats and cultural experiences",
			],
		},
		{
			title: "Founding Circle Member",
			desc: "Best for patrons, sponsors, partners, and people helping launch the ecosystem.",
			price: "$5,000–$10,000/year",
			subTitle: "Includes:",
			bulletPoints: [
				"Custom concierge support",
				"Private experience planning",
				"Invitation to founding events",
				"Recognition if desired",
				"Opportunity to help sponsor artists, workshops, or community programming",
				"First access to future destinations",
			],
		},
	];

	return (
		<div
			className="bg-[#fdf9f1] pt-10"
			style={{
				fontFamily: "'Montserrat', sans-serif",
			}}
		>
			<div className="w-full bg-[rgba(253,240,214,0.96)] flex items-center justify-center">
				<div className="w-full relative">
					<video
						className="w-screen h-full md:bg-center object-right object-cover absolute top-0 right-0 z-10 opacity-50"
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
					<div className="relative px-4 md:px-6 py-40 z-20 flex h-full items-center flex-col justify-between">
						<Reveal>
							<div className="my-2 md:my-6 text-xl sm:text-2xl lg:text-3xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(61,105,75)] text-center uppercase">
								Your Personal Entertainment & Experience Concierge
							</div>
						</Reveal>
						<Reveal>
							<div
								id="paratitle"
								className="my-2 md:my-6 text-4xl sm:text-5xl lg:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase"
							>
								Global Culture Club Membership
							</div>
						</Reveal>
						<Reveal>
							<div className="pt-4 text-[rgb(31,73,45)] h-full text-2xl flex text-center justify-center">
								A global culture club for meaningful travel, art, and
								connection.
							</div>
						</Reveal>
					</div>
				</div>
			</div>
			<div className="bg-gradient-to-b pb-20 to-[rgb(10,25,15)] from-[rgb(252,247,235)] pt-20 px-4 md:px-6 flex flex-col items-center h-auto justify-between gap-6 text-[rgb(10,25,15)]">
				<div className="max-w-[1500px] flex flex-col w-full justify-center mx-auto">
					<div className="border-[rgb(61,105,75)] rounded-xl border-dashed border-2 p-6 w-auto max-w-max">
						<Reveal xVal={-200}>
							<div className="sm:ml-6 text-left sm:tracking-[0.35em] text-[rgb(61,105,75)] uppercase text-2xl sm:text-3xl lg:text-4xl">
								Who is it for?
							</div>
						</Reveal>
						<Reveal xVal={200}>
							<div className="text-sm max-w-[1100px] text-[rgb(10,25,15)] mt-6 flex justify-start text-left sm:text-base lg:text-xl h-full rounded-lg">
								The Revolūtiō Global Culture Club is a membership for people who
								want access to more meaningful experiences, local connections,
								artist-led events, private performances, curated travel, and
								cultural opportunities.
							</div>
						</Reveal>
					</div>
					<div className="border-[rgb(61,105,75)] rounded-xl border-dashed border-2 mt-20 p-6 w-auto max-w-max ml-auto">
						<Reveal xVal={-200}>
							<div className="ml-6 text-right sm:tracking-[0.35em] text-[rgb(61,105,75)] uppercase text-2xl sm:text-3xl lg:text-4xl">
								What is Included?
							</div>
						</Reveal>
						<Reveal xVal={200}>
							<div className="sm:mr-6 text-sm max-w-[1100px] mt-6 ml-auto flex justify-end text-right sm:text-base lg:text-xl h-full rounded-lg text-[rgb(10,25,15)]">
								Members can receive help planning experiences, booking
								entertainment, discovering artists, joining retreats, accessing
								private events, and creating custom travel itineraries across
								Revolūtiō destinations.
							</div>
						</Reveal>
					</div>
				</div>
				<div className="text-center mt-6 py-20 pt-40 text-[rgba(253,240,214)]">
					<Reveal>
						<div className="sm:tracking-[0.35em] mb-4 text-[rgb(10,25,15)] uppercase text-3xl sm:text-5xl lg:text-6xl">
							Membership Pricing
						</div>
					</Reveal>
					<Reveal>
						<div className="text-lg sm:text-xl text-[rgb(52,69,58)]">
							Your access to ongoing support and relationships across our
							network
						</div>
					</Reveal>
					<Reveal>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
							{membershipPricing.map((price, index) => {
								return (
									<div
										className={`border transition-all ease-in-out hover:[&_h1]:text-[26px] border-[rgb(71,102,100)] p-4 md:p-6 text-center hover:bg-[rgb(52,69,58)] rounded-xl`}
										key={index}
										id="membershipPricing"
									>
										<div>
											<h1 className="text-center mb-6 text-xl md:text-2xl items-center justify-center uppercase gap-4 transition-all ease-in-out duration-300 text-[rgb(253,240,214)]">
												{price.title}
											</h1>
											<div className="text-center text-base items-center justify-center gap-4 text-[rgb(253,240,214)]">
												{price.desc}
											</div>
										</div>
										<div className="pt-5 flex gap-4 text-center justify-center">
											{/* <div className="font-bold tracking-wide text-xl sm:text-2xl text-[rgb(202,229,228)]">
														{price.price}
													</div> */}
											{/* {price.time && (
														<div className=" tracking-wide text-xl sm:text-2xl text-[rgb(253,240,214)]">
															|
														</div>
													)} */}
											{price.time && (
												<div className="font-bold  tracking-wide text-xl sm:text-2xl text-[rgb(253,240,214)]">
													{price.time}
												</div>
											)}
										</div>
										{price.subTitle && (
											<div>
												<div className="mt-6 mb-2 font-bold text-xl text-[rgb(253,240,214)]">
													<div>{price.subTitle}</div>
												</div>
												<ul className="flex flex-col text-center justify-center tracking-wide text-sm sm:text-base gap-y-2 text-[rgb(253,240,214)]">
													{price.bulletPoints?.map((bullet, index) => {
														return <li key={index}>{bullet}</li>;
													})}
												</ul>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</Reveal>
				</div>
				<div className="my-10 flex flex-col justify-center items-center text-center mx-auto">
					<h1 className="text-[rgb(253,240,214)] mb-4 text-2xl uppercase sm:text-3xl">
						Interested in becoming a member?
					</h1>
					<h1 className="text-[rgb(253,240,214)] italic mb-4 text-xl">
						Click below to fill out our membership inquiry
					</h1>
					<div>
						<div className="text-center mt-5 flex flex-col md:flex-row gap-6 justify-center items-center">
							<Link
								className="p-2 sm:p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer"
								href="/contact?form=Membership"
							>
								Inquire for Membership
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
