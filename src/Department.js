
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Drawer from '@mui/material/Drawer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import AddDepartment from './AddDepartment';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dashboard from './Dashboard';

const columns = [
  { id: 'departmentId', label: 'Department ID', minWidth: 170 },
  { id: 'name', label: 'Department Name', minWidth: 100 },
  { id: 'branchId', label: 'Parent Branch', minWidth: 170 },
  { id: 'organizationId', label: 'Parent Org', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${alpha(theme.palette.common.black, 0.25)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#04000c',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const GreyButton = styled(Button)({
  backgroundColor: 'grey',
  textTransform: 'none',
  color: '#0E3B64',
  '&:hover': {
    backgroundColor: 'white',
  },
});

const PageNumberBox = styled(Box)({
  backgroundColor: 'red',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
});

const Department = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9192/getAllDepartments');
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort data by createdAt in descending order
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handlePreviousButtonClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextButtonClick = () => {
    setPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredData.length / rowsPerPage) - 1));
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery && filteredData.length === 0) {
      setShowError(true);
      setSnackbarOpen(true);
      setSnackbarMessage('Department is not available.');
    } else {
      setShowError(false);
      setSnackbarOpen(false);
    }
  }, [searchQuery, filteredData]);

  const handleEditButtonClick = (department) => {
    setSelectedDepartment(department);
    setIsEditing(true);
    setDrawerOpen(true);
  };

  const handleAddButtonClick = () => {
    setSelectedDepartment(null);
    setIsEditing(false);
    setDrawerOpen(true);
  };

  const getStatusStyle = (status) => {
    return status === 'active' ? { color: 'green' } : { color: 'red' };
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    window.location.reload(); // Refresh the page when the snackbar closes
  };
return(
  <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
      <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
        <Dashboard />
        <Box sx={{ flex: 1, padding: '16px' }}>
    <Box sx={{ backgroundColor: '#faf9f5', backgroundSize: 'hover', height: '100vh', width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" sx={{ backgroundColor: 'white', width: '100%', marginLeft: '0', marginTop: '30px' }}>
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                  >
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'black' }}
                  >
                    All Departments
                  </Typography>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      sx={{paddingRight:'20px'}}
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Search>
                </Toolbar>
              </AppBar>
            </Box>
            <Box sx={{ paddingTop: '30px', marginLeft: '1%', width: '95%' }}>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Button
                  variant="contained"
                  color='error'
                  onClick={handleAddButtonClick}
                  startIcon={
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      color: 'red'
                    }}>
                      <AddIcon fontSize="small" />
                    </div>
                  }
                  style={{ textTransform: 'none' }}
                >
                  Add Department
                </Button>
                <ToggleButtonGroup exclusive aria-label="view toggle" sx={{ paddingLeft: '70%' }}>
                  <ToggleButton value="schema" aria-label="schema view" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'darkgray' } }}>
                    <FormatListBulletedIcon sx={{ color: 'white' }} />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view">
                    <SchemaTwoToneIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Box>
            <Box sx={{ paddingTop: '60px', marginLeft: "1%" }}>
              <Paper sx={{ width: '90%', overflow: 'hidden' }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontWeight: 'bold',
                              color: '#0E3B64', // Blue text color for table head row names
                              height: '40px', // Adjust the height of the TableCell to reduce row size
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.departmentId}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={column.id === 'status' ? getStatusStyle(value) : {}}
                              >
                                {column.id === 'actions' ? (
                                  <>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleEditButtonClick(row);
                                      }}
                                      style={{ textDecoration: 'none', color: 'black', paddingRight: '20px' }}
                                    >
                                      Edit
                                    </a>
                                  </>
                                ) : (
                                  column.format && typeof value === 'number' ? column.format(value) : value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="end" alignItems="center" spacing={2} sx={{ marginTop: '16px' }}>
                  <GreyButton variant="contained" onClick={handlePreviousButtonClick} disabled={page === 0}>
                    Previous
                  </GreyButton>
                  <PageNumberBox>
                    <Typography variant="body1" sx={{ margin: '0 16px' }}>
                      {page + 1}
                    </Typography>
                  </PageNumberBox>
                  <GreyButton variant="contained" onClick={handleNextButtonClick} disabled={(page + 1) * rowsPerPage >= filteredData.length}>
                    Next
                  </GreyButton>
                </Stack>
              </Paper>
            </Box>
          </Box>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 500, p: 2 }}>
              <AddDepartment
                department={selectedDepartment}
                onClose={() => setDrawerOpen(false)}
                isEditing={isEditing}
              />
            </Box>
          </Drawer>
          <Box/>
          <Box/>
          <Box/>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000} // Display the error message for 3 seconds
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert
              elevation={1}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="error"
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};


export default Department;
