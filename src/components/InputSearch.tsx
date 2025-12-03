import { useState, useEffect, type KeyboardEvent } from "react";

interface City {
  id: string | number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface InputSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (city: City) => void;
  options: City[];
  placeholder?: string;
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange, onSelect, options, placeholder }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Reset activeIndex si cambian las opciones
    setActiveIndex(0);
  }, [options]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!options || options.length === 0) return;

    const lastIndex = options.length - 1;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev === lastIndex ? 0 : prev + 1));
      e.preventDefault();
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev === 0 ? lastIndex : prev - 1));
      e.preventDefault();
    }

    if (e.key === "Enter") {
      const selectedCity = options[activeIndex];
      onSelect(selectedCity);
      e.preventDefault();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%" }}
      />
      {options.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            margin: 0,
            padding: 0,
            listStyle: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          {options.map((city, index) => (
            <li
              key={city.id}
              onClick={() => onSelect(city)}
              style={{
                padding: "8px",
                background: index === activeIndex ? "#ddd" : "transparent",
                cursor: "pointer",
              }}
            >
              {city.name} - {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSearch;