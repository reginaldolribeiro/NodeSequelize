const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { User } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//User.create({ name: 'Reginaldo', email: 'reginaldolribeiro@gmail.com', password: '123456'});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Lista todos
app.get('/users', (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.send(err));
});

//Criar
app.post('/users', (req, res) => {
  const user = User.create(req.body);
  res.json(user);
}); 

//Buscar
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
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

//Editar
app.put('/users/:id', (req, res) => {

  const { name, email, password } = req.body;

  User.update({ name, email, password},
              { where: {id: req.params.id} }
              ).then((rowsUpdated) => {
                console.log(rowsUpdated)
                res.json()
              })
              .catch(erro => res.send(err))
}); 

//Deletar
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id}
  })
  .then(res.status(204).send)
}); 

app.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.listen(3000);