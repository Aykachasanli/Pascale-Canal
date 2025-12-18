
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { contactEmail } from "../Service/ContactService";
import type { IContactFormValues } from "../Model/IContactForm";

export const useContactProvider = () => {
  const [loading, setLoading] = useState(false);

  const contactSchema = object({
    surname: string()
      .trim()
      .required()
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş]{2,}$/,
        "Name must contain at least 2 letters"
      ),
    firsName: string()
      .trim()
      .required()
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş]{2,}$/,
        "Name must contain at least 2 letters"
      ),
    email: string()
      .trim()
      .required()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ),
    phone: string()
      .trim()
      .required()
      .matches(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"),
  });

  const formMethods = useForm<IContactFormValues>({
    resolver: yupResolver(contactSchema),
  });

  const { reset } = formMethods;

  const onSubmit = async (data: IContactFormValues) => {
    setLoading(true);
    try {
      await contactEmail(data);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
  };
};
