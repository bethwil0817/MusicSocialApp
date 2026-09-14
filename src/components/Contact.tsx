"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

export default function Contact() {
	const formSearch = window.location.search || null;
	const [formState, setFormState] = useState<
		"Experience" | "Residency" | "Membership" | "Partner" | "Consulting" | null
	>(null);
	const autoRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (formSearch) {
			if (formSearch.includes("Experience")) {
				setFormState("Experience");
			} else if (formSearch.includes("Residency")) {
				setFormState("Residency");
			} else if (formSearch.includes("Membership")) {
				setFormState("Membership");
			} else if (formSearch.includes("Partner")) {
				setFormState("Partner");
			} else if (formSearch.includes("Consulting")) {
				setFormState("Consulting");
			}
			handleScroll(autoRef);
		}
	}, []);

	const handleScroll = (refName: any) => {
		refName.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<div
				className="bg-[rgb(59,33,2)] pb-20 w-full h-full  min-h-screen"
				style={{ fontFamily: "'Montserrat', sans-serif" }}
			>
				<div className="p-6">
					<Reveal delayVal={0}>
						<h1 className="pt-30 text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase">
							Contact or Apply
						</h1>
					</Reveal>
					<Reveal delayVal={0.6}>
						<div className="max-w-[1200px] mx-auto p-6 text-xl text-center text-[rgb(255,229,197)]">
							Whether you are an artist looking for residencies or interested in
							partnering, you decide your path with Revolūtiō. Please complete
							the form that aligns with your interest and we will reach out to
							you as soon as we can.
						</div>
					</Reveal>
					<div>
						<Reveal delayVal={0.7}>
							<div className="mt-2 xl:mt-6 text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase">
								Select the form that aligns with your path:
							</div>
						</Reveal>

						<div
							ref={autoRef}
							className="flex flex-col whitespace-nowrap pt-6 md:flex-row text-[rgb(255,229,197)] md:flex-wrap justify-center text-center mx-auto text-lg max-w-[1000px] gap-6"
						>
							<Reveal
								className="w-auto!"
								delayVal={1}
							>
								<button
									className={`p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)] ${formState === "Experience" ? "bg-[rgb(255,226,190)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Experience");
										handleScroll(autoRef);
									}}
								>
									Plan My Experience Form
								</button>
							</Reveal>
							<Reveal
								className="w-auto!"
								delayVal={1.3}
							>
								<button
									className={`p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)] ${formState === "Residency" ? "bg-[rgb(255,226,190)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Residency");
										handleScroll(autoRef);
									}}
								>
									Artist Residency Application
								</button>
							</Reveal>
							<Reveal
								className="w-auto!"
								delayVal={1.5}
							>
								<button
									className={`p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)] ${formState === "Membership" ? "bg-[rgb(255,226,190)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Membership");
										handleScroll(autoRef);
									}}
								>
									Membership Inquiry Form
								</button>
							</Reveal>
							<Reveal
								className="w-auto!"
								delayVal={1.7}
							>
								<button
									className={`p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)] ${formState === "Partner" ? "bg-[rgb(255,226,190)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Partner");
										handleScroll(autoRef);
									}}
								>
									Partner Inquiry Form
								</button>
							</Reveal>
							<Reveal
								className="w-auto!"
								delayVal={1.9}
							>
								<button
									className={`p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(255,226,190)] ${formState === "Consulting" ? "bg-[rgb(255,226,190)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Consulting");
										handleScroll(autoRef);
									}}
								>
									Consulting Inquiry Form
								</button>
							</Reveal>
						</div>
						<div className={`${formState === null ? "h-100 invisible" : ""}`}>
							{formState === "Experience" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
											Plan My Experience Form
										</div>
										<div className="flex flex-col text-lg p-8 text-[rgb(255,229,197)]">
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="name"
												type="text"
											/>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="email"
												type="email"
												placeholder="example@gmail.com"
											/>

											<label>Phone</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="phone"
												type="tel"
											/>

											<label>Desired Destination</label>
											<select
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="destinations"
												id="destinations"
											>
												<option value="Sea">Sea</option>
												<option value="Woods">Woods</option>
												<option value="Desert">Desert</option>
												<option value="Mountains">Mountains</option>
												<option value="Undecided">Undecided</option>
											</select>

											<label>Desired Start Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="dates"
												type="date"
											/>

											<label>Desired End Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="dates"
												type="date"
											/>

											<label>Number of Guests</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="guests"
												type="text"
											/>

											<label>Budget Range</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="budget"
												type="text"
												placeholder="example: 1000-2000"
											/>

											<label>
												What kind of experience are you looking for?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="experience"
											/>

											<label>What are your interests?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												placeholder="examples: food, music, art, wellness, nature, culture,
									history, photography, retreat, celebration, residency, private
									event"
												name="interests"
											/>

											<label>Lodging needs</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="lodging"
											/>

											<label>Anything else we should know?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="comment"
											/>

											<div className="flex gap-6 w-full">
												<button className="mb-6 w-full bg-[rgb(251,217,174)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Submit
												</button>
												<button className="mb-6 w-full  p-4 border rounded-lg border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Reset
												</button>
											</div>
										</div>
									</div>
								</Reveal>
							)}
							{formState === "Residency" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
											Artist Residency Application
										</div>
										<div className="flex flex-col text-lg p-8 text-[rgb(255,229,197)]">
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="name"
												type="text"
											/>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="email"
												type="email"
												placeholder="example@gmail.com"
											/>

											<label>Location</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="location"
												type="text"
											/>

											<label>Art Form</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="art"
												type="text"
											/>

											<label>Website / Social Links</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="art"
												type="text"
											/>

											<label>Desired Destination</label>
											<select
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="destinations"
												id="destinations"
											>
												<option value="Sea">Sea</option>
												<option value="Woods">Woods</option>
												<option value="Desert">Desert</option>
												<option value="Mountains">Mountains</option>
												<option value="Undecided">Undecided</option>
											</select>

											<label>Preferred Residency Length</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="length"
												type="text"
											/>

											<label>Preferred Start Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="dates"
												type="date"
											/>

											<label>Preferred End Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="dates"
												type="date"
											/>

											<label>Budget Range</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="budget"
												type="text"
												placeholder="example: 1000-2000"
											/>

											<label>Project Description</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="project"
											/>

											<label>What support do you need?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="support"
											/>

											<label>
												Are you interested in performing, teaching, exhibiting,
												or community engagement?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="interests"
											/>

											<label>Lodging Needs</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="lodging"
											/>

											<label>Anything else we should know?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="comment"
											/>

											<div className="flex gap-6 w-full">
												<button className="mb-6 w-full bg-[rgb(251,217,174)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Submit
												</button>
												<button className="mb-6 w-full  p-4 border rounded-lg border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Reset
												</button>
											</div>
										</div>
									</div>
								</Reveal>
							)}
							{formState === "Membership" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
											Membership Inquiry
										</div>
										<div className="flex flex-col text-lg p-8 text-[rgb(255,229,197)]">
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="name"
												type="text"
											/>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="email"
												type="email"
												placeholder="example@gmail.com"
											/>

											<label>
												What is your level of interest in being a member?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="interest"
											/>

											<label>What are you hoping to access?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="access"
											/>

											<label>Destinations of interest</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="destinations"
												placeholder="Sea, Mountains, Desert, Woods"
											/>

											<label>
												Are you interested in supporting artists or events?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="support"
											/>

											<div className="flex gap-6 w-full">
												<button className="mb-6 w-full bg-[rgb(251,217,174)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Submit
												</button>
												<button className="mb-6 w-full  p-4 border rounded-lg border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
													Reset
												</button>
											</div>
										</div>
									</div>
								</Reveal>
							)}
							{formState === "Partner" && (
								<Reveal delayVal={0}>
									<div>
										<div className="mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-6 rounded-lg">
											<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
												Partner Inquiry
											</div>
											<div className="flex flex-col text-lg p-8 text-[rgb(255,229,197)]">
												<input
													type="hidden"
													name="_captcha"
													value="false"
												></input>
												<label>Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="name"
													type="text"
												/>
												<label>Email</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="email"
													type="email"
													placeholder="example@gmail.com"
												/>

												<label>Organization/Business Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="organization"
													type="text"
												/>
												<label>Type of partnership</label>
												<textarea
													className="mb-6 p-4 border rounded border-[rgb(255,229,197)]"
													name="partnership"
												/>
												<label>What are you hoping to build?</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="build"
												/>
												<label>Available spaces / resources</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="resources"
												/>
												<label>Timeline</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="timeline"
												/>
												<div className="flex gap-6 w-full">
													<button className="mb-6 w-full bg-[rgb(251,217,174)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
														Submit
													</button>
													<button className="mb-6 w-full  p-4 border rounded-lg border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
														Reset
													</button>
												</div>
											</div>
										</div>
									</div>
								</Reveal>
							)}
							{formState === "Consulting" && (
								<Reveal delayVal={0}>
									<div>
										<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-6 rounded-lg">
											<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
												Consulting Inquiry
											</div>
											<div className="flex flex-col text-lg p-8 text-[rgb(255,229,197)]">
												<input
													type="hidden"
													name="_captcha"
													value="false"
												></input>

												<label>Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="name"
													type="text"
												/>

												<label>Email</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="email"
													type="email"
												/>

												<label>Organization/Business Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="organization"
													type="text"
												/>
												<label>Type of support needed</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="support"
												/>
												<label>Project description</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="project"
												/>

												<label>Timeline</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="timeline"
												/>

												<label>Budget Range</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="budget"
													type="text"
													placeholder="example: 1000-2000"
												/>

												<div className="flex gap-6 w-full">
													<button className="mb-6 w-full bg-[rgb(251,217,174)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
														Submit
													</button>
													<button className="mb-6 w-full  p-4 border rounded-lg border-[rgb(255,229,197)] hover:bg-[rgb(255,239,220)] hover:text-[#3a250b]">
														Reset
													</button>
												</div>
											</div>
										</div>
									</div>
								</Reveal>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
