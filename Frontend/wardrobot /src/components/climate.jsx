import React from "react";
import cloud from "./assets/cloud.png"
import arrow from "./assets/UpwardArrow.png"
import "./climate.css"
function Climate(){
    return(
        <div>
            <h1 className="heading">Try out some other <br /> features</h1>
            <div className="climate-texts">
                <h1>Select your outfit <br /> based on </h1>
                <h2>Weather</h2>
                <button className="show-outfit-btn">Show outfit</button>
                <div className="climate-images">
                    <p className="climate-now" id="climate-text1">27°C</p>
                    <img src={cloud} alt="" />
                </div>
 
            </div>
            <div className="container2">
                <h1>Your wardrobe</h1>
                <div className="climate-info" >
                    <p className="climate-now" id="climate-text2">27°C</p>
                    <img id="climate-img" src={cloud} alt="" />
                </div>
                <div className="outfit-display">
                    <div className="shirt">
              
                    </div>
                    <div className="pant">
                    
                    </div>
                    <div className="acessory">
             
                    </div>
                </div>
                <div className="buttons2">
                    <button className="back2">← Back</button>
                    <button className="next2">Next →</button>
                    <button className="add-new-dress">Add new Dress <img src={arrow} height='10px' alt="" /></button>
                </div>
            </div>
        </div>
    )
}
export default Climate;