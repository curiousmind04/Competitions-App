import { Outlet } from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
