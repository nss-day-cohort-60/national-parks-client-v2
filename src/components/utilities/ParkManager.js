
export const getParks = () => {
    return fetch(`http://localhost:8000/parks`)
        .then( res => res.json() ) 
}