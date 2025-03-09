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
  user_type?: string; // Optional, as it might not always be set
  // Add other fields as needed, e.g., id, name, etc.
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
    if (user.user_type) {
      console.log("Menu User Type: ", user.user_type);

      // Check if user is neither admin nor superadmin
      if (user.user_type !== "admin" && user.user_type !== "superadmin") {
        const updatedMenuList = MenuList.map((menu, index) => {
          if (index === 0 && menu.Items) {
            return {
              ...menu,
              Items: menu.Items.filter((_, itemIndex) => itemIndex !== 9),
            };
          }
          return menu;
        });
        setModifiedMenuList(updatedMenuList);
      } else {
        setModifiedMenuList(MenuList);
      }
    }

    // Debugging logs with type safety
    if (MenuList?.[0]) {
      if (MenuList[0].Items?.[9]) {
        console.log("Original MenuList[0].Items[9]:", MenuList[0].Items[9]);
      } else {
        console.log("MenuList[0].Items[9] is undefined or Items array is too short");
      }
    } else {
      console.log("MenuList[0] is undefined or MenuList is empty");
    }
  }, [MenuList, user.user_type]);

  // Filter modifiedMenuList with type safety
  const filteredMenuList: MenuItem[] = modifiedMenuList.map((mainMenu) => ({
    ...mainMenu,
    Items: mainMenu.Items?.filter((item) => {
      if (item.title === "People") {
        return user.user_type === "admin" || user.user_type === "superadmin";
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