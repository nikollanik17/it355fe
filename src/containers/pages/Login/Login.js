import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from 'store/actions/auth';

const initialValues = {
	username: '',
	password: '',
};

const registrationSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Minimum 3 symbols')
		.max(50, 'Maximum 50 symbols').required("Username is required"),
	password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Password is required'),
});


const Login = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const formik = useFormik({
		initialValues,
		validationSchema: registrationSchema,
		onSubmit: (values) => {
			dispatch(login({ username: values.username, password: values.password }, () => history.push('/login')));
		},
	});

	return (
		<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img
					className="mx-auto h-12 w-auto"
					src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
					alt="Workflow"
				/>
				<h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/auth/register"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						Sign up
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" noValidate onSubmit={formik.handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									type="text"
									autoComplete="none"
									{...formik.getFieldProps('username')}
									className={clsx(
										'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-2 sm:text-sm',
										{ 'is-invalid': formik.touched.username && formik.errors.username },
										{
											'is-valid': formik.touched.username && !formik.errors.username,
										}
									)}
								/>
								{formik.touched.username && formik.errors.username && (
									<span className='text-red-600 text-xs'>{formik.errors.username}</span>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									type="password"
									autoComplete="current-password"
									{...formik.getFieldProps('password')}
									className={clsx(
										'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-2 sm:text-sm',
										{ 'is-invalid': formik.touched.password && formik.errors.password },
										{
											'is-valid': formik.touched.password && !formik.errors.password,
										}
									)}
								/>
								{formik.touched.password && formik.errors.password && (
									<span className='text-red-600 text-xs'>{formik.errors.password}</span>
								)}
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#!"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;