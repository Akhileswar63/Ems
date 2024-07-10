
// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import TextField from '@mui/material/TextField';
// import Drawer from '@mui/material/Drawer';
// import AddBranch from './AddBranch'; // Import the AddBranch component
// import axios from 'axios';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
// import Dashboard from './Dashboard';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: 'whitesmoke',
//   '&:hover': {
//     backgroundColor: 'whitesmoke',
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '20ch', // Changed width from 12ch to 20ch
//       '&:focus': {
//         width: '30ch', // Changed width from 20ch to 30ch
//       },
//     },
//   },
// }));

// export default function Branch() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [currentBranch, setCurrentBranch] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterRows(searchQuery);
//   }, [searchQuery, rows]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090');
//       setRows(response.data);
//       setFilteredRows(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const filterRows = (query) => {
//     const filtered = rows.filter((row) =>
//       row.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredRows(filtered);
//   };

//   const toggleDrawer = (open, branch = null) => () => {
//     setCurrentBranch(branch);
//     setDrawerOpen(open);
//   };
//   const getStatusColor = (status) => {
//     if (status === null) return 'black'; // or any other default color
//     return status.toLowerCase() === 'active' ? 'green' : 'red';
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
//       <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
//         <Dashboard/>
//     <Box sx={{ flexGrow: 1, width: 880 }}>
//       <AppBar position="static" sx={{ bgcolor: 'white', marginTop: '25px', color: 'black' }}>
//         <Toolbar>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#000080' }}
//           >
//             All Branches
//           </Typography>
//           <Search>
//             <StyledInputBase
//               placeholder="Search"
//               inputProps={{ 'aria-label': 'search' }}
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </Search>
//         </Toolbar>
//       </AppBar>
//       <Box>
//         <Button
//           variant="contained"
//           startIcon={<AddCircleIcon />}
//           sx={{
//             margin: 3,
//             marginLeft: 0,
//             backgroundColor: '#d32f2f',
//             color: 'white',
//             '&:hover': {
//               backgroundColor: '#d32f2f', // Same as default background color
//             },
//           }}
//           onClick={toggleDrawer(true)}
//         >
//           Add Branch
//         </Button>
//       </Box>
//       <ToggleButtonGroup exclusive aria-label="view toggle" sx={{ float: 'right', marginTop: '-35px' }}>
//         <ToggleButton
//           value="schema"
//           aria-label="schema view"
//           sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
//         >
//           <FormatListBulletedIcon sx={{ color: 'white' }} />
//         </ToggleButton>
//         <ToggleButton value="list" aria-label="list view">
//           <SchemaTwoToneIcon />
//         </ToggleButton>
//       </ToggleButtonGroup>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="caption table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: '#000080' }}>Branch ID</TableCell>
//               <TableCell sx={{ color: '#000080' }} align="right">
//                 Branch Name
//               </TableCell>
//               <TableCell sx={{ color: '#000080' }} align="right">
//                 Parent org
//               </TableCell>
//               <TableCell sx={{ color: '#000080' }} align="right">
//                 Status
//               </TableCell>
//               <TableCell sx={{ color: '#000080' }} align="right">
//                 Address
//               </TableCell>
//               <TableCell sx={{ color: '#000080' }} align="right">
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.map((row) => (
//               <TableRow key={row.branch_Id}>
//                 <TableCell component="th" scope="row">
//                   {row.branch_Id}
//                 </TableCell>
//                 <TableCell align="right">{row.name}</TableCell>
//                 <TableCell align="right">{row.organisation}</TableCell>
//                 <TableCell align="right" sx={{ color: getStatusColor(row.status) }}>
//                   {row.status}
//                 </TableCell>
//                 <TableCell align="right">{row.address}</TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="outlined"
//                     sx={{
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#115293', // Keep the hover effect for edit button
//                       },
//                     }}
//                     onClick={toggleDrawer(true, row)}
//                   >
//                     Edit
//                   </Button>
                                    

//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <caption>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   marginRight: 1,
//                   backgroundColor: 'whitesmoke',
//                   color: 'black',
//                   '&:hover': {
//                     backgroundColor: 'whitesmoke',
//                     textTransform: 'capitalize', // Same as default background color
//                   },
//                 }}
//               >
//                 Previous
//               </Button>
//               <Pagination
//                 count={1}
//                 shape="rounded"
//                 hidePrevButton
//                 hideNextButton
//                 sx={{
//                   backgroundColor: '#d32f2f',
//                   color: 'white',
//                   borderRadius: 1,
//                   '& .MuiPaginationItem-root': {
//                     color: 'white',
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{
//                   marginLeft: 1,
//                   backgroundColor: 'whitesmoke',
//                   color: 'black',
//                   '&:hover': {
//                     backgroundColor: 'whitesmoke',
//                     textTransform: 'capitalize', // Same as default background color
//                   },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </caption>
//         </Table>
//       </TableContainer>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: '40%',
//           },
//         }}
//       >
//         <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} />
//       </Drawer>
//     </Box>
//     </Box>
//     </Box>
//   );
// }







// // import * as React from 'react';
// // import { useState, useEffect } from 'react';
// // import { styled } from '@mui/material/styles';
// // import AppBar from '@mui/material/AppBar';
// // import Box from '@mui/material/Box';
// // import Toolbar from '@mui/material/Toolbar';
// // import IconButton from '@mui/material/IconButton';
// // import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';
// // import AddCircleIcon from '@mui/icons-material/AddCircle';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';
// // import Pagination from '@mui/material/Pagination';
// // import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// // import TextField from '@mui/material/TextField';
// // import Drawer from '@mui/material/Drawer';
// // import AddBranch from './AddBranch'; // Import the AddBranch component
// // import axios from 'axios';

// // const Search = styled('div')(({ theme }) => ({
// //   position: 'relative',
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: 'whitesmoke',
// //   '&:hover': {
// //     backgroundColor: 'whitesmoke',
// //   },
// //   marginLeft: 0,
// //   width: '100%',
// //   [theme.breakpoints.up('sm')]: {
// //     marginLeft: theme.spacing(1),
// //     width: 'auto',
// //   },
// // }));

// // const StyledInputBase = styled(TextField)(({ theme }) => ({
// //   color: 'inherit',
// //   width: '100%',
// //   '& .MuiInputBase-input': {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create('width'),
// //     [theme.breakpoints.up('sm')]: {
// //       width: '12ch',
// //       '&:focus': {
// //         width: '20ch',
// //       },
// //     },
// //   },
// // }));

// // export default function Branch() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [rows, setRows] = useState([]);
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [currentBranch, setCurrentBranch] = useState(null);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleSearchChange = (event) => {
// //     setSearchQuery(event.target.value);
// //     filterRows(event.target.value);
// //   };

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:9090/branches');
// //       setRows(response.data);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //   };

// //   const filterRows = (query) => {
// //     const filteredRows = rows.filter((row) =>
// //       row.branchName.toLowerCase().includes(query.toLowerCase())
// //     );
// //     setRows(filteredRows);
// //   };

// //   const toggleDrawer = (open, branch = null) => () => {
// //     setCurrentBranch(branch);
// //     setDrawerOpen(open);
// //   };

// //   return (
// //     <Box sx={{ flexGrow: 1, width: 880}}>
// //       <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
// //         <Toolbar>
// //           <Typography
// //             variant="h6"
// //             noWrap
// //             component="div"
// //             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#2f4f85' }}
// //           >
// //             All Branches
// //           </Typography>
// //           <Search sx={{ backgroundColor: 'white', color: '#2f4f85' }}>
// //             <StyledInputBase
// //               sx={{ color: '#2f4f85'}}
// //               label="Search" 
// //               variant="outlined"
// //               size="small"
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //             />
// //           </Search>
// //         </Toolbar>
// //       </AppBar>
// //       <Box>
// //         <Button
// //           variant="contained"
// //           startIcon={<AddCircleIcon />}
// //           sx={{ margin: 3, marginLeft: 0, backgroundColor: 'red' }}
// //           onClick={toggleDrawer(true)}
// //         >
// //           Add Branch
// //         </Button>
// //       </Box>
// //       <Box sx={{ float: 'right', marginTop: -5 }}>
// //         <FormatListBulletedIcon />
// //       </Box>
// //       <TableContainer component={Paper}>
// //         <Table sx={{ minWidth: 650 }} aria-label="caption table">
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Branch ID</TableCell>
// //               <TableCell align="right">Branch Name</TableCell>
             
// //               <TableCell align="right">Phone number</TableCell>
// //               <TableCell align="right">Address</TableCell>
// //               <TableCell align="right">Action</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {rows.map((row) => (
// //               <TableRow key={row.branch_Id}>
// //                 <TableCell component="th" scope="row">
// //                   {row.branch_Id}
// //                 </TableCell>
// //                 <TableCell align="right">{row.name}</TableCell>
// //                 <TableCell align="right">{row.phone_number}</TableCell>
// //                 <TableCell align="right">{row.address}</TableCell>
                
// //                 <TableCell align="right">
// //                   <Button onClick={toggleDrawer(true, row)}>Edit</Button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //           <caption>
// //             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
// //               <Button variant="contained" sx={{ marginRight: 1, backgroundColor: 'whitesmoke', color: 'black' }}>Previous</Button>
// //               <Pagination count={1} shape="rounded" hidePrevButton hideNextButton sx={{ backgroundColor: 'red', color: 'black', borderRadius: 1 }} />
// //               <Button variant="contained" sx={{ marginLeft: 1, backgroundColor: 'whitesmoke', color: 'black' }}>Next</Button>
// //             </Box>
// //           </caption>
// //         </Table>
// //       </TableContainer>
// //       <Drawer
// //         anchor="right"
// //         open={drawerOpen}
// //         onClose={toggleDrawer(false)}
// //         PaperProps={{
// //           sx: {
// //             width: '40%',
// //           },
// //         }}
// //       >
// //         <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} />
// //       </Drawer>
// //     </Box>
// //   );
// // }




// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import TextField from '@mui/material/TextField';
// import Drawer from '@mui/material/Drawer';
// import AddBranch from './AddBranch'; // Import the AddBranch component
// import axios from 'axios';
// import Dashboard from './Dashboard';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: 'whitesmoke',
//   '&:hover': {
//     backgroundColor: 'whitesmoke',
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '20ch', // Changed width from 12ch to 20ch
//       '&:focus': {
//         width: '30ch', // Changed width from 20ch to 30ch
//       },
//     },
//   },
// }));

// export default function Branch() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rows, setRows] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [currentBranch, setCurrentBranch] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     filterRows(event.target.value);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/all');
//       setRows(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const filterRows = (query) => {
//     const filteredRows = rows.filter((row) =>
//       row.branchName.toLowerCase().includes(query.toLowerCase())
//     );
//     setRows(filteredRows);
//   };

//   const toggleDrawer = (open, branch = null) => () => {
//     setCurrentBranch(branch);
//     setDrawerOpen(open);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
//       <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
//         <Dashboard/>
//     <Box sx={{ flexGrow: 1, width: 880 }}>
//       <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
//         <Toolbar>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#2f4f85' }}
//           >
//             All Branches
//           </Typography>
//           <Search>
//             <StyledInputBase
//               placeholder="Search"
//               inputProps={{ 'aria-label': 'search', }}
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </Search>
//         </Toolbar>
//       </AppBar>
//       <Box>
//         <Button
//           variant="contained"
//           startIcon={<AddCircleIcon />}
//           sx={{ 
//             margin: 3, 
//             marginLeft: 0, 
//             backgroundColor: '#d32f2f', 
//             color: 'white',
//             '&:hover': {
//               backgroundColor: '#d32f2f', // Same as default background color
//             }
//           }}
//           onClick={toggleDrawer(true)}
//         >
//           Add Branch
//         </Button>
//       </Box>
//       <Box sx={{ float: 'right', marginTop: -5 }}>
//         <FormatListBulletedIcon />
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="caption table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Branch ID</TableCell>
//               <TableCell align="right">Branch Name</TableCell>
//               <TableCell align="right">Parent org</TableCell>
//               {/* <TableCell align="right">Phone number</TableCell> */}
//               <TableCell align="right">Status</TableCell>
//               <TableCell align="right">Address</TableCell>
//               <TableCell align="right">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.branch_Id}>
//                 <TableCell component="th" scope="row">
//                   {row.branch_Id}
//                 </TableCell>
//                 <TableCell align="right">{row.name}</TableCell>
//                 <TableCell align="right">{row.parent_organization}</TableCell>
//                 {/* <TableCell align="right">{row.phone_number}</TableCell> */}
//                 <Tablecell align="right">{row.status}</Tablecell>
//                 <TableCell align="right">{row.address}</TableCell>

//                 <TableCell align="right">
//                   <Button
//                     variant="outlined"
//                     sx={{ 
//                       backgroundColor: '#1976d2', 
//                       color: 'white', 
//                       '&:hover': { 
//                         backgroundColor: '#115293', // Keep the hover effect for edit button
//                       }
//                     }}
//                     onClick={toggleDrawer(true, row)}
//                   >
//                     Edit
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <caption>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Button
//                 variant="contained"
//                 sx={{ 
//                   marginRight: 1, 
//                   backgroundColor: 'whitesmoke', 
//                   color: 'black',
//                   '&:hover': {
//                     backgroundColor: 'whitesmoke', // Same as default background color
//                   }
//                 }}
//               >
//                 Previous
//               </Button>
//               <Pagination
//                 count={1}
//                 shape="rounded"
//                 hidePrevButton
//                 hideNextButton
//                 sx={{ 
//                   backgroundColor: '#d32f2f', 
//                   color: 'white', 
//                   borderRadius: 1,
//                   '& .MuiPaginationItem-root': {
//                     color: 'white',
//                   }
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{ 
//                   marginLeft: 1, 
//                   backgroundColor: 'whitesmoke', 
//                   color: 'black',
//                   '&:hover': {
//                     backgroundColor: 'whitesmoke', // Same as default background color
//                   }
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </caption>
//         </Table>
//       </TableContainer>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: '40%',
//           },
//         }}
//       >
//         <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} />
//       </Drawer>
//     </Box>
//     </Box>
//     </Box>
//   );
// }









// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';
// import Drawer from '@mui/material/Drawer';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import axios from 'axios';
// import AddBranch from './AddBranch';
// import Dashboard from './Dashboard';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: 'whitesmoke',
//   '&:hover': {
//     backgroundColor: 'whitesmoke',
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// export default function Branch() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rows, setRows] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [currentBranch, setCurrentBranch] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const fetchBranches = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/all');
//       setRows(response.data);
//     } catch (error) {
//       console.error('Error fetching branches:', error);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     filterRows(event.target.value);
//   };

//   const filterRows = (query) => {
//     const filteredRows = rows.filter((row) =>
//       row.branchName.toLowerCase().includes(query.toLowerCase())
//     );
//     setRows(filteredRows);
//     setCurrentPage(1);
//   };

//   const toggleDrawer = (open, branch = null) => () => {
//     setCurrentBranch(branch);
//     setDrawerOpen(open);
//   };

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(rows.length / rowsPerPage);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
//       <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
//         <Dashboard/>
//     <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//       <Toolbar />
//       <Box sx={{ flex: 1, overflow: 'hidden', padding: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//           <Button
//             sx={{ backgroundColor: 'red' }}
//             variant="contained"
//             startIcon={<AddCircleOutlineIcon />}
//             onClick={toggleDrawer(true)}
//           >
//             Add Branch
//           </Button>
//           <FormatListBulletedIcon />
//         </Box>
//         <TableContainer component={Paper} sx={{ height: 'calc(100vh - 200px)' }}>
//           <Table stickyHeader aria-label="caption table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Branch ID</TableCell>
//                 <TableCell align="right">Branch Name</TableCell>
//                 <TableCell align="right">Branch Location</TableCell>
//                 <TableCell align="right">Parent Org</TableCell>
//                 <TableCell align="right">Status</TableCell>
//                 <TableCell align="right">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.map((row) => (
//                 <TableRow key={row.branch_Id}>
//                   <TableCell component="th" scope="row">
//                     {row.branch_Id}
//                   </TableCell>
//                   <TableCell align="right">{row.name}</TableCell>
//                   <TableCell align="right">{row.address}</TableCell>
//                   <TableCell align="right">{row.parent_organization}</TableCell>
//                   <TableCell align="right">
//                     <span style={{ color: row.status === 'Active' ? 'red' : 'inherit' }}>{row.status}</span>
//                   </TableCell>
//                   <TableCell align="right">
//                     <Button onClick={toggleDrawer(true, row)}>Edit</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 2 }}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={handleChangePage}
//               shape="rounded"
//               sx={{ backgroundColor: 'red', color: 'black', borderRadius: '5px' }}
//             />
//           </Box>
//         </TableContainer>
//       </Box>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: '40%',
//           },
//         }}
//       >
//           <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} fetchBranches={fetchBranches} />
//       </Drawer>
//     </Box>
//     </Box>
//     </Box>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import TextField from '@mui/material/TextField';
// import Drawer from '@mui/material/Drawer';
// import AddBranch from './AddBranch';
// import axios from 'axios';
// import Dashboard from './Dashboard';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: 'whitesmoke',
//   '&:hover': {
//     backgroundColor: 'whitesmoke',
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '20ch',
//       '&:focus': {
//         width: '30ch',
//       },
//     },
//   },
// }));

// export default function Branch() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rows, setRows] = useState([]);
//   const [allRows, setAllRows] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [currentBranch, setCurrentBranch] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearchChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     filterRows(query);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/all');
//       setRows(response.data);
//       setAllRows(response.data);  // Save the original data
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const filterRows = (query) => {
//     if (!query) {
//       setRows(allRows);  // Reset to original data if search query is empty
//     } else {
//       const filteredRows = allRows.filter((row) =>
//         row.branchName.toLowerCase().includes(query.toLowerCase())
//       );
//       setRows(filteredRows);
//     }
//   };

//   const toggleDrawer = (open, branch = null) => () => {
//     setCurrentBranch(branch);
//     setDrawerOpen(open);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
//       <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
//         <Dashboard />
//         <Box sx={{ flexGrow: 1, width: 880 }}>
//           <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
//             <Toolbar>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#2f4f85' }}
//               >
//                 All Branches
//               </Typography>
//               <Search>
//                 <StyledInputBase
//                   placeholder="Search"
//                   inputProps={{ 'aria-label': 'search' }}
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//               </Search>
//             </Toolbar>
//           </AppBar>
//           <Box>
//             <Button
//               variant="contained"
//               startIcon={<AddCircleIcon />}
//               sx={{
//                 margin: 3,
//                 marginLeft: 0,
//                 backgroundColor: '#d32f2f',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#d32f2f',
//                 }
//               }}
//               onClick={toggleDrawer(true)}
//             >
//               Add Branch
//             </Button>
//           </Box>
//           <Box sx={{ float: 'right', marginTop: -5 }}>
//             <FormatListBulletedIcon />
//           </Box>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="caption table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Branch ID</TableCell>
//                   <TableCell align="right">Branch Name</TableCell>
//                   <TableCell align="right">Parent org</TableCell>
//                   <TableCell align="right">Status</TableCell>
//                   <TableCell align="right">Address</TableCell>
//                   <TableCell align="right">Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow key={row.branch_Id}>
//                     <TableCell component="th" scope="row">
//                       {row.branch_Id}
//                     </TableCell>
//                     <TableCell align="right">{row.name}</TableCell>
//                     <TableCell align="right">{row.parent_organization}</TableCell>
//                     <TableCell align="right">{row.status}</TableCell>
//                     <TableCell align="right">{row.address}</TableCell>
//                     <TableCell align="right">
//                       <Button
//                         variant="outlined"
//                         sx={{
//                           backgroundColor: '#1976d2',
//                           color: 'white',
//                           '&:hover': {
//                             backgroundColor: '#115293',
//                           }
//                         }}
//                         onClick={toggleDrawer(true, row)}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <caption>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       marginRight: 1,
//                       backgroundColor: 'whitesmoke',
//                       color: 'black',
//                       '&:hover': {
//                         backgroundColor: 'whitesmoke',
//                       }
//                     }}
//                   >
//                     Previous
//                   </Button>
//                   <Pagination
//                     count={1}
//                     shape="rounded"
//                     hidePrevButton
//                     hideNextButton
//                     sx={{
//                       backgroundColor: '#d32f2f',
//                       color: 'white',
//                       borderRadius: 1,
//                       '& .MuiPaginationItem-root': {
//                         color: 'white',
//                       }
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     sx={{
//                       marginLeft: 1,
//                       backgroundColor: 'whitesmoke',
//                       color: 'black',
//                       '&:hover': {
//                         backgroundColor: 'whitesmoke',
//                       }
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </caption>
//             </Table>
//           </TableContainer>
//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={toggleDrawer(false)}
//             PaperProps={{
//               sx: {
//                 width: '40%',
//               },
//             }}
//           >
//             <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} />
//           </Drawer>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import AddBranch from './AddBranch';
import axios from 'axios';
import Dashboard from './Dashboard';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'whitesmoke',
  '&:hover': {
    backgroundColor: 'whitesmoke',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function Branch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterRows(query);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9090/all');
      setRows(response.data);
      setAllRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterRows = (query) => {
    if (!query) {
      setRows(allRows);
    } else {
      const filteredRows = allRows.filter((row) =>
        row.name.toLowerCase().includes(query.toLowerCase()) ||
        row.parent_organization.toLowerCase().includes(query.toLowerCase())
      );
      setRows(filteredRows);
    }
  };

  const toggleDrawer = (open, branch = null) => () => {
    setCurrentBranch(branch);
    setDrawerOpen(open);
  };
  const getStatusColor = (status) => {
        if (status === null) return 'black'; // or any other default color
        return status.toLowerCase() === 'active' ? 'green' : 'red';
      };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
      <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
        <Dashboard />
        <Box sx={{ flexGrow: 1, width: 880 }}>
          <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#2f4f85' }}
              >
                All Branches
              </Typography>
              <Search>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                margin: 3,
                marginLeft: 0,
                backgroundColor: '#d32f2f',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                }
              }}
              onClick={toggleDrawer(true)}
            >
              Add Branch
            </Button>
          </Box>
          
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#000080' }} >Branch ID</TableCell>
                  <TableCell sx={{ color: '#000080' }} align="right">Branch Name</TableCell>
                  <TableCell sx={{ color: '#000080' }} align="right">Parent org</TableCell>
                  <TableCell sx={{ color: '#000080' }} align="right">Status</TableCell>
                  <TableCell sx={{ color: '#000080' }} align="right">Address</TableCell>
                  <TableCell sx={{ color: '#000080' }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.branch_Id}>
                    <TableCell component="th" scope="row">
                      {row.branch_Id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.parent_organization}</TableCell>
                    {/* <TableCell align="right">{row.status}</TableCell> */}
                    <TableCell align="right" style={{ color: getStatusColor(row.status) }}>
                      {row.status}
                    </TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">
                      
                      <Button onClick={toggleDrawer(true, row)}>Edit</Button>
                    
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <caption>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    sx={{
                      marginRight: 1,
                      backgroundColor: 'whitesmoke',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: 'whitesmoke',
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Pagination
                    count={1}
                    shape="rounded"
                    hidePrevButton
                    hideNextButton
                    sx={{
                      backgroundColor: '#d32f2f',
                      color: 'white',
                      borderRadius: 1,
                      '& .MuiPaginationItem-root': {
                        color: 'white',
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      backgroundColor: 'whitesmoke',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: 'whitesmoke',
                      }
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </caption>
            </Table>
          </TableContainer>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: '40%',
              },
            }}
          >
            <AddBranch branch={currentBranch} onClose={toggleDrawer(false)} />
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}

