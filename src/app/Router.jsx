import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
		element: <></>
    },
	{
		path: "/player",
		element: <></>
	}
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
