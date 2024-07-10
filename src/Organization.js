
import React, { useEffect, useState } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ToggleButton from '@mui/material/ToggleButton';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom'; 
import AnchorTemporaryDrawer from './TableForm';
import axios from 'axios';
import UpdateOrganization from './UpdateOrganization';
import Dashboard from './Dashboard';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${alpha(theme.palette.common.black, 0.15)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '25%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#04000c',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
    '&::placeholder': {
      color: '#0E3B64',
      fontWeight: 'bold',
      textAlign: 'left',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#0E3B64',
  padding: theme.spacing(0.5),
  whiteSpace: 'nowrap', 
  height: '45px',
  textAlign: 'center',
  width: '100%',
  fontSize: '0.9rem',

}));

const columns = [
  { id: 'organizationId', label: 'Org ID', minWidth: 5 },
  { id: 'name', label: 'Org Name', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const RedButton = styled(Button)({
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const OrganizationPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState('schema');

  const [showEditForm, setShowEditForm] = useState(false); // State to toggle edit form
  const [selectedOrganization, setSelectedOrganization] = useState(null); // State to store selected organization for editing

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    filterOrganizations();
  }, [searchQuery, allOrganizations]);

  const fetchOrganizations = () => {
    axios.get('http://localhost:9999/allorganizations')
      .then(response => {
        setAllOrganizations(response.data);
        setFilteredOrganizations(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const filterOrganizations = () => {
    if (searchQuery.trim() === '') {
      setFilteredOrganizations(allOrganizations);
      setError('');
    } else {
      const filtered = allOrganizations.filter(org => 
        org.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrganizations(filtered);
      setError(filtered.length === 0 ? 'Organization not available. Please create the organization.' : '');
    }
  };

  const handlePreviousButtonClick = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextButtonClick = () => {
    if ((page + 1) * rowsPerPage < filteredOrganizations.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewChange = (event, nextView) => {
    setView(nextView);
  };

  const getStatusColor = (status) => {
    const statusText = status ? 'Active' : 'Inactive';
    const color = status ? 'green' : 'red';
    return { text: statusText, color: color };
  };
  
  const handleEditClick = (organization) => {
    setSelectedOrganization(organization);
    setShowEditForm(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
       <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
         <Dashboard/>
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <AppBar position="static" sx={{ p: 1, backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#000080', fontWeight: 'bold' }}
          >
            All Organisation
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search', }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '35px' }}>
        <StyledButton variant="contained" startIcon={<AddCircleIcon />} sx={{ paddingBottom: '10px' }}>
          <AnchorTemporaryDrawer/>
        </StyledButton>
        <ToggleButtonGroup exclusive aria-label="view toggle">
          <ToggleButton value="schema" aria-label="schema view" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'darkgray' } }}>
            <FormatListBulletedIcon sx={{ color: 'white' }} />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <SchemaTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <div style={{ width: '100%', height: '60%' }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '35px' }}>
          <TableContainer sx={{ height: 280, width: 530 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 'bold', padding: '6px 16px' }}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrganizations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.organizationId}>
                    <StyledTableCell>{row.organizationId}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell style={{ color: getStatusColor(row.status).color }}>{getStatusColor(row.status).text}</StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => handleEditClick(row)} style={{textTransform:"capitalize"}}>Edit</Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
                {filteredOrganizations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" style={{ color: 'red' }}>{error}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <hr/>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <Button
              onClick={handlePreviousButtonClick}
              sx={{ color: '#0E3B64',  backgroundColor: 'whitesmoke', marginRight: '8px',textTransform:"capitalize"  }}
              className="CustomButton"
              disabled={page === 0}
            >
              previous
            </Button>
            <RedButton
              onClick={handleNextButtonClick}
              sx={{
                color: 'white',
                marginRight: '8px',
              }}
              className="CustomButton"
            >
              {page + 1}
            </RedButton>
            <Button
              onClick={handleNextButtonClick}
              sx={{ color: '#0E3B64', backgroundColor: 'whitesmoke', marginRight: '8px',textTransform:"capitalize" }}
              className="CustomButton"
              disabled={(page + 1) * rowsPerPage >= filteredOrganizations.length}
            >
              next
            </Button>
          </Box>
        </Paper>
      </div>
      {showEditForm && (
        <UpdateOrganization organization={selectedOrganization} closeDrawer={() => setShowEditForm(false)} />
      )}
    </Box>
    </Box>
    </Box>
  );
}
export default OrganizationPage;

































