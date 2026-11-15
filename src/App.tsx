// import Login from "./pages/auth/Login";

import { RouterProvider } from "react-router";
import router from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
      </AuthProvider>
    </>
  );
}

export default App;
