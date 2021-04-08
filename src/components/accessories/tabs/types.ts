export interface IProps {
  config: TTabConfig,
  defaultRoute?: string
}

export type TTabConfig = Array<{ label: string, content: JSX.Element, path?: string}>;
