import { useCallback, useEffect, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router';

export function useDiscardHelpers() {
	const navigate = useNavigate();

	const [isBlocking, setIsBlocking] = useState(false);
	const [isGoingBack, setIsGoingBack] = useState(false);
	const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);

	const blocker = useBlocker(({ historyAction }) => {
		if (historyAction === 'REPLACE') {
			return false;
		}
		if (openCancelConfirmation) {
			return false;
		}
		setIsBlocking(true);
		setOpenCancelConfirmation(true);
		return true;
	});

	const handleCancelConfirmationDialog = useCallback(
		(value: boolean) => () => {
			setOpenCancelConfirmation(value);
			if (isBlocking && !value) {
				setIsBlocking(false);
				blocker.reset?.();
			}
			if (isGoingBack) {
				setIsGoingBack(false);
			}
		},
		[blocker, isBlocking, isGoingBack],
	);

	const handleCancelConfirmation = useCallback(() => {
		if (isBlocking) {
			blocker.proceed?.();
			setIsBlocking(false);
		} else if (isGoingBack) {
			setIsGoingBack(false);
			navigate(-1);
		} else {
			navigate(-1);
		}
		setTimeout(() => {
			setOpenCancelConfirmation(false);
		}, 500);
	}, [navigate, blocker, isBlocking, isGoingBack]);

	const handleGoBack = useCallback((event: PopStateEvent) => {
		event.preventDefault();
		setIsGoingBack(true);
		setOpenCancelConfirmation(true);
	}, []);

	useEffect(() => {
		window.addEventListener('popstate', handleGoBack);
		return () => {
			window.removeEventListener('popstate', handleGoBack);
		};
	}, [handleGoBack]);

	return {
		openCancelConfirmation,
		handleCancelConfirmation,
		handleCancelConfirmationDialog,
	};
}
