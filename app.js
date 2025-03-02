/**
 * 
    Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
    https://boolean-spec-frontend.vercel.app/freetestapi
    al posto di:
    https://freetestapi.com/api/v1

    Ad esempio:
    https://boolean-spec-frontend.vercel.app/freetestapi/users
    per chiamare l'endpoint /users
 */
/**
 * In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
    - Nome completo della città e paese da  /destinations?search=[query]
        (result.name, result.country, nelle nuove proprietà city e country).
    - Il meteo attuale da /weathers?search={query}
        (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
    - Il nome dell’aeroporto principale da /airports?search={query}
        (result.name nella nuova proprietà airport).
    
    Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
    
    Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
    
    Note del docente
    
    Scrivi la funzione getDashboardData(query), che deve:
    - Essere asincrona (async).
    - Utilizzare Promise.all() per eseguire più richieste in parallelo.
    - Restituire una Promise che risolve un oggetto contenente i dati aggregati.
    - Stampare i dati in console in un messaggio ben formattato.
    - Testa la funzione con la query "london"

    🎯 Bonus 1 - Risultato vuoto
    Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).

    🎯 Bonus 2 - Chiamate fallite
    Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

    Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
    Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
    Stampa in console un messaggio di errore per ogni richiesta fallita.
    Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).
 */

const fetchURL = async (url) => {
    try {
        const result = await fetch(url);
        const obj = await result.json();
        return obj
    } catch (err) {
        console.error(`Error to url: ${url}`)
    }
}


const getDashboardData = async (endpoint, query) => {

    let result;
    try {
        result = await fetchURL(`https://boolean-spec-frontend.vercel.app/freetestapi/${endpoint}?search=${query}`)
        result = result[0]

    } catch (err) {
        // console.error(err)
        throw new Error(`Error to url with params ${endpoint}`)
    }


    return result
}

(async () => {
    try {

        const destination = getDashboardData('destinations', 'vienna');
        const weather = getDashboardData('weathers', 'vienna');
        const airport = getDashboardData('airports', 'vienna');

        const data = await Promise.all([destination, weather, airport])

        console.log(
            `${data[0] !== null ? `${data[0] && data[0].name && data[0].country ? `${data[0].name} is in ${data[0].country}.\n` : ''}` : null}` +
            `${data[1] !== null ? `${data[1] && data[1].temperature && data[1].weather_description ? `Today there are ${data[1].temperature} degrees and the weather is ${data[1].weather_description}.\n` : ''}` : null}` +
            `${data[2] !== null ? `${data[2] && data[2].name ? `The main airport is ${data[2].name}.\n` : ''}` : null}`
        );

        // console.log(data)
    } catch (err) {
        console.error(err)
    }
})()

