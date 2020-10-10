import { useLayoutEffect, useState } from "react";

let ID = 0;
export default (ref: React.RefObject<HTMLElement>): IntersectionObserverEntry | undefined => {
	const [entry, setEntry] = useState<IntersectionObserverEntry>();

	useLayoutEffect(() => {
		const el = ref.current;
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (!Array.isArray(entries)) return;
				if (!entries.length) return;
				ID = window.requestAnimationFrame(() => {
					if (intersectionObserver) {
						setEntry(entries[0]);
					}
				});
			},
			{ root: null, threshold: 0, rootMargin: "0px 0px 200px" }
		);

		if (el) {
			intersectionObserver.observe(el);
		}

		return () => {
			if (el) {
				intersectionObserver.unobserve(el);
			}
			window.cancelAnimationFrame(ID);
		};
	}, [ref]);
	return entry;
};
