import axios from "axios";
import { api_host } from "./loginregister";
// Function to create a rental
export async function createRental(token: string, uavId: number, startDate: string, endDate: string): Promise<void> {
    try {
        await axios.post(`http://${api_host}/api/rentals/`, {
            uav: uavId,
            start_date: startDate,
            end_date: endDate
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Rental created successfully');
    } catch (error) {
        console.error('Error creating rental:', error);
    }
}

// Function to retrieve a rental by ID
export async function retrieveRental(token: string, id: number): Promise<JSON> {
    try {
        const response = await axios.get(`http://${api_host}/api/rentals/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('Rental retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving rental:', error);
        return null;
    }
}

// Function to update a rental by ID
export async function updateRental(token: string, id: number, startDate: string, endDate: string): Promise<void> {
    try {
        await axios.put(`http://${api_host}/api/rentals/${id}/`, {
            uav: id,
            start_date: startDate,
            end_date: endDate
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Rental updated successfully');
    } catch (error) {
        console.error('Error updating rental:', error);
    }
}

// Function to delete a rental by ID
export async function deleteRental(token: string, id: number): Promise<void> {
    try {
        await axios.delete(`http://${api_host}/api/rentals/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('Rental deleted successfully');
    } catch (error) {
        console.error('Error deleting rental:', error);
    }
}

// Function to list rentals associated with the authenticated user
export async function listUserRentals(token: string): Promise<JSON[]> {
    try {
        const response = await axios.get(`http://${api_host}/api/rentals/user/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('User rentals:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error listing user rentals:', error);
        return null;
    }
}

// Function to list rentals associated with the owner of the UAV
export async function listOwnerRentals(token: string): Promise<JSON> {
    try {
        const response = await axios.get(`http://${api_host}/api/rentals/owner/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('Owner rentals:', response.data);
        return response.data
    } catch (error) {
        console.error('Error listing owner rentals:', error);
        return null;
    }
}