import Link from "next/link";

export default function Footer() {
	return (
		<div className="bg-[rgb(10,25,15)] -mt-6 text-[rgb(253,240,214)]">
			<div className="grid gap-6 md:grid-cols-2 relative w-full px-4 lg:px-20 pt-20">
				<div className="lg:border-r border-[rgb(253,240,214)] p-8 my-auto">
					<div className="mb-8 mt-2 xl:mt-6 grid gap-6 text-[30px] md:text-[40px] tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center m-auto uppercase">
						Revolūtiō Global Culture Club
					</div>
					<div className="flex-col md:flex-row flex mb-6 text-xl w-full justify-between text-[rgb(253,240,214)] text-center m-auto">
						<div>Story.</div>
						<div>Culture.</div>
						<div>Connection.</div>
						<div>Experience.</div>
					</div>
				</div>
				<div>
					<div className="underline uppercase flex text-center text-[rgb(253,240,214)] justify-center underline-offset-8 text-xl tracking-wide sm:tracking-[0.35em] pb-6">
						Navigation
					</div>
					<div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 text-center text-[rgb(253,240,214)]">
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/"
						>
							Home
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/experiences"
						>
							Experiences
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/experiences"
						>
							Residencies
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/experiences"
						>
							Memberships
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/destinations"
						>
							Destinations
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/about"
						>
							About
						</Link>
						<Link
							className="p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]"
							href="/contact"
						>
							Contact/Apply
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
