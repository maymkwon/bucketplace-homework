import React from "react";
import CardFeed from "./pages/CardFeed";
import "./App.css";
import { ToastProvider } from "./components/toast/toastProvider";

function App() {
	return (
		<ToastProvider>
			<CardFeed />
		</ToastProvider>
	);
}

export default App;
