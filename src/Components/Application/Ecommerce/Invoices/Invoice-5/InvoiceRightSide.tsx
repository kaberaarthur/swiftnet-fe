import SVG from "@/CommonComponent/SVG";
import { Website } from "@/Constant";

const InvoiceRightSide = () => {
  return (
    <ul style={{ listStyle: "none", display: "flex", background: "linear-gradient(291deg, #43B9B2 21.2%, #43B9B2 83.92%)", padding: "31px 80px", borderBottomLeftRadius: "100px", gap:"28px" }} >
      <li style={{ display: "flex", alignItems: "center",}}>
        <SVG className="stroke-icon" iconId="call" style={{ height: 14, width: 14, fill: "#fff", marginRight: 10 }} />
        <span style={{ color: "#FFFFFF" }}>(239) 555-0108</span>
      </li>
      <li style={{ borderLeft: "1px dashed rgba(255, 255, 255, 0.3)", borderRight: "1px dashed rgba(255, 255, 255, 0.3)", padding: "0 22px", display: "flex", alignItems: "center", }} >
        <SVG className="stroke-icon" style={{ height: 16, width: 16, fill: "#fff", marginRight: 10 }} iconId="email-box" />
        <span style={{ color: "#FFFFFF"}}>Edmin@themesforest.com</span>
      </li>
      <li style={{ display: "flex", alignItems: "center",}}>
        <SVG className="stroke-icon" style={{ height: 16, width: 16, fill: "#fff", marginRight: 10 }} iconId="web" />
        <span style={{ color: "#FFFFFF"}}>{Website}: www.Edminthemes.com</span>
      </li>
    </ul>
  );
};

export default InvoiceRightSide;
