import React from "react";
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import './wardrobe.css'
const Wardrobe =()=>{
    return(
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id="ellipse" />
            <Navbar />
            <div>
                <div className='container2'>
                    <h1>Your Wardrobe</h1>
                    <h3 className="occasions-wardrobe">Wedding</h3>
                    <div className="sub-containers">
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                    </div>

                    <h3 className="occasions-wardrobe">Wedding</h3>
                    <div className="sub-containers">
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                    </div>


                    <h3 className="occasions-wardrobe">Wedding</h3>
                    <div className="sub-containers">
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                        <div className="images-holder">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wardrobe