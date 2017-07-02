import io from 'socket.io-client';
import $ from 'jquery';

const socket = io('localhost:7778');

const $room = $('#rooms');
socket.on('roomList', rooms => {
    $room.empty();
    for (let room of rooms){
        $room.append(`
            <li>
                <a href="#${room.id}">
                    ${room.owner.name} - ${room.title}
                </a>
            </li>
        `);
    }
});

socket.on('joinRoomSuccess', room => {
    console.log(room);
});

socket.on('message', message => {
    console.info('[MESSAGE]', message);
});

$room.on('click', 'a', e => {
    const roomNumber = e.target.hash.replace('#', '');
    socket.emit('joinRoom', roomNumber);
})
