import React, { useEffect, useState } from 'react';
import Header from '../header';
import { createUAV, deleteUAV, listOwnedUAVs, updateUAV } from '../../api/uav';
import CreateUAVDialog from './createUAV';
import DetailsPopup from './details';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MyUAVS = () => {
    const token: string | null = localStorage.getItem("token");
    const [myUAVs, setMyUAVs] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUAVs, setFilteredUAVs] = useState([]);


    const [selectedUAV, setSelectedUAV] = useState({
        id: null,
        brand: null,
        model: null,
        weight: null,
        category: null,
        is_available: null,
    });
    const [openPopup, setOpenPopup] = useState(false); // State to control the visibility of the popup

    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        if (myUAVs.length === 0) return;

        const filteredData = myUAVs.filter(uav => {
            // Customize your filtering logic here based on the search term and uav properties
            return uav.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                uav.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                uav.weight.toString().includes(searchTerm.toLowerCase()) ||
                uav.category.toLowerCase().includes(searchTerm.toLowerCase())

            // Example: {"id":6,"brand":"a","model":"b","weight":1.0,"category":"2","is_available":false}
            // uav.category.toLowerCase().includes(searchTerm.toLowerCase()); (if string)
        });
        setFilteredUAVs(filteredData);
    }, [searchTerm, myUAVs]);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleCreate = () => {
        setOpenCreate(true);
    };
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    // Function to handle opening the popup and setting the selected UAV
    const handleOpenPopup = (uav: any) => {
        setSelectedUAV(uav);
        setOpenPopup(true);
    };

    // Function to handle closing the popup
    const handleClosePopup = () => {

        setOpenPopup(false);
    };

    // Function to handle updating a UAV
    const handleUpdate = (uavId: number, formData: any) => {
        // Logic to handle updating the UAV with the specified ID (FIX the unpacking of formData inside the api)
        updateUAV(token, uavId, formData.brand, formData.model, formData.weight, formData.category, formData.is_available);

        console.log(`Update UAV with ID: ${uavId}`);
    };

    // Function to handle deleting a UAV
    const handleDelete = (uavId: number) => {
        // Logic to handle deleting the UAV with the specified ID
        console.log(`Delete UAV with ID: ${uavId}`);
        deleteUAV(token, uavId);
        setSelectedUAV({
            id: null,
            brand: null,
            model: null,
            weight: null,
            category: null,
            is_available: null, // this is right now open by default
        });
        handleClosePopup();

    };

    const handleCreateSubmit = (formData: any) => {
        // Handle form submission here
        console.log(formData);
        createUAV(token, formData.brand, formData.model, formData.weight, formData.category);
        handleCloseCreate();
    };


    useEffect(() => {
        fetchOwnedUAVs(token); // Fetch available UAVs when the component mounts
    }, []);

    const fetchOwnedUAVs = async (token: string) => {
        try {
            const response = await listOwnedUAVs(token);

            const data = await response
            setMyUAVs(data); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };



    return (
        <div>
            <Header></Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '1rem' }}>My UAVs</h1>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    size="small"
                    style={{ marginRight: '1rem' }}
                />
                <Button variant="contained" onClick={handleCreate} size="medium">Create UAV</Button>

            </div>

            <TableContainer component={Paper}>


                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {filteredUAVs.map((uav) => (
                            <TableRow key={uav.id}>
                                <TableCell>{uav.brand}</TableCell>
                                <TableCell>{uav.model}</TableCell>
                                <TableCell>{uav.weight}</TableCell>
                                <TableCell>{uav.category}</TableCell>
                                <TableCell>
                                    <Button variant="text" onClick={() => handleOpenPopup(uav)}>
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DetailsPopup open={openPopup} handleClose={handleClosePopup} uav={selectedUAV} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <CreateUAVDialog open={openCreate} handleClose={handleCloseCreate} handleSubmit={handleCreateSubmit} />

        </div>
    );
}

export default MyUAVS;