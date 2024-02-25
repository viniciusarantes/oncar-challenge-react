export interface AlertMessage {
    status: string;
    message: string;
}

export type AlertContextType = {
    message: AlertMessage;
    createMessage: (message: AlertMessage) => void;
};