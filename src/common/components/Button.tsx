import React from 'react';
import Spinner from './Spinner.tsx';

interface Props {
    text?: string;
    textClassName?: string;
    customClassName: string;
    customOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    typeButton?: 'button' | 'submit' | 'reset' | undefined;
    isDisabled?: boolean | undefined;
    isLoading?: boolean;
    loaderColor?: string;
    spinnerColor?: string;
}

const Button = ({
    text,
    textClassName,
    customClassName,
    customOnClick,
    typeButton = 'button',
    isDisabled,
    isLoading = false,
    loaderColor = '#FFF',
    spinnerColor = '#fff',
}: Props) => {
    return (
        <button
            type={typeButton}
            className={`${customClassName} ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''} `}
            onClick={customOnClick}
            role="button"
            disabled={isDisabled}
        >
            {isLoading ? (
               <Spinner loaderColor={loaderColor} spinnerColor={spinnerColor} />
            ) : (
                <span className={`truncate ${textClassName}`}>{text}</span>
            )}
        </button>
    );
};

export default Button;