import '../css/world.scss';
import {useEffect, useState} from 'react';
import {IWorld} from '@modules/Worlds/infrastructure/interfaces';
import {Navigate, useParams} from 'react-router-dom';
import {ListWorldsByUniverseIdUseCase} from '@modules/Worlds/domain/useCases';
import {BackButton, BouncingLabel} from '@common/components';

// ASSETS
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
            <BackButton customClasses="absolute top-6 left-6" />
            <h1 className="text-white w-full text-center text-nunito font-black text-3xl mt-10">Mundo {result?.id}</h1>
            <h3 className="text-white w-full text-center text-nunito font-black text-xl mt-1">Universo {universeId}</h3>

            <div
                className="grid grid-cols-6 mx-auto w-10/12 justify-items-center space-y-3 justify-center relative mt-20 h-[75%]">
                {result?.stages.map((stage, index) => {
                    return (
                        <>
                            <div key={stage.id.concat('-image')}
                                 className={`col-start-${stage.start} ${stage.position} col-span-2 relative`}>
                                {(stage.isCurrent && !stage.isBlocked) && (
                                    <BouncingLabel
                                        customColorClass="bg-app-tertiary"
                                        customClasses="w-40 -left-8 -top-12"
                                    />
                                )}
                                <img
                                    height="auto"
                                    width="auto"
                                    alt={'image_'.concat(stage.name.replace(/ /g, '_'))}
                                    className="object-contain w-[5.5rem]"
                                    src={getImg(stage.img)}/>
                            </div>
                            <div key={stage.id.concat('-filler')}
                                 className={`col-start-${parseInt(stage.start, 10) + 1} bg-blue-400 w-auto col-span-${stage.start === '1' ? '1' : (index + 1 === 3 ? '2' : '4')}`}/>
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
        </section>
    )
}