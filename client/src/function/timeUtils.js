// timeUtils.js
import axios from "axios";
import API_BASE_URL from "../apiConfig";

// export async function fetchServerTime() {
//     const response = await axios.get(`${API_BASE_URL}/auth/server-time`);
//     // console.log(`Server time: ${data}`)
//     return await response.data;
// }

export function fetchServerTimeSync() {
    return axios.get(`${API_BASE_URL}/auth/server-time`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching server time:", error);
            return null;
        });
}