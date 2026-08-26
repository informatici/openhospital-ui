import type { useFormik } from 'formik';
import { useCallback, useState } from 'react';

export function useResetFormHelpers(formik: ReturnType<typeof useFormik>) {
	const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

	const handleResetConfirmationDialog = useCallback(
		(value: boolean) => () => {
			setOpenResetConfirmation(value);
		},
		[],
	);

	const handleResetConfirmation = useCallback(() => {
		setOpenResetConfirmation(false);
		formik.resetForm();
	}, [formik.resetForm]);

	return {
		openResetConfirmation,
		handleResetConfirmation,
		handleResetConfirmationDialog,
	};
}
