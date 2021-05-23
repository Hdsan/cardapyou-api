const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

const uri =
  "mongodb+srv://knots:abcd1234@jackdawn.ino2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//carrega contas
async function loadAccounts() {
  try {
    await client.connect();
    return client.db("cardapyou").collection("contas");
  } catch (err) {
    throw err;
  }
}

//listar todas as contas
router.get("/", async (req, res) => {
  const posts = await loadAccounts();
  res.send(await posts.find({}).toArray());
});


//autenticação
router.get("/:mail/:pass", async (req, res) => {
  const email =  req.params.mail;
  const pass = req.params.pass;
  try{
    const posts = await loadAccounts();
    const account = await posts.find({
      "mail" : email
    }).toArray();
    if(account[0].password === pass){
      res.status(200).send({ok : true,data : account[0]});
    }
    else{
     throw "Combinação de email/senha incorreta"
    }
   
  }
  catch(err){
    res.status(401).send({ok: false ,message: "Combinação de email/senha incorreta",erro:err})
  }
});

//informações do cliente por email
router.get("/:mail", async (req, res) => {
  const email =  req.params.mail;
  try{
    const posts = await loadAccounts();
    const account = await posts.find({
      "mail" : email
    }).toArray();
    if(account.length == 0){
      throw 'Usuário não encontrado'
    }
      res.status(200).send(account[0]);
   
  }
  catch(err){
    res.status(400).send(err)
  }
});


//criar
router.post('/', async (req, res) => {
  const posts = await loadAccounts();
  await posts.insertOne({
    name: req.body.name,
    cpf: req.body.cpf,
    address: req.body.address,
    mail: req.body.mail,
    password: req.body.password,
    complement: req.body.complement,
    phone: req.body.phone,
    type: req.body.type
  });
  res.status(201).send();
})

//delete
router.delete("/:id", async (req, res) => {
  const posts = await loadAccounts();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id),
  })
  res.status(200).send();
});


module.exports = router;
/*

*/