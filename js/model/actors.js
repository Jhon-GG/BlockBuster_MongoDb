import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";


// 10. Encontrar el número total de actores en la base de datos:

export const getTotalOfActors = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
          "$group": {
            "_id": null,
            "total_actors": { "$sum": 1 }
          }
        }
      ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { total_of_actors: result[0].total_actors };
    } else {
        return { total_actors: 0 };
    }
}



// 11. Encontrar la edad promedio de los actores en la base de datos:


export const getAverageOfActorsAge = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
          "$addFields": {
            "date_of_birth": { "$toDate": "$date_of_birth" }
          }
        },
        {
          "$addFields": {
            "age": {
              "$divide": [
                { "$subtract": [new Date(), "$date_of_birth"] },
                1000 * 60 * 60 * 24 * 365
              ]
            }
          }
        },
        {
          "$group": {
            "_id": null,
            "average_age": { "$avg": "$age" }
          }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    await conexion.close();
    
    if (result.length > 0) {
        return { average_actors_age: result[0].average_age };
    } else {
        return { average_actors_age: 0 };
    }
}