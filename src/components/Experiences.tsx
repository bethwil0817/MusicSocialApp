import { Nav } from "./Nav";
import guatmount from "../images/guatmount.jpg";
import { Reveal } from "./Reveal";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Experiences() {
	const planningPricingData: {
		price: string;
		time?: string;
		title: string;
		desc: string;
		subTitle?: string;
		bulletPoints?: string[];
	}[] = [
		{
			price: "$250",
			time: "60 - 90 minutes",
			title: "Experience Design Session",
			desc: "Best for clients who want to explore options, clarify their vision, and receive a recommended experience path.",
		},
		{
			price: "$500–$1,500",
			time: "",
			title: "Custom Itinerary Design",
			desc: "Best for individuals, couples, and small groups who want Revolūtiō to design a custom experience, coordinate recommendations, and help shape the trip.",
		},
		{
			price: "15%–20% of total booked experience value",
			time: "",
			title: "Full Experience Coordination",
			desc: "Best for clients who want Revolūtiō to coordinate lodging, artists, chefs, guides, events, experiences, and local partners.",
			subTitle: "Recommended structure:",
			bulletPoints: [
				"15% for standard coordination",
				"20% for full-service planning and management",
			],
		},
	];

	const packagePricingData: {
		price: string;
		title: string;
		desc: string;
		bulletPoints?: string[];
	}[] = [
		{
			price: "Starting at $150–$350 per person",
			title: "Creative Day Experience",
			desc: "Possible inclusions:",
			bulletPoints: [
				"Local experience",
				"Workshop, guide, music, food, or nature activity",
				"Small group coordination",
			],
		},
		{
			price: "Starting at $750–$1,500 per person",
			title: "Weekend Cultural Escape",
			desc: "Possible inclusions:",
			bulletPoints: [
				"2–3 nights",
				"Lodging coordination",
				"One curated dinner or event",
				"One cultural or nature experience",
				"Optional music/art/wellness add-ons",
			],
		},
		{
			price: "Starting at $2,200–$4,500 per person",
			title: "One-Week Creative Immersion",
			desc: "Possible inclusions:",
			bulletPoints: [
				"Lodging",
				"Welcome experience",
				"Local cultural experiences",
				"Chef or food experiences",
				"Artist event or performance",
				"Wellness/nature options",
				"Revolūtiō itinerary support",
			],
		},
		{
			price: "Starting at $8,000–$25,000+ per group",
			title: "Private Group Retreat",
			desc: "Best for:",
			bulletPoints: [
				"Families",
				"Creative teams",
				"Donor groups",
				"Private celebrations",
				"Retreat groups",
				"VIP cultural experiences",
			],
		},
	];

	return (
		<div
			className="h-full"
			style={{
				fontFamily: "'Montserrat', sans-serif",
			}}
		>
			<img
				src={guatmount}
				loading="lazy"
				className="hidden invisible"
			/>
			<div className="mx-auto">
				<div
					className="px-2 md:px-6 pt-20 pb-10"
					style={{
						backgroundImage: `linear-gradient(to bottom, rgba(10,25,15,.7), rgba(10,25,15,.7) 100%), url(${guatmount})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundAttachment: "fixed",
					}}
				>
					<div className="mx-4">
						<Reveal>
							<div className="text-[48px] mb-6 md:mb-20 pt-20 xl:text-6xl flex tracking-[0.35em] text-[rgb(209,216,211)] whitespace-break-spaces text-center justify-center items-center uppercase">
								Travel Experiences
							</div>
						</Reveal>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-25">
							<Reveal delayVal={1}>
								<div className="p-6 border-b border-dashed border-b-[rgb(237,242,239)] md:border-b-0 md:border-r md:border-r-[rgb(237,242,239)] pt-10 text-2xl md:text-4xl flex tracking-[0.35em] text-[rgb(201,211,205)] leading-15 text-center justify-center items-center uppercase">
									Curated and meaningful experiences for all
								</div>
							</Reveal>
							<Reveal delayVal={1}>
								<div className="p-6 text-center text-xl leading-10 justify-center flex items-center text-[rgb(210,221,214)]">
									We aim to personally curate your travel experience to you. To
									create a meaninful experience we seek personally designed
									trips and stays for individuals, couples, families, groups,
									patrons, and creative travelers. Our experiences incorporate
									your interests and intent of your trip to align you with your
									path of events, lodging, food, and destinations of all kind.
								</div>
							</Reveal>
						</div>
					</div>
				</div>

				<div className="bg-linear-to-b py-20 px-6 flex flex-col w-full justify-center text-center items-center mx-auto from-[rgb(48,77,67)] to-[#161e19]">
					<Reveal>
						<div className="bg-linear-to-b mx-auto from-[#1c3639] to-[#424d44] rounded-[20%] w-full max-w-[1200px] py-10 border border-[rgb(71,102,100)] p-4 sm:p-10">
							<div className="m-6 rounded-[20%] text-center mb-6 tracking-[0.35em] text-2xl sm:text-3xl items-center justify-center uppercase gap-4 text-[rgb(159,182,180)]">
								Experiences can include:
							</div>

							<div className="flex flex-col rounded-[50%] text-center gap-4 text-base sm:text-lg text-[rgb(221,236,226)]">
								<div>Lodging recommendations and coordination</div>
								<div>Local guides</div>
								<div>Private chefs</div>
								<div>Live music</div>
								<div>Wellness experiences</div>
								<div>Art workshops</div>
								<div>Nature excursions</div>
								<div>Cultural experiences</div>
								<div>Photography / Video add-ons</div>
								<div>Transportation coordination where available</div>
								<div>Custom itinerary planning</div>
							</div>
							<div className="text-center mt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
								<Link
									className="p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-white cursor-pointer"
									to="/contact?form=Experience"
									reloadDocument={true}
								>
									Experience Inquiry Form
								</Link>
								<button className="p-4 min-w-[230px] rounded-lg bg-[#a86933] hover:bg-[#a57245] text-white cursor-pointer">
									View Pricing
								</button>
							</div>
						</div>
					</Reveal>
					<div className="mt-30 border-t pt-20 border-t-[rgb(132,161,159)]">
						<Reveal>
							<div className="rounded-[20%] text-center mb-0 sm:mb-10 tracking-[0.35em] text-4xl sm:text-5xl items-center justify-center uppercase gap-4 text-[rgb(181,206,203)]">
								Experience Pricing
							</div>
						</Reveal>
						<div className="pb-20">
							<Reveal>
								<div className="m-6 mt-15 sm:mt-20 mb-0 text-center tracking-[0.35em] text-2xl sm:text-3xl items-center justify-center uppercase gap-4 text-[rgb(159,182,180)]">
									Custom Experience Planning Fees
								</div>
							</Reveal>
							<Reveal>
								<div className="m-6 text-center mb-6 text-base items-center justify-center gap-4 text-[rgb(159,182,180)]">
									These fees compensate Revolūtiō for designing the client’s
									experience.
								</div>
							</Reveal>
							<Reveal>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-2">
									{planningPricingData.map((price, index) => {
										return (
											<div
												className={`border transition-all ease-in-out border-[rgb(71,102,100)] p-8 text-center bg-[#1c3639] hover:bg-[#2b5055] rounded-xl${index === 2 ? " sm:col-span-2" : ""}`}
												key={index}
											>
												<div>
													<div className="text-center mb-6 text-xl md:text-2xl items-center justify-center uppercase gap-4 text-[rgb(159,182,180)]">
														{price.title}
													</div>
													<div className="text-center text-base items-center justify-center gap-4 text-[rgb(159,182,180)]">
														{price.desc}
													</div>
												</div>
												<div className="pt-5 flex gap-4 text-center justify-center">
													<div className="font-bold tracking-wide text-xl sm:text-2xl text-[rgb(202,229,228)]">
														{price.price}
													</div>
													{price.time && (
														<div className=" tracking-wide text-xl sm:text-2xl text-[rgb(180,205,203)]">
															|
														</div>
													)}
													{price.time && (
														<div className="font-bold  tracking-wide text-xl sm:text-2xl text-[rgb(159,182,180)]">
															{price.time}
														</div>
													)}
												</div>
												{price.subTitle && (
													<div>
														<div className="mt-6 mb-2 font-bold text-lg text-[rgb(180,205,203)]">
															<div>{price.subTitle}</div>
														</div>
														<ul className="flex flex-col text-center justify-center tracking-wide text-base gap-y-2 text-[rgb(180,205,203)]">
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
						<div className="border-t border-dashed border-t-[rgb(132,161,159)]">
							<Reveal>
								<div className="m-6 mt-20 mb-0 text-center tracking-[0.35em] text-2xl sm:text-3xl items-center justify-center uppercase gap-4 text-[rgb(159,182,180)]">
									Curated Travel Experience Packages
								</div>
							</Reveal>
							<Reveal>
								<div className="m-6 text-center mb-6 text-base items-center justify-center gap-4 text-[rgb(159,182,180)]">
									Pricing depends on lodging, group size, chef services,
									entertainment, experiences, staffing, and destination.
								</div>
							</Reveal>
							<Reveal>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-2">
									{packagePricingData.map((price, index) => {
										return (
											<div
												className={`border transition-all ease-in-out border-[rgb(71,102,100)] p-8 text-center bg-[#1c3639] hover:bg-[#2b5055] rounded-xl`}
												key={index}
											>
												<div>
													<div className="text-center mb-6 text-xl sm:text-2xl items-center justify-center uppercase gap-4 text-[rgb(159,182,180)]">
														{price.title}
													</div>
												</div>
												<div className="pt-5 flex gap-4 text-center justify-center">
													<div className="font-bold tracking-wide text-xl sm:text-2xl text-[rgb(202,229,228)]">
														{price.price}
													</div>
												</div>
												<div>
													<div className="mt-6 mb-2 font-bold text-base sm:text-lg text-[rgb(180,205,203)]">
														<div>{price.desc}</div>
													</div>
													<ul className="flex flex-col text-center justify-center tracking-wide text-base gap-y-2 text-[rgb(180,205,203)]">
														{price.bulletPoints?.map((bullet, index) => {
															return <li key={index}>{bullet}</li>;
														})}
													</ul>
												</div>
											</div>
										);
									})}
								</div>
							</Reveal>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
