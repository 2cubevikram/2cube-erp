import React, { createContext, useContext, useEffect, useState } from 'react';
import API_BASE_URL from "./apiConfig";
import axios from "axios";

const ServerTimeContext = createContext();

export function ServerTimeProvider({ children }) {
    const [serverTime, setServerTime] = useState(null);

    useEffect(() => {
        async function fetchServerTime() {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/server-time`);
                // console.log('Server time response:', response.data);
                setServerTime(response.data);
            } catch (error) {
                console.log('Error fetching server time:', error);
            }
        }
        fetchServerTime();
    }, []);

    return (
        <ServerTimeContext.Provider value={serverTime}>
            {children}
        </ServerTimeContext.Provider>
    );
}

export function useServerTimeContext() {
    return useContext(ServerTimeContext);
}
