import React from "react";
import YouTube from "react-youtube";

function YoutubeC({ videoId, navigate }) {
	const [player, setPlayer] = React.useState(null);

	const handleClick = () => {
		console.log("Clicked");
		if (player) {
			player.seekTo(120);
			player.pauseVideo();
			console.log("Seeking to  120");
		}
	};

	const onPlayerReady = (event) => {
		setPlayer(event.target);
		console.log("Player is ready");
	};

	return (
		<div className="w-full h-96">
			<h1 className="text-gray-800 font-semibold text-2xl ml-2 mt-2">
				Youtube Video
			</h1>

			<YouTube
				className="w-full h-full p-2"
				videoId={videoId}
				opts={{
					width: "100%",
					height: "100%",
					playerVars: {
						autoplay: 0,
						start: 40,
					},
				}}
				onReady={onPlayerReady}
			/>

			<div className="flex justify-center items-center mt-2">
				<button
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
					onClick={handleClick}
				>
					Take me to Quiz
				</button>
			</div>
		</div>
	);
}

export default YoutubeC;
