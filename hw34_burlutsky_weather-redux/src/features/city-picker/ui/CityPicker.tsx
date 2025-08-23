import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity } from '@/entities/location/model/slice';
import type { RootState } from '@/app/providers/store';
import { addRecentCity } from '@/features/recent-cities/model/slice';
import { selectRecentCities } from '@/features/recent-cities/model/selectors';

export default function CityPicker() {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.location.selectedCity);
  const history = useSelector(selectRecentCities);

  const [value, setValue] = React.useState<string>(selected.name);
  const lastCommittedRef = React.useRef<string>(selected.name);
  const clearedOnFocusRef = React.useRef<boolean>(false);

  const chooseCity = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(selectCity({ id: trimmed.toLowerCase(), name: trimmed, country: '', lat: 0, lon: 0 }));
    dispatch(addRecentCity(trimmed));
    lastCommittedRef.current = trimmed;
    setValue(trimmed);
  };

  const maybeCommitFromHistory = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const hit = history.find(
      (c) => c.localeCompare(trimmed, undefined, { sensitivity: 'accent' }) === 0
    );
    if (hit) chooseCity(hit);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    chooseCity(value);
  };

  return (
    <div className="card" style={{ display: 'grid', gap: 8 }}>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label htmlFor="city-input" style={{ whiteSpace: 'nowrap' }}>
          City:
        </label>
        <input
          id="city-input"
          list="city-suggestions"
          placeholder="Type a city and press Enter"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            setValue(next);
            maybeCommitFromHistory(next); // обработка выбора из datalist кликом
          }}
          onFocus={() => {
            // показать весь список подсказок
            clearedOnFocusRef.current = true;
            setValue('');
          }}
          onBlur={() => {
            // если ничего не выбрано — вернуть исходный город
            if (clearedOnFocusRef.current && value.trim() === '') {
              setValue(lastCommittedRef.current);
            }
            clearedOnFocusRef.current = false;
          }}
          autoComplete="off"
          style={{
            flex: 1,
            background: '#0f1320',
            color: '#e8eaed',
            border: '1px solid #232a36',
            borderRadius: 8,
            padding: '6px 10px',
          }}
        />
        <datalist id="city-suggestions">
          {history.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <button type="submit" style={{ padding: '6px 12px' }}>Apply</button>
      </form>
    </div>
  );
}
