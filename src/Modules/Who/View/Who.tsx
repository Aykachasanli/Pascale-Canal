import React from 'react';


const WhoAmI: React.FC = () => {
  return (
    <section className="who-am-i-page">
      
      <div className="intro-section">
        <h1 className="title">Who am I?</h1>
        <div className="profile-card">
          <div className="image-container">
           
            <img 
                src="profil.jpg" 
                alt="Pascale Canal Profile" 
                className="profile-image" 
            />
          </div>
          <div className="text-content">
            <h2 className="name">PASCALE CANAL</h2>
            <p>
              I seek to capture a presence, a gaze, an atmosphere. My world is 
              populated by figures, animals, and landscapes, poised on the border 
              between reality and emotion. Each painting is a suspended moment, a 
              tribute to the simplicity that connects us to what is essential.
            </p>
          </div>
        </div>
      </div>
      
      <div className="philosophy-section">
        
        <div className="philosophy-block">
          <p>
            Whether it is an endearing animal, an inspiring face or a familiar 
            landscape, I seek to paint beyond the image to reveal what vibrates, 
            what touches, what remains.
          </p>
          <p className="inspiration">
            That's where my painting is inspired.
          </p>
        </div>
        
        <div className="palette-block">
          <p>
            I use oil paints with a deliberately limited palette: **black, white, gray, 
            and a few touches of gold.** These colors are not merely an aesthetic choice, 
            but a true language. Black conveys depth and intensity, white brings light 
            and space to breathe, gray evokes the passage of time, silences, and 
            nuances. As for gold, discreet yet essential, it reveals emotion, warmth, 
            and inner radiance.
          </p>
        </div>

      </div>

      <div className="commission-section">
        <p className="commission-text">
          I also create commissioned works based on your photographs. Each project 
          becomes an encounter, a dialogue with your story, your memories, your 
          emotions, your pets. Through each canvas, I try to bring forth a trace, 
          a reflection, a fragment of soul, something true and unique that touches you.
        </p>
        
        <div className="action-buttons">
          <a href="/contact" className="btn btn-contact">Contact me</a>
          <a href="/paintings" className="btn btn-paintings">See my paintings</a>
        </div>
      </div>

    </section>
  );
};

export default WhoAmI;