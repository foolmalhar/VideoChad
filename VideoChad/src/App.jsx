import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import axios from "axios";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { fetchTranscript } from "youtube-subtitle-transcript";

function App() {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [timestamps, setTimestamps] = useState([]);
	const [transcript, setTranscript] = useState("");
	const [loading, setLoading] = useState(false);
	const [transcriptStatus, setTranscriptStatus] = useState(false);
	const location = useLocation();
	const videoLink = location.state?.videoLink;
	const metaData = location.state?.metaData;
	const [videoId, setVideoId] = useState("");
	const endOfMessagesRef = useRef(null);
	const [player, setPlayer] = React.useState(null);

	const handleClick = async () => {
		if (!loading) {
			try {
				const response = await axios.post("http://localhost:5000/transcript");
				// console.log("Transcript", response.data.transcript);
				const temp = response.data.transcript; // This should now correctly reflect the updated state
				// console.log("Tt", temp);
				const element = document.createElement("a");
				const file = new Blob([temp], { type: "text/plain" }); // Use the fetched transcript directly
				element.href = URL.createObjectURL(file);
				element.download = "transcript.txt";
				document.body.appendChild(element); // Required for this to work in FireFox
				element.click();
			} catch (error) {
				window.alert("Failed to fetch transcript:", error);
			}
		}
	};

	const fetch = async () => {
		try {
			setTranscript(response.data.transcript);
			setTranscriptStatus(response.data.status);
		} catch (error) {
			console.error("Failed to fetch transcript:", error);
		}
	};

	const onPlayerReady = (event) => {
		setPlayer(event.target);
		console.log("Player is ready");
	};
	const scrollToBottom = () => {
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	console.log(videoLink);
	useEffect(() => {
		function convertToEmbedUrl(watchUrl) {
			return watchUrl.replace("/watch?v=", "/embed/");
		}

		if (videoLink) {
			setVideoId(videoLink.split("v=")[1]);

			console.log(videoId);
		} else {
			navigate("/");
		}
	}, []);

	const sendMessage = async () => {
		try {
			console.log("Sending message...");
			setLoading(true);
			let formattedMessages = [];
			for (let i = 0; i < messages.length; i += 2) {
				let message = [];
				message.push(messages[i].content);
				message.push(messages[i + 1].content);
				formattedMessages.push(message);
			}
			console.log("Formatted", formattedMessages);
			// const formattedInput =
			// 	userInput +
			// 	"?. In bulleted points, respond with the key points of the answer for the question and provide a concise answer in markdown format highlighting the keypoints and features using markdown.";
			const response = await axios.post("http://localhost:5000/response", {
				query: userInput,
				chat_history: formattedMessages,
			});
			console.log("Answer", response.data.answer);
			console.log("Time sta", response.data.timestamps);
			setTimestamps(response.data.timestamps.slice(0, 5));
			setMessages([
				...messages,
				{ role: "user", content: userInput + "?" },
				{ role: "assistant", content: response.data.answer },
			]);

			console.log(messages);
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
	const markdown = "";

	useEffect(() => {
		async function fetchSummary() {
			try {
				console.log("Summarizing...");
				setLoading(true);
				const response = await axios.post("http://localhost:5000/response", {
					query:
						"You are a Intelligent Tutor. Your task is to smartly summarize the the Youtube video transcript provided as context. \
					Don't mention the transcript as 'transcript' but refer to it as Youtube video or just video while having a conversation with a student.\
					Give me in-depth response for the summaray part only... something like : Short-Intro to what is being said in the video transcript.\
					5 - KEY points to understand in bullet point format... Conclusion as to what can be learnt from this video transcript....\
					Only the Conclusion in the summary should be application perspective.... \
					From thsi point provide all the responses in this chat in Markdown Format highlighting keypoints and fetures. Also for every response you have to give introduction, keypoints and conclusion. Keep in mind that the markdown syntax should be followed for every response that you will give in fututre.",
					chat_history: "",
				});
				console.log("Answer", response.data.answer);
				console.log("Time stamp", response.data.timestamps);

				// setTimestamps(response.data.timestamps);
				// only set first five timestamps
				setTimestamps(response.data.timestamps.slice(0, 5));
				setMessages([
					...messages,
					{ role: "user", content: userInput },
					{ role: "assistant", content: response.data.answer },
				]);

				console.log(messages);
				setUserInput("");
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchSummary();
	}, []);

	return (
		<div id="App" className="w-full h-screen">
			<div>
				<Navbar />
			</div>
			<div id="chat-ui" className="grid grid-cols-2 divide-x-2 h-5/6">
				<div className="flex flex-col  lg:col-span-1 col-span-2">
					<div className=" w-full h-96 justify-center items-center">
						<h1 className="text-gray-800 font-semibold text-2xl ml-2 mt-2">
							{metaData}
						</h1>

						<YouTube
							className="flex w-full h-full p-2 justify-center items-center"
							videoId={videoId}
							opts={{
								width: "100%",
								height: "120%",
								playerVars: {
									autoplay: 0,
									start: 40,
								},
							}}
							onReady={onPlayerReady}
						/>

						<div className="flex justify-center items-center mt-16">
							<button
								className={`px-2.5 py-2.5 bg-indigo-600 text-white rounded-md font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring ${
									loading && "cursor-not-allowed opacity-35 "
								}`}
								disabled={loading}
								onClick={handleClick}
							>
								Download transcript. 📥
							</button>
						</div>
					</div>
				</div>

				<div className="flex flex-col  justify-between lg:col-span-1 col-span-2 overflow-auto">
					<h1 className="p-2 text-2xl text-gray-800 font-semibold text-center">
						📺 Chat with the Video 📺
					</h1>
					<div className="p-2">
						<div className="flex items-center justify-start flex-col max-h-3/5">
							<div
								ref={endOfMessagesRef}
								className=" p-4 flex flex-col m-4 w-full max-h-4/5 border text-xl border-gray-300 rounded-md bg-gray-100"
								id="chat-message"
							>
								{/* <div>
									<ReactMarkdown>{"# Markdown"}</ReactMarkdown>
								</div> */}
								{messages.map((msg, idx) => (
									<div
										key={idx}
										className={` ${
											msg.role === "user"
												? "text-indigo-600 font-bold mt-3"
												: "text-gray-700  "
										}`}
										ref={idx === messages.length - 1 ? endOfMessagesRef : null}
									>
										<ReactMarkdown className="markdown">
											{msg.content}
										</ReactMarkdown>
										{/* Show buttopns of 3 timestamps  */}
										{/* {msg.content} */}
										{msg.role === "assistant" && (
											<div className="flex space-x-4 mt-2">
												{timestamps.map((time, idx) => (
													<button
														key={idx}
														className="bg-indigo-200 hover:bg-indigo-400  text-white py-1 px-3 rounded-lg"
														onClick={() => {
															if (player) {
																player.seekTo(time);
																player.pauseVideo();
															}
														}}
													>
														{"Ref "}
														{idx + 1}
													</button>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
					<div
						className="p-2 absolute w-full bg-white"
						id="chat-input"
						style={{ position: "sticky", bottom: 0 }}
					>
						<div className="flex items-center justify-end w-full space-x-4">
							<input
								value={userInput}
								onChange={(e) => setUserInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="🤔 Ask me anything! ... "
								className="flex-grow w-5/6 px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
							/>
							{/* {loading && (
								<div
									style={{ position: "relative", right: "640px", top: "50%" }}
									className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"
								></div>
							)} */}
							{/* <button
								onClick={sendMessage}
								className={`px-2.5 py-2.5 bg-indigo-600 text-white rounded-md font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring ${
									loading && "cursor-not-allowed opacity-35 "
								}`}
								disabled={loading}
							>
								📤Send
							</button> */}
							<button
								onClick={sendMessage}
								disabled={loading}
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
							>
								{loading && (
									<svg
										aria-hidden="true"
										role="status"
										class="inline w-4 h-4 me-3 text-white animate-spin"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
								)}
								{loading ? "Loading..." : "📤 Send"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
