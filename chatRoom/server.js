const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || '3030';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.set('port', PORT);
io.on('connection', (socket) =>{
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('send', (message) =>{
    console.log('receving message', message);
    io.emit('message', {
      type: 'new-message',
      content: message
    })
  })
})
http.listen(PORT, ()=>{
  console.log('listening on the port', PORT);
})
