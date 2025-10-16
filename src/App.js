import { Provider } from "react-redux";
import { Body } from "./components";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContainer } from "./components/body/mainContainer";
import Watch from "./components/body/watch";
import { SearchResults } from "./components/body/mainContainer/videos/SearchResults";
import { Header } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
      {
        path: "/results",
        element: <SearchResults />,
      },
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
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
