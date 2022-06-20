import AddTaskModal from 'components/AddTaskModal/AddTaskModal';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleBoard, setSingleBoard } from 'store/actions/boards';
import { deleteTask } from 'store/actions/tasks';

const SingleBoard = () => {
	const dispatch = useDispatch();
	const { boardId } = useParams();
	const board = useSelector(state => state.boards.singleBoard);
	const [taskModal, setTaskModal] = useState(false);
	const [initialValues, setInitialValues] = useState({
		name: "",
		description: "",
		status: "TODO"
	});
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		dispatch(setSingleBoard(null));
		dispatch(getSingleBoard(boardId));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (taskModal === false) {
			setIsEdit(false);
			setInitialValues({
				name: "",
				description: "",
				status: "TODO"
			})
		}
	}, [taskModal])

	const updateCallback = () => {
		dispatch(getSingleBoard(boardId))
	}

	return (
		<>
			<div className='max-w-7xl px-5 mx-auto pt-10'>
				<div className='text-center text-2xl text-gray-900 font-semibold mb-8'>{board?.name}</div>

				<div className="mt-3 grid gap-5 sm:gap-6 grid-cols-4">
					<div className='w-full'>
						<div className='text-black bg-white w-full h-24 flex items-center justify-center rounded'>TODO</div>
						<div className='w-full bg-gray-50 p-5 pb-2 mt-4 rounded'>
							{board?.tasks?.map((item, index) => item.status === "TODO" && (
								<div key={index} onClick={(e) => {
									e.stopPropagation();
									setIsEdit(item.id);
									setInitialValues({ name: item.name, description: item.description, status: item.status })
									setTaskModal(true);
								}} className='bg-white rounded p-4 cursor-pointer flex justify-center align-center text-black mb-2'>{item?.name}</div>
							))}

							<div onClick={e => {
								e.stopPropagation();
								setInitialValues({ name: "", description: "", status: "TODO" });
								setTaskModal(true);
							}} className='bg-indigo-600 mt-4 rounded cursor-pointer p-2 flex justify-center align-center text-white mb-2'>+ Add new</div>
						</div>
					</div>
					<div className='w-full'>
						<div className='text-black bg-white w-full h-24 flex items-center justify-center rounded'>In progress</div>
						<div className='w-full bg-gray-50 p-5 pb-2 mt-4 rounded'>
							{board?.tasks?.map((item, index) => item.status === "In progress" && (
								<div key={index} onClick={(e) => {
									e.stopPropagation();
									setIsEdit(item.id);
									setInitialValues({ name: item.name, description: item.description, status: item.status })
									setTaskModal(true);
								}} className='bg-white rounded p-4 cursor-pointer flex justify-center align-center text-black mb-2'>{item?.name}</div>
							))}

							<div onClick={e => {
								e.stopPropagation();
								setTaskModal(true);
								setInitialValues({ name: "", description: "", status: "In progress" });
							}} className='bg-indigo-600 mt-4 rounded cursor-pointer p-2 flex justify-center align-center text-white mb-2'>+ Add new</div>
						</div>
					</div>
					<div className='w-full'>
						<div className='text-black bg-white w-full h-24 flex items-center justify-center rounded'>Done</div>
						<div className='w-full bg-gray-50 p-5 pb-2 mt-4 rounded'>
							{board?.tasks?.map((item, index) => item.status === "Done" && (
								<div key={index} onClick={(e) => {
									e.stopPropagation();
									setIsEdit(item.id);
									setInitialValues({ name: item.name, description: item.description, status: item.status })
									setTaskModal(true);
								}} className='bg-white rounded p-4 cursor-pointer flex justify-center align-center text-black mb-2'>{item?.name}</div>
							))}

							<div onClick={e => {
								e.stopPropagation();
								setTaskModal(true);
								setInitialValues({ name: "", description: "", status: "Done" });
							}} className='bg-indigo-600 mt-4 rounded cursor-pointer p-2 flex justify-center align-center text-white mb-2'>+ Add new</div>
						</div>
					</div>
					<div className='w-full'>
						<div className='text-black bg-white w-full h-24 flex items-center justify-center rounded'>Blocked</div>
						<div className='w-full bg-gray-50 p-5 pb-2 mt-4 rounded'>
							{board?.tasks?.map((item, index) => item.status === "Blocked" && (
								<div key={index} onClick={(e) => {
									e.stopPropagation();
									setIsEdit(item.id);
									setInitialValues({ name: item.name, description: item.description, status: item.status })
									setTaskModal(true);
								}} className='bg-white rounded p-4 cursor-pointer flex justify-center align-center text-black mb-2'>{item?.name}</div>
							))}

							<div onClick={e => {
								e.stopPropagation();
								setTaskModal(true);
								setInitialValues({ name: "", description: "", status: "Blocked" });
							}} className='bg-indigo-600 mt-4 rounded cursor-pointer p-2 flex justify-center align-center text-white mb-2'>+ Add new</div>
						</div>
					</div>
				</div>
			</div>
			<AddTaskModal handleDelete={(id) => dispatch(deleteTask(boardId, id, updateCallback))} boardId={boardId} editCallback={updateCallback} businessModalOpen={taskModal} setBusinessModalOpen={setTaskModal} initialValues={initialValues} edit={isEdit} setIsEdit={setIsEdit} />
		</>
	);
};

export default SingleBoard;