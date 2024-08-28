import axios, { AxiosError } from "axios";

// Generisk funktion för att hämta data från en URL
export const fetchData = async <T>(url: string): Promise<T> => {
    try {
        const response = await axios.get<T>(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`Error fetching data from ${url}:`, axiosError.message);
        throw axiosError; 
    }
};