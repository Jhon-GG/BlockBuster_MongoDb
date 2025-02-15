import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";
import util from 'util';



export class authors extends connect {
    static instanceAuthors;
    db;
    collection;

    constructor(){
        if (authors.instanceauthors){
            return authors.instanceauthors;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('authors');
        authors.instanceAuthors = this;
    }
    destructor(){
        authors.instanceAuthors = undefined;
        connect.instanceConnect = undefined;
    }


    // 2.Encontrar todos los actores que han ganado premios Oscar

    async getActorsWithOscarAward() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$unwind": "$awards"
            },
            {
                "$match": { "awards.name": "Oscar Award" }
            },
            {
                "$project": {
                    "_id": 0,
                    "full_name": 1,
                    "awards.name": 1,
                    "awards.year": 1,
                    "awards.category": 1
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }
       

    // 3. Encontrar la cantidad total de premios que ha ganado cada actor:

    async getActorsAward() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$project": {
                    "_id": 0,
                    "full_name": 1,
                    "total_awards": { "$size": "$awards" }
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }


    // 4.Obtener todos los actores nacidos después de 1980:
    
    async getBornLater1980() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$match": {
                    "date_of_birth": { $gt: "1980-01-01" }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "full_name": 1,
                    "date_of_birth": 1
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }
    

    // 5.Encontrar el actor con más premios:

    async getMostAwardActors() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$project": {
                    "_id": 0,
                    "full_name": 1,
                    "total_awards": { "$size": "$awards" }
                }
            },
            {
                "$sort": { "total_awards": -1 }
            },
            {
                "$limit": 1
            }
        ]).toArray();
        await this.conexion.close();
        return data[0] || null;
    }
    

    // 10. Encontrar el número total de actores en la base de datos:

    async getTotalOfActors() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$group": {
                    "_id": null,
                    "total_actors": { "$sum": 1 }
                }
            }
        ]).toArray();
        await this.conexion.close();
    
        return { total_of_actors: data[0]?.total_actors || 0 };
    }    
    

    // 11. Encontrar la edad promedio de los actores en la base de datos:

    async getAverageOfActorsAge() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
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
        ]).toArray();
        await this.conexion.close();
    
        return { average_actors_age: data[0]?.average_age || 0 };
    }
    

    // 12.Encontrar todos los actores que tienen una cuenta de Instagram

    async getActorsWithInstagram(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $match: {
                    "social_media.instagram": { $exists: true, $ne: "" }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    id_actor: 1,
                    actor_name: "$full_name",
                    social_media: 1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }


    // 18. Encontrar todos los actores que han ganado premios después de 2015:

    async getActorsWithAwardsLater2015() {
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
                "$match": { "awards.year": { "$gt": 2015 } }
            },
            {
                "$unwind": "$awards"
            },
            {
                "$project": {
                    "_id": 1,
                    "full_name": 1,
                    "name": "$awards.name",
                    "year": "$awards.year",
                    "category": "$awards.category"
                }
            }
        ]).toArray();
        await this.conexion.close();
    
        return { awards_later_2015: data };
    }
    

}





// ------------------------------------------------ CONSULTAS ---------------------------------------



// 2.Encontrar todos los actores que han ganado premios Oscar

export const getActorsWithOscarAward = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$unwind": "$awards"
        },
        {
            "$match": { "awards.name": "Oscar Award" }
        },
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "awards.name": 1,
                "awards.year": 1,
                "awards.category": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}



// 3. Encontrar la cantidad total de premios que ha ganado cada actor:



export const getActorsAward = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "total_awards": { "$size": "$awards" }
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}



// 4.Obtener todos los actores nacidos después de 1980:

export const getBornLater1980 = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            $match: {
                "date_of_birth": { $gt: "1980-01-01" }
            }
        },
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "date_of_birth": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}




// 5.Encontrar el actor con más premios:

export const getMostAwardActors = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "total_awards": { "$size": "$awards" }
            }
        },
        {
            "$sort": { "total_awards": -1 }
        },
        {
            "$limit": 1
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();

    return result[0] || null;
}




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


// 12. Encontrar todos los actores que tienen una cuenta de Instagram:


export const getActorsWithInstagram = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$match": {
                "social_media.instagram": { "$exists": true, "$ne": "" }
            }
        },
        {
            "$project": {
                "_id": 1,
                "id_actor": 1,
                "full_name": 1,
                "date_of_birth": 1,
                "nationality": 1,
                "biography": 1,
                "awards": 1,
                "social_media": 1,
                "website": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    await conexion.close();
    
    if (result.length > 0) {
        return { actors_with_instagram: result };
    } else {
        return { actors_with_instagram: [] };
    }
}


// 18. Encontrar todos los actores que han ganado premios después de 2015:

export const getActorsWithAwardsLater2015 = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        { "$match": 
        { "awards.year": { "$gt": 2015 } } 
          
        },
        { "$unwind": "$awards" 
          
        },
          {
              "$project": {
                  "_id": 1,
                  "full_name": 1,
                  "name": "$awards.name",
                  "year": "$awards.year",
                  "category": "$awards.category"
              }
          }
      ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { awards_later_2015: result };
    } else {
        return { awards_later_2015: [] };
    }
}

