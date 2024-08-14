import React, { useEffect, useState } from "react";
import Back from "../common/back/Back";
import "./contact.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/myapp/contact/")
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/myapp/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp';

  return (
    <>
      <Back title="Contact us" />
      <section className="contact-section">
        <div className="contact-container shadow flexSB">
          <div className="contact-left contact-row">
            <div className="contact-map">
              <iframe
                src={map}
                width="800"
                height="700"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          <div className="contact-right contact-row">
            <h1 style={{ textAlign: "center" }}>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className="contact-items grid2">
              <div className="contact-box">
                <h4>NAME:</h4>
                <p>{contactInfo.address}</p>
              </div>
              <div className="contact-box">
                <h4>EMAIL:</h4>
                <p>{contactInfo.email}</p>
              </div>
              <div className="contact-box">
                <h4>PHONE:</h4>
                <p>{contactInfo.phone}</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="flexSB">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Create a message here..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="primary-btn">
                SEND MESSAGE
              </button>
            </form>

            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
