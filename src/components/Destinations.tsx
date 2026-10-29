"use client";
import beachfull from "../images/beachFull.png";
import woodsFull from "../images/woodsFull.png";
import mountainsFull from "../images/moutFull.png";
import desertFull from "../images/desertFull.png";
import { act, useState } from "react";
import { Reveal } from "./Reveal";

export const Destinations = () => {
	const [activeTab, setActiveTab] = useState("sea");

	return (
		<div
			className="pt-20 bg-cover bg-no-repeat h-full"
			id="dest"
		>
			<link
				rel="preload"
				as="image"
				href={beachfull.src}
			/>
			<link
				rel="preload"
				as="image"
				href={woodsFull.src}
			/>

			<div className="px-4 md:px-6 py-10 flex flex-col justify-center items-center mx-auto">
				<Reveal>
					<div className="mt-2 gap-2 text-center flex flex-col lg:flex-row xl:mt-6 text-[rgb(253,240,214)] justify-center mx-auto text-xl my-5 items-center">
						Curated cultural experiences across the{" "}
						<strong>sea, woods, desert, and mountains</strong>
					</div>
				</Reveal>
				<Reveal delayVal={1}>
					<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
						Our Destinations
					</div>
				</Reveal>

				<Reveal>
					<p className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 items-center text-center">
						Revolūtiō does not claim ownership over these cultures or places.
					</p>
				</Reveal>
				<Reveal>
					<p className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl mt-1 mb-10 items-center text-center">
						Rather Revolūtiō seeks to support locally led experiences and
						partnerships that benefit the people and communities of the region,
						and treat and honor the land with{" "}
						<strong className="text-xl sm:text-2xl">
							care, humility, and respect.
						</strong>
					</p>
				</Reveal>
			</div>
			<div className="pt-6">
				<div
					className="border px-4 md:px-6 py-20 text-center bg-fixed bg-center min-h-[500px]"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${beachfull.src})`,
						backgroundSize: "cover",
					}}
				>
					<div className="my-auto">
						<Reveal>
							<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
								The Sea
							</div>
						</Reveal>

						<Reveal>
							<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center">
								Yucatán, Mexico
							</div>
						</Reveal>
						<Reveal>
							<div className="text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center">
								Primary focus for Year One.
							</div>
						</Reveal>
						<Reveal>
							<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center">
								The Sea represents creative renewal, cultural exchange,
								beachside residencies, coastal retreats, music, food, art
								nature, and meaningful travel across the Yucatán coast.
							</div>
						</Reveal>
					</div>
					<Reveal>
						<div
							className="mt-10 mx-auto p-6 max-w-max text-center rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]"
							id="locations"
						>
							<div className="text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center">
								Potential offerings:
							</div>
							<div>
								<ul className="text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center">
									<li>Artist residencies</li>
									<li>Creative guest retreats</li>
									<li>Beachside cultural experiences</li>
									<li>Live music and chef experiences</li>
									<li>Wellness, nature, and ecology experiences</li>
									<li>Yucatán community partnerships</li>
									<li>
										Private curated stays Events, pop-ups, and cultural
										gatherings
									</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
			<div className="pt-6">
				<div
					className="border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${woodsFull.src})`,
						backgroundSize: "cover",
					}}
				>
					<Reveal>
						<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
							The Woods
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center">
							Phelps, Land O’ Lakes, Watersmeet, and the Upper Peninsula
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center">
							Primary focus for Year One.
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center">
							The Woods represents northern lakes, forest, music, storytelling,
							indigenous partnerships, rural creative economy, historical
							memory, recording retreats, seasonal festivals, and regenerative
							community programming.
						</div>
					</Reveal>
					<Reveal>
						<div
							className="mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]"
							id="locations"
						>
							<div className="text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center">
								Potential offerings:
							</div>
							<div>
								<ul className="text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center">
									<li>Recording retreats</li>
									<li>Songwriter and artist residencies</li>
									<li>Seasonal festivals and community events</li>
									<li>Museum and history-based storytelling projects</li>
									<li>Rural creative economy development</li>
									<li>Outdoor art, music, and wellness experiences</li>
									<li>
										Cultural exchange between Wisconsin, Michigan, tribal
										communities, and global partners
									</li>
									<li>Retreats rooted in nature, story, and restoration</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
			<div className="pt-6">
				<div
					className="border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${mountainsFull.src})`,
						backgroundSize: "cover",
					}}
				>
					<Reveal>
						<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
							The Mountains
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center">
							Guatemala
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center">
							Introduced in Year One as part of the vision. Developed more fully
							in Year Two.
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center">
							The Mountains represent creative elevation, indigenous culture,
							ecology, textile traditions, music, food, retreat experiences, and
							cross-cultural exchange.
						</div>
					</Reveal>
					<Reveal>
						<div
							className="mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]"
							id="locations"
						>
							<div className="text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center">
								Potential offerings:
							</div>
							<div>
								<ul className="text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center">
									<li>Artist residencies</li>
									<li>Cultural travel experiences</li>
									<li>Textile, food, art, and music exchanges</li>
									<li>Retreats and creative immersions</li>
									<li>
										Partnerships with local artists, guides, cooperatives, and
										cultural workers
									</li>
									<li>
										Future exchange between Guatemala, Yucatán, Wisconsin, and
										Arizona
									</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
			<div className="pt-6">
				<div
					className="border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${desertFull.src})`,
						backgroundSize: "cover",
					}}
				>
					<Reveal>
						<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
							The Desert
						</div>
					</Reveal>

					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center">
							Northern Arizona, Navajo and Hopi Land
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center">
							Introduced in Year One as part of the vision. Developed more fully
							in Year Two.
						</div>
					</Reveal>
					<Reveal>
						<div className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-xl my-5 text-center items-center">
							The Desert represents ancestral land, vastness, silence, story,
							entrepreneurship, cultural respect, local economic development,
							and future community-rooted creative initiatives.
						</div>
					</Reveal>
					<Reveal>
						<div
							className="mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]"
							id="locations"
						>
							<div className="text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center">
								Potential offerings:
							</div>
							<div>
								<ul className="text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center">
									<li>Cultural learning experiences</li>
									<li>Local entrepreneurship support</li>
									<li>Creative economy consulting</li>
									<li>Storytelling projects</li>
									<li>Artist exchanges</li>
									<li>Community-rooted travel experiences</li>
									<li>
										Partnerships with local tribal members, artists, guides, and
										business owners
									</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</div>
	);
};
