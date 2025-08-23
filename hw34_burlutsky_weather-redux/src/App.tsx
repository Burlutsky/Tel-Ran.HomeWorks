import CityPicker from '@/features/city-picker/ui/CityPicker';
import CurrentWeatherCard from '@/widgets/current-weather/ui/CurrentWeatherCard';

export default function App() {
    return (
        <div className="app">
            <h1 style={{ margin: 0 }}>Weather Gadget</h1>
            <CityPicker />
            <CurrentWeatherCard />
        </div>
    );
}
