import { connect } from "./helpers/db/connect.js";
import util from 'util';


import { 
    getCountDvd,
    getDVDCopies,
    getMoviesWithMainActors,
    getTotalMoviesAwards,
    getAllJohnDoeMovies,
    getAllFictionMoviesWithActorId3,
    getDistinctGenres,
    getMovieWithMayorDVD,
    getAllBlurayValue,
    getAllMoviesWithActor2,
    getMoviesForActor,
    getAllDVDCopies,
    getJohnDueMovies
} from "./js/model/movies.js";


import { 
    getActorsWithOscarAward,
    getTotalOfActors,
    getActorsAward,
    getBornLater1980,
    getMostAwardActors,
    getAverageOfActorsAge,
    getActorsWithInstagram,
    getActorsWithAwardsLater2015
} from "./js/model/actors.js";


// console.log (await getCountDvd());


// Consultas


// console.log (await getDVDCopies());
// console.log (await getActorsWithOscarAward());
// console.log (await getActorsAward());
// console.log (await getBornLater1980());
// console.log (await getMostAwardActors());
// console.log (await getDistinctGenres());


// let { movies_for_actor } = await getMoviesForActor();
// console.log(movies_for_actor);


// console.log(await getAllDVDCopies());


let { movies_for_actor } = await getJohnDueMovies();
console.log(JohnDue_movies);


// console.log (await getTotalOfActors());
// console.log (await getAverageOfActorsAge());
// console.log (await getActorsWithInstagram());
// console.log (await getMoviesWithMainActors());
// console.log (await getTotalMoviesAwards());
// console.log (await getAllJohnDoeMovies());
// console.log (await getAllFictionMoviesWithActorId3());

// let {movie_with_mayor_dvd} = await getMovieWithMayorDVD()
// console.log (movie_with_mayor_dvd);


// console.log(await getActorsWithAwardsLater2015());
// console.log(await getAllBlurayValue());
// console.log(await getAllMoviesWithActor2());



// main.j

// import { movis } from "./js/model/movis.js";

// let objMovis = new movis();
// console.log(await objMovis.getCountDvd());
