import CustomSection from "../../../components/CustomSection";
import { useContactProvider } from "../Provider/ContactProvider";
import { CircleOverlay } from "../../../components/animation/CircleOverlay";

const Contact = () => {
  const { loading, formMethods, onSubmit } = useContactProvider();
  const {
    register,
    formState: { errors },
  } = formMethods;

  if (loading) {
    return <CircleOverlay />;
  }
  return (
    <CustomSection className="contact">
      <div className="container">
        <div className="row">
          <div className="top">
            <h2 className="title">Contact me</h2>
            <p className="info">
              For any questions, collaborations, or simply to discuss art.
            </p>
          </div>
          <section className="bottom">
            <div className="row">
              <div className="right">
                <div className="contact-details-card">
                  <h3 className="card-title">Contact details</h3>
                  <div className="contact-info-list">
                    <div className="contact-item">
                      <span className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </span>
                      <a
                        href="mailto:pascale.canal.art@gmail.com"
                        className="detail-text mail-link"
                      >
                        pascale.canal.art@gmail.com
                      </a>
                    </div>

                    <div className="contact-item">
                      <span className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 17.77 17.77 0 0 0 .52 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 17.77 17.77 0 0 0 2.81.52A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </span>
                      <a
                        href="tel:+33686596029"
                        className="detail-text phone-link"
                      >
                        +33 6 86 59 60 29
                      </a>
                    </div>
                  </div>

                  <h3 className="card-title follow-title">Follow me</h3>
                  <div className="social-links">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>

                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 0-6 6v7h-4v-7a6 6 0 0 1 6-6 6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="left">
                <div className="contact-form-card">
                  <h3 className="card-title">Your contact details</h3>
                  <form
                    onSubmit={onSubmit}
                    className="contact-form"
                  >
                    <div className="form-group-inline">
                      <div className="input-container">
                        <input
                          type="text"
                          placeholder="First name*"
                          className={`form-input ${
                            errors.firsName ? "input-error" : ""
                          }`}
                          {...register("firsName", {
                            required: "Birinci ad tələb olunur",
                          })}
                        />
                        {errors.firsName && (
                          <p className="error-message">
                            {errors.firsName.message}
                          </p>
                        )}
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          placeholder="Surname*"
                          className={`form-input ${
                            errors.surname ? "input-error" : ""
                          }`}
                          {...register("surname", {
                            required: "Soyad tələb olunur",
                          })}
                        />
                        {errors.surname && (
                          <p className="error-message">{errors.surname.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="input-container">
                      <input
                        type="email"
                        placeholder="E-mail*"
                        className={`form-input ${
                          errors.email ? "input-error" : ""
                        }`}
                        {...register("email", {
                          required: "E-mail tələb olunur",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Etibarlı e-mail daxil edin",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="input-container">
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="form-input"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="error-message">{errors.phone.message}</p>
                      )}
                    </div>

                    <button type="submit" className="submit-button">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CustomSection>
  );
};

export default Contact;
