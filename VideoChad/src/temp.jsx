import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import axios from "axios";
import "./App.css";
import YouTube from "react-youtube";

function App() {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const location = useLocation(); // Access the location object
	const videoLink = location.state?.videoLink; // Access the videoLink from the state
	const [embedLink, setEmbedLink] = useState("");
	const [videoId, setVideoId] = useState("");
	const endOfMessagesRef = useRef(null);
	const scrollToBottom = () => {
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const [loading, setLoading] = useState(false);

	console.log(videoLink);
	useEffect(() => {
		function convertToEmbedUrl(watchUrl) {
			return watchUrl.replace("/watch?v=", "/embed/");
		}
		if (videoLink) {
			setEmbedLink(convertToEmbedUrl(videoLink));
			setVideoId(videoLink.split("v=")[1]);
		} else {
			navigate("/");
		}
	}, []);

	const sendMessage = async () => {
		try {
			console.log("Sending message...");
			setLoading(true);

			const response = await axios.post("http://localhost:5000/message", {
				prompt: userInput,
			});
			setMessages([
				...messages,
				{ role: "user", content: userInput },
				{ role: "assistant", content: response.data.assistant_message },
			]);
			setUserInput("");
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && userInput.trim() !== "") {
			sendMessage();
			e.preventDefault(); // To prevent any default behavior, such as a line break in a textarea
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="flex flex-grow">
				{/* YouTube Video Player */}
				<div className="w-1/2 bg-white">
					<div className="p-4">
						<h1></h1>
						<YouTube
							className="w-full h-96"
							videoId={videoId}
							opts={{
								width: "100%",
								playerVars: {
									autoplay: 1,
								},
							}}
						/>
					</div>
				</div>
				<div>
					<div className="border-r-2 border-gray-300 h-screen"></div>
				</div>

				<div className="w-1/2 bg-white">
					<div className=" p-6">
						<h1 className="text-2xl font-bold">Chat with Video!</h1>
						<div
							ref={endOfMessagesRef}
							className="mt-4 overflow-y-auto flex-grow max-h-full border border-gray-300 rounded-md p-4 bg-gray-100"
							id="chat-message"
						>
							{messages.map((msg, idx) => (
								<div
									key={idx}
									className={`${
										msg.role === "user"
											? "text-indigo-600 font-semibold"
											: "text-gray-700 "
									}`}
									ref={idx === messages.length - 1 ? endOfMessagesRef : null}
								>
									{msg.content}
								</div>
							))}
							{loading && (
								<div className="text-green-400">Getting response...</div>
							)}
						</div>
						<div className="mb-4 flex sticky bottom-0 bg-white" id="chat-input">
							<input
								value={userInput}
								onChange={(e) => setUserInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Type your query here..."
								className="flex-grow px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
							/>
							<button
								onClick={sendMessage}
								className={`ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring ${
									loading && "cursor-not-allowed opacity-35"
								}`}
								disabled={loading}
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
