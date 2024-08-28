import axios from "axios";

// Generisk funktion för att göra GET-förfrågningar
export const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data
}