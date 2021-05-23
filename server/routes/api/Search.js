const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

const uri =
  "mongodb+srv://knots:abcd1234@jackdawn.ino2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function loadAccounts() {
    try {
      await client.connect();
      return client.db("cardapyou").collection("contas");
    } catch (err) {
      throw err;
    }
  }
  //restaurantes da área

router.get("/:city", async (req, res) => {
  const city =  req.params.city;
   try{
     const posts = await loadAccounts();
     const result = await posts.find({
       "address" : city,
       "type" : "restaurant"
     }).toArray();
     if(result.length == 0){
       throw 'Àrea sem restaurantes'
     }
    res.status(200).send(result);
    
   }
   catch(err){
     res.status(400).send(err)
   }
 });

module.exports = router;
