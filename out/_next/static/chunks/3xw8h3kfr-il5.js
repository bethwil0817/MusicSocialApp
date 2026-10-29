(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
46932, ((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__54505__ = __turbopack_context__.i(54505);
var __TURBOPACK__imported__module__7051__ = __turbopack_context__.i(7051);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/components/motion/feature-bundle.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__23070__ = __turbopack_context__.i(23070);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/drag.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/drag/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__ = __turbopack_context__.i(42098);
var __TURBOPACK__imported__module__60830__ = __turbopack_context__.i(60830);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__30162__ = __turbopack_context__.i(30162);
var __TURBOPACK__imported__module__87022__ = __turbopack_context__.i(87022);
var __TURBOPACK__imported__module__55559__ = __turbopack_context__.i(55559);
var __TURBOPACK__imported__module__53689__ = __turbopack_context__.i(53689);
var __TURBOPACK__imported__module__27677__ = __turbopack_context__.i(27677);
var __TURBOPACK__imported__module__80538__ = __turbopack_context__.i(80538);
var __TURBOPACK__imported__module__39011__ = __turbopack_context__.i(39011);
var __TURBOPACK__imported__module__706__ = __turbopack_context__.i(706);
var __TURBOPACK__imported__module__82774__ = __turbopack_context__.i(82774);
var __TURBOPACK__imported__module__37541__ = __turbopack_context__.i(37541);
var __TURBOPACK__imported__module__65091__ = __turbopack_context__.i(65091);
var __TURBOPACK__imported__module__52101__ = __turbopack_context__.i(52101);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/resize/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/resize/handle-element.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__89026__ = __turbopack_context__.i(89026);
var __TURBOPACK__imported__module__49652__ = __turbopack_context__.i(49652);
;
;
const resizeHandlers = new WeakMap();
let observer;
const getSize = (borderBoxAxis, svgAxis, htmlAxis)=>(target, borderBoxSize)=>{
        if (borderBoxSize && borderBoxSize[0]) {
            return borderBoxSize[0][borderBoxAxis + "Size"];
        } else if ((0, __TURBOPACK__imported__module__89026__["isSVGElement"])(target) && "getBBox" in target) {
            return target.getBBox()[svgAxis];
        } else {
            return target[htmlAxis];
        }
    };
const getWidth = /*@__PURE__*/ getSize("inline", "width", "offsetWidth");
const getHeight = /*@__PURE__*/ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
    resizeHandlers.get(target)?.forEach((handler)=>{
        handler(target, {
            get width () {
                return getWidth(target, borderBoxSize);
            },
            get height () {
                return getHeight(target, borderBoxSize);
            }
        });
    });
}
function notifyAll(entries) {
    entries.forEach(notifyTarget);
}
function createResizeObserver() {
    if (typeof ResizeObserver === "undefined") return;
    observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
    if (!observer) createResizeObserver();
    const elements = (0, __TURBOPACK__imported__module__49652__["resolveElements"])(target);
    elements.forEach((element)=>{
        let elementHandlers = resizeHandlers.get(element);
        if (!elementHandlers) {
            elementHandlers = new Set();
            resizeHandlers.set(element, elementHandlers);
        }
        elementHandlers.add(handler);
        observer?.observe(element);
    });
    return ()=>{
        elements.forEach((element)=>{
            const elementHandlers = resizeHandlers.get(element);
            elementHandlers?.delete(handler);
            if (!elementHandlers?.size) {
                observer?.unobserve(element);
            }
        });
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/resize/handle-window.mjs [app-client] (ecmascript)
;
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
    windowResizeHandler = ()=>{
        const info = {
            get width () {
                return window.innerWidth;
            },
            get height () {
                return window.innerHeight;
            }
        };
        windowCallbacks.forEach((callback)=>callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler) createWindowResizeHandler();
    return ()=>{
        windowCallbacks.delete(callback);
        if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
            window.removeEventListener("resize", windowResizeHandler);
            windowResizeHandler = undefined;
        }
    };
}
;
;
;
function resize(a, b) {
    return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs [app-client] (ecmascript)
;
const keyboardAccessibleElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
]);
/**
 * Checks if an element is natively keyboard accessible (focusable).
 * Used by the press gesture to determine if we need to add tabIndex.
 */ function isElementKeyboardAccessible(element) {
    return keyboardAccessibleElements.has(element.tagName) || element.isContentEditable === true;
}
const textInputElements = new Set([
    "INPUT",
    "SELECT",
    "TEXTAREA"
]);
/**
 * Checks if an element has text selection or direct interaction behavior
 * that should block drag gestures from starting.
 *
 * This specifically targets form controls where the user might want to select
 * text or interact with the control (e.g., sliders, dropdowns).
 *
 * Buttons and links are NOT included because they don't have click-and-move
 * actions of their own - they only respond to click events, so dragging
 * should still work when initiated from these elements.
 */ function isElementTextInput(element) {
    return textInputElements.has(element.tagName) || element.isContentEditable === true;
}
;
var __TURBOPACK__imported__module__65566__ = __turbopack_context__.i(65566);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__82774__1 = __TURBOPACK__imported__module__82774__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/events/event-info.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-client] (ecmascript)
;
const isPrimaryPointer = (event)=>{
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    } else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */ return event.isPrimary !== false;
    }
};
;
;
function extractEventInfo(event) {
    return {
        point: {
            x: event.pageX,
            y: event.pageY
        }
    };
}
const addPointerInfo = (handler)=>(event)=>isPrimaryPointer(event) && handler(event, extractEventInfo(event));
;
;
;
function addPointerEvent(target, eventName, handler, options) {
    return (0, __TURBOPACK__imported__module__82774__1["addDomEvent"])(target, eventName, addPointerInfo(handler), options);
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/get-context-window.mjs [app-client] (ecmascript)
;
// Fixes https://github.com/motiondivision/motion/issues/2270
const getContextWindow = ({ current })=>{
    return current ? current.ownerDocument.defaultView : null;
};
;
var __TURBOPACK__imported__module__25522__ = __turbopack_context__.i(25522);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__87022__1 = __TURBOPACK__imported__module__87022__;
var __TURBOPACK__imported__module__38638__ = __turbopack_context__.i(38638);
var __TURBOPACK__imported__module__63074__ = __turbopack_context__.i(63074);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/distance.mjs [app-client] (ecmascript)
;
const distance = (a, b)=>Math.abs(a - b);
function distance2D(a, b) {
    // Multi-dimensional
    const xDelta = distance(a.x, b.x);
    const yDelta = distance(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
;
;
;
;
;
;
const overflowStyles = /*#__PURE__*/ new Set([
    "auto",
    "scroll"
]);
/**
 * @internal
 */ class PanSession {
    constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}){
        /**
         * @internal
         */ this.startEvent = null;
        /**
         * @internal
         */ this.lastMoveEvent = null;
        /**
         * @internal
         */ this.lastMoveEventInfo = null;
        /**
         * Raw (untransformed) event info, re-transformed each frame
         * so transformPagePoint sees the current parent matrix.
         * @internal
         */ this.lastRawMoveEventInfo = null;
        /**
         * @internal
         */ this.handlers = {};
        /**
         * @internal
         */ this.contextWindow = window;
        /**
         * Scroll positions of scrollable ancestors and window.
         * @internal
         */ this.scrollPositions = new Map();
        /**
         * Cleanup function for scroll listeners.
         * @internal
         */ this.removeScrollListeners = null;
        this.onElementScroll = (event)=>{
            this.handleScroll(event.target);
        };
        this.onWindowScroll = ()=>{
            this.handleScroll(window);
        };
        this.updatePoint = ()=>{
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            // Re-transform raw point through current transformPagePoint so
            // animated parent transforms (e.g. rotation) are picked up each frame
            if (this.lastRawMoveEventInfo) {
                this.lastMoveEventInfo = transformPoint(this.lastRawMoveEventInfo, this.transformPagePoint);
            }
            const info = getPanInfo(this.lastMoveEventInfo, this.history);
            const isPanStarted = this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursor.
            const isDistancePastThreshold = distance2D(info.offset, {
                x: 0,
                y: 0
            }) >= this.distanceThreshold;
            if (!isPanStarted && !isDistancePastThreshold) return;
            const { point } = info;
            const { timestamp } = __TURBOPACK__imported__module__87022__1["frameData"];
            this.history.push({
                ...point,
                timestamp
            });
            const { onStart, onMove } = this.handlers;
            if (!isPanStarted) {
                onStart && onStart(this.lastMoveEvent, info);
                this.startEvent = this.lastMoveEvent;
            }
            onMove && onMove(this.lastMoveEvent, info);
        };
        this.handlePointerMove = (event, info)=>{
            this.lastMoveEvent = event;
            this.lastRawMoveEventInfo = info;
            this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
            // Throttle mouse move event to once per frame
            __TURBOPACK__imported__module__87022__1["frame"].update(this.updatePoint, true);
        };
        this.handlePointerUp = (event, info)=>{
            this.end();
            const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            // Resume animation if dragSnapToOrigin is set OR if no drag started (user just clicked)
            // This ensures constraint animations continue when interrupted by a click
            if (this.dragSnapToOrigin || !this.startEvent) {
                resumeAnimation && resumeAnimation();
            }
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            const panInfo = getPanInfo(event.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (!isPrimaryPointer(event)) return;
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        this.distanceThreshold = distanceThreshold;
        this.contextWindow = contextWindow || window;
        const info = extractEventInfo(event);
        const initialInfo = transformPoint(info, this.transformPagePoint);
        const { point } = initialInfo;
        const { timestamp } = __TURBOPACK__imported__module__87022__1["frameData"];
        this.history = [
            {
                ...point,
                timestamp
            }
        ];
        const { onSessionStart } = handlers;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        // Listen in the capture phase so a descendant calling
        // stopPropagation() (e.g. in its own pointerup handler) can't
        // prevent the gesture from ending. See #2794.
        const eventOptions = {
            passive: true,
            capture: true
        };
        this.removeListeners = (0, __TURBOPACK__imported__module__38638__["pipe"])(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove, eventOptions), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp, eventOptions), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp, eventOptions));
        // Start scroll tracking if element provided
        if (element) {
            this.startScrollTracking(element);
        }
    }
    /**
     * Start tracking scroll on ancestors and window.
     */ startScrollTracking(element) {
        // Store initial scroll positions for scrollable ancestors
        let current = element.parentElement;
        while(current){
            const style = getComputedStyle(current);
            if (overflowStyles.has(style.overflowX) || overflowStyles.has(style.overflowY)) {
                this.scrollPositions.set(current, {
                    x: current.scrollLeft,
                    y: current.scrollTop
                });
            }
            current = current.parentElement;
        }
        // Track window scroll
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        });
        // Capture listener catches element scroll events as they bubble
        window.addEventListener("scroll", this.onElementScroll, {
            capture: true
        });
        // Direct window scroll listener (window scroll doesn't bubble)
        window.addEventListener("scroll", this.onWindowScroll);
        this.removeScrollListeners = ()=>{
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: true
            });
            window.removeEventListener("scroll", this.onWindowScroll);
        };
    }
    /**
     * Handle scroll compensation during drag.
     *
     * For element scroll: adjusts history origin since pageX/pageY doesn't change.
     * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
     */ handleScroll(target) {
        const initial = this.scrollPositions.get(target);
        if (!initial) return;
        const isWindow = target === window;
        const current = isWindow ? {
            x: window.scrollX,
            y: window.scrollY
        } : {
            x: target.scrollLeft,
            y: target.scrollTop
        };
        const delta = {
            x: current.x - initial.x,
            y: current.y - initial.y
        };
        if (delta.x === 0 && delta.y === 0) return;
        if (isWindow) {
            // Window scroll: pageX/pageY changes, so update lastMoveEventInfo
            if (this.lastMoveEventInfo) {
                this.lastMoveEventInfo.point.x += delta.x;
                this.lastMoveEventInfo.point.y += delta.y;
            }
        } else {
            // Element scroll: pageX/pageY unchanged, so adjust history origin
            if (this.history.length > 0) {
                this.history[0].x -= delta.x;
                this.history[0].y -= delta.y;
            }
        }
        this.scrollPositions.set(target, current);
        __TURBOPACK__imported__module__87022__1["frame"].update(this.updatePoint, true);
    }
    updateHandlers(handlers) {
        this.handlers = handlers;
    }
    end() {
        this.removeListeners && this.removeListeners();
        this.removeScrollListeners && this.removeScrollListeners();
        this.scrollPositions.clear();
        (0, __TURBOPACK__imported__module__87022__1["cancelFrame"])(this.updatePoint);
    }
}
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? {
        point: transformPagePoint(info.point)
    } : info;
}
function subtractPoint(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}
function getPanInfo({ point }, history) {
    return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1)
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
    if (history.length < 2) {
        return {
            x: 0,
            y: 0
        };
    }
    let i = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while(i >= 0){
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp > (0, __TURBOPACK__imported__module__63074__["secondsToMilliseconds"])(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return {
            x: 0,
            y: 0
        };
    }
    /**
     * If the selected point is the pointer-down origin (history[0]),
     * there are better movement points available, and the time gap
     * is suspiciously large (>2x timeDelta), use the next point instead.
     * This prevents stale pointer-down points from diluting velocity
     * in hold-then-flick gestures.
     */ if (timestampedPoint === history[0] && history.length > 2 && lastPoint.timestamp - timestampedPoint.timestamp > (0, __TURBOPACK__imported__module__63074__["secondsToMilliseconds"])(timeDelta) * 2) {
        timestampedPoint = history[1];
    }
    const time = (0, __TURBOPACK__imported__module__63074__["millisecondsToSeconds"])(lastPoint.timestamp - timestampedPoint.timestamp);
    if (time === 0) {
        return {
            x: 0,
            y: 0
        };
    }
    const currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__706__1 = __TURBOPACK__imported__module__706__;
var __TURBOPACK__imported__module__52101__1 = __TURBOPACK__imported__module__52101__;
var __TURBOPACK__imported__module__83920__ = __turbopack_context__.i(83920);
var __TURBOPACK__imported__module__76959__ = __turbopack_context__.i(76959);
;
;
/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */ function applyConstraints(point, { min, max }, elastic) {
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic ? (0, __TURBOPACK__imported__module__706__1["mixNumber"])(min, point, elastic.min) : Math.max(point, min);
    } else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic ? (0, __TURBOPACK__imported__module__706__1["mixNumber"])(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */ function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined ? axis.max + max - (axis.max - axis.min) : undefined
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */ function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */ function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
        [min, max] = [
            max,
            min
        ];
    }
    return {
        min,
        max
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */ function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
    };
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */ function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = (0, __TURBOPACK__imported__module__52101__1["calcLength"])(source);
    const targetLength = (0, __TURBOPACK__imported__module__52101__1["calcLength"])(target);
    if (targetLength > sourceLength) {
        origin = (0, __TURBOPACK__imported__module__83920__["progress"])(target.min, target.max - sourceLength, source.min);
    } else if (sourceLength > targetLength) {
        origin = (0, __TURBOPACK__imported__module__83920__["progress"])(source.min, source.max - targetLength, target.min);
    }
    return (0, __TURBOPACK__imported__module__76959__["clamp"])(0, 1, origin);
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */ function rebaseAxisConstraints(layout, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
const defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */ function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
        dragElastic = 0;
    } else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom")
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel)
    };
}
function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
;
;
;
;
;
;
;
;
;
const elementDragControls = new WeakMap();
class VisualElementDragControls {
    constructor(visualElement){
        this.openDragLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = {
            x: 0,
            y: 0
        };
        /**
         * The permitted boundaries of travel, in pixels.
         */ this.constraints = false;
        this.hasMutatedConstraints = false;
        /**
         * The per-axis resolved elastic values.
         */ this.elastic = (0, __TURBOPACK__imported__module__30162__["createBox"])();
        /**
         * The latest pointer event. Used as fallback when the `cancel` and `stop` functions are called without arguments.
         */ this.latestPointerEvent = null;
        /**
         * The latest pan info. Used as fallback when the `cancel` and `stop` functions are called without arguments.
         */ this.latestPanInfo = null;
        this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
        /**
         * Don't start dragging if this component is exiting
         */ const { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false) return;
        const onSessionStart = (event)=>{
            if (snapToCursor) {
                this.snapToCursor(extractEventInfo(event).point);
            }
            this.stopAnimation();
        };
        const onStart = (event, info)=>{
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            const { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation) {
                if (this.openDragLock) this.openDragLock();
                this.openDragLock = (0, __TURBOPACK__imported__module__37541__["setDragLock"])(drag);
                // If we don 't have the lock, don't start dragging
                if (!this.openDragLock) return;
            }
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            /**
             * Record gesture origin and pointer offset
             */ (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
                let current = this.getAxisMotionValue(axis).get() || 0;
                /**
                 * If the MotionValue is a percentage value convert to px
                 */ if (__TURBOPACK__imported__module__65091__["percent"].test(current)) {
                    const { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        const measuredAxis = projection.layout.layoutBox[axis];
                        if (measuredAxis) {
                            const length = (0, __TURBOPACK__imported__module__52101__["calcLength"])(measuredAxis);
                            current = length * (parseFloat(current) / 100);
                        }
                    }
                }
                this.originPoint[axis] = current;
            });
            // Fire onDragStart event
            if (onDragStart) {
                __TURBOPACK__imported__module__87022__["frame"].update(()=>onDragStart(event, info), false, true);
            }
            (0, __TURBOPACK__imported__module__80538__["addValueToWillChange"])(this.visualElement, "transform");
            const { animationState } = this.visualElement;
            animationState && animationState.setActive("whileDrag", true);
        };
        const onMove = (event, info)=>{
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !this.openDragLock) return;
            const { offset } = info;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (this.currentDirection !== null) {
                    onDirectionLock && onDirectionLock(this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            this.updateAxis("x", info.point, offset);
            this.updateAxis("y", info.point, offset);
            /**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */ this.visualElement.render();
            /**
             * This must fire after the render call as it might trigger a state
             * change which itself might trigger a layout update.
             */ if (onDrag) {
                __TURBOPACK__imported__module__87022__["frame"].update(()=>onDrag(event, info), false, true);
            }
        };
        const onSessionEnd = (event, info)=>{
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            this.stop(event, info);
            this.latestPointerEvent = null;
            this.latestPanInfo = null;
        };
        const resumeAnimation = ()=>{
            const { dragSnapToOrigin: snap } = this.getProps();
            if (snap || this.constraints) {
                this.startAnimation({
                    x: 0,
                    y: 0
                });
            }
        };
        const { dragSnapToOrigin } = this.getProps();
        this.panSession = new PanSession(originEvent, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
            distanceThreshold,
            contextWindow: getContextWindow(this.visualElement),
            element: this.visualElement.current
        });
    }
    /**
     * @internal
     */ stop(event, panInfo) {
        const finalEvent = event || this.latestPointerEvent;
        const finalPanInfo = panInfo || this.latestPanInfo;
        const isDragging = this.isDragging;
        this.cancel();
        if (!isDragging || !finalPanInfo || !finalEvent) return;
        const { velocity } = finalPanInfo;
        this.startAnimation(velocity);
        const { onDragEnd } = this.getProps();
        if (onDragEnd) {
            __TURBOPACK__imported__module__87022__["frame"].postRender(()=>onDragEnd(finalEvent, finalPanInfo));
        }
    }
    /**
     * @internal
     */ cancel() {
        this.isDragging = false;
        const { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        this.endPanSession();
        const { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openDragLock) {
            this.openDragLock();
            this.openDragLock = null;
        }
        animationState && animationState.setActive("whileDrag", false);
    }
    /**
     * Clean up the pan session without modifying other drag state.
     * This is used during unmount to ensure event listeners are removed
     * without affecting projection animations or drag locks.
     * @internal
     */ endPanSession() {
        this.panSession && this.panSession.end();
        this.panSession = undefined;
    }
    updateAxis(axis, _point, offset) {
        const { drag } = this.getProps();
        // If we're not dragging this axis, do an early return.
        if (!offset || !shouldDrag(axis, drag, this.currentDirection)) return;
        const axisValue = this.getAxisMotionValue(axis);
        let next = this.originPoint[axis] + offset[axis];
        // Apply constraints
        if (this.constraints && this.constraints[axis]) {
            next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    }
    resolveConstraints() {
        const { dragConstraints, dragElastic } = this.getProps();
        const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
        const prevConstraints = this.constraints;
        if (dragConstraints && (0, __TURBOPACK__imported__module__25522__["isRefObject"])(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        } else {
            if (dragConstraints && layout) {
                this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
            } else {
                this.constraints = false;
            }
        }
        this.elastic = resolveDragElastic(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative. This only applies to relative (non-ref)
         * constraints, as ref-based constraints from calcViewportConstraints are already in the
         * correct coordinate space for the motion value transform offset.
         */ if (prevConstraints !== this.constraints && !(0, __TURBOPACK__imported__module__25522__["isRefObject"])(dragConstraints) && layout && this.constraints && !this.hasMutatedConstraints) {
            (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
                if (this.constraints !== false && this.getAxisMotionValue(axis)) {
                    this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
                }
            });
        }
    }
    resolveRefConstraints() {
        const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
        if (!constraints || !(0, __TURBOPACK__imported__module__25522__["isRefObject"])(constraints)) return false;
        const constraintsElement = constraints.current;
        (0, __TURBOPACK__imported__module__65566__["invariant"])(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        const { projection } = this.visualElement;
        // TODO
        if (!projection || !projection.layout) return false;
        /**
         * Refresh the root scroll offset so the constraint's viewport box
         * translates to correct page coordinates. The scroll captured at
         * drag mount can be stale if the document was scrolled afterwards —
         * e.g. via the browser restoring scroll on refresh, or an ancestor
         * layout effect running after this element's mount (#2829).
         *
         * Clear the cached scroll first so `updateScroll` bypasses its
         * per-animationId cache and re-reads the live value.
         */ if (projection.root) {
            projection.root.scroll = undefined;
            projection.root.updateScroll();
        }
        const constraintsBox = (0, __TURBOPACK__imported__module__53689__["measurePageBox"])(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */ if (onMeasureDragConstraints) {
            const userConstraints = onMeasureDragConstraints((0, __TURBOPACK__imported__module__27677__["convertBoxToBoundingBox"])(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = (0, __TURBOPACK__imported__module__27677__["convertBoundingBoxToBox"])(userConstraints);
            }
        }
        return measuredConstraints;
    }
    startAnimation(velocity) {
        const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
        const constraints = this.constraints || {};
        const momentumAnimations = (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
            if (!shouldDrag(axis, drag, this.currentDirection)) {
                return;
            }
            let transition = constraints && constraints[axis] || {};
            if (dragSnapToOrigin === true || dragSnapToOrigin === axis) transition = {
                min: 0,
                max: 0
            };
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */ const bounceStiffness = dragElastic ? 200 : 1000000;
            const bounceDamping = dragElastic ? 40 : 10000000;
            const inertia = {
                type: "inertia",
                velocity: dragMomentum ? velocity[axis] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...transition
            };
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return this.startAxisValueAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
        const axisValue = this.getAxisMotionValue(axis);
        (0, __TURBOPACK__imported__module__80538__["addValueToWillChange"])(this.visualElement, axis);
        return axisValue.start((0, __TURBOPACK__imported__module__39011__["animateMotionValue"])(axis, axisValue, 0, transition, this.visualElement, false));
    }
    stopAnimation() {
        (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>this.getAxisMotionValue(axis).stop());
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */ getAxisMotionValue(axis) {
        const dragKey = `_drag${axis.toUpperCase()}`;
        const props = this.visualElement.getProps();
        const externalMotionValue = props[dragKey];
        return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, this.visualElement.latestValues[axis] ?? 0);
    }
    snapToCursor(point) {
        (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
            const { drag } = this.getProps();
            // If we're not dragging this axis, do an early return.
            if (!shouldDrag(axis, drag, this.currentDirection)) return;
            const { projection } = this.visualElement;
            const axisValue = this.getAxisMotionValue(axis);
            if (projection && projection.layout) {
                const { min, max } = projection.layout.layoutBox[axis];
                /**
                 * The layout measurement includes the current transform value,
                 * so we need to add it back to get the correct snap position.
                 * This fixes an issue where elements with initial coordinates
                 * would snap to the wrong position on the first drag.
                 */ const current = axisValue.get() || 0;
                axisValue.set(point[axis] - (0, __TURBOPACK__imported__module__706__["mixNumber"])(min, max, 0.5) + current);
            }
        });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */ scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const { drag, dragConstraints } = this.getProps();
        const { projection } = this.visualElement;
        if (!(0, __TURBOPACK__imported__module__25522__["isRefObject"])(dragConstraints) || !projection || !this.constraints) return;
        /**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */ this.stopAnimation();
        /**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */ const boxProgress = {
            x: 0,
            y: 0
        };
        (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
            const axisValue = this.getAxisMotionValue(axis);
            if (axisValue && this.constraints !== false) {
                const latest = axisValue.get();
                boxProgress[axis] = calcOrigin({
                    min: latest,
                    max: latest
                }, this.constraints[axis]);
            }
        });
        /**
         * Update the layout of this element and resolve the latest drag constraints
         */ const { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
        /**
         * Reset constraints so resolveConstraints() will recalculate them
         * with the freshly measured layout rather than returning the cached value.
         */ this.constraints = false;
        this.resolveConstraints();
        /**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */ (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
            if (!shouldDrag(axis, drag, null)) return;
            /**
             * Calculate a new transform based on the previous box progress
             */ const axisValue = this.getAxisMotionValue(axis);
            const { min, max } = this.constraints[axis];
            axisValue.set((0, __TURBOPACK__imported__module__706__["mixNumber"])(min, max, boxProgress[axis]));
        });
        /**
         * Flush the updated transform to the DOM synchronously to prevent
         * a visual flash at the element's CSS layout position (0,0) when
         * the transform was stripped for measurement.
         */ this.visualElement.render();
    }
    addListeners() {
        if (!this.visualElement.current) return;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.current;
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */ const stopPointerListener = addPointerEvent(element, "pointerdown", (event)=>{
            const { drag, dragListener = true } = this.getProps();
            const target = event.target;
            /**
             * Only block drag if clicking on a text input child element
             * (input, textarea, select, contenteditable) where users might
             * want to select text or interact with the control.
             *
             * Buttons and links don't block drag since they don't have
             * click-and-move actions of their own.
             */ const isClickingTextInputChild = target !== element && isElementTextInput(target);
            if (drag && dragListener && !isClickingTextInputChild) {
                this.start(event);
            }
        });
        /**
         * If using ref-based constraints, observe both the draggable element
         * and the constraint container for size changes via ResizeObserver.
         * Setup is deferred because dragConstraints.current is null when
         * addListeners first runs (React hasn't committed the ref yet).
         */ let stopResizeObservers;
        const measureDragConstraints = ()=>{
            const { dragConstraints } = this.getProps();
            if ((0, __TURBOPACK__imported__module__25522__["isRefObject"])(dragConstraints) && dragConstraints.current) {
                this.constraints = this.resolveRefConstraints();
                if (!stopResizeObservers) {
                    stopResizeObservers = startResizeObservers(element, dragConstraints.current, ()=>this.scalePositionWithinConstraints());
                }
            }
        };
        const { projection } = this.visualElement;
        const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            projection.root && projection.root.updateScroll();
            projection.updateLayout();
        }
        __TURBOPACK__imported__module__87022__["frame"].read(measureDragConstraints);
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */ const stopResizeListener = (0, __TURBOPACK__imported__module__82774__["addDomEvent"])(window, "resize", ()=>this.scalePositionWithinConstraints());
        /**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */ const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged })=>{
            if (this.isDragging && hasLayoutChanged) {
                (0, __TURBOPACK__imported__module__55559__["eachAxis"])((axis)=>{
                    const motionValue = this.getAxisMotionValue(axis);
                    if (!motionValue) return;
                    this.originPoint[axis] += delta[axis].translate;
                    motionValue.set(motionValue.get() + delta[axis].translate);
                });
                this.visualElement.render();
            }
        });
        return ()=>{
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
            stopLayoutUpdateListener && stopLayoutUpdateListener();
            stopResizeObservers && stopResizeObservers();
        };
    }
    getProps() {
        const props = this.visualElement.getProps();
        const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
        return {
            ...props,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum
        };
    }
}
function skipFirstCall(callback) {
    let isFirst = true;
    return ()=>{
        if (isFirst) {
            isFirst = false;
            return;
        }
        callback();
    };
}
function startResizeObservers(element, constraintsElement, onResize) {
    const stopElement = resize(element, skipFirstCall(onResize));
    const stopContainer = resize(constraintsElement, skipFirstCall(onResize));
    return ()=>{
        stopElement();
        stopContainer();
    };
}
function shouldDrag(direction, drag, currentDirection) {
    return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */ function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    } else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}
;
;
;
;
class DragGesture extends __TURBOPACK__imported__module__42098__["Feature"] {
    constructor(node){
        super(node);
        this.removeGroupControls = __TURBOPACK__imported__module__60830__["noop"];
        this.removeListeners = __TURBOPACK__imported__module__60830__["noop"];
        this.controls = new VisualElementDragControls(node);
    }
    mount() {
        // If we've been provided a DragControls for manual control over the drag gesture,
        // subscribe this component to it on mount.
        const { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || __TURBOPACK__imported__module__60830__["noop"];
    }
    update() {
        const { dragControls } = this.node.getProps();
        const { dragControls: prevDragControls } = this.node.prevProps || {};
        if (dragControls !== prevDragControls) {
            this.removeGroupControls();
            if (dragControls) {
                this.removeGroupControls = dragControls.subscribe(this.controls);
            }
        }
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
        /**
         * In React 19, during list reorder reconciliation, components may
         * briefly unmount and remount while the drag is still active. If we're
         * actively dragging, we should NOT end the pan session - it will
         * continue tracking pointer events via its window-level listeners.
         *
         * The pan session will be properly cleaned up when:
         * 1. The drag ends naturally (pointerup/pointercancel)
         * 2. The component is truly removed from the DOM
         */ if (!this.controls.isDragging) {
            this.controls.endPanSession();
        }
    }
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/pan/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__1 = __TURBOPACK__imported__module__42098__;
var __TURBOPACK__imported__module__87022__2 = __TURBOPACK__imported__module__87022__;
var __TURBOPACK__imported__module__60830__1 = __TURBOPACK__imported__module__60830__;
;
;
;
;
;
const asyncHandler = (handler)=>(event, info)=>{
        if (handler) {
            __TURBOPACK__imported__module__87022__2["frame"].update(()=>handler(event, info), false, true);
        }
    };
class PanGesture extends __TURBOPACK__imported__module__42098__1["Feature"] {
    constructor(){
        super(...arguments);
        this.removePointerDownListener = __TURBOPACK__imported__module__60830__1["noop"];
    }
    onPointerDown(pointerDownEvent) {
        this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: getContextWindow(this.node)
        });
    }
    createPanHandlers() {
        const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: asyncHandler(onPanSessionStart),
            onStart: asyncHandler(onPanStart),
            onMove: asyncHandler(onPan),
            onEnd: (event, info)=>{
                delete this.session;
                if (onPanEnd) {
                    __TURBOPACK__imported__module__87022__2["frame"].postRender(()=>onPanEnd(event, info));
                }
            }
        };
    }
    mount() {
        this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event)=>this.onPointerDown(event));
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
        this.removePointerDownListener();
        this.session && this.session.end();
    }
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/node/state.mjs [app-client] (ecmascript)
;
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */ const globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */ hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */ hasEverUpdated: false
};
;
var __TURBOPACK__imported__module__87022__3 = __TURBOPACK__imported__module__87022__;
var __TURBOPACK__imported__module__60140__ = __turbopack_context__.i(60140);
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__1 = __TURBOPACK__imported__module__71645__;
var __TURBOPACK__imported__module__21476__ = __turbopack_context__.i(21476);
"use client";
;
;
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed from the tree,
 * but `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */ function usePresence(subscribe = true) {
    const context = (0, __TURBOPACK__imported__module__71645__1["useContext"])(__TURBOPACK__imported__module__21476__["PresenceContext"]);
    if (context === null) return [
        true,
        null
    ];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0, __TURBOPACK__imported__module__71645__1["useId"])();
    (0, __TURBOPACK__imported__module__71645__1["useEffect"])(()=>{
        if (subscribe) {
            return register(id);
        }
    }, [
        subscribe
    ]);
    const safeToRemove = (0, __TURBOPACK__imported__module__71645__1["useCallback"])(()=>subscribe && onExitComplete && onExitComplete(id), [
        id,
        onExitComplete,
        subscribe
    ]);
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */ function useIsPresent() {
    return isPresent((0, __TURBOPACK__imported__module__71645__1["useContext"])(__TURBOPACK__imported__module__21476__["PresenceContext"]));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
;
var __TURBOPACK__imported__module__31178__ = __turbopack_context__.i(31178);
var __TURBOPACK__imported__module__4035__ = __turbopack_context__.i(4035);
"use client";
;
;
;
;
;
;
/**
 * Track whether we've taken any snapshots yet. If not,
 * we can safely skip notification of didUpdate.
 *
 * Difficult to capture in a test but to prevent flickering
 * we must set this to true either on update or unmount.
 * Running `next-env/layout-id` in Safari will show this behaviour if broken.
 */ let hasTakenAnySnapshot = false;
class MeasureLayoutWithContext extends __TURBOPACK__imported__module__71645__["Component"] {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */ componentDidMount() {
        const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement;
        if (projection) {
            if (layoutGroup.group) layoutGroup.group.add(projection);
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            if (hasTakenAnySnapshot) {
                projection.root.didUpdate();
            }
            projection.addEventListener("animationComplete", ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                layoutDependency: this.props.layoutDependency,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        globalProjectionState.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
        const { layoutDependency, visualElement, drag, isPresent } = this.props;
        const { projection } = visualElement;
        if (!projection) return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */ projection.isPresent = isPresent;
        if (prevProps.layoutDependency !== layoutDependency) {
            projection.setOptions({
                ...projection.options,
                layoutDependency
            });
        }
        hasTakenAnySnapshot = true;
        if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === undefined || prevProps.isPresent !== isPresent) {
            projection.willUpdate();
        } else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            } else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */ __TURBOPACK__imported__module__87022__3["frame"].postRender(()=>{
                    const stack = projection.getStack();
                    if (!stack || !stack.members.length) {
                        this.safeToRemove();
                    }
                });
            }
        }
        return null;
    }
    componentDidUpdate() {
        const { visualElement, layoutAnchor } = this.props;
        const { projection } = visualElement;
        if (projection) {
            projection.options.layoutAnchor = layoutAnchor;
            projection.root.didUpdate();
            __TURBOPACK__imported__module__60140__["microtask"].postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
        const { projection } = visualElement;
        hasTakenAnySnapshot = true;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
            if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
        }
    }
    safeToRemove() {
        const { safeToRemove } = this.props;
        safeToRemove && safeToRemove();
    }
    render() {
        return null;
    }
}
function MeasureLayout(props) {
    const [isPresent, safeToRemove] = usePresence();
    const layoutGroup = (0, __TURBOPACK__imported__module__71645__["useContext"])(__TURBOPACK__imported__module__31178__["LayoutGroupContext"]);
    return (0, __TURBOPACK__imported__module__43476__["jsx"])(MeasureLayoutWithContext, {
        ...props,
        layoutGroup: layoutGroup,
        switchLayoutGroup: (0, __TURBOPACK__imported__module__71645__["useContext"])(__TURBOPACK__imported__module__4035__["SwitchLayoutGroupContext"]),
        isPresent: isPresent,
        safeToRemove: safeToRemove
    });
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/node/HTMLProjectionNode.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/node/create-projection-node.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__70596__ = __turbopack_context__.i(70596);
var __TURBOPACK__imported__module__76959__1 = __TURBOPACK__imported__module__76959__;
var __TURBOPACK__imported__module__60830__2 = __TURBOPACK__imported__module__60830__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/animate/single-value.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__39011__1 = __TURBOPACK__imported__module__39011__;
var __TURBOPACK__imported__module__86427__ = __turbopack_context__.i(86427);
var __TURBOPACK__imported__module__83411__ = __turbopack_context__.i(83411);
;
;
;
function animateSingleValue(value, keyframes, options) {
    const motionValue$1 = (0, __TURBOPACK__imported__module__83411__["isMotionValue"])(value) ? value : (0, __TURBOPACK__imported__module__86427__["motionValue"])(value);
    motionValue$1.start((0, __TURBOPACK__imported__module__39011__1["animateMotionValue"])("", motionValue$1, keyframes, options));
    return motionValue$1.animation;
}
;
var __TURBOPACK__imported__module__16896__ = __turbopack_context__.i(16896);
var __TURBOPACK__imported__module__87333__ = __turbopack_context__.i(87333);
var __TURBOPACK__imported__module__60140__1 = __TURBOPACK__imported__module__60140__;
var __TURBOPACK__imported__module__96173__ = __turbopack_context__.i(96173);
var __TURBOPACK__imported__module__24463__ = __turbopack_context__.i(24463);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)
;
const statsBuffer = {
    value: null,
    addProjectionMetrics: null
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/delay.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__96173__1 = __TURBOPACK__imported__module__96173__;
var __TURBOPACK__imported__module__63074__1 = __TURBOPACK__imported__module__63074__;
var __TURBOPACK__imported__module__87022__4 = __TURBOPACK__imported__module__87022__;
;
;
;
/**
 * Timeout defined in ms
 */ function delay(callback, timeout) {
    const start = __TURBOPACK__imported__module__96173__1["time"].now();
    const checkElapsed = ({ timestamp })=>{
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
            (0, __TURBOPACK__imported__module__87022__4["cancelFrame"])(checkElapsed);
            callback(elapsed - timeout);
        }
    };
    __TURBOPACK__imported__module__87022__4["frame"].setup(checkElapsed, true);
    return ()=>(0, __TURBOPACK__imported__module__87022__4["cancelFrame"])(checkElapsed);
}
function delayInSeconds(callback, timeout) {
    return delay(callback, (0, __TURBOPACK__imported__module__63074__1["secondsToMilliseconds"])(timeout));
}
;
var __TURBOPACK__imported__module__89026__1 = __TURBOPACK__imported__module__89026__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__89026__2 = __TURBOPACK__imported__module__89026__;
;
/**
 * Checks if an element is specifically an SVGSVGElement (the root SVG element)
 * in a way that works across iframes
 */ function isSVGSVGElement(element) {
    return (0, __TURBOPACK__imported__module__89026__2["isSVGElement"])(element) && element.tagName === "svg";
}
;
var __TURBOPACK__imported__module__706__2 = __TURBOPACK__imported__module__706__;
var __TURBOPACK__imported__module__86427__1 = __TURBOPACK__imported__module__86427__;
var __TURBOPACK__imported__module__33871__ = __turbopack_context__.i(33871);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/animation/mix-values.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__706__3 = __TURBOPACK__imported__module__706__;
var __TURBOPACK__imported__module__65091__1 = __TURBOPACK__imported__module__65091__;
var __TURBOPACK__imported__module__83920__1 = __TURBOPACK__imported__module__83920__;
var __TURBOPACK__imported__module__91559__ = __turbopack_context__.i(91559);
var __TURBOPACK__imported__module__60830__3 = __TURBOPACK__imported__module__60830__;
var __TURBOPACK__imported__module__95051__ = __turbopack_context__.i(95051);
;
;
;
;
const numBorders = __TURBOPACK__imported__module__95051__["cornerRadiusProps"].length;
const asNumber = (value)=>typeof value === "string" ? parseFloat(value) : value;
const isPx = (value)=>typeof value === "number" || __TURBOPACK__imported__module__65091__1["px"].test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
    if (shouldCrossfadeOpacity) {
        target.opacity = (0, __TURBOPACK__imported__module__706__3["mixNumber"])(0, lead.opacity ?? 1, easeCrossfadeIn(progress));
        target.opacityExit = (0, __TURBOPACK__imported__module__706__3["mixNumber"])(follow.opacity ?? 1, 0, easeCrossfadeOut(progress));
    } else if (isOnlyMember) {
        target.opacity = (0, __TURBOPACK__imported__module__706__3["mixNumber"])(follow.opacity ?? 1, lead.opacity ?? 1, progress);
    }
    /**
     * Mix border radius
     */ for(let i = 0; i < numBorders; i++){
        const borderLabel = __TURBOPACK__imported__module__95051__["cornerRadiusProps"][i];
        let followRadius = getRadius(follow, borderLabel);
        let leadRadius = getRadius(lead, borderLabel);
        if (followRadius === undefined && leadRadius === undefined) continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max((0, __TURBOPACK__imported__module__706__3["mixNumber"])(asNumber(followRadius), asNumber(leadRadius), progress), 0);
            if (__TURBOPACK__imported__module__65091__1["percent"].test(leadRadius) || __TURBOPACK__imported__module__65091__1["percent"].test(followRadius)) {
                target[borderLabel] += "%";
            }
        } else {
            target[borderLabel] = leadRadius;
        }
    }
    /**
     * Mix rotation
     */ if (follow.rotate || lead.rotate) {
        target.rotate = (0, __TURBOPACK__imported__module__706__3["mixNumber"])(follow.rotate || 0, lead.rotate || 0, progress);
    }
}
function getRadius(values, radiusName) {
    return values[radiusName] !== undefined ? values[radiusName] : values.borderRadius;
}
const easeCrossfadeIn = /*@__PURE__*/ compress(0, 0.5, __TURBOPACK__imported__module__91559__["circOut"]);
const easeCrossfadeOut = /*@__PURE__*/ compress(0.5, 0.95, __TURBOPACK__imported__module__60830__3["noop"]);
function compress(min, max, easing) {
    return (p)=>{
        // Could replace ifs with clamp
        if (p < min) return 0;
        if (p > max) return 1;
        return easing((0, __TURBOPACK__imported__module__83920__1["progress"])(min, max, p));
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/copy.mjs [app-client] (ecmascript)
;
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */ function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */ function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
}
/**
 * Reset a delta to the provided origin box.
 *
 * This is a mutative operation.
 */ function copyAxisDeltaInto(delta, originDelta) {
    delta.translate = originDelta.translate;
    delta.scale = originDelta.scale;
    delta.originPoint = originDelta.originPoint;
    delta.origin = originDelta.origin;
}
;
var __TURBOPACK__imported__module__35636__ = __turbopack_context__.i(35636);
var __TURBOPACK__imported__module__52101__2 = __TURBOPACK__imported__module__52101__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/delta-remove.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__706__4 = __TURBOPACK__imported__module__706__;
var __TURBOPACK__imported__module__65091__2 = __TURBOPACK__imported__module__65091__;
var __TURBOPACK__imported__module__35636__1 = __TURBOPACK__imported__module__35636__;
;
;
;
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */ function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = (0, __TURBOPACK__imported__module__35636__1["scalePoint"])(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = (0, __TURBOPACK__imported__module__35636__1["scalePoint"])(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */ function removeAxisDelta(axis, translate = 0, scale = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
    if (__TURBOPACK__imported__module__65091__2["percent"].test(translate)) {
        translate = parseFloat(translate);
        const relativeProgress = (0, __TURBOPACK__imported__module__706__4["mixNumber"])(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number") return;
    let originPoint = (0, __TURBOPACK__imported__module__706__4["mixNumber"])(originAxis.min, originAxis.max, origin);
    if (axis === originAxis) originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */ function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */ const xKeys = [
    "x",
    "scaleX",
    "originX"
];
const yKeys = [
    "y",
    "scaleY",
    "originY"
];
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */ function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : undefined, sourceBox ? sourceBox.x : undefined);
    removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : undefined, sourceBox ? sourceBox.y : undefined);
}
;
var __TURBOPACK__imported__module__30162__1 = __TURBOPACK__imported__module__30162__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/utils.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__52101__3 = __TURBOPACK__imported__module__52101__;
;
function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
    return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
    return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
    return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
    return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
    return (0, __TURBOPACK__imported__module__52101__3["calcLength"])(box.x) / (0, __TURBOPACK__imported__module__52101__3["calcLength"])(box.y);
}
function axisDeltaEquals(a, b) {
    return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/shared/stack.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__33887__ = __turbopack_context__.i(33887);
;
class NodeStack {
    constructor(){
        this.members = [];
    }
    add(node) {
        (0, __TURBOPACK__imported__module__33887__["addUniqueItem"])(this.members, node);
        for(let i = this.members.length - 1; i >= 0; i--){
            const member = this.members[i];
            if (member === node || member === this.lead || member === this.prevLead) continue;
            const inst = member.instance;
            if ((!inst || inst.isConnected === false) && !member.snapshot) {
                (0, __TURBOPACK__imported__module__33887__["removeItem"])(this.members, member);
                member.unmount();
            }
        }
        node.scheduleRender();
    }
    remove(node) {
        (0, __TURBOPACK__imported__module__33887__["removeItem"])(this.members, node);
        if (node === this.prevLead) this.prevLead = undefined;
        if (node === this.lead) {
            const prevLead = this.members[this.members.length - 1];
            if (prevLead) this.promote(prevLead);
        }
    }
    relegate(node) {
        for(let i = this.members.indexOf(node) - 1; i >= 0; i--){
            const member = this.members[i];
            if (member.isPresent !== false && member.instance?.isConnected !== false) {
                this.promote(member);
                return true;
            }
        }
        return false;
    }
    promote(node, preserveFollowOpacity) {
        const prevLead = this.lead;
        if (node === prevLead) return;
        this.prevLead = prevLead;
        this.lead = node;
        node.show();
        if (prevLead) {
            prevLead.updateSnapshot();
            node.scheduleRender();
            const { layoutDependency: prevDep } = prevLead.options;
            const { layoutDependency: nextDep } = node.options;
            if (prevDep === undefined || prevDep !== nextDep) {
                node.resumeFrom = prevLead;
                if (preserveFollowOpacity) prevLead.preserveOpacity = true;
                if (prevLead.snapshot) {
                    node.snapshot = prevLead.snapshot;
                    node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
                }
                if (node.root?.isUpdating) node.isLayoutDirty = true;
            }
            if (node.options.crossfade === false) prevLead.hide();
        }
    }
    exitAnimationComplete() {
        this.members.forEach((member)=>{
            member.options.onExitComplete?.();
            member.resumingFrom?.options.onExitComplete?.();
        });
    }
    scheduleRender() {
        this.members.forEach((member)=>member.instance && member.scheduleRender(false));
    }
    removeLeadSnapshot() {
        if (this.lead?.snapshot) this.lead.snapshot = undefined;
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/styles/transform.mjs [app-client] (ecmascript)
;
function buildProjectionTransform(delta, treeScale, latestTransform) {
    let transform = "";
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */ const xTranslate = delta.x.translate / treeScale.x;
    const yTranslate = delta.y.translate / treeScale.y;
    const zTranslate = latestTransform?.z || 0;
    if (xTranslate || yTranslate || zTranslate) {
        transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
    }
    /**
     * Apply scale correction for the tree transform.
     * This will apply scale to the screen-orientated axes.
     */ if (treeScale.x !== 1 || treeScale.y !== 1) {
        transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (latestTransform) {
        const { transformPerspective, rotate, pathRotation, rotateX, rotateY, skewX, skewY } = latestTransform;
        if (transformPerspective) transform = `perspective(${transformPerspective}px) ${transform}`;
        if (rotate) transform += `rotate(${rotate}deg) `;
        // Additive `rotate()` so user `rotate` isn't clobbered.
        if (pathRotation) transform += `rotate(${pathRotation}deg) `;
        if (rotateX) transform += `rotateX(${rotateX}deg) `;
        if (rotateY) transform += `rotateY(${rotateY}deg) `;
        if (skewX) transform += `skewX(${skewX}deg) `;
        if (skewY) transform += `skewY(${skewY}deg) `;
    }
    /**
     * Apply scale to match the size of the element to the size we want it.
     * This will apply scale to the element-orientated axes.
     */ const elementScaleX = delta.x.scale * treeScale.x;
    const elementScaleY = delta.y.scale * treeScale.y;
    if (elementScaleX !== 1 || elementScaleY !== 1) {
        transform += `scale(${elementScaleX}, ${elementScaleY})`;
    }
    return transform || "none";
}
;
var __TURBOPACK__imported__module__55559__1 = __TURBOPACK__imported__module__55559__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/utils/flat-tree.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__33887__1 = __TURBOPACK__imported__module__33887__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/utils/compare-by-depth.mjs [app-client] (ecmascript)
;
const compareByDepth = (a, b)=>a.depth - b.depth;
;
;
;
class FlatTree {
    constructor(){
        this.children = [];
        this.isDirty = false;
    }
    add(child) {
        (0, __TURBOPACK__imported__module__33887__1["addUniqueItem"])(this.children, child);
        this.isDirty = true;
    }
    remove(child) {
        (0, __TURBOPACK__imported__module__33887__1["removeItem"])(this.children, child);
        this.isDirty = true;
    }
    forEach(callback) {
        this.isDirty && this.children.sort(compareByDepth);
        this.isDirty = false;
        this.children.forEach(callback);
    }
}
;
var __TURBOPACK__imported__module__77777__ = __turbopack_context__.i(77777);
var __TURBOPACK__imported__module__87022__5 = __TURBOPACK__imported__module__87022__;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const metrics = {
    nodes: 0,
    calculatedTargetDeltas: 0,
    calculatedProjections: 0
};
const transformAxes = [
    "",
    "X",
    "Y",
    "Z"
];
/**
 * We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
 * which has a noticeable difference in spring animations
 */ const animationTarget = 1000;
let id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
    const { latestValues } = visualElement;
    // Record the distorting transform and then temporarily set it to 0
    if (latestValues[key]) {
        values[key] = latestValues[key];
        visualElement.setStaticValue(key, 0);
        if (sharedAnimationValues) {
            sharedAnimationValues[key] = 0;
        }
    }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
    projectionNode.hasCheckedOptimisedAppear = true;
    if (projectionNode.root === projectionNode) return;
    const { visualElement } = projectionNode.options;
    if (!visualElement) return;
    const appearId = (0, __TURBOPACK__imported__module__16896__["getOptimisedAppearId"])(visualElement);
    if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
        const { layout, layoutId } = projectionNode.options;
        window.MotionCancelOptimisedAnimation(appearId, "transform", __TURBOPACK__imported__module__87022__5["frame"], !(layout || layoutId));
    }
    const { parent } = projectionNode;
    if (parent && !parent.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(parent);
    }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
    return class ProjectionNode {
        constructor(latestValues = {}, parent = defaultParent?.()){
            /**
             * A unique ID generated for every projection node.
             */ this.id = id++;
            /**
             * An id that represents a unique session instigated by startUpdate.
             */ this.animationId = 0;
            this.animationCommitId = 0;
            /**
             * A Set containing all this component's children. This is used to iterate
             * through the children.
             *
             * TODO: This could be faster to iterate as a flat array stored on the root node.
             */ this.children = new Set();
            /**
             * Options for the node. We use this to configure what kind of layout animations
             * we should perform (if any).
             */ this.options = {};
            /**
             * We use this to detect when its safe to shut down part of a projection tree.
             * We have to keep projecting children for scale correction and relative projection
             * until all their parents stop performing layout animations.
             */ this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            /**
             * Flag to true if we think this layout has been changed. We can't always know this,
             * currently we set it to true every time a component renders, or if it has a layoutDependency
             * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
             * and if one node is dirtied, they all are.
             */ this.isLayoutDirty = false;
            /**
             * Flag to true if we think the projection calculations for this node needs
             * recalculating as a result of an updated transform or layout animation.
             */ this.isProjectionDirty = false;
            /**
             * Flag to true if the layout *or* transform has changed. This then gets propagated
             * throughout the projection tree, forcing any element below to recalculate on the next frame.
             */ this.isSharedProjectionDirty = false;
            /**
             * Flag transform dirty. This gets propagated throughout the whole tree but is only
             * respected by shared nodes.
             */ this.isTransformDirty = false;
            /**
             * Block layout updates for instant layout transitions throughout the tree.
             */ this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            /**
             * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
             * call.
             */ this.isUpdating = false;
            /**
             * If this is an SVG element we currently disable projection transforms
             */ this.isSVG = false;
            /**
             * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
             * its projection styles.
             */ this.needsReset = false;
            /**
             * Flags whether this node should have its transform reset prior to measuring.
             */ this.shouldResetTransform = false;
            /**
             * Store whether this node has been checked for optimised appear animations. As
             * effects fire bottom-up, and we want to look up the tree for appear animations,
             * this makes sure we only check each path once, stopping at nodes that
             * have already been checked.
             */ this.hasCheckedOptimisedAppear = false;
            /**
             * An object representing the calculated contextual/accumulated/tree scale.
             * This will be used to scale calculcated projection transforms, as these are
             * calculated in screen-space but need to be scaled for elements to layoutly
             * make it to their calculated destinations.
             *
             * TODO: Lazy-init
             */ this.treeScale = {
                x: 1,
                y: 1
            };
            /**
             *
             */ this.eventHandlers = new Map();
            this.hasTreeAnimated = false;
            this.layoutVersion = 0;
            // Note: Currently only running on root node
            this.updateScheduled = false;
            this.scheduleUpdate = ()=>this.update();
            this.projectionUpdateScheduled = false;
            this.checkUpdateFailed = ()=>{
                if (this.isUpdating) {
                    this.isUpdating = false;
                    this.clearAllSnapshots();
                }
            };
            /**
             * This is a multi-step process as shared nodes might be of different depths. Nodes
             * are sorted by depth order, so we need to resolve the entire tree before moving to
             * the next step.
             */ this.updateProjection = ()=>{
                this.projectionUpdateScheduled = false;
                /**
                 * Reset debug counts. Manually resetting rather than creating a new
                 * object each frame.
                 */ if (statsBuffer.value) {
                    metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
                }
                this.nodes.forEach(propagateDirtyNodes);
                this.nodes.forEach(resolveTargetDelta);
                this.nodes.forEach(calcProjection);
                this.nodes.forEach(cleanDirtyNodes);
                if (statsBuffer.addProjectionMetrics) {
                    statsBuffer.addProjectionMetrics(metrics);
                }
            };
            /**
             * Frame calculations
             */ this.resolvedRelativeTargetAt = 0.0;
            this.linkedParentVersion = 0;
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            /**
             * Shared layout
             */ // TODO Only running on root node
            this.sharedNodes = new Map();
            this.latestValues = latestValues;
            this.root = parent ? parent.root || parent : this;
            this.path = parent ? [
                ...parent.path,
                parent
            ] : [];
            this.parent = parent;
            this.depth = parent ? parent.depth + 1 : 0;
            for(let i = 0; i < this.path.length; i++){
                this.path[i].shouldResetTransform = true;
            }
            if (this.root === this) this.nodes = new FlatTree();
        }
        addEventListener(name, handler) {
            if (!this.eventHandlers.has(name)) {
                this.eventHandlers.set(name, new __TURBOPACK__imported__module__70596__["SubscriptionManager"]());
            }
            return this.eventHandlers.get(name).add(handler);
        }
        notifyListeners(name, ...args) {
            const subscriptionManager = this.eventHandlers.get(name);
            subscriptionManager && subscriptionManager.notify(...args);
        }
        hasListeners(name) {
            return this.eventHandlers.has(name);
        }
        /**
         * Lifecycles
         */ mount(instance) {
            if (this.instance) return;
            this.isSVG = (0, __TURBOPACK__imported__module__89026__1["isSVGElement"])(instance) && !isSVGSVGElement(instance);
            this.instance = instance;
            const { layoutId, layout, visualElement } = this.options;
            if (visualElement && !visualElement.current) {
                visualElement.mount(instance);
            }
            this.root.nodes.add(this);
            this.parent && this.parent.children.add(this);
            if (this.root.hasTreeAnimated && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                let cancelDelay;
                let innerWidth = 0;
                const resizeUnblockUpdate = ()=>this.root.updateBlockedByResize = false;
                // Set initial innerWidth in a frame.read callback to batch the read
                __TURBOPACK__imported__module__87022__5["frame"].read(()=>{
                    innerWidth = window.innerWidth;
                });
                attachResizeListener(instance, ()=>{
                    const newInnerWidth = window.innerWidth;
                    if (newInnerWidth === innerWidth) return;
                    innerWidth = newInnerWidth;
                    this.root.updateBlockedByResize = true;
                    cancelDelay && cancelDelay();
                    cancelDelay = delay(resizeUnblockUpdate, 250);
                    if (globalProjectionState.hasAnimatedSinceResize) {
                        globalProjectionState.hasAnimatedSinceResize = false;
                        this.nodes.forEach(finishAnimation);
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            // Only register the handler if it requires layout animation
            if (this.options.animate !== false && visualElement && (layoutId || layout)) {
                this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout })=>{
                    if (this.isTreeAnimationBlocked()) {
                        this.target = undefined;
                        this.relativeTarget = undefined;
                        return;
                    }
                    // TODO: Check here if an animation exists
                    const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
                    const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
                    /**
                     * The target layout of the element might stay the same,
                     * but its position relative to its parent has changed.
                     */ const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
                    /*
                     * Note: Disabled to fix relative animations always triggering new
                     * layout animations. If this causes further issues, we can try
                     * a different approach to detecting relative target changes.
                     */ // || hasRelativeLayoutChanged
                    /**
                     * If the layout hasn't seemed to have changed, it might be that the
                     * element is visually in the same place in the document but its position
                     * relative to its parent has indeed changed. So here we check for that.
                     */ const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
                    if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
                        if (this.resumeFrom) {
                            this.resumingFrom = this.resumeFrom;
                            this.resumingFrom.resumingFrom = undefined;
                        }
                        const animationOptions = {
                            ...(0, __TURBOPACK__imported__module__87333__["getValueTransition"])(layoutTransition, "layout"),
                            onPlay: onLayoutAnimationStart,
                            onComplete: onLayoutAnimationComplete
                        };
                        if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
                            animationOptions.delay = 0;
                            animationOptions.type = false;
                        }
                        this.startAnimation(animationOptions);
                        /**
                         * Set animation origin after starting animation to avoid layout jump
                         * caused by stopping previous layout animation
                         */ this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged, animationOptions.path);
                    } else {
                        /**
                         * If the layout hasn't changed and we have an animation that hasn't started yet,
                         * finish it immediately. Otherwise it will be animating from a location
                         * that was probably never committed to screen and look like a jumpy box.
                         */ if (!hasLayoutChanged) {
                            finishAnimation(this);
                        }
                        if (this.isLead() && this.options.onExitComplete) {
                            this.options.onExitComplete();
                        }
                    }
                    this.targetLayout = newLayout;
                });
            }
        }
        unmount() {
            this.options.layoutId && this.willUpdate();
            this.root.nodes.remove(this);
            const stack = this.getStack();
            stack && stack.remove(this);
            this.parent && this.parent.children.delete(this);
            this.instance = undefined;
            this.eventHandlers.clear();
            (0, __TURBOPACK__imported__module__87022__5["cancelFrame"])(this.updateProjection);
        }
        // only on the root
        blockUpdate() {
            this.updateManuallyBlocked = true;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = false;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
        }
        // Note: currently only running on root node
        startUpdate() {
            if (this.isUpdateBlocked()) return;
            this.isUpdating = true;
            this.nodes && this.nodes.forEach(resetSkewAndRotation);
            this.animationId++;
        }
        getTransformTemplate() {
            const { visualElement } = this.options;
            return visualElement && visualElement.getProps().transformTemplate;
        }
        willUpdate(shouldNotifyListeners = true) {
            this.root.hasTreeAnimated = true;
            if (this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return;
            }
            /**
             * If we're running optimised appear animations then these must be
             * cancelled before measuring the DOM. This is so we can measure
             * the true layout of the element rather than the WAAPI animation
             * which will be unaffected by the resetSkewAndRotate step.
             *
             * Note: This is a DOM write. Worst case scenario is this is sandwiched
             * between other snapshot reads which will cause unnecessary style recalculations.
             * This has to happen here though, as we don't yet know which nodes will need
             * snapshots in startUpdate(), but we only want to cancel optimised animations
             * if a layout animation measurement is actually going to be affected by them.
             */ if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
                cancelTreeOptimisedTransformAnimations(this);
            }
            !this.root.isUpdating && this.root.startUpdate();
            if (this.isLayoutDirty) return;
            this.isLayoutDirty = true;
            for(let i = 0; i < this.path.length; i++){
                const node = this.path[i];
                node.shouldResetTransform = true;
                /**
                 * Percentage translates resolve against layoutBox dimensions,
                 * so ancestors with them must be re-measured after transform reset.
                 */ if (typeof node.latestValues.x === "string" || typeof node.latestValues.y === "string") {
                    node.isLayoutDirty = true;
                }
                node.updateScroll("snapshot");
                if (node.options.layoutRoot) {
                    node.willUpdate(false);
                }
            }
            const { layoutId, layout } = this.options;
            if (layoutId === undefined && !layout) return;
            const transformTemplate = this.getTransformTemplate();
            this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : undefined;
            this.updateSnapshot();
            shouldNotifyListeners && this.notifyListeners("willUpdate");
        }
        update() {
            this.updateScheduled = false;
            const updateWasBlocked = this.isUpdateBlocked();
            // When doing an instant transition, we skip the layout update,
            // but should still clean up the measurements so that the next
            // snapshot could be taken correctly.
            if (updateWasBlocked) {
                const wasBlockedByResize = this.updateBlockedByResize;
                this.unblockUpdate();
                this.updateBlockedByResize = false;
                this.clearAllSnapshots();
                /**
                 * When blocked by resize, still measure layouts so
                 * callbacks like onLayoutMeasure fire (e.g. Reorder).
                 * Skip notifyLayoutUpdate to prevent animations.
                 */ if (wasBlockedByResize) {
                    this.nodes.forEach(forceLayoutMeasure);
                }
                this.nodes.forEach(clearMeasurements);
                return;
            }
            /**
             * If this is a repeat of didUpdate then ignore the animation.
             */ if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(clearIsLayoutDirty);
                return;
            }
            this.animationCommitId = this.animationId;
            if (!this.isUpdating) {
                this.nodes.forEach(clearIsLayoutDirty);
            } else {
                this.isUpdating = false;
                /**
                 * Ensure animation-blocked nodes (e.g. during drag)
                 * get measured even when memoized (willUpdate skipped).
                 */ this.nodes.forEach(ensureDraggedNodesSnapshotted);
                /**
                 * Write
                 */ this.nodes.forEach(resetTransformStyle);
                /**
                 * Read ==================
                 */ // Update layout measurements of updated children
                this.nodes.forEach(updateLayout);
                /**
                 * Write
                 */ // Notify listeners that the layout is updated
                this.nodes.forEach(notifyLayoutUpdate);
            }
            this.clearAllSnapshots();
            /**
             * Manually flush any pending updates. Ideally
             * we could leave this to the following requestAnimationFrame but this seems
             * to leave a flash of incorrectly styled content.
             */ const now = __TURBOPACK__imported__module__96173__["time"].now();
            __TURBOPACK__imported__module__87022__5["frameData"].delta = (0, __TURBOPACK__imported__module__76959__1["clamp"])(0, 1000 / 60, now - __TURBOPACK__imported__module__87022__5["frameData"].timestamp);
            __TURBOPACK__imported__module__87022__5["frameData"].timestamp = now;
            __TURBOPACK__imported__module__87022__5["frameData"].isProcessing = true;
            __TURBOPACK__imported__module__87022__5["frameSteps"].update.process(__TURBOPACK__imported__module__87022__5["frameData"]);
            __TURBOPACK__imported__module__87022__5["frameSteps"].preRender.process(__TURBOPACK__imported__module__87022__5["frameData"]);
            __TURBOPACK__imported__module__87022__5["frameSteps"].render.process(__TURBOPACK__imported__module__87022__5["frameData"]);
            __TURBOPACK__imported__module__87022__5["frameData"].isProcessing = false;
        }
        didUpdate() {
            if (!this.updateScheduled) {
                this.updateScheduled = true;
                __TURBOPACK__imported__module__60140__1["microtask"].read(this.scheduleUpdate);
            }
        }
        clearAllSnapshots() {
            this.nodes.forEach(clearSnapshot);
            this.sharedNodes.forEach(removeLeadSnapshots);
        }
        scheduleUpdateProjection() {
            if (!this.projectionUpdateScheduled) {
                this.projectionUpdateScheduled = true;
                __TURBOPACK__imported__module__87022__5["frame"].preRender(this.updateProjection, false, true);
            }
        }
        scheduleCheckAfterUnmount() {
            /**
             * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
             * we manually call didUpdate to give a chance to the siblings to animate.
             * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
             */ __TURBOPACK__imported__module__87022__5["frame"].postRender(()=>{
                if (this.isLayoutDirty) {
                    this.root.didUpdate();
                } else {
                    this.root.checkUpdateFailed();
                }
            });
        }
        /**
         * Update measurements
         */ updateSnapshot() {
            if (this.snapshot || !this.instance) return;
            this.snapshot = this.measure();
            if (this.snapshot && !(0, __TURBOPACK__imported__module__52101__2["calcLength"])(this.snapshot.measuredBox.x) && !(0, __TURBOPACK__imported__module__52101__2["calcLength"])(this.snapshot.measuredBox.y)) {
                this.snapshot = undefined;
            }
        }
        updateLayout() {
            if (!this.instance) return;
            this.updateScroll();
            if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
                return;
            }
            /**
             * When a node is mounted, it simply resumes from the prevLead's
             * snapshot instead of taking a new one, but the ancestors scroll
             * might have updated while the prevLead is unmounted. We need to
             * update the scroll again to make sure the layout we measure is
             * up to date.
             */ if (this.resumeFrom && !this.resumeFrom.instance) {
                for(let i = 0; i < this.path.length; i++){
                    const node = this.path[i];
                    node.updateScroll();
                }
            }
            const prevLayout = this.layout;
            this.layout = this.measure(false);
            this.layoutVersion++;
            if (!this.layoutCorrected) this.layoutCorrected = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners("measure", this.layout.layoutBox);
            const { visualElement } = this.options;
            visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : undefined);
        }
        updateScroll(phase = "measure") {
            let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
                needsMeasurement = false;
            }
            if (needsMeasurement && this.instance) {
                const isRoot = checkIsScrollRoot(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase,
                    isRoot,
                    offset: measureScroll(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : isRoot
                };
            }
        }
        resetTransform() {
            if (!resetTransform) return;
            const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
            const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
            const transformTemplate = this.getTransformTemplate();
            const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : undefined;
            const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
            if (isResetRequested && this.instance && (hasProjection || (0, __TURBOPACK__imported__module__77777__["hasTransform"])(this.latestValues) || transformTemplateHasChanged)) {
                resetTransform(this.instance, transformTemplateValue);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        }
        measure(removeTransform = true) {
            const pageBox = this.measurePageBox();
            let layoutBox = this.removeElementScroll(pageBox);
            /**
             * Measurements taken during the pre-render stage
             * still have transforms applied so we remove them
             * via calculation.
             */ if (removeTransform) {
                layoutBox = this.removeTransform(layoutBox);
            }
            roundBox(layoutBox);
            return {
                animationId: this.root.animationId,
                measuredBox: pageBox,
                layoutBox,
                latestValues: {},
                source: this.id
            };
        }
        measurePageBox() {
            const { visualElement } = this.options;
            if (!visualElement) return (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            const box = visualElement.measureViewportBox();
            const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
            if (!wasInScrollRoot) {
                // Remove viewport scroll to give page-relative coordinates
                const { scroll } = this.root;
                if (scroll) {
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(box.x, scroll.offset.x);
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(box.y, scroll.offset.y);
                }
            }
            return box;
        }
        removeElementScroll(box) {
            const boxWithoutScroll = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            copyBoxInto(boxWithoutScroll, box);
            if (this.scroll?.wasRoot) {
                return boxWithoutScroll;
            }
            /**
             * Performance TODO: Keep a cumulative scroll offset down the tree
             * rather than loop back up the path.
             */ for(let i = 0; i < this.path.length; i++){
                const node = this.path[i];
                const { scroll, options } = node;
                if (node !== this.root && scroll && options.layoutScroll) {
                    /**
                     * If this is a new scroll root, we want to remove all previous scrolls
                     * from the viewport box.
                     */ if (scroll.wasRoot) {
                        copyBoxInto(boxWithoutScroll, box);
                    }
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(boxWithoutScroll.x, scroll.offset.x);
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(boxWithoutScroll.y, scroll.offset.y);
                }
            }
            return boxWithoutScroll;
        }
        applyTransform(box, transformOnly = false, output) {
            const withTransforms = output || (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            copyBoxInto(withTransforms, box);
            for(let i = 0; i < this.path.length; i++){
                const node = this.path[i];
                if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(withTransforms.x, -node.scroll.offset.x);
                    (0, __TURBOPACK__imported__module__35636__["translateAxis"])(withTransforms.y, -node.scroll.offset.y);
                }
                if (!(0, __TURBOPACK__imported__module__77777__["hasTransform"])(node.latestValues)) continue;
                (0, __TURBOPACK__imported__module__35636__["transformBox"])(withTransforms, node.latestValues, node.layout?.layoutBox);
            }
            if ((0, __TURBOPACK__imported__module__77777__["hasTransform"])(this.latestValues)) {
                (0, __TURBOPACK__imported__module__35636__["transformBox"])(withTransforms, this.latestValues, this.layout?.layoutBox);
            }
            return withTransforms;
        }
        removeTransform(box) {
            const boxWithoutTransform = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            copyBoxInto(boxWithoutTransform, box);
            for(let i = 0; i < this.path.length; i++){
                const node = this.path[i];
                if (!(0, __TURBOPACK__imported__module__77777__["hasTransform"])(node.latestValues)) continue;
                let sourceBox;
                if (node.instance) {
                    (0, __TURBOPACK__imported__module__77777__["hasScale"])(node.latestValues) && node.updateSnapshot();
                    sourceBox = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                    copyBoxInto(sourceBox, node.measurePageBox());
                }
                removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot?.layoutBox, sourceBox);
            }
            if ((0, __TURBOPACK__imported__module__77777__["hasTransform"])(this.latestValues)) {
                removeBoxTransforms(boxWithoutTransform, this.latestValues);
            }
            return boxWithoutTransform;
        }
        setTargetDelta(delta) {
            this.targetDelta = delta;
            this.root.scheduleUpdateProjection();
            this.isProjectionDirty = true;
        }
        setOptions(options) {
            this.options = {
                ...this.options,
                ...options,
                crossfade: options.crossfade !== undefined ? options.crossfade : true
            };
        }
        clearMeasurements() {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        }
        forceRelativeParentToResolveTarget() {
            if (!this.relativeParent) return;
            /**
             * If the parent target isn't up-to-date, force it to update.
             * This is an unfortunate de-optimisation as it means any updating relative
             * projection will cause all the relative parents to recalculate back
             * up the tree.
             */ if (this.relativeParent.resolvedRelativeTargetAt !== __TURBOPACK__imported__module__87022__5["frameData"].timestamp) {
                this.relativeParent.resolveTargetDelta(true);
            }
        }
        resolveTargetDelta(forceRecalculation = false) {
            /**
             * Once the dirty status of nodes has been spread through the tree, we also
             * need to check if we have a shared node of a different depth that has itself
             * been dirtied.
             */ const lead = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
            this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            /**
             * We don't use transform for this step of processing so we don't
             * need to check whether any nodes have changed transform.
             */ const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
            if (canSkip) return;
            const { layout, layoutId } = this.options;
            /**
             * If we have no layout, we can't perform projection, so early return
             */ if (!this.layout || !(layout || layoutId)) return;
            this.resolvedRelativeTargetAt = __TURBOPACK__imported__module__87022__5["frameData"].timestamp;
            const relativeParent = this.getClosestProjectingParent();
            if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) {
                this.removeRelativeTarget();
            }
            /**
             * If we don't have a targetDelta but do have a layout, we can attempt to resolve
             * a relativeParent. This will allow a component to perform scale correction
             * even if no animation has started.
             */ if (!this.targetDelta && !this.relativeTarget) {
                if (this.options.layoutAnchor !== false && relativeParent && relativeParent.layout) {
                    this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
                } else {
                    this.removeRelativeTarget();
                }
            }
            /**
             * If we have no relative target or no target delta our target isn't valid
             * for this frame.
             */ if (!this.relativeTarget && !this.targetDelta) return;
            /**
             * Lazy-init target data structure
             */ if (!this.target) {
                this.target = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                this.targetWithTransforms = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            }
            /**
             * If we've got a relative box for this component, resolve it into a target relative to the parent.
             */ if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
                this.forceRelativeParentToResolveTarget();
                (0, __TURBOPACK__imported__module__52101__2["calcRelativeBox"])(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || undefined);
            /**
                 * If we've only got a targetDelta, resolve it into a target
                 */ } else if (this.targetDelta) {
                if (Boolean(this.resumingFrom)) {
                    this.applyTransform(this.layout.layoutBox, false, this.target);
                } else {
                    copyBoxInto(this.target, this.layout.layoutBox);
                }
                (0, __TURBOPACK__imported__module__35636__["applyBoxDelta"])(this.target, this.targetDelta);
            } else {
                /**
                 * If no target, use own layout as target
                 */ copyBoxInto(this.target, this.layout.layoutBox);
            }
            /**
             * If we've been told to attempt to resolve a relative target, do so.
             */ if (this.attemptToResolveRelativeTarget) {
                this.attemptToResolveRelativeTarget = false;
                if (this.options.layoutAnchor !== false && relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
                    this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
                } else {
                    this.relativeParent = this.relativeTarget = undefined;
                }
            }
            /**
             * Increase debug counter for resolved target deltas
             */ if (statsBuffer.value) {
                metrics.calculatedTargetDeltas++;
            }
        }
        getClosestProjectingParent() {
            if (!this.parent || (0, __TURBOPACK__imported__module__77777__["hasScale"])(this.parent.latestValues) || (0, __TURBOPACK__imported__module__77777__["has2DTranslate"])(this.parent.latestValues)) {
                return undefined;
            }
            if (this.parent.isProjecting()) {
                return this.parent;
            } else {
                return this.parent.getClosestProjectingParent();
            }
        }
        isProjecting() {
            return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
        }
        createRelativeTarget(relativeParent, layout, parentLayout) {
            this.relativeParent = relativeParent;
            this.linkedParentVersion = relativeParent.layoutVersion;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            this.relativeTargetOrigin = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            (0, __TURBOPACK__imported__module__52101__2["calcRelativePosition"])(this.relativeTargetOrigin, layout, parentLayout, this.options.layoutAnchor || undefined);
            copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = undefined;
        }
        calcProjection() {
            const lead = this.getLead();
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            let canSkip = true;
            /**
             * If this is a normal layout animation and neither this node nor its nearest projecting
             * is dirty then we can't skip.
             */ if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
                canSkip = false;
            }
            /**
             * If this is a shared layout animation and this node's shared projection is dirty then
             * we can't skip.
             */ if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
                canSkip = false;
            }
            /**
             * If we have resolved the target this frame we must recalculate the
             * projection to ensure it visually represents the internal calculations.
             */ if (this.resolvedRelativeTargetAt === __TURBOPACK__imported__module__87022__5["frameData"].timestamp) {
                canSkip = false;
            }
            if (canSkip) return;
            const { layout, layoutId } = this.options;
            /**
             * If this section of the tree isn't animating we can
             * delete our target sources for the following frame.
             */ this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId)) return;
            /**
             * Reset the corrected box with the latest values from box, as we're then going
             * to perform mutative operations on it.
             */ copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
            /**
             * Record previous tree scales before updating.
             */ const prevTreeScaleX = this.treeScale.x;
            const prevTreeScaleY = this.treeScale.y;
            /**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */ (0, __TURBOPACK__imported__module__35636__["applyTreeDeltas"])(this.layoutCorrected, this.treeScale, this.path, isShared);
            /**
             * If this layer needs to perform scale correction but doesn't have a target,
             * use the layout as the target.
             */ if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
                lead.target = lead.layout.layoutBox;
                lead.targetWithTransforms = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            }
            const { target } = lead;
            if (!target) {
                /**
                 * If we don't have a target to project into, but we were previously
                 * projecting, we want to remove the stored transform and schedule
                 * a render to ensure the elements reflect the removed transform.
                 */ if (this.prevProjectionDelta) {
                    this.createProjectionDeltas();
                    this.scheduleRender();
                }
                return;
            }
            if (!this.projectionDelta || !this.prevProjectionDelta) {
                this.createProjectionDeltas();
            } else {
                copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
                copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
            }
            /**
             * Update the delta between the corrected box and the target box before user-set transforms were applied.
             * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
             * for our layout reprojection, but still allow them to be scaled correctly by the user.
             * It might be that to simplify this we may want to accept that user-set scale is also corrected
             * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
             * to allow people to choose whether these styles are corrected based on just the
             * layout reprojection or the final bounding box.
             */ (0, __TURBOPACK__imported__module__52101__2["calcBoxDelta"])(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
            /**
             * Increase debug counter for recalculated projections
             */ if (statsBuffer.value) {
                metrics.calculatedProjections++;
            }
        }
        hide() {
            this.isVisible = false;
        // TODO: Schedule render
        }
        show() {
            this.isVisible = true;
        // TODO: Schedule render
        }
        scheduleRender(notifyAll = true) {
            this.options.visualElement?.scheduleRender();
            if (notifyAll) {
                const stack = this.getStack();
                stack && stack.scheduleRender();
            }
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
            this.projectionDelta = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
            this.projectionDeltaWithTransform = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
        }
        setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false, pathFn) {
            const snapshot = this.snapshot;
            const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
            const mixedValues = {
                ...this.latestValues
            };
            const targetDelta = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
            if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
                this.relativeTarget = this.relativeTargetOrigin = undefined;
            }
            this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
            const relativeLayout = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
            const snapshotSource = snapshot ? snapshot.source : undefined;
            const layoutSource = this.layout ? this.layout.source : undefined;
            const isSharedLayoutAnimation = snapshotSource !== layoutSource;
            const stack = this.getStack();
            const isOnlyMember = !stack || stack.members.length <= 1;
            const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
            this.animationProgress = 0;
            let prevRelativeTarget;
            // The path decides whether the layout shift is worth curving
            // (distance floor) and resolves the interpolator from the delta.
            const interpolate = pathFn?.interpolateProjection(delta);
            this.mixTargetDelta = (latest)=>{
                const progress = latest / 1000;
                const point = interpolate?.(progress);
                if (point) {
                    targetDelta.x.translate = point.x;
                    targetDelta.x.scale = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(delta.x.scale, 1, progress);
                    targetDelta.x.origin = delta.x.origin;
                    targetDelta.x.originPoint = delta.x.originPoint;
                    targetDelta.y.translate = point.y;
                    targetDelta.y.scale = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(delta.y.scale, 1, progress);
                    targetDelta.y.origin = delta.y.origin;
                    targetDelta.y.originPoint = delta.y.originPoint;
                } else {
                    mixAxisDeltaLinear(targetDelta.x, delta.x, progress);
                    mixAxisDeltaLinear(targetDelta.y, delta.y, progress);
                }
                this.setTargetDelta(targetDelta);
                if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
                    (0, __TURBOPACK__imported__module__52101__2["calcRelativePosition"])(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || undefined);
                    mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
                    /**
                     * If this is an unchanged relative target we can consider the
                     * projection not dirty.
                     */ if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
                        this.isProjectionDirty = false;
                    }
                    if (!prevRelativeTarget) prevRelativeTarget = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                    copyBoxInto(prevRelativeTarget, this.relativeTarget);
                }
                if (isSharedLayoutAnimation) {
                    this.animationValues = mixedValues;
                    mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
                }
                if (point && point.rotate !== undefined) {
                    // Dedicated `pathRotation` channel, not `rotate`, so an
                    // animating `rotate` is composed with, never clobbered.
                    if (!this.animationValues) this.animationValues = mixedValues;
                    this.animationValues.pathRotation = point.rotate;
                }
                this.root.scheduleUpdateProjection();
                this.scheduleRender();
                this.animationProgress = progress;
            };
            this.mixTargetDelta(this.options.layoutRoot ? 1000 : 0);
        }
        startAnimation(options) {
            this.notifyListeners("animationStart");
            this.currentAnimation?.stop();
            this.resumingFrom?.currentAnimation?.stop();
            if (this.pendingAnimation) {
                (0, __TURBOPACK__imported__module__87022__5["cancelFrame"])(this.pendingAnimation);
                this.pendingAnimation = undefined;
            }
            /**
             * Start the animation in the next frame to have a frame with progress 0,
             * where the target is the same as when the animation started, so we can
             * calculate the relative positions correctly for instant transitions.
             */ this.pendingAnimation = __TURBOPACK__imported__module__87022__5["frame"].update(()=>{
                globalProjectionState.hasAnimatedSinceResize = true;
                this.motionValue || (this.motionValue = (0, __TURBOPACK__imported__module__86427__1["motionValue"])(0));
                this.motionValue.jump(0, false);
                this.currentAnimation = animateSingleValue(this.motionValue, [
                    0,
                    1000
                ], {
                    ...options,
                    velocity: 0,
                    isSync: true,
                    onUpdate: (latest)=>{
                        this.mixTargetDelta(latest);
                        options.onUpdate && options.onUpdate(latest);
                    },
                    onComplete: ()=>{
                        options.onComplete && options.onComplete();
                        this.completeAnimation();
                    }
                });
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = this.currentAnimation;
                }
                this.pendingAnimation = undefined;
            });
        }
        completeAnimation() {
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            const stack = this.getStack();
            stack && stack.exitAnimationComplete();
            this.resumingFrom = this.currentAnimation = this.animationValues = undefined;
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
            if (this.currentAnimation) {
                this.mixTargetDelta && this.mixTargetDelta(animationTarget);
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        }
        applyTransformsToTarget() {
            const lead = this.getLead();
            let { targetWithTransforms, target, layout, latestValues } = lead;
            if (!targetWithTransforms || !target || !layout) return;
            /**
             * If we're only animating position, and this element isn't the lead element,
             * then instead of projecting into the lead box we instead want to calculate
             * a new target that aligns the two boxes but maintains the layout shape.
             */ if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                target = this.target || (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                const xLength = (0, __TURBOPACK__imported__module__52101__2["calcLength"])(this.layout.layoutBox.x);
                target.x.min = lead.target.x.min;
                target.x.max = target.x.min + xLength;
                const yLength = (0, __TURBOPACK__imported__module__52101__2["calcLength"])(this.layout.layoutBox.y);
                target.y.min = lead.target.y.min;
                target.y.max = target.y.min + yLength;
            }
            copyBoxInto(targetWithTransforms, target);
            /**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */ (0, __TURBOPACK__imported__module__35636__["transformBox"])(targetWithTransforms, latestValues);
            /**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its layout layout
             * into the desired bounding box.
             */ (0, __TURBOPACK__imported__module__52101__2["calcBoxDelta"])(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
        }
        registerSharedNode(layoutId, node) {
            if (!this.sharedNodes.has(layoutId)) {
                this.sharedNodes.set(layoutId, new NodeStack());
            }
            const stack = this.sharedNodes.get(layoutId);
            stack.add(node);
            const config = node.options.initialPromotionConfig;
            node.promote({
                transition: config ? config.transition : undefined,
                preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : undefined
            });
        }
        isLead() {
            const stack = this.getStack();
            return stack ? stack.lead === this : true;
        }
        getLead() {
            const { layoutId } = this.options;
            return layoutId ? this.getStack()?.lead || this : this;
        }
        getPrevLead() {
            const { layoutId } = this.options;
            return layoutId ? this.getStack()?.prevLead : undefined;
        }
        getStack() {
            const { layoutId } = this.options;
            if (layoutId) return this.root.sharedNodes.get(layoutId);
        }
        promote({ needsReset, transition, preserveFollowOpacity } = {}) {
            const stack = this.getStack();
            if (stack) stack.promote(this, preserveFollowOpacity);
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition) this.setOptions({
                transition
            });
        }
        relegate() {
            const stack = this.getStack();
            if (stack) {
                return stack.relegate(this);
            } else {
                return false;
            }
        }
        resetSkewAndRotation() {
            const { visualElement } = this.options;
            if (!visualElement) return;
            // If there's no detected skew or rotation values, we can early return without a forced render.
            let hasDistortingTransform = false;
            /**
             * An unrolled check for rotation values. Most elements don't have any rotation and
             * skipping the nested loop and new object creation is 50% faster.
             */ const { latestValues } = visualElement;
            if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
                hasDistortingTransform = true;
            }
            // If there's no distorting values, we don't need to do any more.
            if (!hasDistortingTransform) return;
            const resetValues = {};
            if (latestValues.z) {
                resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
            }
            // Check the skew and rotate value of all axes and reset to 0
            for(let i = 0; i < transformAxes.length; i++){
                resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
                resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
            }
            // Force a render of this element to apply the transform with all skews and rotations
            // set to 0.
            visualElement.render();
            // Put back all the values we reset
            for(const key in resetValues){
                visualElement.setStaticValue(key, resetValues[key]);
                if (this.animationValues) {
                    this.animationValues[key] = resetValues[key];
                }
            }
            // Schedule a render for the next frame. This ensures we won't visually
            // see the element with the reset rotate value applied.
            visualElement.scheduleRender();
        }
        applyProjectionStyles(targetStyle, styleProp) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) {
                targetStyle.visibility = "hidden";
                return;
            }
            const transformTemplate = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = false;
                targetStyle.visibility = "";
                targetStyle.opacity = "";
                targetStyle.pointerEvents = (0, __TURBOPACK__imported__module__33871__["resolveMotionValue"])(styleProp?.pointerEvents) || "";
                targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
                return;
            }
            const lead = this.getLead();
            if (!this.projectionDelta || !this.layout || !lead.target) {
                if (this.options.layoutId) {
                    targetStyle.opacity = this.latestValues.opacity !== undefined ? this.latestValues.opacity : 1;
                    targetStyle.pointerEvents = (0, __TURBOPACK__imported__module__33871__["resolveMotionValue"])(styleProp?.pointerEvents) || "";
                }
                if (this.hasProjected && !(0, __TURBOPACK__imported__module__77777__["hasTransform"])(this.latestValues)) {
                    targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
                    this.hasProjected = false;
                }
                return;
            }
            targetStyle.visibility = "";
            const valuesToRender = lead.animationValues || lead.latestValues;
            this.applyTransformsToTarget();
            let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
            if (transformTemplate) {
                transform = transformTemplate(valuesToRender, transform);
            }
            targetStyle.transform = transform;
            const { x, y } = this.projectionDelta;
            targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
            if (lead.animationValues) {
                /**
                 * If the lead component is animating, assign this either the entering/leaving
                 * opacity
                 */ targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
            } else {
                /**
                 * Or we're not animating at all, set the lead component to its layout
                 * opacity and other components to hidden.
                 */ targetStyle.opacity = lead === this ? valuesToRender.opacity !== undefined ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== undefined ? valuesToRender.opacityExit : 0;
            }
            /**
             * Apply scale correction
             */ for(const key in __TURBOPACK__imported__module__24463__["scaleCorrectors"]){
                if (valuesToRender[key] === undefined) continue;
                const { correct, applyTo, isCSSVariable } = __TURBOPACK__imported__module__24463__["scaleCorrectors"][key];
                /**
                 * Only apply scale correction to the value if we have an
                 * active projection transform. Otherwise these values become
                 * vulnerable to distortion if the element changes size without
                 * a corresponding layout animation.
                 */ const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
                if (applyTo) {
                    const num = applyTo.length;
                    for(let i = 0; i < num; i++){
                        targetStyle[applyTo[i]] = corrected;
                    }
                } else {
                    // If this is a CSS variable, set it directly on the instance.
                    // Replacing this function from creating styles to setting them
                    // would be a good place to remove per frame object creation
                    if (isCSSVariable) {
                        this.options.visualElement.renderState.vars[key] = corrected;
                    } else {
                        targetStyle[key] = corrected;
                    }
                }
            }
            /**
             * Disable pointer events on follow components. This is to ensure
             * that if a follow component covers a lead component it doesn't block
             * pointer events on the lead.
             */ if (this.options.layoutId) {
                targetStyle.pointerEvents = lead === this ? (0, __TURBOPACK__imported__module__33871__["resolveMotionValue"])(styleProp?.pointerEvents) || "" : "none";
            }
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = undefined;
        }
        // Only run on root
        resetTree() {
            this.root.nodes.forEach((node)=>node.currentAnimation?.stop());
            this.root.nodes.forEach(clearMeasurements);
            this.root.sharedNodes.clear();
        }
    };
}
function updateLayout(node) {
    node.updateLayout();
}
function notifyLayoutUpdate(node) {
    const snapshot = node.resumeFrom?.snapshot || node.snapshot;
    if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
        const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
        const { animationType } = node.options;
        const isShared = snapshot.source !== node.layout.source;
        // TODO Maybe we want to also resize the layout snapshot so we don't trigger
        // animations for instance if layout="size" and an element has only changed position
        if (animationType === "size") {
            (0, __TURBOPACK__imported__module__55559__1["eachAxis"])((axis)=>{
                const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
                const length = (0, __TURBOPACK__imported__module__52101__2["calcLength"])(axisSnapshot);
                axisSnapshot.min = layout[axis].min;
                axisSnapshot.max = axisSnapshot.min + length;
            });
        } else if (animationType === "x" || animationType === "y") {
            const snapAxis = animationType === "x" ? "y" : "x";
            copyAxisInto(isShared ? snapshot.measuredBox[snapAxis] : snapshot.layoutBox[snapAxis], layout[snapAxis]);
        } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
            (0, __TURBOPACK__imported__module__55559__1["eachAxis"])((axis)=>{
                const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
                const length = (0, __TURBOPACK__imported__module__52101__2["calcLength"])(layout[axis]);
                axisSnapshot.max = axisSnapshot.min + length;
                /**
                 * Ensure relative target gets resized and rerendererd
                 */ if (node.relativeTarget && !node.currentAnimation) {
                    node.isProjectionDirty = true;
                    node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
                }
            });
        }
        const layoutDelta = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
        (0, __TURBOPACK__imported__module__52101__2["calcBoxDelta"])(layoutDelta, layout, snapshot.layoutBox);
        const visualDelta = (0, __TURBOPACK__imported__module__30162__1["createDelta"])();
        if (isShared) {
            (0, __TURBOPACK__imported__module__52101__2["calcBoxDelta"])(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
        } else {
            (0, __TURBOPACK__imported__module__52101__2["calcBoxDelta"])(visualDelta, layout, snapshot.layoutBox);
        }
        const hasLayoutChanged = !isDeltaZero(layoutDelta);
        let hasRelativeLayoutChanged = false;
        if (!node.resumeFrom) {
            const relativeParent = node.getClosestProjectingParent();
            /**
             * If the relativeParent is itself resuming from a different element then
             * the relative snapshot is not relavent
             */ if (relativeParent && !relativeParent.resumeFrom) {
                const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
                if (parentSnapshot && parentLayout) {
                    const anchor = node.options.layoutAnchor || undefined;
                    const relativeSnapshot = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                    (0, __TURBOPACK__imported__module__52101__2["calcRelativePosition"])(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox, anchor);
                    const relativeLayout = (0, __TURBOPACK__imported__module__30162__1["createBox"])();
                    (0, __TURBOPACK__imported__module__52101__2["calcRelativePosition"])(relativeLayout, layout, parentLayout.layoutBox, anchor);
                    if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
                        hasRelativeLayoutChanged = true;
                    }
                    if (relativeParent.options.layoutRoot) {
                        node.relativeTarget = relativeLayout;
                        node.relativeTargetOrigin = relativeSnapshot;
                        node.relativeParent = relativeParent;
                    }
                }
            }
        }
        node.notifyListeners("didUpdate", {
            layout,
            snapshot,
            delta: visualDelta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeLayoutChanged
        });
    } else if (node.isLead()) {
        const { onExitComplete } = node.options;
        onExitComplete && onExitComplete();
    }
    /**
     * Clearing transition
     * TODO: Investigate why this transition is being passed in as {type: false } from Framer
     * and why we need it at all
     */ node.options.transition = undefined;
}
function propagateDirtyNodes(node) {
    /**
     * Increase debug counter for nodes encountered this frame
     */ if (statsBuffer.value) {
        metrics.nodes++;
    }
    if (!node.parent) return;
    /**
     * If this node isn't projecting, propagate isProjectionDirty. It will have
     * no performance impact but it will allow the next child that *is* projecting
     * but *isn't* dirty to just check its parent to see if *any* ancestor needs
     * correcting.
     */ if (!node.isProjecting()) {
        node.isProjectionDirty = node.parent.isProjectionDirty;
    }
    /**
     * Propagate isSharedProjectionDirty and isTransformDirty
     * throughout the whole tree. A future revision can take another look at
     * this but for safety we still recalcualte shared nodes.
     */ node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
    node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
    node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
    node.clearSnapshot();
}
function clearMeasurements(node) {
    node.clearMeasurements();
}
function forceLayoutMeasure(node) {
    node.isLayoutDirty = true;
    node.updateLayout();
}
function clearIsLayoutDirty(node) {
    node.isLayoutDirty = false;
}
/**
 * When a node is animation-blocked (e.g. during drag) and its component
 * didn't re-render (memoized), willUpdate() is never called so there's
 * no snapshot. Use the previous layout as a snapshot and mark dirty so
 * resetTransform/updateLayout/notifyLayoutUpdate process it normally.
 */ function ensureDraggedNodesSnapshotted(node) {
    if (node.isAnimationBlocked && node.layout && !node.isLayoutDirty) {
        node.snapshot = node.layout;
        node.isLayoutDirty = true;
    }
}
function resetTransformStyle(node) {
    const { visualElement } = node.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
        visualElement.notify("BeforeLayoutMeasure");
    }
    node.resetTransform();
}
function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = undefined;
    node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
    node.resolveTargetDelta();
}
function calcProjection(node) {
    node.calcProjection();
}
function resetSkewAndRotation(node) {
    node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
}
function mixAxisDeltaLinear(output, delta, p) {
    output.translate = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(delta.translate, 0, p);
    output.scale = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(delta.scale, 1, p);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
    output.min = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(from.min, to.min, p);
    output.max = (0, __TURBOPACK__imported__module__706__2["mixNumber"])(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
    mixAxis(output.x, from.x, to.x, p);
    mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
    return node.animationValues && node.animationValues.opacityExit !== undefined;
}
const defaultLayoutTransition = {
    duration: 0.45,
    ease: [
        0.4,
        0,
        0.1,
        1
    ]
};
const userAgentContains = (string)=>typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
/**
 * Measured bounding boxes must be rounded in Safari and
 * left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
 * can appear to jump.
 */ const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : __TURBOPACK__imported__module__60830__2["noop"];
function roundAxis(axis) {
    // Round to the nearest .5 pixels to support subpixel layouts
    axis.min = roundPoint(axis.min);
    axis.max = roundPoint(axis.max);
}
function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
    return animationType === "position" || animationType === "preserve-aspect" && !(0, __TURBOPACK__imported__module__52101__2["isNear"])(aspectRatio(snapshot), aspectRatio(layout), 0.2);
}
function checkNodeWasScrollRoot(node) {
    return node !== node.root && node.scroll?.wasRoot;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/node/DocumentProjectionNode.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__82774__2 = __TURBOPACK__imported__module__82774__;
;
;
const DocumentProjectionNode = createProjectionNode({
    attachResizeListener: (ref, notify)=>(0, __TURBOPACK__imported__module__82774__2["addDomEvent"])(ref, "resize", notify),
    measureScroll: ()=>({
            x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
            y: document.documentElement.scrollTop || document.body?.scrollTop || 0
        }),
    checkIsScrollRoot: ()=>true
});
;
;
;
const rootProjectionNode = {
    current: undefined
};
const HTMLProjectionNode = createProjectionNode({
    measureScroll: (instance)=>({
            x: instance.scrollLeft,
            y: instance.scrollTop
        }),
    defaultParent: ()=>{
        if (!rootProjectionNode.current) {
            const documentNode = new DocumentProjectionNode({});
            documentNode.mount(window);
            documentNode.setOptions({
                layoutScroll: true
            });
            rootProjectionNode.current = documentNode;
        }
        return rootProjectionNode.current;
    },
    resetTransform: (instance, value)=>{
        instance.style.transform = value !== undefined ? value : "none";
    },
    checkIsScrollRoot: (instance)=>Boolean(window.getComputedStyle(instance).position === "fixed")
});
;
;
;
;
;
const drag = {
    pan: {
        Feature: PanGesture
    },
    drag: {
        Feature: DragGesture,
        ProjectionNode: HTMLProjectionNode,
        MeasureLayout: MeasureLayout
    }
};
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/gestures.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/hover.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__2 = __TURBOPACK__imported__module__42098__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/hover.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__39676__ = __turbopack_context__.i(39676);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__49652__1 = __TURBOPACK__imported__module__49652__;
;
function setupGesture(elementOrSelector, options) {
    const elements = (0, __TURBOPACK__imported__module__49652__1["resolveElements"])(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
        passive: true,
        ...options,
        signal: gestureAbortController.signal
    };
    const cancel = ()=>gestureAbortController.abort();
    return [
        elements,
        eventOptions,
        cancel
    ];
}
;
;
;
function isValidHover(event) {
    return !(event.pointerType === "touch" || (0, __TURBOPACK__imported__module__39676__["isDragActive"])());
}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
 *
 * @public
 */ function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
    elements.forEach((element)=>{
        let isPressed = false;
        let deferredHoverEnd = false;
        let hoverEndCallback;
        const removePointerLeave = ()=>{
            element.removeEventListener("pointerleave", onPointerLeave);
        };
        const endHover = (event)=>{
            if (hoverEndCallback) {
                hoverEndCallback(event);
                hoverEndCallback = undefined;
            }
            removePointerLeave();
        };
        const onPointerUp = (event)=>{
            isPressed = false;
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            if (deferredHoverEnd) {
                deferredHoverEnd = false;
                endHover(event);
            }
        };
        const onPointerDown = ()=>{
            isPressed = true;
            window.addEventListener("pointerup", onPointerUp, eventOptions);
            window.addEventListener("pointercancel", onPointerUp, eventOptions);
        };
        const onPointerLeave = (leaveEvent)=>{
            if (leaveEvent.pointerType === "touch") return;
            if (isPressed) {
                deferredHoverEnd = true;
                return;
            }
            endHover(leaveEvent);
        };
        const onPointerEnter = (enterEvent)=>{
            if (!isValidHover(enterEvent)) return;
            deferredHoverEnd = false;
            const onHoverEnd = onHoverStart(element, enterEvent);
            if (typeof onHoverEnd !== "function") return;
            hoverEndCallback = onHoverEnd;
            element.addEventListener("pointerleave", onPointerLeave, eventOptions);
        };
        element.addEventListener("pointerenter", onPointerEnter, eventOptions);
        element.addEventListener("pointerdown", onPointerDown, eventOptions);
    });
    return cancel;
}
;
var __TURBOPACK__imported__module__87022__6 = __TURBOPACK__imported__module__87022__;
;
;
function handleHoverEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileHover) {
        node.animationState.setActive("whileHover", lifecycle === "Start");
    }
    const eventName = "onHover" + lifecycle;
    const callback = props[eventName];
    if (callback) {
        __TURBOPACK__imported__module__87022__6["frame"].postRender(()=>callback(event, extractEventInfo(event)));
    }
}
class HoverGesture extends __TURBOPACK__imported__module__42098__2["Feature"] {
    mount() {
        const { current } = this.node;
        if (!current) return;
        this.unmount = hover(current, (_element, startEvent)=>{
            handleHoverEvent(this.node, startEvent, "Start");
            return (endEvent)=>handleHoverEvent(this.node, endEvent, "End");
        });
    }
    unmount() {}
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/focus.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__3 = __TURBOPACK__imported__module__42098__;
var __TURBOPACK__imported__module__82774__3 = __TURBOPACK__imported__module__82774__;
var __TURBOPACK__imported__module__38638__1 = __TURBOPACK__imported__module__38638__;
;
;
class FocusGesture extends __TURBOPACK__imported__module__42098__3["Feature"] {
    constructor(){
        super(...arguments);
        this.isActive = false;
    }
    onFocus() {
        let isFocusVisible = false;
        /**
         * If this element doesn't match focus-visible then don't
         * apply whileHover. But, if matches throws that focus-visible
         * is not a valid selector then in that browser outline styles will be applied
         * to the element by default and we want to match that behaviour with whileFocus.
         */ try {
            isFocusVisible = this.node.current.matches(":focus-visible");
        } catch (e) {
            isFocusVisible = true;
        }
        if (!isFocusVisible || !this.node.animationState) return;
        this.node.animationState.setActive("whileFocus", true);
        this.isActive = true;
    }
    onBlur() {
        if (!this.isActive || !this.node.animationState) return;
        this.node.animationState.setActive("whileFocus", false);
        this.isActive = false;
    }
    mount() {
        this.unmount = (0, __TURBOPACK__imported__module__38638__1["pipe"])((0, __TURBOPACK__imported__module__82774__3["addDomEvent"])(this.node.current, "focus", ()=>this.onFocus()), (0, __TURBOPACK__imported__module__82774__3["addDomEvent"])(this.node.current, "blur", ()=>this.onBlur()));
    }
    unmount() {}
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/gestures/press.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__4 = __TURBOPACK__imported__module__42098__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/press/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42824__ = __turbopack_context__.i(42824);
;
/**
 * Checks if an element is an HTML element in a way
 * that works across iframes
 */ function isHTMLElement(element) {
    return (0, __TURBOPACK__imported__module__42824__["isObject"])(element) && "offsetHeight" in element && !("ownerSVGElement" in element);
}
;
var __TURBOPACK__imported__module__39676__1 = __TURBOPACK__imported__module__39676__;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)
;
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */ const isNodeOrChild = (parent, child)=>{
    if (!child) {
        return false;
    } else if (parent === child) {
        return true;
    } else {
        return isNodeOrChild(parent, child.parentElement);
    }
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-client] (ecmascript)
;
const isPressing = new WeakSet();
;
;
/**
 * Filter out events that are not "Enter" keys.
 */ function filterEvents(callback) {
    return (event)=>{
        if (event.key !== "Enter") return;
        callback(event);
    };
}
function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, {
        isPrimary: true,
        bubbles: true
    }));
}
const enableKeyboardPress = (focusEvent, eventOptions)=>{
    const element = focusEvent.currentTarget;
    if (!element) return;
    const handleKeydown = filterEvents(()=>{
        if (isPressing.has(element)) return;
        firePointerEvent(element, "down");
        const handleKeyup = filterEvents(()=>{
            firePointerEvent(element, "up");
        });
        const handleBlur = ()=>firePointerEvent(element, "cancel");
        element.addEventListener("keyup", handleKeyup, eventOptions);
        element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    /**
     * Add an event listener that fires on blur to remove the keydown events.
     */ element.addEventListener("blur", ()=>element.removeEventListener("keydown", handleKeydown), eventOptions);
};
;
;
;
;
;
;
;
;
;
/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */ function isValidPressEvent(event) {
    return isPrimaryPointer(event) && !(0, __TURBOPACK__imported__module__39676__1["isDragActive"])();
}
const claimedPointerDownEvents = new WeakSet();
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */ function press(targetOrSelector, onPressStart, options = {}) {
    const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
    const startPress = (startEvent)=>{
        const target = startEvent.currentTarget;
        if (!isValidPressEvent(startEvent)) return;
        if (claimedPointerDownEvents.has(startEvent)) return;
        isPressing.add(target);
        if (options.stopPropagation) {
            claimedPointerDownEvents.add(startEvent);
        }
        const onPressEnd = onPressStart(target, startEvent);
        /**
         * End listeners run in the capture phase so a descendant calling
         * stopPropagation() in its own pointerup handler can't prevent the
         * press gesture from ending. This also keeps the gesture-end
         * ordering consistent with the drag gesture. See #2794.
         */ const endEventOptions = {
            ...eventOptions,
            capture: true
        };
        const onPointerEnd = (endEvent, success)=>{
            window.removeEventListener("pointerup", onPointerUp, endEventOptions);
            window.removeEventListener("pointercancel", onPointerCancel, endEventOptions);
            if (isPressing.has(target)) {
                isPressing.delete(target);
            }
            if (!isValidPressEvent(endEvent)) {
                return;
            }
            if (typeof onPressEnd === "function") {
                onPressEnd(endEvent, {
                    success
                });
            }
        };
        const onPointerUp = (upEvent)=>{
            onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
        };
        const onPointerCancel = (cancelEvent)=>{
            onPointerEnd(cancelEvent, false);
        };
        window.addEventListener("pointerup", onPointerUp, endEventOptions);
        window.addEventListener("pointercancel", onPointerCancel, endEventOptions);
    };
    targets.forEach((target)=>{
        const pointerDownTarget = options.useGlobalTarget ? window : target;
        pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
        if (isHTMLElement(target)) {
            target.addEventListener("focus", (event)=>enableKeyboardPress(event, eventOptions));
            if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) {
                target.tabIndex = 0;
            }
        }
    });
    return cancelEvents;
}
;
var __TURBOPACK__imported__module__87022__7 = __TURBOPACK__imported__module__87022__;
;
;
function handlePressEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
        return;
    }
    if (node.animationState && props.whileTap) {
        node.animationState.setActive("whileTap", lifecycle === "Start");
    }
    const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
    const callback = props[eventName];
    if (callback) {
        __TURBOPACK__imported__module__87022__7["frame"].postRender(()=>callback(event, extractEventInfo(event)));
    }
}
class PressGesture extends __TURBOPACK__imported__module__42098__4["Feature"] {
    mount() {
        const { current } = this.node;
        if (!current) return;
        const { globalTapTarget, propagate } = this.node.props;
        this.unmount = press(current, (_element, startEvent)=>{
            handlePressEvent(this.node, startEvent, "Start");
            return (endEvent, { success })=>handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
        }, {
            useGlobalTarget: globalTapTarget,
            stopPropagation: propagate?.tap === false
        });
    }
    unmount() {}
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__42098__5 = __TURBOPACK__imported__module__42098__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs [app-client] (ecmascript)
;
/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */ const observerCallbacks = new WeakMap();
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */ const observers = new WeakMap();
const fireObserverCallback = (entry)=>{
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
};
const fireAllObserverCallbacks = (entries)=>{
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
    const lookupRoot = root || document;
    /**
     * If we don't have an observer lookup map for this root, create one.
     */ if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options);
    /**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */ if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
            root,
            ...options
        });
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return ()=>{
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}
;
;
;
const thresholdNames = {
    some: 0,
    all: 1
};
class InViewFeature extends __TURBOPACK__imported__module__42098__5["Feature"] {
    constructor(){
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
    startObserver() {
        this.stopObserver?.();
        const { viewport = {} } = this.node.getProps();
        const { root, margin: rootMargin, amount = "some", once } = viewport;
        const options = {
            root: root ? root.current : undefined,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount]
        };
        const onIntersectionUpdate = (entry)=>{
            const { isIntersecting } = entry;
            /**
             * If there's been no change in the viewport state, early return.
             */ if (this.isInView === isIntersecting) return;
            this.isInView = isIntersecting;
            /**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */ if (once && !isIntersecting && this.hasEnteredView) {
                return;
            } else if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive("whileInView", isIntersecting);
            }
            /**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */ const { onViewportEnter, onViewportLeave } = this.node.getProps();
            const callback = isIntersecting ? onViewportEnter : onViewportLeave;
            callback && callback(entry);
        };
        this.stopObserver = observeIntersection(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver === "undefined") return;
        const { props, prevProps } = this.node;
        const hasOptionsChanged = [
            "amount",
            "margin",
            "root"
        ].some(hasViewportOptionChanged(props, prevProps));
        if (hasOptionsChanged) {
            this.startObserver();
        }
    }
    unmount() {
        this.stopObserver?.();
        this.hasEnteredView = false;
        this.isInView = false;
    }
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name)=>viewport[name] !== prevViewport[name];
}
;
;
;
;
;
const gestureAnimations = {
    inView: {
        Feature: InViewFeature
    },
    tap: {
        Feature: PressGesture
    },
    focus: {
        Feature: FocusGesture
    },
    hover: {
        Feature: HoverGesture
    }
};
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/layout.mjs [app-client] (ecmascript)
;
;
;
const layout = {
    layout: {
        ProjectionNode: HTMLProjectionNode,
        MeasureLayout: MeasureLayout
    }
};
;
;
;
;
;
const featureBundle = {
    ...__TURBOPACK__imported__module__23070__["animations"],
    ...gestureAnimations,
    ...drag,
    ...layout
};
;
;
;
;
const motion = /*@__PURE__*/ (0, __TURBOPACK__imported__module__7051__["createMotionProxy"])(featureBundle, __TURBOPACK__imported__module__54505__["createDomVisualElement"]);
;
__turbopack_context__.s([
    "motion",
    0,
    motion
], 46932);
}),
54505, 76959, 
65091, 
30162, 
83411, 
65566, 
60830, 
87022, 
63074, 
33887, 
70596, 
60140, 
96173, 
86427, 
95051, 
706, 
24463, 
27677, 
77777, 
35636, 
53689, 
31178, 
33871, 
21476, 
47414, 
4035, 
25522, 
74008, 
7051, 
42098, 
87333, 
47834, 
80538, 
16896, 
38638, 
91559, 
83920, 
39011, 
76859, 
23070, 
55559, 
82774, 
39676, 
37541, 
52101, 
42824, 
89026, 
((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)
;
/**
 * Generate a list of every possible transform key.
 */ const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
];
/**
 * A quick lookup for transform props.
 *
 * `pathRotation` is a transform for routing purposes (skipped from raw
 * style application, wired to the transform composite, flags transform
 * dirty) but is intentionally NOT in `transformPropOrder` — it is
 * composed onto `rotate` at the build sites, not serialized in its own
 * slot, and must stay out of the order-array consumers (parse-transform,
 * unit-conversion, keys-position).
 */ const transformProps = /*@__PURE__*/ (()=>new Set([
        ...transformPropOrder,
        "pathRotation"
    ]))();
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)
;
const clamp = (min, max, v)=>{
    if (v > max) return max;
    if (v < min) return min;
    return v;
};
;
__turbopack_context__.s([
    "clamp",
    0,
    clamp
], 76959);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)
;
;
const number = {
    test: (v)=>typeof v === "number",
    parse: parseFloat,
    transform: (v)=>v
};
const alpha = {
    ...number,
    transform: (v)=>clamp(0, 1, v)
};
const scale = {
    ...number,
    default: 1
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)
;
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = (v)=>Math.round(v * 100000) / 100000;
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)
;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs [app-client] (ecmascript)
;
function isNullish(v) {
    return v == null;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs [app-client] (ecmascript)
;
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
;
;
;
;
/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */ const isColorString = (type, testProp)=>(v)=>{
        return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
    };
const splitColor = (aName, bName, cName)=>(v)=>{
        if (typeof v !== "string") return v;
        const [a, b, c, alpha] = v.match(floatRegex);
        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1
        };
    };
;
;
;
;
;
const clampRgbUnit = (v)=>clamp(0, 255, v);
const rgbUnit = {
    ...number,
    transform: (v)=>Math.round(clampRgbUnit(v))
};
const rgba = {
    test: /*@__PURE__*/ isColorString("rgb", "red"),
    parse: /*@__PURE__*/ splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 })=>"rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
;
;
;
function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
    // Or we have 3 characters, ie #F00
    } else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1
    };
}
const hex = {
    test: /*@__PURE__*/ isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)
;
/*#__NO_SIDE_EFFECTS__*/ const createUnitType = (unit)=>({
        test: (v)=>typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
        parse: parseFloat,
        transform: (v)=>`${v}${unit}`
    });
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = /*@__PURE__*/ (()=>({
        ...percent,
        parse: (v)=>percent.parse(v) / 100,
        transform: (v)=>percent.transform(v * 100)
    }))();
;
__turbopack_context__.s([
    "degrees",
    0,
    degrees,
    "percent",
    0,
    percent,
    "progressPercentage",
    0,
    progressPercentage,
    "px",
    0,
    px,
    "vh",
    0,
    vh,
    "vw",
    0,
    vw
], 65091);
;
;
;
;
const hsla = {
    test: /*@__PURE__*/ isColorString("hsl", "hue"),
    parse: /*@__PURE__*/ splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 })=>{
        return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
};
;
;
;
;
const color = {
    test: (v)=>rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v)=>{
        if (rgba.test(v)) {
            return rgba.parse(v);
        } else if (hsla.test(v)) {
            return hsla.parse(v);
        } else {
            return hex.parse(v);
        }
    },
    transform: (v)=>{
        return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
    },
    getAnimatableNone: (v)=>{
        const parsed = color.parse(v);
        parsed.alpha = 0;
        return color.transform(parsed);
    }
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs [app-client] (ecmascript)
;
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
;
;
;
;
;
function test(v) {
    return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: []
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue)=>{
        if (color.test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(color.parse(parsedValue));
        } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        } else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return {
        values,
        split,
        indexes,
        types
    };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
    const numSections = split.length;
    return (v)=>{
        let output = "";
        for(let i = 0; i < numSections; i++){
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += sanitize(v[i]);
                } else if (type === COLOR_TOKEN) {
                    output += color.transform(v[i]);
                } else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
function createTransformer(source) {
    return buildTransformer(analyseComplexValue(source));
}
const convertNumbersToZero = (v)=>typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
/**
 * Convert a parsed value to its zero equivalent, but preserve numbers
 * that act as divisors in CSS calc() expressions.
 *
 * analyseComplexValue extracts numbers from CSS strings and puts the
 * surrounding text into a `split` template array. For example:
 *   "calc(var(--gap) / 5)"  →  values: [var(--gap), 5]
 *                               split:  ["calc(", " / ", ")"]
 *
 * When building a zero-equivalent for animation, naively zeroing all
 * numbers turns the divisor into 0 → "calc(var(--gap) / 0)" → NaN.
 * We detect this by checking whether the text preceding a number
 * (split[i]) ends with "/" — the CSS calc division operator.
 */ const convertToZero = (value, splitBefore)=>{
    if (typeof value === "number") {
        return splitBefore?.trim().endsWith("/") ? value : 0;
    }
    return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
    const info = analyseComplexValue(v);
    const transformer = buildTransformer(info);
    return transformer(info.values.map((value, i)=>convertToZero(value, info.split[i])));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone
};
;
;
;
/**
 * Properties that should default to 1 or 100%
 */ const maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow") return v;
    const [number] = value.match(floatRegex) || [];
    if (!number) return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ...complex,
    getAnimatableNone: (v)=>{
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/complex/mask.mjs [app-client] (ecmascript)
;
;
const mask = {
    ...complex,
    getAnimatableNone: (v)=>{
        const parsed = complex.parse(v);
        const transformer = complex.createTransformer(v);
        return transformer(parsed.map((v)=>typeof v === "number" ? 0 : typeof v === "object" ? {
                ...v,
                alpha: 1
            } : v));
    }
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/int.mjs [app-client] (ecmascript)
;
;
const int = {
    ...number,
    transform: Math.round
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-client] (ecmascript)
;
;
;
const transformValueTypes = {
    rotate: degrees,
    /**
     * Internal channel for `transition.path` orientToPath. Composed onto
     * `rotate` at the transform-build sites so the user's `rotate` is
     * never read or overwritten. Not part of `transformPropOrder`.
     */ pathRotation: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale: scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px
};
;
;
;
;
;
const numberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    inset: px,
    insetBlock: px,
    insetBlockStart: px,
    insetBlockEnd: px,
    insetInline: px,
    insetInlineStart: px,
    insetInlineEnd: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    paddingBlock: px,
    paddingBlockStart: px,
    paddingBlockEnd: px,
    paddingInline: px,
    paddingInlineStart: px,
    paddingInlineEnd: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    marginBlock: px,
    marginBlockStart: px,
    marginBlockEnd: px,
    marginInline: px,
    marginInlineStart: px,
    marginInlineEnd: px,
    // Typography
    fontSize: px,
    // Misc
    backgroundPositionX: px,
    backgroundPositionY: px,
    ...transformValueTypes,
    zIndex: int,
    // SVG
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: int
};
;
;
;
;
;
/**
 * A map of default value types for common values
 */ const defaultValueTypes = {
    ...numberValueTypes,
    // Color props
    color: color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    // Border props
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter: filter,
    WebkitFilter: filter,
    mask: mask,
    WebkitMask: mask
};
/**
 * Gets the default ValueType for the provided value key
 */ const getDefaultValueType = (key)=>defaultValueTypes[key];
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)
;
const createAxisDelta = ()=>({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    });
const createDelta = ()=>({
        x: createAxisDelta(),
        y: createAxisDelta()
    });
const createAxis = ()=>({
        min: 0,
        max: 0
    });
const createBox = ()=>({
        x: createAxis(),
        y: createAxis()
    });
;
__turbopack_context__.s([
    "createBox",
    0,
    createBox,
    "createDelta",
    0,
    createDelta
], 30162);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)
;
const isMotionValue = (value)=>Boolean(value && value.getVelocity);
;
__turbopack_context__.s([
    "isMotionValue",
    0,
    isMotionValue
], 83411);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-client] (ecmascript)
;
;
const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...transformPropOrder
]);
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-client] (ecmascript)
;
/**
 * ValueType for "auto"
 */ const auto = {
    test: (v)=>v === "auto",
    parse: (v)=>v
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)
;
/**
 * Tests a provided value against a ValueType
 */ const testValueType = (v)=>(type)=>type.test(v);
;
;
;
;
;
/**
 * A list of value types commonly used for dimensions
 */ const dimensionValueTypes = [
    number,
    px,
    percent,
    degrees,
    vw,
    vh,
    auto
];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */ const findDimensionValueType = (v)=>dimensionValueTypes.find(testValueType(v));
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__ = /*#__PURE__*/ __turbopack_context__.i(47167);
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)
;
function formatErrorMessage(message, errorCode) {
    return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}
;
;
let warning = ()=>{};
let invariant = ()=>{};
if (typeof __TURBOPACK__imported__module__47167__["default"] !== "undefined" && ("TURBOPACK compile-time value", "development") !== "production") {
    warning = (check, message, errorCode)=>{
        if (!check && typeof console !== "undefined") {
            console.warn(formatErrorMessage(message, errorCode));
        }
    };
    invariant = (check, message, errorCode)=>{
        if (!check) {
            throw new Error(formatErrorMessage(message, errorCode));
        }
    };
}
;
__turbopack_context__.s([
    "invariant",
    0,
    invariant,
    "warning",
    0,
    warning
], 65566);
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)
;
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */ const isNumericalString = (v)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)
;
const checkStringStartsWith = (token)=>(key)=>typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = /*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value)=>{
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken) return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
 * Check if a value contains a CSS variable anywhere (e.g. inside calc()).
 * Unlike isCSSVariableToken which checks if the value IS a var() token,
 * this checks if the value CONTAINS var() somewhere in the string.
 */ function containsCSSVariable(value) {
    if (typeof value !== "string") return false;
    // Strip comments to avoid false positives
    return value.split("/*")[0].includes("var(--");
}
;
;
;
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */ const splitCSSVariableRegex = // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match) return [
        , 
    ];
    const [, token1, token2, fallback] = match;
    return [
        `--${token1 ?? token2}`,
        fallback
    ];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token) return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-client] (ecmascript)
;
function fillWildcards(keyframes) {
    for(let i = 1; i < keyframes.length; i++){
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)
;
const radToDeg = (rad)=>rad * 180 / Math.PI;
const rotate = (v)=>{
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v)=>(Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v)=>radToDeg(Math.atan(v[1])),
    skewY: (v)=>radToDeg(Math.atan(v[2])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[2])) / 2
};
const rebaseAngle = (angle)=>{
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v)=>Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v)=>Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v)=>(scaleX(v) + scaleY(v)) / 2,
    rotateX: (v)=>rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v)=>rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v)=>radToDeg(Math.atan(v[4])),
    skewY: (v)=>radToDeg(Math.atan(v[1])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    } else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name)=>{
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}
;
;
;
;
;
const isNumOrPxType = (v)=>v === number || v === px;
const transformKeys = new Set([
    "x",
    "y",
    "z"
]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key)=>!transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key)=>{
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([
                key,
                value.get()
            ]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing })=>{
        const width = x.max - x.min;
        return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing })=>{
        const height = y.max - y.min;
        return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: (_bbox, { top })=>parseFloat(top),
    left: (_bbox, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    // Transform
    x: (_bbox, { transform })=>parseValueFromTransform(transform, "x"),
    y: (_bbox, { transform })=>parseValueFromTransform(transform, "y")
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)
;
/*#__NO_SIDE_EFFECTS__*/ const noop = (any)=>any;
;
__turbopack_context__.s([
    "noop",
    0,
    noop
], 60830);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)
;
const MotionGlobalConfig = {};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/order.mjs [app-client] (ecmascript)
;
const stepsOrder = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender"
];
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/render-step.mjs [app-client] (ecmascript)
;
function createRenderStep(runNextFrame) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */ let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */ let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */ const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */ schedule: (callback, keepAlive = false, immediate = false)=>{
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */ cancel: (callback)=>{
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */ process: (frameData)=>{
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */ if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            // Swap this frame and the next to avoid GC
            const prevFrame = thisFrame;
            thisFrame = nextFrame;
            nextFrame = prevFrame;
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        }
    };
    return step;
}
;
;
;
;
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    const flagRunNextFrame = ()=>runNextFrame = true;
    const steps = stepsOrder.reduce((acc, key)=>{
        acc[key] = createRenderStep(flagRunNextFrame);
        return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
    const processBatch = ()=>{
        const useManualTiming = MotionGlobalConfig.useManualTiming;
        const timestamp = useManualTiming ? state.timestamp : performance.now();
        runNextFrame = false;
        if (!useManualTiming) {
            state.delta = useDefaultElapsed ? 1000 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        setup.process(state);
        read.process(state);
        resolveKeyframes.process(state);
        preUpdate.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = ()=>{
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = stepsOrder.reduce((acc, key)=>{
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false)=>{
            if (!runNextFrame) wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process)=>{
        for(let i = 0; i < stepsOrder.length; i++){
            steps[stepsOrder[i]].cancel(process);
        }
    };
    return {
        schedule,
        cancel,
        state,
        steps
    };
}
;
;
;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
;
__turbopack_context__.s([
    "cancelFrame",
    0,
    cancelFrame,
    "frame",
    0,
    frame,
    "frameData",
    0,
    frameData,
    "frameSteps",
    0,
    frameSteps
], 87022);
;
;
;
const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver)=>resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver)=>resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */ elementsToMeasure.forEach((element)=>{
            const removedTransforms = removeNonTranslationalTransform(element);
            if (!removedTransforms.length) return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element)=>{
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value])=>{
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver)=>{
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver)=>resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver)=>{
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false){
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */ this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */ this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...unresolvedKeyframes
        ];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                frame.read(readAllKeyframes);
                frame.resolveKeyframes(measureAllKeyframes);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            } else if (element && name) {
                const valueAsRead = element.readValue(name, finalKeyframe);
                if (valueAsRead !== undefined && valueAsRead !== null) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        fillWildcards(unresolvedKeyframes);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending") this.scheduleResolve();
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)
;
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */ const isZeroValueString = (v)=>/^0[^.\s]+$/u.test(v);
;
;
function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    } else if (value !== null) {
        return value === "none" || value === "0" || isZeroValueString(value);
    } else {
        return true;
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)
;
;
;
;
;
const customTypes = /*@__PURE__*/ new Set([
    filter,
    mask
]);
function getAnimatableNone1(key, value) {
    let defaultValueType = getDefaultValueType(key);
    if (!customTypes.has(defaultValueType)) defaultValueType = complex;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : undefined;
}
;
;
;
/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */ const invalidTemplates = new Set([
    "auto",
    "none",
    "0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while(i < unresolvedKeyframes.length && !animatableTemplate){
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes){
            unresolvedKeyframes[noneIndex] = getAnimatableNone1(name, animatableTemplate);
        }
    }
}
;
;
;
;
;
;
;
;
;
class DOMKeyframesResolver extends KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element){
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current) return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */ for(let i = 0; i < unresolvedKeyframes.length; i++){
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if (isCSSVariableToken(keyframe)) {
                    const resolved = getVariableValue(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */ this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */ if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        const originType = findDimensionValueType(origin);
        const targetType = findDimensionValueType(target);
        /**
         * If one keyframe contains embedded CSS variables (e.g. in calc()) and the other
         * doesn't, we need to measure to convert to pixels. This handles GitHub issue #3410.
         */ const originHasVar = containsCSSVariable(origin);
        const targetHasVar = containsCSSVariable(target);
        if (originHasVar !== targetHasVar && positionalValues[name]) {
            this.needsMeasurement = true;
            return;
        }
        /**
         * Either we don't recognise these value types or we can animate between them.
         */ if (originType === targetType) return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */ if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
            for(let i = 0; i < unresolvedKeyframes.length; i++){
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        } else if (positionalValues[name]) {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */ this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for(let i = 0; i < unresolvedKeyframes.length; i++){
            if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current) return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        const { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current) return;
        const value = element.getValue(name);
        value && value.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue])=>{
                element.getValue(unsetTransformName).set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__1 = __TURBOPACK__imported__module__47167__;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)
;
;
const warned = new Set();
function hasWarned(message) {
    return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
    if (condition || warned.has(message)) return;
    console.warn(formatErrorMessage(message, errorCode));
    warned.add(message);
}
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)
;
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */ /*#__NO_SIDE_EFFECTS__*/ const secondsToMilliseconds = (seconds)=>seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/ const millisecondsToSeconds = (milliseconds)=>milliseconds / 1000;
;
__turbopack_context__.s([
    "millisecondsToSeconds",
    0,
    millisecondsToSeconds,
    "secondsToMilliseconds",
    0,
    secondsToMilliseconds
], 63074);
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)
;
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}
;
__turbopack_context__.s([
    "addUniqueItem",
    0,
    addUniqueItem,
    "removeItem",
    0,
    removeItem
], 33887);
;
class SubscriptionManager {
    constructor(){
        this.subscriptions = [];
    }
    add(handler) {
        addUniqueItem(this.subscriptions, handler);
        return ()=>removeItem(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions) return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */ this.subscriptions[0](a, b, c);
        } else {
            for(let i = 0; i < numSubscriptions; i++){
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */ const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
;
__turbopack_context__.s([
    "SubscriptionManager",
    0,
    SubscriptionManager
], 70596);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-client] (ecmascript)
;
const isCSSVar = (name)=>name.startsWith("--");
;
;
function setStyle(element, name, value) {
    isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)
;
/*#__NO_SIDE_EFFECTS__*/ function memo(callback) {
    let result;
    return ()=>{
        if (result === undefined) result = callback();
        return result;
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)
;
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */ const supportsFlags = {};
;
;
;
function memoSupports(callback, supportsFlag) {
    const memoized = memo(callback);
    return ()=>supportsFlags[supportsFlag] ?? memoized();
}
;
;
const supportsScrollTimeline = /* @__PURE__ */ memoSupports(()=>window.ScrollTimeline !== undefined, "scrollTimeline");
const supportsViewTimeline = /* @__PURE__ */ memoSupports(()=>window.ViewTimeline !== undefined, "viewTimeline");
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)
;
const isNotNull = (value)=>value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined ? resolvedKeyframes[index] : finalKeyframe;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)
;
class WithPromise {
    constructor(){
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve)=>{
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */ then(onResolve, onReject) {
        return this.finished.then(onResolve, onReject);
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)
;
/*#__NO_SIDE_EFFECTS__*/ const isBezierDefinition = (easing)=>Array.isArray(easing) && typeof easing[0] === "number";
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)
;
;
const supportsLinearEasing = /*@__PURE__*/ memoSupports(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (e) {
        return false;
    }
    return true;
}, "linearEasing");
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)
;
const generateLinearEasing = (easing, duration, resolution = 10 // as milliseconds
)=>{
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for(let i = 0; i < numPoints; i++){
        points += Math.round(easing(i / (numPoints - 1)) * 10000) / 10000 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)
;
const cubicBezierAsString = ([a, b, c, d])=>`cubic-bezier(${a}, ${b}, ${c}, ${d})`;
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-client] (ecmascript)
;
;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ cubicBezierAsString([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: /*@__PURE__*/ cubicBezierAsString([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: /*@__PURE__*/ cubicBezierAsString([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: /*@__PURE__*/ cubicBezierAsString([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
;
;
;
;
;
;
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    } else if (typeof easing === "function") {
        return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
    } else if (isBezierDefinition(easing)) {
        return cubicBezierAsString(easing);
    } else if (Array.isArray(easing)) {
        return easing.map((segmentEasing)=>mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
    } else {
        return supportedWaapiEasing[easing];
    }
}
;
;
function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes
    };
    if (times) keyframeOptions.offset = times;
    const easing = mapEasingToNativeEasing(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */ if (Array.isArray(easing)) keyframeOptions.easing = easing;
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement) options.pseudoElement = pseudoElement;
    return element.animate(keyframeOptions, options);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)
;
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}
;
;
;
function applyGeneratorOptions({ type, ...options }) {
    if (isGenerator(type) && supportsLinearEasing()) {
        return type.applyToOptions(options);
    } else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}
;
;
;
;
;
;
;
;
/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */ class NativeAnimation extends WithPromise {
    constructor(options){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        /**
         * Tracks a manually-set start time that takes precedence over WAAPI's
         * dynamic startTime. This is cleared when play() or time setter is called,
         * allowing WAAPI to take over timing.
         */ this.manualStartTime = null;
        if (!options) return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = applyGeneratorOptions(options);
        this.animation = startWaapiAnimation(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = getFinalKeyframe(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                }
                /**
                 * If we can, we want to commit the final style as set by the user,
                 * rather than the computed keyframe value supplied by the animation.
                 * We always do this, even when a motion value is present, to prevent
                 * a visual flash in Firefox where the WAAPI animation's fill is removed
                 * during cancel() before the scheduled render can apply the correct value.
                 */ setStyle(element, name, keyframe);
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (this.isStopped) return;
        this.manualStartTime = null;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch (e) {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        } else {
            this.commitStyles();
        }
        if (!this.isPseudoElement) this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */ commitStyles() {
        const element = this.options?.element;
        if (!this.isPseudoElement && element?.isConnected) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return millisecondsToSeconds(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + millisecondsToSeconds(delay);
    }
    get time() {
        return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        const wasFinished = this.finishedTime !== null;
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = secondsToMilliseconds(newTime);
        if (wasFinished) {
            this.animation.pause();
        }
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */ get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0) this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */ attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: "linear"
            });
        }
        this.animation.onfinish = null;
        if (timeline && supportsScrollTimeline()) {
            this.animation.timeline = timeline;
            if (rangeStart) this.animation.rangeStart = rangeStart;
            if (rangeEnd) this.animation.rangeEnd = rangeEnd;
            return noop;
        } else {
            return observe(this);
        }
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs [app-client] (ecmascript)
;
/**
 * A list of values that can be hardware-accelerated.
 */ const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform",
    "backgroundColor"
]);
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)
;
;
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
;
__turbopack_context__.s([
    "microtask",
    0,
    microtask
], 60140);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)
;
;
;
let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */ const time = {
    now: ()=>{
        if (now === undefined) {
            time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
        }
        return now;
    },
    set: (newTime)=>{
        now = newTime;
        queueMicrotask(clearTime);
    }
};
;
__turbopack_context__.s([
    "time",
    0,
    time
], 96173);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__2 = __TURBOPACK__imported__module__47167__;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)
;
/*
  Convert velocity into velocity per second
*/ /*#__NO_SIDE_EFFECTS__*/ const velocityPerSecond = (velocity, frameDuration)=>frameDuration ? velocity * (1000 / frameDuration) : 0;
;
;
;
;
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */ const MAX_VELOCITY_DELTA = 30;
const isFloat = (value)=>{
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */ class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */ constructor(init, options = {}){
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */ this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        this.updateAndNotify = (v)=>{
            const currentTime = time.now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */ if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev) {
                this.events.change?.notify(this.current);
                if (this.dependents) {
                    for (const dependent of this.dependents){
                        dependent.dirty();
                    }
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = time.now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */ onChange(subscription) {
        if ("TURBOPACK compile-time truthy", 1) {
            warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new SubscriptionManager();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return ()=>{
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */ frame.read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for(const eventManagers in this.events){
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */ attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */ set(v) {
        if (!this.passiveEffect) {
            this.updateAndNotify(v);
        } else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */ jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect) this.stopPassiveEffect();
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
        if (!this.dependents) {
            this.dependents = new Set();
        }
        this.dependents.add(dependent);
    }
    removeDependent(dependent) {
        if (this.dependents) {
            this.dependents.delete(dependent);
        }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */ get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */ getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */ getVelocity() {
        const currentTime = time.now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */ start(startAnimation) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */ stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */ isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */ destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}
;
__turbopack_context__.s([
    "motionValue",
    0,
    motionValue
], 86427);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-client] (ecmascript)
;
;
;
;
;
/**
 * A list of all ValueTypes
 */ const valueTypes = [
    ...dimensionValueTypes,
    color,
    complex
];
/**
 * Tests a value against the list of ValueTypes
 */ const findValueType = (v)=>valueTypes.find(testValueType(v));
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)
;
const visualElementStore = new WeakMap();
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)
;
function isAnimationControls(v) {
    return v !== null && typeof v === "object" && typeof v.start === "function";
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)
;
/**
 * Decides if the supplied variable is variant label
 */ function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/variant-props.mjs [app-client] (ecmascript)
;
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
];
const variantProps = [
    "initial",
    ...variantPriorityOrder
];
;
;
;
;
function isControllingVariants(props) {
    return isAnimationControls(props.animate) || variantProps.some((name)=>isVariantLabel(props[name]));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/motion-values.mjs [app-client] (ecmascript)
;
;
;
/**
 * Updates motion values from props changes.
 * Uses `any` type for element to avoid circular dependencies with VisualElement.
 */ function updateMotionValuesFromProps(element, next, prev) {
    for(const key in next){
        const nextValue = next[key];
        const prevValue = prev[key];
        if (isMotionValue(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */ element.addValue(key, nextValue);
        } else if (isMotionValue(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */ element.addValue(key, motionValue(nextValue, {
                owner: element
            }));
        } else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */ if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                } else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            } else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, motionValue(latestValue !== undefined ? latestValue : nextValue, {
                    owner: element
                }));
            }
        }
    }
    // Handle removed values
    for(const key in prev){
        if (next[key] === undefined) element.removeValue(key);
    }
    return next;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)
;
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = {
    current: null
};
const hasReducedMotionListener = {
    current: false
};
;
;
const isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
    hasReducedMotionListener.current = true;
    if (!isBrowser) return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = ()=>prefersReducedMotion.current = motionMediaQuery.matches;
        motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
        setReducedMotionPreferences();
    } else {
        prefersReducedMotion.current = false;
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)
;
function getValueState(visualElement) {
    const state = [
        {},
        {}
    ];
    visualElement?.values.forEach((value, key)=>{
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */ if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
];
/**
 * Static feature definitions - can be injected by framework layer
 */ let featureDefinitions = {};
/**
 * Set feature definitions for all VisualElements.
 * This should be called by the framework layer (e.g., framer-motion) during initialization.
 */ function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
}
/**
 * Get the current feature definitions
 */ function getFeatureDefinitions() {
    return featureDefinitions;
}
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */ class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */ scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}){
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */ this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */ this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */ this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */ this.shouldReduceMotion = null;
        /**
         * Decides whether animations should be skipped for this VisualElement.
         * Useful for E2E tests and visual regression testing.
         */ this.shouldSkipAnimations = false;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */ this.values = new Map();
        this.KeyframeResolver = KeyframeResolver;
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */ this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */ this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */ this.prevMotionValues = {};
        /**
         * Track whether this element has been mounted before, to detect
         * remounts after Suspense unmount/remount cycles.
         */ this.hasBeenMounted = false;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */ this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues);
        this.render = ()=>{
            if (!this.current) return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = ()=>{
            const now = time.now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                frame.render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.skipAnimationsConfig = skipAnimations;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = isControllingVariants(props);
        this.isVariantNode = isVariantNode(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */ const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(const key in initialMotionValues){
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && isMotionValue(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        /**
         * If this element has been mounted before (e.g. after a Suspense
         * unmount/remount), reset motion values to their initial state
         * so animations replay correctly from initial → animate.
         */ if (this.hasBeenMounted) {
            for(const key in this.initialValues){
                this.values.get(key)?.jump(this.initialValues[key]);
                this.latestValues[key] = this.initialValues[key];
            }
        }
        this.current = instance;
        visualElementStore.set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key)=>this.bindToMotionValue(key, value));
        /**
         * Determine reduced motion preference. Only initialize the matchMedia
         * listener if we actually need the dynamic value (i.e., when config
         * is neither "never" nor "always").
         */ if (this.reducedMotionConfig === "never") {
            this.shouldReduceMotion = false;
        } else if (this.reducedMotionConfig === "always") {
            this.shouldReduceMotion = true;
        } else {
            if (!hasReducedMotionListener.current) {
                initPrefersReducedMotion();
            }
            this.shouldReduceMotion = prefersReducedMotion.current;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
        }
        /**
         * Set whether animations should be skipped based on the config.
         */ this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
        this.hasBeenMounted = true;
    }
    unmount() {
        this.projection && this.projection.unmount();
        cancelFrame(this.notifyUpdate);
        cancelFrame(this.render);
        this.valueSubscriptions.forEach((remove)=>remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for(const key in this.events){
            this.events[key].clear();
        }
        for(const key in this.features){
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
            const { factory, keyframes, times, ease, duration } = value.accelerate;
            const animation = new NativeAnimation({
                element: this.current,
                name: key,
                keyframes,
                times,
                ease,
                duration: secondsToMilliseconds(duration)
            });
            const cleanup = factory(animation);
            this.valueSubscriptions.set(key, ()=>{
                cleanup();
                animation.cancel();
            });
            return;
        }
        const valueIsTransform = transformProps.has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue)=>{
            this.latestValues[key] = latestValue;
            this.props.onUpdate && frame.preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, ()=>{
            removeOnChange();
            if (removeSyncCheck) removeSyncCheck();
        // Defer to MotionValue.on("change") auto-stop so React 19 remounts
        // can resubscribe before the animation is cancelled (#3315).
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */ if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for(key in featureDefinitions){
            const featureDefinition = featureDefinitions[key];
            if (!featureDefinition) continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */ if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */ if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                } else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */ measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */ update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */ for(let i = 0; i < propEventHandlers.length; i++){
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = "on" + key;
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */ getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */ getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */ addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
            return ()=>closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */ addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue) this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */ removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */ hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = motionValue(defaultValue === null ? undefined : defaultValue, {
                owner: this
            });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */ readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            } else if (!findValueType(value) && complex.test(target)) {
                value = getAnimatableNone1(key, target);
            }
            this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
        }
        return isMotionValue(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */ setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */ getBaseTarget(key) {
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */ if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */ const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !isMotionValue(target)) return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */ return this.initialValues[key] !== undefined && valueFromInitial === undefined ? undefined : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new SubscriptionManager();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        microtask.render(this.render);
    }
}
;
;
;
;
class DOMVisualElement extends VisualElement {
    constructor(){
        super(...arguments);
        this.KeyframeResolver = DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */ return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        const style = props.style;
        return style ? style[key] : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if (isMotionValue(children)) {
            this.childSubscription = children.on("change", (latest)=>{
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)
;
function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match)=>`-${match.toLowerCase()}`);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)
;
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */ const getValueAsType = (value, type)=>{
    return type && typeof value === "number" ? type.transform(value) : value;
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs [app-client] (ecmascript)
;
;
;
;
const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */ function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */ for(let i = 0; i < numTransforms; i++){
        const key = transformPropOrder[i];
        const value = latestValues[key];
        if (value === undefined) continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        } else {
            const parsed = parseFloat(value);
            valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = getValueAsType(value, numberValueTypes[key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    // `pathRotation` composes onto `rotate` as a separate additive term so
    // the user's `rotate` is never clobbered. Deliberately not a slot in
    // `transformPropOrder`.
    const pathRotation = latestValues.pathRotation;
    if (pathRotation) {
        transformIsDefault = false;
        transformString += `rotate(${getValueAsType(pathRotation, numberValueTypes.pathRotation)}) `;
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
;
;
;
;
;
;
function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */ for(const key in latestValues){
        const value = latestValues[key];
        if (transformProps.has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        } else if (isCSSVariableName(key)) {
            vars[key] = value;
            continue;
        } else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = getValueAsType(value, numberValueTypes[key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] = valueAsType;
            } else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = buildTransform(latestValues, state.transform, transformTemplate);
        } else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */ style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */ if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/path.mjs [app-client] (ecmascript)
;
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 *
 * Note: We use unitless values for stroke-dasharray and stroke-dashoffset
 * because Safari incorrectly scales px values when the page is zoomed.
 */ function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset (unitless to avoid Safari zoom bug)
    attrs[keys.offset] = `${-offset}`;
    // Build the dash array (unitless to avoid Safari zoom bug)
    attrs[keys.array] = `${length} ${spacing}`;
}
;
;
;
/**
 * CSS Motion Path properties that should remain as CSS styles on SVG elements.
 */ const cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor"
];
/**
 * Build SVG visual attributes, like cx and style.transform
 */ function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, // This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    buildHTMLStyles(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */ if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    /**
     * However, we apply transforms as CSS transforms.
     * So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
     */ if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */ style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties){
        if (attrs[key] !== undefined) {
            style[key] = attrs[key];
            delete attrs[key];
        }
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined) attrs.x = attrX;
    if (attrY !== undefined) attrs.y = attrY;
    if (attrScale !== undefined) attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs [app-client] (ecmascript)
;
/**
 * A set of attribute names that are always read/written as camel case.
 */ const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
]);
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)
;
const isSVGTag = (tag)=>typeof tag === "string" && tag.toLowerCase() === "svg";
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/render.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/utils/render.mjs [app-client] (ecmascript)
;
function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for(key in style){
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key] = style[key];
    }
    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for(key in vars){
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key]);
    }
}
;
;
;
;
function renderSVG(element, renderState, _styleProp, projection) {
    renderHTML(element, renderState, undefined, projection);
    for(const key in renderState.attrs){
        element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/border-radius.mjs [app-client] (ecmascript)
;
/**
 * The four corner-radius longhands. Shared so the projection mixer, scale
 * corrector, WAAPI px-value set and view-transition crop pass don't each carry
 * their own copy. Order is irrelevant - every consumer mixes/corrects/animates
 * each corner independently.
 */ const cornerRadiusProps = [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderBottomLeftRadius"
];
;
__turbopack_context__.s([
    "cornerRadiusProps",
    0,
    cornerRadiusProps
], 95051);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)
;
;
function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min) return 0;
    return pixels / (axis.max - axis.min) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */ const correctBorderRadius = {
    correct: (latest, node)=>{
        if (!node.target) return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */ if (typeof latest === "string") {
            if (px.test(latest)) {
                latest = parseFloat(latest);
            } else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */ const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    }
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)
;
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/ const mixNumber = (from, to, progress)=>{
    return from + (to - from) * progress;
};
;
__turbopack_context__.s([
    "mixNumber",
    0,
    mixNumber
], 706);
;
;
const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta })=>{
        const original = latest;
        const shadow = complex.parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5) return original;
        const template = complex.createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */ const averageScale = mixNumber(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
        return template(shadow);
    }
};
;
;
;
;
;
const scaleCorrectors = {
    borderRadius: {
        ...correctBorderRadius,
        applyTo: [
            ...cornerRadiusProps
        ]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
};
function addScaleCorrector(correctors) {
    for(const key in correctors){
        scaleCorrectors[key] = correctors[key];
        if (isCSSVariableName(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}
;
__turbopack_context__.s([
    "scaleCorrectors",
    0,
    scaleCorrectors
], 24463);
;
;
;
function isForcedMotionValue(key, { layout, layoutId }) {
    return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== undefined) && (!!scaleCorrectors[key] || key === "opacity");
}
;
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style) return newValues;
    for(const key in style){
        if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}
;
;
;
;
function scrapeMotionValuesFromProps1(props, prevProps, visualElement) {
    const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
    for(const key in props){
        if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
            const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}
;
;
;
;
;
;
;
;
;
;
;
class SVGVisualElement extends DOMVisualElement {
    constructor(){
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = createBox;
    }
    getBaseTargetFromProps(props, key) {
        return props[key];
    }
    readValueFromInstance(instance, key) {
        if (transformProps.has(key)) {
            const defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return scrapeMotionValuesFromProps1(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
        buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        renderSVG(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = isSVGTag(instance.tagName);
        super.mount(instance);
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/utils/measure.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs [app-client] (ecmascript)
;
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */ function convertBoundingBoxToBox({ top, left, right, bottom }) {
    return {
        x: {
            min: left,
            max: right
        },
        y: {
            min: top,
            max: bottom
        }
    };
}
function convertBoxToBoundingBox({ x, y }) {
    return {
        top: y.min,
        right: x.max,
        bottom: y.max,
        left: x.min
    };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */ function transformBoxPoints(point, transformPoint) {
    if (!transformPoint) return point;
    const topLeft = transformPoint({
        x: point.left,
        y: point.top
    });
    const bottomRight = transformPoint({
        x: point.right,
        y: point.bottom
    });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x
    };
}
;
__turbopack_context__.s([
    "convertBoundingBoxToBox",
    0,
    convertBoundingBoxToBox,
    "convertBoxToBoundingBox",
    0,
    convertBoxToBoundingBox,
    "transformBoxPoints",
    0,
    transformBoxPoints
], 27677);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs [app-client] (ecmascript)
;
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
    return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
    return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
    return value && value !== "0%";
}
;
__turbopack_context__.s([
    "has2DTranslate",
    0,
    has2DTranslate,
    "hasScale",
    0,
    hasScale,
    "hasTransform",
    0,
    hasTransform
], 77777);
;
;
/**
 * Scales a point based on a factor and an originPoint
 */ function scalePoint(point, scale, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */ function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */ function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */ function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */ function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength) return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for(let i = 0; i < treeLength; i++){
        node = treePath[i];
        delta = node.projectionDelta;
        /**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */ const { visualElement } = node.options;
        if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
            continue;
        }
        if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
            translateAxis(box.x, -node.scroll.offset.x);
            translateAxis(box.y, -node.scroll.offset.y);
        }
        if (delta) {
            // Incoporate each ancestor's scale into a cumulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && hasTransform(node.latestValues)) {
            transformBox(box, node.latestValues, node.layout?.layoutBox);
        }
    }
    /**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */ if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
        treeScale.x = 1.0;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
        treeScale.y = 1.0;
    }
}
function translateAxis(axis, distance) {
    axis.min += distance;
    axis.max += distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */ function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function resolveAxisTranslate(value, axis) {
    if (typeof value === "string") {
        return parseFloat(value) / 100 * (axis.max - axis.min);
    }
    return value;
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */ function transformBox(box, transform, sourceBox) {
    const resolveBox = sourceBox ?? box;
    transformAxis(box.x, resolveAxisTranslate(transform.x, resolveBox.x), transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, resolveAxisTranslate(transform.y, resolveBox.y), transform.scaleY, transform.scale, transform.originY);
}
;
__turbopack_context__.s([
    "applyBoxDelta",
    0,
    applyBoxDelta,
    "applyTreeDeltas",
    0,
    applyTreeDeltas,
    "scalePoint",
    0,
    scalePoint,
    "transformBox",
    0,
    transformBox,
    "translateAxis",
    0,
    translateAxis
], 35636);
;
;
function measureViewportBox(instance, transformPoint) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode;
    if (scroll) {
        translateAxis(viewportBox.x, scroll.offset.x);
        translateAxis(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
}
;
__turbopack_context__.s([
    "measurePageBox",
    0,
    measurePageBox,
    "measureViewportBox",
    0,
    measureViewportBox
], 53689);
;
;
;
;
;
;
;
;
;
function getComputedStyle1(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
    constructor(){
        super(...arguments);
        this.type = "html";
        this.renderInstance = renderHTML;
    }
    mount(instance) {
        /**
         * If a custom component forwards its ref to something other than a
         * HTML/SVG element (a class instance, an imperative handle) there's
         * nothing for Motion to style, measure or attach gestures to. #2777
         */ invariant(Boolean(instance.style), "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref");
        super.mount(instance);
    }
    readValueFromInstance(instance, key) {
        if (transformProps.has(key)) {
            return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
        } else {
            const computedStyle = getComputedStyle1(instance);
            const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return measureViewportBox(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        buildHTMLStyles(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return scrapeMotionValuesFromProps(props, prevProps, visualElement);
    }
}
;
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs [app-client] (ecmascript)
;
/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */ const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
];
;
;
function isSVGComponent(Component) {
    if (/**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */ typeof Component !== "string" || /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */ Component.includes("-")) {
        return false;
    } else if (/**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */ lowercaseSVGElements.indexOf(Component) > -1 || /**
         * If it contains a capital letter, it's an SVG component
         */ /[A-Z]/u.test(Component)) {
        return true;
    }
    return false;
}
;
;
;
;
const createDomVisualElement = (Component, options)=>{
    /**
     * Use explicit isSVG override if provided, otherwise auto-detect
     */ const isSVG = options.isSVG ?? isSVGComponent(Component);
    return isSVG ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
        allowProjection: Component !== __TURBOPACK__imported__module__71645__["Fragment"]
    });
};
;
__turbopack_context__.s([
    "createDomVisualElement",
    0,
    createDomVisualElement
], 54505);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__3 = __TURBOPACK__imported__module__47167__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__4 = __TURBOPACK__imported__module__47167__;
var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
var __TURBOPACK__imported__module__71645__1 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__2 = __TURBOPACK__imported__module__71645__;
"use client";
;
const LayoutGroupContext = (0, __TURBOPACK__imported__module__71645__2["createContext"])({});
;
__turbopack_context__.s([
    "LayoutGroupContext",
    0,
    LayoutGroupContext
], 31178);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__3 = __TURBOPACK__imported__module__71645__;
"use client";
;
const LazyContext = (0, __TURBOPACK__imported__module__71645__3["createContext"])({
    strict: false
});
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__4 = __TURBOPACK__imported__module__71645__;
"use client";
;
/**
 * @public
 */ const MotionConfigContext = (0, __TURBOPACK__imported__module__71645__4["createContext"])({
    transformPagePoint: (p)=>p,
    isStatic: false,
    reducedMotion: "never"
});
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__5 = __TURBOPACK__imported__module__71645__;
"use client";
;
const MotionContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__71645__5["createContext"])({});
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__6 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-client] (ecmascript)
;
;
function getCurrentTreeVariants(props, context) {
    if (isControllingVariants(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || isVariantLabel(initial) ? initial : undefined,
            animate: isVariantLabel(animate) ? animate : undefined
        };
    }
    return props.inherit !== false ? context : {};
}
;
"use client";
;
;
;
function useCreateMotionContext(props) {
    const { initial, animate } = getCurrentTreeVariants(props, (0, __TURBOPACK__imported__module__71645__6["useContext"])(MotionContext));
    return (0, __TURBOPACK__imported__module__71645__6["useMemo"])(()=>({
            initial,
            animate
        }), [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__7 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__8 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)
;
const createHtmlRenderState = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
;
"use client";
;
;
;
function copyRawValuesOnly(target, source, props) {
    for(const key in source){
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0, __TURBOPACK__imported__module__71645__8["useMemo"])(()=>{
        const state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, transformTemplate);
        return Object.assign({}, state.vars, state.style);
    }, [
        visualState
    ]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */ copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        // Disable scrolling on the draggable direction
        style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined && (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__9 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)
;
;
const createSvgRenderState = ()=>({
        ...createHtmlRenderState(),
        attrs: {}
    });
;
"use client";
;
;
;
;
function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0, __TURBOPACK__imported__module__71645__9["useMemo"])(()=>{
        const state = createSvgRenderState();
        buildSVGAttrs(state, visualState, isSVGTag(Component), props.transformTemplate, props.style);
        return {
            ...state.attrs,
            style: {
                ...state.style
            }
        };
    }, [
        visualState
    ]);
    if (props.style) {
        const rawStyles = {};
        copyRawValuesOnly(rawStyles, props.style, props);
        visualProps.style = {
            ...rawStyles,
            ...visualProps.style
        };
    }
    return visualProps;
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)
;
/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */ const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "propagate",
    "ignoreStrict",
    "viewport"
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */ function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
;
;
;
let shouldForward = (key)=>!isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
    if (typeof isValidProp !== "function") return;
    // Explicitly filter our events
    shouldForward = (key)=>key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */ try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     *
     * String concatenation prevents bundlers like webpack (e.g. Storybook)
     * from statically resolving this optional dependency at build time.
     */ const emotionPkg = "@emotion/is-prop-" + "valid";
    loadExternalIsValidProp((()=>{
        const e = new Error("Cannot find module '@emotion/is-prop-valid'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })().default);
} catch  {
// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for(const key in props){
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */ if (key === "values" && typeof props.values === "object") continue;
        if (isMotionValue(props[key])) continue;
        if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}
;
"use client";
;
;
;
;
;
;
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG) {
    const useVisualProps = isSVG ?? isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    const elementProps = Component !== __TURBOPACK__imported__module__71645__7["Fragment"] ? {
        ...filteredProps,
        ...visualProps,
        ref
    } : {};
    /**
     * If component has been handed a motion value as its child,
     * memoise its initial value and render that. Subsequent updates
     * will be handled by the onChange handler
     */ const { children } = props;
    const renderedChildren = (0, __TURBOPACK__imported__module__71645__7["useMemo"])(()=>isMotionValue(children) ? children.get() : children, [
        children
    ]);
    return (0, __TURBOPACK__imported__module__71645__7["createElement"])(Component, {
        ...elementProps,
        children: renderedChildren
    });
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeHTMLMotionValuesFromProps>
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)
;
;
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 */ function resolveMotionValue(value) {
    return isMotionValue(value) ? value.get() : value;
}
;
__turbopack_context__.s([
    "resolveMotionValue",
    0,
    resolveMotionValue
], 33871);
var __TURBOPACK__imported__module__71645__10 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__11 = __TURBOPACK__imported__module__71645__;
"use client";
;
/**
 * @public
 */ const PresenceContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__71645__11["createContext"])(null);
;
__turbopack_context__.s([
    "PresenceContext",
    0,
    PresenceContext
], 21476);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__12 = __TURBOPACK__imported__module__71645__;
"use client";
;
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */ function useConstant(init) {
    const ref = (0, __TURBOPACK__imported__module__71645__12["useRef"])(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
;
__turbopack_context__.s([
    "useConstant",
    0,
    useConstant
], 47414);
"use client";
;
;
;
;
;
function makeState({ scrapeMotionValuesFromProps, createRenderState }, props, context, presenceContext) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
    return state;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for(const key in motionValues){
        values[key] = resolveMotionValue(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = isControllingVariants(props);
    const isVariantNode$1 = isVariantNode(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === undefined) initial = context.initial;
        if (animate === undefined) animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
        const list = Array.isArray(variantToSet) ? variantToSet : [
            variantToSet
        ];
        for(let i = 0; i < list.length; i++){
            const resolved = resolveVariantFromProps(props, list[i]);
            if (resolved) {
                const { transitionEnd, transition, ...target } = resolved;
                for(const key in target){
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */ const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for(const key in transitionEnd){
                    values[key] = transitionEnd[key];
                }
            }
        }
    }
    return values;
}
const makeUseVisualState = (config)=>(props, isStatic)=>{
        const context = (0, __TURBOPACK__imported__module__71645__10["useContext"])(MotionContext);
        const presenceContext = (0, __TURBOPACK__imported__module__71645__10["useContext"])(PresenceContext);
        const make = ()=>makeState(config, props, context, presenceContext);
        return isStatic ? make() : useConstant(make);
    };
;
"use client";
;
;
;
const useHTMLVisualState = /*@__PURE__*/ makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
});
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeSVGMotionValuesFromProps>
;
"use client";
;
;
;
const useSVGVisualState = /*@__PURE__*/ makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps1,
    createRenderState: createSvgRenderState
});
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)
;
;
const featureProps = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag"
    ],
    exit: [
        "exit"
    ],
    drag: [
        "drag",
        "dragControls"
    ],
    focus: [
        "whileFocus"
    ],
    hover: [
        "whileHover",
        "onHoverStart",
        "onHoverEnd"
    ],
    tap: [
        "whileTap",
        "onTap",
        "onTapStart",
        "onTapCancel"
    ],
    pan: [
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
    ],
    inView: [
        "whileInView",
        "onViewportEnter",
        "onViewportLeave"
    ],
    layout: [
        "layout",
        "layoutId"
    ]
};
let isInitialized = false;
/**
 * Initialize feature definitions with isEnabled checks.
 * This must be called before any motion components are rendered.
 */ function initFeatureDefinitions() {
    if (isInitialized) return;
    const initialFeatureDefinitions = {};
    for(const key in featureProps){
        initialFeatureDefinitions[key] = {
            isEnabled: (props)=>featureProps[key].some((name)=>!!props[name])
        };
    }
    setFeatureDefinitions(initialFeatureDefinitions);
    isInitialized = true;
}
/**
 * Get the current feature definitions, initializing if needed.
 */ function getInitializedFeatureDefinitions() {
    initFeatureDefinitions();
    return getFeatureDefinitions();
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)
;
;
;
function loadFeatures(features) {
    const featureDefinitions = getInitializedFeatureDefinitions();
    for(const key in features){
        featureDefinitions[key] = {
            ...featureDefinitions[key],
            ...features[key]
        };
    }
    setFeatureDefinitions(featureDefinitions);
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)
;
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__13 = __TURBOPACK__imported__module__71645__;
"use client";
;
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */ function useMotionRef(visualState, visualElement, externalRef) {
    /**
     * Store externalRef in a ref to avoid including it in the useCallback
     * dependency array. Including externalRef in dependencies causes issues
     * with libraries like Radix UI that create new callback refs on each render
     * when using asChild - this would cause the callback to be recreated,
     * triggering element remounts and breaking AnimatePresence exit animations.
     */ const externalRefContainer = (0, __TURBOPACK__imported__module__71645__13["useRef"])(externalRef);
    (0, __TURBOPACK__imported__module__71645__13["useInsertionEffect"])(()=>{
        externalRefContainer.current = externalRef;
    });
    // Store cleanup function returned by callback refs (React 19 feature)
    const refCleanup = (0, __TURBOPACK__imported__module__71645__13["useRef"])(null);
    return (0, __TURBOPACK__imported__module__71645__13["useCallback"])((instance)=>{
        if (instance) {
            visualState.onMount?.(instance);
        }
        if (visualElement) {
            instance ? visualElement.mount(instance) : visualElement.unmount();
        }
        const ref = externalRefContainer.current;
        if (typeof ref === "function") {
            if (instance) {
                const cleanup = ref(instance);
                if (typeof cleanup === "function") {
                    refCleanup.current = cleanup;
                }
            } else if (refCleanup.current) {
                refCleanup.current();
                refCleanup.current = null;
            } else {
                ref(instance);
            }
        } else if (ref) {
            ref.current = instance;
        }
    }, [
        visualElement
    ]);
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)
;
;
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
;
var __TURBOPACK__imported__module__71645__14 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__15 = __TURBOPACK__imported__module__71645__;
"use client";
;
/**
 * Internal, exported only for usage in Framer
 */ const SwitchLayoutGroupContext = (0, __TURBOPACK__imported__module__71645__15["createContext"])({});
;
__turbopack_context__.s([
    "SwitchLayoutGroupContext",
    0,
    SwitchLayoutGroupContext
], 4035);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)
;
function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
;
__turbopack_context__.s([
    "isRefObject",
    0,
    isRefObject
], 25522);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__16 = __TURBOPACK__imported__module__71645__;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)
;
const isBrowser1 = typeof window !== "undefined";
;
"use client";
;
;
const useIsomorphicLayoutEffect = isBrowser1 ? __TURBOPACK__imported__module__71645__16["useLayoutEffect"] : __TURBOPACK__imported__module__71645__16["useEffect"];
;
__turbopack_context__.s([
    "useIsomorphicLayoutEffect",
    0,
    useIsomorphicLayoutEffect
], 74008);
"use client";
;
;
;
;
;
;
;
;
;
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor, isSVG) {
    const { visualElement: parent } = (0, __TURBOPACK__imported__module__71645__14["useContext"])(MotionContext);
    const lazyContext = (0, __TURBOPACK__imported__module__71645__14["useContext"])(LazyContext);
    const presenceContext = (0, __TURBOPACK__imported__module__71645__14["useContext"])(PresenceContext);
    const motionConfig = (0, __TURBOPACK__imported__module__71645__14["useContext"])(MotionConfigContext);
    const reducedMotionConfig = motionConfig.reducedMotion;
    const skipAnimations = motionConfig.skipAnimations;
    const visualElementRef = (0, __TURBOPACK__imported__module__71645__14["useRef"])(null);
    /**
     * Track whether the component has been through React's commit phase.
     * Used to detect when LazyMotion features load after the component has mounted.
     */ const hasMountedOnce = (0, __TURBOPACK__imported__module__71645__14["useRef"])(false);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */ createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
            reducedMotionConfig,
            skipAnimations,
            isSVG
        });
        /**
         * If the component has already mounted before features loaded (e.g. via
         * LazyMotion with async feature loading), we need to force the initial
         * animation to run. Otherwise state changes that occurred before features
         * loaded will be lost and the element will snap to its final state.
         */ if (hasMountedOnce.current && visualElementRef.current) {
            visualElementRef.current.manuallyAnimateOnMount = true;
        }
    }
    const visualElement = visualElementRef.current;
    /**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */ const initialLayoutGroupConfig = (0, __TURBOPACK__imported__module__71645__14["useContext"])(SwitchLayoutGroupContext);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
        createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = (0, __TURBOPACK__imported__module__71645__14["useRef"])(false);
    (0, __TURBOPACK__imported__module__71645__14["useInsertionEffect"])(()=>{
        /**
         * Check the component has already mounted before calling
         * `update` unnecessarily. This ensures we skip the initial update.
         */ if (visualElement && isMounted.current) {
            visualElement.update(props, presenceContext);
        }
    });
    /**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */ const optimisedAppearId = props[optimizedAppearDataAttribute];
    const wantsHandoff = (0, __TURBOPACK__imported__module__71645__14["useRef"])(Boolean(optimisedAppearId) && typeof window !== "undefined" && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
    useIsomorphicLayoutEffect(()=>{
        /**
         * Track that this component has mounted. This is used to detect when
         * LazyMotion features load after the component has already committed.
         */ hasMountedOnce.current = true;
        if (!visualElement) return;
        isMounted.current = true;
        window.MotionIsMounted = true;
        visualElement.updateFeatures();
        visualElement.scheduleRenderMicrotask();
        /**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */ if (wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
    });
    (0, __TURBOPACK__imported__module__71645__14["useEffect"])(()=>{
        if (!visualElement) return;
        if (!wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
        if (wantsHandoff.current) {
            // This ensures all future calls to animateChanges() in this component will run in useEffect
            queueMicrotask(()=>{
                window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
            });
            wantsHandoff.current = false;
        }
        /**
         * Now we've finished triggering animations for this element we
         * can wipe the enteringChildren set for the next render.
         */ visualElement.enteringChildren = undefined;
    });
    return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutAnchor, layoutCrossfade } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? undefined : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag) || dragConstraints && isRefObject(dragConstraints),
        visualElement,
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */ animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        crossfade: layoutCrossfade,
        layoutScroll,
        layoutRoot,
        layoutAnchor
    });
}
function getClosestProjectingNode(visualElement) {
    if (!visualElement) return undefined;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
;
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */ function createMotionComponent(Component, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
    preloadedFeatures && loadFeatures(preloadedFeatures);
    /**
     * Determine whether to use SVG or HTML rendering based on:
     * 1. Explicit `type` option (highest priority)
     * 2. Auto-detection via `isSVGComponent`
     */ const isSVG = type ? type === "svg" : isSVGComponent(Component);
    const useVisualState = isSVG ? useSVGVisualState : useHTMLVisualState;
    function MotionDOMComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */ let MeasureLayout;
        const configAndProps = {
            ...(0, __TURBOPACK__imported__module__71645__1["useContext"])(MotionConfigContext),
            ...props,
            layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        const context = useCreateMotionContext(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && typeof window !== "undefined") {
            useStrictMode(configAndProps, preloadedFeatures);
            const layoutProjection = getProjectionFunctionality(configAndProps);
            MeasureLayout = layoutProjection.MeasureLayout;
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */ context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */ return (0, __TURBOPACK__imported__module__43476__["jsxs"])(MotionContext.Provider, {
            value: context,
            children: [
                MeasureLayout && context.visualElement ? (0, __TURBOPACK__imported__module__43476__["jsx"])(MeasureLayout, {
                    visualElement: context.visualElement,
                    ...configAndProps
                }) : null,
                useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG)
            ]
        });
    }
    MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
    const ForwardRefMotionComponent = (0, __TURBOPACK__imported__module__71645__1["forwardRef"])(MotionDOMComponent);
    ForwardRefMotionComponent[motionComponentSymbol] = Component;
    return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0, __TURBOPACK__imported__module__71645__1["useContext"])(LayoutGroupContext).id;
    return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = (0, __TURBOPACK__imported__module__71645__1["useContext"])(LazyContext).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */ if (("TURBOPACK compile-time value", "development") !== "production" && preloadedFeatures && isStrict) {
        const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
        configAndProps.ignoreStrict ? warning(false, strictMessage, "lazy-strict-mode") : invariant(false, strictMessage, "lazy-strict-mode");
    }
}
function getProjectionFunctionality(props) {
    const featureDefinitions = getInitializedFeatureDefinitions();
    const { drag, layout } = featureDefinitions;
    if (!drag && !layout) return {};
    const combined = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : undefined,
        ProjectionNode: combined.ProjectionNode
    };
}
;
;
;
function createMotionProxy(preloadedFeatures, createVisualElement) {
    if (typeof Proxy === "undefined") {
        return createMotionComponent;
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */ const componentCache = new Map();
    const factory = (Component, options)=>{
        return createMotionComponent(Component, options, preloadedFeatures, createVisualElement);
    };
    /**
     * Support for deprecated`motion(Component)` pattern
     */ const deprecatedFactoryFunction = (Component, options)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
        }
        return factory(Component, options);
    };
    return new Proxy(deprecatedFactoryFunction, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */ get: (_target, key)=>{
            if (key === "create") return factory;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */ if (!componentCache.has(key)) {
                componentCache.set(key, createMotionComponent(key, undefined, preloadedFeatures, createVisualElement));
            }
            return componentCache.get(key);
        }
    });
}
;
__turbopack_context__.s([
    "createMotionProxy",
    0,
    createMotionProxy
], 7051);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/animations.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/animation/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/Feature.mjs [app-client] (ecmascript)
;
/**
 * Feature base class for extending VisualElement functionality.
 * Features are plugins that can be mounted/unmounted to add behavior
 * like gestures, animations, or layout tracking.
 */ class Feature {
    constructor(node){
        this.isMounted = false;
        this.node = node;
    }
    update() {}
}
;
__turbopack_context__.s([
    "Feature",
    0,
    Feature
], 42098);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/animation-state.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/interfaces/visual-element.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs [app-client] (ecmascript)
;
;
function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs [app-client] (ecmascript)
;
/**
 * If `transition` has `inherit: true`, shallow-merge it with
 * `parentTransition` (child keys win) and strip the `inherit` key.
 * Otherwise return `transition` unchanged.
 */ function resolveTransition(transition, parentTransition) {
    if (transition?.inherit && parentTransition) {
        const { inherit: _, ...rest } = transition;
        return {
            ...parentTransition,
            ...rest
        };
    }
    return transition;
}
;
;
function getValueTransition(transition, key) {
    const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
    if (valueTransition !== transition) {
        return resolveTransition(valueTransition, transition);
    }
    return valueTransition;
}
;
__turbopack_context__.s([
    "getValueTransition",
    0,
    getValueTransition
], 87333);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/setters.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs [app-client] (ecmascript)
;
const isKeyframesTarget = (v)=>{
    return Array.isArray(v);
};
;
;
;
;
/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */ function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    } else {
        visualElement.addValue(key, motionValue(value));
    }
}
function resolveFinalValueInKeyframes(v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
    const resolved = resolveVariant(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = {
        ...target,
        ...transitionEnd
    };
    for(const key in target){
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
;
__turbopack_context__.s([
    "setTarget",
    0,
    setTarget
], 47834);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/will-change/is.mjs [app-client] (ecmascript)
;
;
function isWillChangeMotionValue(value) {
    return Boolean(isMotionValue(value) && value.add);
}
;
;
;
function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */ if (isWillChangeMotionValue(willChange)) {
        return willChange.add(key);
    } else if (!willChange && MotionGlobalConfig.WillChange) {
        const newWillChange = new MotionGlobalConfig.WillChange("auto");
        visualElement.addValue("willChange", newWillChange);
        newWillChange.add(key);
    }
}
;
__turbopack_context__.s([
    "addValueToWillChange",
    0,
    addValueToWillChange
], 80538);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs [app-client] (ecmascript)
;
;
function getOptimisedAppearId(visualElement) {
    return visualElement.props[optimizedAppearDataAttribute];
}
;
__turbopack_context__.s([
    "getOptimisedAppearId",
    0,
    getOptimisedAppearId
], 16896);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47167__5 = __TURBOPACK__imported__module__47167__;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/pipe.mjs [app-client] (ecmascript)
;
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */ const pipe = (...transformers)=>transformers.reduce((a, b)=>(v)=>b(a(v)));
;
__turbopack_context__.s([
    "pipe",
    0,
    pipe
], 38638);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/index.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/complex.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/color.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs [app-client] (ecmascript)
;
// Adapted from https://gist.github.com/mjackson/5311256
function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    } else {
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/immediate.mjs [app-client] (ecmascript)
;
function mixImmediate(a, b) {
    return (p)=>p > 0 ? b : a;
}
;
;
;
;
;
;
;
;
// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v)=>{
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [
    hex,
    rgba,
    hsla
];
const getColorType = (v)=>colorTypes.find((type)=>type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    warning(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
    if (!Boolean(type)) return false;
    let model = type.parse(color);
    if (type === hsla) {
        // TODO Remove this cast - needed since Motion's stricter typing
        model = hslaToRgba(model);
    }
    return model;
}
const mixColor = (from, to)=>{
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return mixImmediate(from, to);
    }
    const blended = {
        ...fromRGBA
    };
    return (v)=>{
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
        return rgba.transform(blended);
    };
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/mix/visibility.mjs [app-client] (ecmascript)
;
const invisibleValues = new Set([
    "none",
    "hidden"
]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */ function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p)=>p <= 0 ? origin : target;
    } else {
        return (p)=>p >= 1 ? target : origin;
    }
}
;
;
;
;
;
;
;
;
;
function mixNumber1(a, b) {
    return (p)=>mixNumber(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber1;
    } else if (typeof a === "string") {
        return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
    } else if (Array.isArray(a)) {
        return mixArray;
    } else if (typeof a === "object") {
        return color.test(a) ? mixColor : mixObject;
    }
    return mixImmediate;
}
function mixArray(a, b) {
    const output = [
        ...a
    ];
    const numValues = output.length;
    const blendValue = a.map((v, i)=>getMixer(v)(v, b[i]));
    return (p)=>{
        for(let i = 0; i < numValues; i++){
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = {
        ...a,
        ...b
    };
    const blendValue = {};
    for(const key in output){
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v)=>{
        for(const key in blendValue){
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = {
        color: 0,
        var: 0,
        number: 0
    };
    for(let i = 0; i < target.values.length; i++){
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = origin.values[originIndex] ?? 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target)=>{
    const template = complex.createTransformer(target);
    const originStats = analyseComplexValue(origin);
    const targetStats = analyseComplexValue(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
            return mixVisibility(origin, target);
        }
        return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
        return mixImmediate(origin, target);
    }
};
;
;
;
function mix(from, to, p) {
    if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
        return mixNumber(from, to, p);
    }
    const mixer = getMixer(from);
    return mixer(from, to);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/drivers/frame.mjs [app-client] (ecmascript)
;
;
;
const frameloopDriver = (update)=>{
    const passTimestamp = ({ timestamp })=>update(timestamp);
    return {
        start: (keepAlive = true)=>frame.update(passTimestamp, keepAlive),
        stop: ()=>cancelFrame(passTimestamp),
        /**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */ now: ()=>frameData.isProcessing ? frameData.timestamp : time.now()
    };
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/inertia.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/spring.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)
;
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */ const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while(!state.done && duration < maxGeneratorDuration){
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)
;
;
;
/**
 * Create a progress => progress easing function from a generator.
 */ function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({
        ...options,
        keyframes: [
            0,
            scale
        ]
    });
    const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
    return {
        type: "keyframes",
        ease: (progress)=>{
            return generator.next(duration * progress).value / scale;
        },
        duration: millisecondsToSeconds(duration)
    };
}
;
;
;
;
;
const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    velocity: 0.0,
    // Default duration/bounce-based options
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    // Rest thresholds
    restSpeed: {
        granular: 0.01,
        default: 2
    },
    restDelta: {
        granular: 0.005,
        default: 0.5
    },
    // Limits
    minDuration: 0.01,
    maxDuration: 10.0,
    minDamping: 0.05,
    maxDamping: 1
};
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for(let i = 1; i < rootIterations; i++){
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
/**
 * This is ported from the Framer implementation of duration-based spring resolution.
 */ const safeMin = 0.001;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
    let envelope;
    let derivative;
    warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let dampingRatio = 1 - bounce;
    /**
     * Restrict dampingRatio and duration to within acceptable ranges.
     */ dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
    duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
    if (dampingRatio < 1) {
        /**
         * Underdamped spring
         */ envelope = (undampedFreq)=>{
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - a / b * c;
        };
        derivative = (undampedFreq)=>{
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return factor * ((d - e) * f) / g;
        };
    } else {
        /**
         * Critically-damped spring
         */ envelope = (undampedFreq)=>{
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq)=>{
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = secondsToMilliseconds(duration);
    if (isNaN(undampedFreq)) {
        return {
            stiffness: springDefaults.stiffness,
            damping: springDefaults.damping,
            duration
        };
    } else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration
        };
    }
}
const durationKeys = [
    "duration",
    "bounce"
];
const physicsKeys = [
    "stiffness",
    "damping",
    "mass"
];
function isSpringType(options, keys) {
    return keys.some((key)=>options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = {
        velocity: springDefaults.velocity,
        stiffness: springDefaults.stiffness,
        damping: springDefaults.damping,
        mass: springDefaults.mass,
        isResolvedFromDuration: false,
        ...options
    };
    // stiffness/damping/mass overrides duration/bounce
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
        // Time-defined springs should ignore inherited velocity.
        // Velocity from interrupted animations can cause findSpring()
        // to compute wildly different spring parameters, leading to
        // massive oscillation on small-range animations.
        springOptions.velocity = 0;
        if (options.visualDuration) {
            const visualDuration = options.visualDuration;
            const root = 2 * Math.PI / (visualDuration * 1.2);
            const stiffness = root * root;
            const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
            springOptions = {
                ...springOptions,
                mass: springDefaults.mass,
                stiffness,
                damping
            };
        } else {
            const derived = findSpring({
                ...options,
                velocity: 0
            });
            springOptions = {
                ...springOptions,
                ...derived,
                mass: springDefaults.mass
            };
            springOptions.isResolvedFromDuration = true;
        }
    }
    return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object" ? {
        visualDuration: optionsOrVisualDuration,
        keyframes: [
            0,
            1
        ],
        bounce
    } : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */ const state = {
        done: false,
        value: origin
    };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
        ...options,
        velocity: -millisecondsToSeconds(options.velocity || 0)
    });
    const initialVelocity = velocity || 0.0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
    /**
     * If we're working on a granular scale, use smaller defaults for determining
     * when the spring is finished.
     *
     * These defaults have been selected emprically based on what strikes a good
     * ratio between feeling good and finishing as soon as changes are imperceptible.
     */ const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
    let resolveSpring;
    let resolveVelocity;
    // Underdamped coefficients, hoisted for use in the inlined next() hot path
    let angularFreq;
    let A;
    let sinCoeff;
    let cosCoeff;
    if (dampingRatio < 1) {
        angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
        A = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
        // Underdamped spring
        resolveSpring = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return target - envelope * (A * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
        };
        // Analytical derivative of underdamped spring (px/ms)
        sinCoeff = dampingRatio * undampedAngularFreq * A + initialDelta * angularFreq;
        cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A * angularFreq;
        resolveVelocity = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return envelope * (sinCoeff * Math.sin(angularFreq * t) + cosCoeff * Math.cos(angularFreq * t));
        };
    } else if (dampingRatio === 1) {
        // Critically damped spring
        resolveSpring = (t)=>target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
        // Analytical derivative of critically damped spring (px/ms)
        const C = initialVelocity + undampedAngularFreq * initialDelta;
        resolveVelocity = (t)=>Math.exp(-undampedAngularFreq * t) * (undampedAngularFreq * C * t - initialVelocity);
    } else {
        // Overdamped spring
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            // When performing sinh or cosh values can hit Infinity so we cap them here
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
        };
        // Analytical derivative of overdamped spring (px/ms)
        const P = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
        const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
        const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
        resolveVelocity = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
        };
    }
    const generator = {
        calculatedDuration: isResolvedFromDuration ? duration || null : null,
        velocity: (t)=>secondsToMilliseconds(resolveVelocity(t)),
        next: (t)=>{
            /**
             * For underdamped physics springs we need both position and
             * velocity each tick. Compute shared trig values once to avoid
             * duplicate Math.exp/sin/cos calls on the hot path.
             */ if (!isResolvedFromDuration && dampingRatio < 1) {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                const sin = Math.sin(angularFreq * t);
                const cos = Math.cos(angularFreq * t);
                const current = target - envelope * (A * sin + initialDelta * cos);
                const currentVelocity = secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
                state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
                state.value = state.done ? target : current;
                return state;
            }
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                const currentVelocity = secondsToMilliseconds(resolveVelocity(t));
                state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
            } else {
                state.done = t >= duration;
            }
            state.value = state.done ? target : current;
            return state;
        },
        toString: ()=>{
            const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
            const easing = generateLinearEasing((progress)=>generator.next(calculatedDuration * progress).value, calculatedDuration, 30);
            return calculatedDuration + "ms " + easing;
        },
        toTransition: ()=>{}
    };
    return generator;
}
spring.applyToOptions = (options)=>{
    const generatorOptions = createGeneratorEasing(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = secondsToMilliseconds(generatorOptions.duration);
    options.type = "keyframes";
    return options;
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs [app-client] (ecmascript)
;
;
const velocitySampleDuration = 5; // ms
function getGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}
;
;
;
function inertia({ keyframes, velocity = 0.0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    const origin = keyframes[0];
    const state = {
        done: false,
        value: origin
    };
    const isOutOfBounds = (v)=>min !== undefined && v < min || max !== undefined && v > max;
    const nearestBoundary = (v)=>{
        if (min === undefined) return max;
        if (max === undefined) return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    /**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */ if (target !== ideal) amplitude = target - origin;
    const calcDelta = (t)=>-amplitude * Math.exp(-t / timeConstant);
    const calcLatest = (t)=>target + calcDelta(t);
    const applyFriction = (t)=>{
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDelta;
        state.value = state.done ? target : latest;
    };
    /**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */ let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t)=>{
        if (!isOutOfBounds(state.value)) return;
        timeReachedBoundary = t;
        spring$1 = spring({
            keyframes: [
                state.value,
                nearestBoundary(state.value)
            ],
            velocity: getGeneratorVelocity(calcLatest, t, state.value),
            damping: bounceDamping,
            stiffness: bounceStiffness,
            restDelta,
            restSpeed
        });
    };
    checkCatchBoundary(0);
    return {
        calculatedDuration: null,
        next: (t)=>{
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */ let hasUpdatedFrame = false;
            if (!spring$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */ if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
                return spring$1.next(t - timeReachedBoundary);
            } else {
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        }
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/ease.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-client] (ecmascript)
;
;
/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticeably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/ // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2)=>(((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        } else {
            lowerBound = currentT;
        }
    }while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations)
    return currentT;
}
/*#__NO_SIDE_EFFECTS__*/ function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2) return noop;
    const getTForX = (aX)=>binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t)=>t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
;
;
const easeIn = /*@__PURE__*/ cubicBezier(0.42, 0, 1, 1);
const easeOut = /*@__PURE__*/ cubicBezier(0, 0, 0.58, 1);
const easeInOut = /*@__PURE__*/ cubicBezier(0.42, 0, 0.58, 1);
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs [app-client] (ecmascript)
;
/*#__NO_SIDE_EFFECTS__*/ const isEasingArray = (ease)=>{
    return Array.isArray(ease) && typeof ease[0] !== "number";
};
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/utils/map.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/anticipate.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/back.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs [app-client] (ecmascript)
;
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
/*#__NO_SIDE_EFFECTS__*/ const mirrorEasing = (easing)=>(p)=>p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs [app-client] (ecmascript)
;
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
/*#__NO_SIDE_EFFECTS__*/ const reverseEasing = (easing)=>(p)=>1 - easing(1 - p);
;
;
;
;
const backOut = /*@__PURE__*/ cubicBezier(0.33, 1.53, 0.69, 0.99);
const backIn = /*@__PURE__*/ reverseEasing(backOut);
const backInOut = /*@__PURE__*/ mirrorEasing(backIn);
;
;
const anticipate = (p)=>p >= 1 ? 1 : (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/easing/circ.mjs [app-client] (ecmascript)
;
;
;
const circIn = (p)=>1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
;
__turbopack_context__.s([
    "circIn",
    0,
    circIn,
    "circInOut",
    0,
    circInOut,
    "circOut",
    0,
    circOut
], 91559);
;
;
;
;
;
;
;
;
const easingLookup = {
    linear: noop,
    easeIn: easeIn,
    easeInOut: easeInOut,
    easeOut: easeOut,
    circIn: circIn,
    circInOut: circInOut,
    circOut: circOut,
    backIn: backIn,
    backInOut: backInOut,
    backOut: backOut,
    anticipate: anticipate
};
const isValidEasing = (easing)=>{
    return typeof easing === "string";
};
const easingDefinitionToFunction = (definition)=>{
    if (isBezierDefinition(definition)) {
        // If cubic bezier definition, create bezier curve
        invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
        const [x1, y1, x2, y2] = definition;
        return cubicBezier(x1, y1, x2, y2);
    } else if (isValidEasing(definition)) {
        // Else lookup from table
        invariant(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`, "invalid-easing-type");
        return easingLookup[definition];
    }
    return definition;
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/interpolate.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)
;
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.
*/ /*#__NO_SIDE_EFFECTS__*/ const progress = (from, to, value)=>{
    const range = to - from;
    return range ? (value - from) / range : 1;
};
;
__turbopack_context__.s([
    "progress",
    0,
    progress
], 83920);
;
;
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
    const numMixers = output.length - 1;
    for(let i = 0; i < numMixers; i++){
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || noop : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revisit this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */ function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */ if (inputLength === 1) return ()=>output[0];
    if (inputLength === 2 && output[0] === output[1]) return ()=>output[1];
    const isZeroDeltaRange = input[0] === input[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [
            ...input
        ].reverse();
        output = [
            ...output
        ].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v)=>{
        if (isZeroDeltaRange && v < input[0]) return output[0];
        let i = 0;
        if (numMixers > 1) {
            for(; i < input.length - 2; i++){
                if (v < input[i + 1]) break;
            }
        }
        const progressInRange = progress(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp ? (v)=>interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs [app-client] (ecmascript)
;
;
;
function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for(let i = 1; i <= remaining; i++){
        const offsetProgress = progress(0, remaining, i);
        offset.push(mixNumber(min, 1, offsetProgress));
    }
}
;
;
function defaultOffset(arr) {
    const offset = [
        0
    ];
    fillOffset(offset, arr.length - 1);
    return offset;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs [app-client] (ecmascript)
;
function convertOffsetToTimes(offset, duration) {
    return offset.map((o)=>o * duration);
}
;
;
;
;
;
function defaultEasing(values, easing) {
    return values.map(()=>easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut" }) {
    /**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */ const easingFunctions = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */ const state = {
        done: false,
        value: keyframeValues[0]
    };
    /**
     * Create a times array based on the provided 0-1 offsets
     */ const absoluteTimes = convertOffsetToTimes(// Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration);
    const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
        ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
    return {
        calculatedDuration: duration,
        next: (t)=>{
            state.value = mapTimeToKeyframe(t);
            state.done = t >= duration;
            return state;
        }
    };
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs [app-client] (ecmascript)
;
;
;
;
const transitionTypeMap = {
    decay: inertia,
    inertia: inertia,
    tween: keyframes,
    keyframes: keyframes,
    spring: spring
};
function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
        transition.type = transitionTypeMap[transition.type];
    }
}
;
;
;
;
;
;
;
;
;
;
;
;
const percentToProgress = (percent)=>percent / 100;
class JSAnimation extends WithPromise {
    constructor(options){
        super();
        this.state = "idle";
        this.startTime = null;
        this.isStopped = false;
        /**
         * The current time of the animation.
         */ this.currentTime = 0;
        /**
         * The time at which the animation was paused.
         */ this.holdTime = null;
        /**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */ this.playbackSpeed = 1;
        /**
         * Reusable state object for the delay phase to avoid
         * allocating a new object every frame.
         */ this.delayState = {
            done: false,
            value: undefined
        };
        /**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */ this.stop = ()=>{
            const { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== time.now()) {
                this.tick(time.now());
            }
            this.isStopped = true;
            if (this.state === "idle") return;
            this.teardown();
            this.options.onStop?.();
        };
        this.options = options;
        this.initAnimation();
        this.play();
        if (options.autoplay === false) this.pause();
    }
    initAnimation() {
        const { options } = this;
        replaceTransitionType(options);
        const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
        let { keyframes: keyframes$1 } = options;
        const generatorFactory = type || keyframes;
        if (("TURBOPACK compile-time value", "development") !== "production" && generatorFactory !== keyframes) {
            invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
        }
        if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
            this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
            keyframes$1 = [
                0,
                100
            ];
        }
        const generator = generatorFactory({
            ...options,
            keyframes: keyframes$1
        });
        /**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */ if (repeatType === "mirror") {
            this.mirroredGenerator = generatorFactory({
                ...options,
                keyframes: [
                    ...keyframes$1
                ].reverse(),
                velocity: -velocity
            });
        }
        /**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */ if (generator.calculatedDuration === null) {
            generator.calculatedDuration = calcGeneratorDuration(generator);
        }
        const { calculatedDuration } = generator;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = generator;
    }
    updateTime(timestamp) {
        const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
        // Update currentTime
        if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        } else {
            // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
            // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
            // example.
            this.currentTime = animationTime;
        }
    }
    tick(timestamp, sample = false) {
        const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
        if (this.startTime === null) return generator.next(0);
        const { delay = 0, keyframes: keyframes1, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
        /**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */ if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, timestamp);
        } else if (this.speed < 0) {
            this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
        }
        if (sample) {
            this.currentTime = timestamp;
        } else {
            this.updateTime(timestamp);
        }
        // Rebase on delay
        const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
        this.currentTime = Math.max(timeWithoutDelay, 0);
        // If this animation has finished, set the current time  to the total duration.
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let elapsed = this.currentTime;
        let frameGenerator = generator;
        if (repeat) {
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */ const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */ let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */ let iterationProgress = progress % 1.0;
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */ if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            iterationProgress === 1 && currentIteration--;
            currentIteration = Math.min(currentIteration, repeat + 1);
            /**
             * Reverse progress if we're not running in "normal" direction
             */ const isOddIteration = Boolean(currentIteration % 2);
            if (isOddIteration) {
                if (repeatType === "reverse") {
                    iterationProgress = 1 - iterationProgress;
                    if (repeatDelay) {
                        iterationProgress -= repeatDelay / resolvedDuration;
                    }
                } else if (repeatType === "mirror") {
                    frameGenerator = mirroredGenerator;
                }
            }
            elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
        }
        /**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */ let state;
        if (isInDelayPhase) {
            this.delayState.value = keyframes1[0];
            state = this.delayState;
        } else {
            state = frameGenerator.next(elapsed);
        }
        if (mixKeyframes && !isInDelayPhase) {
            state.value = mixKeyframes(state.value);
        }
        let { done } = state;
        if (!isInDelayPhase && calculatedDuration !== null) {
            done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
        }
        const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
        // TODO: The exception for inertia could be cleaner here
        if (isAnimationFinished && type !== inertia) {
            state.value = getFinalKeyframe(keyframes1, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(state.value);
        }
        if (isAnimationFinished) {
            this.finish();
        }
        return state;
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */ then(resolve, reject) {
        return this.finished.then(resolve, reject);
    }
    get duration() {
        return millisecondsToSeconds(this.calculatedDuration);
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + millisecondsToSeconds(delay);
    }
    get time() {
        return millisecondsToSeconds(this.currentTime);
    }
    set time(newTime) {
        newTime = secondsToMilliseconds(newTime);
        this.currentTime = newTime;
        if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
            this.holdTime = newTime;
        } else if (this.driver) {
            this.startTime = this.driver.now() - newTime / this.playbackSpeed;
        }
        if (this.driver) {
            this.driver.start(false);
        } else {
            this.startTime = 0;
            this.state = "paused";
            this.holdTime = newTime;
            this.tick(newTime);
        }
    }
    /**
     * Returns the generator's velocity at the current time in units/second.
     * Uses the analytical derivative when available (springs), avoiding
     * the MotionValue's frame-dependent velocity estimation.
     */ getGeneratorVelocity() {
        const t = this.currentTime;
        if (t <= 0) return this.options.velocity || 0;
        if (this.generator.velocity) {
            return this.generator.velocity(t);
        }
        // Fallback: finite difference
        const current = this.generator.next(t).value;
        return getGeneratorVelocity((s)=>this.generator.next(s).value, t, current);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(newSpeed) {
        const hasChanged = this.playbackSpeed !== newSpeed;
        if (hasChanged && this.driver) {
            this.updateTime(time.now());
        }
        this.playbackSpeed = newSpeed;
        if (hasChanged && this.driver) {
            this.time = millisecondsToSeconds(this.currentTime);
        }
    }
    play() {
        if (this.isStopped) return;
        const { driver = frameloopDriver, startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((timestamp)=>this.tick(timestamp));
        }
        this.options.onPlay?.();
        const now = this.driver.now();
        if (this.state === "finished") {
            this.updateFinished();
            this.startTime = now;
        } else if (this.holdTime !== null) {
            this.startTime = now - this.holdTime;
        } else if (!this.startTime) {
            this.startTime = startTime ?? now;
        }
        if (this.state === "finished" && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        /**
         * Set playState to running only after we've used it in
         * the previous logic.
         */ this.state = "running";
        this.driver.start();
    }
    pause() {
        this.state = "paused";
        this.updateTime(time.now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = "finished";
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.startTime = this.holdTime = null;
    }
    stopDriver() {
        if (!this.driver) return;
        this.driver.stop();
        this.driver = undefined;
    }
    sample(sampleTime) {
        this.startTime = 0;
        return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
        if (this.options.allowFlatten) {
            this.options.type = "keyframes";
            this.options.ease = "linear";
            this.initAnimation();
        }
        this.driver?.stop();
        return timeline.observe(this);
    }
}
// Legacy function support
function animateValue(options) {
    return new JSAnimation(options);
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs [app-client] (ecmascript)
;
;
const unsupportedEasingFunctions = {
    anticipate: anticipate,
    backInOut: backInOut,
    circInOut: circInOut
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
        transition.ease = unsupportedEasingFunctions[transition.ease];
    }
}
;
;
;
;
;
;
;
;
/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */ const sampleDelta = 10; //ms
class NativeAnimationExtended extends NativeAnimation {
    constructor(options){
        /**
         * The base NativeAnimation function only supports a subset
         * of Motion easings, and WAAPI also only supports some
         * easing functions via string/cubic-bezier definitions.
         *
         * This function replaces those unsupported easing functions
         * with a JS easing function. This will later get compiled
         * to a linear() easing function.
         */ replaceStringEasing(options);
        /**
         * Ensure we replace the transition type with a generator function
         * before passing to WAAPI.
         *
         * TODO: Does this have a better home? It could be shared with
         * JSAnimation.
         */ replaceTransitionType(options);
        super(options);
        /**
         * Only set startTime when the animation should autoplay.
         * Setting startTime on a paused WAAPI animation unpauses it
         * (per the WAAPI spec), which breaks autoplay: false.
         */ if (options.startTime !== undefined && options.autoplay !== false) {
            this.startTime = options.startTime;
        }
        this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read committed styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */ updateMotionValue(value) {
        const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
        if (!motionValue) return;
        if (value !== undefined) {
            motionValue.set(value);
            return;
        }
        const sampleAnimation = new JSAnimation({
            ...options,
            autoplay: false
        });
        /**
         * Use wall-clock elapsed time for sampling.
         * Under CPU load, WAAPI's currentTime may not reflect actual
         * elapsed time, causing incorrect sampling and visual jumps.
         */ const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
        const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
        const current = sampleAnimation.sample(sampleTime).value;
        /**
         * Write the estimated value to inline style so it persists
         * after cancel(), covering the async gap before the next
         * animation starts.
         */ const { name } = this.options;
        if (element && name) setStyle(element, name, current);
        motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
        sampleAnimation.stop();
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs [app-client] (ecmascript)
;
;
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */ const isAnimatable = (value, name)=>{
    // If the list of keys that might be non-animatable grows, replace with Set
    if (name === "zIndex") return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value)) return true;
    if (typeof value === "string" && // It's animatable if we have a string
    (complex.test(value) || value === "0") && // And it contains numbers and/or colors
    !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};
;
;
;
;
function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1) return true;
    for(let i = 0; i < keyframes.length; i++){
        if (keyframes[i] !== current) return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */ const originKeyframe = keyframes[0];
    if (originKeyframe === null) {
        return false;
    }
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */ if (name === "display" || name === "visibility") return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = isAnimatable(originKeyframe, name);
    const isTargetAnimatable = isAnimatable(targetKeyframe, name);
    warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        return false;
    }
    return hasKeyframesChanged(keyframes) || (type === "spring" || isGenerator(type)) && velocity;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-client] (ecmascript)
;
function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs [app-client] (ecmascript)
;
const browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes) {
    for(let i = 0; i < keyframes.length; i++){
        if (typeof keyframes[i] === "string" && browserColorFunctions.test(keyframes[i])) {
            return true;
        }
    }
    return false;
}
;
;
;
;
const colorProperties = new Set([
    "color",
    "backgroundColor",
    "outlineColor",
    "fill",
    "stroke",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor"
]);
const supportsWaapi = /*@__PURE__*/ memo(()=>Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
    const { motionValue, name, repeatDelay, repeatType, damping, type, keyframes } = options;
    const subject = motionValue?.owner?.current;
    /**
     * We use instanceof checks instead of isHTMLElement()/isSVGElement()
     * because we explicitly **don't** want elements in different timing
     * contexts (i.e. popups) to be accelerated, as it's not possible to sync
     * these animations properly with those driven from the main window
     * frameloop.
     */ if (!(subject instanceof HTMLElement) && !(subject instanceof SVGElement)) {
        return false;
    }
    const { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return supportsWaapi() && name && /**
         * Force WAAPI for color properties with browser-only color formats
         * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
         */ (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes)) && (name !== "transform" || !transformTemplate) && /**
         * If we're outputting values to onUpdate then we can't use WAAPI as there's
         * no way to read the value from WAAPI every frame.
         */ !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
;
;
;
;
;
;
;
;
;
;
;
/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */ const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends WithPromise {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }){
        super();
        /**
         * Bound to support return animation.stop pattern
         */ this.stop = ()=>{
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = time.now();
        const optionsWithDefaults = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...options
        };
        const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced)=>this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = time.now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */ let canAnimateValue = true;
        if (!canAnimate(keyframes, name, type, velocity)) {
            canAnimateValue = false;
            if (MotionGlobalConfig.instantAnimations || !delay) {
                onUpdate?.(getFinalKeyframe(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            makeAnimationInstant(options);
            options.repeat = 0;
        }
        /**
         * Resolve startTime for the animation.
         *
         * This method uses the createdAt and resolvedAt to calculate the
         * animation startTime. *Ideally*, we would use the createdAt time as t=0
         * as the following frame would then be the first frame of the animation in
         * progress, which would feel snappier.
         *
         * However, if there's a delay (main thread work) between the creation of
         * the animation and the first committed frame, we prefer to use resolvedAt
         * to avoid a sudden jump into the animation.
         */ const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : undefined;
        const resolvedOptions = {
            startTime,
            finalKeyframe,
            ...options,
            keyframes
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         *
         * Also skip WAAPI when keyframes aren't animatable, as the resolved
         * values may not be valid CSS and would trigger browser warnings.
         */ const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
        const element = resolvedOptions.motionValue?.owner?.current;
        let animation;
        if (useWaapi) {
            try {
                animation = new NativeAnimationExtended({
                    ...resolvedOptions,
                    element
                });
            } catch  {
                animation = new JSAnimation(resolvedOptions);
            }
        } else {
            animation = new JSAnimation(resolvedOptions);
        }
        animation.finished.then(()=>{
            this.notifyFinished();
        }).catch(noop);
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        if (!this._animation) {
            return this._finished;
        } else {
            return this.animation.finished;
        }
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(()=>{});
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            flushKeyframeResolvers();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        } else {
            this.pendingTimeline = timeline;
        }
        return ()=>this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs [app-client] (ecmascript)
;
;
const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
};
const criticallyDampedSpring = (target)=>({
        type: "spring",
        stiffness: 550,
        damping: target === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    });
const keyframesTransition = {
    type: "keyframes",
    duration: 0.8
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */ const ease = {
    type: "keyframes",
    ease: [
        0.25,
        0.1,
        0.35,
        1
    ],
    duration: 0.3
};
const getDefaultTransition = (valueKey, { keyframes })=>{
    if (keyframes.length > 2) {
        return keyframesTransition;
    } else if (transformProps.has(valueKey)) {
        return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes[1]) : underDampedSpring;
    }
    return ease;
};
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs [app-client] (ecmascript)
;
const orchestrationKeys = new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed"
]);
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */ function isTransitionDefined(transition) {
    for(const key in transition){
        if (!orchestrationKeys.has(key)) return true;
    }
    return false;
}
;
;
;
;
;
;
;
;
;
;
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff)=>(onComplete)=>{
        const valueTransition = getValueTransition(transition, name) || {};
        /**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */ const delay = valueTransition.delay || transition.delay || 0;
        /**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */ let { elapsed = 0 } = transition;
        elapsed = elapsed - secondsToMilliseconds(delay);
        const options = {
            keyframes: Array.isArray(target) ? target : [
                null,
                target
            ],
            ease: "easeOut",
            velocity: value.getVelocity(),
            ...valueTransition,
            delay: -elapsed,
            onUpdate: (v)=>{
                value.set(v);
                valueTransition.onUpdate && valueTransition.onUpdate(v);
            },
            onComplete: ()=>{
                onComplete();
                valueTransition.onComplete && valueTransition.onComplete();
            },
            name,
            motionValue: value,
            element: isHandoff ? undefined : element
        };
        /**
     * If there's no transition defined for this value, we can generate
     * unique transition settings for this value.
     */ if (!isTransitionDefined(valueTransition)) {
            Object.assign(options, getDefaultTransition(name, options));
        }
        /**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */ options.duration && (options.duration = secondsToMilliseconds(options.duration));
        options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
        /**
     * Support deprecated way to set initial value. Prefer keyframe syntax.
     */ if (options.from !== undefined) {
            options.keyframes[0] = options.from;
        }
        let shouldSkip = false;
        if (options.type === false || options.duration === 0 && !options.repeatDelay) {
            makeAnimationInstant(options);
            if (options.delay === 0) {
                shouldSkip = true;
            }
        }
        if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations || valueTransition.skipAnimations) {
            shouldSkip = true;
            makeAnimationInstant(options);
            options.delay = 0;
        }
        /**
     * If the transition type or easing has been explicitly set by the user
     * then we don't want to allow flattening the animation.
     */ options.allowFlatten = !valueTransition.type && !valueTransition.ease;
        /**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */ if (shouldSkip && !isHandoff && value.get() !== undefined) {
            const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
            if (finalKeyframe !== undefined) {
                frame.update(()=>{
                    options.onUpdate(finalKeyframe);
                    options.onComplete();
                });
                return;
            }
        }
        return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
    };
;
__turbopack_context__.s([
    "animateMotionValue",
    0,
    animateMotionValue
], 39011);
;
;
;
;
;
;
;
;
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */ function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    let { transition, transitionEnd, ...target } = targetAndTransition;
    const defaultTransition = visualElement.getDefaultTransition();
    transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
    const reduceMotion = transition?.reduceMotion;
    const skipAnimations = transition?.skipAnimations;
    if (transitionOverride) transition = transitionOverride;
    const animations = [];
    const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
    const path = transition?.path;
    if (path) {
        // path mutates `target` to claim x/y; loop below skips them.
        path.animateVisualElement(visualElement, target, transition, delay, animations);
    }
    for(const key in target){
        const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
        const valueTarget = target[key];
        if (valueTarget === undefined || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
            continue;
        }
        const valueTransition = {
            delay,
            ...getValueTransition(transition || {}, key)
        };
        if (skipAnimations) valueTransition.skipAnimations = true;
        /**
         * If the value is already at the defined target, skip the animation.
         * We still re-assert the value via frame.update to take precedence
         * over any stale transitionEnd callbacks from previous animations.
         */ const currentValue = value.get();
        if (currentValue !== undefined && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
            frame.update(()=>value.set(valueTarget));
            continue;
        }
        /**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */ let isHandoff = false;
        if (window.MotionHandoffAnimation) {
            const appearId = getOptimisedAppearId(visualElement);
            if (appearId) {
                const startTime = window.MotionHandoffAnimation(appearId, key, frame);
                if (startTime !== null) {
                    valueTransition.startTime = startTime;
                    isHandoff = true;
                }
            }
        }
        addValueToWillChange(visualElement, key);
        const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
        value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? {
            type: false
        } : valueTransition, visualElement, isHandoff));
        const animation = value.animation;
        if (animation) {
            animations.push(animation);
        }
    }
    if (transitionEnd) {
        const applyTransitionEnd = ()=>frame.update(()=>{
                transitionEnd && setTarget(visualElement, transitionEnd);
            });
        if (animations.length) {
            Promise.all(animations).then(applyTransitionEnd);
        } else {
            applyTransitionEnd();
        }
    }
    return animations;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/interfaces/visual-element-variant.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/animation/utils/calc-child-stagger.mjs [app-client] (ecmascript)
;
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
    const index = Array.from(children).sort((a, b)=>a.sortNodePosition(b)).indexOf(child);
    const numChildren = children.size;
    const maxStaggerDuration = (numChildren - 1) * staggerChildren;
    const delayIsFunction = typeof delayChildren === "function";
    return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
;
;
;
;
function animateVariant(visualElement, variant, options = {}) {
    const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : undefined);
    let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */ const getAnimation = resolved ? ()=>Promise.all(animateTarget(visualElement, resolved, options)) : ()=>Promise.resolve();
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */ const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0)=>{
        const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
        return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
    } : ()=>Promise.resolve();
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */ const { when } = transition;
    if (when) {
        const [first, last] = when === "beforeChildren" ? [
            getAnimation,
            getChildAnimations
        ] : [
            getChildAnimations,
            getAnimation
        ];
        return first().then(()=>last());
    } else {
        return Promise.all([
            getAnimation(),
            getChildAnimations(options.delay)
        ]);
    }
}
function animateChildren(visualElement, variant, delay = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
    const animations = [];
    for (const child of visualElement.variantChildren){
        child.notify("AnimationStart", variant);
        animations.push(animateVariant(child, variant, {
            ...options,
            delay: delay + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
        }).then(()=>child.notify("AnimationComplete", variant)));
    }
    return Promise.all(animations);
}
;
;
;
;
function animateVisualElement(visualElement, definition, options = {}) {
    visualElement.notify("AnimationStart", definition);
    let animation;
    if (Array.isArray(definition)) {
        const animations = definition.map((variant)=>animateVariant(visualElement, variant, options));
        animation = Promise.all(animations);
    } else if (typeof definition === "string") {
        animation = animateVariant(visualElement, definition, options);
    } else {
        const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
        animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
    }
    return animation.then(()=>{
        visualElement.notify("AnimationComplete", definition);
    });
}
;
__turbopack_context__.s([
    "animateVisualElement",
    0,
    animateVisualElement
], 76859);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/get-variant-context.mjs [app-client] (ecmascript)
;
;
;
const numVariantProps = variantProps.length;
/**
 * Get variant context from a visual element's parent chain.
 * Uses `any` type for visualElement to avoid circular dependencies.
 */ function getVariantContext(visualElement) {
    if (!visualElement) return undefined;
    if (!visualElement.isControllingVariants) {
        const context = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
        if (visualElement.props.initial !== undefined) {
            context.initial = visualElement.props.initial;
        }
        return context;
    }
    const context = {};
    for(let i = 0; i < numVariantProps; i++){
        const name = variantProps[i];
        const prop = visualElement.props[name];
        if (isVariantLabel(prop) || prop === false) {
            context[name] = prop;
        }
    }
    return context;
}
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/render/utils/shallow-compare.mjs [app-client] (ecmascript)
;
function shallowCompare(next, prev) {
    if (!Array.isArray(prev)) return false;
    const prevLength = prev.length;
    if (prevLength !== next.length) return false;
    for(let i = 0; i < prevLength; i++){
        if (prev[i] !== next[i]) return false;
    }
    return true;
}
;
;
;
;
;
;
;
;
;
;
const reversePriorityOrder = [
    ...variantPriorityOrder
].reverse();
const numAnimationTypes = variantPriorityOrder.length;
function createAnimateFunction(visualElement) {
    return (animations)=>{
        return Promise.all(animations.map(({ animation, options })=>animateVisualElement(visualElement, animation, options)));
    };
}
function createAnimationState(visualElement) {
    let animate = createAnimateFunction(visualElement);
    let state = createState();
    let isInitialRender = true;
    /**
     * Track whether the animation state has been reset (e.g. via StrictMode
     * double-invocation or Suspense unmount/remount). On the first
     * animateChanges() call after a reset we need to behave like the initial
     * render for variant-inheritance checks, even though isInitialRender is
     * already false.
     */ let wasReset = false;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */ const buildResolvedTypeValues = (type)=>(acc, definition)=>{
            const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : undefined);
            if (resolved) {
                const { transition, transitionEnd, ...target } = resolved;
                acc = {
                    ...acc,
                    ...target,
                    ...transitionEnd
                };
            }
            return acc;
        };
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */ function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */ function animateChanges(changedActiveType) {
        const { props } = visualElement;
        const context = getVariantContext(visualElement.parent) || {};
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */ const animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */ const removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */ let encounteredKeys = {};
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */ let removedVariantIndex = Infinity;
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */ for(let i = 0; i < numAnimationTypes; i++){
            const type = reversePriorityOrder[i];
            const typeState = state[type];
            const prop = props[type] !== undefined ? props[type] : context[type];
            const propIsVariant = isVariantLabel(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */ const activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false) removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */ let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
            if (isInherited && (isInitialRender || wasReset) && visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */ typeState.protectedKeys = {
                ...encounteredKeys
            };
            // Check if we can skip analysing this prop early
            if (// If it isn't active and hasn't *just* been set as inactive
            !typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
            isAnimationControls(prop) || typeof prop === "boolean") {
                continue;
            }
            /**
             * If exit is already active and wasn't just activated, skip
             * re-processing to prevent interrupting running exit animations.
             * Re-resolving exit with a changed custom value can start new
             * value animations that stop the originals, leaving the exit
             * animation promise unresolved and the component stuck in the DOM.
             */ if (type === "exit" && typeState.isActive && activeDelta !== true) {
                if (typeState.prevResolvedValues) {
                    encounteredKeys = {
                        ...encounteredKeys,
                        ...typeState.prevResolvedValues
                    };
                }
                continue;
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */ const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
            let handledRemovedValues = false;
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */ const definitionList = Array.isArray(prop) ? prop : [
                prop
            ];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */ let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
            if (activeDelta === false) resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */ const { prevResolvedValues = {} } = typeState;
            const allKeys = {
                ...prevResolvedValues,
                ...resolvedValues
            };
            const markToAnimate = (key)=>{
                shouldAnimateType = true;
                if (removedKeys.has(key)) {
                    handledRemovedValues = true;
                    removedKeys.delete(key);
                }
                typeState.needsAnimating[key] = true;
                const motionValue = visualElement.getValue(key);
                if (motionValue) motionValue.liveStyle = false;
            };
            for(const key in allKeys){
                const next = resolvedValues[key];
                const prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key)) continue;
                /**
                 * If the value has changed, we probably want to animate it.
                 */ let valueHasChanged = false;
                if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
                    valueHasChanged = !shallowCompare(next, prev) || variantDidChange;
                } else {
                    valueHasChanged = next !== prev;
                }
                if (valueHasChanged) {
                    if (next !== undefined && next !== null) {
                        // If next is defined and doesn't equal prev, it needs animating
                        markToAnimate(key);
                    } else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                } else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */ markToAnimate(key);
                } else {
                    /**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */ typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */ typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            if (typeState.isActive) {
                encounteredKeys = {
                    ...encounteredKeys,
                    ...resolvedValues
                };
            }
            if ((isInitialRender || wasReset) && visualElement.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            /**
             * If this is an inherited prop we want to skip this animation
             * unless the inherited variants haven't changed on this render.
             */ const willAnimateViaParent = isInherited && variantDidChange;
            const needsAnimating = !willAnimateViaParent || handledRemovedValues;
            if (shouldAnimateType && needsAnimating) {
                animations.push(...definitionList.map((animation)=>{
                    const options = {
                        type
                    };
                    /**
                     * If we're performing the initial animation, but we're not
                     * rendering at the same time as the variant-controlling parent,
                     * we want to use the parent's transition to calculate the stagger.
                     */ if (typeof animation === "string" && (isInitialRender || wasReset) && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
                        const { parent } = visualElement;
                        const parentVariant = resolveVariant(parent, animation);
                        if (parent.enteringChildren && parentVariant) {
                            const { delayChildren } = parentVariant.transition || {};
                            options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
                        }
                    }
                    return {
                        animation: animation,
                        options
                    };
                }));
            }
        }
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */ if (removedKeys.size) {
            const fallbackAnimation = {};
            /**
             * If the initial prop contains a transition we can use that, otherwise
             * allow the animation function to use the visual element's default.
             */ if (typeof props.initial !== "boolean") {
                const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
                if (initialTransition && initialTransition.transition) {
                    fallbackAnimation.transition = initialTransition.transition;
                }
            }
            removedKeys.forEach((key)=>{
                const fallbackTarget = visualElement.getBaseTarget(key);
                const motionValue = visualElement.getValue(key);
                if (motionValue) motionValue.liveStyle = true;
                // @ts-expect-error - @mattgperry to figure if we should do something here
                fallbackAnimation[key] = fallbackTarget ?? null;
            });
            animations.push({
                animation: fallbackAnimation
            });
        }
        let shouldAnimate = Boolean(animations.length);
        if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        wasReset = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */ function setActive(type, isActive) {
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive) return Promise.resolve();
        // Propagate active change to children
        visualElement.variantChildren?.forEach((child)=>child.animationState?.setActive(type, isActive));
        state[type].isActive = isActive;
        const animations = animateChanges(type);
        for(const key in state){
            state[key].protectedKeys = {};
        }
        return animations;
    }
    return {
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: ()=>state,
        reset: ()=>{
            state = createState();
            wasReset = true;
        }
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    } else if (Array.isArray(next)) {
        return !shallowCompare(next, prev);
    }
    return false;
}
function createTypeState(isActive = false) {
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    };
}
function createState() {
    return {
        animate: createTypeState(true),
        whileInView: createTypeState(),
        whileHover: createTypeState(),
        whileTap: createTypeState(),
        whileDrag: createTypeState(),
        whileFocus: createTypeState(),
        exit: createTypeState()
    };
}
;
;
class AnimationFeature extends Feature {
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */ constructor(node){
        super(node);
        node.animationState || (node.animationState = createAnimationState(node));
    }
    updateAnimationControlsSubscription() {
        const { animate } = this.node.getProps();
        if (isAnimationControls(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */ mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        const { animate } = this.node.getProps();
        const { animate: prevAnimate } = this.node.prevProps || {};
        if (animate !== prevAnimate) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        this.node.animationState.reset();
        this.unmountControls?.();
    }
}
;
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs [app-client] (ecmascript)
;
;
let id = 0;
class ExitAnimationFeature extends Feature {
    constructor(){
        super(...arguments);
        this.id = id++;
        this.isExitComplete = false;
    }
    update() {
        if (!this.node.presenceContext) return;
        const { isPresent, onExitComplete } = this.node.presenceContext;
        const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || isPresent === prevIsPresent) {
            return;
        }
        if (isPresent && prevIsPresent === false) {
            /**
             * When re-entering, if the exit animation already completed
             * (element is at rest), reset to initial values so the enter
             * animation replays from the correct position.
             */ if (this.isExitComplete) {
                const { initial, custom } = this.node.getProps();
                if (typeof initial === "string" || typeof initial === "object" && initial !== null && !Array.isArray(initial)) {
                    const resolved = resolveVariant(this.node, initial, custom);
                    if (resolved) {
                        const { transition, transitionEnd, ...target } = resolved;
                        for(const key in target){
                            this.node.getValue(key)?.jump(target[key]);
                        }
                    }
                }
                this.node.animationState.reset();
                this.node.animationState.animateChanges();
            } else {
                this.node.animationState.setActive("exit", false);
            }
            this.isExitComplete = false;
            return;
        }
        const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
        if (onExitComplete && !isPresent) {
            exitAnimation.then(()=>{
                this.isExitComplete = true;
                onExitComplete(this.id);
            });
        }
    }
    mount() {
        const { register, onExitComplete } = this.node.presenceContext || {};
        if (onExitComplete) {
            onExitComplete(this.id);
        }
        if (register) {
            this.unmount = register(this.id);
        }
    }
    unmount() {}
}
;
;
;
const animations = {
    animation: {
        Feature: AnimationFeature
    },
    exit: {
        Feature: ExitAnimationFeature
    }
};
;
__turbopack_context__.s([
    "animations",
    0,
    animations
], 23070);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/utils/each-axis.mjs [app-client] (ecmascript)
;
function eachAxis(callback) {
    return [
        callback("x"),
        callback("y")
    ];
}
;
__turbopack_context__.s([
    "eachAxis",
    0,
    eachAxis
], 55559);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/events/add-dom-event.mjs [app-client] (ecmascript)
;
function addDomEvent(target, eventName, handler, options = {
    passive: true
}) {
    target.addEventListener(eventName, handler, options);
    return ()=>target.removeEventListener(eventName, handler, options);
}
;
__turbopack_context__.s([
    "addDomEvent",
    0,
    addDomEvent
], 82774);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)
;
const isDragging = {
    x: false,
    y: false
};
function isDragActive() {
    return isDragging.x || isDragging.y;
}
;
__turbopack_context__.s([
    "isDragActive",
    0,
    isDragActive,
    "isDragging",
    0,
    isDragging
], 39676);
;
function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
        if (isDragging[axis]) {
            return null;
        } else {
            isDragging[axis] = true;
            return ()=>{
                isDragging[axis] = false;
            };
        }
    } else {
        if (isDragging.x || isDragging.y) {
            return null;
        } else {
            isDragging.x = isDragging.y = true;
            return ()=>{
                isDragging.x = isDragging.y = false;
            };
        }
    }
}
;
__turbopack_context__.s([
    "setDragLock",
    0,
    setDragLock
], 37541);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/projection/geometry/delta-calc.mjs [app-client] (ecmascript)
;
;
const SCALE_PRECISION = 0.0001;
const SCALE_MIN = 1 - SCALE_PRECISION;
const SCALE_MAX = 1 + SCALE_PRECISION;
const TRANSLATE_PRECISION = 0.01;
const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
    return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
    return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
    delta.origin = origin;
    delta.originPoint = mixNumber(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
    if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
        delta.scale = 1.0;
    }
    if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
        delta.translate = 0.0;
    }
}
function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : undefined);
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : undefined);
}
function calcRelativeAxis(target, relative, parent, anchor = 0) {
    const anchorPoint = anchor ? mixNumber(parent.min, parent.max, anchor) : parent.min;
    target.min = anchorPoint + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent, anchor) {
    calcRelativeAxis(target.x, relative.x, parent.x, anchor?.x);
    calcRelativeAxis(target.y, relative.y, parent.y, anchor?.y);
}
function calcRelativeAxisPosition(target, layout, parent, anchor = 0) {
    const anchorPoint = anchor ? mixNumber(parent.min, parent.max, anchor) : parent.min;
    target.min = layout.min - anchorPoint;
    target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent, anchor) {
    calcRelativeAxisPosition(target.x, layout.x, parent.x, anchor?.x);
    calcRelativeAxisPosition(target.y, layout.y, parent.y, anchor?.y);
}
;
__turbopack_context__.s([
    "calcBoxDelta",
    0,
    calcBoxDelta,
    "calcLength",
    0,
    calcLength,
    "calcRelativeBox",
    0,
    calcRelativeBox,
    "calcRelativePosition",
    0,
    calcRelativePosition,
    "isNear",
    0,
    isNear
], 52101);
// MERGED MODULE: [project]/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-client] (ecmascript)
;
// MERGED MODULE: [project]/node_modules/motion-utils/dist/es/is-object.mjs [app-client] (ecmascript)
;
const isObject = (value)=>typeof value === "object" && value !== null;
;
__turbopack_context__.s([
    "isObject",
    0,
    isObject
], 42824);
;
/**
 * Checks if an element is an SVG element in a way
 * that works across iframes
 */ function isSVGElement(element) {
    return isObject(element) && "ownerSVGElement" in element;
}
;
__turbopack_context__.s([
    "isSVGElement",
    0,
    isSVGElement
], 89026);
}),
87652, ((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__49652__ = __turbopack_context__.i(49652);
;
const thresholds = {
    some: 0,
    all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
    const elements = (0, __TURBOPACK__imported__module__49652__["resolveElements"])(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries)=>{
        entries.forEach((entry)=>{
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */ if (entry.isIntersecting === Boolean(onEnd)) return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry.target, entry);
                if (typeof newOnEnd === "function") {
                    activeIntersections.set(entry.target, newOnEnd);
                } else {
                    observer.unobserve(entry.target);
                }
            } else if (typeof onEnd === "function") {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount]
    });
    elements.forEach((element)=>observer.observe(element));
    return ()=>observer.disconnect();
}
;
"use client";
;
;
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
    const [isInView, setInView] = (0, __TURBOPACK__imported__module__71645__["useState"])(initial);
    (0, __TURBOPACK__imported__module__71645__["useEffect"])(()=>{
        if (!ref.current || once && isInView) return;
        const onEnter = ()=>{
            setInView(true);
            return once ? undefined : ()=>setInView(false);
        };
        const options = {
            root: root && root.current || undefined,
            margin,
            amount
        };
        return inView(ref.current, onEnter, options);
    }, [
        root,
        ref,
        margin,
        once,
        amount
    ]);
    return isInView;
}
;
__turbopack_context__.s([
    "useInView",
    0,
    useInView
], 87652);
}),
49652, ((__turbopack_context__) => {
"use strict";

function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
        return [];
    }
    if (elementOrSelector instanceof EventTarget) {
        return [
            elementOrSelector
        ];
    } else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            root = scope.current;
        }
        const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element)=>element != null);
}
;
__turbopack_context__.s([
    "resolveElements",
    0,
    resolveElements
]);
}),
18581, ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r(71645);
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
18967, ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__47167__ = __turbopack_context__.i(47167);
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>{
    // Fast path: an absolute URL must start with a letter (the scheme).
    // Check for a-z and A-Z without the cost of the regex.
    const c = url.charCodeAt(0);
    const isLetter = c >= 65 /* A */  && c <= 90 || c >= 97 /* a */  && c <= 122;
    /* z */ if (!isLetter) {
        return false;
    }
    return ABSOLUTE_URL_REGEX.test(url);
};
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E1035",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1025",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
}
}),
73668, ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r(18967);
const _hasbasepath = __turbopack_context__.r(52817);
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
}
}),
98183, ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
}
}),
95057, ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__47167__ = __turbopack_context__.i(47167);
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r(90809);
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r(98183));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
}
}),
84508, ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__47167__ = __turbopack_context__.i(47167);
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
}
}),
22016, ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__47167__ = __turbopack_context__.i(47167);
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r(90809);
const _jsxruntime = __turbopack_context__.r(43476);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r(71645));
const _formaturl = __turbopack_context__.r(95057);
const _approutercontextsharedruntime = __turbopack_context__.r(8372);
const _usemergedref = __turbopack_context__.r(18581);
const _utils = __turbopack_context__.r(18967);
const _addbasepath = __turbopack_context__.r(5550);
const _routerreducertypes = __turbopack_context__.r(88540);
const _links = __turbopack_context__.r(91949);
const _islocalurl = __turbopack_context__.r(73668);
const _types = __turbopack_context__.r(9396);
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, linkInstanceRef, replace, scroll, onNavigate, transitionTypes, prefetchIntent = 'none') {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r(99781);
        _react.default.startTransition(()=>{
            dispatchNavigateAction(href, replace ? 'replace' : 'push', scroll === false ? _routerreducertypes.ScrollBehavior.NoScroll : _routerreducertypes.ScrollBehavior.Default, linkInstanceRef.current, transitionTypes, prefetchIntent);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, transitionTypes, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const prefetchIntent = prefetchProp === false ? 'none' : prefetchProp === true ? 'full' : 'auto';
    const fetchStrategy = prefetchIntent !== 'none' ? getFetchStrategyFromPrefetchIntent(prefetchIntent) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true,
            transitionTypes: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else if (key === 'transitionTypes') {
                if (props[key] != null && !Array.isArray(props[key])) {
                    throw createPropError({
                        key,
                        expected: '`string[]`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    const resolvedHref = asProp || hrefProp;
    const formattedHref = formatStringOrUrl(resolvedHref);
    if ("TURBOPACK compile-time truthy", 1) {
        const { warnOnce } = __turbopack_context__.r(33525);
        if (props.locale) {
            warnOnce('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof resolvedHref === 'string') {
                href = resolvedHref;
            } else if (typeof resolvedHref === 'object' && typeof resolvedHref.pathname === 'string') {
                href = resolvedHref.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${formattedHref}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${formattedHref}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${formattedHref}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${formattedHref}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Capture the Owner Stack during render so dev-only warnings emitted later
    // at navigation time can be associated with the JSX that created
    // this <Link>.
    const ownerStack = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback((element)=>{
        if (router !== null) {
            linkInstanceRef.current = (0, _links.mountLinkInstance)(element, formattedHref, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus, ownerStack);
        }
        return ()=>{
            if (linkInstanceRef.current) {
                (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                linkInstanceRef.current = null;
            }
            (0, _links.unmountPrefetchableInstance)(element);
        };
    }, [
        prefetchEnabled,
        formattedHref,
        router,
        fetchStrategy,
        setOptimisticLinkStatus,
        ownerStack
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, formattedHref, linkInstanceRef, replace, scroll, onNavigate, transitionTypes, prefetchIntent);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(formattedHref)) {
        childProps.href = formattedHref;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(formattedHref);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            const { errorOnce } = __turbopack_context__.r(84508);
            errorOnce('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchIntent(prefetchIntent) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchIntent === 'auto' ? _types.FetchStrategy.PPR : _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
38080, ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "name": "Thomas Dijkstra",
        "type": "Musician and Songwriter",
        "location": "Fox Valley, WI",
        "paras": [
            "Thomas Dijkstra has been involved in the music scene since he could ride my bike to the local music store. Since then he's been fully immersed in music from working at Island Music for 5 year's, running sound, working at open mics, playing lead guitar, singing for various bands, pursuinga  solo artist career and always playing as much as he possibly can. He feels incredibly lucky to play all over Wisconsin and is exapnding his music scene to be international!",
            "Folk and outlaw county have always been him main focus and what you can expect if you see him me out playing! He sings a variety of covers and original music and is a releasing artist on Spotify. You can find his sound similar to Matt Mason and Colter Wall with his own unique artistic style. He is currently working on his first album and is excited to share it with the world!"
        ],
        "status": "Available for Booking, Residency, and Collaboration",
        "link": "https://linktr.ee/thomasdijkstramusic",
        "src": "/images/biopic.jpg"
    },
    {
        "name": "Caroline Calvano",
        "type": "Mixed Media Sculpture Artist",
        "location": "Milwaukee, WI",
        "paras": [
            "Caroline Calvano is a mixed media sculpture artist based in Milwaukee, WI. She completed her Bachelors in Fine Arts at Milwaukee Institute of Art and Design in 2024. Her practice engages with the themes of beauty, adornment, value and function. Calvano explores the feminine urge to beautify through body modification and the discomfort of self alteration. She asserts her physical strength within traditionally male dominated crafts such as metal sculpture.",
            "Calvano has exhibited her work at Var Gallery, Tooth and Nail Gallery, and The Door County Contemporary Art Fair. She has been awarded Outstanding Student Achievement in Contemporary Sculpture Award by The International Sculpture Center."
        ],
        "status": "Available for Projects, Commissions, and Collaboration",
        "link": "",
        "src": "/images/Calvano_Headshot.jpg"
    },
    {
        "name": "Gaia Mencagli",
        "type": "Theater Artist",
        "location": "Rome, Italy",
        "paras": [
            "Gaia Mencagli is an Italian-Danish theater artist, trained at the Dell’Arte International School of Physical Theatre in California after studying in Denmark and Italy. From 2018 to 2020, she lived in Minneapolis, where she performed, taught, and developed her first solo piece, “It’s Red!”. After moving to Trieste in 2021, she collaborated with Hangar Teatri, debuting with “Stories of Eggs and Flour” and teaching theater. She continued her artistic research through residencies at the Grotowski Institute in Poland, CSS in Udine, TRAC in Puglia, Corte Ospitale in Emilia Romagna, and has completed a two- year training in Danza Sensibile.",
            "As a puppeteer at Teatro Stabile del F.V.G., she brings puppet theater to schools and performs in regional and international tours. She is also co- founder of the non-profit KER, creating projects that merge art and agriculture near Rome. Although based in Italy, she maintains international collaborations, performing at the H.C. Andersen Festival in Denmark and touring the United States thanks to the Italian Cultural Institute of Chicago, San Francisco, and Los Angeles."
        ],
        "status": "Available for Booking, Commissions, Residencies, and Collaboration",
        "link": "",
        "src": "/images/Gaia.jpg"
    }
];
}),
57339, ((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/src/components/App.tsx [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
var __TURBOPACK__imported__module__22016__ = __turbopack_context__.i(22016);
var __TURBOPACK__imported__module__11166__ = __turbopack_context__.i(11166);
var __TURBOPACK__imported__module__97363__ = __turbopack_context__.i(97363);
// MERGED MODULE: [project]/src/images/leftmountain.png.mjs { IMAGE => "[project]/src/images/leftmountain.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__45438__ = __turbopack_context__.i(45438);
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__45438__["default"],
    width: 500,
    height: 200,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR42gFjAJz/AAYHBwQRExINFxkYEhocGxUlKScbICMiGSQnJhobHh0RAEhPTBZcZWIqaHJuLXJ9eDRtd3Msb3l1MWp0cClVXlseAAYHBgAGBwcACQoKAQ0ODQEHCAgACQoKAQcICAADAwMAJqsO6cgHvdwAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/sandyyy.png.mjs { IMAGE => "[project]/src/images/sandyyy.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__34575__ = __turbopack_context__.i(34575);
;
const __TURBOPACK__default__export__1 = {
    src: __TURBOPACK__imported__module__34575__["default"],
    width: 1200,
    height: 800,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAUElEQVR42jXLWw7AIAhEUfa/tlZQRx6upmNMyQkf3CDaXtPHrOmvaeMIpgE0rok+hvWukoFMWpHr7ID7xBpSufYmr6uYT5PNUGDj6eB3IHx+HbRjjfuQdZcAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/Arrowright.png.mjs { IMAGE => "[project]/src/images/Arrowright.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__23474__ = __turbopack_context__.i(23474);
;
const __TURBOPACK__default__export__2 = {
    src: __TURBOPACK__imported__module__23474__["default"],
    width: 500,
    height: 200,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAQklEQVR42l2MSxKAIAxDm4QWgY5u4P5X9bNwHLNM8p7ZL4VgVtV9U58Z6ykJAwG4oBEMAXyJmb6OVkZzRr/G+/w1nj7yAU1P1PoYAAAAAElFTkSuQmCC"
};
// MERGED MODULE: [project]/src/images/Arrowleft.png.mjs { IMAGE => "[project]/src/images/Arrowleft.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__14780__ = __turbopack_context__.i(14780);
;
const __TURBOPACK__default__export__3 = {
    src: __TURBOPACK__imported__module__14780__["default"],
    width: 500,
    height: 200,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAPklEQVR42nWLMQ7AIAzEchcSWkrFAPz/qyhiYcGLF1t6tfFnLUqQAMKAQE5MoTnRitMf245YbsTQ3vSN6nMBP58BR494HrkAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/partnerwhite.png.mjs { IMAGE => "[project]/src/images/partnerwhite.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__34400__ = __turbopack_context__.i(34400);
;
const __TURBOPACK__default__export__4 = {
    src: __TURBOPACK__imported__module__34400__["default"],
    width: 500,
    height: 500,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAZUlEQVR42qWNvQ6AIAyERVuhhFg6GCVhYyDh/R9QwGCc9Zb2vv7cNH2VUuputNaAiPMArVa/GGOgs2G89xRjlBDC5pzT7bBy7AvW2rUOOOd8lFJOZiYAaF/Vk0lEmFLaRcS++X9dWycEw1L0F6sAAAAASUVORK5CYII="
};
// MERGED MODULE: [project]/src/images/culturewhite.png.mjs { IMAGE => "[project]/src/images/culturewhite.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__65664__ = __turbopack_context__.i(65664);
;
const __TURBOPACK__default__export__5 = {
    src: __TURBOPACK__imported__module__65664__["default"],
    width: 500,
    height: 500,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAgUlEQVR42oWOSw7DIAxECVAXEBgK4iPE/c9ZJouozSYjjQz288hC/EhKecDirmMrhGBSSi7G6Lz37z9Aay1302Cw1sq9d3bO0QWUUvyc8zPGSMxs8W+t8QUgvtYaEA8Dyjn7c2itJcRjAyDegIhInwcrpSSOREXTGENY2n6hiid9AdEMBz5vQ5GdAAAAAElFTkSuQmCC"
};
// MERGED MODULE: [project]/src/images/artistwhite.png.mjs { IMAGE => "[project]/src/images/artistwhite.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__40267__ = __turbopack_context__.i(40267);
;
const __TURBOPACK__default__export__6 = {
    src: __TURBOPACK__imported__module__40267__["default"],
    width: 500,
    height: 500,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAjUlEQVR42nWPwQoCIRBAbdt10wwzBUvB7ZCgN/Uigv//XWl0CHIfCM7Mm2EGgB8OX8CIXmCMnSmleCgghGAIYdNa3/6mYIyhUopZa+8xxo1zTqSU1xY/PoIxhqeUnt57XUqxtVbXcqKLAEI4CyEuzjmVc361TkoIOa3rOvcHlmU59k+TSFsQTdM0vmKPN7VMC8vmZicbAAAAAElFTkSuQmCC"
};
// MERGED MODULE: [project]/src/images/mountains.jpg.mjs { IMAGE => "[project]/src/images/mountains.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__55178__ = __turbopack_context__.i(55178);
;
const __TURBOPACK__default__export__7 = {
    src: __TURBOPACK__imported__module__55178__["default"],
    width: 1500,
    height: 1000,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAFAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDL8V65cx2KqFUK+VwuRx71o79znsmf/9k="
};
// MERGED MODULE: [project]/src/images/dessert.jpg.mjs { IMAGE => "[project]/src/images/dessert.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__45165__ = __turbopack_context__.i(45165);
;
const __TURBOPACK__default__export__8 = {
    src: __TURBOPACK__imported__module__45165__["default"],
    width: 1440,
    height: 1002,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAGAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCjH40uJ1McdjaKwXOShP8AWun6zWv8Rx/VqPY//9k="
};
// MERGED MODULE: [project]/src/images/beach.jpg.mjs { IMAGE => "[project]/src/images/beach.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__74618__ = __turbopack_context__.i(74618);
;
const __TURBOPACK__default__export__9 = {
    src: __TURBOPACK__imported__module__74618__["default"],
    width: 1500,
    height: 1125,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAGAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOvk023jYiOc87SuRgk9K9CpjFL7JxwoS7n//Z"
};
// MERGED MODULE: [project]/src/images/wisco.jpg.mjs { IMAGE => "[project]/src/images/wisco.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__31781__ = __turbopack_context__.i(31781);
;
const __TURBOPACK__default__export__10 = {
    src: __TURBOPACK__imported__module__31781__["default"],
    width: 1500,
    height: 1003,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAFAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBrtJNGJS2BwNmOPr+leTKSpNJIptz3P//Z"
};
// MERGED MODULE: [project]/src/images/locationIcon.png.mjs { IMAGE => "[project]/src/images/locationIcon.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__36406__ = __turbopack_context__.i(36406);
;
const __TURBOPACK__default__export__11 = {
    src: __TURBOPACK__imported__module__36406__["default"],
    width: 601,
    height: 794,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAtUlEQVR42i2JUQqCMACGR5B5h3pNH2K+N4+ReYcSakuhNnwJFkok3kM9Stt8UU9QnqG3NuqDD36+H9i2PaOUnsdxfGnfjLGLbjZACK37vu+iKNprd8MwdL7vIxAEwUYpJRc/5nqLMAy3wHGcpTmapqnquq7atlWu6zpgosEYHz5/CCHYNGBZ1hRCuBJCPKWUwvM8aBrgnF+TJCFxHB+1WO+TaaAoinue57c0TZmWZlnGy7J8fAHtSVkvtH8KhgAAAABJRU5ErkJggg=="
};
// MERGED MODULE: [project]/src/images/saverDesktopjp.jpg.mjs { IMAGE => "[project]/src/images/saverDesktopjp.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__12834__ = __turbopack_context__.i(12834);
;
const __TURBOPACK__default__export__12 = {
    src: __TURBOPACK__imported__module__12834__["default"],
    width: 2880,
    height: 1601,
    blurWidth: 8,
    blurHeight: 4,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAEAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDi1u5TBsJGM56d6kR//9k="
};
// MERGED MODULE: [project]/src/images/mobilesaverjp.jpg.mjs { IMAGE => "[project]/src/images/mobilesaverjp.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__89850__ = __turbopack_context__.i(89850);
;
const __TURBOPACK__default__export__13 = {
    src: __TURBOPACK__imported__module__89850__["default"],
    width: 2880,
    height: 1611,
    blurWidth: 8,
    blurHeight: 4,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAEAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDilu5TDsJGM5zjmpEf/9k="
};
// MERGED MODULE: [project]/src/images/eventoverhead.jpg.mjs { IMAGE => "[project]/src/images/eventoverhead.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__41186__ = __turbopack_context__.i(41186);
;
const __TURBOPACK__default__export__14 = {
    src: __TURBOPACK__imported__module__41186__["default"],
    width: 3699,
    height: 2774,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAGAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDEtIhPvK/KwG5j3I9K4YyXs0mVyxettT//2Q=="
};
// MERGED MODULE: [project]/src/images/biopic.jpg.mjs { IMAGE => "[project]/src/images/biopic.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__74441__ = __turbopack_context__.i(74441);
;
const __TURBOPACK__default__export__15 = {
    src: __TURBOPACK__imported__module__74441__["default"],
    width: 1001,
    height: 900,
    blurWidth: 8,
    blurHeight: 7,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAHAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDltY1O1jVLmytv9GuIMgOcFW3Z6dOnFZtXujZNxSkf/9k="
};
var __TURBOPACK__imported__module__75751__ = __turbopack_context__.i(75751);
// MERGED MODULE: [project]/src/images/Calvano_Headshot.jpg.mjs { IMAGE => "[project]/src/images/Calvano_Headshot.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__89118__ = __turbopack_context__.i(89118);
;
const __TURBOPACK__default__export__16 = {
    src: __TURBOPACK__imported__module__89118__["default"],
    width: 613,
    height: 688,
    blurWidth: 7,
    blurHeight: 8,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAIAAcDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDIvreeDRLecQgRbj5khxjJ6e9YRk/atBKFP6tF21P/2Q=="
};
// MERGED MODULE: [project]/src/images/Gaia.jpg.mjs { IMAGE => "[project]/src/images/Gaia.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)
;
var __TURBOPACK__imported__module__33127__ = __turbopack_context__.i(33127);
;
const __TURBOPACK__default__export__17 = {
    src: __TURBOPACK__imported__module__33127__["default"],
    width: 1999,
    height: 2021,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAIAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDPstRV8wrbMRG7Kzkcdse3rRFu521sMoUlNS10/E//2Q=="
};
var __TURBOPACK__imported__module__96199__ = __turbopack_context__.i(96199);
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
var __TURBOPACK__imported__module__87652__ = __turbopack_context__.i(87652);
// MERGED MODULE: [project]/src/components/Nav.tsx [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__1 = __TURBOPACK__imported__module__43476__;
var __TURBOPACK__imported__module__22016__1 = __TURBOPACK__imported__module__22016__;
var __TURBOPACK__imported__module__71645__1 = __TURBOPACK__imported__module__71645__;
var __TURBOPACK__imported__module__35375__ = __turbopack_context__.i(35375);
"use client";
;
;
;
;
function Nav() {
    const [showExperienceNav, setShowExperienceNav] = (0, __TURBOPACK__imported__module__71645__1["useState"])(false);
    const [showAboutNav, setShowAboutNav] = (0, __TURBOPACK__imported__module__71645__1["useState"])(false);
    const [showMobileMenu, setShowMobileMenu] = (0, __TURBOPACK__imported__module__71645__1["useState"])(false);
    const [showNav, setShowNav] = (0, __TURBOPACK__imported__module__71645__1["useState"])(true);
    const [scrollUp, setScrollUp] = (0, __TURBOPACK__imported__module__71645__1["useState"])(0);
    const [originalScroll, setOriginalScroll] = (0, __TURBOPACK__imported__module__71645__1["useState"])(0);
    (0, __TURBOPACK__imported__module__71645__1["useEffect"])(()=>{
        let timeoutRef = null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const handleScrollUp = ()=>{
            setScrollUp(window.scrollY);
            if (scrollUp > originalScroll) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            timeoutRef = setTimeout(()=>{
                setOriginalScroll(scrollUp);
            }, 0.5);
        };
        window.addEventListener("scroll", handleScrollUp, {
            passive: true
        });
        return ()=>{
            removeEventListener("scroll", handleScrollUp);
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        };
    }, [
        scrollUp,
        originalScroll
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("div", {
                className: `flex flex-col transition-all ease-in-out duration-200 md:hidden bg-[rgba(10,25,15,0.9)] justify-end h-15 w-full fixed top-0 right-0 z-40 px-6 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                            className: "flex flex-row justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("div", {
                                    className: "mb-auto pb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                        href: "/",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("img", {
                                            className: "max-w-[90px] opacity-90",
                                            src: __TURBOPACK__imported__module__35375__["default"].src
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("button", {
                                    id: "mobile-menu-button",
                                    type: "button",
                                    className: "text-[rgb(253,240,214)] w-auto bg-transparent focus:outline-none cursor-pointer justify-self-end",
                                    onClick: ()=>{
                                        setShowMobileMenu(!showMobileMenu);
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("svg", {
                                        className: "h-10 w-10",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M4 6h16M4 12h16M4 18h16"
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                            className: `bg-[rgba(10,25,15,0.7)] fixed -ml-4 top-15 text-[rgb(253,240,214)] flex-col flex p-3 w-full text-xl gap-2 rounded-b-lg transition-all ease-in-out ${showMobileMenu ? "visible opacity-100" : "hidden invisible opacity-0"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    id: "montFont",
                                    href: "/",
                                    children: "HOME"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("hr", {}),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/residencies",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "RESIDENCIES"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/experiences",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "EXPERIENCES"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/memberships",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "MEMBERSHIPS"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("hr", {}),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/destinations",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "DESTINATIONS"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/contact",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "CONTACT/APPLY"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                    href: "/about",
                                    className: "hover:text-[#88572c] cursor-pointer",
                                    children: "ABOUT"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                className: `hidden w-full md:flex transition-all duration-200 ease-in-out bg-[rgba(10,25,15,0.7)] h-20 justify-between fixed top-0 right-0 z-40 ${showNav ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("div", {
                        className: "pl-15 mb-auto pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                            href: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("img", {
                                className: "max-w-[110px] opacity-90",
                                src: __TURBOPACK__imported__module__35375__["default"].src
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                        className: "flex justify-end w-full gap-16 py-6.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                                className: "text-xl montserrat",
                                onMouseOver: ()=>setShowExperienceNav(true),
                                onMouseOut: ()=>setShowExperienceNav(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("div", {
                                        className: `uppercase hover:cursor-pointer ${showExperienceNav ? "text-[#88572c]" : "text-[rgb(253,240,214)] hover:text-[#88572c]"}`,
                                        children: "JOIN Revolūtiō"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                                        className: `bg-[rgba(10,25,15,0.9)] mr-10 text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg ${showExperienceNav ? "visible opacity-100" : "invisible opacity-0"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/experiences",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "EXPERIENCES"
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/residencies",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "RESIDENCIES"
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/memberships",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "MEMBERSHIPS"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                                className: "text-xl montserrat",
                                onMouseOver: ()=>setShowAboutNav(true),
                                onMouseOut: ()=>setShowAboutNav(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])("div", {
                                        className: ` hover:cursor-pointer ${showAboutNav ? "text-[#88572c]" : "text-[rgb(253,240,214)] hover:text-[#88572c]"}`,
                                        children: "ABOUT"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsxs"])("div", {
                                        className: `bg-[rgba(10,25,15,0.9)] mr-10 text-[#88572c] flex-col flex p-3 text-xl gap-2 rounded-lg ${showAboutNav ? "visible opacity-100" : "invisible opacity-0"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/destinations",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "DESTINATIONS"
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/contact",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "CONTACT/APPLY"
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__1["jsx"])(__TURBOPACK__imported__module__22016__1["default"], {
                                                href: "/about",
                                                className: "text-[rgb(253,240,214)] hover:text-[#88572c] hover:cursor-pointer text-xl montserrat",
                                                children: "ABOUT"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
// MERGED MODULE: [project]/src/components/Footer.tsx [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__2 = __TURBOPACK__imported__module__43476__;
var __TURBOPACK__imported__module__22016__2 = __TURBOPACK__imported__module__22016__;
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
        className: "bg-[rgb(10,25,15)] -mt-6 text-[rgb(253,240,214)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
                className: "grid gap-6 md:grid-cols-2 relative w-full px-4 lg:px-20 pt-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
                        className: "lg:border-r border-[rgb(253,240,214)] p-8 my-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                className: "mb-8 mt-2 xl:mt-6 grid gap-6 text-[30px] md:text-[40px] tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center m-auto uppercase",
                                children: "Revolūtiō Global Culture Club"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
                                className: "flex-col md:flex-row flex mb-6 text-xl w-full justify-between text-[rgb(253,240,214)] text-center m-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                        children: "Story."
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                        children: "Culture."
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                        children: "Connection."
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                        children: "Experience."
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                                className: "underline uppercase flex text-center text-[rgb(253,240,214)] justify-center underline-offset-8 text-xl tracking-wide sm:tracking-[0.35em] pb-6",
                                children: "Navigation"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsxs"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 text-center text-[rgb(253,240,214)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/",
                                        children: "Home"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/experiences",
                                        children: "Experiences"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/experiences",
                                        children: "Residencies"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/experiences",
                                        children: "Memberships"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/destinations",
                                        children: "Destinations"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/about",
                                        children: "About"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])(__TURBOPACK__imported__module__22016__2["default"], {
                                        className: "p-2 rounded-lg lg:p-6 transition-all hover:cursor-pointer ease-in-out hover:border-transparent hover:text-[rgb(10,25,15)] hover:bg-[rgb(253,240,214)]",
                                        href: "/contact",
                                        children: "Contact/Apply"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__2["jsx"])("div", {
                className: "text-center m-auto p-6",
                children: "Revolūtiō Global Culture Club © 2026 Beth Willner. All Rights Reserved."
            })
        ]
    });
}
var __TURBOPACK__imported__module__38080__ = __turbopack_context__.i(38080);
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    const artistsData = __TURBOPACK__imported__module__38080__["default"];
    const [selectedArtist, setSelectedArtist] = (0, __TURBOPACK__imported__module__71645__["useState"])(artistsData[0] ? artistsData[0].name : "Thomas Dijkstra");
    const getArtistImage = (artistName)=>{
        if (artistName === "Caroline Calvano") {
            return {
                src: __TURBOPACK__default__export__16.src
            };
        } else if (artistName === "Gaia Mencagli") {
            return {
                src: __TURBOPACK__default__export__17.src
            };
        } else {
            return {
                src: __TURBOPACK__default__export__15.src
            };
        }
    };
    (0, __TURBOPACK__imported__module__71645__["useEffect"])(()=>{
        // "instant" prevents jerky scrolling animations during a loader swap
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, []);
    const pageState = "long";
    const [selectedPath, setSelectedPath] = (0, __TURBOPACK__imported__module__71645__["useState"])("artist");
    const [world, setWorld] = (0, __TURBOPACK__imported__module__71645__["useState"])("beach");
    // const [showRLoad, setShowRLoad] = useState(showIntro ?? true);
    const [showRevolLoad, setShowRevolLoad] = (0, __TURBOPACK__imported__module__71645__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__71645__["useRef"])(null);
    const artistRef = (0, __TURBOPACK__imported__module__71645__["useRef"])(null);
    const handleScroll = (refName)=>{
        refName.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const isInView = (0, __TURBOPACK__imported__module__87652__["useInView"])(videoRef);
    // useEffect(() => {
    // 	if (showRLoad) {
    // 		document.body.style.overflow = "hidden";
    // 		// Timer 1: Show the div after 2.5 seconds
    // 		const showTimer = setTimeout(() => {
    // 			setShowRLoad(false);
    // 			setShowRevolLoad(true);
    // 		}, 3000); // 2500 milliseconds = 2.5 seconds
    // 		// Timer 2: Hide the div after 5 seconds total
    // 		const hideTimer = setTimeout(() => {
    // 			setShowRevolLoad(false);
    // 			document.body.style.overflow = "auto";
    // 		}, 5000); // 5000 milliseconds = 5 seconds
    // 		// Clean up both timers to avoid memory leaks if the user navigates away
    // 		return () => {
    // 			clearTimeout(showTimer);
    // 			clearTimeout(hideTimer);
    // 		};
    // 	}
    // }, []);
    const getBg = ()=>{
        if (world === "beach") {
            return __TURBOPACK__default__export__9;
        } else if (world === "wisco") {
            return __TURBOPACK__default__export__10;
        } else if (world === "mountains") {
            return __TURBOPACK__default__export__7;
        } else if (world === "dessert") {
            return __TURBOPACK__default__export__8;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
            className: "w-full mx-auto",
            style: {
                fontFamily: "'Montserrat', sans-serif"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                    className: "center text-2xl",
                    style: {
                        fontFamily: "'Montserrat', sans-serif"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "block lg:hidden absolute top-0 right-0 left-0 w-full h-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("video", {
                                    className: "w-full h-140 sm:h-200 object-cover",
                                    autoPlay: true,
                                    loop: true,
                                    muted: true,
                                    playsInline: true,
                                    poster: __TURBOPACK__default__export__13.src,
                                    preload: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("source", {
                                        src: __TURBOPACK__imported__module__97363__["default"],
                                        type: "video/mp4"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                className: "hidden lg:block absolute top-0 right-0 left-0 w-full h-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("video", {
                                    className: "w-full h-200 object-cover",
                                    autoPlay: true,
                                    loop: true,
                                    muted: true,
                                    playsInline: true,
                                    poster: __TURBOPACK__default__export__12.src,
                                    preload: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("source", {
                                        src: __TURBOPACK__imported__module__11166__["default"],
                                        type: "video/mp4"
                                    })
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                    className: "mt-137.5 sm:mt-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            className: "bg-gradient-to-b from-[rgb(10,25,15)] to-[rgb(253,240,214)] px-4 md:px-6 py-16 justify-center flex flex-col pb-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                    className: "mb-20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])(__TURBOPACK__imported__module__43476__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                        className: "w-40 h-full max-h-20 object-contain mx-auto",
                                                        src: __TURBOPACK__default__export__.src
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "my-6 text-4xl md:text-5xl hidden lg:flex flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center uppercase",
                                                        children: [
                                                            "Global Culture Club",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"
                                                            }),
                                                            "Artist Residency",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"
                                                            }),
                                                            "Community Consultancy"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "my-6 text-4xl md:text-5xl flex lg:hidden flex-col gap-y-2 items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center uppercase",
                                                        children: [
                                                            "Revolūtiō Global Culture Club",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"
                                                            }),
                                                            "Artist Residency",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                className: "border-b m-4 border-2 border-[#a86933] max-w-[50px] w-full"
                                                            }),
                                                            "Community Consultancy"
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            delayVal: 0.8,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])(__TURBOPACK__imported__module__43476__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "text-xl md:text-2xl text-[rgb(253,191,133)] md:mx-10 text-center mb-8",
                                                        children: "Meaningful travel, artist residencies, cultural experiences, events, and creative partnerships across the sea, woods, desert, and mountains."
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "mb-8 text-base italic sm:text-xl text-[rgb(253,240,214)] mx-auto max-w-200 text-center",
                                                        children: "We personally curate local, cultural, all-inclusive experiences rooted in story, music, food, art, nature, and community."
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "flex flex-col lg:flex-row gap-6 items-center justify-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                className: "p-2 sm:p-4 text-xl rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer",
                                                                href: "/experiences",
                                                                children: "Plan My Experience"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                className: "p-2 sm:p-4 text-xl rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer",
                                                                href: "/residencies",
                                                                children: "Explore Residencies"
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                className: "p-2 sm:p-4 text-xl rounded-lg bg-[#a86933] hover:bg-[#a57245] text-[rgb(253,240,214)] cursor-pointer",
                                                                href: "/memberships",
                                                                children: "Join the Culture Club"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("hr", {
                                    className: "mb-20"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            xVal: -200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "flex flex-col items-center justify-center py-4 md:py-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "my-6 text-[40px] sm:text-5xl xl:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase",
                                                        children: "What is Revolūtiō?"
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "text-[rgb(23,57,35)] text-lg sm:text-xl",
                                                        children: [
                                                            "A More Personal Way to ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "Travel"
                                                            }),
                                                            ",",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "Create"
                                                            }),
                                                            ", and ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "Connect"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            xVal: 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "py-4 md:py-6 border-b border-b-[rgb(31,73,45)] text-center text-lg sm:text-xl text-[rgb(20,48,29)]",
                                                        children: [
                                                            "Revolūtiō is a ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "global"
                                                            }),
                                                            " culture club for people who want travel to feel more ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "human"
                                                            }),
                                                            ", more ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "local"
                                                            }),
                                                            ", and more",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "meaningful"
                                                            }),
                                                            "."
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "py-4 md:py-6 border-b border-b-[rgb(31,73,45)] text-center text-lg sm:text-xl text-[rgb(20,48,29)]",
                                                        children: [
                                                            "We create curated ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "experiences"
                                                            }),
                                                            " that",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "connect"
                                                            }),
                                                            " guests with artists, hosts, chefs, musicians, guides, cultural workers, and communities."
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "py-4 md:py-6 border-b border-b-[rgb(31,73,45)] text-center text-lg sm:text-xl text-[rgb(20,48,29)]",
                                                        children: [
                                                            "Whether you are planning a restorative retreat, an artist residency, a private celebration, a creative journey, or a deeper cultural experience, ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                children: "Revolūtiō"
                                                            }),
                                                            " helps design the right path for you."
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                            className: "bg-[rgb(253,240,214)] h-2"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            className: "pt-4 md:pt-6 px-4 md:px-6 pb-20",
                            style: {
                                backgroundImage: `linear-gradient(to bottom, rgba(253,240,214), rgba(253,240,214,0) 100%), url(${__TURBOPACK__default__export__1.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                    className: "flex flex-row mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            className: "hidden! lg:flex!",
                                            xVal: -200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                className: "w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]",
                                                src: __TURBOPACK__default__export__2.src
                                            })
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                className: "my-16 md:mx-auto lg:m-0 text-5xl xl:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center uppercase",
                                                children: "Choose Your Path"
                                            })
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                            className: "hidden! lg:flex!",
                                            xVal: 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                src: __TURBOPACK__default__export__3.src,
                                                className: "w-full h-auto hidden lg:block max-w-[400px] max-h-[100px] xl:max-h-[150px]"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                        delayVal: 1,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "flex flex-col items-center justify-center mx-auto max-w-[680px] w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: "flex flex-nowrap items-stretch justify-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `p-2 sm:p-4 rounded-tl-lg transition-all border-r border-r-[rgb(253,240,214)] ease-in-out cursor-pointer text-[rgb(253,240,214)] duration-200
                                        ${selectedPath === "artist" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`,
                                                            onClick: ()=>{
                                                                setSelectedPath("artist");
                                                            },
                                                            children: "I Am an Artist"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `p-2 sm:p-4 transition-all ease-in-out border-r border-r-[rgb(253,240,214)] cursor-pointer text-[rgb(253,240,214)] duration-200
                                        ${selectedPath === "join" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`,
                                                            onClick: ()=>{
                                                                setSelectedPath("join");
                                                            },
                                                            children: "I Want to Join the Culture Club"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `p-2 sm:p-4 rounded-tr-lg transition-all border-r border-r-[rgb(253,240,214)] ease-in-out cursor-pointer text-[rgb(253,240,214)] duration-200
                                        ${selectedPath === "partner" ? "bg-[#a86933]!" : "bg-[#a47f5e]! opacity-70"}`,
                                                            onClick: ()=>{
                                                                setSelectedPath("partner");
                                                            },
                                                            children: "I Want to Partner or Consult"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: "relative w-full p-4 md:p-6 rounded-b-lg bg-[#a86933]! text-[rgb(253,240,214)] flex-col flex-grow flex items-center justify-center min-h-[600px] sm:min-h-[450px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: `absolute inset-0 justify-center flex flex-col p-4 md:p-6 py-0 sm:py-4 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "artist" ? "z-100 opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                                    className: "mx-auto",
                                                                    src: __TURBOPACK__default__export__6.src,
                                                                    style: {
                                                                        height: "200px",
                                                                        width: "200px"
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "text-xl mb-2 text-center",
                                                                    children: "Artist residencies for musicians, writers, filmmakers, photographers, visual artists, performers, and creative entrepreneurs seeking space to create, connect, and share work."
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                    className: "p-2 z-200 pointer-events-auto mx-auto hover:cursor-pointer bg-[rgb(253,240,214)] hover:bg-[rgb(253,240,214)] text-[#a86933] rounded-lg w-max",
                                                                    href: "/residencies",
                                                                    children: "Learn More About Residencies"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: `absolute inset-0 justify-center flex flex-col p-4 md:p-6 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "join" ? "z-100 opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                                    className: "mx-auto",
                                                                    src: __TURBOPACK__default__export__5.src,
                                                                    style: {
                                                                        height: "200px",
                                                                        width: "200px"
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "text-xl mb-2 text-center",
                                                                    children: "Memberships for those who want ongoing access to curated experiences, entertainment, travel planning, events, artist showcases, and cultural opportunities."
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                    className: "p-2 z-200 pointer-events-auto mx-auto hover:cursor-pointer bg-[rgb(253,240,214)] hover:bg-[rgb(253,240,214)] text-[#a86933] rounded-lg w-max",
                                                                    href: "/memberships",
                                                                    children: "Join the Culture Club"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: `absolute inset-0 justify-center flex flex-col p-4 md:p-6 m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${selectedPath === "partner" ? "z-100 opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                                    className: "mx-auto",
                                                                    src: __TURBOPACK__default__export__4.src,
                                                                    style: {
                                                                        height: "200px",
                                                                        width: "200px"
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "text-xl mb-2 text-center",
                                                                    children: "Partnerships for property owners, venues, nonprofits, municipalities, artists, organizations, and businesses seeking programming, events, funding strategy, creative direction, or cultural development."
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                    className: "p-2 z-200 pointer-events-auto mx-auto hover:cursor-pointer bg-[rgb(253,240,214)] hover:bg-[rgb(253,240,214)] text-[#a86933] rounded-lg w-max",
                                                                    href: "/contact?form=Partner",
                                                                    children: "Work With Revolūtiō"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                            id: "container",
                            className: "px-1 z-30 px-4 md:px-6 relative py-20 bg-radial from-[rgb(10,25,15)] via-[rgb(10,25,15)] to-[rgb(31,73,45)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    delayVal: 0.5,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "my-6 text-5xl md:text-6xl flex items-center justify-center tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center uppercase",
                                        children: "The Four Worlds"
                                    })
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("hr", {
                                    className: "text-[rgb(86,109,94)] mb-6"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                    delayVal: 1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "w-full overflow-auto left-0 p-4 md:p-6 rounded-lg max-w-[calc(100%-36px)] lg:max-w-[80%] h-auto min-h-[600px] sm:min-h-[500px] flex flex-col justify-center items-center mx-auto transition-all ease-in-out duration-100",
                                        style: {
                                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${getBg().src})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "bottom"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "relative w-full flex-grow flex text-[rgb(253,240,214)] items-center justify-center min-h-[600px] sm:min-h-[500px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: `absolute inset-0 justify-center flex flex-col m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "beach" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                            src: __TURBOPACK__default__export__11.src,
                                                            style: {
                                                                height: "70px",
                                                                width: "auto",
                                                                opacity: "0.7"
                                                            },
                                                            loading: "lazy"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-2xl sm:text-3xl font-bold",
                                                            children: "Yucatán, Mexico"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-lg sm:text-xl md:text-2xl  font-medium",
                                                            children: "Creative residencies, coastal retreats, cultural exchange, food, music, wellness, nature, and beachside experiences."
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-xl sm:text-2xl  font-medium",
                                                            children: "Status: Year One Booking Focus"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: `absolute inset-0 flex justify-center flex-col m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "wisco" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                            src: __TURBOPACK__default__export__11.src,
                                                            style: {
                                                                height: "70px",
                                                                width: "auto",
                                                                opacity: "0.7"
                                                            },
                                                            loading: "lazy"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-2xl sm:text-3xl font-bold",
                                                            children: "Phelps, Land O’ Lakes, Watersmeet, and the UP"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-lg sm:text-xl md:text-2xl font-medium",
                                                            children: "Recording retreats, rural creative economy, storytelling, seasonal events, forest gatherings, music, and community-rooted programming."
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-xl sm:text-2xl font-medium",
                                                            children: "Status: Year One Booking Focus"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: `absolute inset-0 flex flex-col text-[rgb(253,240,214)] justify-center m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "mountains" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                            src: __TURBOPACK__default__export__11.src,
                                                            style: {
                                                                height: "70px",
                                                                width: "auto",
                                                                opacity: "0.7"
                                                            },
                                                            loading: "lazy"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-2xl sm:text-3xl font-bold",
                                                            children: "Guatemala"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-lg sm:text-xl  md:text-2xl font-medium",
                                                            children: "Future creative retreats, cultural exchange, textiles, ecology, music, food, and artist residencies rooted in local partnership."
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-xl sm:text-2xl font-medium",
                                                            children: "Status: Year Two / In Development"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: `absolute inset-0 flex flex-col text-[rgb(253,240,214)] justify-center m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none ${world === "dessert" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                            src: __TURBOPACK__default__export__11.src,
                                                            style: {
                                                                height: "70px",
                                                                width: "auto",
                                                                opacity: "0.7"
                                                            },
                                                            loading: "lazy"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-2xl sm:text-3xl font-bold",
                                                            children: "Northern Arizona, Navajo and Hopi Land"
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-lg sm:text-xl md:text-2xl font-medium",
                                                            children: "Locally led cultural experiences, entrepreneurship, storytelling, artist exchange, and creative economy partnerships."
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "text-xl sm:text-2xl font-medium",
                                                            children: "Status: Year Two / In Development"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: "flex flex-row flex-nowrap gap-10 sm:gap-15 justify-center items-center mx-auto mt-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${world === "beach" ? "border-10" : "border-2"}`,
                                                            onClick: ()=>{
                                                                if (world !== "beach") {
                                                                    setWorld("beach");
                                                                }
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${world === "wisco" ? "border-10" : "border-2"}`,
                                                            onClick: ()=>{
                                                                if (world !== "wisco") {
                                                                    setWorld("wisco");
                                                                }
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${world === "mountains" ? "border-10" : "border-2"}`,
                                                            onClick: ()=>{
                                                                if (world !== "mountains") {
                                                                    setWorld("mountains");
                                                                }
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                            className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${world === "dessert" ? "border-10" : "border-2"}`,
                                                            onClick: ()=>{
                                                                if (world !== "dessert") {
                                                                    setWorld("dessert");
                                                                }
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                            className: "relative w-full min-h-[200vh]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                        className: "relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                            className: "py-20 bg-cover px-4 md:px-6 bg-fixed bg-linear-to-b to-[#3d5e47] from-[#18281d] bg-no-repeat min-h-screen h-full",
                                            style: {
                                                backgroundColor: "#18281d",
                                                backgroundImage: `linear-gradient(rgba(10,25,15,0.6), rgba(10,25,15,0.6)), url(${__TURBOPACK__default__export__14.src})`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "mt-2 xl:mt-6 text-[30px] sm:text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                        children: "Events"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "mt-2 xl:mt-6 text-[24px] pb-3 border-b sm:text-2xl md:text-3xl xl:text-4xl flex text-[rgb(253,240,214)] text-center justify-center items-center",
                                                        children: "Gatherings That Bring Culture to Life"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                    className: "grid md:grid-cols-2 p-6 gap-6 bg-[rgba(35,49,38,0.56)] border-b border-b-[rgb(253,240,214)]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "xl:mt-6 p-3 flex flex-col text-[rgb(253,240,214)] text-center justify-center items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "text-xl uppercase md:text-2xl pb-6 flex tracking-wide sm:tracking-[0.35em]",
                                                                        children: "Event types:"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                                                        className: "grid md:grid-cols-2 gap-6 text-base md:text-xl font-bold",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Live music nights"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Chef dinners"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Art openings"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Creative markets"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Songwriter circles"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Recording retreats"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Seasonal festivals"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Cultural exchange events"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Residency showcases"
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                                children: "Wellness and nature-based gatherings"
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "flex flex-col justify-center gap-8 m-auto items-center text-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "bg-[rgb(253,240,214)] p-2 sm:p-4 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[rgb(253,240,214)] hover:border-[rgb(253,240,214)]",
                                                                        children: "See Upcoming Events"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "block sm:hidden bg-[rgb(253,240,214)] p-2 sm:p-4 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent whitespace-break-spaces transition-all ease-in-out hover:bg-transparent hover:text-[rgb(253,240,214)] hover:border-[rgb(253,240,214)]",
                                                                        children: "Host an Event"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                        className: "hidden sm:block bg-[rgb(253,240,214)] p-2 sm:p-4 w-max text-xl rounded-lg hover:cursor-pointer border border-transparent whitespace-break-spaces transition-all ease-in-out hover:bg-transparent hover:text-[rgb(253,240,214)] hover:border-[rgb(253,240,214)]",
                                                                        children: "Host an Event With Revolūtiō"
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                        className: "bg-gradient-to-b to-[rgb(10,25,15)] from-[rgb(253,240,214)] py-20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "my-20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "carousel flex overflow-x-hidden pointer-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "group text-[rgb(10,25,15)] min-w-full text-2xl whitespace-nowrap flex shrink-0 items-center justify-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Creative Direction"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Programming"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Funding Strategy"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Cultural Development"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "group min-w-full text-2xl whitespace-nowrap flex shrink-0 items-center justify-center",
                                                                "aria-hidden": true,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Creative Direction"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Programming"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Funding Strategy"
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                        className: "border-r border-r-[rgb(189,123,43)] px-36",
                                                                        style: {
                                                                            width: "100%",
                                                                            flex: "0 0"
                                                                        },
                                                                        children: "Cultural Development"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "mt-20 p-4 md:p-6 flex flex-col justify-center items-center text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "mt-2 xl:mt-6 text-[30px] sm:text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(31,73,45)] text-center justify-center items-center uppercase",
                                                                    children: "Consulting"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                    className: "m-4 md:m-auto max-w-[1000px] xl:mt-6 text-base sm:text-[20px] flex text-[rgb(20,48,29)] text-center justify-center items-center",
                                                                    children: "Revolūtiō also works with artists, venues, businesses, nonprofits, museums, municipalities, and cultural spaces to develop programming, events, funding strategies, creative campaigns, artist residencies, and sustainable cultural ecosystems."
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                    className: "bg-[#a86933] mt-4 p-2 sm:p-4 text-[rgb(253,240,214)] w-max text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                        href: "/contact?form=Consulting",
                                                                        children: "Inquire For Consulting"
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "mt-40 p-4 sm:p-6 flex flex-col justify-center items-center text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "mt-2 xl:mt-6 text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                            children: "Featured Artists"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "mt-2 xl:mt-6 text-2xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(219,187,146)] text-center justify-center items-center uppercase",
                                                            children: "Artists in the Revolūtiō Network"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "w-full h-full artist-1 mt-10 border rounded-lg border-[rgb(253,240,214)]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                            className: "relative p-4 md:p-6 place-content-center w-full items-center justify-center min-h-[800px]",
                                                            ref: artistRef,
                                                            children: artistsData.map((artist, index)=>{
                                                                if (selectedArtist === artist.name) {
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                            className: ` h-full place-content-center justify-center flex flex-col m-auto items-center text-center gap-6 transition-all ease-in-out duration-700 pointer-events-none`,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                                className: "grid lg:grid-cols-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                                        className: "text-center justify-center flex flex-col items-center",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                                                className: "mt-2 font-bold xl:mt-6 text-4xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                                                                children: artist.name
                                                                                            }),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                                                className: "mt-2 xl:mt-6 text-xl md:text-2xl flex text-[rgb(211,198,178)] text-center justify-center items-center uppercase",
                                                                                                children: artist.type
                                                                                            }),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                                                className: "mt-2 xl:mt-6 text-base md:text-xl flex flex-col text-[rgb(211,198,178)] text-center justify-center items-center",
                                                                                                children: artist.location
                                                                                            }),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                                                className: "mt-2 overflow-y-scroll xl:mt-6 text-sm md:text-base text-[rgb(253,240,214)] text-center justify-center items-center",
                                                                                                children: [
                                                                                                    artist.paras[0],
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("br", {}),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("br", {}),
                                                                                                    artist.paras[1]
                                                                                                ]
                                                                                            }),
                                                                                            artist.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                                                className: "mt-4 md:mt-6 flex flex-col gap-6",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                                                    className: "bg-[#a86933] text-[rgb(253,240,214)] p-2 w-max rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                                                    onClick: ()=>{
                                                                                                        window.open("https://linktr.ee/thomasdijkstramusic", "_blank");
                                                                                                    },
                                                                                                    children: artist.link ? "Link Tree" : artist.link
                                                                                                })
                                                                                            }),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                                                className: "mt-4 xl:mt-6 text-base md:text-xl text-[rgb(253,240,214)] text-center justify-center items-center",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                                                        className: "text-[rgb(253,240,214)] mr-2",
                                                                                                        children: "Status:"
                                                                                                    }),
                                                                                                    " ",
                                                                                                    artist.status
                                                                                                ]
                                                                                            })
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                                                        className: "pt-4 lg:pt-0 text-center justify-center flex items-center",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("img", {
                                                                                            className: "w-[300px] lg:w-[450px] xl:w-[560px] h-auto rounded-lg",
                                                                                            loading: "lazy",
                                                                                            src: getArtistImage(artist.name).src
                                                                                        })
                                                                                    })
                                                                                ]
                                                                            })
                                                                        }, index)
                                                                    }, artist.name);
                                                                }
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "flex flex-row flex-nowrap pt-6 gap-15 justify-center items-center mx-auto mt-auto",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${selectedArtist === "Thomas Dijkstra" ? "border-10" : "border-2"}`,
                                                                onClick: ()=>{
                                                                    if (selectedArtist !== "Thomas Dijkstra") {
                                                                        setSelectedArtist("Thomas Dijkstra");
                                                                        handleScroll(artistRef);
                                                                    }
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${selectedArtist === "Caroline Calvano" ? "border-10" : "border-2"}`,
                                                                onClick: ()=>{
                                                                    if (selectedArtist !== "Caroline Calvano") {
                                                                        setSelectedArtist("Caroline Calvano");
                                                                        handleScroll(artistRef);
                                                                    }
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                className: `rounded-[50%] cursor-pointer transition-all duration-300 opactiy-50 h-8 w-8 border-[rgb(253,240,214)] ${selectedArtist === "Gaia Mencagli" ? "border-10" : "border-2"}`,
                                                                onClick: ()=>{
                                                                    if (selectedArtist !== "Gaia Mencagli") {
                                                                        setSelectedArtist("Gaia Mencagli");
                                                                        handleScroll(artistRef);
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                        className: "relative w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("video", {
                                                className: "w-full h-full md:bg-center object-right object-cover absolute top-0 right-0 z-10",
                                                playsInline: true,
                                                autoPlay: true,
                                                loop: true,
                                                muted: true,
                                                preload: "auto",
                                                ref: videoRef,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("source", {
                                                    src: __TURBOPACK__imported__module__75751__["default"],
                                                    type: "video/mp4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                className: "relative py-20 px-4 md:px-6 z-20 flex h-full bg-[rgba(30,47,37,0.7)] items-center flex-col justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
                                                        className: "mt-2 xl:mt-6 text-[40px] md:text-[48px] xl:text-6xl flex tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center justify-center items-center uppercase",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: "mb-8 mt-2 xl:mt-6 grid gap-6 text-[30px] sm:text-[40px] tracking-wide sm:tracking-[0.35em] text-[rgb(253,240,214)] text-center m-auto uppercase",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                    xVal: -200,
                                                                    delayVal: 0.2,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                                children: "Come"
                                                                            }),
                                                                            " as a traveler."
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                    xVal: -200,
                                                                    delayVal: 0.4,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                                children: "Come"
                                                                            }),
                                                                            " as an artist."
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                    xVal: -200,
                                                                    delayVal: 0.6,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                                children: "Come"
                                                                            }),
                                                                            " as a partner."
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                    xVal: -200,
                                                                    delayVal: 0.8,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("strong", {
                                                                                children: "Come"
                                                                            }),
                                                                            " as a supporter."
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                            className: "mt-2 xl:mt-6 mb-6 font-bold grid gap-6 text-xl sm:text-2xl text-[rgb(253,240,214)] text-center m-auto",
                                                            children: [
                                                                "However you enter the Revolūtiō ecosystem, the invitation is the same:",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("ul", {
                                                                    className: "text-base sm:text-xl font-normal flex flex-col gap-6",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                            children: "Travel with intention"
                                                                        }),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                            children: "Create with purpose"
                                                                        }),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                            children: "Connect with people"
                                                                        }),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("li", {
                                                                            children: "Help build a more meaningful cultural economy"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                        className: "mt-6 grid grid-cols-1 md:grid-cols-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "md:border-r border-[#a86933] px-2 md:px-6 md:py-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                        xVal: -200,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                            className: "bg-[#a86933] text-[rgb(253,240,214)] mt-4 p-2 sm:p-4 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                                href: "/experiences",
                                                                                children: "Plan My Experience"
                                                                            })
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                        xVal: -200,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                            className: "bg-[#a86933] text-[rgb(253,240,214)] mt-4 p-2 sm:p-4 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                                href: "/residencies",
                                                                                children: "Apply as an Artist"
                                                                            })
                                                                        })
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
                                                                className: "md:px-6 py-4 md:py-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                        xVal: 200,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                            className: "bg-[#a86933] text-[rgb(253,240,214)] mt-4 p-2 sm:p-4 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                                href: "/memberships",
                                                                                children: "Join the Culture Club"
                                                                            })
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__96199__["Reveal"], {
                                                                        xVal: 200,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("button", {
                                                                            className: "bg-[#a86933] text-[rgb(253,240,214)] mt-4 p-2 sm:p-4 w-full text-xl rounded-lg hover:cursor-pointer border border-transparent transition-all ease-in-out hover:bg-transparent hover:text-[#a86933] hover:border-[#a86933]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__22016__["default"], {
                                                                                href: "/contact?form=Partner",
                                                                                children: "Partner With Us"
                                                                            })
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
}
function App({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsxs"])("div", {
        className: "font-montserrat",
        style: {
            fontFamily: "Montserrat, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(Nav, {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("main", {
                children: children
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(Footer, {})
        ]
    });
}
__turbopack_context__.s([
    "Home",
    0,
    Home,
    "default",
    0,
    App
], 57339);
}),
96199, ((__turbopack_context__) => {
"use strict";

// MERGED MODULE: [project]/src/components/Reveal.tsx [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__43476__ = __turbopack_context__.i(43476);
var __TURBOPACK__imported__module__71645__ = __turbopack_context__.i(71645);
var __TURBOPACK__imported__module__46932__ = __turbopack_context__.i(46932);
var __TURBOPACK__imported__module__87652__ = __turbopack_context__.i(87652);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__47414__ = __turbopack_context__.i(47414);
var __TURBOPACK__imported__module__74008__ = __turbopack_context__.i(74008);
// MERGED MODULE: [project]/node_modules/framer-motion/dist/es/animation/hooks/animation-controls.mjs [app-client] (ecmascript)
;
var __TURBOPACK__imported__module__76859__ = __turbopack_context__.i(76859);
var __TURBOPACK__imported__module__47834__ = __turbopack_context__.i(47834);
var __TURBOPACK__imported__module__65566__ = __turbopack_context__.i(65566);
;
;
function stopAnimation(visualElement) {
    visualElement.values.forEach((value)=>value.stop());
}
function setVariants(visualElement, variantLabels) {
    const reversedLabels = [
        ...variantLabels
    ].reverse();
    reversedLabels.forEach((key)=>{
        const variant = visualElement.getVariant(key);
        variant && (0, __TURBOPACK__imported__module__47834__["setTarget"])(visualElement, variant);
        if (visualElement.variantChildren) {
            visualElement.variantChildren.forEach((child)=>{
                setVariants(child, variantLabels);
            });
        }
    });
}
function setValues(visualElement, definition) {
    if (Array.isArray(definition)) {
        return setVariants(visualElement, definition);
    } else if (typeof definition === "string") {
        return setVariants(visualElement, [
            definition
        ]);
    } else {
        (0, __TURBOPACK__imported__module__47834__["setTarget"])(visualElement, definition);
    }
}
/**
 * @public
 */ function animationControls() {
    /**
     * Track whether the host component has mounted.
     */ let hasMounted = false;
    /**
     * A collection of linked component animation controls.
     */ const subscribers = new Set();
    const controls = {
        subscribe (visualElement) {
            subscribers.add(visualElement);
            return ()=>void subscribers.delete(visualElement);
        },
        start (definition, transitionOverride) {
            (0, __TURBOPACK__imported__module__65566__["invariant"])(hasMounted, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
            const animations = [];
            subscribers.forEach((visualElement)=>{
                animations.push((0, __TURBOPACK__imported__module__76859__["animateVisualElement"])(visualElement, definition, {
                    transitionOverride
                }));
            });
            return Promise.all(animations);
        },
        set (definition) {
            (0, __TURBOPACK__imported__module__65566__["invariant"])(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
            return subscribers.forEach((visualElement)=>{
                setValues(visualElement, definition);
            });
        },
        stop () {
            subscribers.forEach((visualElement)=>{
                stopAnimation(visualElement);
            });
        },
        mount () {
            hasMounted = true;
            return ()=>{
                hasMounted = false;
                controls.stop();
            };
        }
    };
    return controls;
}
;
"use client";
;
;
;
/**
 * Creates `LegacyAnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `LegacyAnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */ function useAnimationControls() {
    const controls = (0, __TURBOPACK__imported__module__47414__["useConstant"])(animationControls);
    (0, __TURBOPACK__imported__module__74008__["useIsomorphicLayoutEffect"])(controls.mount, []);
    return controls;
}
const useAnimation = useAnimationControls;
;
"use client";
;
;
;
const Reveal = ({ children, className, delayVal, xVal, yVal })=>{
    const containerRef = (0, __TURBOPACK__imported__module__71645__["useRef"])(null);
    const isVisible = (0, __TURBOPACK__imported__module__87652__["useInView"])(containerRef);
    const mainControls = useAnimation();
    (0, __TURBOPACK__imported__module__71645__["useEffect"])(()=>{
        if (isVisible) {
            mainControls.start("visible");
        } else mainControls.start("hidden");
    }, [
        isVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])("div", {
        className: `w-full overflow-hidden flex flex-col items-center justify-center${className ? " " + className : ""}`,
        ref: containerRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(__TURBOPACK__imported__module__46932__["motion"].div, {
            variants: {
                hidden: {
                    opacity: 0,
                    y: yVal ? yVal : 75,
                    x: xVal ? xVal : 0
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    x: 0
                }
            },
            viewport: {
                once: true
            },
            initial: "hidden",
            animate: mainControls,
            transition: {
                duration: 1,
                delay: delayVal ? delayVal : 0.5
            },
            style: {
                width: "100%"
            },
            children: children
        })
    });
};
__turbopack_context__.s([
    "Reveal",
    0,
    Reveal
], 96199);
}),
35375, ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__51528__ = __turbopack_context__.i(51528);
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__51528__["default"],
    width: 1056,
    height: 588,
    blurWidth: 8,
    blurHeight: 4,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAj0lEQVR42gGEAHv/AAAAAAADAgEDOyMOR3JdR3yQf2qZFBIPFQAAAAAAAAAAAAAAAAAFAwEGaD8afoltT5vIspXuLSojRwAAAAAAAAAAAAAAAAAWCAQghkEpqquMcvF5e2v5DhQSWQAAAAAAAAAAAAAAAAAUBwQhbCoYtKBXPfhgY1nzHCsrewEBAQMAAAAAQFsZwnYLcgMAAAAASUVORK5CYII="
};
__turbopack_context__.s([
    "default",
    0,
    __TURBOPACK__default__export__
]);
}),
]);