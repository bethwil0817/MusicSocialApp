"use client";

import { act, useState } from "react";
import { Reveal } from "./Reveal";

export const Destinations = () => {
	const [activeTab, setActiveTab] = useState("sea");

	return (
		<div className="px-4 md:px-6 py-20 bg-[#a86933]">
			<div className="flex flex-col justify-center items-center mx-auto">
				<Reveal delayVal={1}>
					<div className="mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase">
						Our Destinations
					</div>
				</Reveal>
				<Reveal>
					<p className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-xl my-5 items-center">
						Curated cultural experiences across the sea, woods, desert, and
						mountains.
					</p>
				</Reveal>
			</div>
			<div>
				<Reveal>
					<h2 className="text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-xl my-5 items-center">
						Click each destination to learn more about location, opportunities,
						and cultural connections
					</h2>
				</Reveal>
			</div>
			<div className="flex border mt-10 justify-center mx-auto border-[rgb(253,240,214)] rounded-4xl py-2 px-4 gap-6 max-w-max">
				<button
					className={`p-4 hover:cursor-pointer transition-all ease-in-out duration-500 rounded-4xl ${activeTab === "sea" ? "bg-[rgb(253,240,214)] text-[#a86933]" : "text-[rgb(253,240,214)] hover:text-[rgb(255,234,191)] "}`}
					onClick={() => setActiveTab("sea")}
				>
					The Sea
				</button>
				<button
					className={`p-4 hover:cursor-pointer transition-all ease-in-out duration-500 rounded-4xl ${activeTab === "woods" ? "bg-[rgb(253,240,214)] text-[#a86933]" : "text-[rgb(253,240,214)] hover:text-[rgb(255,234,191)] "}`}
					onClick={() => setActiveTab("woods")}
				>
					The Woods
				</button>
				<button
					className={`p-4 hover:cursor-pointer transition-all ease-in-out duration-500 rounded-4xl ${activeTab === "desert" ? "bg-[rgb(253,240,214)] text-[#a86933]" : "text-[rgb(253,240,214)] hover:text-[rgb(255,234,191)] "}`}
					onClick={() => setActiveTab("desert")}
				>
					The Desert
				</button>
				<button
					className={`p-4 hover:cursor-pointer transition-all ease-in-out duration-500 rounded-4xl ${activeTab === "mountains" ? "bg-[rgb(253,240,214)] text-[#a86933]" : "text-[rgb(253,240,214)] hover:text-[rgb(255,234,191)] "}`}
					onClick={() => setActiveTab("mountains")}
				>
					The Mountains
				</button>
			</div>
			<div className="p-6">
				<div className="border rounded-3xl"></div>
			</div>
		</div>
	);
};
