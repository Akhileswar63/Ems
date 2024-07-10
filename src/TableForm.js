


import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Drawer,
  Snackbar,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  textTransform: 'capitalize',
});

const AddOrganization = ({ closeDrawer }) => {
  const [formData, setFormData] = useState({
    name: '',
    created_by: 'akhil',
    status: 'Active',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [nameError, setNameError] = useState('');

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    return nameRegex.test(name);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'name' && nameError) {
      setNameError('');
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'name' && !validateName(value)) {
      setNameError('Name must be 3-50 characters long and contain only letters and spaces.');
    }
  };

  const handleSave = () => {
    if (!formData.name || !validateName(formData.name)) {
      setNameError('Please enter a valid name (3-50 characters, letters and spaces only).');
      return;
    }

    const requestData = {
      name: formData.name,
      status: formData.status === 'Active',
    };

    fetch(`http://localhost:9999/addorganization/${formData.created_by}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save data');
        }
        console.log('Data saved successfully');
        setSnackbar({
          open: true,
          message: 'Saved successfully.',
          severity: 'success',
        });
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to save data. Please try again later.',
          severity: 'error',
        });
      });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      status: 'Active',
    });
    closeDrawer();
  };

  const handleClose = () => {
    closeDrawer();
  };

  const handleSnackbarClose = () => {
    if (snackbar.severity === 'success') {
      closeDrawer();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box display="flex" maxWidth="md">
      <Button
        sx={{
          height: '80px',
          marginTop: '110px',
          width: '100px',
          borderTopLeftRadius: '40%',
          borderBottomLeftRadius: '40%',
        }}
        variant="contained"
        color="error"
        onClick={handleClose}
      >
        Close
      </Button>
      <Paper elevation={3}>
        <AppBar
          color="inherit"
          position="sticky"
          sx={{ height: '80px', marginTop: '110px', width:'400px' }}
        >
          <Toolbar>
            <Typography variant="h6" >Add Organization</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <FormControl variant="outlined">
              <Select
                value={formData.status}
                name="status"
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <Box my={4} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enter name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
          </Grid>
        </Box>
        <AppBar
          position="sticky"
          color="inherit"
          sx={{ marginTop: '10px', bottom: 0, height: '350px' }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{ marginTop: '250px', marginBottom: '40px' }}
          >
            <Button
              onClick={handleSave}
              color="inherit"
              variant="contained"
              startIcon={<CheckCircleIcon color="success" />}
              sx={{ margin: '10px' }}
            >
              Save
            </Button>
            <Link to={'/'} style={{ color: 'black' }}>
              <Button
                onClick={handleCancel}
                color="inherit"
                variant="contained"
                startIcon={<CancelIcon color="error" />}
                sx={{ margin: '10px' }}
              >
                Cancel
              </Button>
            </Link>
          </Grid>
        </AppBar>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const AnchorTemporaryDrawer = ({ organization }) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box>
      <AddOrganization organization={organization} closeDrawer={() => setState({ ...state, [anchor]: false })} />
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <StyledButton color="inherit" onClick={toggleDrawer(anchor, true)}>
            Add Organization
          </StyledButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AnchorTemporaryDrawer;






// import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'space-between',
// }));

// const AnchorTemporaryDrawer = ({ anchor, open, onClose, organization }) => {
//   const [initialValues, setInitialValues] = useState({
//     name: '',
//     status: '',
//   });

//   useEffect(() => {
//     if (organization) {
//       setInitialValues({
//         name: organization.name,
//         status: organization.status ? 'Active' : 'Inactive',
//       });
//     } else {
//       setInitialValues({
//         name: '',
//         status: '',
//       });
//     }
//   }, [organization]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: initialValues,
//     validationSchema: Yup.object({
//       name: Yup.string().required('Required'),
//       status: Yup.string().required('Required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Values', values);
//       // Handle form submission
//       onClose(); // Close the drawer after submission
//     },
//   });

//   return (
//     <Drawer
//       anchor={anchor}
//       open={open}
//       onClose={onClose}
//     >
//       <Box sx={{ width: 350 }} role="presentation">
//         <DrawerHeader>
//           <h3>{organization ? 'Edit Organization' : 'Add Organization'}</h3>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </DrawerHeader>
//         <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
//           <TextField
//             fullWidth
//             id="name"
//             name="name"
//             label="Organization Name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && formik.errors.name}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             id="status"
//             name="status"
//             label="Status"
//             value={formik.values.status}
//             onChange={formik.handleChange}
//             error={formik.touched.status && Boolean(formik.errors.status)}
//             helperText={formik.touched.status && formik.errors.status}
//             sx={{ mb: 2 }}
//           />
//           <Button color="primary" variant="contained" fullWidth type="submit">
//             {organization ? 'Update' : 'Create'}
//           </Button>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default AnchorTemporaryDrawer;




// import React from 'react';
// import Drawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import AddOrganization from './AddOrganization';

// const AnchorTemporaryDrawer = ({ open, onClose, organization }) => {
//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 550 }} role="presentation">
//         <AddOrganization organization={organization} onClose={onClose} />
//       </Box>
//     </Drawer>
//   );
// };

// export default AnchorTemporaryDrawer;
