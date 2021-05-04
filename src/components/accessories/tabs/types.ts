export interface IProps {
  config: TTabConfig,
  defaultRoute?: string
}
export interface TabItem {
  label: string, 
  content?: JSX.Element,
  path?: string,
  submenu?: Array<TabItem>
} 
export type TTabConfig = Array<TabItem>;
