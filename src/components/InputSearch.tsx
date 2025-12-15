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
  const shouldShowList = value.length > 2 && (isLoading || isSuccess);

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
    <div>
      <input
        id="1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%" }}
      />

      <div className="svg"></div>

      {shouldShowList && (
        <ul
          ref={listRef}
        >
          {isLoading && (
            <li>Loading...</li>
          )}

          {isSuccess && options.length === 0 && !isLoading && (
            <li>No results found</li>
          )}

          {options.map((city, index) => (
            <li
              key={city.id}
              onClick={() => onSelect(city)}
              style={{
                background: index === activeIndex ? "#302F4A" : "transparent",
                border:`1px solid ${index === activeIndex ? "#3C3B5E" : "transparent"}`
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