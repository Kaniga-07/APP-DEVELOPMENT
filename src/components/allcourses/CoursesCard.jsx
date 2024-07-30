import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";
import { coursesCard } from "../../dummydata";
 // Import the EnrolledCourses component

const CoursesCard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
    navigate('/module'); // Navigate to module page after enrolling
  };

  return (
    <section className="coursesCard">
      <div className="container" style={{ position: 'relative' }}>
        <div className="grid2">
          {coursesCard.map((val, index) => (
            <div key={index} className="items">
              <div className="content flex">
                <div className="left">
                  <div className="img">
                    <img src={val.cover} alt="" />
                  </div>
                </div>
                <div className="text">
                  <h1>{val.coursesName}</h1>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    {val.courTeacher.map((details, i) => (
                      <React.Fragment key={i}>
                        <div className="box">
                          <div className="dimg">
                            <img src={details.dcover} alt="" />
                          </div>
                          <div className="para">
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                        <span>{details.totalTime}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="price">
                <h3>
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div>
              <button className="outline-btn" onClick={() => handleEnroll(val)}>ENROLL NOW !</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesCard;
