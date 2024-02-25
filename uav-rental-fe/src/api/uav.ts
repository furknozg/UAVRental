import axios from 'axios';
import { api_host } from './loginregister';
// Function to create a UAV
export async function createUAV(token: string, brand: string, model: string, weight: number, category: string): Promise<void> {
    try {
        await axios.post(`http://${api_host}/api/uavs/create/`, {
            brand,
            model,
            weight,
            category
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('UAV created successfully');
    } catch (error) {
        console.error('Error creating UAV:', error);
    }
}

// Function to retrieve a UAV by ID
export async function retrieveUAV(token: string, id: number): Promise<JSON> {
    try {
        const response = await axios.get(`http://${api_host}/api/uavs/${id}/retrieve/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('UAV retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving UAV:', error);
        return null;
    }
}
// Function to list available UAVs
export async function listOwnedUAVs(token: string): Promise<JSON[]> {
    try {
        const response = await axios.get(`http://${api_host}/api/uavs/user/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('Available UAVs:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error listing UAVs:', error);
        return null;
    }
}


// Function to list available UAVs
export async function listUAVs(token: string): Promise<JSON[]> {
    try {
        const response = await axios.get(`http://${api_host}/api/uavs/list/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('Available UAVs:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error listing UAVs:', error);
        return null;
    }
}

// Function to update a UAV by ID
export async function updateUAV(token: string, id: number, brand: string, model: string, weight: number, category: string, is_available: boolean): Promise<void> {
    try {
        await axios.put(`http://${api_host}/api/uavs/${id}/update/`, {
            brand,
            model,
            weight,
            category,
            is_available
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('UAV updated successfully');
    } catch (error) {
        console.error('Error updating UAV:', error);
    }
}

// Function to delete a UAV by ID
export async function deleteUAV(token: string, id: number): Promise<void> {
    try {
        await axios.delete(`http://${api_host}/api/uavs/${id}/delete/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('UAV deleted successfully');
    } catch (error) {
        console.error('Error deleting UAV:', error);
    }
}
