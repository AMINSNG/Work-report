// import Login from "./pages/auth/Login";

import { RouterProvider } from "react-router";
import router from "./routes/AppRouter";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
