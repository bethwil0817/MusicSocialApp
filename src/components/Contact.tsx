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

	const [honeypot, setHoneypot] = useState("");
	const [revealSuccess, setRevealSuccess] = useState(false);
	const [result, setResult] = useState("");

	const onSubmit = async (event: any, accessKey: string) => {
		event.preventDefault();
		setResult("Sending....");
		const formData = new FormData(event.target);
		formData.append("access_key", `${accessKey}`);

		if (honeypot !== "") {
			setTimeout(() => {
				setRevealSuccess(true);
				setResult("Form Submitted Successfully");
				event.currentTarget.reset();
				setHoneypot(""); // reset the honeypot state
			}, 1000);
			return; // Stop execution right here
		} else {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (data.success) {
				setRevealSuccess(true);
				setResult("Form Submitted Successfully");
				event.target.reset();
				// handleScroll(autoRef);
			} else {
				setRevealSuccess(false);
				setResult("Error");
				// handleScroll(autoRef);
			}
		}
	};

	const onExperienceSubmit = async (event: any) => {
		onSubmit(event, "0a00650c-c48d-466a-9ecf-a6f5a45a1b86");
	};

	const onResidencySubmit = async (event: any) => {
		onSubmit(event, "e319ea58-12b3-4a80-9b7c-f4ef2e94c8a6");
	};

	const onMembershipSubmit = async (event: any) => {
		onSubmit(event, "06b3e308-cd1f-403b-86f9-08f3b9622420");
	};

	const onPartnerSubmit = async (event: any) => {
		onSubmit(event, "6dffd27c-f0f1-49c7-b469-988688bff0ea");
	};

	const onConsultingSubmit = async (event: any) => {
		onSubmit(event, "f0370865-7c9e-4d62-881c-75fedec0cacb");
	};

	return (
		<div>
			<div
				className="bg-[rgb(59,33,2)] pb-20 w-full h-full  min-h-screen"
				style={{ fontFamily: "'Montserrat', sans-serif" }}
			>
				<div className="p-4 md:p-6">
					<Reveal>
						<h1 className="pt-30 text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase">
							Contact or Apply
						</h1>
					</Reveal>
					<Reveal>
						<div className="py-6 max-w-[1200px] mx-auto text-xl text-center text-[rgb(253,240,214)]">
							Whether you are an artist looking for residencies or interested in
							partnering, you decide your path with Revolūtiō. Please complete
							the form that aligns with your interest and we will reach out to
							you as soon as we can.
						</div>
					</Reveal>
					<div>
						<Reveal>
							<div className="mt-2 xl:mt-6 text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase">
								Select the form that aligns with your path:
							</div>
						</Reveal>

						<div
							ref={autoRef}
							className="flex flex-col whitespace-nowrap pt-6 md:flex-row text-[rgb(253,240,214)] md:flex-wrap justify-center text-center mx-auto text-lg max-w-[1000px] gap-6"
						>
							<Reveal className="w-auto!">
								<button
									className={`p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Experience" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Experience");
										handleScroll(autoRef);
										setHoneypot("");
										setRevealSuccess(false);
									}}
								>
									Plan My Experience Form
								</button>
							</Reveal>
							<Reveal className="w-auto!">
								<button
									className={`p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Residency" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Residency");
										handleScroll(autoRef);
										setHoneypot("");
										setRevealSuccess(false);
									}}
								>
									Artist Residency Application
								</button>
							</Reveal>
							<Reveal className="w-auto!">
								<button
									className={`p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Membership" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Membership");
										handleScroll(autoRef);
										setHoneypot("");
										setRevealSuccess(false);
									}}
								>
									Membership Inquiry Form
								</button>
							</Reveal>
							<Reveal className="w-auto!">
								<button
									className={`p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Partner" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Partner");
										handleScroll(autoRef);
										setHoneypot("");
										setRevealSuccess(false);
									}}
								>
									Partner Inquiry Form
								</button>
							</Reveal>
							<Reveal className="w-auto!">
								<button
									className={`p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Consulting" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`}
									onClick={() => {
										setFormState("Consulting");
										handleScroll(autoRef);
										setHoneypot("");
										setRevealSuccess(false);
									}}
								>
									Consulting Inquiry Form
								</button>
							</Reveal>
						</div>
						<div className={`${formState === null ? "h-100 invisible" : ""}`}>
							{formState === "Experience" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase">
											Plan My Experience Form
										</div>
										<form
											onSubmit={onExperienceSubmit}
											className="flex flex-col text-lg text-[rgb(253,240,214)]"
										>
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="name"
												id="name"
												type="text"
												required
											/>

											<div
												style={{ display: "none" }}
												aria-hidden="true"
											>
												<label htmlFor="mid_name">Middle Name</label>
												<input
													id="mid_name"
													type="text"
													name="mid_name"
													tabIndex={-1} // Prevents keyboard users from accidentally tabbing into it
													autoComplete="off"
													value={honeypot}
													onChange={(e) => setHoneypot(e.target.value)}
												/>
											</div>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="email"
												type="email"
												id="email"
												placeholder="example@gmail.com"
												required
											/>

											<label>Phone</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="phone"
												id="phone"
												type="tel"
												required
											/>

											<label>Desired Destination</label>
											<select
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="destinations"
												id="destinations"
												required
											>
												<option value="Sea">Sea</option>
												<option value="Woods">Woods</option>
												<option value="Desert">Desert</option>
												<option value="Mountains">Mountains</option>
												<option value="Undecided">Undecided</option>
											</select>

											<label>Desired Start Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="startDate"
												id="startDate"
												type="date"
												required
											/>

											<label>Desired End Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="endDate"
												id="endDAte"
												required
												type="date"
											/>

											<label>Number of Guests</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="guests"
												id="guests"
												type="text"
												required
											/>

											<label>Budget Range</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="budget"
												id="budget"
												type="text"
												placeholder="example: 1000-2000"
												required
											/>

											<label>
												What kind of experience are you looking for?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="experience"
												id="experience"
												required
											/>

											<label>What are your interests?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												placeholder="examples: food, music, art, wellness, nature, culture, history, photography, retreat, celebration, residency, private event"
												name="interests"
												id="interests"
												required
											/>

											<label>Lodging needs</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="lodging"
												id="lodging"
												required
											/>

											<label>Anything else we should know?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="comment"
												id="comment"
											/>

											<div className="flex gap-6 w-full">
												<button
													className="mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="submit"
												>
													Submit
												</button>
												<button
													className="mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="reset"
												>
													Reset
												</button>
											</div>
											{revealSuccess && (
												<Reveal>
													<div className="flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]">
														Thank you for your submission! We will connect with
														you as soon as possible after review of your
														submission!
													</div>
												</Reveal>
											)}
										</form>
									</div>
								</Reveal>
							)}
							{formState === "Residency" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase">
											Artist Residency Application
										</div>
										<form
											onSubmit={onResidencySubmit}
											className="flex flex-col text-lg text-[rgb(253,240,214)]"
										>
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="name"
												id="name"
												type="text"
												required
											/>

											<div
												style={{ display: "none" }}
												aria-hidden="true"
											>
												<label htmlFor="mid_name">Middle Name</label>
												<input
													id="mid_name"
													type="text"
													name="mid_name"
													tabIndex={-1} // Prevents keyboard users from accidentally tabbing into it
													autoComplete="off"
													value={honeypot}
													onChange={(e) => setHoneypot(e.target.value)}
												/>
											</div>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="email"
												id="email"
												type="email"
												placeholder="example@gmail.com"
												required
											/>

											<label>Location</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="location"
												id="location"
												type="text"
												required
											/>

											<label>Art Form</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="art"
												id="art"
												type="text"
												required
											/>

											<label>Website / Social Links</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="socials"
												id="socials"
												required
												type="text"
											/>

											<label>Desired Destination</label>
											<select
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="destinations"
												id="destinations"
												required
											>
												<option value="Sea">Sea</option>
												<option value="Woods">Woods</option>
												<option value="Desert">Desert</option>
												<option value="Mountains">Mountains</option>
												<option value="Undecided">Undecided</option>
											</select>

											<label>Preferred Residency Length</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="length"
												id="length"
												type="text"
												required
											/>

											<label>Preferred Start Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="startDate"
												id="startDate"
												type="date"
												required
											/>

											<label>Preferred End Date</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="endDate"
												id="endDate"
												type="date"
												required
											/>

											<label>Budget Range</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="budget"
												id="budget"
												type="text"
												placeholder="example: 1000-2000"
												required
											/>

											<label>Project Description</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="project"
												id="project"
												required
											/>

											<label>What support do you need?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="support"
												id="support"
												required
											/>

											<label>
												Are you interested in performing, teaching, exhibiting,
												or community engagement?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="interests"
												id="interests"
												required
											/>

											<label>Lodging Needs</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="lodging"
												id="lodging"
												required
											/>

											<label>Anything else we should know?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(253,240,214)]"
												name="comment"
												id="comment"
												required
											/>

											<div className="flex gap-6 w-full">
												<button
													className="mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="submit"
												>
													Submit
												</button>
												<button
													className="mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="reset"
												>
													Reset
												</button>
											</div>
											{revealSuccess && (
												<Reveal>
													<div className="flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]">
														Thank you for your submission! We will connect with
														you as soon as possible after review of your
														submission!
													</div>
												</Reveal>
											)}
										</form>
									</div>
								</Reveal>
							)}
							{formState === "Membership" && (
								<Reveal delayVal={0}>
									<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg">
										<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
											Membership Inquiry
										</div>
										<form
											onSubmit={onMembershipSubmit}
											className="flex flex-col text-lg text-[rgb(255,229,197)]"
										>
											<input
												type="hidden"
												name="_captcha"
												value="false"
											></input>

											<label>Name</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="name"
												id="name"
												type="text"
												required
											/>

											<div
												style={{ display: "none" }}
												aria-hidden="true"
											>
												<label htmlFor="mid_name">Mid Name</label>
												<input
													id="mid_name"
													type="text"
													name="mid_name"
													tabIndex={-1} // Prevents keyboard users from accidentally tabbing into it
													autoComplete="off"
													value={honeypot}
													onChange={(e) => setHoneypot(e.target.value)}
												/>
											</div>

											<label>Email</label>
											<input
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="email"
												type="email"
												id="email"
												placeholder="example@gmail.com"
												required
											/>

											<label>
												What is your level of interest in being a member?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="interest"
												id="interest"
												required
											/>

											<label>What are you hoping to access?</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="access"
												required
												id="access"
											/>

											<label>Destinations of interest</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="destinations"
												id="destinations"
												placeholder="Sea, Mountains, Desert, Woods"
												required
											/>

											<label>
												Are you interested in supporting artists or events?
											</label>
											<textarea
												className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
												name="support"
												id="support"
												required
											/>

											<div className="flex gap-6 w-full">
												<button
													className="mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="submit"
												>
													Submit
												</button>
												<button
													className="mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
													type="reset"
												>
													Reset
												</button>
											</div>
											{revealSuccess && (
												<Reveal>
													<div className="flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]">
														Thank you for your submission! We will connect with
														you as soon as possible after review of your
														submission!
													</div>
												</Reveal>
											)}
										</form>
									</div>
								</Reveal>
							)}
							{formState === "Partner" && (
								<Reveal delayVal={0}>
									<div>
										<div className="mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg">
											<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
												Partner Inquiry
											</div>
											<form
												onSubmit={onPartnerSubmit}
												className="flex flex-col text-lg text-[rgb(255,229,197)]"
											>
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
													id="name"
													required
												/>

												<div
													style={{ display: "none" }}
													aria-hidden="true"
												>
													<label htmlFor="mid_name">Middle Name</label>
													<input
														id="mid_name"
														type="text"
														name="mid_name"
														tabIndex={-1} // Prevents keyboard users from accidentally tabbing into it
														autoComplete="off"
														value={honeypot}
														onChange={(e) => setHoneypot(e.target.value)}
													/>
												</div>

												<label>Email</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="email"
													type="email"
													id="email"
													placeholder="example@gmail.com"
													required
												/>

												<label>Organization/Business Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="organization"
													type="text"
													id="organization"
													required
												/>
												<label>Type of partnership</label>
												<textarea
													className="mb-6 p-4 border rounded border-[rgb(255,229,197)]"
													name="partnership"
													id="partnership"
													required
												/>
												<label>What are you hoping to build?</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="build"
													id="build"
													required
												/>
												<label>Available spaces / resources</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="resources"
													id="resources"
													required
												/>
												<label>Timeline</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="timeline"
													id="timeline"
													required
												/>
												<div className="flex gap-6 w-full">
													<button
														className="mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
														type="submit"
													>
														Submit
													</button>
													<button
														className="mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
														type="reset"
													>
														Reset
													</button>
												</div>
												{revealSuccess && (
													<Reveal>
														<div className="flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]">
															Thank you for your submission! We will connect
															with you as soon as possible after review of your
															submission!
														</div>
													</Reveal>
												)}
											</form>
										</div>
									</div>
								</Reveal>
							)}
							{formState === "Consulting" && (
								<Reveal delayVal={0}>
									<div>
										<div className="mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg">
											<div className="text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase">
												Consulting Inquiry
											</div>
											<div className="flex flex-col text-lg text-[rgb(255,229,197)]">
												<input
													type="hidden"
													name="_captcha"
													value="false"
												></input>

												<label>Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="name"
													id="name"
													type="text"
													required
												/>

												<div
													style={{ display: "none" }}
													aria-hidden="true"
												>
													<label htmlFor="mid_name">Middle Name</label>
													<input
														id="mid_name"
														type="text"
														name="mid_name"
														tabIndex={-1} // Prevents keyboard users from accidentally tabbing into it
														autoComplete="off"
														value={honeypot}
														onChange={(e) => setHoneypot(e.target.value)}
													/>
												</div>

												<label>Email</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="email"
													id="email"
													type="email"
													required
												/>

												<label>Organization/Business Name</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="organization"
													id="organization"
													type="text"
													required
												/>
												<label>Type of support needed</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="support"
													id="support"
													required
												/>
												<label>Project description</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="project"
													id="project"
													required
												/>

												<label>Timeline</label>
												<textarea
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="timeline"
													id="timeline"
													required
												/>

												<label>Budget Range</label>
												<input
													className="mb-6 p-2 border rounded border-[rgb(255,229,197)]"
													name="budget"
													id="budget"
													type="text"
													required
													placeholder="example: 1000-2000"
												/>

												<div className="flex gap-6 w-full">
													<button
														className="mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
														type="submit"
													>
														Submit
													</button>
													<button
														className="mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]"
														type="reset"
													>
														Reset
													</button>
												</div>
												{revealSuccess && (
													<Reveal>
														<div className="flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]">
															Thank you for your submission! We will connect
															with you as soon as possible after review of your
															submission!
														</div>
													</Reveal>
												)}
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
