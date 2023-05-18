import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from "../lib/useUser";

function Root() {
  const { isUserLoading, user } = useUser();
  return (
    <>
      <Header isUserLoading={isUserLoading} user={user}></Header>
      <Outlet context={{ isUserLoading, user }} />
      <Footer></Footer>
    </>
  );
}

export default Root;
