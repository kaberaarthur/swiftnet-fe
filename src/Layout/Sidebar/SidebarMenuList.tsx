import { MenuList } from "@/Data/Layout/Sidebar";
import { useAppSelector } from "@/Redux/Hooks";
import { MenuItem } from "@/Type/Layout/Sidebar";
import { Fragment, useState } from "react";
import MenuLists from "./MenuLists";
import { useTranslation } from "react-i18next";

const SidebarMenuList = () => {
  const [activeMenu, setActiveMenu] = useState<string[]>([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { t } = useTranslation("common");
  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) => pinedMenu.includes(titles || ""));
  };

  return (
    <>
      {MenuList &&
        MenuList.map((mainMenu: MenuItem, index) => (
          <Fragment key={index}>
            <li className={`line ${index === 0 ? "pin-line" : ""} `}></li>
            <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>{t(mainMenu.title)}</li>
            <MenuLists menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
          </Fragment>
        ))}
    </>
  );
};

export default SidebarMenuList;
