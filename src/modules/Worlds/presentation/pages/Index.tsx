import {useEffect, useState} from 'react';
import {IWorld} from '@modules/Worlds/infrastructure/interfaces';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {ListWorldsByUniverseIdUseCase} from '@modules/Worlds/domain/useCases';
import {BackButton, BouncingLabel, Spinner} from '@common/components';

// ASSETS
import '../css/world.scss';
import Stage1 from '@assets/images/stage-1.svg';
import Stage2 from '@assets/images/stage-2.svg';
import Stage3 from '@assets/images/stage-3.svg';
import Stage4 from '@assets/images/stage-4.svg';
import ExtraStage1 from '@assets/images/extra-stage-1.svg';
import ExtraStage2 from '@assets/images/extra-stage-2.svg';
import ExtraStage3 from '@assets/images/extra-stage-3.svg';

export function WorldsPage ()
{
    const {universeId} = useParams<{universeId: string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<IWorld | null>(null);
    const navigate = useNavigate();

    const getWorlds = async () => {
        setLoading(true);
        setTimeout(async () => {
            const data = await ListWorldsByUniverseIdUseCase.handler(universeId as string);
            setResult(data.find((e) => !e.isBlocked && !e.isCompleted && e.isCurrent) ?? null);
            setLoading(false);
        }, 200);
    }

    const getImg = (img: string) => {
        switch (img) {
            case 'stage-1':
                return Stage1;
            case 'stage-2':
                return Stage2;
            case 'stage-3':
                return Stage3;
            case 'stage-4':
                return Stage4;
            default:
                return '';
        }
    }

    useEffect(() => {
        if (!universeId) return;
        (async () => {
            await getWorlds();
        })();

        return () => {
            setResult(null);
        }
    }, []);


    if(!universeId || (!loading && !result))
    {
        return <Navigate to="/" />
    }


    return (
        <section className="worlds-bg p-3">
            <BackButton customOnClick={() => navigate('/')} customClasses="absolute top-6 left-6 lg:left-1/4" />
            <h1 className="text-white w-full text-center text-nunito font-black text-3xl mt-10">Mundo {result?.id}</h1>
            <h3 className="text-white w-full text-center text-nunito font-black text-xl mt-1">Universo {universeId}</h3>

            {loading && (
                <div className="h-[60vh] flex items-center justify-center">
                    <Spinner spinnerColor="#fff" loaderColor="#e5e5e5" />
                </div>
            )}

            {!loading && (
                <div role="grid"
                     className="grid grid-cols-6 mx-auto w-10/12 space-y-4 relative mt-16 h-full md:h-auto md:mt-[5%] sm:w-8/12 md:w-[55vw] lg:w-[40vw] xl:w-[25vw]">
                    {result?.stages.map((stage, index) => {
                        return (
                            <>
                                <div key={stage.id.concat('-image')}
                                     role="gridcell"
                                     onClick={() => {
                                         if (stage.isBlocked || stage.isCompleted) return;
                                         setResult({
                                             ...result, stages: result.stages.map((e) => {
                                                 if (e.id === stage.id) {
                                                     return {...e, showLabel: true};
                                                 }
                                                 return e;
                                             })
                                         });
                                     }}
                                     className={` ${stage.position} col-span-2 relative`}>
                                    {stage.showLabel && (
                                        <BouncingLabel
                                            customColorClass="bg-app-tertiary"
                                            onClick={() => {
                                                if (stage.isBlocked) return;
                                                navigate(`/worlds/${universeId}/stage/${stage.id}`)
                                            }}
                                            customClasses="w-40 -left-8 -top-16"
                                        />
                                    )}
                                    <img
                                        height="auto"
                                        width="auto"
                                        role="figure"
                                        alt={'image_'.concat(stage.name.replace(/ /g, '_'))}
                                        className="object-contain w-[5.5rem]"
                                        src={getImg(stage.img)}/>
                                </div>
                                <div key={stage.id.concat('-filler')}
                                     className={`col-start-${parseInt(stage.start, 10) + 1} h-10 col-span-${stage.start === '1' ? '1' : (index + 1 === 3 ? '2' : (index + 1 === 4 ? '1' : '4'))}`}/>
                            </>
                        )
                    })}

                    <img
                        height="auto"
                        width="auto"
                        alt="pink_and_yellow_portal"
                        className="object-contain h-28 absolute top-[23%] left-1"
                        src={ExtraStage1}/>

                    <img
                        height="auto"
                        width="auto"
                        alt="blue_crystals_over_a_yellow_platform"
                        className="object-contain h-28 absolute top-[55%] right-3"
                        src={ExtraStage2}/>

                    <img
                        height="auto"
                        width="auto"
                        alt="blue_crystals_over_a_yellow_platform"
                        className="object-contain h-24 absolute bottom-2 -left-1"
                        src={ExtraStage3}/>
                </div>
            )}
        </section>
    )
}