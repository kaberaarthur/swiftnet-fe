export interface SearchBarPropsType {
  setSearchTerm: (data: string) => void;
  searchTerm: string;
}

export interface MyFiles {
  id: number;
  name: string;
  size: string;
  modify: string;
  icon: string;
  folderClass: string;
  title:string
  folderSize:string
  modifyFolder:string
}[]

export interface DataType{
  myFile:MyFiles[]
  searchTerm:string
}

export interface FileProps{
  myFiles:MyFiles[]
}