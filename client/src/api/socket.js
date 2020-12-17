const socket = new WebSocket("ws://localhost:8080/ws");

let cpu_data = null;
let memo_data = null;
let flag = false;

let connect = () => {
    console.log('Attempting connection...');

    socket.onopen = (event) => {
        console.log('Succesfully Connected', socket);
        socket.send("start");
    }

    socket.onmessage = msg => {
        //console.log(msg)
        if(flag == false){
            cpu_data = JSON.parse(msg.data.replace(",\n]","\n]"));
            flag = true;
        }else{
            memo_data = JSON.parse(msg.data);
            flag = false;
        }
    }

    socket.onclose = event => {
        console.log('Socket closed connection', socket);
    }

    socket.onerror = err => {
        console.log('Socket error: ', err);
    }
}


export { connect, cpu_data, memo_data, socket }

