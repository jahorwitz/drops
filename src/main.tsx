import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";
import {
  GlucoseNotificationPrompt,
  Start,
  Welcome,
  Login,
  RegistrationConfirmation,
  MedicationReminderForm,
} from "./routes";
import { client } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Route</div>} />
          <Route
            path="/registration-confirm"
            element={<RegistrationConfirmation />}
          />
          <Route
            path="/onboarding/glucose-notifications"
            element={<GlucoseNotificationPrompt />}
          />
          <Route
            path="/onboarding/medication-reminders"
            element={<MedicationReminderForm />}
          />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
