
// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { FaCheck, FaTimes } from 'react-icons/fa';
// // import { TextField } from '@mui/material';
// // import axios from 'axios';


// // const AddBranch = ({ branch, onClose }) => {
// //     const [name, setName] = useState('');
// //     const [phone_number, setPhoneNumber] = useState('');
// //     const [address, setAddress] = useState('');
// //     const [status, setStatus] = useState('active');
// //     const [organizationId, setOrganizationId] = useState('');
// //     const [parent_org, setParentOrg] = useState('');
// //     const [organizations, setOrganizations] = useState([]);

// //     useEffect(() => {
// //         if (branch) {
// //             setName(branch.name);
// //             setPhoneNumber(branch.phone_number || '');
// //             setAddress(branch.address || '');
// //             setStatus(branch.status);
// //             setOrganizationId(branch.organizationId || '');
// //             setParentOrg(branch.parent_org || '');
// //         }
// //     }, [branch]);

// //     useEffect(() => {
// //         axios.get('http://localhost:9999/allorganizations')
// //             .then(response => {
// //                 setOrganizations(response.data);
// //             })
// //             .catch(error => console.error('Error fetching organizations:', error));
// //     }, []);

// //     const handleSave = async () => {
// //         const branchData = {
// //             name,
// //             phone_number,
// //             address,
// //             status,
// //             organizationId,
// //             parent_org
// //         };

// //         try {
// //             await axios.post(`http://localhost:9090/save/${organizationId}`, branchData);

// //             setName('');
// //             setPhoneNumber('');
// //             setAddress('');
// //             setStatus('active');
// //             setOrganizationId('');
// //             setParentOrg('');
// //             setSnackbar({
// //                 open: true,
// //                 message: 'Saved successfully.',
// //                 severity: 'success',
// //               });

// //             onClose();
// //         } catch (error) {
// //             console.error('Error saving branch:', error);
// //         }
// //     };

// //     const handleUpdate = async () => {
// //         const branchData = {
// //             name,
// //             phone_number,
// //             address,
// //             status,
// //             organizationId,
            
// //         };

// //         try {
// //             await axios.put(`http://localhost:9090/${branch.id}`, branchData);

// //             setName('');
// //             setPhoneNumber('');
// //             setAddress('');
// //             setStatus('active');
// //             setOrganizationId('');
            

// //             onClose();
// //         } catch (error) {
// //             console.error('Error updating branch:', error);
// //         }
// //     };

// //     const handleCancel = () => {
// //         setName('');
// //         setPhoneNumber('');
// //         setAddress('');
// //         setStatus('active');
// //         setOrganizationId('');
// //         setParentOrg('');

// //         onClose();
// //     };

// //     const isSaveDisabled = !name || !phone_number || !address || !organizationId;

// //     return (
// //         <div className="p-4" style={{ width: '100%', marginTop: '38px' }}>
// //             <hr />
// //             <div className="d-flex justify-content-between align-items-center mb-3">
// //                 <h6 className="mb-0" style={{ marginLeft: '1rem' }}>{branch ? 'Edit Branch' : 'Add Branch'}</h6>
// //                 <select className="form-select" style={{ width: '30%' }} value={status} onChange={(e) => setStatus(e.target.value)}>
// //                     <option value="active">Active</option>
// //                     <option value="inactive">Inactive</option>
// //                 </select>
// //             </div>
// //             <hr />
// //             {branch && (
// //                 <div className="mb-3 form-floating">
// //                     <div>{parent_org}</div>
// //                 </div>
// //             )}
// //             {!branch && (
// //                 <div className="mb-3 form-floating">
// //                     <select
// //                         className="form-select"
// //                         id="organizationId"
// //                         value={organizationId}
// //                         onChange={(e) => {
// //                             const selectedOrg = organizations.find(org => org.organizationId === e.target.value);
// //                             setOrganizationId(e.target.value);
// //                             setParentOrg(selectedOrg ? selectedOrg.name : '');
// //                         }}
// //                     >
// //                         <option value="">Parent Org</option>
// //                         {organizations.map(org => (
// //                             <option key={org.id} value={org.organizationId}>{org.name}</option>
// //                         ))}
// //                     </select>
// //                     <label htmlFor="organizationId">Parent Organization</label>
// //                 </div>
// //             )}
            
// //             <TextField
// //                 label="Branch Name"
// //                 variant="outlined"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 fullWidth
// //                 className="mb-3"
// //             />
            
// //             <TextField
// //                 label="Phone Number"
// //                 variant="outlined"
// //                 value={phone_number}
// //                 onChange={(e) => setPhoneNumber(e.target.value)}
// //                 fullWidth
// //                 className="mb-3"
// //             />
        
// //             <TextField
// //                 label="Address"
// //                 variant="outlined"
// //                 value={address}
// //                 onChange={(e) => setAddress(e.target.value)}
// //                 fullWidth
// //                 multiline
// //                 rows={4}
// //                 className="mb-3"
// //             />
// //             <div className="d-flex justify-content-start mt-3">
// //                 {!branch ? (
// //                     <button
// //                         style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
// //                         className="btn me-2"
// //                         onClick={handleSave}
// //                         disabled={isSaveDisabled}
// //                     >
// //                         <span
// //                             className="circle"
// //                             style={{
// //                                 display: 'inline-flex',
// //                                 justifyContent: 'center',
// //                                 alignItems: 'center',
// //                                 width: '20px',
// //                                 height: '20px',
// //                                 borderRadius: '50%',
// //                                 border: '1px solid green',
// //                                 marginRight: '8px',
// //                                 backgroundColor: 'green'
// //                             }}
// //                         >
// //                             <FaCheck style={{ color: 'white', fontSize: '12px' }} />
// //                         </span>
// //                         Save
// //                     </button>
// //                 ) : (
// //                     <button
// //                         style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
// //                         className="btn me-2"
// //                         onClick={handleUpdate}
// //                     >
// //                         <span
// //                             className="circle"
// //                             style={{
// //                                 display: 'inline-flex',
// //                                 justifyContent: 'center',
// //                                 alignItems: 'center',
// //                                 width: '20px',
// //                                 height: '20px',
// //                                 borderRadius: '50%',
// //                                 border: '1px solid green',
// //                                 marginRight: '8px',
// //                                 backgroundColor: 'green'
// //                             }}
// //                         >
// //                             <FaCheck style={{ color: 'white', fontSize: '12px' }} />
// //                         </span>
// //                         Update
// //                     </button>
// //                 )}
// //                 <button
// //                     style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
// //                     className="btn"
// //                     onClick={handleCancel}
// //                 >
// //                     <span
// //                         className="circle"
// //                         style={{
// //                             display: 'inline-flex',
// //                             justifyContent: 'center',
// //                             alignItems: 'center',
// //                             width: '20px',
// //                             height: '20px',
// //                             borderRadius: '50%',
// //                             border: '1px solid red',
// //                             marginRight: '8px',
// //                             backgroundColor: 'red'
// //                         }}
// //                     >
// //                         <FaTimes style={{ color: 'white', fontSize: '12px' }} />
// //                     </span>
// //                     Cancel
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default AddBranch;









// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import { TextField } from '@mui/material';
// import axios from 'axios';

// const AddBranch = ({ branch, onClose }) => {
//     const [name, setName] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [status, setStatus] = useState('active');
//     const [organizationId, setOrganizationId] = useState('');
//     const [parent_org, setParentOrg] = useState('');
//     const [organizations, setOrganizations] = useState([]);

//     useEffect(() => {
//         if (branch) {
//             setName(branch.name);
//             setPhoneNumber(branch.phone_number || '');
//             setAddress(branch.address || '');
//             setStatus(branch.status);
//             setOrganizationId(branch.organizationId || '');
//             setParentOrg(branch.parent_org || '');
//         }
//     }, [branch]);

//     useEffect(() => {
//         axios.get('http://localhost:9999/allorganizations')
//             .then(response => {
//                 setOrganizations(response.data);
//             })
//             .catch(error => console.error('Error fetching organizations:', error));
//     }, []);

//     const handleSave = async () => {
//         const branchData = {
//             name,
//             phone_number,
//             address,
//             status,
//             organizationId,
//             parent_org
//         };

//         try {
//             await axios.post(`http://localhost:9090/save/${organizationId}`, branchData);
//             resetForm();
//             onClose();
//         } catch (error) {
//             console.error('Error saving branch:', error);
//         }
//     };

//     const handleUpdate = async () => {
//         const branchData = {
//             name,
//             phone_number,
//             address,
//             status,
//             organizationId,
//             parent_org
//         };
    
//         try {
//             await axios.put(`http://localhost:9090/${branch.id}`, branchData); // Check this line
//             resetForm();
//             onClose();
//         } catch (error) {
//             console.error('Error updating branch:', error);
//         }
//     };
    

//     const resetForm = () => {
//         setName('');
//         setPhoneNumber('');
//         setAddress('');
//         setStatus('active');
//         setOrganizationId('');
//         setParentOrg('');
//     };

//     const handleCancel = () => {
//         resetForm();
//         onClose();
//     };

//     const isSaveDisabled = !name || !phone_number || !address || !organizationId;

//     return (
//         <div className="p-4" style={{ width: '100%', marginTop: '38px' }}>
//             <hr />
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0" style={{ marginLeft: '1rem' }}>{branch ? 'Edit Branch' : 'Add Branch'}</h6>
//                 <select className="form-select" style={{ width: '30%' }} value={status} onChange={(e) => setStatus(e.target.value)}>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                 </select>
//             </div>
//             <hr />
//             {!branch && (
//                 <div className="mb-3 form-floating">
//                     <select
//                         className="form-select"
//                         id="organizationId"
//                         value={organizationId}
//                         onChange={(e) => {
//                             const selectedOrg = organizations.find(org => org.organizationId === e.target.value);
//                             setOrganizationId(e.target.value);
//                             setParentOrg(selectedOrg ? selectedOrg.name : '');
//                         }}
//                     >
//                         <option value="">Parent Org</option>
//                         {organizations.map(org => (
//                             <option key={org.id} value={org.organizationId}>{org.name}</option>
//                         ))}
//                     </select>
//                     <label htmlFor="organizationId">Parent Organization</label>
//                 </div>
//             )}
//             <TextField
//                 label="Branch Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 className="mb-3"
//             />
//             <TextField
//                 label="Phone Number"
//                 variant="outlined"
//                 value={phone_number}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 fullWidth
//                 className="mb-3"
//             />
//             <TextField
//                 label="Address"
//                 variant="outlined"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 fullWidth
//                 multiline
//                 rows={4}
//                 className="mb-3"
//             />
//             <div className="d-flex justify-content-start mt-3">
//                 {!branch ? (
//                     <button
//                         style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
//                         className="btn me-2"
//                         onClick={handleSave}
//                         disabled={isSaveDisabled}
//                     >
//                         <span
//                             className="circle"
//                             style={{
//                                 display: 'inline-flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 width: '20px',
//                                 height: '20px',
//                                 borderRadius: '50%',
//                                 border: '1px solid green',
//                                 marginRight: '8px',
//                                 backgroundColor: 'green'
//                             }}
//                         >
//                             <FaCheck style={{ color: 'white', fontSize: '12px' }} />
//                         </span>
//                         Save
//                     </button>
//                 ) : (
//                     <button
//                         style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
//                         className="btn me-2"
//                         onClick={handleUpdate}
//                     >
//                         <span
//                             className="circle"
//                             style={{
//                                 display: 'inline-flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 width: '20px',
//                                 height: '20px',
//                                 borderRadius: '50%',
//                                 border: '1px solid green',
//                                 marginRight: '8px',
//                                 backgroundColor: 'green'
//                             }}
//                         >
//                             <FaCheck style={{ color: 'white', fontSize: '12px' }} />
//                         </span>
//                         Update
//                     </button>
//                 )}
//                 <button
//                     style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
//                     className="btn"
//                     onClick={handleCancel}
//                 >
//                     <span
//                         className="circle"
//                         style={{
//                             display: 'inline-flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             width: '20px',
//                             height: '20px',
//                             borderRadius: '50%',
//                             border: '1px solid red',
//                             marginRight: '8px',
//                             backgroundColor: 'red'
//                         }}
//                     >
//                         <FaTimes style={{ color: 'white', fontSize: '12px' }} />
//                     </span>
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AddBranch;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import { TextField } from '@mui/material';

// const AddBranch = ({ branch, onClose, fetchBranches }) => {
//     const [name, setName] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [status, setStatus] = useState('active');
//     const [organizationId, setOrganizationId] = useState('');
//     const [organizations, setOrganizations] = useState([]);
//     const [notification, setNotification] = useState(null);

//     useEffect(() => {
//         if (branch) {
//             setName(branch.name);
//             setPhoneNumber(branch.phone_number || '');
//             setAddress(branch.address || '');
//             setStatus(branch.status);
//             setOrganizationId(branch.organizationId || '');
//         }
//     }, [branch]);

//     useEffect(() => {
//         axios.get('http://localhost:9999/allorganizations')
//             .then(response => {
//                 setOrganizations(response.data);
//             })
//             .catch(error => console.error('Error fetching organizations:', error));
//     }, []);

//     const handleSave = async () => {
//         const branchData = {
//             name,
//             phone_number,
//             address,
//             status
//         };

//         const config = branch
//             ? {
//                 method: 'put',
//                 url: `http://localhost:9090/update/${branch.branch_Id}`
//             }
//             : {
//                 method: 'post',
//                 url: `http://localhost:9090/save/${organizationId}`
//             };

//         try {
//             const response = await axios({
//                 ...config,
//                 data: branchData
//             });

//             if (response.status === 200) {
//                 alert(response.data);
//                 console.log(`${branch ? 'Branch updated' : 'Branch saved'}:`, response.data);
//                 resetForm();
//                 onClose();
//                 fetchBranches();
//             } else {
//                 console.error('Error saving branch:', response.data);
//                 alert(response.statusText);
//             }
//         } catch (error) {
//             console.error('Error saving branch:', error);
//         }
//     };

//     const resetForm = () => {
//         setName('');
//         setPhoneNumber('');
//         setAddress('');
//         setStatus('active');
//         setOrganizationId('');
//     };

//     const handleCancel = () => {
//         resetForm();
//         onClose();
//     };

//     const isSaveDisabled = !name || !phone_number || !address || (!branch && !organizationId);

//     return (
//         <div className="p-4" style={{ width: '100%', marginTop: '38px' }}>
//             {notification && (
//                 <div className="alert alert-success" role="alert">
//                     {notification}
//                 </div>
//             )}
//             <hr />
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5 className="mb-0" style={{ marginLeft: '1rem' }}>{branch ? 'Edit Branch' : 'Add Branch'}</h5>
//                 <select className="form-select" style={{ width: '30%' }} value={status} onChange={(e) => setStatus(e.target.value)}>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                 </select>
//             </div>
//             <hr />
//             {!branch && (
//                 <div className="mb-3 form-floating">
//                     <select
//                         className="form-select"
//                         id="organizationId"
//                         value={organizationId}
//                         onChange={(e) => setOrganizationId(e.target.value)}
//                     >
//                         <option value="">Select Organization</option>
//                         {organizations.map(org => (
//                             <option key={org.organizationId} value={org.organizationId}>{org.name}</option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//             <TextField
//                 label="Branch Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 className="mb-3"
//             />
//             <TextField
//                 label="Phone Number"
//                 variant="outlined"
//                 value={phone_number}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 fullWidth
//                 className="mb-3"
//             />
//             <TextField
//                 label="Address"
//                 variant="outlined"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 fullWidth
//                 multiline
//                 rows={4}
//                 className="mb-3"
//             />
//             <div className="d-flex justify-content-start mt-3">
//                 <button
//                     style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
//                     className="btn me-2"
//                     onClick={handleSave}
//                     disabled={isSaveDisabled}
//                 >
//                     <span
//                         className="circle"
//                         style={{
//                             display: 'inline-flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             width: '20px',
//                             height: '20px',
//                             borderRadius: '50%',
//                             border: '1px solid green',
//                             marginRight: '8px',
//                             backgroundColor: 'green'
//                         }}
//                     >
//                         <FaCheck style={{ color: 'white', fontSize: '12px' }} />
//                     </span>
//                     {branch ? 'Update' : 'Save'}
//                 </button>
//                 <button
//                     style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
//                     className="btn"
//                     onClick={handleCancel}
//                 >
//                     <span
//                         className="circle"
//                         style={{
//                             display: 'inline-flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             width: '20px',
//                             height: '20px',
//                             borderRadius: '50%',
//                             border: '1px solid red',
//                             marginRight: '8px',
//                             backgroundColor: 'red'
//                         }}
//                     >
//                         <FaTimes style={{ color: 'white', fontSize: '12px' }} />
//                     </span>
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AddBranch;








import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { TextField, Snackbar, Alert } from '@mui/material';

const AddBranch = ({ branch, onClose, fetchBranches }) => {
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('active');
    const [organizationId, setOrganizationId] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (branch) {
            setName(branch.name);
            setPhoneNumber(branch.phone_number || '');
            setAddress(branch.address || '');
            setStatus(branch.status);
            setOrganizationId(branch.organizationId || '');
        }
    }, [branch]);

    useEffect(() => {
        axios.get('http://localhost:9999/allorganizations')
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => console.error('Error fetching organizations:', error));
    }, []);

    const validateField = (field, value) => {
        let error;
        const nameRegex = /^[A-Za-z\s]{3,50}$/;
        const phoneRegex = /^\d{10}$/;

        switch (field) {
            case 'name':
                if (!value || !nameRegex.test(value)) {
                    error = 'Branch name should be 3 to 50 characters long and contain only alphabets and spaces.';
                }
                break;
            case 'phone_number':
                if (!value || !phoneRegex.test(value)) {
                    error = 'Phone number should be exactly 10 digits.';
                }
                break;
            case 'address':
                if (!value) {
                    error = 'Address must be entered.';
                }
                break;
            case 'organizationId':
                if (!branch && !value) {
                    error = 'Organization must be selected.';
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        const branchData = {
            name,
            phone_number,
            address,
            status
        };

        const config = branch
            ? {
                method: 'put',
                url: `http://localhost:9090/update/${branch.branch_Id}`
            }
            : {
                method: 'post',
                url: `http://localhost:9090/save/${organizationId}`
            };

        try {
            const response = await axios({
                ...config,
                data: branchData
            });

            if (response.status === 200) {
                setSnackbarMessage(branch ? 'Branch updated successfully!' : 'Branch added successfully!');
                setSnackbarOpen(true);
                resetForm();
                onClose();
                fetchBranches();
            } else {
                console.error('Error saving branch:', response.data);
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error saving branch:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setPhoneNumber('');
        setAddress('');
        setStatus('active');
        setOrganizationId('');
        setErrors({});
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const handleBlur = (field, value) => {
        validateField(field, value);
    };

    const handleChange = (field, value) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'phone_number':
                setPhoneNumber(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'organizationId':
                setOrganizationId(value);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]{3,50}$/;
        const phoneRegex = /^\d{10}$/;

        if (!name || !nameRegex.test(name)) {
            newErrors.name = 'Branch name should be 3 to 50 characters long and contain only alphabets and spaces.';
        }

        if (!phone_number || !phoneRegex.test(phone_number)) {
            newErrors.phone_number = 'Phone number should be exactly 10 digits.';
        }

        if (!address) {
            newErrors.address = 'Address must be entered.';
        }

        if (!branch && !organizationId) {
            newErrors.organizationId = 'Organization must be selected.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isSaveDisabled = !name || !phone_number || !address || (!branch && !organizationId);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="p-4" style={{ width: '100%', marginTop: '38px' }}>
            {notification && (
                <div className="alert alert-success" role="alert">
                    {notification}
                </div>
            )}
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ marginLeft: '1rem' }}>{branch ? 'Edit Branch' : 'Add Branch'}</h5>
                <select className="form-select" style={{ width: '30%' }} value={status} onChange={(e) => handleChange('status', e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <hr />
            {!branch && (
                <div className="mb-3 form-floating">
                    <select
                        className={`form-select ${errors.organizationId ? 'is-invalid' : ''}`}
                        id="organizationId"
                        value={organizationId}
                        onChange={(e) => handleChange('organizationId', e.target.value)}
                        onBlur={(e) => handleBlur('organizationId', e.target.value)}
                    >
                        <option value="">Select Organization</option>
                        {organizations.map(org => (
                            <option key={org.organizationId} value={org.organizationId}>{org.name}</option>
                        ))}
                    </select>
                    {errors.organizationId && <div className="invalid-feedback">{errors.organizationId}</div>}
                </div>
            )}
            <TextField
                label="Branch Name"
                variant="outlined"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
                fullWidth
                className="mb-3"
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                value={phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                onBlur={(e) => handleBlur('phone_number', e.target.value)}
                fullWidth
                className="mb-3"
                error={!!errors.phone_number}
                helperText={errors.phone_number}
            />
            <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => handleChange('address', e.target.value)}
                onBlur={(e) => handleBlur('address', e.target.value)}
                fullWidth
                multiline
                rows={4}
                className="mb-3"
                error={!!errors.address}
                helperText={errors.address}
            />
            <div className="d-flex justify-content-start mt-3">
                <button
                    style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
                    className="btn me-2"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                >
                    <span
                        className="circle"
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '1px solid green',
                            marginRight: '8px',
                            backgroundColor: 'green'
                        }}
                    >
                        <FaCheck style={{ color: 'white', fontSize: '12px' }} />
                    </span>
                    {branch ? 'Update' : 'Save'}
                </button>
                <button
                    style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
                    className="btn"
                    onClick={handleCancel}
                >
                    <span
                        className="circle"
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '1px solid red',
                            marginRight: '8px',
                            backgroundColor: 'red'
                        }}
                    >
                        <FaTimes style={{ color: 'white', fontSize: '12px' }} />
                    </span>
                    Cancel
                </button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AddBranch;
