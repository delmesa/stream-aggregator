import Home from "@/pages/Home/Home";
import PlaySession from "@/pages/PlaySession/PlaySession";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
		element: <Home />
    },
	{
		path: "/player",
		element: <PlaySession />
	}
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
