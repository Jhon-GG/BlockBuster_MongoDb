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

