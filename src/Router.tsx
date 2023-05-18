import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import HouseDetail from "./routes/HouseDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import HouseUpload from "./routes/HouseRegister";

const myRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
          errorElement: <NotFound />,
        },
        {
          path: "houses/upload",
          element: <HouseUpload />,
          errorElement: <NotFound />,
        },
        {
          path: "houses/:housePk",
          element: <HouseDetail />,
          errorElement: <NotFound />,
        },
        {
          path: "social",
          children: [
            {
              path: "github",
              element: <GithubConfirm />,
              errorElement: <NotFound />,
            },
            {
              path: "kakao",
              element: <KakaoConfirm />,
              errorElement: <NotFound />,
            },
          ],
        },
      ],
      errorElement: <NotFound />,
    },
  ],
  { basename: "" }
);

export default myRouter;
