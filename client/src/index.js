import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

// where to render HTML in public/index.html
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// what to render
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);