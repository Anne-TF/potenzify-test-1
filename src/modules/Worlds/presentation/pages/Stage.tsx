import {useContext, useEffect, useRef, useState} from 'react';
import {BackButton, Button, ToastNotification} from '@common/components';
import {ListenButton} from '@modules/Worlds/presentation/components';

// CONTEXT
import {NotificationContext} from '@context/NotificationContext.tsx';

// ASSETS
import Kika from '@assets/images/kika.svg';
import KikasBubble from '@assets/images/kikas-bubble.svg';
import {useNavigate, useParams} from 'react-router-dom';

export function Stage()
{
    const {universeId} = useParams<{universeId: string}>();
    const { toggleVisibility } = useContext(NotificationContext);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const navigate = useNavigate();
    const listenBtnRef = useRef(null);

    const checkExercise = () =>
    {
        if (!listenBtnRef.current?.isValid())
        {
            setShowWarning(true);
            toggleVisibility();
            return;
        }
        navigate(`/worlds/${universeId}/stage-completed`);
    }

    useEffect(() => {
        if (showWarning)
        {
            setTimeout(() => {
                setShowWarning(false);
            }, 4000);
        }
    }, [showWarning]);

    return (
        <section className="px-6 py-8 text-app-secondary flex flex-col h-[100vh] justify-between">
            <div className="flex flex-col">
                <BackButton customClasses="absolute top-6 left-6 !text-app-secondary" />
                <h1 className="mt-12 text-2xl">Afirmaciones positivas</h1>

                <div className="w-full rounded-full h-4 relative mt-3" style={{ background: '#F5F5F5'  }}>
                    <span className="w-7/12 bg-app-primary h-full absolute rounded-full" />
                </div>

                <div className="mt-20 relative">
                    <img
                        src={Kika}
                        height="auto"
                        width="auto"
                        alt="kika_the_fox"
                        role="figure"
                        aria-description="a fox with purple eyes"
                        aria-label="kika_the_fox"
                        className="w-2/6 ml-8"
                    />
                    <div className="absolute top-3 left-[43%] w-6/12">
                        <img
                            src={KikasBubble}
                            height="auto"
                            width="auto"
                            alt="kikas_bubble"
                            role="figure"
                            aria-description="a purple bubble with a positive affirmation"
                            aria-label="kikas_bubble"
                        />
                        <span className="text-app-primary absolute top-10 left-8">Lee en voz alta</span>
                    </div>
                    <div className="bg-app-primary shadow-md shadow-app-primary rounded-2xl px-4 py-7 leading-none text-white text-2xl text-center">
                        Me siento bien cada vez que me miro al espejo
                    </div>
                </div>

                <ListenButton
                    customClassname="mt-20 mx-auto"
                    ref={listenBtnRef}
                    textToCompare="Me siento bien cada vez que me miro al espejo"
                />
            </div>

            <Button customClassName="border rounded-xl py-1.5 text-nunito font-extrabold text-base text-app-secondary border-app-secondary"
                    customOnClick={checkExercise}
                    typeButton="button" text="Siguiente" />

            {showWarning && <ToastNotification type="warning" message={'Debes leer la afirmación correctamente para poder continuar. Presiona el micrófono para iniciar.'} />}
        </section>
    )
}