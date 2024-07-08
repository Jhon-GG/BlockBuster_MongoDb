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
console.log(`6.Listar todos los géneros de películas distintos:`, await objMovis.getDistinctGenres());
console.log(`7.Encontrar películas donde el actor con id 1 haya participado:`, await objMovis.getMoviesForActor());
console.log(`8. Calcular el valor total de todas las copias de DVD disponibles:`, await objMovis.getAllDVDCopies());
console.log(`9.Encontrar todas las películas en las que John Doe ha actuado:`, await objMovis.getJohnDueMovies());
console.log(`13.Encontrar todas las películas en las que participan actores principales:`, await objMovis.getMoviesWithMainActors());
console.log(`14. Encontrar el número total de premios que se han otorgado en todas las películas:`, await objAuthors.getTotalMoviesAwards());
console.log(`15. Encontrar todas las películas en las que John Doe ha actuado y que están en formato Blu-ray:`, await objMovis.getAllJohnDoeMovies());
objMovis.destructor();




let objAuthors = new authors();

console.log(`2.Encontrar todos los actores que han ganado premios Oscar:`,await objAuthors.getActorsWithOscarAward());
console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
console.log(`4.Obtener todos los actores nacidos después de 1980:`, await objAuthors.getBornLater1980());
console.log(`5.Encontrar el actor con más premios:`, await objAuthors.getMostAwardActors());
console.log(`10. Encontrar el número total de actores en la base de datos::`, await objAuthors.getTotalOfActors());
console.log(`11. Encontrar el promedio de edad de todos los actores en la base de datos:`, await objAuthors.getAverageOfActorsAge());
console.log(`12. Encontrar todos los actores que tienen una cuenta de Instagram:`, await objAuthors.getActorsWithInstagram());

console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor:`, await objAuthors.getActorsAward());
objAuthors.destructor();