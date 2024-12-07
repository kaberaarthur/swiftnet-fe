export const tabsData = [
    {
      text: "Use the ",
      code: "nav-link , .show",
    },
    {
      text: " class to jump particular tabs. "
    }
  ];
  
  export const iconTabData = [
    {
      text: "Use the ",
      code: ".nav-link .show ",
    },
    {
      text: "class to tabs change. "
    }
  ];
  
  export const verticalTabData = [
    {
      text: "Use the ",
      code: ".nav-link",
    },
    {
      text: "with feather icons. And ",
      code: ".show ",
    },
    {
      text: " class to tabs change.",
    },
  ];
  
  export const pillsTabData = [
    {
      text: "Use the ",
      code: "data-bs-toggle='pill'",
    },
    {
      text: " to tabs pill shape. And mandatory for class. "
    }
  ];
  
  export const justifyTabsData = [
    {
      text: "Use the ",
      code: ".nav-link",
    },
    {
      text: " class and set content using flex property. "
    }
  ];
  
  export const justifyData = [
    {
      id: "1",
      items: [
        {
          src: "avatar/1.jpg",
          title: "Kathy M. Anderson",
          number: "440-494-0729",
        },
        {
          src: "avatar/2.jpg",
          title: "Lillian J. Goodfellow",
          number: "239-664-7751",
        },
        {
          src: "avatar/3.jpg",
          title: "Carolyn A. Sutton",
          number: "218-793-6609",
        },
        {
          src: "avatar/4.jpg",
          title: "Mary O. Miller",
          number: "720-744-0921",
        },
        {
          src: "avatar/5.jpg",
          title: "Patricia H. Hummel",
          number: "314-445-1451",
        },
        {
          src: "avatar/6.jpg",
          title: "Minnie F. Evans",
          number: "718-740-8438",
        },
      ],
    },
    {
      id: "2",
      items: [
        {
          src: "avatar/7.jpg",
          title: "Thomas A. Leroy",
          number: "305-539-6871",
        },
        {
          src: "avatar/8.jpg",
          title: "Mark S. Ward",
          number: "303-561-8880",
        },
        {
          src: "avatar/9.jpg",
          title: "Emily T. Hooper",
          number: "301-553-1836",
        },
        {
          src: "avatar/2.jpg",
          title: "Natasha W. Watson",
          number: "267-605-4499",
        },
        {
          src: "avatar/4.jpg",
          title: "Jennifer A. Camacho",
          number: "770-527-7554",
        },
        {
          src: "avatar/6.jpg",
          title: "Ann J. Strickland",
          number: "469-218-4678",
        },
      ],
    },
    {
      id: "3",
      items: [
        {
          src: "avatar/7.jpg",
          title: "Jaclyn T. Duncan",
          number: "413-618-9222",
        },
        {
          src: "avatar/8.jpg",
          title: "MChristine H. Lin",
          number: "909-219-0342",
        },
        {
          src: "avatar/6.jpg",
          title: "Ronnie S. Mountain",
          number: "978-426-9732",
        },
        {
          src: "avatar/9.jpg",
          title: "Louise A. Hilliard",
          number: "502-262-5600",
        },
        {
          src: "avatar/3.jpg",
          title: "Kayla Hutt",
          number: "312-456-8275",
        },
        {
          src: "avatar/5.jpg",
          title: "Amber Cecil",
          number: "802-662-2407",
        },
      ],
    },
  ];
  
  export const materialData = [
    {
      text: "Use the ",
      code: ".nav-link , aria-orientation='vertical' ",
    },
    {
      text: "class through jump another tabs.And ",
    },
  ];
  
  export const materialStyleData = [
    {
      text: "Use the ",
      code: ".nav-link .active ",
    },
    {
      text: "class through access new tabs. And icons of design for attractive webpage.",
    },
  ];
  
  const Star = ()=>{
    return(<i className="ico-color icofont icofont-star"></i>)
  }
  
  export const materialStyleDataList = [
    {
      tabId: "1",
      header: "User Details:",
      tableHeaders: ["#", "Name", "Country", "Contact No"],
      tableData: [
        { id: 1, name: "Neha", country: "India", contactNo: "5698741236" },
        { id: 2, name: "Jacklin", country: "Thailand", contactNo: "7800030320" },
      ],
    },
    {
      tabId: "2",
      header: "Description:",
      tableHeaders: ["Technology", "Interest", "Salary Expected"],
      tableData: [
        { technology: "Web Designer", interest: "HTML,CSS,JS,SCSS", salaryExpected: "45000" },
        { technology: "UX Designer", interest: "Figma,Photoshop,craft", salaryExpected: "20000" },
      ],
    },
    {
      tabId: "3",
      header: "Review:",
      tableHeaders: ["#", "Name", "Country", "Rating"],
      tableData: [
        { id: 1, name: "Neha", country: "India", rating:<><Star/><Star/><Star/><Star/></>},
        { id: 3, name: "Irfan", country: "India", rating: <><Star/><Star/><Star/></>}
      ],
    },
  ];
  
  export const borderTabData = [
    {
      text: "Use the ",
      code: ".nav-link .active ",
    },
    {
      text: "class. And hover effect added on bottom border styles.",
    },
  ];