import { connect } from "./helpers/db/connect.js";
import { getCountDvd } from "./js/model/movies.js";


console.log (await getCountDvd());