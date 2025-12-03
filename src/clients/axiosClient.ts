import axios from "axios";

`
    ESTA URL NOS PERMITE OBTENER LOS RESULTADOS DEL INPUT
    PARA BUSCAR SOLAMENTE CIUDADES, SU LATITUD Y LONGITUD
    PARA LUEGO CREAR UNA PETICION CON LOS DATOS ESPECIFICOS
    DEL CLIMA DE CADA CIUDAD. :)
`
export const AxiosClient = axios.create ({
    baseURL: "https://geocoding-api.open-meteo.com/v1",
    timeout: 8000, // tiempo de espera
});