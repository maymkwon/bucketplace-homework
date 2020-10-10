import React from "react";
import { IconProps } from "./types";

export default function CheckIcon({ className, isSelect }: IconProps) {
	return (
		<svg className={className} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
			<g fill='none' fillRule='evenodd'>
				<rect width='24' height='24' fill={isSelect ? "#35C5F0" : "#ddd"} rx='12' />
				<path fill='#FFF' fillRule='nonzero' d='M9.885 14.6l7.079-7.296 1.435 1.392L9.956 17.4 5 12.785l1.363-1.464z' />
			</g>
		</svg>
	);
}
