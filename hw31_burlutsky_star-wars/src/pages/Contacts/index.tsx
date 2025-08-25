import {type FormEvent, useState } from 'react';

const planets = ['Tatooine', 'Alderaan', 'Hoth', 'Naboo', 'Coruscant'];

const Contacts = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [planet, setPlanet] = useState(planets[0]);
    const [subject, setSubject] = useState('');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log({ fname, lname, planet, subject });
        alert('Submitted (см. консоль).');
    };

    return (
        <main style={{ padding: 24 }}>
            <h2>Contacts</h2>
            <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
                <label htmlFor="fname">First Name</label>
                <input id="fname" value={fname} onChange={(e) => setFname(e.target.value)} />

                <label htmlFor="lname">Last Name</label>
                <input id="lname" value={lname} onChange={(e) => setLname(e.target.value)} />

                <label htmlFor="planets">Planet</label>
                <select id="planets" value={planet} onChange={(e) => setPlanet(e.target.value)}>
                    {planets.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />

                <button type="submit" style={{ marginTop: 8 }}>Send</button>
            </form>
        </main>
    );
};

export default Contacts;
