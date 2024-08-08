import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";

import RegistrConfirmation from "../src/routes/registration/registration-confirm";

const client = new ApolloClient({
  uri: "http://localhost:8080/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Route</div>} />
          <Route path="/welcome" element={<div>WelcomeScreen </div>} />
          <Route path="/registration-confirm" element={<RegistrConfirmation />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
