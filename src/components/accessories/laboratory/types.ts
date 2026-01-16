import type { LaboratoryDTOStatusEnum } from '../../../generated';

export type ChangeLabStatusProps = {
	status: LaboratoryDTOStatusEnum;
	labCode: string;
	onClick: () => void;
	isOpen?: boolean;
	onClose?: () => void;
};
