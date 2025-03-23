import React from "react";

function VideoPremium(){
    
    const VideoPremium = () => {

        return(
            <div className="video-container">
             <div className="video">
              <video controls>
               <source src="tutorial.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
              </video>
             </div>
              <div className="options">
              <div className="card">
               <h3>Free Plan</h3>
               <p>Buy up to 20kg of commodities.</p>
              </div>
               <div className="card premium">
               <h3>Premium Plan</h3>
               <p>Buy above 20kg of commodities.</p>
              </div>
           </div>
         </div>
       );
    };
}

export default VideoPremium
