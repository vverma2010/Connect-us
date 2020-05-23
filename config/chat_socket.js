module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log(' New Connection Recieved',socket.id);

       socket.on('disconnect',function(socket){
            console.log('Socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('Joining request recieved', data);
            socket.join(data.chatroom);


            io.in(data.chatroom).emit('user_joined',data);
        });
        
        // detect the send_message and broadcast it to everyone in the room

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })

    });
}