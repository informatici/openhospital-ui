export interface IProps {
  header: ITabConfig;
  content: ITabConfig;
}

export interface ITabConfig {
  mainClass: string;
  items: Array<Record<number, string>>;
}
