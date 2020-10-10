import React from "react";
import ReactDOM from "react-dom";

interface Props {
	children: React.ReactNode;
}

const ToastPortal = ({ children }: Props) => {
	const el: HTMLElement | null = document.getElementById("toast-root");

	return el && ReactDOM.createPortal(children, el);
};

export default ToastPortal;
