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
import { ROUTES } from "./routes/constants";
import { client } from "./store";
import ProtectedRoute from "./components/protected-route/protected-route";
import { HomeRedirect } from "./components/protected-route/home-redirect";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* Home redirect */}
          <Route path={ROUTES.HOME} element={<HomeRedirect />} />

          {/* Authentication routes */}
          <Route path={ROUTES.AUTH.WELCOME} element={<Welcome />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route
            path={ROUTES.AUTH.REGISTRATION}
            element={<AccountCreationForm />}
          />
          <Route
            path={ROUTES.AUTH.REGISTRATION_CONFIRM}
            element={<RegistrationConfirmation />}
          />

          {/* Onboarding routes */}
          <Route
            path={ROUTES.ONBOARDING.ROOT}
            element={
              <ProtectedRoute>
                <Start />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ONBOARDING.MEDICATION_REMINDERS}
            element={
              <ProtectedRoute>
                <MedicationReminderForm />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ONBOARDING.GLUCOSE_NOTIFICATIONS}
            element={
              <ProtectedRoute>
                <GlucoseNotificationPrompt />
              </ProtectedRoute>
            }
          />

          {/* Main application routes */}
          <Route
            path={ROUTES.APP.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.APP.NOTIFICATIONS}
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.APP.INSIGHTS}
            element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.APP.SETTINGS}
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
