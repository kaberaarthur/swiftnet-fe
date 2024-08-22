import { ThankYouBold, ThankYouItalic } from "@/Constant";


export const basicTooltipData = [
  {
    text: " Use the ",
    code: "data-bs-title",
  },
  {
    text: " to add tooltip attribute. "
  }
];

export const colorTooltipData = [
  {
    text: " Use the ",
    code: "btn- *",
  },
  {
    text: "to change dark background color and ",
    code: "data-bs-placement='*' ",
  },
  {
    text: "to tooltip positions change.",
  },
];

export const colorTooltipList = [
  {
    id: 4,
    btnColor: "secondary",
    tooltip: "Secondary",
    btnText: "Secondary",
    placement: "top",
  },
  {
    id: 5,
    btnColor: "tertiary",
    tooltip: "Tertiary",
    btnText: "Tertiary",
    placement: "top",
  },
  {
    id: 6,
    btnColor: "success",
    tooltip: "Success",
    btnText: "Success",
    placement: "top",
  },
  {
    id: 7,
    btnColor: "danger",
    tooltip: "Danger",
    btnText: "Danger",
    placement: "top",
  },
];

export const directionTooltipData = [
  {
    text: " Use the ",
    code: "btn-*",
  },
  {
    text: " to change dark background color and",
    code: " data-bs-placement='*'",
  },
  {
    text: "[top/right/bottom/left] to tooltip direction change.",
  },
];

export const directionTooltipList = [
  {
    id: 9,
    placement: "right",
    tooltip: "Tooltip on right",
    btnText: "Tooltip on right",
    btnColor: "secondary",
  },
  {
    id: 10,
    placement: "bottom",
    tooltip: "Tooltip on bottom",
    btnText: "Tooltip on bottom",
    btnColor: "tertiary",
  },
  {
    id: 11,
    placement: "left",
    tooltip: "Tooltip on left",
    btnText: "Tooltip on left",
    btnColor: "info",
  },
];

export const hoverTooltipData = [
  {
    text: " Use the ",
    code: "bg-*-light",
  },
  {
    text: " to change light background color and ",
    code: "data-bs-title '",
  },
  {
    text: " to the content under the HTML tag.",
  },
];

export const hoverTooltipList = [
  {
    id: 13,
    tooltip: <div dangerouslySetInnerHTML={{ __html: ThankYouBold }}></div>,
    btnText: "Last Warning",
    className: "btn-warning",
    placement: "top",
    btnColor: "warning",
  },
  {
    id: 14,
    tooltip: <div dangerouslySetInnerHTML={{ __html: ThankYouItalic }}></div>,
    btnText: "It's Danger",
    className: "btn-danger",
    placement: "top",
    btnColor: "danger",
  },
  {
    id: 15,
    tooltip: <div dangerouslySetInnerHTML={{ __html: ThankYouBold }}></div>,
    btnText: "Coming Soon",
    className: "btn-info",
    placement: "top",
    btnColor: "info",
  },
];

export const fillTooltipData = [
  {
    text: "Tooltip in hover effect through fill dark color.",
    code: "[.btn-outline-*]",
  },
  {
    text: " and ",
    code: "data-bs-title ",
  },
  {
    text: "to the content under the HTML Tag.",
  },
];

export const fillTooltipList = [
  {
    id: 17,
    tooltip: "Tooltip Secondary",
    btnText: "Tooltip Secondary",
    btnColor: "secondary",
    placement: "top",
  },
  {
    id: 18,
    tooltip: "Tooltip Success",
    btnText: "Tooltip Success",
    btnColor: "success",
    placement: "top",
  },
  {
    id: 19,
    tooltip: "Tooltip Warning",
    btnText: "Tooltip Warning",
    btnColor: "warning",
    placement: "top",
  },
];

export const wonkyTooltipData =[
  {
    text:"Use the",
    code:".wonky-tooltip , .input-group"
  },
  {
    text:"add animation to shake the tooltip."
  }
]

export const imageTooltipData= [
  {
    text:"Use the",
    code:'data-bs-title, data-bs-trigger="click"'
  },
  {
    text:"to the image with click event."
  }
]

export const imageTooltipContextData = [
  {
    image:"1.png",
    title:"Facebook !!",
    id:"Tooltip-28"
  },
  {
    image:"2.png",
    title:"Instagram !!",
    id:"Tooltip-29"
  },
  {
    image:"3.png",
    title:"Twitter !!",
    id:"Tooltip-30"
  },
  {
    image:"4.png",
    title:"Youtube !!",
    id:"Tooltip-31"
  }
]