import { useNavigate } from "react-router-dom";
import { usePersonalProvider } from "../Provider/PersonalProvider";
import { CircleOverlay } from "../../../components/animation/CircleOverlay";

interface CustomSectionProps {
  children: React.ReactNode;
  className: string;
}




const CustomSection: React.FC<CustomSectionProps> = ({
  children,
  className,
}) => <section className={className}>{children}</section>;


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
           Explore my complete collection of works to immerse yourself in my artistic world.
              </p>
            </div>
            <button className="explore-button" onClick={handleExploreClick}>
              <span className="button-text">Explore the gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Personal: React.FC = () => {
   const { loading, formMethods, onSubmit } = usePersonalProvider();
   const {
     register,
     formState: { errors },
   } = formMethods;

   if(loading){
      return <CircleOverlay />
    }
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
                alt={`Custom artwork sample ${index}`}
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
                alt={`Custom artwork sample ${index}`}
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
                <form
                  className="project-form"
                  onSubmit={onSubmit}
                >
                  <div className="form-group box-group">
                    <label>
                      Your vision <span>*</span>
                    </label>
                    <textarea
                      placeholder="Describe your project..."
                      {...register("vision", {
                        required: "Please enter your project vision.",
                      })}
                    ></textarea>
                    {errors.vision && (
                      <p className="error-message">{errors.vision.message}</p>
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
                          {...register("firsName", {
                            required: "First name is required",
                          })}
                        />
                        {errors.firsName && (
                          <p className="error-message">
                            {errors.firsName.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group line-group">
                        <label>
                          Email <span>*</span>
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors.email && (
                          <p className="error-message">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group line-group">
                        <label>Phone <span>*</span></label>
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                        />
                        {errors.phone && (
                          <p className="error-message">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">


                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? "Sending..." : "Submit my application"}
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
