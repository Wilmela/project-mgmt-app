import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import 'aos/dist/aos.css'

import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
    <Router>
      <App />
    </Router>
);