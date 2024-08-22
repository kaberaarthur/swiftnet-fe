import { useState } from "react";
import ThemeCustomizerSidebar from "./ThemeCustomizerSidebar";

const ThemeCustomizer = () => {
  const [open,setOpen] = useState<boolean>(false)
  return (
    <>
      <div className="sidebar-pannle-main">
        <ul>
          <li className="cog-click icon-btn btn-primary" onClick={()=>setOpen(true)}>
            <i className="fa fa-spin fa-cog" />
          </li>
        </ul>
      </div>
      <ThemeCustomizerSidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default ThemeCustomizer;
