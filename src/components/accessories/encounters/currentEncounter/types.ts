export interface IOwnProps {
  onEditChange?: (value: boolean) => void;
  onEditCode?: (row: any) => void;
  onDelete?: () => void;
  onCloseEncounter?: () => void;
}
