import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./routes/home";
import Politicians from "./routes/politicians";
import Politician from "./routes/politician";
import About from "./routes/about";

// where to render HTML in public/index.html
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// what to render and overall routing for the site
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="politicians" element={<Politicians />} />
          <Route path="politician" element={<Politician />}>
            <Route path=":politicianId" element={<Politician />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route
            path="*"
            element={
              <div>
                <p>404</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);