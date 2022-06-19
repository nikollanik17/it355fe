import ModalBasic from "components/ModalBasic";
import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createBoard } from "store/actions/boards";

const initialValues = {
	boardName: "",
};

const registrationSchema = Yup.object().shape({
	boardName: Yup.string().required("Board Name is required"),
});

const AddBoardModal = ({ businessModalOpen, setBusinessModalOpen }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues,
		validationSchema: registrationSchema,
		onSubmit: (values) => {
			dispatch(
				createBoard(values.boardName, () => {
					setBusinessModalOpen(false);
				})
			);
		},
	});

	return (
		<ModalBasic
			id="add-business-modal"
			modalOpen={businessModalOpen}
			setModalOpen={setBusinessModalOpen}
			title="Add new board"
		>
			<form noValidate onSubmit={formik.handleSubmit}>
				<div>
					{/* Modal content */}
					<div className="px-5 py-4 space-y-6">
						{/* Business Profile */}
						<section>
							<div className="text-sm mb-4">
								Create board where you can easily add and maintain your tasks
							</div>
							<div className="mb-3">
								<div className="">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="name"
									>
										Board name
									</label>
									<input
										id="name"
										type="text"
										{...formik.getFieldProps("boardName")}
										className={clsx(
											"form-input w-full",
											{
												"is-invalid":
													formik.touched.boardName &&
													formik.errors.boardName,
											},
											{
												"is-valid":
													formik.touched.boardName &&
													!formik.errors.boardName,
											}
										)}
									/>
									{formik.touched.boardName &&
										formik.errors.boardName && (
											<span className="text-red-600 text-xs">
												{formik.errors.boardName}
											</span>
										)}
								</div>
							</div>
						</section>
						<hr className="" />
					</div>
					{/* Modal footer */}
					<div className="px-5 py-4">
						<div className="flex flex-wrap justify-end space-x-2">
							<div
								className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600 cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									setBusinessModalOpen(false);
								}}
							>
								Cancel
							</div>
							<button
								type="submit"
								className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
								disabled={!formik.isValid}
							>
								Create board
							</button>
						</div>
					</div>
				</div>
			</form>
		</ModalBasic>
	);
};

export default AddBoardModal;
