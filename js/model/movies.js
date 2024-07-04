import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";

export const getCountDvd = async()=>{
    let {db, conexion} = await connect.getinstance();

    const collection = db.collection('movis');
    const data = await collection.find(
        {
            format:{
                $elemMatch: {name: {$eq: "dvd"}}
            }
        }
    ).toArray();
    conexion.close();
    return {countByMoviDVD: data.length};

}



// 13. Encontrar todas las películas en las que participan actores principales:


export const getMoviesWithMainActors = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        { "$unwind": "$character" },
        { "$match": { "character.rol": "principal" } },
        { 
          "$group": { 
            "_id": "$_id", 
            "name": { "$first": "$name" }, 
            "actors": { 
              "$push": { 
                "name": "$character.apodo", 
                "rol": "$character.rol" 
              } 
            } 
          } 
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    const formattedResult = {
        movies_with_main_actors: result.map(movie => ({
            _id: movie._id,
            name: movie.name,
            actors: movie.actors
        }))
    };

    return JSON.stringify(formattedResult, null, 2)
        .replace(/"_id": ({[^}]+})/g, '"_id": ObjectId($1)')
        .replace(/"actors": \[/g, '"actors": ')
        .replace(/{\n    "name"/g, 'Object\n    "name"');
}