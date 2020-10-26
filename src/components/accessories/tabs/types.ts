export interface IProps {
  config: TTabConfig
}

export type TTabConfig = Array<{ label: string, content: JSX.Element }>;
