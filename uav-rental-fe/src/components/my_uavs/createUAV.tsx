import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Switch } from '@mui/material';

interface Props {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (uav: Object) => void
}

const CreateUAVDialog = ({ open, handleClose, handleSubmit }: Props) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        weight: '',
        category: '',
        is_available: true,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
        setFormData({
            brand: '',
            model: '',
            weight: '',
            category: '',
            is_available: true,
        });
    };
    const handleToggleChange = () => {
        setFormData({ ...formData, is_available: !formData.is_available }); // Toggle is_available value
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New UAV</DialogTitle>
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

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFormSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateUAVDialog;