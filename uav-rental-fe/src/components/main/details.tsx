import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface Props {
    open: boolean;
    handleClose: () => void;
    handleRent: (uavId: number, start_date: Date, end_date: Date) => void;
    uav: {
        id: number;
        brand: string;
        model: string;
        weight: number;
        category: string;
        // Add more detailed attributes here
    };
}

function DetailsPopup({ open, handleClose, handleRent, uav }: Props) {
    const [formData, setFormData] = useState({
        id: uav.id,
        start_date: null,
        end_date: null,


    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };


    const handleRentSubmit = () => {
        handleRent(uav.id, formData.start_date, formData.end_date);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" BackdropComponent={Backdrop}>
            <DialogTitle>UAV Details</DialogTitle>
            <DialogContent>
                <p><strong>Brand:</strong> {uav.brand}</p>
                <p><strong>Model:</strong> {uav.model}</p>
                <p><strong>Weight:</strong> {uav.weight}</p>
                <p><strong>Category:</strong> {uav.category}</p>

                <Typography variant="subtitle1">Start Date:</Typography>
                <TextField
                    margin="dense"
                    type="date"
                    fullWidth
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                />
                <Typography variant="subtitle1">End Date:</Typography>
                <TextField
                    margin="dense"

                    type="date"
                    fullWidth
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
                <Button onClick={handleRentSubmit}>Rent</Button>


            </DialogActions>
        </Dialog>
    );
}

export default DetailsPopup;