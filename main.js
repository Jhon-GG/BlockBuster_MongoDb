import { connect } from "./helpers/db/connect.js";
import { getCountDvd } from "./js/model/movies.js";


import { 
    getTotalOfActors,
    getAverageOfActorsAge
} from "./js/model/actors.js";


// console.log (await getCountDvd());


// Consultas


// console.log (await getTotalOfActors());
console.log (await getAverageOfActorsAge());
