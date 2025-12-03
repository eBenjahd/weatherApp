import axios from "axios";
`
    ESTA URL ES LA FUENTE DE INFORMACION DEL CLIMA
    EN LA CUAL SE LE PASAN PARAMETROS COMO LATITUD Y 
    LONGITUD PARA PODER ACCEDER A ESTOS VALORES.
`
export const WeatherClient = axios.create({

    baseURL: 'https://api.open-meteo.com/v1',
    timeout: 8000
})