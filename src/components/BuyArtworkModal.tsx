// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { X } from "lucide-react";
// import { selectModalState, closeModal, nextStep, prevStep } from "../store/modalSlice";
// import type { RootState } from "../store/store";



// const BuyArtworkModal: React.FC = () => {
//   const dispatch = useDispatch();
//   const modal = useSelector((state: RootState) => selectModalState(state));

//   if (!modal.isModalOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         {/* Close Button */}
//         <button className="close-btn" onClick={() => dispatch(closeModal())}>
//           <X size={28} />
//         </button>

//         <h1 className="modal-title">Buy this artwork</h1>
//         <p className="modal-desc">
//           Fill out this form and I will contact you shortly to discuss the details.
//         </p>

//         {/* STEP BAR */}
//         <div className="step-bar">
//           {Array.from({ length: modal.totalSteps }, (_, i) => i + 1).map((s) => (
//             <div
//               key={s}
//               className={`step-item ${modal.currentStep === s ? "active" : modal.currentStep > s ? "done" : ""}`}
//             >
//               <div className="circle">{s}</div>
//               <div className="line"></div>
//             </div>
//           ))}
//         </div>

//         {/* Step Content - Boş saxlanıb, ayrı TSX faylında yazılacaq */}
//         <div className="step-content">
//           {/* Burada hər step üçün ayrı komponentləri import edib render edə bilərsən */}
//         </div>

//         {/* Buttons */}
//         <div className="modal-nav">
//           <button
//             onClick={() => dispatch(prevStep())}
//             disabled={modal.currentStep === 1}
//             className="modal-btn"
//           >
//             Back
//           </button>

//           <button
//             onClick={() =>
//               modal.currentStep === modal.totalSteps ? dispatch(closeModal()) : dispatch(nextStep())
//             }
//             className="modal-btn yellow"
//           >
//             {modal.currentStep === modal.totalSteps ? "Finish" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyArtworkModal;







// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { X } from "lucide-react";
// import { selectModalState, closeModal, nextStep, prevStep } from "../store/modalSlice";
// import type { RootState } from "../store/store";

// // BÜTÜN ADDIM KOMPONENTLƏRİNİ İMPORT EDİN
// // Fərz edilir ki, bu fayllar `steps` qovluğunda mövcuddur
// import Step1_ArtworkSelection from "./steps/Step1_ArtworkSelection";



// const BuyArtworkModal: React.FC = () => {
//   const dispatch = useDispatch();
//   const modal = useSelector((state: RootState) => selectModalState(state));

//   if (!modal.isModalOpen) return null;

//   /**
//    * Cari addıma uyğun komponenti qaytaran köməkçi funksiya.
//    */
//   const renderStepContent = () => {
//     switch (modal.currentStep) {
//       case 1:
//         return <Step1_ArtworkSelection />;
//       case 2:
     
//         // Əgər currentStep modal.totalSteps-dən böyük olarsa
//         return <div style={{padding: '20px', color: 'red'}}>⚠️ Error: Invalid step content.</div>;
//     }
//   };


//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
        
//         {/* Close Button */}
//         <button className="close-btn" onClick={() => dispatch(closeModal())}>
//           <X size={28} />
//         </button>

//         <h1 className="modal-title">Buy this artwork</h1>
//         <p className="modal-desc">
//           Fill out this form and I will contact you shortly to discuss the details.
//         </p>

//         {/* --- STEP BAR --- */}
//         <div className="step-bar">
//           {Array.from({ length: modal.totalSteps }, (_, i) => i + 1).map((s) => (
//             <div
//               key={s}
//               className={`step-item ${modal.currentStep === s ? "active" : modal.currentStep > s ? "done" : ""}`}
//             >
//               <div className="circle">{s}</div>
//               <div className="line"></div>
//             </div>
//           ))}
//         </div>
        
//         {/* --- STEP CONTENT --- */}
//         <div className="step-content">
//            {/* Cari addıma uyğun komponenti render edir */}
//            {renderStepContent()}
//         </div>

//         {/* --- NAVIGATION BUTTONS --- */}
//         <div className="modal-nav">
//           <button
//             onClick={() => dispatch(prevStep())}
//             // Yalnız 1-ci addımda "Back" (Geri) düyməsini deaktiv edir
//             disabled={modal.currentStep === 1}
//             className="modal-btn"
//           >
//             Back
//           </button>

//           <button
//             onClick={() =>
//               modal.currentStep === modal.totalSteps ? dispatch(closeModal()) : dispatch(nextStep())
//             }
//             className="modal-btn yellow"
//           >
//             {/* Son addımda "Finish" (Bitir), digərlərində "Next" (İrəli) yazılır */}
//             {modal.currentStep === modal.totalSteps ? "Finish" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyArtworkModal;



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { selectModalState, closeModal, nextStep, prevStep } from "../store/modalSlice";
import type { RootState } from "../store/store";

// Bütün Addım Komponentləri
import Step1_ArtworkSelection from "./steps/Step1_ArtworkSelection";
 // TotalSteps 5 olduğu üçün

// Qeyd: totalSteps sizin modalSlice-da 5-dir.

const BuyArtworkModal: React.FC = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => selectModalState(state));

  if (!modal.isModalOpen) return null;

  const renderStepContent = () => {
    switch (modal.currentStep) {
      case 1:
        return <Step1_ArtworkSelection />;
      case 2:
      
        return <div>Error: Invalid step</div>;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Close Button */}
        <button className="close-btn" onClick={() => dispatch(closeModal())}>
          <X size={28} />
        </button>

        <h1 className="modal-title">Buy this artwork</h1>
        <p className="modal-desc">
          Are you interested in purchasing "Paysage Aubrac"? Fill out this form and I will contact you shortly to discuss the details.
        </p>

        {/* STEP BAR */}
        <div className="step-bar">
          {Array.from({ length: modal.totalSteps }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`step-item ${modal.currentStep === s ? "active" : modal.currentStep > s ? "done" : ""}`}
            >
              <div className="circle">{s}</div>
              <div className="line"></div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">
           {renderStepContent()}
        </div>

        {/* Buttons */}
        <div className="modal-nav">
          <button
            onClick={() => dispatch(prevStep())}
            disabled={modal.currentStep === 1}
            className="modal-btn"
          >
            {modal.currentStep > 1 ? "Précédent" : "Back"} {/* Şəkillərdəki kimi fransızca */}
          </button>

          <button
            onClick={() =>
              modal.currentStep === modal.totalSteps ? dispatch(closeModal()) : dispatch(nextStep())
            }
            className="modal-btn yellow"
          >
            {modal.currentStep === modal.totalSteps ? "Finish" : "Suivant"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyArtworkModal;