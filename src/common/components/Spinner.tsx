import {RiLoader5Line} from '@remixicon/react';

interface Props {
    loaderColor?: string;
    spinnerColor?: string;
}
const Spinner = ({
    loaderColor = '#FFF',
    spinnerColor = '#FFF',
 }: Props) => {
    return (
        <div id="loader" role="status" className="relative w-4 py-3 mx-auto flex items-center justify-center">
                    <span
                        style={{
                            border: `3px solid ${loaderColor}`,
                        }}
                        className="h-6 w-4 px-2.5 rounded-full absolute top-0"
                    />
            <RiLoader5Line size={32} className="animate-spin absolute" color={spinnerColor}/>
        </div>
    )
}

export default Spinner;