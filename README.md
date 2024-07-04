# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   [
       { 
           "$unwind": "$format" 
       },
       { 
           "$match": { "format.name": "dvd" } 
       },
       {
           "$group": {
               "_id": null,
               "total_copies": { "$sum": "$format.copies" }
           }
       }
   ]
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   [
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
               "awards": 1
           }
       }
   ]
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   [
       {
           "$project": {
               "full_name": 1,
               "total_awards": { "$size": "$awards" }
           }
       }
   ]
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   [
     {
       $match: {
         "date_of_birth": {$gt: "1980-01-01"}
       }
     },
     {
       "$project": {
         "_id": 0,
         "full_name": 1,
         "date_of_birth": 1
       }
     }
   ]
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
   [
       {
           "$project": {
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
   ]
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
   [
       {
           "$unwind": "$genre"
       },
       {
           "$group": {
               "_id": "$genre"
           }
       },
       {
           "$sort": { "_id": 1 }
       }
   ]
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   [
     {
       $match: {
         "character.id_actor":1
       }
     }
   ]
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   [
       {
           "$unwind": "$format"
       },
       {
           "$match": {
               "format.name": "dvd"
           }
       },
       {
           "$group": {
               "_id": null,
               "total_value": {
                   "$sum": {
                       "$multiply": ["$format.copies", "$format.value"]
                   }
               }
           }
       }
   ]
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
   [
     {
       $match: {
         "character.id_actor": 1
       }
     }
   ]
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        "$group": {
          "_id": null,
          "total_actors": { "$sum": 1 }
        }
      }
    ]
    
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
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
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    [
      {
        "$match": {
          "social_media.instagram": { "$exists": true, "$ne": "" }
        }
      }
    ]
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    [
      { "$unwind": "$character" 
        
      },
      { "$match": { "character.rol": "principal" } 
        
      },
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
    ]
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    [
        {
            $unwind: "$character"
        },
        {
            $lookup: {
                from: "authors",
                localField: "character.id_actor",
                foreignField:"id_actor",
                as: "movies_award"
            }
        },
        {
            $unwind: "$movies_award"
        },
        {
            $unwind: "$movies_award.awards"
        },
        {
            $group: {
                _id: null,
                total_award: {$sum: 1}
            }
        }
    ]
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
    [
      {
        "$lookup": {
          "from": "authors",
          "localField": "character.id_actor",
          "foreignField": "id_actor",
          "as": "actor_info"
        }
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
          "actor_name": { "$arrayElemAt": ["$actor_info.full_name", 0] },
          "movie_name": "$name",
          "format": "$format.name"
        }
      }
    ]
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    [
      {
        "$lookup": {
          "from": "authors",
          "localField": "character.id_actor",
          "foreignField": "id_actor",
          "as": "actor_info"
        }
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
          "_id": 3,
          "movie_name": "$name",
          "actor_name": { "$arrayElemAt": ["$actor_info.full_name", 2] },
          "genre": 1
        }
      }
    ]
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    [
        { "$unwind": "$format" 
          
        },
        { "$match": 
        
        { "format.name": "dvd" } 
          
        },
        
        { "$sort": 
        
        { "format.copies": -1 } 
          
        },
        { "$limit": 1 
          
        },
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "format.copies": 1
            }
        }
    ]
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
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
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    [
        { "$unwind": "$format" 
          
        },
        { "$match": 
        
        { "format.name": "Bluray" } 
          
        },
        {
            "$group": {
                "_id": null,
                "total_value": { "$sum": { "$multiply": ["$format.copies", "$format.value"] } }
            }
        }
    ]
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
        { "$match": 
        { "character.id_actor": 2 }
        },
        {
            "$lookup": {
                "from": "authors",
                "localField": "character.id_actor",
                "foreignField": "id_actor",
                "as": "actors"
            }
        },
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "actor_name": { "$arrayElemAt": ["$actors.full_name", 1] }
            }
        }
    ]
    ```

