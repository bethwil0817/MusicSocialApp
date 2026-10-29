(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
40178, ((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/src/components/Destinations.tsx [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
// MERGED MODULE: [project]/src/images/beachFull.png.mjs { IMAGE => "[project]/src/images/beachFull.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__86749__ = __turbopack_context__.i(86749);
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__86749__["default"],
    width: 4320,
    height: 3200,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAAoUlEQVR42gGWAGn/ABlgqBFcow5bog1cohJgphtkqSRkpSttsgA8gss1fscyfMUwfcQyf8c3gss9h9A6e7gAXKnlW6vmW63nW6/nW6/oW67nW63mXKviAGSMn2qSoHObonifonmgo3efonGXnmmPmwBzfnR8hXKGjnOLkHGOknOLj3WGiXZZYVoAnZiKiYV3pZ+OrqWStauYmI9/rKCOgHpv575LFVVDFJMAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/woodsFull.png.mjs { IMAGE => "[project]/src/images/woodsFull.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__55418__ = __turbopack_context__.i(55418);
;
const __TURBOPACK__default__export__1 = {
    src: __TURBOPACK__imported__module__55418__["default"],
    width: 4320,
    height: 3200,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAAoUlEQVR42gGWAGn/AIiRnZKdqpqns6GuuKWxuqWut5+lr5aZogCIk5+ToKudq7Wksbqmsrulr7egp6+XmqMAdoSPhJOdlaOrnKmvm6esmKKnlJuhjJCWAEFQVVFgYGNvbWdybXB6cWFtalljZlFZWwAWIygwOTRASDtCTT5LU0AmNTMUJCwgKisALDInQEMyP0Y2LjwzN0AzHissISopIiklMW0/+MXwxUUAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/moutFull.png.mjs { IMAGE => "[project]/src/images/moutFull.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__91856__ = __turbopack_context__.i(91856);
;
const __TURBOPACK__default__export__2 = {
    src: __TURBOPACK__imported__module__91856__["default"],
    width: 4320,
    height: 3200,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAAoUlEQVR42gGWAGn/AK+rkbm1nL+7osK9pcO8pMC4n7iwlaukiACunoPGtJbKuZvKuJzCspemnYqgl4OEgXIAMzg6hX1tuqqNva2Qo5uGbnRuXGRiS1ZYACkyNzE7P1dcV3x6a3h2aUlQTzdARDE6PgBZXFJbX1ZYXVdXXFhOVFNGTU5AR0k3PkEAZmRUbWxbb25eamteXmFZVVhTTlFNRUlFnqRCAtT8HZMAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/desertFull.png.mjs { IMAGE => "[project]/src/images/desertFull.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__1513__ = __turbopack_context__.i(1513);
;
const __TURBOPACK__default__export__3 = {
    src: __TURBOPACK__imported__module__1513__["default"],
    width: 4320,
    height: 3200,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAAoUlEQVR42gGWAGn/ADV9xDyDyUSKz1GQ0WOX0HKez3WgznKczQBGktVNmdtXn99rpN2KsNesw9enwNWSs9MAYaDNaKTQdKfOi6/LqrvE1NfQx8/Ip7e7AENIRT9GR0pOS0tPTVNVUWFjXVtgXUVMUABFQTVLRTlBPjQ1NjE2NzBRTUJSTkVDQj4AUUgzUUk3TkY2RkE1SkQ4UEk7Uko7V04945ZCKTSbjSwAAAAASUVORK5CYII="
};
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
var __TURBOPACK__imported__module__96199__ = __turbopack_context__.i(96199);
"use client";
;
;
;
;
;
;
;
const Destinations = ()=>{
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__71645__["useState"])("sea");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
        className: "pt-20 bg-cover bg-no-repeat h-full",
        id: "dest",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("link", {
                rel: "preload",
                as: "image",
                href: __TURBOPACK__default__export__.src
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("link", {
                rel: "preload",
                as: "image",
                href: __TURBOPACK__default__export__1.src
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                className: "px-4 md:px-6 py-10 flex flex-col justify-center items-center mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            className: "mt-2 gap-2 text-center flex flex-col lg:flex-row xl:mt-6 text-[rgb(253,240,214)] justify-center mx-auto text-xl my-5 items-center",
                            children: [
                                "Curated cultural experiences across the",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                    children: "sea, woods, desert, and mountains"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        delayVal: 1,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                            className: "mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase",
                            children: "Our Destinations"
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("p", {
                            className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 items-center text-center",
                            children: "Revolūtiō does not claim ownership over these cultures or places."
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("p", {
                            className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl mt-1 mb-10 items-center text-center",
                            children: [
                                "Rather Revolūtiō seeks to support locally led experiences and partnerships that benefit the people and communities of the region, and treat and honor the land with",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                    className: "text-xl sm:text-2xl",
                                    children: "care, humility, and respect."
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                className: "pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "border px-4 md:px-6 py-20 text-center bg-fixed bg-center min-h-[500px]",
                    style: {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${__TURBOPACK__default__export__.src})`,
                        backgroundSize: "cover"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            className: "my-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase",
                                        children: "The Sea"
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center",
                                        children: "Yucatán, Mexico"
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center",
                                        children: "Primary focus for Year One."
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center",
                                        children: "The Sea represents creative renewal, cultural exchange, beachside residencies, coastal retreats, music, food, art nature, and meaningful travel across the Yucatán coast."
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "mt-10 mx-auto p-6 max-w-max text-center rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]",
                                id: "locations",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center",
                                        children: "Potential offerings:"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                            className: "text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Artist residencies"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Creative guest retreats"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Beachside cultural experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Live music and chef experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Wellness, nature, and ecology experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Yucatán community partnerships"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Private curated stays Events, pop-ups, and cultural gatherings"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                className: "pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]",
                    style: {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${__TURBOPACK__default__export__1.src})`,
                        backgroundSize: "cover"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase",
                                children: "The Woods"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center",
                                children: "Phelps, Land O’ Lakes, Watersmeet, and the Upper Peninsula"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center",
                                children: "Primary focus for Year One."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center",
                                children: "The Woods represents northern lakes, forest, music, storytelling, indigenous partnerships, rural creative economy, historical memory, recording retreats, seasonal festivals, and regenerative community programming."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]",
                                id: "locations",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center",
                                        children: "Potential offerings:"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                            className: "text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Recording retreats"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Songwriter and artist residencies"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Seasonal festivals and community events"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Museum and history-based storytelling projects"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Rural creative economy development"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Outdoor art, music, and wellness experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Cultural exchange between Wisconsin, Michigan, tribal communities, and global partners"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Retreats rooted in nature, story, and restoration"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                className: "pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]",
                    style: {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${__TURBOPACK__default__export__2.src})`,
                        backgroundSize: "cover"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase",
                                children: "The Mountains"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center",
                                children: "Guatemala"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center",
                                children: "Introduced in Year One as part of the vision. Developed more fully in Year Two."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-lg sm:text-xl my-5 text-center items-center",
                                children: "The Mountains represent creative elevation, indigenous culture, ecology, textile traditions, music, food, retreat experiences, and cross-cultural exchange."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]",
                                id: "locations",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center",
                                        children: "Potential offerings:"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                            className: "text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Artist residencies"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Cultural travel experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Textile, food, art, and music exchanges"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Retreats and creative immersions"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Partnerships with local artists, guides, cooperatives, and cultural workers"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Future exchange between Guatemala, Yucatán, Wisconsin, and Arizona"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                className: "pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "border px-4 md:px-6 text-center py-20 bg-fixed bg-center min-h-[500px]",
                    style: {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${__TURBOPACK__default__export__3.src})`,
                        backgroundSize: "cover"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "mt-2 xl:mt-6 pb-6 text-center mx-auto text-[40px] sm:text-[50px] xl:text-6xl  tracking-wide sm:tracking-[0.35em] text-[rgb(253,191,133)] uppercase",
                                children: "The Desert"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-3xl sm:text-4xl mt-5 mb-2 items-center",
                                children: "Northern Arizona, Navajo and Hopi Land"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,191,133)] font-bold flex flex-col justify-center mx-auto text-lg sm:text-xl mb-5 items-center",
                                children: "Introduced in Year One as part of the vision. Developed more fully in Year Two."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "text-[rgb(253,240,214)] flex flex-col justify-center mx-auto text-xl my-5 text-center items-center",
                                children: "The Desert represents ancestral land, vastness, silence, story, entrepreneurship, cultural respect, local economic development, and future community-rooted creative initiatives."
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                className: "mt-10 mx-auto p-6 max-w-max rounded-3xl border border-[rgba(253,191,133,0.5)] bg-[rgba(0,0,0,0.3)]",
                                id: "locations",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "text-[rgb(253,191,133)] flex flex-col justify-center mx-auto text-xl sm:text-2xl uppercase items-center",
                                        children: "Potential offerings:"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                            className: "text-[rgb(253,240,214)] gap-6 flex flex-col justify-center mx-auto text-base sm:text-xl mt-5 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Cultural learning experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Local entrepreneurship support"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Creative economy consulting"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Storytelling projects"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Artist exchanges"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Community-rooted travel experiences"
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                    children: "Partnerships with local tribal members, artists, guides, and business owners"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
};
__turbopack_context__.s([
    "Destinations",
    0,
    Destinations
], 40178);
}),
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
86749, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/beachFull.2va4c1ma-t7_l.png");}),
74441, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/biopic.3xn60m2e18n1j.jpg");}),
65664, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/culturewhite.2skqr2roiryed.png");}),
1513, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/desertFull.3mufpkosqn-f8.png");}),
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
91856, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/moutFull.2u8c5uhfub5p1.png");}),
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
55418, ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/woodsFull.3gvwf81ba77cs.png");}),
]);