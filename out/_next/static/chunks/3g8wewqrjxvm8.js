(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
3679, ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
var __TURBOPACK__imported__module__87652__ = __turbopack_context__.i(87652);
var __TURBOPACK__imported__module__96199__ = __turbopack_context__.i(96199);
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
var __TURBOPACK__imported__module__48663__ = __turbopack_context__.i(48663);
var __TURBOPACK__imported__module__22016__ = __turbopack_context__.i(22016);
"use client";
;
;
;
;
;
;
const Membership = ()=>{
    const videoRef = (0, __TURBOPACK__imported__module__71645__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__87652__["useInView"])(videoRef);
    const membershipPricing = [
        {
            title: "Explorer Member",
            desc: "Best for people who want to stay connected and receive early access.",
            price: "$250/year",
            subTitle: "Includes:",
            bulletPoints: [
                "Newsletter and member updates",
                "Early event announcements",
                "Access to member-only opportunities",
                "Priority inquiry review",
                "Featured artist updates"
            ]
        },
        {
            title: "Culture Club Member",
            desc: "Best for people who want concierge-style support and priority access.",
            price: "$1,000/year",
            subTitle: "Includes:",
            bulletPoints: [
                "One annual experience design session",
                "Priority booking support",
                "Early access to retreats and events",
                "Member pricing opportunities when available",
                "Artist showcase invitations",
                "Help sourcing entertainment or experiences"
            ]
        },
        {
            title: "Patron Member",
            desc: "Best for supporters, donors, frequent travelers, and people who want deeper access.",
            price: "$2,500/year",
            subTitle: "Includes:",
            bulletPoints: [
                "Two annual experience design sessions",
                "Priority concierge support",
                "Private event invitations",
                "Artist residency updates",
                "Recognition as a Revolūtiō supporter if desired",
                "Preferred access to VIP retreats and cultural experiences"
            ]
        },
        {
            title: "Founding Circle Member",
            desc: "Best for patrons, sponsors, partners, and people helping launch the ecosystem.",
            price: "$5,000–$10,000/year",
            subTitle: "Includes:",
            bulletPoints: [
                "Custom concierge support",
                "Private experience planning",
                "Invitation to founding events",
                "Recognition if desired",
                "Opportunity to help sponsor artists, workshops, or community programming",
                "First access to future destinations"
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
        className: "bg-[#fdf9f1] pt-10",
        style: {
            fontFamily: "'Montserrat', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                className: "w-full bg-[rgba(253,240,214,0.96)] flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "w-full relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("video", {
                            className: "w-screen h-full md:bg-center object-right object-cover absolute top-0 right-0 z-10 opacity-50",
                            playsInline: true,
                            autoPlay: true,
                            muted: true,
                            preload: "auto",
                            ref: videoRef,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("source", {
                                src: __TURBOPACK__imported__module__48663__["default"],
                                type: "video/mp4"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            className: "relative px-4 md:px-6 py-40 z-20 flex h-full items-center flex-col justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "my-2 md:my-6 text-xl sm:text-2xl lg:text-3xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(61,105,75)] text-center uppercase",
                                        children: "Your Personal Entertainment & Experience Concierge"
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        id: "paratitle",
                                        className: "my-2 md:my-6 text-4xl sm:text-5xl lg:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase",
                                        children: "Global Culture Club Membership"
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "pt-4 text-[rgb(31,73,45)] h-full text-2xl flex text-center justify-center",
                                        children: "A global culture club for meaningful travel, art, and connection."
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                className: "bg-gradient-to-b pb-20 to-[rgb(10,25,15)] from-[rgb(252,247,235)] pt-20 px-4 md:px-6 flex flex-col items-center h-auto justify-between gap-6 text-[rgb(10,25,15)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                        className: "max-w-[1500px] flex flex-col w-full justify-center mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "border-[rgb(61,105,75)] rounded-xl border-dashed border-2 p-6 w-auto max-w-max",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        xVal: -200,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            className: "sm:ml-6 text-left sm:tracking-[0.35em] text-[rgb(61,105,75)] uppercase text-2xl sm:text-3xl lg:text-4xl",
                                            children: "Who is it for?"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        xVal: 200,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            className: "text-sm max-w-[1100px] text-[rgb(10,25,15)] mt-6 flex justify-start text-left sm:text-base lg:text-xl h-full rounded-lg",
                                            children: "The Revolūtiō Global Culture Club is a membership for people who want access to more meaningful experiences, local connections, artist-led events, private performances, curated travel, and cultural opportunities."
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "border-[rgb(61,105,75)] rounded-xl border-dashed border-2 mt-20 p-6 w-auto max-w-max ml-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        xVal: -200,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            className: "ml-6 text-right sm:tracking-[0.35em] text-[rgb(61,105,75)] uppercase text-2xl sm:text-3xl lg:text-4xl",
                                            children: "What is Included?"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        xVal: 200,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                            className: "sm:mr-6 text-sm max-w-[1100px] mt-6 ml-auto flex justify-end text-right sm:text-base lg:text-xl h-full rounded-lg text-[rgb(10,25,15)]",
                                            children: "Members can receive help planning experiences, booking entertainment, discovering artists, joining retreats, accessing private events, and creating custom travel itineraries across Revolūtiō destinations."
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                        className: "text-center mt-6 py-20 pt-40 text-[rgba(253,240,214)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    className: "sm:tracking-[0.35em] mb-4 text-[rgb(10,25,15)] uppercase text-3xl sm:text-5xl lg:text-6xl",
                                    children: "Membership Pricing"
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    className: "text-lg sm:text-xl text-[rgb(52,69,58)]",
                                    children: "Your access to ongoing support and relationships across our network"
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10",
                                    children: membershipPricing.map((price, index)=>{
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: `border transition-all ease-in-out hover:[&_h1]:text-[26px] border-[rgb(71,102,100)] p-4 md:p-6 text-center hover:bg-[rgb(52,69,58)] rounded-xl`,
                                            id: "membershipPricing",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("h1", {
                                                            className: "text-center mb-6 text-xl md:text-2xl items-center justify-center uppercase gap-4 transition-all ease-in-out duration-300 text-[rgb(253,240,214)]",
                                                            children: price.title
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-center text-base items-center justify-center gap-4 text-[rgb(253,240,214)]",
                                                            children: price.desc
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                    className: "pt-5 flex gap-4 text-center justify-center",
                                                    children: price.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "font-bold  tracking-wide text-xl sm:text-2xl text-[rgb(253,240,214)]",
                                                        children: price.time
                                                    })
                                                }),
                                                price.subTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "mt-6 mb-2 font-bold text-xl text-[rgb(253,240,214)]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                children: price.subTitle
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("ul", {
                                                            className: "flex flex-col text-center justify-center tracking-wide text-sm sm:text-base gap-y-2 text-[rgb(253,240,214)]",
                                                            children: price.bulletPoints?.map((bullet, index)=>{
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                    children: bullet
                                                                }, index);
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, index);
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                        className: "my-10 flex flex-col justify-center items-center text-center mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("h1", {
                                className: "text-[rgb(253,240,214)] mb-4 text-2xl uppercase sm:text-3xl",
                                children: "Interested in becoming a member?"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("h1", {
                                className: "text-[rgb(253,240,214)] italic mb-4 text-xl",
                                children: "Click below to fill out our membership inquiry"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    className: "text-center mt-5 flex flex-col md:flex-row gap-6 justify-center items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                        className: "p-2 sm:p-4 rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer",
                                        href: "/contact?form=Membership",
                                        children: "Inquire for Membership"
                                    })
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
__turbopack_context__.s([
    "Membership",
    0,
    Membership
]);
}),
48663, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/Airplane.3pafafps3262z.mp4");}),
14780, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/Arrowleft.0ancutgnudwz5.png");}),
23474, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/Arrowright.32u_mk1ivn673.png");}),
89118, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/Calvano_Headshot.2f4aekaz7c6cf.jpg");}),
33127, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/Gaia.0gken0xx5or8s.jpg");}),
40267, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/artistwhite.0g-ckzu-yywew.png");}),
74618, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/beach.1loh_pfv_33mf.jpg");}),
74441, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/biopic.3xn60m2e18n1j.jpg");}),
65664, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/culturewhite.2skqr2roiryed.png");}),
45165, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/dessert.06pi7kkd4k_4u.jpg");}),
41186, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/eventoverhead.2yx4fp5-f15g_.jpg");}),
45438, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/leftmountain.1ep9y8e4o9lj7.png");}),
36406, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/locationIcon.3nn8zyey2gofh.png");}),
97363, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/mobilebannercompress.1jt37-4xqid6h.mp4");}),
89850, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/mobilesaverjp.13u4rg9xzj74c.jpg");}),
55178, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/mountains.1m963wthsg43d.jpg");}),
34400, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/partnerwhite.15q88-rxur357.png");}),
51528, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/revlogoonly.3kvj2us1e1143.png");}),
11166, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/revolutiobannercompress.3gecey5ilqpu9.mp4");}),
34575, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/sandyyy.36913pgfh6c8s.png");}),
12834, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/saverDesktopjp.3rb1ncjqiqlbc.jpg");}),
75751, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/sunsetwaves.43co_hcjoq38v.mp4");}),
31781, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/wisco.1vyamijy2--rw.jpg");}),
]);