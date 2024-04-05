import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";
import { ModalProvider } from "./components/modal";

const client = new ApolloClient({
  uri: "http://localhost:8080/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home Route</div>} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
