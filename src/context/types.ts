export type Message = {
    sender: 'bot' | 'user';
    time: string;  // ISO date-time string
    message: string;
};

export interface Session {
    sessionID: string;
    title: string;
    conversation:Message[]
    // Add other relevant fields
}

export interface SessionContextType {
    sessions: Session[];
    getSessions: () => Promise<void>;
    getSession: (sessionID: string) => Promise<void>;
    createSession: (data: Session) => Promise<void>;
    updateSession: (sessionID: string, data: Session) => Promise<void>;
    deleteSession: (sessionID: string) => Promise<void>;
}

