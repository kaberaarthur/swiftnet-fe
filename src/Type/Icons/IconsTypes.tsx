export interface FlagIconType {
  getITag: (tag: string) => void;
}

export interface GetItagProp {
  abbrivation: string;
}

export interface IconsCommonProps {
  title: string;
  iconType: string[] | undefined;
  parentCallback: Function;
}

export interface IconsCommonProps2 {
  title?: string;
  iconType: string[];
  parentCallback: Function;
}

export interface IconsCommonProps3 {
  title: string;
  parentCallback: Function;
  iconType: string[] | undefined;
}

export interface IconsCommonProps4 {
  parentCallback: Function;
}
