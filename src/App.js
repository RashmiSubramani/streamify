import { Provider } from "react-redux";
import { Header } from "./components";
import { Body } from "./components";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContainer } from "./components/body/mainContainer";
import Watch from "./components/body/watch";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "/watch", element: <Watch /> },
    ],
  },
]);

//Wherever we give RouterProvider, it will render according to it.
//In our case, inside watch page, we will have collapsible sidebar and header like outside. So maincontainer is only changing in this case. So wherever i give RouterProvider, appRouter will be rendered. So I am giving it on top of Body
//Children will go wherever we have created Outlet
//Where do we create Outlet ? In Body, after SideBar.
//SO now add children items
function App() {
  return (
    <Provider store={store}>
      <Header />
      <RouterProvider router={appRouter} />
      {/* <Body /> */}
    </Provider>
  );
}

export default App;
