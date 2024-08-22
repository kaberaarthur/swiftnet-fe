import { newProjectChartData, totalClientsChartData } from "../DashboardChartData";

export const projectOverviewData = [
  {
    color: "primary",
    value: "55",
  },
  {
    color: "secondary",
    value: "60",
  },
  {
    color: "tertiary",
    value: "45",
  },
];

export const overviewData = [
  {
    color: "primary",
    number: "15",
    status: "Signed",
  },
  {
    color: "secondary",
    number: "62",
    status: "Manager Review",
  },
  {
    color: "tertiary",
    number: "20",
    status: "Client Review",
  },
];

export const totalClients = [
  {
    color: "primary",
    count: "457",
    title: "Total Clients",
    class: "client",
    chartData: totalClientsChartData,
  },
  {
    color: "secondary",
    count: "541",
    title: "New Project",
    class: "project",
    chartData: newProjectChartData,
  },
];

export const AllInvoicesTableBodyData = [
  {
    id: "#IH63390",
    image: "10.jpg",
    name: "Elle Amberson",
    email: "Elle34@gmail.com",
    project: "Website",
    date: "10-10-2024",
    amount: "$5411.55",
    color: "primary",
    status: "Done",
  },
  {
    id: "#F749U8",
    image: "11.jpg",
    name: "Anna Catmire",
    email: "Anna12@gmail.com",
    project: "Mobile App",
    date: "15-09-2024",
    amount: "$6589.36",
    color: "tertiary",
    status: "Pending",
  },
  {
    id: "#RT5094",
    image: "1.jpg",
    name: "Laura Dagson",
    email: "Laura@gmail.com",
    project: "Wordpress",
    date: "23-05-2024",
    amount: "$9655.16",
    color: "primary",
    status: "Done",
  },
  {
    id: "#PZ7384",
    image: "3.jpg",
    name: "Rachel Green",
    email: "Rache87@gmail.com",
    project: "Service",
    date: "15-02-2024",
    amount: "$5984.62",
    color: "danger",
    status: "Overdue",
  },
];

export const totalInvestmentFooterData = [
  {
    title: "Total",
    amount: "34,462",
  },
  {
    title: "Monthly",
    amount: "12,463",
  },
  {
    title: "Daily",
    amount: "5000",
  },
];

export const taskListBodyData = [
  {
    color: "primary",
    task: "Task With dropdown menu",
    userName: "By Johnny",
  },
  {
    color: "secondary",
    task: "Badge on the right task",
    userName: "This task has show on hover actions!",
  },
  {
    color: "tertiary",
    task: "Wash the car",
    userName: "Written by bob",
  },
  {
    color: "primary",
    task: "Go grocery shopping",
    userName: "A short description for this todo item",
  },
  {
    color: "secondary",
    task: "Development Task",
    userName: "Finish react todo list app",
  },
];

export const taskSummaryLeftData = [
  {
    icon: "Pie",
    color: "primary",
    title: "Project",
    count: "32",
  },
  {
    icon: "Category",
    color: "secondary",
    title: "Assigned",
    count: "78",
  },
  {
    icon: "Document",
    color: "tertiary",
    title: "Completed",
    count: "54",
  },
];

export const taskSummaryRightData = ["13", "6", "3"];

export const coursesHighlightedBodyData = [
  {
    image: "01.jpg",
    course: "Civil engineering",
    time: "20h 10m",
    amount: "$150",
    study: "UX/UI Design",
    status: "Done",
    color: "primary",
  },
  {
    image: "02.jpg",
    course: "Web development",
    time: "12h 05m",
    amount: "$156",
    study: "Illustration",
    status: "Pending",
    color: "tertiary",
  },
  {
    image: "03.jpg",
    course: "Computer science",
    time: "06h 15m",
    amount: "$695",
    study: "UX/UI Design",
    status: "Done",
    color: "primary",
  },
  {
    image: "04.jpg",
    course: "Web designer",
    time: "04h 30m",
    amount: "$364",
    study: "Leadership",
    status: "Done",
    color: "tertiary",
  },
];

export const totalVisitCardData = [
  {
    color: "primary",
    svgIcon: "mobile",
    title: "Mobile",
    percentage: "68,9%",
    amount: "20,600",
  },
  {
    color: "secondary",
    svgIcon: "desktop",
    title: "Desktop",
    percentage: "13,4%",
    amount: "02,450",
  },
];

export const notificationsData = [
  {
    class: "bg-light",
    image: "10.jpg",
    notification: "Polly edited Contact page",
    time: "18 mins ago . Craftwork design",
    dot: true,
  },
  {
    name: "KP",
    color: "secondary",
    notification: "James left a comment on ACME 2.1",
    time: "3 hours ago . ACME",
  },
  {
    image: "4.jpg",
    notification: "Mary shared the file isometric 2.0",
    time: "4 hours ago . Craftwork Design",
    buttons: true,
  },
  {
    class: "bg-light",
    name: "HS",
    color: "tertiary",
    notification: "Dima phizeg edited ACME 2.4",
    time: "3 hours ago . ACME",
    dot: true,
  },
  {
    image: "12.jpg",
    notification: "James created changelog page",
    time: "3 hours ago . Blank",
  },
];

export const scheduleTimeTabData = [
  {
    id: "mon-tab",
    day: "Mo",
    date: "01",
  },
  {
    id: "tue-tab",
    day: "Tu",
    date: "02",
  },
  {
    id: "wed-tab",
    day: "We",
    date: "03",
  },
  {
    id: "thu-tab",
    day: "Th",
    date: "04",
  },
  {
    id: "frd-tab",
    day: "Fr",
    date: "05",
  },
  {
    id: "sat-tab",
    day: "St",
    date: "06",
  },
];

export const scheduleTimeTabContent = [
  {
    id: "mon-tab",
    TabContentData: [
      {
        color: "primary",
        time: "10:00 to 10:20 am",
        title: "Mobile Application Release",
        comment: "Hannah",
        image: "11.jpg",
      },
      {
        color: "secondary",
        time: "12:00 to 01:45 am",
        title: "General Meeting",
        comment: "Madeleine Lisa",
        image: "1.jpg",
      },
      {
        color: "tertiary",
        time: "06:00 to 11:30 am",
        title: "Client Visit",
        comment: "Hemmings Edmunds",
        image: "3.jpg",
      },
    ],
  },
  {
    id: "tue-tab",
    TabContentData: [
      {
        color: "info",
        time: "12:00 to 02:20 am",
        title: "What`s the project report update?",
        comment: "Loie Fenter",
        image: "2.jpg",
      },
      {
        color: "success",
        time: "04:00 to 08:20 am",
        title: "James created changelog page",
        comment: "Anna Catmire",
        image: "4.jpg",
      },
    ],
  },
  {
    id: "wed-tab",
    TabContentData: [
      {
        color: "danger",
        time: "09:00 to 02:20 am",
        title: "Dima phizeg edited ACME 2.4",
        comment: "Susan Connor",
        image: "5.jpg",
      },
      {
        color: "dark",
        time: "10:00 to 01:45 am",
        title: "Complete the medical ui system idea.",
        comment: "Jeff Johnson",
        image: "6.jpg",
      },
      {
        color: "warning",
        time: "04:00 to 10:30 am",
        title: "Make a new landing page.",
        comment: "Roger Lum",
        image: "9.jpg",
      },
    ],
  },
  {
    id: "thu-tab",
    TabContentData: [
      {
        color: "primary",
        time: "10:00 to 10:20 am",
        title: "Mobile Application Release",
        comment: "Hannah",
        image: "11.jpg",
      },
      {
        color: "secondary",
        time: "12:00 to 01:45 am",
        title: "General Meeting",
        comment: "Madeleine Lisa",
        image: "1.jpg",
      },
      {
        color: "tertiary",
        time: "06:00 to 11:30 am",
        title: "Client Visit",
        comment: "Hemmings Edmunds",
        image: "3.jpg",
      },
    ],
  },
  {
    id: "frd-tab",
    TabContentData: [
      {
        color: "info",
        time: "12:00 to 02:20 am",
        title: "What`s the project report update?",
        comment: "Loie Fenter",
        image: "2.jpg",
      },
      {
        color: "success",
        time: "04:00 to 08:20 am",
        title: "James created changelog page",
        comment: "Anna Catmire",
        image: "4.jpg",
      },
    ],
  },
  {
    id: "sat-tab",
    TabContentData: [
      {
        color: "danger",
        time: "09:00 to 02:20 am",
        title: "Dima phizeg edited ACME 2.4",
        comment: "Susan Connor",
        image: "5.jpg",
      },
      {
        color: "dark",
        time: "10:00 to 01:45 am",
        title: "Complete the medical ui system idea.",
        comment: "Jeff Johnson",
        image: "6.jpg",
      },
      {
        color: "warning",
        time: "04:00 to 10:30 am",
        title: "Make a new landing page.",
        comment: "Roger Lum",
        image: "9.jpg",
      },
    ],
  },
];
