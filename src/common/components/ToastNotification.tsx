import {useContext, useEffect, useState} from 'react';
import {NotificationContext} from '@context/NotificationContext.tsx';

interface IProps {
    message: string;
    type?: 'error' | 'success' | 'warning';
}

const ToastNotification = ({ message, type = 'success' }: IProps) => {
    const [show, setShow] = useState(false);
    const { isVisible, toggleVisibility } = useContext(NotificationContext);

    const handleFadeOutMessage = () => {
        toggleVisibility();
    };

    const getColor = () => {
        switch (type) {
            case 'error':
                return 'bg-app-danger text-white';
            case 'success':
                return 'bg-app-success text-app-secondary';
            default:
                return 'bg-app-warning text-app-secondary';
        }
    }

    useEffect(() => {
        let fadeOutTimer: NodeJS.Timeout;
        let removeMessageTimer: NodeJS.Timeout;

        if (isVisible) {
            setShow(true);
            fadeOutTimer = setTimeout(() => setShow(false), 3500);
            removeMessageTimer = setTimeout(handleFadeOutMessage, 4000);
        }

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(removeMessageTimer);
        };
    }, [isVisible]);

    return (
        <div
            role="status"
            className={`fixed bottom-0 left-1/2 z-[100] w-full md:w-auto -translate-x-1/2 items-center justify-center rounded-t md:rounded ${getColor()} px-8 md:px-14 py-5 md:py-3 shadow-lg transition-transform duration-500 text-center ease-in-out ${
                show
                    ? 'translate-y-0 md:translate-y-[-60px] opacity-100'
                    : 'translate-y-full opacity-100'
            }`}
        >
            <span className="text-nunito font-bold whitespace-pre-wrap text-center">{message}</span>
        </div>
    );
}

export default ToastNotification;