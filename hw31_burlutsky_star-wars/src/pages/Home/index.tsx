import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SWContext } from '@shared/lib/SWContext';
import Hero from './Hero';
import Gallery from './Gallery';

const Home = () => {
    const { setMainHero } = useContext(SWContext);
    const { heroId } = useParams();

    useEffect(() => {
        setMainHero(heroId ?? 'luke');
    }, [heroId, setMainHero]);

    return (
        <div className="stack-4">
            <Hero />
            <Gallery />
        </div>
    );
};

export default Home;
