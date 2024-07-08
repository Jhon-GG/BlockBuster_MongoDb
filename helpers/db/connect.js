
// import {MongoClient} from 'mongodb';

// export class connect {
//     static instance = null;
//     db = null;
//     #host = null;
//     #pass
//     #dbName
//     static async getinstance({host, user, pass, port,cluster, dbName}=
//         {host: "mongodb://", 
//             user: "mongo", 
//             pass: "PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF", 
//             port: 47797, 
//             cluster: "monorail.proxy.rlwy.net", 
//             dbName: "test"}
//         ){
//         if(connect.instance === null){
//             connect.instance = new connect();
//             connect.instance.host = host;
//             connect.instance.user = user;
//             connect.instance.pass = pass;
//             connect.instance.port = port;
//             connect.instance.cluster = cluster;
//             connect.instance.dbName = dbName;
//         }
//         await connect.instance.#open();
//         return connect.instance;
//     }
//     set host(host){
//         this.#host = host;
//     }
//     set pass(pass){
//         this.#pass = pass;
//     }
//     set dbName(dbName){
//         this.#dbName = dbName;
//     }
//     async #open(){
//         console.log("Entre");
//         // mongodb://mongo:PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF@monorail.proxy.rlwy.net:47797/
//         let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
//         this.conexion = new MongoClient(url);
//         await this.conexion.connect();
//         console.log("Mensaje de la conexion: ");
//         this.db = this.conexion.db(this.dbName);
//     }
// }



// mongodb+srv://jhongg2012:Sb4bFEJqbTI3m2Cs@cluster0.vpvk7tx.mongodb.net/m2


// ------------------------------------------------------------------------------------------------------------------------------------------------------



import { MongoClient } from 'mongodb';

export class connect {
    static instanceConnect;
    db;
    user;
    port;
    cluster;
    #url;
    #host;
    #pass;
    #dbName;


//   mongodb://mongo:aNIVdYUdWkFIJnETyhGYMQGzMdpjYCdl@roundhouse.proxy.rlwy.net:23375

    constructor({ host, user, pass, port, cluster, dbName } = {
        host: "mongodb://",
        user: "mongo",
        pass: "aNIVdYUdWkFIJnETyhGYMQGzMdpjYCdl",
        port: 23375,
        cluster: "roundhouse.proxy.rlwy.net",
        dbName: "test"
    }) {
        if (connect.instanceConnect) {
            return connect.instanceConnect;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open();
        connect.instanceConnect = this;
    }
    destructor(){
        connect.instanceConnect = undefined;
    }
    set setHost(host) {
        this.#host = host;
    }

    set setPass(pass) {
        this.#pass = pass;
    }

    set setDbName(dbName) {
        this.#dbName = dbName;
    }

    get getDbName() {
        return this.#dbName;
    }
    async reConnect() {
        await this.#open();
    }
    async #open() {
        console.log("Drive armado");
        this.#url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(this.#url);
        await this.conexion.connect();
        console.log("Conectado");
    }
}