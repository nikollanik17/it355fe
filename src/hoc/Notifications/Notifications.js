import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Notifications = () => {
	const notification = useSelector((state) => state.notification);

	useEffect(() => {
		if (notification.message) {
			toast[notification.type](notification.message);
		}
	}, [notification]);

	return (
		<ToastContainer
			className="text-sm"
			position="bottom-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
};

export default Notifications;
