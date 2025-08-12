// === Environmentals === //
const express = require('express');
const cookieParser = require('cookie-parser');
// const cookieSesson = require('cookie-sesion');
const server = express();
const port = 8020;

// === Set Up === //
server.use(express.json());
server.use(cookieParser());
// server.use(cookieSesson());

server.listen(port, () => console.log(`Server is up and listening at http://localhost:${port}`));

// === Paths === //
server.post('/login', (req, res) => {
  let  username = req.body?.username || null;

  if( username !== null ){
    res.status(200);
    res.cookie('username', username, { maxAge: 900000, sameSite: 'strict' });
    res.send('Logged in!')
  } else {
    res.status(400);
    res.send('No username provided');
  }
});

server.post('/logout', (req, res) => {
  res.status(200);
  res.clearCookie('username', {sameSite: 'strict' });
  res.send('Logged out!')
});

server.get('/hello', (req, res) => {
  if( req.cookies.username === undefined ){
    res.status(400);
    var msg = 'No username found, please log in.'
  } else {
    res.status(200);
    var msg = `Welcome ${req.cookies.username}!`;
  }
  res.send(msg)
});