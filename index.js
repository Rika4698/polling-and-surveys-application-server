const express = require('express');
const app = express();
const cors = require('cors');
const moment = require('moment');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const port = process.env.PORT||5000;

//middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i5g3jew.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("surveyDb").collection("users");
    const surveyCollection = client.db("surveyDb").collection("survey");
    //jwt

    app.post('/jwt',async(req,res)=>{
        const user = req.body;
        console.log('user for token', user);
        const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'});
        res.send({token});
        
      })


     const verifyToken =(req,res,next) =>{
        console.log('inside verify token', req.headers.authorization);
        if(!req.headers.authorization){
            return res.status(401).send({message: 'unauthorized access'});
        }
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
            if(err){
                return res.status(401).send({message:'unauthorized access'})
            }
            req.decoded = decoded;
            next();
        })
        // next();
     }

     const verifyAdmin = async (req,res,next)=>{
        const email = req.decoded.email;
        const query = {email: email};
        const user = await userCollection.findOne(query);
        const isAdmin = user?.role ==='admin';
        if(!isAdmin){
            return res.status(403).send({message: 'forbidden access'});

        }
        next();
     }
    //  const verifySurveyor = async (req,res,next)=>{
    //     const email = req.decoded.email;
    //     const query = {email: email};
    //     const user = await userCollection.findOne(query);
    //     const isSurveyor = user?.role ==='surveyor';
    //     if(!isSurveyor){
    //         return res.status(403).send({message: 'forbidden access'});

    //     }
    //     next();
    //  }



      app.get('/user', verifyToken,verifyAdmin, async (req, res) => {
        // console.log(req.headers);
        const result = await userCollection.find().toArray();
        res.send(result);
      });


      app.get('/user/admin/:email',verifyToken,async(req,res) => {
        const email = req.params.email;
        if(email!==req.decoded.email){
            return res.status(403).send({message:'forbidden access'})

        }
        const query ={email:email};
        const user = await userCollection.findOne(query);
        let admin = false;
        if(user){
            admin = user?.role === 'admin';
        }
        res.send({admin});
      })

      app.get('/user/surveyor/:email',verifyToken,async(req,res) => {
        const email = req.params.email;
        if(email!==req.decoded.email){
            return res.status(403).send({message:'forbidden access'})

        }
        const query ={email:email};
        const user = await userCollection.findOne(query);
        let surveyor = false;
        if(user){
            surveyor = user?.role === 'surveyor';
        }
        res.send({surveyor});
      })
      
     app.post('/user',async(req,res) => {

        const user = req.body;
        const query = { email: user.email }
        const existingUser = await userCollection.findOne(query);
        if (existingUser) {
          return res.send({ message: 'user already exists', insertedId: null })
        }
        const result = await userCollection.insertOne(user);
        res.send(result);
     })

     app.post('/survey',async(req,res)=>{
        const item = req.body;
        const surveyData = {
            ...item,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
          };
        console.log(surveyData);
        const result =await surveyCollection.insertOne(surveyData);
        res.send(result);
     })
    
     app.patch('/user/admin/:id',verifyToken,verifyAdmin, async(req,res) =>{
        const id = req.params.id;
        const filter ={_id: new ObjectId(id)};
        const updatedDoc = {
            $set:{
                role:'admin'
            }
        }
        const result = await userCollection.updateOne(filter,updatedDoc);
        res.send(result);
     })

     app.patch('/user/surveyor/:id',verifyToken,verifyAdmin, async(req,res) =>{
        const id = req.params.id;
        const filter ={_id: new ObjectId(id)};
        const updatedDoc = {
            $set:{
                role:'surveyor'
            }
        }
        const result = await userCollection.updateOne(filter,updatedDoc);
        res.send(result);
     })



      app.delete ('/user/:id',verifyToken,verifyAdmin,async(req,res) =>{
         
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await userCollection.deleteOne(query);
        res.send(result);
      })

      




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Polling and Survey application')
})

app.listen(port,()=>{

    console.log(`Polling and Survey application on port ${port}`);
})