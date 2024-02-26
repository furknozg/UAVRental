import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { retrieveUAV } from '../../api/uav';

interface Props {
    rental: {
        id: number,
        uav: number,
        uav_name: string,
        uav_owner: string,
        start_date: string,
        end_date: string,

    };
    open: boolean;
    handleClose: () => void;
    onDelete: (id: number) => void; // Function to handle delete action
    onUpdate: (id: number, startDate: string, endDate: string) => void;
}

function RentalDetailsPopup({ rental, open, handleClose, onDelete, onUpdate }: Props) {
    const token: string | null = localStorage.getItem("token");
    const [uavDetails, setUAVDetails] = useState<any>(null); // State to store UAV details

    console.log(rental.start_date);
    const [startDate, setStartDate] = useState(rental.start_date);
    const [endDate, setEndDate] = useState(rental.end_date);

    const handleUpdate = () => {
        onUpdate(rental.id, startDate, endDate); // Call onUpdate function with rental ID and new start/end dates
        handleClose(); // Close the popup after update
    };

    const handleDelete = () => {
        onDelete(rental.id); // Call onDelete function with rental ID
        handleClose(); // Close the popup after deletion
    };

    useEffect(() => {
        if (open && rental.uav) {
            // Fetch UAV details when the popup is opened and rental has a UAV ID
            fetchUAVDetails(rental.uav);
            setStartDate(rental.start_date);
            setEndDate(rental.end_date);

        }
    }, [open, rental.uav]);

    const fetchUAVDetails = async (uavId: number) => {
        try {
            const response = await retrieveUAV(token, uavId);
            setUAVDetails(response); // Store the fetched UAV details in state
        } catch (error) {
            console.error('Error fetching UAV details:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DialogTitle>Rental Details</DialogTitle>
                <IconButton onClick={handleClose} edge="end" style={{ position: 'absolute', right: '16px', top: '12px' }}>

                    <CloseIcon />
                </IconButton>

            </div>

            <DialogContent>
                <Typography variant="subtitle1">ID: {rental.uav}</Typography>
                <Typography variant="subtitle1">UAV Name: {rental.uav_name}</Typography>
                <Typography variant="subtitle1">UAV Owner: {rental.uav_owner}</Typography>

                {uavDetails && (
                    <>
                        <Typography variant="subtitle1">Model: {uavDetails.model}</Typography>
                        <Typography variant="subtitle1">Weight: {uavDetails.weight}</Typography>
                        <Typography variant="subtitle1">Category: {uavDetails.category}</Typography>
                    </>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">Start Date:</Typography>
                        <TextField
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">End Date:</Typography>
                        <TextField
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleUpdate}>Update Rental</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RentalDetailsPopup;