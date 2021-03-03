const express = require('express')
const path = require('path');
const bodyparser = require('body-parser');
const app=express()
const port = process.env.PORT || 80;

app.set('views',path.join(__dirname,'views'))
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.use(bodyparser.json())

app.get('/',(req,res)=>{
  res.render('index')
})

server=app.listen(port,function(){
  console.log(`Servidor rodando na porta ${port}`);
})

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
  socket.username='Anônimo'
  var name=socket.username
  socket.broadcast.emit('joined_room',{name:socket.username+ ' se conectou no chat'});
  console.log('Novo usuário conectado: '+ socket.username);

  socket.on('new_msg',(data)=>{
    console.log(data);
    socket.broadcast.emit('new_msg_all',data)
  })

  // socket.on('change_name',(data)=>{
  //   io.sockets.emit('joined_room',{name:socket.username+ ' changed into '+data.username});
  //   socket.username=data.username;
  //   name=socket.username
  //   console.log('UserName Changed to :'+socket.username);
  // })

  socket.on('disconnect',(socket)=>{
    console.log('Usuário desconectado: '+ name);
    io.sockets.emit('joined_room',{name:name+ ' se desconectou do chat'});
  })
})
