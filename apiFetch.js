var CIUDADES = {
    0: ["Bridgewatch", 10, "naranja"],
    1: ["Fort Sterling", 20, "negro"],
    2: ["Lymhurst", 25, "verde"],
    3: ["Martlock", 30, "azul"],
    4: ["Thetford", 35, "lila"]
};

/* 
void GET_Price(NAME_TAG)
NAME_TAG: tag del elemento que buscará en la API  
*/
function GET_API(TYPE, ARGS) {
    var GET_URL;

    switch (TYPE) {
        case PRICE:
            GET_URL = API_URL + 'Prices/' + ARGS + '.json';
            break;
        
        case HISTORY:
            GET_URL = API_URL + 'History/' + ARGS + '.json?date=2024-05-20&end_date=2024-05-31&time-scale=6';
            break;
        
        default:
            GET_URL = '';
            break;
    }

    return fetch(GET_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.status);
            }

            return (response.json());
        })

        .then(data => {
            return (data);
        })

        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
}