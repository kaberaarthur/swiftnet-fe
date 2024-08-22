import React from "react";
import { Cancel, Href, PrintInvoice } from "@/Constant";
import Link from "next/link";
import { InvoicePrintType } from "@/Type/Application/Ecommerce/Ecommerce";

export const InvoiceButtons: React.FC<InvoicePrintType> = ({ handlePrint }) => {

  return (
    <span style={{display: "flex",justifyContent: "end",gap: 15,}}>
      <Link onClick={handlePrint} style={{background: "rgba(67, 185, 178, 1)",color: "rgba(255, 255, 255, 1)",borderRadius: 10,padding: "18px 27px",fontSize: 16,fontWeight: 600,outline: 0,border: 0,textDecoration: "none",}} href={Href}>
        {PrintInvoice}
        <i className="icon-arrow-right" style={{fontSize: 13,fontWeight: "bold",marginLeft: 10}}/>
      </Link>
      <Link style={{background: "rgba(67, 185, 178 , 0.1)",color: "rgba(67, 185, 178, 1)",borderRadius: 10,padding: "18px 27px",fontSize: 16,fontWeight: 600,outline: 0,border: 0,textDecoration: "none",}} href={Href} download>
        {Cancel}
        <i className="icon-arrow-right" style={{fontSize: 13,fontWeight: "bold",marginLeft: 10}}/>
      </Link>
    </span>
  );
};