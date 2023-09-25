import { LaboratoryDTOStatusEnum } from "../../../generated";

export type ChangeLabStatusProps = {
  status: LaboratoryDTOStatusEnum;
  labCode: string;
  onClick: Function;
  isOpen?: boolean;
  onClose?: Function;
};
