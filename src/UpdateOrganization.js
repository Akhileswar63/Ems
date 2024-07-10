// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   Box,
//   Grid,
//   Typography,
//   Paper,
//   AppBar,
//   Toolbar,
//   Drawer,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';

// const StyledButton = styled(Button)({
//   textTransform: 'capitalize',
// });

// const EditOrganization = ({ closeDrawer, organizationId }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     status: 'Active',
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   useEffect(() => {
//     // Fetch organization details based on organizationId
//     fetch(`http://localhost:9999/getorganization/${organizationId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFormData({
//           name: data.name,
//           status: data.status,
//         });
//       })
//       .catch((error) => console.error('Error fetching organization:', error));
//   }, [organizationId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     const requestData = {
//       name: formData.name,
//       status: formData.status,
//     };

//     fetch(`http://localhost:9999/updateorganization/${organizationId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to update organization');
//         }
//         console.log('Organization updated successfully');
//         setSnackbar({
//           open: true,
//           message: 'Organization updated successfully.',
//           severity: 'success',
//         });
//       })
//       .catch((error) => {
//         console.error('Error updating organization:', error);
//         setSnackbar({
//           open: true,
//           message: 'Failed to update organization. Please try again later.',
//           severity: 'error',
//         });
//       });
//   };

//   const handleCancel = () => {
//     closeDrawer();
//   };

//   const handleClose = () => {
//     closeDrawer();
//   };

//   const handleSnackbarClose = () => {
//     if (snackbar.severity === 'success') {
//       closeDrawer();
//       setTimeout(() => {
//         window.location.reload();
//       }, 500); // Delay to ensure the drawer closes before page reloads
//     }
//     setSnackbar({
//       ...snackbar,
//       open: false,
//     });
//   };

//   return (
//     <Box display="flex" maxWidth="md">
//       <Button
//         sx={{
//           height: '80px',
//           marginTop: '110px',
//           width: '100px',
//           borderTopLeftRadius: '40%',
//           borderBottomLeftRadius: '40%',
//         }}
//         variant="contained"
//         color="error"
//         onClick={handleClose}
//       >
//         Close
//       </Button>
//       <Paper elevation={3}>
//         <AppBar
//           color="inherit"
//           position="sticky"
//           sx={{ height: '80px', marginTop: '110px', width: '400px' }}
//         >
//           <Toolbar>
//             <Typography variant="h6">Edit Organization</Typography>
//             <Box sx={{ flexGrow: 1 }} />
//             <FormControl variant="outlined">
//               <Select
//                 value={formData.status}
//                 name="status"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
//               </Select>
//             </FormControl>
//           </Toolbar>
//         </AppBar>
//         <Box my={4} p={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Enter name"
//                 variant="outlined"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         <AppBar
//           position="sticky"
//           color="inherit"
//           sx={{ marginTop: '10px', bottom: 0, height: '350px' }}
//         >
//           <Grid
//             item
//             xs={12}
//             display="flex"
//             justifyContent="center"
//             sx={{ marginTop: '250px', marginBottom: '40px' }}
//           >
//             <Button
//               onClick={handleSave}
//               color="inherit"
//               variant="contained"
//               startIcon={<CheckCircleIcon color="success" />}
//               sx={{ margin: '10px' }}
//             >
//               Save
//             </Button>
//             <Link to={'/'} style={{ color: 'black' }}>
//               <Button
//                 onClick={handleCancel}
//                 color="inherit"
//                 variant="contained"
//                 startIcon={<CancelIcon color="error" />}
//                 sx={{ margin: '10px' }}
//               >
//                 Cancel
//               </Button>
//             </Link>
//           </Grid>
//         </AppBar>
//       </Paper>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// const AnchorTemporaryDrawer = ({ organizationId }) => {
//   const [state, setState] = useState({
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box>
//       <EditOrganization organizationId={organizationId} closeDrawer={() => setState({ ...state, [anchor]: false })} />
//     </Box>
//   );

//   return (
//     <div>
//       {['right'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <StyledButton color="inherit" onClick={toggleDrawer(anchor, true)}>
//             Edit Organization
//           </StyledButton>
//           <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default AnchorTemporaryDrawer;








// import React, { useState } from 'react';
// import {
//   Box,
//   Drawer,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   Grid,
//   Typography,
//   Paper,
//   AppBar,
//   Toolbar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   Link,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from 'axios';

// const UpdateOrganization = ({ organization }) => {
//   const [formData, setFormData] = useState({
//     name: organization ? organization.name : '',
//     status: organization ? organization.status : 'Active',
//     updated_by: 'nikhil',
//   });
//   const [confirmationClose, setConfirmationClose] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });
//   const [drawerOpen, setDrawerOpen] = useState(true); // Set to true to open the drawer by default

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = () => {
//     if (!formData.name) {
//       setSnackbar({
//         open: true,
//         message: 'Please fill in all required fields.',
//         severity: 'error',
//       });
//       return;
//     }

//     axios.put(`http://localhost:9999/updateorganization/${organization.organizationId}/${formData.updated_by}`, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setSnackbar({
//           open: true,
//           message: 'Updated successfully.',
//           severity: 'success',
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//         setSnackbar({
//           open: true,
//           message: 'Failed to update data. Please try again later.',
//           severity: 'error',
//         });
//       });
//   };

//   const handleClose = () => {
//     setConfirmationClose(true);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: organization ? organization.name : '',
//       status: organization ? organization.status : 'Active',
//       updated_by: 'nikhil',
//     });
//   };

//   const handleConfirmClose = () => {
//     setConfirmationClose(false);
//     setDrawerOpen(false); // Close the drawer when confirmed
//   };

//   const handleConfirmCancel = () => {
//     setConfirmationClose(false);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({
//       ...snackbar,
//       open: false,
//     });
//   };

//   return (
//     <Box display="flex" maxWidth="md">
//     <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
     
//       <Box sx={{ width: 500 }}>
//       <Button
//         sx={{
//           height: '80px',
//           marginTop: '41px',
//           width: '100px',
//           borderTopLeftRadius: '40%',
//           borderBottomLeftRadius: '40%',
//         }}
//         variant="contained"
//         color="error"
//         onClick={handleClose}
//       >
//         Close
//       </Button>
//         <Paper elevation={6} sx={{ width: '500px', padding: '16px' }}>
//           <AppBar color="inherit" position="static">
//             <Toolbar>
//               <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                 Edit Organization
//               </Typography>
//               <FormControl variant="outlined" size="small">
//                 <Select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             </Toolbar>
//           </AppBar>
//           <form>
//             <Box my={4} p={3}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Organization Name"
//                   value={formData.name}
//                   margin="normal"
//                   onChange={(event) => handleChange({ ...event, target: { name: 'name', value: event.target.value } })}
//                 />

//                 </Grid>
//               </Grid>
//             </Box>
//             <Box display="flex" justifyContent="center" mb={2}>
//               <Button
//                 onClick={handleEdit}
//                 color="inherit"
//                 variant="contained"
//                 startIcon={<CheckCircleIcon color="success" />}
//                 sx={{ margin: '10px' }}
//               >
//                 Update
//               </Button>
//               <Button
//                 onClick={handleCancel}
//                 color="inherit"
//                 variant="contained"
//                 startIcon={<CancelIcon color="error" />}
//                 sx={{ margin: '10px' }}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//         <Dialog
//           open={confirmationClose}
//           onClose={handleConfirmCancel}
//         >
//           <DialogTitle>{"Close"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Are you sure you want to close without saving changes?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleConfirmCancel} color="primary">
//               No
//             </Button>
//             <Button onClick={handleConfirmClose} color="primary" autoFocus>
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={5000}
//           onClose={handleSnackbarClose}
//         >
//           <Alert
//             onClose={handleSnackbarClose}
//             severity={snackbar.severity}
//             sx={{ width: '100%' }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//       </Drawer>
//       </Box>
//     );
     
   
// };

// export default UpdateOrganization;



// import React, { useState } from 'react';
// import {
//   Box,
//   Drawer,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   Grid,
//   Typography,
//   Paper,
//   AppBar,
//   Toolbar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   Link,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from 'axios';

// const UpdateOrganization = ({ organization }) => {
//   const [formData, setFormData] = useState({
//     name: organization ? organization.name : '',
//     status: organization ? organization.status : 'Active',
//     updated_by: 'nikhil',
//   });
//   const [confirmationClose, setConfirmationClose] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });
//   const [drawerOpen, setDrawerOpen] = useState(true); // Set to true to open the drawer by default

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = () => {
//     if (!formData.name) {
//       setSnackbar({
//         open: true,
//         message: 'Please fill in all required fields.',
//         severity: 'error',
//       });
//       return;
//     }

//     // Convert status to boolean
//     const updatedStatus = formData.status === 'Active' ? true : false;

//     // Create updated data object
//     const updatedData = {
//       ...formData,
//       status: updatedStatus,
//     };

//     axios.put(`http://localhost:9999/updateorganization/${organization.organizationId}/${formData.updated_by}`, updatedData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setSnackbar({
//           open: true,
//           message: 'Updated successfully.',
//           severity: 'success',
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//         setSnackbar({
//           open: true,
//           message: 'Failed to update data. Please try again later.',
//           severity: 'error',
//         });
//       });
//   };

//   const handleClose = () => {
//     setConfirmationClose(true);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: organization ? organization.name : '',
//       status: organization ? organization.status : 'Active',
//       updated_by: 'nikhil',
//     });
//   };

//   const handleConfirmClose = () => {
//     setConfirmationClose(false);
//     setDrawerOpen(false); // Close the drawer when confirmed
//   };

//   const handleConfirmCancel = () => {
//     setConfirmationClose(false);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({
//       ...snackbar,
//       open: false,
//     });
//   };

//   return (
//     <Box display="flex" maxWidth="md">
//       <Drawer anchor="right" open={drawerOpen} onClose={() => {
//         setDrawerOpen(false);
//         window.location.reload();
//       }}>
//         <Box sx={{ width: 500 }}>
//           <Button
//             sx={{
//               height: '80px',
//               marginTop: '41px',
//               width: '100px',
//               borderTopLeftRadius: '40%',
//               borderBottomLeftRadius: '40%',
//             }}
//             variant="contained"
//             color="error"
//             onClick={handleClose}
//           >
//             Close
//           </Button>
//           <Paper elevation={6} sx={{ width: '500px', padding: '16px' }}>
//             <AppBar color="inherit" position="static">
//               <Toolbar>
//                 <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                   Edit Organization
//                 </Typography>
//                 <FormControl variant="outlined" size="small">
//                   <Select
//                     name="status"
                    
//                     value={formData.status}
//                     onChange={handleChange}
//                   >
                    
//                     <MenuItem value="Active">Active</MenuItem>
//                     <MenuItem value="Inactive">Inactive</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Toolbar>
//             </AppBar>
//             <form>
//               <Box my={4} p={3}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Organization Name"
//                       value={formData.name}
//                       margin="normal"
//                       onChange={(event) => handleChange({ ...event, target: { name: 'name', value: event.target.value } })}
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box display="flex" justifyContent="center" mb={2}>
//                 <Button
//                   onClick={handleEdit}
//                   color="inherit"
//                   variant="contained"
//                   startIcon={<CheckCircleIcon color="success" />}
//                   sx={{ margin: '10px' }}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   onClick={handleCancel}
//                   color="inherit"
//                   variant="contained"
//                   startIcon={<CancelIcon color="error" />}
//                   sx={{ margin: '10px' }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </form>
//           </Paper>
//           <Dialog
//             open={confirmationClose}
//             onClose={handleConfirmCancel}
//           >
//             <DialogTitle>{"Close"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to close without saving changes?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleConfirmCancel} color="primary">
//                 No
//               </Button>
//               <Button onClick={handleConfirmClose} color="primary" autoFocus>
//                 Yes
//               </Button>
//             </DialogActions>
//           </Dialog>
//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={5000}
//             onClose={handleSnackbarClose}
//           >
//             <Alert
//               onClose={handleSnackbarClose}
//               severity={snackbar.severity}
//               sx={{ width: '100%' }}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }
// export default UpdateOrganization;




import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const UpdateOrganization = ({ organization }) => {
  const [formData, setFormData] = useState({
    name: organization ? organization.name : '',
    status: organization ? organization.status : 'Active',
    updated_by: 'nikhil',
  });
  const [confirmationClose, setConfirmationClose] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [drawerOpen, setDrawerOpen] = useState(true); // Set to true to open the drawer by default

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    if (!formData.name) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
      return;
    }

    // Convert status to boolean
    const updatedStatus = formData.status === 'Active' ? true : false;

    // Create updated data object
    const updatedData = {
      ...formData,
      status: updatedStatus,
    };

    axios.put(`http://localhost:9999/updateorganization/${organization.organizationId}/${formData.updated_by}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setSnackbar({
          open: true,
          message: 'Updated successfully.',
          severity: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to update data. Please try again later.',
          severity: 'error',
        });
      });
  };

  const handleClose = () => {
    setConfirmationClose(true);
  };

  const handleCancel = () => {
    setFormData({
      name: organization ? organization.name : '',
      status: organization ? organization.status : 'Active',
      updated_by: 'nikhil',
    });
  };

  const handleConfirmClose = () => {
    setConfirmationClose(false);
    setDrawerOpen(false); // Close the drawer when confirmed
    window.location.reload();
  };

  const handleConfirmCancel = () => {
    setConfirmationClose(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box display="flex" maxWidth="md">
      <Drawer anchor="right" open={drawerOpen} onClose={() => {
        setDrawerOpen(false);
        window.location.reload();
      }}>
        <Box sx={{ width: 500 }}>
          <Button
            sx={{
              height: '80px',
              marginTop: '41px',
              width: '100px',
              borderTopLeftRadius: '40%',
              borderBottomLeftRadius: '40%',
            }}
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
              window.location.reload();
            }}
          >
            Close
          </Button>
          <Paper elevation={6} sx={{ width: '500px', padding: '16px' }}>
            <AppBar color="inherit" position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Edit Organization
                </Typography>
                <FormControl variant="outlined" size="small">
                  <Select
                    name="status"
                    
                    value={formData.status}
                    onChange={handleChange}
                  >
                    
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Toolbar>
            </AppBar>
            <form>
              <Box my={4} p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Organization Name"
                      value={formData.name}
                      margin="normal"
                      onChange={(event) => handleChange({ ...event, target: { name: 'name', value: event.target.value } })}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" justifyContent="center" mb={2}>
                <Button
                  onClick={handleEdit}
                  color="inherit"
                  variant="contained"
                  startIcon={<CheckCircleIcon color="success" />}
                  sx={{ margin: '10px' }}
                >
                  Update
                </Button>
                <Button
                onClick={() => {
                  handleClose();
                  window.location.reload();
}}                  color="inherit"
                  variant="contained"
                  startIcon={<CancelIcon color="error" />}
                  sx={{ margin: '10px' }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Paper>
          {/* <Dialog
            open={confirmationClose}
            onClose={handleConfirmCancel}
          >
            <DialogTitle>{"Close"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to close without saving changes?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmCancel} color="primary">
                No
              </Button>
              <Button onClick={handleConfirmClose} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog> */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
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
      </Drawer>
    </Box>
  );
}
export default UpdateOrganization;
