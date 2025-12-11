import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLocation, useNavigate } from "react-router-dom";
// İnterfeysləri ayrıca bir fayldan (məsələn, src/types/interfaces.ts) import etdiyinizi fərz edirik
// Lakin bu nümunədə, bütün kodu bir yerdə saxlamaq üçün onları buraya daxil edirik.

// ** TİPLƏRİN BURADA TƏKRAR TƏYİN EDİLMƏSİ **
interface CustomSectionProps {
  children: React.ReactNode;
  className: string;
}

interface PersonalFormData {
  vision: string;
  name: string;
  email: string;
  phone: string;
  agreed: boolean;
}

interface FormErrors {
  vision?: string;
  name?: string;
  email?: string;
  phone?: string;
  agreed?: string;
  [key: string]: string | undefined;
}

type FormStatus = "idle" | "sending" | "success" | "error";
// ** TİPLƏRİN SONU **

// CustomSection komponenti
const CustomSection: React.FC<CustomSectionProps> = ({
  children,
  className,
}) => <section className={className}>{children}</section>;

// Şəkil URL-ləri
const IMAGE_URLS = [
  "/src/assets/images/anime1.jpg",
  "/src/assets/images/anime2.jpg",
  "/src/assets/images/anime3.jpg",
  "/src/assets/images/anime4.jpg",
  "/src/assets/images/anime5.jpg",
  "/src/assets/images/anime6.jpg",
];

const SLIDER_IMAGES_TOP = [...IMAGE_URLS, ...IMAGE_URLS, ...IMAGE_URLS];
const SLIDER_IMAGES_BOTTOM = [
  ...IMAGE_URLS.slice(2),
  ...IMAGE_URLS.slice(2),
  ...IMAGE_URLS.slice(2),
];

// Email Regex funksiyası
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Yeni Banner Komponenti
const CollectionBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/");
  };

  return (
    <div className="collection-banner-section">
      <div className="banner-inner">
        <div className="container">
          <div className="row">
            <div className="left-content">
              <span className="inspiration-tag">INSPIREZ-VOUS</span>
              <h2>Discover my collection of paintings</h2>
              <p className="description">
                Explorez ma collection complète d'œuvres pour vous immerger dans
                mon univers artistique.
              </p>
            </div>
            <button className="explore-button" onClick={handleExploreClick}>
              <span className="button-text">Explorer la galerie</span>
              <span className="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Personal: React.FC = () => {
  // PersonalFormData interfeysindən istifadə edərək state-in tipini təyin edirik
  const [formData, setFormData] = useState<PersonalFormData>({
    vision: "",
    name: "",
    email: "",
    phone: "",
    agreed: false,
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  // FormStatus union type-dan istifadə edirik
  const [status, setStatus] = useState<FormStatus>("idle");
  // FormErrors interfeysindən istifadə edirik
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Tipi `PersonalFormData` olduğu üçün `name` xassəsinin düzgünlüyü təmin edilir.
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreed: e.target.checked }));
    setFormErrors((prev) => ({ ...prev, agreed: "" }));
  };

  // Əsas Yoxlama Funksiyası
  const validateForm = (): boolean => {
    const errors: FormErrors = {}; // FormErrors tipindən istifadə
    let isValid = true;

    // Mail Yoxlaması
    if (!formData.email) {
      errors.email = "E-poçt sahəsi tələb olunur.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Xahiş olunur düzgün e-poçt formatı daxil edin.";
      isValid = false;
    }
    // Ad və Vizyon Yoxlaması
    if (!formData.name) {
      errors.name = "Ad sahəsi tələb olunur.";
      isValid = false;
    }
    if (!formData.vision) {
      errors.vision = "Vizyon (təsvir) sahəsi tələb olunur.";
      isValid = false;
    }
    // Razılaşma Yoxlaması
    if (!formData.agreed) {
      errors.agreed = "Şərtlərlə razılaşmaq tələb olunur.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const templateParams = {
        to_name: "Admin",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.vision,
      };

      await emailjs.send(
        "service_xkj4atr",
        "template_cwl1snh",
        templateParams,
        "F7784TWvo8WCMqkCP"
      );

      setStatus("success");
      // Göndərilmədən sonra formu sıfırlayırıq
      setFormData({
        vision: "",
        name: "",
        email: "",
        phone: "",
        agreed: false,
      });
      setSelectedFiles(null);
      alert("Müraciətiniz uğurla göndərildi!");
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("error");
      alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
  };

  return (
    <CustomSection className="personal">
      <div className="container">
        <div className="row">
          <div className="top">
            <h2 className="title">Order personalized</h2>
            <p className="info">
              The works shown below are examples of custom creations
            </p>
          </div>
        </div>
        <div className="alone">
          <p className="info">
            Order a unique work of art that reflects your personality. Whether
            it's your pet, a cherished landscape, or a portrait.
          </p>
        </div>
      </div>

      <div className="scrolling-showcase">
        <div className="track track-top track-group">
          {SLIDER_IMAGES_TOP.map((url, index) => (
            <div key={`top-${index}`} className="slide slide-top-hover">
              <img
                src={url}
                alt={`Özəl Sənət Əsəri Nümunəsi ${index}`}
                loading="lazy"
                className="slide-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/333333/ffffff?text=Placeholder+Image";
                }}
              />
            </div>
          ))}
        </div>

        <div className="track track-bottom track-group">
          {SLIDER_IMAGES_BOTTOM.map((url, index) => (
            <div key={`bottom-${index}`} className="slide slide-bottom-hover">
              <img
                src={url}
                alt={`Özəl Sənət Əsəri Nümunəsi ${index}`}
                loading="lazy"
                className="slide-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/333333/ffffff?text=Placeholder+Image";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="order-container">
        <div className="container">
          <div className="row">
            <div className="order-layout">
              <div className="form-side">
                <h2 className="section-title">Your Project</h2>

                <form className="project-form" onSubmit={handleSubmit}>
                  <div className="form-group box-group">
                    <label>
                      Your vision <span>*</span>
                    </label>
                    <textarea
                      name="vision"
                      placeholder="Describe your project..."
                      value={formData.vision}
                      onChange={handleChange}
                    ></textarea>
                    {formErrors.vision && (
                      <p className="error-message">{formErrors.vision}</p>
                    )}
                  </div>

                  <div className="form">
                    <div className="row">
                      <div className="form-group line-group">
                        <label>
                          Full name <span>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {formErrors.name && (
                          <p className="error-message">{formErrors.name}</p>
                        )}
                      </div>
                      <div className="form-group line-group">
                        <label>
                          Email <span>*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formErrors.email && (
                          <p className="error-message">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="form-group line-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={formData.agreed}
                        onChange={handleCheckbox}
                      />
                      <label htmlFor="privacy">
                        I agree that my personal data will be used solely for
                        the purpose of processing my custom order request. This
                        data will not be shared with third parties and will be
                        stored in accordance with the privacy policy .
                      </label>
                    </div>
                    {formErrors.agreed && (
                      <p className="error-message">{formErrors.agreed}</p>
                    )}

                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={status === "sending"}
                      style={{ opacity: status === "sending" ? 0.7 : 1 }}
                    >
                      {status === "sending"
                        ? "Sending..."
                        : "Submit my application"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="info-side">
                <h3 className="info-title">How it works</h3>
                <div className="steps-list">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <p className="step-text">
                      Submit your request using this form{" "}
                    </p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <p className="step-text">
                      To clarify your project and explore its feasibility
                      discussion
                    </p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <p className="step-text">
                      A 30% deposit will be required to get started.{" "}
                    </p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <p className="step-text">
                      Receive your unique artwork after approval and payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <CollectionBanner />
          </div>
        </div>
      </div>
    </CustomSection>
  );
};

export default Personal;
