import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from 'store/actions/auth';
import { errorsNotification } from 'store/actions/notification';

const initialValues = {
	oldPassword: '',
	newPassword: '',
	confirmNewPassword: ''
};

const registrationSchema = Yup.object().shape({
	oldPassword: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Old Password is required'),
	newPassword: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('New Password is required'),
	confirmNewPassword: Yup.string()
		.required("Password confirmation is required")
		.when("password", {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref("newPassword")],
				"Password and Confirm Password didn't match"
			),
		}),
});

const Account = () => {
	const user = useSelector(state => state.auth.account);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues,
		validationSchema: registrationSchema,
		onSubmit: (values) => {
			const data = {
				username: user.username,
				password: values.newPassword,
			};
			if (values.oldPassword === user.password) {
				dispatch(updateProfile(data, () => formik.resetForm()));
			} else {
				dispatch(errorsNotification("Old password is not correct"));
			}
		},
	});

	return (
		<div className='max-w-7xl mx-auto'>
			<form className="space-y-8 divide-y p-5 mt-14 rounded divide-gray-200 bg-white" noValidate
				onSubmit={formik.handleSubmit}>
				<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
					<div>
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
						</div>

						<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label for="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Username </label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">

										<input type="text" disabled value={user?.username} name="username" id="username" autocomplete="username" class="flex-1 rounded-md block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 bg-gray-300 sm:text-sm border-gray-300" />
									</div>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label for="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Change password </label>
								<div className="mt-1 sm:mt-0 sm:col-span-2 max-w-lg">
									<label className='text-sm mb-2 block'>Old password</label>
									<input type="password" {...formik.getFieldProps('oldPassword')}
										className={clsx(
											'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-2 sm:text-sm',
											{ 'is-invalid': formik.touched.oldPassword && formik.errors.oldPassword },
											{
												'is-valid': formik.touched.oldPassword && !formik.errors.oldPassword,
											}
										)} />
									{formik.touched.oldPassword && formik.errors.oldPassword && (
										<span className='text-red-600 text-xs'>{formik.errors.oldPassword}</span>
									)}
									<label className='text-sm mb-2 mt-4 block'>New password</label>
									<input type="password" {...formik.getFieldProps('newPassword')}
										className={clsx(
											'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-2 sm:text-sm',
											{ 'is-invalid': formik.touched.newPassword && formik.errors.newPassword },
											{
												'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
											}
										)} />
									{formik.touched.newPassword && formik.errors.newPassword && (
										<span className='text-red-600 text-xs'>{formik.errors.newPassword}</span>
									)}
									<label className='text-sm mb-2 mt-4 block'>Repeat new password</label>
									<input type="password" {...formik.getFieldProps('confirmNewPassword')}
										className={clsx(
											'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-2 sm:text-sm',
											{ 'is-invalid': formik.touched.confirmNewPassword && formik.errors.confirmNewPassword },
											{
												'is-valid': formik.touched.confirmNewPassword && !formik.errors.confirmNewPassword,
											}
										)} />
									{formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
										<span className='text-red-600 text-xs'>{formik.errors.confirmNewPassword}</span>
									)}
								</div>
							</div>
						</div>
					</div>

				</div>

				<div className="pt-5">
					<div className="flex justify-end">
						<button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Account;