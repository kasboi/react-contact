import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Create from "./Create.jsx"
import Contact from "./Contact.jsx"
import Edit from "./Edit.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Create />,
            },
            {
                path: "/contact/:id",
                element: <Contact />,
            },
            {
                path: "/edit/:id",
                element: <Edit />,
            },
        ],
    },
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
