
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { PersonalEmail } from "../Service/PersonalService";
import type { IPersonalFormValues } from "../Model/PersonalModels";

export const usePersonalProvider = () => {
  const [loading, setLoading] = useState(false);

  const personalSchema = object({
    firsName: string()
      .trim()
      .required("First name is required")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş]{2,}\s[A-Za-zƏəÖöÜüĞğÇçİıŞş]{2,}$/,
        "Name must contain at least 2 letters"
      ),
    email: string()
      .trim()
      .required("Email is required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ),
    phone: string()
      .trim()
      .required("Phone number is required")
      .matches(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"),
    vision: string()
      .required("Please enter your project vision")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş]{2,}$/,
        "Name must contain at least 2 letters"
      ),
  });

  const formMethods = useForm<IPersonalFormValues>({
    resolver: yupResolver(personalSchema),
  });

  const { reset } = formMethods;

  const onSubmit = async (data: IPersonalFormValues) => {
    setLoading(true);
    try {
      await PersonalEmail(data);
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
