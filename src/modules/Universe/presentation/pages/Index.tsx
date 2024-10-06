import {useEffect, useState} from 'react';
import {IUniverse} from '@modules/Universe/infrastructure/interfaces';
import {ListUniversesUseCase} from '@modules/Universe/domain/useCases';
import {BouncingLabel, Spinner} from '@common/components';
import {useNavigate} from 'react-router-dom';

// ASSETS
import '../css/universe.scss';
import BlockedUniverseImg from '@app/assets/images/blocked-universe.svg';
import UnblockedUniverseImg from '@app/assets/images/unblocked-universe.svg';

interface IUniverseExtended extends IUniverse {
    showLabel: boolean;
}

export function UniversesPage ()
{
    const [loading, setLoading] = useState<boolean>(true);
    const [results, setResults] = useState<IUniverseExtended[]>([]);
    const navigate = useNavigate();

    const getUniverses = async () => {
        setLoading(true);
        setTimeout(async () => {
            const data = await ListUniversesUseCase.handler();
            setResults(data.map((e) => ({...e, showLabel: false})));
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        (async () => {
            await getUniverses();
        })();

        return () => {
            setResults([]);
        }
    }, []);


    return (
        <section className="universe-bg p-3">
            <h1 className="text-white w-full text-center text-nunito font-black text-3xl mt-10">Universos</h1>

            <div role="contentinfo" className="h-[85vh] flex items-center px-4 mx-auto md:h-auto md:mt-[5%] sm:w-8/12 md:w-[55vw] lg:w-[40vw] xl:w-[25vw]">
                <div role="grid" className="grid grid-cols-4 w-10/12 mx-auto mt-10">
                    {results.map((universe, index) =>
                    {
                        return (
                            <div key={universe.id}
                                 role="gridcell"
                                 onClick={() => {
                                   if (universe.isBlocked || universe.isComplete) return;
                                   setResults(results.map((e) => {
                                        if (e.id === universe.id) {
                                             return {...e, showLabel: true};
                                        }
                                        return e;
                                   }));
                                 }}
                                 aria-label={`Universe ${universe.name}`}
                                 className={`${index%2 === 0 ? 'col-start-1' : 'col-start-2 justify-end'} col-span-3 relative flex -mt-12`}>
                                {universe.showLabel && (
                                    <BouncingLabel
                                        onClick={() => {
                                            if (universe.isBlocked) return;
                                            navigate(`/worlds/${universe.id}`)
                                        }} />
                                )}
                                <img
                                    height="auto"
                                    width="auto"
                                    role="figure"
                                    aria-label={`Universe ${universe.name}`}
                                    aria-description={universe.isBlocked ? 'Small floating universe with a portal, is fully colored and seems unblocked' : 'Small floating universe with a portal in a grayscale, seems blocked'}
                                    alt={'image_for_'.concat(universe.name.replace(/ /g, '_'))}
                                    className="object-contain h-36"
                                    src={universe.isBlocked ? BlockedUniverseImg : UnblockedUniverseImg} />
                            </div>
                        )
                    })}

                    {loading && Array.from(Array(4)).map((_, index) => {
                        return (
                            <div key={index}
                                 role="gridcell"
                                 className={`${index%2 === 0 ? 'col-start-1' : 'col-start-2'} col-span-3 flex  items-center -mt-12 h-36`}>
                                <Spinner spinnerColor="#fff" loaderColor="#e5e5e5" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}