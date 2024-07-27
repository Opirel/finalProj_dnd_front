import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Session, SessionContextType } from './types';
import dotenv from 'react-dotenv';



export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessions = () => {
    const context = useContext(SessionContext);
    console.log("useSessions in action",context);
    if (!context) throw new Error('useSessions must be used within a SessionProvider');
    
    
    return context;
};

const backendUrl: string = import.meta.env.VITE_REACT_APP_SERVER_URL as string;

if (!backendUrl) {
    throw new Error("REACT_APP_SERVER_URL is not defined");
}

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sessions, setSessions] = useState<Session[]>([]);

    const getSessions = async () => {
        try {
            const response = await axios.get<Session[]>(backendUrl);
            setSessions(response.data);
            console.log("the sessions from get",sessions);
            
            // console.log("Sessions retrieved from allContext: ", response.data);
            
            
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
        }
    };

    const getSession = async (sessionID: string) => {
        try {
            const response = await axios.get<Session>(`${backendUrl}/${sessionID}`);
            setSessions(prev => [...prev.filter(s => s.sessionID !== sessionID), response.data]);
        } catch (error) {
            console.error('Failed to fetch session:', error);
        }
    };

    const createSession = async (data: Session) => {
        try {
            await axios.post(`${backendUrl}`, data);
            await getSessions();  // Refresh the list
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };

     const updateSession = async (sessionID: string, data: Session) => {
        try {
            await axios.put(`${backendUrl}/${sessionID}`, data);
            await getSessions();  // Refresh the list
        } catch (error) {
            console.error('Failed to update session:', error);
        }
    };

    const deleteSession = async (sessionID: string) => {
        try {
            await axios.delete(`${backendUrl}/${sessionID}`);
            setSessions(prev => prev.filter(s => s.sessionID !== sessionID));
        } catch (error) {
            console.error('Failed to delete session:', error);
        }
    };

    useEffect(() => {
        getSessions();
    }, []);

    return (
        <SessionContext.Provider value={{ sessions, getSessions, getSession, createSession, updateSession, deleteSession }}>
            {children}
        </SessionContext.Provider>
    );
};
