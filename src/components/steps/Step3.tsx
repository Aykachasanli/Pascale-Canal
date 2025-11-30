import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { goToNextStep, goToPreviousStep } from "../../store/modalSlice";

interface CoordinatesState {
  prenom: string; 
  nom: string; 
  email: string; 
  telephone: string; 
}

const Step3_Coordinates: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [coordinates, setCoordinatesState] = useState<CoordinatesState>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
  });

  const [errors, setErrors] = useState<Partial<CoordinatesState>>({});

  const nameRegex = /^[A-Za-zÇçĞğİıÖöŞşÜü' -]+$/;
  const phoneRegex = /^[0-9\s()+-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinatesState((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof CoordinatesState]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CoordinatesState> = {};

    if (!coordinates.prenom.trim()) {
        newErrors.prenom = "Ad sahəsi tələb olunur.";
    } else if (!nameRegex.test(coordinates.prenom.trim())) {
        newErrors.prenom = "Ad yalnız hərflərdən ibarət olmalıdır.";
    }

    if (!coordinates.nom.trim()) {
        newErrors.nom = "Soyad sahəsi tələb olunur.";
    } else if (!nameRegex.test(coordinates.nom.trim())) {
        newErrors.nom = "Soyad yalnız hərflərdən ibarət olmalıdır.";
    }

    if (!coordinates.email.trim()) {
      newErrors.email = "Email sahəsi tələb olunur.";
    } else if (!emailRegex.test(coordinates.email.trim())) {
      newErrors.email = "Düzgün email ünvanı daxil edin (@ simvolu tələb olunur).";
    }

    if (!coordinates.telephone.trim()) {
      newErrors.telephone = "Telefon nömrəsi tələb olunur.";
    } else if (!phoneRegex.test(coordinates.telephone.trim())) {
        newErrors.telephone = "Telefon nömrəsi yalnız rəqəm və simvollardan (+, -, (, )) ibarət olmalıdır.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const isFormValid = validate;
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      
      dispatch(goToNextStep());
    }
  };
  
  const isButtonActive = 
      coordinates.prenom.trim() !== "" &&
      coordinates.nom.trim() !== "" &&
      coordinates.email.trim() !== "" &&
      coordinates.telephone.trim() !== "";

  return (
    <div className="step-content step-3-coordinates">
      <h3>Vos coordonnées</h3>
      <p>Zəhmət olmasa, əlaqə məlumatlarınızı daxil edin.</p>

      <form onSubmit={handleNext} className="coordinates-form">
        
        <div className="form-group-inline">
          <div className="input-container">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom*"
              value={coordinates.prenom}
              onChange={handleChange}
              className={errors.prenom ? 'input-error' : ''}
            />
            {errors.prenom && <span className="error-message">{errors.prenom}</span>}
          </div>
          
          <div className="input-container">
            <input
              type="text"
              name="nom"
              placeholder="Nom*"
              value={coordinates.nom}
              onChange={handleChange}
              className={errors.nom ? 'input-error' : ''}
            />
            {errors.nom && <span className="error-message">{errors.nom}</span>}
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={coordinates.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone*"
            value={coordinates.telephone}
            onChange={handleChange}
            className={errors.telephone ? 'input-error' : ''}
          />
          {errors.telephone && <span className="error-message">{errors.telephone}</span>}
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
                disabled={!isButtonActive} 
            >
                Suivant
            </button>
        </div>

      </form>
    </div>
  );
};

export default Step3_Coordinates;