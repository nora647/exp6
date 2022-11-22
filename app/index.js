const express = require("express");
const app = express();
const PORT = 8000;
app.get("/", (req,res) => {
    res.send("Hello express from a lightweight container!");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
// Connection URL
const uri = 'mongodb://localhost:27017';



connect();



async function connect() {

    const client = new MongoClient(uri);

    try {

        //连接数据库

        await client.connect();

        const db = client.db('temperature');

        const collection = db.collection('sensor');

        console.log(`Connected to database ${db.databaseName}`);



        //插入document { sensorid: 1, temperature: 20 }

        const insertResult = await collection.insertMany([{ sensorid: 1, temperature: 20 }]);

        console.log('Inserted documents =>', insertResult);



        //等待2秒钟

        await sleep(2000);

       

        //查询所有的documents

        let findResult = await collection.find({}).toArray();

        console.log('Found documents =>', findResult);

       

        //等待2秒钟

        await sleep(2000);

       

        //更改document为 { sensorid: 2, temperature: 20 }

        const updateResult = await collection.updateOne({ sensorid: 1, temperature: 20 }, { $set: { sensorid: 2, temperature:20 } });

        console.log('Updated documents =>', updateResult);

       

        //等待2秒钟

        await sleep(2000);

       

        //查询所有的documents

        findResult = await collection.find({}).toArray();

        console.log('Found documents =>', findResult);

       

        //等待2秒钟

        await sleep(2000);

       

        const deleteResult = await collection.deleteMany({ sensorid: 2, temperature: 20 });

        console.log('Deleted documents =>', deleteResult);



        //等待2秒钟

        await sleep(2000);

       

        //查询所有的documents

        findResult = await collection.find({}).toArray();

        console.log('Found documents =>', findResult);



    } catch (error) {

        console.error("Error happened! ", error);

    } finally {

        console.log(`Closing mongodb connection.`);

        client.close();

        console.log(`Closed connection.`);

    }

}



//使用promise实现的异步等待函数，参数是等待的毫秒数

function sleep(millisec) {

    return new Promise((resolve, reject) => {

        console.log(`sleeping for ${millisec} milliseconds`);

        setTimeout(resolve, millisec);

    });

}
