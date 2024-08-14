import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [paymentValues, setPaymentValues] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  useEffect(() => {
    const fetchPaymentValues = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/myapp/api/save_payment/');
        setPaymentValues(response.data);
      } catch (err) {
        console.error('Failed to fetch payment values', err);
      }
    };

    fetchPaymentValues();
  }, []);

  const handleEditOpen = (payment) => {
    setEditPayment(payment);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditPayment(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editPayment, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/myapp/api/save_payment/${editPayment.id}/`, editPayment);
      setPaymentValues(paymentValues.map(payment =>
        payment.id === editPayment.id ? editPayment : payment
      ));
      handleEditClose();
    } catch (err) {
      console.error('Failed to update payment', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/myapp/api/save_payment/${id}/`);
      setPaymentValues(paymentValues.filter(payment => payment.id !== id));
    } catch (err) {
      console.error('Failed to delete payment', err);
    }
  };

  return (
    <div className='pay'>
      <h1 style={{textAlign:"center"}}>STUDENT PAYMENT DETAILS</h1>
    <div className="dashboard-container">
      <Grid container spacing={3}>
        {paymentValues.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <div className="card">
              <div className="card-content">
                <h3>{payment.cardholder_name}</h3>
                <p>Card Number: {payment.card_number}</p>
                <p>Expiration: {payment.expiration_month}/{payment.expiration_year}</p>
                <p>Billing Address: {payment.billing_address}</p>
                <div className="card-actions">
                  <Button onClick={() => handleEditOpen(payment)} variant="outlined" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(payment.id)} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
          </div>

      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Payment</DialogTitle>
        <DialogContent>
          <TextField
            name="card_number"
            label="Card Number"
            type="text"
            fullWidth
            value={editPayment?.card_number || ''}
            onChange={handleEditChange}
            margin="dense"
          />
          <TextField
            name="expiration_month"
            label="Expiration Month"
            type="text"
            fullWidth
            value={editPayment?.expiration_month || ''}
            onChange={handleEditChange}
            margin="dense"
          />
          <TextField
            name="expiration_year"
            label="Expiration Year"
            type="text"
            fullWidth
            value={editPayment?.expiration_year || ''}
            onChange={handleEditChange}
            margin="dense"
          />
          <TextField
            name="billing_address"
            label="Billing Address"
            type="text"
            fullWidth
            value={editPayment?.billing_address || ''}
            onChange={handleEditChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default Dashboard;
