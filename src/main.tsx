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
  AccountCreationForm,
  MedicationReminderForm,
  Settings,
  Dashboard,
  Notifications,
  Insights,
} from "./routes";

import { client } from "./store";

import ProtectedRoute from "./components/protected-route/protected-route";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Route</div>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/registration-confirm"
            element={<RegistrationConfirmation />}
          />
          <Route path="/registration" element={<AccountCreationForm />} />
          <Route
            path="/onboarding/medication-reminders"
            element={
              <ProtectedRoute>
                <MedicationReminderForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/glucose-notifications"
            element={
              <ProtectedRoute>
                <GlucoseNotificationPrompt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Start />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute>
            <Notifications />
          </ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute>
            <Insights />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
