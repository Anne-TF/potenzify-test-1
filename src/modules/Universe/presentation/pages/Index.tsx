import '../css/universe.scss';
import BlockedUniverseImg from '@app/assets/images/blocked-universe.svg';
import UnblockedUniverseImg from '@app/assets/images/unblocked-universe.svg';
import {useEffect, useState} from 'react';
import {IUniverse} from '@modules/Universe/infrastructure/interfaces';
import {ListUniversesUseCase} from '@modules/Universe/domain/useCases';
import {BouncingLabel} from '@common/components';
import {useNavigate} from 'react-router-dom';

export function UniversesPage ()
{
    const [loading, setLoading] = useState<boolean>(true);
    const [results, setResults] = useState<IUniverse[]>([]);
    const navigate = useNavigate();

    const getUniverses = async () => {
        setLoading(true);
        setTimeout(async () => {
            const data = await ListUniversesUseCase.handler();
            setResults(data);
        }, 0);
        setLoading(false);
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

            <div className="h-[85vh] flex items-center px-4">
                <div className="grid grid-cols-4 w-10/12 mx-auto mt-10">
                    {results.map((universe, index) =>
                    {
                        return (
                            <button key={universe.id}
                                 role="button"
                                 onClick={() => {
                                     if (universe.isBlocked) return;
                                     navigate(`/worlds/${universe.id}`)
                                 }}
                                 aria-label={`Universe ${universe.name}`}
                                 className={`${index%2 === 0 ? 'col-start-1' : 'col-start-2 justify-end'} col-span-3 relative flex -mt-12`}>
                                {(!universe.isBlocked && !universe.isComplete) && (
                                    <BouncingLabel />
                                )}
                                <img
                                    height="auto"
                                    width="auto"
                                    aria-label={`Universe ${universe.name}`}
                                    aria-description={universe.isBlocked ? 'Small floating universe with a portal, is fully colored and seems unblocked' : 'Small floating universe with a portal in a grayscale, seems blocked'}
                                    alt={'image_for_'.concat(universe.name.replace(/ /g, '_'))}
                                    className="object-contain h-36"
                                    src={universe.isBlocked ? BlockedUniverseImg : UnblockedUniverseImg} />
                            </button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}