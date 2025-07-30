import './Contact.css';
import { useEffect, useState } from 'react';
import type {PlanetDto} from "../../dto/PlanetDto.ts";
import type {PeopleDto} from "../../dto/PeopleDto.ts";

const Contact = () => {
    const [planets, setPlanets] = useState<PlanetDto[]>([]);
    const [characters, setCharacters] = useState<PeopleDto[]>([]);

    useEffect(() => {
        fetch('https://sw-info-api.herokuapp.com/v1/planets')
            .then(res => res.json())
            .then(data => setPlanets(data))
            .catch(error => {
                console.error('Failed to load planets', error)
            });
        fetch('https://sw-info-api.herokuapp.com/v1/peoples')
            .then(res => res.json())
            .then(data => setCharacters(data))
            .catch(error => {
                console.error('Failed to load planets', error)
            });
    }, []);
    // console.log(planets);
    return (
        <div className="container">
            <form>
                <label htmlFor="character">Character</label>
                <select id="character" name="character">
                    {characters.length > 0 ? (
                        characters.map((person) => (
                            <option key={person.id} value={person.name}>{person.name}</option>
                        ))
                    ) : (
                        <option disabled>Loading characters...</option>
                    )}
                </select>

                <label htmlFor="planet">Planet</label>
                <select id="planet" name="planet">
                    {planets.length > 0 ? (
                        planets.map((planet) => (
                            <option key={planet.id} value={planet.name}>
                                {planet.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Contact;
