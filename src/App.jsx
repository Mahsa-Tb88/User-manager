import React from "react";
import MainArea from "./components/MainArea";
import SideBar from "./components/SideBar";
import { UseContextProvider } from "./context/AppContext";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <UseContextProvider>
      <div className="app d-flex justify-content-between align-items-baseline">
        <SideBar />
        <div className="w-75 px-2">
          <MainArea />
          <Outlet />
        </div>
      </div>
    </UseContextProvider>
  );
}
