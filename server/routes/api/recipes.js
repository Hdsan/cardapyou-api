const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

const uri =
  "mongodb+srv://knots:abcd1234@jackdawn.ino2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function loadRecipes() {
    try {
      await client.connect();
      return client.db("cardapyou").collection("receitas");
    } catch (err) {
      throw err;
    }
  }
  //todas as receitas
  router.get("/", async (req, res) => {
    const posts = await loadRecipes();
    res.send(await posts.find({}).toArray());
  });

  //criar receitas
  router.post('/:id', async (req, res) => {
    const id = req.params.id  
    const recipes = await loadRecipes();
    await recipes.insertOne({
      name: req.body.name,
      Restaurant_id: id,
      price: req.body.price,
      img: req.body.img
    });
    res.status(201).send();
  })
  //delete receita

router.delete("/:id", async (req, res) => {
    const recipes = await loadRecipes();
    await recipes.deleteOne({
      _id: new mongodb.ObjectID(req.params.id),
    })
    res.status(200).send();
  });

  //informações da receita por id
router.get("/:id", async (req, res) => {
    const id =  req.params.id;
    try{
      const posts = await loadRecipes();
      const recipes = await posts.find({
        _id: new mongodb.ObjectID(req.params.id),
      }).toArray();
      if(account.length == 0){
        throw 'Receita não encontrada'
      }
        res.status(200).send(account[0]);
     
    }
    catch(err){
      res.status(400).send(err)
    }
  });
  //receitas por restaurante 
  router.get("/:city", async (req, res) => {
    const id =  req.params.id;
    try{
      const posts = await loadRecipes();
      const recipes = await posts.find({
        _id: new mongodb.ObjectID(req.params.id),
      }).toArray();
      if(account.length == 0){
        throw 'Receita não encontrada'
      }
        res.status(200).send(account[0]);
     
    }
    catch(err){
      res.status(400).send(err)
    }
  });

module.exports = router;
