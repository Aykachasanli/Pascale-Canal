import emailjs from "emailjs-com";
import type { IContactFormValues } from "../Models/IContactForm";
export const contactEmail = (data: IContactFormValues) => {
  return emailjs.send(
    "service_h6tlr3i",
    "template_ovadtjw",
    {
      firsName: data.firsName,
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    "F7784TWvo8WCMqkCP"
  );
};
