import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealProps {
	children: React.JSX.Element;
	className?: string;
	delayVal?: number;
	xVal?: number;
	yVal?: number;
}

export const Reveal = ({
	children,
	className,
	delayVal,
	xVal,
	yVal,
}: RevealProps) => {
	const containerRef = useRef(null);
	const isVisible = useInView(containerRef);

	const mainControls = useAnimation();

	useEffect(() => {
		if (isVisible) {
			mainControls.start("visible");
		} else mainControls.start("hidden");
	}, [isVisible]);

	return (
		<div
			className={`w-full overflow-hidden flex flex-col items-center justify-center${className ? " " + className : ""}`}
			ref={containerRef}
		>
			<motion.div
				variants={{
					hidden: { opacity: 0, y: yVal ? yVal : 75, x: xVal ? xVal : 0 },
					visible: { opacity: 1, y: 0, x: 0 },
				}}
				viewport={{ once: true }}
				initial="hidden"
				animate={mainControls}
				transition={{ duration: 1, delay: delayVal ? delayVal : 0.5 }}
				style={{
					width: "100%",
				}}
			>
				{children}
			</motion.div>
		</div>
	);
};
