import * as React from "react";
import ToastPortal from "./ToastPortal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";

const ToastBox = styled.div`
	width: 300px;
	padding: 20px;
	margin: 15px;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
	background-color: rgb(66, 66, 66);
	text-align: center;
	font-weight: bold;
	color: #fff;
	border-radius: 15px;
`;

interface ToastItem {
	time: number;
	title: string;
}

const ToastContext = React.createContext<any | undefined>(undefined);
export const useToast = () => React.useContext(ToastContext);
export const ToastProvider: React.FC<{}> = ({ children }: any) => {
	const [toast, setToast] = React.useState<ToastItem[]>([]);

	const optionToast = React.useCallback(
		(item: ToastItem) => {
			setToast((prev) => [...prev, item]);
		},
		[setToast]
	);

	React.useEffect(() => {
		if (toast.length > 0) {
			const timer = setTimeout(() => {
				setToast((prev) => prev.slice(1));
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [toast]);

	return (
		<>
			<ToastContext.Provider value={optionToast}>{children}</ToastContext.Provider>
			<ToastPortal>
				<TransitionGroup className='toast-group'>
					{toast.map((item) => {
						return (
							<CSSTransition key={item.time} timeout={500} classNames='item'>
								<ToastBox>{item.title}</ToastBox>
							</CSSTransition>
						);
					})}
				</TransitionGroup>
			</ToastPortal>
		</>
	);
};
