import { Link } from "react-router-dom";

export default function Footer() {
	return (
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
					<div className="grid text-center grid-cols-1 text-[rgb(255,226,190)]">
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]"
							to="/"
							state={{ showIntro: false }}
						>
							Home
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]"
							to="/experiences"
							reloadDocument
						>
							Experiences
						</Link>
						{/* <button className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
							Residencies
						</button> */}
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]"
							to="/destinations"
							reloadDocument
						>
							Destinations
						</Link>
						{/* <button className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
							Membership
						</button> */}
						{/* <button className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
							Events
						</button> */}
						{/* <button className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
							Consulting
						</button> */}
						{/* <button className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]">
							Artists
						</button> */}
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]"
							to="/about"
							reloadDocument
						>
							About
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)]"
							to="/contact"
							reloadDocument
						>
							Contact
						</Link>
					</div>
				</div>
			</div>
			<div className="text-center m-auto p-6">
				Revolūtiō Global Culture Club © 2026 Beth Willner. All Rights Reserved.
			</div>
		</div>
	);
}
