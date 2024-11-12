import { ReactNode } from "react";

import Content from "./content";
import Header from "./header";
import Footer from "./footer";
import Step from "../Step";

const Step1: ReactNode = (
  <Step stepNumber={1}>
    <Header />
    <Content />
    <Footer stepNumber={1} />
  </Step>
);

const Step2: ReactNode = (
  <Step stepNumber={2}>
    <Header />
    <Content />
    <Footer stepNumber={2} />
  </Step>
);

const Step3: ReactNode = (
  <Step stepNumber={3}>
    <Header />
    <Content />
    <Footer stepNumber={3} />
  </Step>
);
export const stepArray = [Step1, Step2, Step3];
