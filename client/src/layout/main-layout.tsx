import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function MainLayout() {
  return (
    <>
      <div id="mainLayout">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
