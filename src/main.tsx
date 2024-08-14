import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { ThirdwebProvider as ProviderThird } from "@thirdweb-dev/react";
import {PolygonAmoyTestnet} from "@thirdweb-dev/chains"
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderThird clientId= {import.meta.env.VITE_clientId} activeChain={PolygonAmoyTestnet}>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
    </ProviderThird>
  </React.StrictMode>
);
