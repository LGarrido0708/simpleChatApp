var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users =[]

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){ 
    console.log(msg)
    io.emit('chat message', msg)   
    
  });
  socket.on('add user', function(data){
    socket.username = data.username,
    msg = data
  });
  
socket.on('add user', function(username){
  users.push(username)
  socket.username = username
  io.emit('getOnline', users)
});



socket.on('disconnect',function(){
  

  for (let i = 0; i < users.length; i++) {
   if(users[i] ==  socket.username){
     users.splice(i , 1)
     break;
   }

  }
  io.emit('getOnline', users)
})
socket.on('typing', function(){
  io.emit('typing', {username : socket.username})
})

  });

http.listen(port, function(){
  console.log('listening on *:' + port);
});