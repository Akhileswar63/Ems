
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AddDepartment = ({ department, onClose, isEditing }) => {
  const [departmentDetails, setDepartmentDetails] = useState({
    departmentId: '',
    name: '',
    branchId: '',
    organizationId: '',
    status: ''
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (department) {
      setDepartmentDetails(department);
    } else {
      setDepartmentDetails({
        departmentId: '',
        name: '',
        branchId: '',
        organizationId: '',
        status: ''
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      axios.put(`http://localhost:9192/update/${departmentDetails.departmentId}`, departmentDetails)
        .then(response => {
          console.log('Department updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating department:', error);
        });
    } else {
      axios.post('http://localhost:9192/addDepartment', departmentDetails)
        .then(response => {
          console.log('Department added:', response.data);
        })
        .catch(error => {
          console.error('Error adding department:', error);
        });
    }
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <>
    
      
      <div style={{ padding: '16px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '80%', height: '100%', backgroundColor: 'white', borderRadius: '8px', transition: 'transform 0.5s ease', transform: isClosing ? 'translateX(100%)' : 'translateX(0)' }}>
      <button
        style={{ 
          position: 'absolute', 
          top: '10px', 
          left: '-20px', 
          width: '30%', 
          height: '9%', 
          borderTopLeftRadius: '45%', 
          borderBottomLeftRadius: '45%', 
          backgroundColor: 'red', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onClick={handleClose}>
        <span style={{ 
          display: 'inline-flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          border: '1px solid red', 
          marginRight: '8px', 
          backgroundColor: "white" 
        }}>
          <FaTimes style={{ color: 'red', fontSize: '12px' }} />
        </span>
        Close
      </button>
        <Typography variant="h5" align="center" gutterBottom>
          {isEditing ? 'Edit Department' : 'Add Department'}
        </Typography>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ width: '30%', marginRight: '16px' }}>Department ID:</label>
            <TextField
              name="departmentId"
              value={departmentDetails.departmentId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={isEditing}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ width: '30%', marginRight: '16px' }}>Department Name:</label>
            <TextField
              name="name"
              value={departmentDetails.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ width: '30%', marginRight: '16px' }}>Branch ID:</label>
            <TextField
              name="branchId"
              value={departmentDetails.branchId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ width: '30%', marginRight: '16px' }}>Organization ID:</label>
            <TextField
              name="organizationId"
              value={departmentDetails.organizationId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ width: '30%', marginRight: '16px' }}>Status:</label>
            <TextField
              name="status"
              value={departmentDetails.status}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
          <button
            style={{ 
              marginTop: '16px', 
              backgroundColor: 'lightgrey', 
              display: 'flex', 
              alignItems: 'center', 
              marginRight: '8px', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={handleSubmit}
          >
            <span style={{ 
              display: 'inline-flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              border: '1px solid green', 
              marginRight: '8px', 
              backgroundColor: "green" 
            }}>
              <FaCheck style={{ color: 'white', fontSize: '12px' }} />
            </span>
            {isEditing ? 'Update' : 'Add'}
          </button>
          <button
            style={{ 
              marginTop: '16px', 
              backgroundColor: 'lightgrey', 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={handleClose}
          >
            <span style={{ 
              display: 'inline-flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              border: '1px solid red', 
              marginRight: '8px', 
              backgroundColor: "red" 
            }}>
              <FaTimes style={{ color: 'white', fontSize: '12px' }} />
            </span>
            Cancel
          </button>
        </div>
      </div>
    
   
    </>
  );
};

export default AddDepartment;

