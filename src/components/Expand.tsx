import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const ExpandContent = ({ children }: { children: React.ReactNode }) => {
	const targetRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "center center"],
	});

	const clipPath = useTransform(
		scrollYProgress,
		[0, 1],
		["inset(45% 45% 45% 45% round 12px)", "inset(0% 0% 0% 0% round 12px)"],
	);

	return (
		<motion.div
			ref={targetRef}
			style={{
				clipPath,
				willChange: "clip-path",
				overflow: "hidden",
			}}
		>
			{children}
		</motion.div>
	);
};
