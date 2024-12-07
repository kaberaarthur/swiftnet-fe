import { MyFiles } from "@/Type/Application/FileSideBar/FileSideBar";

export const sideButtons = [
  {
    className: "bg-primary",
    icon: "home",
    title: "Home",
  },
  {
    className: "bg-light",
    icon: "folder",
    title: "All",
  },
  {
    className: "bg-light",
    icon: "clock",
    title: "Recent",
  },
  {
    className: "bg-light",
    icon: "star",
    title: "Starred",
  },
  {
    className: "bg-light",
    icon: "alert-circle",
    title: "Recovery",
  },
  {
    className: "bg-light",
    icon: "trash-2",
    title: "Deleted",
  },
];

export const quickAccessData = [
  {
    title: "Videos",
    icons: "youtube-play",
    color: "danger",
  },
  {
    title: "Apps",
    icons: "th",
    color: "info",
  },
  {
    title: "Document",
    icons: "file-text",
    color: "secondary",
  },
  {
    title: "Music",
    icons: "music",
    color: "warning",
  },
  {
    title: "Download",
    icons: "download",
    color: "primary",
  },
  {
    title: "Folder",
    icons: "folder",
    color: "info",
  },
  {
    title: "Zip File",
    icons: "file-archive-o",
    color: "secondary",
  },
  {
    title: "Trash",
    icons: "trash",
    color: "danger",
  },
];

export const filesData: MyFiles[] = [
  {
    id: 1,
    icon: "f-22 fa fa-folder font-info",
    name: "Logo.psd",
    size: "2.0 MB",
    modify: "7 hour ago",
    folderClass: "f-44 fa fa-file-archive-o txt-warning",
    title: "Tivo admin",
    folderSize: "20 file",
    modifyFolder: "2 Hour ago",
  },
  {
    id: 2,
    icon: "f-22 fa fa-file-excel-o font-success",
    name: "Backend.xls",
    size: "3.0 GB",
    modify: "2 Day ago",
    folderClass: "f-44 fa fa-folder txt-warning",
    title: "Viho admin",
    folderSize: "14 file",
    modifyFolder: "3 Hour ago",
  },
  {
    id: 3,
    icon: "f-22 fa fa-file-archive-o font-warning",
    name: "Project.zip",
    size: "1.9 GB",
    modify: "1 Day ago,",
    folderClass: "f-44 fa fa-file-archive-o txt-warning",
    title: "Unice admin",
    folderSize: "15 file",
    modifyFolder: "1 Day ago",
  },
  {
    id: 4,
    icon: "f-22 fa fa-folder font-primary",
    name: "Report.txt",
    size: "0.9 KB",
    modify: "1 Day ago",
    folderClass: "f-44 fa fa-folder txt-warning",
    title: "Koho admin",
    folderSize: "10 file",
    modifyFolder: "1 Day ago",
  },
];
