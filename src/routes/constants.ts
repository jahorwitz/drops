export const ROUTES = {
  HOME: "/",
  AUTH: {
    WELCOME: "/welcome",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    REGISTRATION_DETAILS: "/registration-details",
    REGISTRATION_CONFIRM: "/registration-confirm",
  },
  ONBOARDING: {
    ROOT: "/onboarding",
    MEDICATION_REMINDERS: "/onboarding/medication-reminders",
    GLUCOSE_NOTIFICATIONS: "/onboarding/glucose-notifications",
  },
  APP: {
    DASHBOARD: "/dashboard",
    NOTIFICATIONS: "/notifications",
    INSIGHTS: "/insights",
    SETTINGS: "/settings",
    DIET: {
      ROOT: "/diet",
      SETTINGS: "/diet/settings",
      RECORD_MEAL: "/diet/record-meal",
    }
  },
} as const;
