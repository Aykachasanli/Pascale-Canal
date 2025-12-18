import React from "react";
import figure from '../../../assets/images/figure.jpg';
import { motion } from "framer-motion";
import CustomSection from "../../../components/CustomSection";
import { useWhoProvider } from "../Provider/WhoProvider";

const WhoAmI: React.FC = () => {
  const { containerRef, springX, springY } = useWhoProvider();

  return (
    <CustomSection ref={containerRef} className="who-am-a-page">
     <div className="container">
      <div className="row">
         <h2 className="title">Who am I?</h2>
         <motion.div 
            className="image-wrapper"
            style={{ x: springX, y: springY }}
         >
            <img src={figure} alt="MyImage" className="my-image" />
         </motion.div>
         <p className="second-title">I seek to capture a presence, a gaze, an atmosphere. My world is filled with figures, animals, and landscapes that sit on the border between reality and emotion. Each painting is a tribute to simplicity, a suspended moment that connects us to what truly matters.</p>
         <p className="third-title">I deliberately use a limited palette of oil paints: black, white, gray, and a touch of gold. These colors are not just an aesthetic choice, but a true language. Black expresses depth and intensity, white brings light and space to breathe, while gray recalls the passage of time, silence, and nuance. As for gold—discreet yet essential—it reveals emotion, warmth, and inner radiance.</p>
         <p className="fourth-title">Whether it is a beloved animal, an inspiring face, or a familiar landscape, I strive to draw out what vibrates, what touches, and what remains, often pushing the image towards the edge to reveal its essence.</p>
        <p className="fifth-title">I also create commissioned works based on your photographs. Each project becomes an encounter, a dialogue with your story, your memories, your feelings, and your companions. Through every canvas, I aim to reveal a trace, a reflection, a piece of soul—something authentic and unique that resonates with you.</p>
        <p className="sixth-title">And that is where my paintings draw their inspiration.</p>

       </div>
      </div>
    </CustomSection>
  );
};

export default WhoAmI;
