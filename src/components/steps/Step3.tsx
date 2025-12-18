import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { goToNextStep } from "../../store/modalSlice";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepEmail } from "../Service/ServiceStep3";
import type { IStepFormValues } from "../Models/Step3Models";
import { CircleOverlay } from "../animation/CircleOverlay";

const Step3_Coordinates: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const buyChame = object({
    firsName: string()
      .trim()
      .required("Name is required")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş\s'-]+$/,
        "Name must contain only letters"
      )
      .min(2, "Name must be at least 2 characters"),
    surname: string()
      .trim()
      .required("Surname is required")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş\s'-]+$/,
        "Surname must contain only letters"
      )
      .min(2, "Surname must be at least 2 characters"),
    email: string()
      .trim()
      .required("Email is required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ),
    phone: string()
      .trim()
      .required("Phone number is required")
      .matches(
        /^\+?[0-9]{7,15}$/,
        "Please enter a valid phone number"
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStepFormValues>({
    resolver: yupResolver(buyChame),
    mode: "all",
  });

  const [globalError, setGlobalError] = useState<string | null>(null);

  const onError = () => {
    setGlobalError("Please fill in the form");
  };

  const onSubmit = async (data: IStepFormValues) => {
    setLoading(true);
    setGlobalError(null);
    try {
      await StepEmail(data);
      dispatch(goToNextStep());
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircleOverlay />;
  }

  return (
    <div className="step-content step-3-coordinates">
      <h3>Your contact information</h3>
      <p>Please enter your contact information.</p>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="coordinates-form">
        <div className="form-group-inline">

          <div className="input-container">
            <input
              type="text"
              placeholder="Name*"
              className={errors.firsName ? "input-error" : ""}
              {...register("firsName")}
            />

            {errors.firsName && (
              <span className="error-message">{errors.firsName.message}</span>
            )}
          </div>


          <div className="input-container">
            <input
              type="text"
              placeholder="Surname*"
              className={errors.surname ? "input-error" : ""}
              {...register("surname")}
            />
            {errors.surname && (
              <span className="error-message">{errors.surname.message}</span>
            )}
          </div>
        </div>


        <div className="form-group">
          <input
            type="email"
            placeholder="Email*"
            className={errors.email ? "input-error" : ""}
            {...register("email")}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>


        <div className="form-group">
          <input
            type="tel"
            placeholder="Telephone*"
            className={errors.phone ? "input-error" : ""}
            {...register("phone")}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
        
        {globalError && (
          <div style={{ color: "#ff6b6b", textAlign: "center", marginBottom: "10px" }}>
            {globalError}
          </div>
        )}

        <div className="form-navigation-footer">

          <button
            type="submit"
            className="suivant-btn"
            style={{
              cursor: "pointer",
            }}
          >
            Ok
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3_Coordinates;