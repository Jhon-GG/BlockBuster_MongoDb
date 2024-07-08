import { connect } from "./helpers/db/connect.js";
import util from 'util';


// import { 
//     getCountDvd,
//     getDVDCopies,
//     getMoviesWithMainActors,
//     getTotalMoviesAwards,
//     getAllJohnDoeMovies,
//     getAllFictionMoviesWithActorId3,
//     getDistinctGenres,
//     getMovieWithMayorDVD,
//     getAllBlurayValue,
//     getAllMoviesWithActor2,
//     getMoviesForActor,
//     getAllDVDCopies,
//     getJohnDueMovies
// } from "./js/model/movies.js";


// import { 
//     getActorsWithOscarAward,
//     getTotalOfActors,
//     getActorsAward,
//     getBornLater1980,
//     getMostAwardActors,
//     getAverageOfActorsAge,
//     getActorsWithInstagram,
//     getActorsWithAwardsLater2015
// } from "./js/model/actors.js";


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


// let { JohnDue_movies } = await getJohnDueMovies();
// console.log(JohnDue_movies);


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



import {movis} from './js/model/movies.js'
import {authors} from './js/model/actors.js'


let objMovis = new movis();

console.log(`1.Contar el número total de copias de DVD disponibles en todos los registros:`, await objMovis.getDVDCopies());

objMovis.destructor();




let objAuthors = new authors();

console.log(`2.Encontrar todos los actores que han ganado premios Oscar:`,await objAuthors.getActorsWithOscarAward());
console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
console.log(`4.Obtener todos los actores nacidos después de 1980:`, await objAuthors.getBornLater1980());

console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
objAuthors.destructor();