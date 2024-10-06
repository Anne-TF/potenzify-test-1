import {useNavigate} from 'react-router-dom';

interface IProps {
    customClasses?: string;
    customOnClick?: () => void;
}

const BackButton = ({ customClasses, customOnClick }: IProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <button role="button" aria-label="back_button" onClick={customOnClick ?? handleBack} className={`${customClasses} text-white`}>
            <svg width="27" height="24" viewBox="0 0 27 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M12.7436 22.8435C12.0016 23.5855 10.7986 23.5855 10.0566 22.8435L0.556594 13.3435C-0.185401 12.6015 -0.185401 11.3985 0.556594 10.6565L10.0566 1.15652C10.7986 0.414525 12.0016 0.414525 12.7436 1.15652C13.4856 1.89852 13.4856 3.10153 12.7436 3.84353L6.48711 10.1L24.7001 10.1C25.7494 10.1 26.6001 10.9507 26.6001 12C26.6001 13.0494 25.7494 13.9 24.7001 13.9L6.48711 13.9L12.7436 20.1565C13.4856 20.8985 13.4856 22.1015 12.7436 22.8435Z"
                      fill="currentColor"/>
            </svg>
        </button>
    )
}

export default BackButton;