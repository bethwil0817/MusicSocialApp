"use client";
import { Reveal } from "./Reveal";
import lake from "../images/lakeView.jpg";
import beachView from "../images/beachview.jpg";
import { useRef } from "react";
import { ExpandContent } from "./Expand";
import Link from "next/link";

export interface PricingData {
	title: string;
	desc: string;
	price?: string;
	time?: string;
	subTitle?: string;
}

export const Residencies = () => {
	const pricingRef = useRef<HTMLDivElement>(null);
	const pricingData: PricingData[] = [
		{
			title: "One-Week Creative Reset",
			desc: "Best for artists needing rest, focus, and inspiration.",
			price: "Starting at $1,500–$2,500",
		},
		{
			title: "Two-Week Project Development Residency",
			desc: "Best for artists developing an album, film, show, body of work, book, or creative concept.",
			price: "Starting at $2,800–$4,500",
		},
		{
			title: "One-Month Deep Immersion Residency",
			desc: "Best for artists seeking deeper creative time, cultural exchange, workshops, performances, and documentation.",
			price: "Starting at $4,500–$7,500+",
		},
		{
			title: "Sponsored Artist Residency",
			desc: "Best for donors, grant partners, institutions, and patrons who want to support artists.",
			price: "Custom / sponsor-funded",
		},
	];

	return (
		<div
			className="bg-linear-to-b pb-15 p-4 from-[rgb(10,25,15)] to-[rgb(44,58,48)]"
			style={{
				fontFamily: "'Montserrat', sans-serif",
			}}
		>
			<div className="grid pt-20 h-full">
				<div className="mx-auto flex flex-col justify-center items-center text-center">
					<div className="p-4 md:p-6 w-full flex flex-col justify-center items-center">
						<div className="flex gap-12 items-center justify-center pb-4 sm:pb-1">
							<Reveal xVal={-200}>
								<div className="whitespace-normal sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap text-2xl text-[rgb(253,240,214)]">
									<strong>Create</strong> With Purpose.
								</div>
							</Reveal>
							<Reveal xVal={200}>
								<div className="whitespace-normal sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap text-2xl text-[rgb(253,240,214)]">
									<strong>Connect</strong> With Place.
								</div>
							</Reveal>
						</div>
						<div className="flex flex-col justify-center items-center text-center mx-auto">
							<div>
								<Reveal delayVal={1}>
									<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
										Artist Residencies
									</div>
								</Reveal>
								<Reveal delayVal={1}>
									<div className="text-[rgb(253,240,214)] text-xl mt-1 my-10 mx-0 md:m-10 items-center">
										Creative stays for artists who want space, inspiration,
										community, and cultural exchange.
									</div>
								</Reveal>
								<div className="text-[rgb(251,206,165)] mt-8 flex flex-col items-center">
									<Reveal delayVal={1.1}>
										<div className="text-2xl sm:text-3xl mb-6 uppercase">
											Residencies may include:
										</div>
									</Reveal>
									<Reveal delayVal={1.1}>
										<div className="mt-1 m-10 max-w-[1200px] flex-wrap flex-row mx-auto text-sm sm:text-base xl:text-lg items-center flex text-[rgb(253,240,214)]">
											<ul className="grid sm:flex flex-wrap text-center justify-center mx-auto tracking-wide text-base gap-6 text-[rgb(253,240,214)]">
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Lodging coordination
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-4">
													Creative check-ins
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Local experiences
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Performance opportunities
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Workshops
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Documentation
												</li>
												<li className="bg-[rgb(10,25,15)] rounded-xl flex justify-center items-center text-[rgb(253,240,214)] p-2 md:p-4">
													Cultural exchange
												</li>
											</ul>
										</div>
									</Reveal>
								</div>
								<div>
									<Reveal delayVal={1.1}>
										<div className="text-center justify-center text-base gap-6 text-[rgb(251,206,165)] mt-8 ">
											<div className="text-3xl sm:text-4xl mb-6 uppercase">
												Residency Lengths:
											</div>

											<div className="text-[rgb(253,240,214)] trackin-wide flex flex-col sm:flex-row gap-6 justify-center">
												<p>1 week</p> <p>|</p> <p>2 weeks</p> <p>|</p>{" "}
												<p>4 weeks</p> <p>|</p> <p>Custom</p>
											</div>
										</div>
									</Reveal>
								</div>
								<hr className="mt-20" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Reveal>
				<div className="text-3xl sm:text-4xl mb-6 uppercase mt-10 text-[rgb(253,240,214)] text-center mx-auto">
					Primary Year One Residency Locations:
				</div>
			</Reveal>
			<div className="flex flex-row justify-center items-center text-center mx-auto">
				<h1 className="text-center z-5 -mr-10 mb-6 text-2xl bg-[rgb(10,25,15)] border border-[rgb(253,240,214)] p-4 md:p-6 rounded-xl sm:text-3xl items-center justify-center gap-4 transition-all ease-in-out duration-300 text-[rgb(253,240,214)]">
					<Reveal>
						<p className="text-[rgb(251,206,165)] uppercase mb-4 text-2xl sm:text-3xl">
							The Woods:
						</p>
					</Reveal>
					<Reveal>
						<p className="text-2xl">Northern Wisconsin &</p>
					</Reveal>
					<Reveal>
						<p className="text-2xl">Upper Peninsula region</p>
					</Reveal>
				</h1>
				<ExpandContent>
					<img
						style={{
							flexShrink: 0,
							height: "500px",
							width: "100%",
							objectFit: "cover" /* Prevents compression by cropping instead */,
							objectPosition: "center",
							display: "flex",
							borderRadius: "12px",
							border: "2px solid rgb(71,102,100)",
							justifyContent: "center",
							alignItems: "center",
							color: "#fff",
							fontSize: "2rem",
						}}
						src={lake.src}
					/>
				</ExpandContent>
			</div>
			<div className="flex flex-row mt-8 justify-center items-center text-center mx-auto">
				<ExpandContent>
					<img
						style={{
							flexShrink: 0,
							height: "500px",
							width: "100%",
							objectFit: "cover" /* Prevents compression by cropping instead */,
							objectPosition: "center",
							display: "flex",
							borderRadius: "12px",
							border: "2px solid rgb(71,102,100)",
							justifyContent: "center",
							alignItems: "center",
							color: "#fff",
							fontSize: "2rem",
						}}
						src={beachView.src}
					/>
				</ExpandContent>
				<h1 className="text-center z-5 -ml-10 mb-6 text-2xl bg-[rgb(10,25,15)] border border-[rgb(253,240,214)] p-4 md:p-6 rounded-xl sm:text-3xl items-center justify-center gap-4 transition-all ease-in-out duration-300 text-[rgb(253,240,214)]">
					<Reveal>
						<p className="text-[rgb(251,206,165)] uppercase mb-4 text-2xl sm:text-3xl">
							The Sea:
						</p>
					</Reveal>
					<Reveal>
						<p className="text-2xl">Yucatán, Mexico</p>
					</Reveal>
				</h1>
			</div>

			<hr className="mt-20" />
			<div
				ref={pricingRef}
				className="flex flex-col text-center justify-center items-center mt-20 mb-20"
			>
				<Reveal>
					<div className="rounded-[20%] text-center mb-4 tracking-[0.35em] text-3xl sm:text-5xl items-center justify-center uppercase gap-4 text-[rgb(253,240,214)]">
						Residency Pricing
					</div>
				</Reveal>
				<Reveal>
					<div className="text-center mb-6 text-base items-center justify-center gap-4 text-[rgb(253,240,214)]">
						Pricing varies by location and lodging. These are starter packages
						and can be customized to fit your needs.
					</div>
				</Reveal>
				<Reveal>
					<div className="flex flex-col justify-center items-center gap-8 mx-auto">
						{pricingData.map((price, index) => {
							return (
								<div
									className={`max-w-[1000px] w-full border transition-all ease-in-out hover:[&_h1]:text-[26px] border-[rgb(71,102,100)] p-4 md:p-6 text-center hover:bg-[rgb(44,63,50)] rounded-xl`}
									key={index}
									id="residencyPricing"
								>
									<div>
										<h1 className="text-center mb-6 text-xl md:text-2xl items-center justify-center uppercase gap-4 transition-all ease-in-out duration-300 text-[rgb(253,240,214)]">
											{price.title}
										</h1>
										<div className="text-center text-base items-center justify-center gap-4 text-[rgb(253,240,214)]">
											{price.desc}
										</div>
									</div>
									{/* <div className="pt-5 flex gap-4 text-center justify-center">
										<div className="font-bold tracking-wide text-xl sm:text-2xl text-[rgb(253,240,214)]">
											{price.price}
										</div>
									</div> */}
								</div>
							);
						})}
					</div>
				</Reveal>
			</div>
			<div className="my-10 flex flex-col justify-center items-center text-center mx-auto">
				<h1 className="text-[rgb(251,206,165)] mb-4 text-2xl uppercase sm:text-3xl">
					Looking to take the next step as an artist?
				</h1>
				<h1 className="text-[rgb(251,206,165)] italic mb-4 text-xl">
					Click below to apply
				</h1>
				<div>
					<div className="text-center mt-5 flex flex-col md:flex-row gap-6 justify-center items-center">
						<Link
							className="p-2 sm:p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer"
							href="/contact?form=Residency"
						>
							Apply for Residency
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
