import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Props {
    open: boolean;
    handleClose: () => void;
    handleUpdate: (id: number, formData: Object) => void;
    handleDelete: (id: number) => void;

    uav: {
        id: number;
        brand: string;
        model: string;
        weight: number;
        category: string;
        is_available: boolean;
        // Add more detailed attributes here
    };
}

function DetailsPopup({ open, uav, handleClose, handleDelete, handleUpdate }: Props) {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        weight: 0,
        category: '',
        is_available: false
    });

    useEffect(() => {
        if (uav) {
            // If uav is provided, update the formData state with its values
            setFormData({
                brand: uav.brand,
                model: uav.model,
                weight: uav.weight,
                category: uav.category,
                is_available: uav.is_available
            });
        }
    }, [uav]);

    const handleFormSubmit = () => {
        handleUpdate(uav.id, formData);
        handleClose();
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleToggleChange = () => {
        setFormData({ ...formData, is_available: !formData.is_available }); // Toggle is_available value
    };


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" BackdropComponent={Backdrop}>
            <DialogTitle>UAV Details</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Brand"
                    type="text"
                    fullWidth
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Model"
                    type="text"
                    fullWidth
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Weight"
                    type="number"
                    fullWidth
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Category"
                    type="text"
                    fullWidth
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Open to Rent"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleToggleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>

                <Button onClick={handleFormSubmit} variant="contained" color="primary">
                    Update
                </Button>
                <Button onClick={() => handleDelete(uav.id)} variant="contained" color="error">
                    Delete
                </Button>


            </DialogActions>
        </Dialog>
    );
}

export default DetailsPopup;