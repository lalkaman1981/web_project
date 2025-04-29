const db_path = '../src_database/database.json';

const jsonServer = require('json-server');
const path = require('path');

const real_path = path.join(__dirname, db_path)
const server = jsonServer.create();
const router = jsonServer.router(real_path);
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/addUser', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const db = JSON.parse(fs.readFileSync(real_path, 'utf-8'));
  const users = db.users;

  if (users.find(user => user.email === email)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    email,
    password,
    nickname: ''
  };

  users.push(newUser);
  fs.writeFileSync(real_path, JSON.stringify(db, null, 2));

  res.status(201).json(newUser);
});

server.delete('/removeUser', (req, res) => {
  const { email } = req.body;

  const db = JSON.parse(fs.readFileSync(real_path, 'utf-8'));
  const users = db.users;
  const filtered = users.filter(user => user.email !== email);

  if (users.length === filtered.length) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.users = filtered;
  fs.writeFileSync(real_path, JSON.stringify(db, null, 2));

  res.status(200).json({ message: 'User removed' });
});

server.post('/searchUser', (req, res) => {
  const { email, password } = req.body;

  const db = JSON.parse(fs.readFileSync(real_path, 'utf-8'));
  const user = db.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(404).json({ error: 'Invalid credentials' });
  }

  res.status(200).json(user);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
