"use client";
import Footer from "@/Layout/Footer/Footer";
import Header from "@/Layout/Header/Header";
import Sidebar from "@/Layout/Sidebar/Sidebar";
import TapTop from "@/Layout/TapTop/TapTop";
import ThemeCustomizer from "@/Layout/ThemeCustomizer/ThemeCustomizer";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setSidebarClose } from "@/Redux/Reducers/LayoutSlice";
import { setLayout } from "@/Redux/Reducers/ThemeCustomizerSlice";
import Store from "@/Redux/Store";
import ChildrenType from "@/Type/Layout/Header";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const RootLayout: React.FC<ChildrenType> = ({ children }) => {
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useAppDispatch();
  const { sidebarClose } = useAppSelector((state) => state.layout);
  const compactSidebar = () => {
    let windowWidth = window.innerWidth;
    if (layout === "compact-wrapper") {
      if (windowWidth < 1200) {
        dispatch(setSidebarClose(true));
      } else {
        dispatch(setSidebarClose(false));
      }
    } else if (layout === "horizontal-sidebar") {
      if (windowWidth < 1200) {
        dispatch(setSidebarClose(true));
        dispatch(setLayout("vertical"));
      } else {
        dispatch(setSidebarClose(false));
        dispatch(setLayout(localStorage.getItem("layout")));
      }
    }
  };
  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [layout]);

  return (
    <Provider store={Store}>
      <main className={`page-wrapper ${layout} ${sidebarClose ? "sidebar-close" : ""}`}>
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </main>
      {/*<ThemeCustomizer />*/}
      <ToastContainer />
      <TapTop />
    </Provider>
  );
};

export default RootLayout;
