import { useState, createContext, type ReactNode } from "react";

interface Coords {
    latitud: number,
    longitud: number,
    city: string,
    country: string
}

interface CoordsContextType {
    coords: Coords | null;
    setCoords: (coords: Coords) => void;
}

export const CoordsContext = createContext<CoordsContextType | undefined>(undefined)

function CoordsProvider({children}: {children:ReactNode}) {

    const [coords, setCoords] = useState<Coords | null>(null)

    return (
        <CoordsContext.Provider value={{ coords, setCoords }}>
            {children}
        </CoordsContext.Provider>
    )
}

export default CoordsProvider

