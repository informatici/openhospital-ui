export interface IOwnProps {
  onEditChange?: (value: boolean) => void;
  onEditCode?: (row: any) => void;
  onPrint?: (row: any) => void;
  onDelete?: () => void;
  onCloseEncounter?: () => void;
}
