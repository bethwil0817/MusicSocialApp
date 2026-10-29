(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
75854, ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
var __TURBOPACK__imported__module__96199__ = __turbopack_context__.i(96199);
"use client";
;
;
;
function Contact() {
    const [formState, setFormState] = (0, __TURBOPACK__imported__module__71645__["useState"])(null);
    const autoRef = (0, __TURBOPACK__imported__module__71645__["useRef"])(null);
    (0, __TURBOPACK__imported__module__71645__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const requestedForm = new URLSearchParams(window?.location?.search).get("form");
        if (requestedForm === "Experience" || requestedForm === "Residency" || requestedForm === "Membership" || requestedForm === "Partner" || requestedForm === "Consulting") {
            setFormState(requestedForm);
        }
    }, []);
    (0, __TURBOPACK__imported__module__71645__["useEffect"])(()=>{
        if (formState) {
            autoRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [
        formState
    ]);
    const [honeypot, setHoneypot] = (0, __TURBOPACK__imported__module__71645__["useState"])("");
    const [revealSuccess, setRevealSuccess] = (0, __TURBOPACK__imported__module__71645__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__71645__["useState"])("");
    const onSubmit = async (event, accessKey)=>{
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", `${accessKey}`);
        if (honeypot !== "") {
            setTimeout(()=>{
                setRevealSuccess(true);
                setResult("Form Submitted Successfully");
                event.currentTarget.reset();
                setHoneypot(""); // reset the honeypot state
            }, 1000);
            return; // Stop execution right here
        } else {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setRevealSuccess(true);
                setResult("Form Submitted Successfully");
                event.target.reset();
            } else {
                setRevealSuccess(false);
                setResult("Error");
            }
        }
    };
    const onExperienceSubmit = async (event)=>{
        onSubmit(event, "0a00650c-c48d-466a-9ecf-a6f5a45a1b86");
    };
    const onResidencySubmit = async (event)=>{
        onSubmit(event, "e319ea58-12b3-4a80-9b7c-f4ef2e94c8a6");
    };
    const onMembershipSubmit = async (event)=>{
        onSubmit(event, "06b3e308-cd1f-403b-86f9-08f3b9622420");
    };
    const onPartnerSubmit = async (event)=>{
        onSubmit(event, "6dffd27c-f0f1-49c7-b469-988688bff0ea");
    };
    const onConsultingSubmit = async (event)=>{
        onSubmit(event, "f0370865-7c9e-4d62-881c-75fedec0cacb");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
            className: "bg-[rgb(59,33,2)] pb-20 w-full h-full  min-h-screen",
            style: {
                fontFamily: "'Montserrat', sans-serif"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                className: "p-4 md:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("h1", {
                            className: "pt-30 text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase",
                            children: "Contact or Apply"
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                            className: "py-6 max-w-[1200px] mx-auto text-xl text-center text-[rgb(253,240,214)]",
                            children: "Whether you are an artist looking for residencies or interested in partnering, you decide your path with Revolūtiō. Please complete the form that aligns with your interest and we will reach out to you as soon as we can."
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    className: "mt-2 xl:mt-6 text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(195,112,10)] text-center justify-center items-center uppercase",
                                    children: "Select the form that aligns with your path:"
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                ref: autoRef,
                                className: "flex flex-col whitespace-nowrap pt-6 md:flex-row text-[rgb(253,240,214)] md:flex-wrap justify-center text-center mx-auto text-lg max-w-[1000px] gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        className: "w-auto!",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                            className: `p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Experience" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`,
                                            onClick: ()=>{
                                                setFormState("Experience");
                                                setHoneypot("");
                                                setRevealSuccess(false);
                                            },
                                            children: "Plan My Experience Form"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        className: "w-auto!",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                            className: `p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Residency" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`,
                                            onClick: ()=>{
                                                setFormState("Residency");
                                                setHoneypot("");
                                                setRevealSuccess(false);
                                            },
                                            children: "Artist Residency Application"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        className: "w-auto!",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                            className: `p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Membership" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`,
                                            onClick: ()=>{
                                                setFormState("Membership");
                                                setHoneypot("");
                                                setRevealSuccess(false);
                                            },
                                            children: "Membership Inquiry Form"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        className: "w-auto!",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                            className: `p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Partner" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`,
                                            onClick: ()=>{
                                                setFormState("Partner");
                                                setHoneypot("");
                                                setRevealSuccess(false);
                                            },
                                            children: "Partner Inquiry Form"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        className: "w-auto!",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                            className: `p-2 sm:p-4 rounded-lg transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)] ${formState === "Consulting" ? "bg-[rgb(253,240,214)] text-[rgb(10,25,15)]" : ""}`,
                                            onClick: ()=>{
                                                setFormState("Consulting");
                                                setHoneypot("");
                                                setRevealSuccess(false);
                                            },
                                            children: "Consulting Inquiry Form"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: `${formState === null ? "h-100 invisible" : ""}`,
                                children: [
                                    formState === "Experience" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 0,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                    className: "text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                    children: "Plan My Experience Form"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("form", {
                                                    onSubmit: onExperienceSubmit,
                                                    className: "flex flex-col text-lg text-[rgb(253,240,214)]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            type: "hidden",
                                                            name: "_captcha",
                                                            value: "false"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Name"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "name",
                                                            id: "name",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            style: {
                                                                display: "none"
                                                            },
                                                            "aria-hidden": "true",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                    htmlFor: "mid_name",
                                                                    children: "Middle Name"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                    id: "mid_name",
                                                                    type: "text",
                                                                    name: "mid_name",
                                                                    tabIndex: -1,
                                                                    autoComplete: "off",
                                                                    value: honeypot,
                                                                    onChange: (e)=>setHoneypot(e.target.value)
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Email"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "email",
                                                            type: "email",
                                                            id: "email",
                                                            placeholder: "example@gmail.com",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Phone"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "phone",
                                                            id: "phone",
                                                            type: "tel",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Desired Destination"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("select", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "destinations",
                                                            id: "destinations",
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Sea",
                                                                    children: "Sea"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Woods",
                                                                    children: "Woods"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Desert",
                                                                    children: "Desert"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Mountains",
                                                                    children: "Mountains"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Undecided",
                                                                    children: "Undecided"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Desired Start Date"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "startDate",
                                                            id: "startDate",
                                                            type: "date",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Desired End Date"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "endDate",
                                                            id: "endDAte",
                                                            required: true,
                                                            type: "date"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Number of Guests"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "guests",
                                                            id: "guests",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Budget Range"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "budget",
                                                            id: "budget",
                                                            type: "text",
                                                            placeholder: "example: 1000-2000",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "What kind of experience are you looking for?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "experience",
                                                            id: "experience",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "What are your interests?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            placeholder: "examples: food, music, art, wellness, nature, culture, history, photography, retreat, celebration, residency, private event",
                                                            name: "interests",
                                                            id: "interests",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Lodging needs"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "lodging",
                                                            id: "lodging",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Anything else we should know?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "comment",
                                                            id: "comment"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: "flex gap-6 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "submit",
                                                                    children: "Submit"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "reset",
                                                                    children: "Reset"
                                                                })
                                                            ]
                                                        }),
                                                        revealSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]",
                                                                children: "Thank you for your submission! We will connect with you as soon as possible after review of your submission!"
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    formState === "Residency" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 0,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                    className: "text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                    children: "Artist Residency Application"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("form", {
                                                    onSubmit: onResidencySubmit,
                                                    className: "flex flex-col text-lg text-[rgb(253,240,214)]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            type: "hidden",
                                                            name: "_captcha",
                                                            value: "false"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Name"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "name",
                                                            id: "name",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            style: {
                                                                display: "none"
                                                            },
                                                            "aria-hidden": "true",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                    htmlFor: "mid_name",
                                                                    children: "Middle Name"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                    id: "mid_name",
                                                                    type: "text",
                                                                    name: "mid_name",
                                                                    tabIndex: -1,
                                                                    autoComplete: "off",
                                                                    value: honeypot,
                                                                    onChange: (e)=>setHoneypot(e.target.value)
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Email"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "email",
                                                            id: "email",
                                                            type: "email",
                                                            placeholder: "example@gmail.com",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Location"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "location",
                                                            id: "location",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Art Form"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "art",
                                                            id: "art",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Website / Social Links"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "socials",
                                                            id: "socials",
                                                            required: true,
                                                            type: "text"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Desired Destination"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("select", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "destinations",
                                                            id: "destinations",
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Sea",
                                                                    children: "Sea"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Woods",
                                                                    children: "Woods"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Desert",
                                                                    children: "Desert"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Mountains",
                                                                    children: "Mountains"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("option", {
                                                                    value: "Undecided",
                                                                    children: "Undecided"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Preferred Residency Length"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "length",
                                                            id: "length",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Preferred Start Date"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "startDate",
                                                            id: "startDate",
                                                            type: "date",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Preferred End Date"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "endDate",
                                                            id: "endDate",
                                                            type: "date",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Budget Range"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "budget",
                                                            id: "budget",
                                                            type: "text",
                                                            placeholder: "example: 1000-2000",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Project Description"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "project",
                                                            id: "project",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "What support do you need?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "support",
                                                            id: "support",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Are you interested in performing, teaching, exhibiting, or community engagement?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "interests",
                                                            id: "interests",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Lodging Needs"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "lodging",
                                                            id: "lodging",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Anything else we should know?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(253,240,214)]",
                                                            name: "comment",
                                                            id: "comment",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: "flex gap-6 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "submit",
                                                                    children: "Submit"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "reset",
                                                                    children: "Reset"
                                                                })
                                                            ]
                                                        }),
                                                        revealSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]",
                                                                children: "Thank you for your submission! We will connect with you as soon as possible after review of your submission!"
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    formState === "Membership" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 0,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                    className: "text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase",
                                                    children: "Membership Inquiry"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("form", {
                                                    onSubmit: onMembershipSubmit,
                                                    className: "flex flex-col text-lg text-[rgb(255,229,197)]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            type: "hidden",
                                                            name: "_captcha",
                                                            value: "false"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Name"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "name",
                                                            id: "name",
                                                            type: "text",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            style: {
                                                                display: "none"
                                                            },
                                                            "aria-hidden": "true",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                    htmlFor: "mid_name",
                                                                    children: "Mid Name"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                    id: "mid_name",
                                                                    type: "text",
                                                                    name: "mid_name",
                                                                    tabIndex: -1,
                                                                    autoComplete: "off",
                                                                    value: honeypot,
                                                                    onChange: (e)=>setHoneypot(e.target.value)
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Email"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "email",
                                                            type: "email",
                                                            id: "email",
                                                            placeholder: "example@gmail.com",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "What is your level of interest in being a member?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "interest",
                                                            id: "interest",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "What are you hoping to access?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "access",
                                                            required: true,
                                                            id: "access"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Destinations of interest"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "destinations",
                                                            id: "destinations",
                                                            placeholder: "Sea, Mountains, Desert, Woods",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                            children: "Are you interested in supporting artists or events?"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                            className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                            name: "support",
                                                            id: "support",
                                                            required: true
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: "flex gap-6 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "submit",
                                                                    children: "Submit"
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                    type: "reset",
                                                                    children: "Reset"
                                                                })
                                                            ]
                                                        }),
                                                        revealSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]",
                                                                children: "Thank you for your submission! We will connect with you as soon as possible after review of your submission!"
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    formState === "Partner" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 0,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "mt-10 bg-linear-210 to-[rgba(255,207,148,0.5)] from-[rgba(195,112,10,0.8)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase",
                                                        children: "Partner Inquiry"
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("form", {
                                                        onSubmit: onPartnerSubmit,
                                                        className: "flex flex-col text-lg text-[rgb(255,229,197)]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                type: "hidden",
                                                                name: "_captcha",
                                                                value: "false"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Name"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "name",
                                                                type: "text",
                                                                id: "name",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                style: {
                                                                    display: "none"
                                                                },
                                                                "aria-hidden": "true",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                        htmlFor: "mid_name",
                                                                        children: "Middle Name"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                        id: "mid_name",
                                                                        type: "text",
                                                                        name: "mid_name",
                                                                        tabIndex: -1,
                                                                        autoComplete: "off",
                                                                        value: honeypot,
                                                                        onChange: (e)=>setHoneypot(e.target.value)
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Email"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "email",
                                                                type: "email",
                                                                id: "email",
                                                                placeholder: "example@gmail.com",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Organization/Business Name"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "organization",
                                                                type: "text",
                                                                id: "organization",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Type of partnership"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-4 border rounded border-[rgb(255,229,197)]",
                                                                name: "partnership",
                                                                id: "partnership",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "What are you hoping to build?"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "build",
                                                                id: "build",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Available spaces / resources"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "resources",
                                                                id: "resources",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Timeline"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "timeline",
                                                                id: "timeline",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "flex gap-6 w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                        type: "submit",
                                                                        children: "Submit"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                        type: "reset",
                                                                        children: "Reset"
                                                                    })
                                                                ]
                                                            }),
                                                            revealSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]",
                                                                    children: "Thank you for your submission! We will connect with you as soon as possible after review of your submission!"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    formState === "Consulting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 0,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "mt-10 bg-linear-210 to-[rgba(195,112,10,0.8)] from-[rgba(255,207,148,0.5)] max-w-[1000px] mx-auto p-4 md:p-6 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(255,229,197)] text-center justify-center items-center uppercase",
                                                        children: "Consulting Inquiry"
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "flex flex-col text-lg text-[rgb(255,229,197)]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                type: "hidden",
                                                                name: "_captcha",
                                                                value: "false"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Name"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "name",
                                                                id: "name",
                                                                type: "text",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                style: {
                                                                    display: "none"
                                                                },
                                                                "aria-hidden": "true",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                        htmlFor: "mid_name",
                                                                        children: "Middle Name"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                        id: "mid_name",
                                                                        type: "text",
                                                                        name: "mid_name",
                                                                        tabIndex: -1,
                                                                        autoComplete: "off",
                                                                        value: honeypot,
                                                                        onChange: (e)=>setHoneypot(e.target.value)
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Email"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "email",
                                                                id: "email",
                                                                type: "email",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Organization/Business Name"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "organization",
                                                                id: "organization",
                                                                type: "text",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Type of support needed"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "support",
                                                                id: "support",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Project description"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "project",
                                                                id: "project",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Timeline"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("textarea", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "timeline",
                                                                id: "timeline",
                                                                required: true
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("label", {
                                                                children: "Budget Range"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("input", {
                                                                className: "mb-6 p-2 border rounded border-[rgb(255,229,197)]",
                                                                name: "budget",
                                                                id: "budget",
                                                                type: "text",
                                                                required: true,
                                                                placeholder: "example: 1000-2000"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "flex gap-6 w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "mb-6 w-full hover:cursor-pointer bg-[rgb(253,240,214)] p-4 border rounded-lg text-[#3a250b] border-[rgb(255,229,197)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                        type: "submit",
                                                                        children: "Submit"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "mb-6 w-full hover:cursor-pointer p-4 border rounded-lg border-[rgb(253,240,214)] hover:bg-[rgb(251,217,174)] hover:text-[#3a250b]",
                                                                        type: "reset",
                                                                        children: "Reset"
                                                                    })
                                                                ]
                                                            }),
                                                            revealSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "flex justify-center font-bold text-xl items-center text-center p-2 rounded-lg text-[rgb(10,25,15)]",
                                                                    children: "Thank you for your submission! We will connect with you as soon as possible after review of your submission!"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
}
__turbopack_context__.s([
    "default",
    0,
    Contact
]);
}),
]);