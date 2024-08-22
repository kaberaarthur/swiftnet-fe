import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarController, BarElement, ArcElement, RadialLinearScale);

const primary = "#43B9B2";
const secondary = "#C280D2";

export const chartJsBarChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8","Q9", "Q10", "Q11"],
  datasets: [
    {
      label: "Gross volume ($)",
      backgroundColor: primary,
      borderColor: "#F4F5F8",
      data: [26900, 28700, 27300, 29200, 26900, 28700, 27300, 29200,28700, 27300, 29200],
    },
    {
      label: "Gross volume ($)",
      backgroundColor: secondary,
      borderColor: "#F4F5F8",
      data: [27800, 26200, 21200, 24200, 22000, 27000, 27000, 25200,23600, 22100, 24200]
    },
  ],
  options: {
    title: {
     text: "Gross Volume in 2024",
     display: true,
    }
   }
};

export const chartJsBarChartDataOption = {
  responsive: true,
  legend: {
    display: false,
  },
};

export const lineGraphChartData = {
  type: 'line',
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      fill: true,
      label: "APAC RE Index",
      data: [10,
        20,
        30,
        40,
        100,
        50,
        150],
      pointBackgroundColor: primary,
      pointHoverBorderColor:primary,
      borderColor:primary,
    },
    {
      fill: true,
      data: [50,
        300,
        100,
        450,
        150,
        200,
        300],
      label: "APAC PME",
      pointBackgroundColor: primary,
      pointHoverBorderColor:primary,
      borderColor:primary,
    },
  ],
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart - Logarithmic'
    },
  }
};

export const lineGraphChartDataOption= {
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,.05)',
          lineWidth: 1,
        },
        display: true,
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,.05)',
          lineWidth: 1,
        },
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
        pointBorderWidth: 1,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor:"#fff"
      },
      line: {
        tension: 0,
      },
    },
  }

export const radarGraphChartData = {
  labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
  datasets: [
    {
      label: "Student A",
      data: [65, 75, 70, 80, 60, 80],
      fill: true,
      backgroundColor: "rgba(67,185,178,0.2)",
      borderColor: primary,
      borderWidth: 1,
      pointColor: primary,
    },
    {
      label: "Student B",
      data:  [54, 65, 60, 70, 70, 75],
      fill: true,
      backgroundColor: "rgba(194,128,210,0.2)",
      borderColor: primary,
      borderWidth: 1,
      pointColor: primary,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  },
};

export const lineChartData = {
  type: 'line',
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
			label: "Rainfall",
			backgroundColor: "#FD7E40",
			borderColor: "#FD7E40",
			data: [26.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8, 142.6]
    },
  ],
  options: {
    layout: {
      padding: 10,
    },
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Precipitation in Toronto'
    }
  }
};

export const lineChartDataOption = {
  maintainAspectRatio: true,
  animation: {
    duration: 0,
  },
  scaleShowVerticalLines: false,
  plugins: {
    datalabels: {
      display: false,
      color: "white",
    },
    legend: {
      display: false,
    },
  },
};

export const doughnutChartData = {
  type: 'doughnut',
  labels: ["Tokyo",	"Mumbai",	"Mexico City",	"Shanghai"],
  datasets: [
    {
      data:[1424, 250,	500,	1040],
      borderColor:[primary,secondary,"#FD7E40","#2E8DD3"],
      backgroundColor: [primary,secondary,"#FD7E40","#2E8DD3"],
      borderWidth:1
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

export const doughnutChartDataOption= {
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
      color: 'white',
    },
    legend: {
      display: false,
    },
  },
};

export const polarChartData = {
  type: 'polarArea',
  labels: ["Mon",	"Tue",	"Wed",	"Thu"],
  datasets: [
    {
      data: [5000,	1050,	2424,	3440],
      borderColor: [primary, secondary, '#FD7E40', '#2E8DD3'],
      backgroundColor: ["rgba(67,185,178,0.2)", "rgba(194,128,210,0.2)", "rgba(253,126,64,0.2)", "rgba(46,141,211,0.2)"],
      borderWidth: 1
    },
  ],
};

export const polarChartDataOption= {
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
      color: 'white',
    },
    legend: {
      display: false,
    },
  },
};