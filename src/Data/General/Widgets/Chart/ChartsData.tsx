import { productChart, projectChart, saleChart } from "../WidgetsChartData";

export const saleChartData = [
    {
        title:"Total Sale",
        amount:"$3654.00",
        description:"Compare to last month",
        percentage:"+65%",
        id:"chart-widget1",
        chart:saleChart
    },
    {
        title:"Total Project",
        amount:"12569",
        description:"Compare to last month",
        percentage:"+65%",
        id:"chart-widget2",
        chart:projectChart
    },
    {
        title:"Total Product",
        amount:"93M",
        description:"Compare to last month",
        percentage:"+65%",
        id:"chart-widget3",
        chart:productChart
    }
]