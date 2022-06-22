import AddBoardModal from 'components/AddBoardModal/AddBoardModal';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from 'store/actions/auth';
import { deleteBoard } from 'store/actions/boards';

const Boards = () => {
	const [boardModalOpen, setBoardModalOpen] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.auth.account);
	const [initialValues, setInitialValues] = useState({
		boardName: ""
	});
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		dispatch(getCurrentUser());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (boardModalOpen === false) {
			setIsEdit(false);
			setInitialValues({
				boardName: "",
			})
		}
	}, [boardModalOpen])

	return (
		<>
			<div className="max-w-5xl mx-auto px-5 pt-20">
				<div className="flex items-center justify-between mb-8">
					<h2
						className="text-gray-700 text-xl mr-8 font-medium uppercase tracking-wide"
					>
						Your boards
					</h2>
					<button className='bg-indigo-600 btn text-white' onClick={(e) => {
						e.stopPropagation();
						setBoardModalOpen(true);
					}}>Create new</button>
				</div>
				{user?.boards?.length === 0 && (
					<div className='text-2xl italic text-gray-700'>No boards added yet...</div>
				)}
				<ul
					className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
				>
					{user?.boards?.map((item, index) => (
						<li className="col-span-1 flex shadow-sm rounded-md cursor-pointer" onClick={() => history.push(`/boards/${item?.id}`)}>
							{/* <Link to={`/boards/${item?.id}`} className="block"> */}
							<div
								className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md"
							>
								{item?.name?.substring(0, 1)}
							</div>
							<div
								className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
							>
								<div className="flex-1 px-4 py-2 text-sm truncate">
									<div className="text-gray-900 font-medium hover:text-gray-600"
									>{item?.name}
									</div>
									<p className="text-gray-500">{item?.tasks?.length} Tasks</p>
								</div>
								<div class="flex-shrink-0 pr-2">
									<button onClick={e => {
										e.stopPropagation();
										setIsEdit(item.id);
										setBoardModalOpen(true);
										setInitialValues({ boardName: item.name });
									}} type="button" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										<span class="sr-only">Open options</span>
										<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
										</svg>
									</button>
								</div>
							</div>
							{/* </Link> */}
						</li>
					))}
				</ul>
			</div>
			<AddBoardModal handleDelete={(id) => dispatch(deleteBoard(id))} initialValues={initialValues} edit={isEdit} setIsEdit={setIsEdit} businessModalOpen={boardModalOpen} setBusinessModalOpen={setBoardModalOpen} />
		</>
	);
};

export default Boards;