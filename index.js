const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { User } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  await User.findAll()
    .then(users => res.json(users))
    .catch(err => res.send(err));
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
}); 

app.get('/users/:id', async (req, res) => {
  await User.findById(req.params.id)
    .then(user => {
      console.log("User not found.");
      if(!user) res.status(404).send;
      res.json(user)
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}); 

app.put('/users/:id', async (req, res) => {

  // const { name, email, password } = req.body;

  // await User.update({ name, email, password},
  //             { where: {id: req.params.id} }
  //             ).then((rowsUpdated) => {
  //               console.log(rowsUpdated)
  //               res.json()
  //             })
  //             .catch(erro => res.send(err))

  // OU 
  
  await User.update(req.body,
              { where: {id: req.params.id} }
              ).then((rowsUpdated) => {
                console.log(rowsUpdated)
                res.json()
              })
              .catch(erro => res.send(err))
}); 

app.delete('/users/:id', async (req, res) => {
  console.log("Deletando o usuario " + req.params.id);
  await User.destroy({
    where: { id: req.params.id }
  })
  .then(deletedUsers => {
    console.log(`Usuario deletado ${deletedUsers}`)
    return res.status(204).send()
  })  
});


app.listen(3000);