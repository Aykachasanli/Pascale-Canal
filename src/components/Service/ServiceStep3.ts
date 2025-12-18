import emailjs from "emailjs-com";
import type { IStepFormValues } from "../Models/Step3Models";

export const StepEmail = (data: IStepFormValues) => {
  return emailjs.send(
    "service_h6tlr3i",
    "template_ovadtjw",
    {
      firsName: data.firsName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
    },
    "F7784TWvo8WCMqkCP"
  );
};
