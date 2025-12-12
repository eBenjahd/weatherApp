import { useState, useEffect, type KeyboardEvent, useRef } from "react";
import type { InputSearchProps } from "../types/inputSearch.interface"

const InputSearch: React.FC<InputSearchProps> = ({
  value,
  onChange,
  onSelect,
  options,
  placeholder,
  isLoading,
  isSuccess,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const shouldShowList = value.length > 2;

  useEffect(() => {
    setActiveIndex(0);
  }, [options]);

  useEffect(() => {
    if (!listRef.current) return;

    const listEl = listRef.current;
    const activeItem = listEl.children[activeIndex] as HTMLElement;

    if (activeItem) {
      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + activeItem.offsetHeight;

      if (itemTop < listEl.scrollTop) {
        listEl.scrollTop = itemTop;
      } else if (itemBottom > listEl.scrollTop + listEl.clientHeight) {
        listEl.scrollTop = itemBottom - listEl.clientHeight;
      }
    }
  }, [activeIndex]);

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
      onSelect(options[activeIndex]);
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

      {shouldShowList && (
        <ul
          ref={listRef}
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
          {isLoading && (
            <li style={{ padding: "8px", color: "#555" }}>Loading...</li>
          )}

          {isSuccess && options.length === 0 && !isLoading && (
            <li style={{ padding: "8px", color: "#555" }}>No results found</li>
          )}

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