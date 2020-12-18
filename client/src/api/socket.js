const socket = new WebSocket("ws://localhost:8080/ws");
const socket2 = new WebSocket("ws://localhost:8080/ws2");

let cpu_data = null;
let memo_data = null;
let flag = false;
let cpu_usage = null;

let connect = () => {

    socket.onopen = (event) => {
        console.log('Succesfully Connected');
        socket.send("start");
    }

    socket.onmessage = msg => {
        //console.log(msg)
        if(flag == false){
            let temp = msg.data.replaceAll(",]","]");
            temp = temp.replace(",\n]","\n]");
            cpu_data = JSON.parse(temp);
            //cpu_data = JSON.parse(msg.data.replace(",\n]","\n]"));
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

let connect2 = () => {

    socket2.onopen = (event) => {
        console.log('Succesfully Connected (cpu)');
        socket2.send("start");
    }

    socket2.onmessage = msg => {
        cpu_usage = parseFloat(msg.data);
        //console.log(cpu_usage)
    }

    socket2.onclose = event => {
        console.log('Socket closed connection', socket2);
    }

    socket2.onerror = err => {
        console.log('Socket error: ', err);
    }
}


export { connect, cpu_data, memo_data, connect2, cpu_usage }

