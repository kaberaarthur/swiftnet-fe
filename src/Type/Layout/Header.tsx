export default interface ChildrenType {
  children: React.ReactNode;
}

export interface CartHeaderDataType {
  color: string;
  image: string;
  title: string;
  price: string;
  value: number;
  show: boolean;
}

export interface BookmarkedDataType {
  icon: string;
  path: string;
  title: string;
  color?:string
  id?: number;
  bookmarked?: boolean;
}

export interface BookmarkSliceType {
  linkItemsArray: BookmarkedDataType[]|[];
  bookmarkedData: BookmarkedDataType[];
}

export interface LanguageDataType{
  languageParameter:string,
  languageName:string,
  languageIconClassName:string,
  subTitle?:string
}