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
import { Insight } from "./components/insight-box";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Insight
                title="You need to exercise more!"
                message="Try walking for at least 1 hour per day."
              />
            }
          />
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
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
