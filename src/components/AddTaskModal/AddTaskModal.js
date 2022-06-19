import ModalBasic from "components/ModalBasic";
import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "store/actions/tasks";

const registrationSchema = Yup.object().shape({
	name: Yup.string().required("Task Name is required"),
	description: Yup.string().required("Task Description is required"),
	status: Yup.string().required("Task Status is required"),
});

const AddTaskModal = ({ businessModalOpen, setBusinessModalOpen, boardId, editCallback, handleDelete, edit, setIsEdit, initialValues = {
	name: "",
	description: "",
	status: ""
} }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues,
		validationSchema: registrationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			if (edit) {
				dispatch(
					updateTask(edit, values.name, values.description, values.status, () => {
						setIsEdit(false);
						setBusinessModalOpen(false);
						editCallback();
					})
				);
			} else {
				dispatch(
					createTask(boardId, values.name, values.description, values.status, () => {
						setIsEdit(false);
						setBusinessModalOpen(false);
					})
				);
			}
			formik.resetForm();
		},
	});

	return (
		<ModalBasic
			id="add-task-modal"
			modalOpen={businessModalOpen}
			setModalOpen={setBusinessModalOpen}
			title={edit ? "Task details" : "Add new task"}
		>
			<form noValidate onSubmit={formik.handleSubmit}>
				<div>
					{/* Modal content */}
					<div className="px-5 py-4 space-y-6">
						{/* Business Profile */}
						<section>
							<div className="text-sm mb-4">
								Add new task to your board
							</div>
							<div className="mb-3">
								<div className="">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="name"
									>
										Task name
									</label>
									<input
										id="name"
										type="text"
										{...formik.getFieldProps("name")}
										className={clsx(
											"form-input w-full",
											{
												"is-invalid":
													formik.touched.name &&
													formik.errors.name,
											},
											{
												"is-valid":
													formik.touched.name &&
													!formik.errors.name,
											}
										)}
									/>
									{formik.touched.name &&
										formik.errors.name && (
											<span className="text-red-600 text-xs">
												{formik.errors.name}
											</span>
										)}
								</div>
							</div>
							<div className="mb-3">
								<div className="">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="description"
									>
										Task description
									</label>
									<textarea
										id="description"
										type="text"
										{...formik.getFieldProps("description")}
										className={clsx(
											"form-textarea w-full",
											{
												"is-invalid":
													formik.touched.description &&
													formik.errors.description,
											},
											{
												"is-valid":
													formik.touched.description &&
													!formik.errors.description,
											}
										)}
									></textarea>
									{formik.touched.description &&
										formik.errors.description && (
											<span className="text-red-600 text-xs">
												{formik.errors.description}
											</span>
										)}
								</div>
							</div>
							{edit && <div className="mb-3">
								<div className="">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="description"
									>
										Task Status
									</label>
									<select id="country" className={clsx(
										"form-select w-full",
										{
											"is-invalid":
												formik.touched.description &&
												formik.errors.description,
										},
										{
											"is-valid":
												formik.touched.description &&
												!formik.errors.description,
										}
									)}
										{...formik.getFieldProps("status")}
									>
										<option value="TODO">TODO</option>
										<option value="In progress">In progress</option>
										<option value="Done">Done</option>
										<option value="Blocked">Blocked</option>
									</select>
									{formik.touched.status &&
										formik.errors.status && (
											<span className="text-red-600 text-xs">
												{formik.errors.status}
											</span>
										)}
								</div>
							</div>}
						</section>
						<hr className="" />
					</div>
					{/* Modal footer */}
					<div className="px-5 py-4">
						<div className="flex flex-wrap justify-end space-x-2">
							{edit && <div onClick={(e) => {
								e.stopPropagation();
								setBusinessModalOpen(false);
								setIsEdit(false);
								handleDelete(edit);
							}} className="cursor-pointer btn bg-red-700 text-white">Delete</div>}
							<div
								className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600 cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									setBusinessModalOpen(false);
									setIsEdit(false);
								}}
							>
								Cancel
							</div>
							<button
								type="submit"
								className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
								disabled={!formik.isValid}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</form>
		</ModalBasic>
	);
};

export default AddTaskModal;
