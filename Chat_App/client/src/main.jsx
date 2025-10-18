import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "../Context/UserContext.jsx";
import { SocketProvider } from "../Context/SocketContext.jsx";
import { AppProvider } from "../Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
    <UserProvider>
      <SocketProvider>
          <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </AppProvider>
      </SocketProvider>
    </UserProvider>
);
