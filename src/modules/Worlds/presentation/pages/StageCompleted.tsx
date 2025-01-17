import {BackButton, Button} from '@common/components';
import Kika from '@assets/images/kika.svg';
import KikasBubble from '@assets/images/kikas-bubble.svg';
import {useNavigate, useParams} from 'react-router-dom';

export function StageCompleted()
{
    const {universeId} = useParams<{universeId: string}>();
    const navigate = useNavigate();
    return (
        <section className="px-6 py-8 text-app-secondary flex flex-col h-[100vh] justify-between lg:justify-start">
            <div className="flex flex-col w-full sm:w-8/12 md:w-[55vw] lg:w-[40vw] xl:w-[25vw] mx-auto">
                <BackButton customClasses="absolute top-6 left-6 !text-app-secondary  lg:top-12 lg:left-[33%]"/>
                <h1 className="mt-12 lg:mt-3 lg:text-3xl text-2xl lg:text-3xl text-center">
                    ¡Felicidades! <br/>
                    <span className="text-lg">Has completado el ejercicio</span>
                </h1>

                <div className="w-full rounded-full h-4 relative mt-3" style={{background: '#F5F5F5'}}>
                    <span className="w-full bg-app-primary h-full absolute rounded-full"/>
                </div>
            </div>

            <div className="relative w-full mt-0 lg:mt-[10%] sm:w-8/12 md:w-[55vw] lg:w-[40vw] xl:w-[25vw] mx-auto">
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
                    <span className="text-app-primary absolute top-10 left-8">
                        ¡Vas muy bien!
                    </span>
                </div>
               <Button
                   customOnClick={() => navigate(`/worlds/${universeId}`)}
                   customClassName="bg-app-primary text-white w-full py-3 rounded-lg text-nunito font-extrabold" text="Ir al próximo ejercicio" />
            </div>
        </section>
    );
}