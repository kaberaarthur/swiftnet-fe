import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { useEffect, useState } from "react";

const TapTop = () => {
  const [tapTopStyle, setTapTopStyle] = useState("none");
  const executeScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const handleScroll = () => (window.scrollY > 100 ? setTapTopStyle("block") : setTapTopStyle("none"));

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="tap-top" style={{ display: tapTopStyle }}>
      <SvgIcon className="feather" iconId="arrow-up" onClick={executeScroll} />
    </div>
  );
};

export default TapTop;
