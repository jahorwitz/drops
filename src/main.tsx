import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DietGoalReminderList } from "./routes/onboarding/diet-goal-reminders-route";
import "./global/default.css";
import { GlucoseNotificationPrompt, Start, Welcome, RegistrationConfirmation } from "./routes";

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
          <Route path="/registration-confirm" element={<RegistrationConfirmation />} />
          <Route path="/onboarding/glucose-notifications" element={<GlucoseNotificationPrompt />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Start />} />
        </Routes >
      </BrowserRouter >
    </ApolloProvider >
  </React.StrictMode >
);
