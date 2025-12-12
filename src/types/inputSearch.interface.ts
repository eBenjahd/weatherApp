import type CitySearch from "../types/citySearch.interface"

export interface InputSearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (city: CitySearch) => void;
    options: CitySearch[];
    placeholder?: string;
    isLoading: boolean;
    isSuccess: boolean;
}