import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
	const navigate = useNavigate();
	const handleClick = () => {
		console.log("Go to home page");
		navigate("/");
	};
	return (
		<div>
			<header className="sticky top-0 bg-white shadow">
				<div className="flex items-center justify-between p-2 mx-auto max-w-7xl">
					<div className="text-3xl font-bold  bg-indigo-600  hover:bg-indigo-700 rounded-lg hover:cursor-pointer  ">
						<h1 className="p-2">
							<span className="text-white" onClick={handleClick}>
								{" "}
								VideoChad🗿{" "}
							</span>
						</h1>
					</div>
					<button className="flex btn btn-light justify-end">Contact Us</button>
				</div>
			</header>
		</div>
	);
}

export default Navbar;
