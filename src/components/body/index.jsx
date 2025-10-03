import { Outlet } from "react-router-dom";
import { MainContainer } from "./mainContainer";
import { SideBar } from "./sidebar";

export function Body() {
  return (
    // <div className="grid grid-cols-12">
    // <div className="grid grid-cols-12">
    //   <SideBar />
    //   <MainContainer />
    // </div>
    // <div className="flex">
    //   <SideBar className="w-64 flex-shrink-0" />
    //   <MainContainer className="flex-1" />
    // </div>
    // <div className="flex">
    <div className="grid grid-cols-[280px_1fr] h-screen">
      {/* Sidebar: fixed width, sticky, scrollable */}
      <SideBar />

      {/* Main content: fills remaining space, scrollable
      <MainContainer /> */}
      <Outlet />
    </div>
  );
}
