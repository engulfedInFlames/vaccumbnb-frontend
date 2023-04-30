import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import myRouter from "./Router";
import theme from "./theme";

// QueryClient은 fetch하는 모든 데이터들과 해당 데이터들의 데이터들을 가지고 있다. Fetch된 것, Fetch 중인 것 등등
const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={client}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={myRouter} />
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

/*
ColorModeScript로 유저가 어떤 컬라 테마를 선택했는지를 확인한다. 그리고나서 Router를 통해 HTML 등이 로드된다. Chakra는 유저의 로컬 스토리지에 처음 테마가 무엇이었는지를 저장한다.
*/
