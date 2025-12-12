import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { goToNextStep, goToPreviousStep } from "../../store/modalSlice";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepEmail } from "../Service/ServiceStep3";
import type { IStepFormValues } from "../Models/Step3Models";

const Step3_Coordinates: React.FC = () => {
  const dispatch = useAppDispatch();
  const buyChame = object({
    firsName: string()
      .trim()
      .required("Ad mütləq daxil edilməlidir")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş\s'-]+$/,
        "Ad yalnız hərflərdən ibarət olmalıdır"
      )
      .min(2, "Ad ən azı 2 hərfdən ibarət olmalıdır"),
    surname: string()
      .trim()
      .required("Soyad mütləq daxil edilməlidir")
      .matches(
        /^[A-Za-zƏəÖöÜüĞğÇçİıŞş\s'-]+$/,
        "Soyad yalnız hərflərdən ibarət olmalıdır"
      )
      .min(2, "Soyad ən azı 2 hərfdən ibarət olmalıdır"),
    email: string()
      .trim()
      .required("Email mütləq daxil edilməlidir")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Zəhmət olmasa düzgün email daxil edin"
      ),
    phone: string()
      .trim()
      .required("Telefon nömrəsi mütləq daxil edilməlidir")
      .matches(
        /^\+?[0-9]{7,15}$/,
        "Zəhmət olmasa düzgün telefon nömrəsi daxil edin"
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IStepFormValues>({
    resolver: yupResolver(buyChame),
    mode: "all",
  });

  const onSubmit = async (data: IStepFormValues) => {
    try {
      await StepEmail(data);
      dispatch(goToNextStep());
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="step-content step-3-coordinates">
      <h3>Vos coordonnées</h3>
      <p>Zəhmət olmasa, əlaqə məlumatlarınızı daxil edin.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="coordinates-form">
        <div className="form-group-inline">
          {/* Ad Inputu */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Prénom*"
              className={errors.firsName ? "input-error" : ""}
              {...register("firsName")}
            />
            {/* Səhv varsa mesaj çıxır */}
            {errors.firsName && (
              <p className="error-message">{errors.firsName.message}</p>
            )}
          </div>

          {/* Soyad Inputu */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Nom*"
              className={errors.surname ? "input-error" : ""}
              {...register("surname")}
            />
            {errors.surname && (
              <span className="error-message">{errors.surname.message}</span>
            )}
          </div>
        </div>

        {/* Email Inputu */}
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

        {/* Telefon Inputu */}
        <div className="form-group">
          <input
            type="tel"
            placeholder="Téléphone*"
            className={errors.phone ? "input-error" : ""}
            {...register("phone")}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
        <div className="form-navigation-footer">
          <button
            type="button"
            className="precedent-btn"
            onClick={() => dispatch(goToPreviousStep())}
          >
            Précédent
          </button>
          <button
            type="submit"
            className="suivant-btn"
            disabled={!isValid}
            style={{
              opacity: !isValid ? 0.5 : 1,
              cursor: !isValid ? "not-allowed" : "pointer",
            }}
          >
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3_Coordinates;