import {useSelector} from 'react-redux';
import type {RootState} from '@/app/providers/store';
import {useGetCurrentByCityQuery} from '@/shared/api/weatherApi';

export default function CurrentWeatherCard() {
    const city = useSelector((s: RootState) => s.location.selectedCity);
    const {data, isLoading, isError, refetch} = useGetCurrentByCityQuery(city.name);

    if (isLoading) return <div className="card card--loading">Loading current weather…</div>;
    if (isError || !data) {
        return (
            <div className="card card--error">
                <div className="card__title">Oops</div>
                <div className="muted">Failed to load weather data.</div>
                <button className="btn" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

    return (
        <div className="card weather">
            <div className="weather__header">
                <div className="weather__place">
                    <div className="card__title">{city.name}{city.country ? `, ${city.country}` : ''}</div>
                    <div className="muted">As of {new Date(data.timeISO).toLocaleTimeString()}</div>
                </div>
                <img className="weather__icon" src={iconUrl} alt={data.description} width={96} height={96}/>
            </div>

            <div className="weather__main">
                <div className="weather__temp">
                    {Math.round(data.temperature)}
                    <span className="weather__deg">°C</span>
                </div>
                <div className="weather__desc">
                    <span className="badge">{data.main || 'Weather'}</span>
                    <span className="badge badge--ghost">{data.description}</span>
                </div>
            </div>

            <div className="weather__meta">
                <div className="kv">
                    <span className="kv__k">Wind</span>
                    <span className="kv__v">{data.windSpeed} m/s</span>
                </div>
                {/* Здесь легко добавить Humidity/Pressure, если включишь их в transformResponse */}
            </div>
        </div>
    );
}
