export interface HorizontalTimelineProp {
    mainClass: string;
    child: Child[];
  }
  
  interface Child {
    colClass: string;
    color: string;
    date: string;
    header: string;
    paragraph: string;
    verticalLine1?: string;
    verticalLine2?: string;
  }
export interface ImageLabelProp {
  onSelectFile: React.ChangeEventHandler<HTMLInputElement> | undefined;
  scale: string | number | readonly string[] | undefined;
  imgSrc: string;
  setScale: (arg0: number) => void;
  rotate: string | number | readonly string[] | undefined;
  setRotate: (arg0: number) => void;
  aspect: number | undefined;
  handleToggleAspectClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface CommonDataProp {
  headerClass?: string;
  headingClass?: string;
  title: string;
  text: string;
  span: string;
  bodyClass?: string;
  sm?: string;
  footerClass?: string;
  bodyText?:string;
  footerText?:string;
}

export interface CommonCardProp {
  data: CommonDataProp;
}
export interface CommonCarouselProp {
  data: { id: number; image: string }[];
  control?: boolean;
  indecators?: boolean;
  caption?: boolean;
  slide?: boolean;
  interval?: string;
  fade?: boolean;
  lightCaption?: boolean;
  dark?: boolean;
}

export interface CarouselDataProp {
  id: number;
  image: string;
  captionText?: string;
  captionHeader?: string;
}

export interface CarouselItemWithInterval {
  image: string;
  interval: number;
}
export interface CommonFileUploadProp {
  maxFiles?: number;
  multiple?: boolean;
  body?: boolean;
}

export interface CommonTourSocialMediaProp {
  time?: string;
  className?: string;
}
export interface CommonTourHeaderProp {
  date: string;
  time: string;
}
interface Span {
  text: string;
  spanText?: string;
}

export interface RibbonProp {
  className: string;
  ribbonClass: string;
  title?: string;
  span: Span[];
  icon?: string;
  iconClass?: string;
}

interface ItemTypeProp {
  iconColor?: string;
  title?: string | JSX.Element;
  time?: string;
  bodyText?: string;
  bell?: boolean;
  round?: boolean;
}

export interface CommonToastProp {
  item: ItemTypeProp;
}
export interface PlacementToastContentProp {
  data: string;
}
