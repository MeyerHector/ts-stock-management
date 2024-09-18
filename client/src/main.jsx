import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/auth/Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>
);
