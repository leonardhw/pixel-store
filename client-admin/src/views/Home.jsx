import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

export default function Home() {
  const { isLoading } = useSelector((state) => state.preloader);
  return (
    <>
      {/* Navbar */}
      <Navbar page={"dashboard"} />
      {isLoading && <Preloader />}

      {/* Children outlet */}
      <Outlet />
    </>
  );
}
