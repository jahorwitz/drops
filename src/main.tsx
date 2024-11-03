import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DietGoalReminderList } from "./routes/onboarding/diet-goal-reminders-route";
import "./global/default.css";
import { UseFormSetValue, FieldValues } from "react-hook-form";

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
          <Route path="/onboarding" element={<DietGoalReminderList onChange={function (): UseFormSetValue<FieldValues> {
            throw new Error("Function not implemented.");
          } }/>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
