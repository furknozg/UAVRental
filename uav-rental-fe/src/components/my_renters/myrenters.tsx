import React, { useEffect, useState } from 'react';
import Header from '../header';
import { deleteRental, listOwnerRentals, updateRental } from '../../api/rental';




import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function MyRenters() {

    const token: string | null = localStorage.getItem("token");
    const [ownerRentals, setOwnerRentals] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRentals, setFilteredRentals] = useState([]);




    useEffect(() => {
        fetchOwnerUAVs(token); // Fetch available UAVs when the component mounts
    }, []);

    const fetchOwnerUAVs = async (token: string) => {
        try {
            const response = await listOwnerRentals(token);
            console.log(response, "resp");
            setOwnerRentals(response); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };

    useEffect(() => {
        if (ownerRentals.length === 0) return;

        const filteredData = ownerRentals.filter(rental => {
            // Customize your filtering logic here based on the search term and uav properties
            return rental.uav_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.renter_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.end_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.start_date.toLowerCase().includes(searchTerm.toLowerCase())
            // Example: {"id":4,"uav":6,"renter_username":"furknozg","uav_name":"a","uav_owner":"john_do","start_date":"2024-02-02","end_date":"2024-02-29"}
            // uav.category.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredRentals(filteredData);
    }, [searchTerm, ownerRentals]);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div>
            <Header></Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '1rem' }}>My UAV Clients</h1>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    size="small"
                    style={{ marginRight: '1rem' }}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Renter</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRentals.map((uav) => (
                            <TableRow key={uav.id}>
                                <TableCell>{uav.uav_name}</TableCell>
                                <TableCell>{uav.renter_username}</TableCell>
                                <TableCell>{uav.start_date}</TableCell>
                                <TableCell>{uav.end_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    );

}
export default MyRenters;
