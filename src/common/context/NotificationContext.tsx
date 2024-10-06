import {createContext, useState} from 'react';

export type NotificationContextType = {
    toggleVisibility: () => void;
    isVisible: boolean;
}

export const NotificationContext = createContext<NotificationContextType>({
    toggleVisibility: () => {},
    isVisible: false,
});

export const NotificationProvider = ({children}: {children: React.ReactNode}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <NotificationContext.Provider value={{toggleVisibility, isVisible}}>
            {children}
        </NotificationContext.Provider>
    );
}