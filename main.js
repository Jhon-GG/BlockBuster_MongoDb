import { connect } from "./helpers/db/connect.js";


import { 
    getCountDvd,
    getDVDCopies,
    getMoviesWithMainActors,
    getTotalMoviesAwards,
    getAllJohnDoeMovies,
    getAllFictionMoviesWithActorId3,
    getMovieWithMayorDVD
} from "./js/model/movies.js";


import { 
    getActorsWithOscarAward,
    getTotalOfActors,
    getActorsAward,
    getAverageOfActorsAge,
    getActorsWithInstagram
} from "./js/model/actors.js";


// console.log (await getCountDvd());


// Consultas


// console.log (await getDVDCopies());
// console.log (await getActorsWithOscarAward());
console.log (await getActorsAward());


// console.log (await getTotalOfActors());
// console.log (await getAverageOfActorsAge());
// console.log (await getActorsWithInstagram());
// console.log (await getMoviesWithMainActors());
// console.log (await getTotalMoviesAwards());
// console.log (await getAllJohnDoeMovies());
// console.log (await getAllFictionMoviesWithActorId3());
// console.log (await getMovieWithMayorDVD());
