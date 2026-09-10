import { Nav } from "./Nav";
import revlogo from "../images/revlogoonly.png";
import footprints from "../images/footprints.png";
import bridge from "../images/bridge.png";
import { Reveal } from "./Reveal";
import Footer from "./Footer";

export default function About() {
	return (
		<div>
			<div
				className="mx-auto pb-20"
				style={{
					fontFamily: "'Montserrat', sans-serif",
					backgroundImage: `linear-gradient(to bottom, rgb(255,246,234,.9), rgba(255,209,149,.7) 100%), url(${footprints})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<Reveal>
					<img
						src={revlogo}
						className="w-[800px] h-auto pt-20 justify-center items-center mx-auto"
					/>
				</Reveal>
				<div className="py-6 md:py-20">
					<Reveal>
						<h1 className="mt-2 xl:mt-6 text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase">
							About Revolūtiō
						</h1>
					</Reveal>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 text-[rgb(128,72,5)] gap-7 text-2xl lg:text-3xl font-bold text-center items-center">
					<Reveal delayVal={0.1}>
						<div className="border-b pb-4 md:pb-0 md:border-b-0 md:border-r border-[rgb(195,112,10)]">
							Story.
						</div>
					</Reveal>
					<Reveal delayVal={0.3}>
						<div className="border-b pb-4 md:pb-0 md:border-b-0 md:border-r border-[rgb(195,112,10)]">
							Culture.
						</div>
					</Reveal>
					<Reveal delayVal={0.5}>
						<div className="border-b pb-4 md:pb-0 md:border-b-0 md:border-r border-[rgb(195,112,10)]">
							Connection.
						</div>
					</Reveal>
					<Reveal delayVal={0.7}>
						<div className="border-b pb-4 md:pb-0 md:border-b-0 border-[rgb(195,112,10)]">
							Experience.
						</div>
					</Reveal>
				</div>
				<Reveal delayVal={1.2}>
					<div className="flex text-[rgb(88,51,5)] justify-center text-xl items-center max-w-[1200px] mx-auto text-center mt-6 p-4 md:p-6">
						Revolūtiō Global Culture Club is for travelers, artists, patrons,
						partners, and seekers who want more than a vacation. We create
						intimate, locally rooted, culturally meaningful experiences shaped
						around art, food, music, nature, storytelling, and human connection.
					</div>
				</Reveal>
				<div className="flex text-[rgb(88,51,5)] flex-col justify-center text-3xl items-center max-w-[1200px] mx-auto text-center p-6">
					<Reveal delayVal={1.3}>
						<div>This is not traditional tourism.</div>
					</Reveal>
					<Reveal delayVal={1.4}>
						<div className="pt-10">
							It is a more <strong>personal</strong>, <strong>local</strong>,{" "}
							<strong>cultural</strong>, and <strong>intentional</strong> way to
							travel.
						</div>
					</Reveal>
				</div>
				<div className="mt-5 md:mt-10 px-4 flex text-[rgb(88,51,5)] flex-col justify-center text-xl items-center max-w-[1200px] mx-auto text-center">
					<Reveal delayVal={1.5}>
						<div>
							Rather than offering generic packages, Revolūtiō personally
							curates each client’s experience based on what they are looking
							for, what they need, and how they want to connect.
						</div>
					</Reveal>
					<div className="flex flex-col text-xl p-4 mt-5 md:mt-10 gap-6 max-w-[1200px] mx-auto">
						<div
							className="flex flex-col sm:grid sm:grid-cols-2 h-full shadow-2xl"
							style={{
								backgroundImage: `url(${bridge})`,
								backgroundRepeat: "no-repeat",
								backgroundSize: "80%",
								backgroundPosition: "center",
							}}
						>
							<div className="p-6 sm:p-10 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl flex flex-col font-bold h-full bg-[rgba(255,246,234,0.93)]">
								<Reveal delayVal={1}>
									<div className="flex font-normal tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] uppercase justify-center pb-5 text-2xl">
										Some may want:
									</div>
								</Reveal>
								<div className="font-medium flex flex-col text-xl gap-4 text-[rgb(88,51,5)] h-full justify-between">
									<Reveal>
										<div>Rest</div>
									</Reveal>
									<Reveal>
										<div>Beauty</div>
									</Reveal>
									<Reveal>
										<div>Music</div>
									</Reveal>
									<Reveal>
										<div>Food</div>
									</Reveal>
									<Reveal>
										<div>Sea</div>
									</Reveal>
									<Reveal>
										<div>Relaxation</div>
									</Reveal>
								</div>
							</div>
							<div className="p-6 sm:p-10 flex rounded-b-xl sm:rounded-b-none sm:rounded-r-xl flex-col font-bold h-full bg-[rgba(255,209,149,0.93)]">
								<Reveal delayVal={1}>
									<div className="flex font-normal justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] uppercase pb-5 text-2xl">
										Others may want:
									</div>
								</Reveal>
								<div className="flex font-medium flex-col text-[rgb(88,51,5)] text-xl gap-4 h-full justify-between">
									<Reveal>
										<div>Deep cultural immersion</div>
									</Reveal>
									<Reveal>
										<div>Artist residencies</div>
									</Reveal>
									<Reveal>
										<div>Creative retreats</div>
									</Reveal>
									<Reveal>
										<div>Nature</div>
									</Reveal>
									<Reveal>
										<div>Healing</div>
									</Reveal>
									<Reveal>
										<div>Workshops</div>
									</Reveal>
									<Reveal>
										<div>Community connection</div>
									</Reveal>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex -mt-2 flex-col mx-auto max-w-[1200px]">
					<Reveal>
						<div className="justify-center text-[rgb(88,51,5)] text-xl items-center max-w-[1200px] text-center p-6">
							Revolūtiō acts as the <strong>bridge</strong> between travelers,
							artists, local hosts, guides, chefs, musicians, cultural workers,
							property partners, venues, and communities. Each experience is{" "}
							<strong>personally</strong> curated so guests can enter a place
							with intention, support local communities, meet inspiring people,
							and leave with more than photographs. They leave with
							relationships, stories, and a deeper sense of connection.
						</div>
					</Reveal>
				</div>
				<div className="flex -mt-2 flex-col mx-auto max-w-[1200px]">
					<Reveal>
						<div className="justify-center text-[rgb(88,51,5)] text-2xl items-center max-w-[1200px] text-center p-6">
							A global culture club for meaningful travel, artist residencies,
							and locally rooted experiences.
						</div>
					</Reveal>
				</div>
			</div>
		</div>
	);
}
