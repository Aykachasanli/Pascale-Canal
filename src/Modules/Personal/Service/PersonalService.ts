import emailjs from "emailjs-com";
import type { IPersonalFormValues } from "../Models/PersonalModels";
export const PersonalEmail = (data: IPersonalFormValues) => {
  return emailjs.send(
    "service_h6tlr3i",
    "template_ovadtjw",
    {
      firsName: data.firsName,
      email: data.email,
      phone: data.phone,
      vision: data.vision,
    },
    "F7784TWvo8WCMqkCP"
  );
};
