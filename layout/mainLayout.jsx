import Navbar from "../components/navigation/navbar";
import SideMenu from "../components/navigation/sideMenu";
import { useState } from "react";

export default function Layout({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar/>
      <div style={{ display: "flex", flex: 1 }}>
        <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
        <main style={{ flex: 1, maxWidth: "100%", overflowX: "hidden" }}>{children}</main>
      </div>
    </div>
  );
}
