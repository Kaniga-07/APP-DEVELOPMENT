import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./cart.css"; // Assuming you have a CSS file for styling
import Chatbot from "../chatbot/chatbot";


const coursesData = [
  { id: 1, imageUrl: "https://media.tenor.com/AARhkwmIfyMAAAAC/bcz.gif", name: "C PROGRAMMING", price: 100, maxEnrollments: 30, currentEnrollments: 20 },
  { id: 2, imageUrl: "https://www.thinknexttraining.com/images/DSA-course-min.jpg", name: "DSA", price: 200, maxEnrollments: 25, currentEnrollments: 10 },
  { id: 3, imageUrl: "https://www.qtreetechnologies.in/images/html-training-in-coimbatore.jpg", name: "HTML", price: 150, maxEnrollments: 20, currentEnrollments: 5 },
  { id: 4, imageUrl: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", name: "REACT JS", price: 180, maxEnrollments: 15, currentEnrollments: 7 },
  { id: 5, imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRJTSM6S-q5TzfoKABM0W0Vz16P0hP_mkA8saxCvIT_Gl8TXp0JqmulxaCrZ4co7R3Yi6q78s3L36VDYevQUGpJHSGQjDEpL3EH7wYYiw5LXcSMfbbeu9PqRJneRnqFJlWkeYGzcQCn12Q5Z5gUDQ_t50xUVUmcj-JaAo5-G1V6vLBZJiT_9I7swWJPQ/w1200-h630-p-k-no-nu/CPP-Language.png", name: "C++", price: 220, maxEnrollments: 18, currentEnrollments: 12 },
  { id: 6, imageUrl: "https://th.bing.com/th/id/OIP.Xe2EsR4ZjXF1RxIDEstADwHaDt?w=1000&h=500&rs=1&pid=ImgDetMain", name: "PYTHON", price: 250, maxEnrollments: 22, currentEnrollments: 14 },
  { id: 7, imageUrl: "https://omatech.asia/wp-content/uploads/2021/04/R-is-a-widely-used-language-for-research-and-analysis.jpg", name: "R LANGUAGE", price: 170, maxEnrollments: 28, currentEnrollments: 17 },
  { id: 8, imageUrl: "https://skillcourse.in/wp-content/uploads/2024/02/Power-BI.jpg", name: "POWER BI", price: 190, maxEnrollments: 26, currentEnrollments: 18 },
  { id: 9, imageUrl: "https://b3352925.smushcdn.com/3352925/wp-content/uploads/2024/03/tableau_transparent-768x329.png?lossy=2&strip=1&webp=1", name: "TABLEAU", price: 210, maxEnrollments: 24, currentEnrollments: 11 },
  { id: 10, imageUrl: "https://i.pinimg.com/originals/04/38/cb/0438cb975441786af36e04e09a74b4dc.jpg", name: "MYSQL", price: 230, maxEnrollments: 27, currentEnrollments: 13 },
  { id: 11, imageUrl: "https://th.bing.com/th/id/OIP.3EIIwyu7_TNTr21oD8dHlAHaDt?w=1200&h=600&rs=1&pid=ImgDetMain", name: "DEEP LEARNING", price: 240, maxEnrollments: 25, currentEnrollments: 16 },
  { id: 12, imageUrl: "https://wallpaperaccess.com/full/1728956.jpg", name: "MACHINE LEARNING", price: 260, maxEnrollments: 23, currentEnrollments: 19 },
  { id: 13, imageUrl: "https://media.licdn.com/dms/image/C4E22AQF15Bh8YVDjeg/feedshare-shrink_2048_1536/0/1675850124455?e=2147483647&v=beta&t=ztod-XiRxqDKk98Mmv1Rcm9Vw7iiGN1UvVq0L-urjQ0", name: "DATA ANALYTICS", price: 270, maxEnrollments: 20, currentEnrollments: 10 },
  { id: 14, imageUrl: "https://www.hdwallpapers.in/download/windows_operating_system_mountain_hd_technology-HD.jpg", name: "OPERATING SYSTEMS", price: 280, maxEnrollments: 29, currentEnrollments: 15 },
  { id: 15, imageUrl: "https://th.bing.com/th/id/OIP.mbxJ3crisMxuRspfs2SrHAHaDk?w=1024&h=494&rs=1&pid=ImgDetMain", name: "ARTIFICIAL INTELLIGENCE", price: 290, maxEnrollments: 21, currentEnrollments: 14 },
  { id: 16, imageUrl: "https://miro.medium.com/v2/resize:fit:1358/1*DfUJ7-n40AKtQVoS6jA1-w.png", name: "DATABASE MANAGEMENT", price: 300, maxEnrollments: 22, currentEnrollments: 13 },
  { id: 17, imageUrl: "https://fixingblog.com/wp-content/uploads/2021/06/AdobeStock_257701717-scaled.jpeg", name: "SOFTWARE TESTING", price: 310, maxEnrollments: 24, currentEnrollments: 9 },
  { id: 18, imageUrl: "https://thumbs.dreamstime.com/z/%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-rgb-154442692.jpg", name: "RUBY", price: 320, maxEnrollments: 28, currentEnrollments: 8 },
  { id: 19, imageUrl: "https://aventislearning.com/wp-content/uploads/2019/05/Excel-VBA-2-e1558600807829.jpeg", name: "MICROSOFT EXCEL", price: 330, maxEnrollments: 30, currentEnrollments: 12 },
  { id: 20, imageUrl: "https://c4.wallpaperflare.com/wallpaper/435/969/74/javascript-js-programming-programming-language-wallpaper-preview.jpg", name: "JAVASCRIPT", price: 340, maxEnrollments: 27, currentEnrollments: 18 }
];

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutCard, setShowCheckoutCard] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = (course) => {
    if (cart.some(item => item.id === course.id)) {
      setWarningMessage(`${course.name} is already added to the cart`);
      setTimeout(() => setWarningMessage(""), 3000); // Clear warning after 3 seconds
    } else {
      setCart([...cart, course]);
    }
  };

  const handleCheckout = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    if (totalPrice === 0) {
      alert("No items added to cart.");
    } else {
      // Show custom styled checkout card with total price
      setShowCheckoutCard(true);
    }
  };

  const proceedToPayment = () => {
    setShowCheckoutCard(false); // Hide the checkout card
    navigate("/payment"); // Redirect to payment page
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <Chatbot/>
      <div className="cart-icon" onClick={toggleCart}>
        <FaShoppingCart />
        <span className="cart-count">{cart.length}</span>
      </div>
      {showCart && (
        <div className="cart-dropdown">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="total-price">
            Total Price: ${cart.reduce((total, item) => total + item.price, 0)}
          </div>
          <button onClick={handleCheckout} className="checkout-button">Proceed to Pay</button>
        </div>
      )}
      <h1 style={{backgroundColor:"#1eb2a6",height:70,textAlign:"center"}}>Courses</h1>
      {warningMessage && (
        <div className="warning-message">
          {warningMessage}
        </div>
      )}
      <div className="courses-container">
        {coursesData.map((course) => (
          <div key={course.id} className="course-item">
            <img src={course.imageUrl} alt={course.name} className="course-image"/>
            <h4>{course.name}</h4>
            <p>Price: ${course.price}</p>
            <p>Max Enrollments: {course.maxEnrollments}</p>
            <p>Current Enrollments: {course.currentEnrollments}</p>
            <button onClick={() => handleAddToCart(course)} className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Checkout Card */}
      {showCheckoutCard && (
        <div className="checkout-card">
          <div className="checkout-card-content">
            <div className="checkout-card-image">
              <img src="https://img.freepik.com/premium-vector/payment-illustration-design-vector-illustration_8499-5035.jpg" alt="Checkout" />
            </div>
            <div className="checkout-card-details">
              <h3>Pay Now ${cart.reduce((total, item) => total + item.price, 0)} </h3>
              <p></p>
            </div>
            <button onClick={proceedToPayment} className="checkout-button">Proceed</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
