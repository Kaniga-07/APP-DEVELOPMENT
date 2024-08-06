import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Payment.css';
import axios from 'axios';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('contact');
  const [contactAddress] = useState('123 Main St, City, Country');
  const [newBillingAddress, setNewBillingAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const billingInfo = billingAddress === 'contact' ? contactAddress : newBillingAddress;

    const paymentData = {
      card_number: cardNumber,
      expiration_month: expirationMonth,
      expiration_year: expirationYear,
      cardholder_name: cardholderName,
      billing_address: billingInfo
    };

    console.log('Submitting payment data:', paymentData); // Debug: Log paymentData

    try {
      const response = await axios.post('http://127.0.0.1:8000/myapp/api/save_payment/', paymentData);
      console.log('Payment saved:', response.data); // Debug: Log response
      setSuccessMessage('Payment details successfully added!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving payment:', error.response || error.message); // Debug: Log error
      setErrorMessage('Failed to add payment details. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="pay-container">
      <div className="left-side">
        <img src="https://instrumentationtools.com/wp-content/uploads/2022/12/Best-Practices-for-Secure-Online-Payment-1536x946.png" alt="Left Side" style={{ width: '120vh', height: '90vh' }} />
      </div>
      <Container className="payment-container">
        <Form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>PAYMENT DETAILS</h1>
          <p> We use your payment information to verify your identity. We will not charge you for usage below the Limits. To learn more about payment options, review our <button type="button">Frequently Asked Questions</button></p>
          
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          
          <Form.Group controlId="cardNumber">
            <Form.Label>Credit/Debit card number</Form.Label>
            <Form.Control
              type="text"
              placeholder="xxxx xxxx xxxx xxxx"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <div className="card-icons mt-2">
              <i className="fab fa-cc-visa fa-2x"></i>
              <i className="fab fa-cc-mastercard fa-2x"></i>
              <i className="fab fa-cc-amex fa-2x"></i>
              <i className="fab fa-cc-discover fa-2x"></i>
            </div>
          </Form.Group>
          
          <Row>
            <Col>
              <Form.Group controlId="expirationMonth">
                <Form.Label>Expiration date</Form.Label>
                <Form.Control
                  as="select"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  required
                >
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {String(month).padStart(2, '0')}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="expirationYear">
                <Form.Label>&nbsp;</Form.Label>
                <Form.Control
                  as="select"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  required
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group controlId="cardholderName">
            <Form.Label>Cardholder's name</Form.Label>
            <Form.Control
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Billing address</Form.Label>
            <Form.Check
              type="radio"
              label="Use my contact address"
              name="billingAddress"
              value="contact"
              checked={billingAddress === 'contact'}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            <Form.Text className="text-muted">
              {contactAddress}
            </Form.Text>
            <Form.Check
              type="radio"
              label="Use a new address"
              name="billingAddress"
              value="new"
              checked={billingAddress === 'new'}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            {billingAddress === 'new' && (
              <Form.Control
                type="text"
                placeholder="Enter new billing address"
                className="mt-2"
                value={newBillingAddress}
                onChange={(e) => setNewBillingAddress(e.target.value)}
                required
              />
            )}
          </Form.Group>
          
          <Button variant="warning" type="submit" className="submit-button">
            Verify and Add
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Payment;
