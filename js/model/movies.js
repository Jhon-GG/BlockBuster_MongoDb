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


// 14. Encontrar el número total de premios que se han otorgado en todas las películas:

export const getTotalMoviesAwards = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        {
            $unwind: "$character"
        },
        {
            $lookup: {
                from: "authors",
                localField: "character.id_actor",
                foreignField: "id_actor",
                as: "actor_info"
            }
        },
        {
            $unwind: "$actor_info"
        },
        {
            $unwind: "$actor_info.awards"
        },
        {
            $group: {
                _id: null,
                total_awards: { $sum: 1 }
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { movie_awards: result[0].total_awards };
    } else {
        return { movie_awards: 0 };
    }
}


// 15. Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:


export const getAllJohnDoeMovies = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        {
          "$unwind": "$character"
        },
        {
          "$lookup": {
            "from": "authors",
            "localField": "character.id_actor",
            "foreignField": "id_actor",
            "as": "actor_info"
          }
        },
        {
          "$unwind": "$actor_info"
        },
        {
          "$unwind": "$format"
        },
        {
          "$match": {
            "actor_info.full_name": "John Doe",
            "format.name": "Bluray"
          }
        },
        {
          "$project": {
            "_id": 0,
            "actor_name": "$actor_info.full_name",
            "movie_name": "$name",
            "format": "$format.name"
          }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { johndoe_movies: result };
    } else {
        return { johndoe_movies: [] };
    }
}


// 16. Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:


export const getAllFictionMoviesWithActorId3 = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        {
          "$unwind": "$character"
        },
        {
          "$lookup": {
            "from": "authors",
            "localField": "character.id_actor",
            "foreignField": "id_actor",
            "as": "actor_info"
          }
        },
        {
          "$unwind": "$actor_info"
        },
        {
          "$unwind": "$genre"
        },
        {
          "$match": {
            "genre": "Ciencia Ficción",
            "character.id_actor": 3
          }
        },
        {
          "$project": {
            "_id": 0,
            "movie_name": "$name",
            "actor_name": "$actor_info.full_name",
            "genre": 1
          }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { sci_fi_movies_with_actor_3: result };
    } else {
        return { sci_fi_movies_with_actor_3: [] };
    }
}