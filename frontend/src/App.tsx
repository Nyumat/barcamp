import { Route, Routes } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import Home from "./Home";
import Stream from "./Stream";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/stream/:channel",
    element: <Stream />,
  },
  {
    path: "/stream",
    element: <div>Stream</div>,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

export default function App() {
  return (
    <>
      <div className="w-full h-screen">
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Twitch</h1>
            <ModeToggle />
          </div>
        </nav>

        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </div>
    </>
  );
}
