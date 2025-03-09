'use client';

import { MenuList } from "@/Data/Layout/Sidebar";
import { useAppSelector } from "@/Redux/Hooks";
import { MenuItem } from "@/Type/Layout/Sidebar";
import { Fragment, useState, useEffect } from "react";
import MenuLists from "./MenuLists";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

// Define the User type based on your Redux store
interface User {
  user_type?: string;
}

const SidebarMenuList = () => {
  const user = useSelector((state: RootState) => state.user) as User;
  const [activeMenu, setActiveMenu] = useState<string[]>([]);
  const [modifiedMenuList, setModifiedMenuList] = useState<MenuItem[]>(MenuList);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { t } = useTranslation("common");

  // Type the mainMenu parameter and ensure safe access
  const shouldHideMenu = (mainMenu: MenuItem): boolean => {
    return (
      mainMenu?.Items?.map((data) => data.title).every((title) => pinedMenu.includes(title || "")) || false
    );
  };

  useEffect(() => {
    console.log("Menu List - Network: ", MenuList[0].Items);
  }, [MenuList]);

  useEffect(() => {
    if (user.user_type) {
      console.log("Menu User Type: ", user.user_type);

      const updatedMenuList = MenuList.map((menu, index) => {
        if (index === 0 && menu.Items) {
          return {
            ...menu,
            Items: menu.Items.filter((item, itemIndex) => {
              // Hide item at index 6 (assuming it's "Routers") if not admin
              if (itemIndex === 6 && user.user_type !== "admin") {
                return false;
              }
              // Existing filter for item at index 9
              if (itemIndex === 9 && user.user_type !== "admin" && user.user_type !== "superadmin") {
                return false;
              }

              // Existing filter for item at index 9
              if (itemIndex === 7 && user.user_type !== "admin" && user.user_type !== "superadmin") {
                return false;
              }
              return true;
            }),
          };
        }
        return menu;
      });
      setModifiedMenuList(updatedMenuList);
    } else {
      setModifiedMenuList(MenuList);
    }
  }, [MenuList, user.user_type]);

  // Filter modifiedMenuList with type safety
  const filteredMenuList: MenuItem[] = modifiedMenuList.map((mainMenu) => ({
    ...mainMenu,
    Items: mainMenu.Items?.filter((item) => {
      // Existing filter for "People"
      if (item.title === "People") {
        return user.user_type === "admin" || user.user_type === "superadmin";
      }
      // Existing filter for "Network"
      if (item.title === "Network" && user.user_type !== "admin") {
        return false;
      }
      // Existing filter for "Network"
      if (item.title === "System Logs" && user.user_type !== "admin") {
        return false;
      }
      return true;
    }) ?? [],
  }));

  return (
    <>
      {filteredMenuList.map((mainMenu, index) => (
        <Fragment key={index}>
          <li className={`line ${index === 0 ? "pin-line" : ""}`} />
          <li
            className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}
          >
            {t(mainMenu.title)}
          </li>
          <MenuLists
            menu={mainMenu.Items ?? []}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            level={0}
          />
        </Fragment>
      ))}
    </>
  );
};

export default SidebarMenuList;