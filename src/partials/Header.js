import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from 'store/actions/auth';

const Header = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(setUser(null));
		localStorage.clear();
		window.location.href = "/"
	};

	return (
		<div className="relative bg-white">
			<div
				className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10"
			>
				<div>
					<Link to="/boards">
						<span className="sr-only">Workflow</span>
						<img
							className="h-8 w-auto sm:h-10"
							src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
							alt=""
						/>
					</Link>
				</div>
				<div
					className="flex-1 flex items-center justify-between"
				>
					<nav className="flex space-x-10">
						<Link
							to="/boards"
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Boards
						</Link>
					</nav>
					<div className="flex items-center md:ml-12">
						<Link
							to="/account"
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Account
						</Link>
						<div
							onClick={logout}
							className="ml-8 cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
						>
							Logout
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;