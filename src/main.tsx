import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";
import { GlucoseNotificationPrompt, Start, Welcome, RegistrationConfirmation } from "./routes";
import ProtectedRoute from "./components/protected-route/protected-route";

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
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/registration-confirm" element={ <ProtectedRoute><RegistrationConfirmation /></ProtectedRoute> } />
          <Route path="/onboarding/glucose-notifications" element={ <ProtectedRoute><GlucoseNotificationPrompt /></ProtectedRoute> } />
          <Route path="/onboarding" element={ <ProtectedRoute><Start /></ProtectedRoute> } />
        </Routes >
      </BrowserRouter >
    </ApolloProvider >
  </React.StrictMode >
);
