import { useVoiceToText } from 'react-speakup';
import React, {forwardRef, useContext, useImperativeHandle, useState} from 'react';
import {ToastNotification} from '@common/components';
import {NotificationContext} from '@context/NotificationContext.tsx';


interface IProps {
    customClassname?: string;
    textToCompare: string;
}

const ListenButton = forwardRef(({ customClassname, textToCompare }: IProps, ref) =>
{
    const { toggleVisibility } = useContext(NotificationContext);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);
    const { startListening, stopListening, transcript, reset } = useVoiceToText({ lang: 'es-ES', continuous: true });

    const toggleListening = (event: React.MouseEvent) => {
        event.stopPropagation()
        if (!isListening)
        {
            reset();
            setValidated(false);
            startListening();
        }
        else
        {
            stopListening();
            setValidated(true);
            toggleVisibility();
        }
        setIsListening(!isListening);
    }

    const getComparison = () => {
        return textToCompare.trim().localeCompare(transcript.trim(), 'es', {sensitivity: 'base'}) === 0;
    }

    useImperativeHandle(ref, () => {
        return {
            isValid: () => validated && getComparison()
        }
    });

    return (
        <>
            <button
                role="button"
                onClick={toggleListening}
                aria-label="listen_button"
                aria-description="a button to listen to the affirmation. press to start listening"
                className={`text-app-primary border-2 shadow shadow-black/20 ${
                    validated && (getComparison() ? 'border-8 border-app-success' : 'border-8 border-app-danger')
                } 'text-neutral-100' px-9 rounded-3xl py-6 ${customClassname}`}>

                {!isListening && (
                    <svg width="44" height="66" viewBox="0 0 44 66"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M14.2218 3.22183C16.2847 1.15892 19.0826 0 22 0C24.9174 0 27.7153 1.15892 29.7782 3.22183C31.8411 5.28473 33 8.08262 33 11V33C33 35.9174 31.8411 38.7153 29.7782 40.7782C27.7153 42.8411 24.9174 44 22 44C19.0826 44 16.2847 42.8411 14.2218 40.7782C12.1589 38.7153 11 35.9174 11 33V11C11 8.08262 12.1589 5.28473 14.2218 3.22183ZM22 5.5C20.5413 5.5 19.1424 6.07946 18.1109 7.11091C17.0795 8.14236 16.5 9.54131 16.5 11V33C16.5 34.4587 17.0795 35.8576 18.1109 36.8891C19.1424 37.9205 20.5413 38.5 22 38.5C23.4587 38.5 24.8576 37.9205 25.8891 36.8891C26.9205 35.8576 27.5 34.4587 27.5 33V11C27.5 9.54131 26.9205 8.14236 25.8891 7.11091C24.8576 6.07946 23.4587 5.5 22 5.5ZM2.75 24.75C4.26878 24.75 5.5 25.9812 5.5 27.5V33C5.5 37.3761 7.23839 41.5729 10.3327 44.6673C13.4271 47.7616 17.6239 49.5 22 49.5C26.3761 49.5 30.5729 47.7616 33.6673 44.6673C36.7616 41.5729 38.5 37.3761 38.5 33V27.5C38.5 25.9812 39.7312 24.75 41.25 24.75C42.7688 24.75 44 25.9812 44 27.5V33C44 38.8348 41.6821 44.4305 37.5563 48.5564C34.0841 52.0286 29.5708 54.2203 24.75 54.8275V60.5H33C34.5188 60.5 35.75 61.7312 35.75 63.25C35.75 64.7688 34.5188 66 33 66H11C9.48122 66 8.25 64.7688 8.25 63.25C8.25 61.7312 9.48122 60.5 11 60.5H19.25V54.8275C14.4292 54.2203 9.91588 52.0286 6.44365 48.5564C2.31785 44.4305 1.63913e-07 38.8348 0 33V27.5C0 25.9812 1.23122 24.75 2.75 24.75Z"
                              fill="currentColor"/>
                    </svg>
                )}
                {isListening && (
                    <svg className={isListening ? 'animate-pulse' : ''} width="50" height="60" viewBox="0 0 256 256"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M216 48V208C216 212.243 214.314 216.313 211.314 219.314C208.313 222.314 204.243 224 200 224H160C155.757 224 151.687 222.314 148.686 219.314C145.686 216.313 144 212.243 144 208V48C144 43.7565 145.686 39.6869 148.686 36.6863C151.687 33.6857 155.757 32 160 32H200C204.243 32 208.313 33.6857 211.314 36.6863C214.314 39.6869 216 43.7565 216 48ZM96 32H56C51.7565 32 47.6869 33.6857 44.6863 36.6863C41.6857 39.6869 40 43.7565 40 48V208C40 212.243 41.6857 216.313 44.6863 219.314C47.6869 222.314 51.7565 224 56 224H96C100.243 224 104.313 222.314 107.314 219.314C110.314 216.313 112 212.243 112 208V48C112 43.7565 110.314 39.6869 107.314 36.6863C104.313 33.6857 100.243 32 96 32Z"
                            fill="currentColor"/>
                    </svg>
                )}
            </button>

            <ToastNotification
                message={validated ? (getComparison() ? '¡Bien hecho! \n La afirmación es correcta' : '¡Ups! \n La afirmación no es correcta. Intentalo nuevamente.') : ''}
                type={validated ? (getComparison() ? 'success' : 'error') : 'success'} />
        </>
    )
})

ListenButton.displayName = 'ListenButton';
export default ListenButton;