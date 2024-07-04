import { connect } from "./helpers/db/connect.js";


import { 
    getCountDvd,
    getMoviesWithMainActors,
    getTotalMoviesAwards,
    getAllJohnDoeMovies
} from "./js/model/movies.js";


import { 
    getTotalOfActors,
    getAverageOfActorsAge,
    getActorsWithInstagram
} from "./js/model/actors.js";


// console.log (await getCountDvd());


// Consultas


// console.log (await getTotalOfActors());
// console.log (await getAverageOfActorsAge());
// console.log (await getActorsWithInstagram());
// console.log (await getMoviesWithMainActors());
// console.log (await getTotalMoviesAwards());
console.log (await getAllJohnDoeMovies());
