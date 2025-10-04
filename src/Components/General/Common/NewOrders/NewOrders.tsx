import { useEffect, useState } from "react";
import { Card, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import SVG from "@/CommonComponent/SVG";
import {
  deliveryChartData,
  orderChartData,
  totalSaleChartData,
} from "@/Data/General/Dashboard/DashboardChartData";
import Cookies from "js-cookie";

const NewOrders = () => {
  const [totals, setTotals] = useState({
    hotspot_total: 0,
    pppoe_total: 0,
  });

  const [payments, setPayments] = useState({
    total_today: "0.00",
    total_month: "0.00",
  });

  const accessToken =
    Cookies.get("accessToken") || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch(
          `https://swiftnetmain.twigasoft.xyz/dashboard/total-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch totals");
        const data = await res.json();
        console.log("📊 Total Users:", data);
        setTotals(data);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `https://swiftnetmain.twigasoft.xyz/dashboard/pppoe-payments-total`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch payments");
        const data = await res.json();
        console.log("💰 PPPoE Payments:", data);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    if (accessToken) {
      fetchTotals();
      fetchPayments();
    }
  }, [accessToken]);

  const totalSalesData = [
    {
      title: "Income Today",
      badgeColor: "danger",
      svgIcon: "arrow-up-right",
      amount: `Kes. ${Number(payments.total_today).toLocaleString()}`, // dynamic 👈
      btnColor: "primary",
      icon: "Product-discount",
      details: "20% since Last Month",
      chart: totalSaleChartData,
    },
    {
      title: "Monthly Income",
      badgeColor: "success",
      svgIcon: "arrow-down-right",
      amount: `Kes. ${Number(payments.total_month).toLocaleString()}`, // dynamic 👈
      btnColor: "secondary",
      icon: "order-product",
      details: "14% since Last Month",
      chart: orderChartData,
    },
    {
      title: "Hotspot Users",
      badgeColor: "warning",
      svgIcon: "icon-signal",
      amount: totals.hotspot_total, // dynamic
      btnColor: "tertiary",
      icon: "delivery-van",
      details: "10% since Last Month",
      chart: orderChartData,
    },
    {
      title: "PPPoE Users",
      badgeColor: "danger",
      svgIcon: "arrow-up-right",
      amount: totals.pppoe_total, // dynamic
      btnColor: "tertiary",
      icon: "delivery-van",
      details: "10% since Last Month",
      chart: deliveryChartData,
    },
  ];

  return (
    <>
      {totalSalesData.map((item, i) => (
        <Col md="3" key={i}>
          <Card className="progress-items">
            <CardHeader className="pb-6">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="d-flex gap-2">
                    <h5 className="f-18 font-light">{item.title}</h5>
                  </div>
                  <h3 className="f-18s f-w-600 mt-3">{item.amount}</h3>
                </div>
                <div className={`flex-shrink-0 bg-light-${item.btnColor}`}>
                  <SVG className={`fill-${item.btnColor}`} iconId={item.icon} />
                </div>
              </div>
            </CardHeader>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default NewOrders;
