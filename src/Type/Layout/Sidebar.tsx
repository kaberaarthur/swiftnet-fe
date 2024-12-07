export interface MenuListType {
  menu?: MenuItem[] | undefined;
  level: number;
  className?: string;
  setActiveMenu: Function;
  activeMenu: unknown[];
}

export interface SidebarItemTypes {
  item: {
    id?: number;
    title?: string | undefined;
    icon?: string;
    type?: string;
    active?: boolean;
    path?: string;
    children?: SidebarChildrenType[];
    lanClass?: string;
  };
}

export interface SidebarChildrenType {
  path?: string;
  title: string;
  type: string;
  lanClass?: string;
  children?: SubChildrenType[];
}

export interface SubChildrenType {
  title: string;
  type: string;
  path: string;
}

export interface MenuItem {
  title: string;
  badge?: string;
  lanClass?: string;
  menucontent?: string;
  Items?: MenuItem[];
  id?: number;
  icon?: string;
  type?: string;
  active?: boolean;
  children?: MenuItem[];
  path?: string;
  mainTitle?: string;
  bookmark?: boolean;
}

export interface SearchSuggestionItem {
  icon: string | undefined;
  title: string;
  path: string;
  bookmarked? : boolean;
  id?:number
}

export interface SearchSuggestionListType {
  searchedArray: SearchSuggestionItem[];
  setSearchedWord: (key: string) => void;
}

export interface ThemeCustomizerProps{
  open: boolean,
  setOpen: (value:boolean) => void
}

export interface CustomizerHeaderProps{
  setOpen: (value:boolean) => void
}

export interface PropsLightColor {
  primary : string,
  secondary : string
}