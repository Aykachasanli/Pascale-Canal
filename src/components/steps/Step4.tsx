
import { useAppDispatch } from "../../store/hooks";
import { closeModal } from "../../store/modalSlice";

const Step4 = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="step-content step-4-success">
      <div className="success-icon">✓</div>
      <h3>Success!</h3>
      <p>Your message has been sent successfully. We will get back to you shortly.</p>
      
      <button 
        className="close-button"
        onClick={() => dispatch(closeModal())}
      >
        Close
      </button>
    </div>
  );
};

export default Step4;