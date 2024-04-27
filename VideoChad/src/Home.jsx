import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Alert from "./Components/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const [userInput, setUserInput] = useState("");
	const navigate = useNavigate();
	const [alert, setAlert] = useState({
		state: false,
		type: "",
		message: "",
	});

	const [isLoading, setIsLoading] = useState(false); // New state for loading

	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};

	const isValidYouTubeURL = () => {
		const youtubePattern =
			/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&\S*)?$/;
		return userInput.match(youtubePattern);
	};
	function extractYouTubeVideoUrl(url) {
		const regex = /^(https:\/\/www\.youtube\.com\/watch\?v=[^&]+)/;
		const match = url.match(regex);
		return match ? match[1] : null;
	}

	const handleSendClick = async () => {
		if (isValidYouTubeURL()) {
			// If the input is a valid YouTube URL
			// Extract the video ID from the URL
			const videoId = extractYouTubeVideoUrl(userInput);
			setUserInput(videoId);
			setAlert({ state: false, type: "", message: "" });
			setIsLoading(true); // Set loading to true before making the request
			try {
				const response = await axios.post("http://localhost:5000/init", {
					yt_link: videoId,
				});
				console.log("Sent YT link :)", response);
				navigate("/app", {
					state: {
						videoLink: videoId,
						metaData: response.data.metadata.title,
					},
				});
			} catch (error) {
				console.error("Error sending YT link:", error);
				setAlert({
					state: true,
					type: "danger",
					message: "Error processing your request. Please try again.",
				});
			} finally {
				setIsLoading(false); // Set loading to false after receiving the response or if there's an error
			}
		} else {
			setAlert({
				state: true,
				type: "danger",
				message: "Please enter a valid video link",
			});
		}
	};

	return (
		<div>
			<Navbar />
			{alert.state && (
				<Alert
					message={alert.message}
					type={alert.type}
					setState={setAlert}
					timer={5000}
				/>
			)}

			{/* Loading overlay */}
			{isLoading && (
				// <div >
				// 	<div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-purple-500"></div>
				// </div>
				<div
					role="status"
					className="fixed inset-0 bg-white bg-opacity-50 text-center mt-16 flex items-center justify-center z-50"
				>
					<svg
						aria-hidden="true"
						class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span class="sr-only">Loading...</span>
				</div>
			)}

			<div
				className={`${
					alert.state ? "opacity-40 cursor-not-allowed mt-16" : ""
				}`}
			>
				<div id="info">
					<header className="bg-gray-50">
						<div className="mx-auto max-w-screen-xl m-4">
							<div className="sm:flex sm:items-center sm:justify-between">
								<div className="text-left sm:text-left">
									<h1 className=" text-5xl font-bold text-gray-900 sm:text-3xl">
										Welcome to Video Chad!
									</h1>

									<p className="mt-1.5 text-lg text-gray-500">
										Chat with Youtube videos! 🎉 Created by 
										{/* add href anchor for name and github */}
										<a
											href="https://github.com/MaxxCode8"
											className="text-indigo-500 hover:underline"
										>
											{" "}
											Malhar Kulkarni
										</a>
										{" "},
										<a
											href="https://github.com/kuldeepaher01
										"
											className="text-indigo-500 hover:underline"
										>
											{" "}
											Kuldeep Aher
										</a>
										
										
										{" "}
										and 
										<a
											href="https://github.com/"
											className="text-indigo-500 hover:underline"
										>
											{" "}
											Sandesh Tangade
										</a>
										{" "}
										Under the guidance of <a
											href="https://www.linkedin.com/in/jyoti-madake-042b08ab/"
											className="text-indigo-500 hover:underline"
										>
											{" "}
											Prof. Jyoti Madake
										</a>
										{". "}
										VIT, Pune Dept of Electronics and Telecommunications Engineering

									</p>
								</div>

								<div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
									<button
										className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
										type="button"
										onClick={() =>
											window.open("https://nptel.ac.in/course.html", "_blank")
										}
									>
										<span className="text-sm font-medium"> Go To NPTEL </span>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</header>
				</div>
				{/* What is NPTEL and what does this tool do */}
				<div className="mx-auto max-w-screen-xl">
					<div className="sm:flex sm:items-center sm:justify-between">
						<div className=" sm:text-left">
							<h1 className=" text-5xl font-bold text-gray-900 sm:text-3xl text-left ">
								How to use this tool?
							</h1>

							<p className="mt-1.5 text-lg text-gray-500 text-justify">
								Simply find any youtube video that you would like to chat with
								and paste the link below. 
								New window will open with the video and chat box. First a summary of the video will be shown and then you can chat with the video.
								Along with the answer of your question, the timestamps or refrences video will be showed in the chat box, You can simply click on the timestamp to jump to that part of the video.
							</p>
							<p className="mt-1.5 text-lg text-gray-900 text-justify">⚠️ Just ensure the video has english subtitles</p>

							{/* This is an AI tool which will help you summarise long NPTEL educational Videos ndd then Chat with them, write how this will help in learning and understanding */}
							
						</div>
					</div>
				</div>
				<div>
					{/* input for nptel video link (YT) */}
					<div className="mt-4 flex flex-row items-center justify-center align-middle space-x-4 ">
						<div className="mt-4 w-9/12">
							<input
								type="text"
								placeholder="Enter a YouTube video link"
								className="w-full px-2 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
								value={userInput}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-4">
							<button
								className=" px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring"
								onClick={handleSendClick}
							>
								Chat Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
