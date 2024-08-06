import React from "react";
import { useNavigate } from "react-router-dom";
import { price } from "../../dummydata";

const PriceCard = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/cart");
  };

  return (
    <>
      {price.map((val, index) => (
        <div key={index} className='items shadow'>
          <h4>{val.name}</h4>
          <h1>
            <span>$</span>
            {val.price}
          </h1>
          <p>{val.desc}</p>
          <button className='outline-btn' onClick={handleGetStarted}>GET STARTED</button>
        </div>
      ))}
    </>
  );
};

export default PriceCard;
