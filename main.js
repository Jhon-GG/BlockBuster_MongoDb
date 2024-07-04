import { connect } from "./helpers/db/connect.js";
import { getCountDvd } from "./js/model/movies.js";


import { 
    getTotalOfActors
} from "./js/model/actors.js";


// console.log (await getCountDvd());


// Consultas


console.log (await getTotalOfActors());
