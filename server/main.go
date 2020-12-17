package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true }, //Allow any connection into my web socket endpoint
}

//Listen for messages being set to our websocket enpoint
func reader(ws *websocket.Conn) {

	for { //for loop that run forever (like a while(true))

		messageType, _, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		for {
			data_cpu, err := ioutil.ReadFile("/proc/cpu_201612113")
			if err != nil {
				fmt.Println("File reading error", err)
				return
			}

			ws.WriteMessage(messageType, []byte(string(data_cpu)))

			data_memo, err := ioutil.ReadFile("/proc/memo_201612113")
			if err != nil {
				fmt.Println("File reading error", err)
				return
			}

			ws.WriteMessage(messageType, []byte(string(data_memo)))
			time.Sleep(2 * time.Second)
		}

	}
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to my Socket Server")
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil) //Upgrade this connection to a websocket connection
	if err != nil {
		log.Println(err)
		return
	}
	log.Println("Client succesfully connected")
	reader(ws) //Listen indefinitely for new messages coming through on our ws connection
}

func main() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsHandler)
	log.Println("Server on port :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

//$HOME/go/bin/CompileDaemon --command="./server"
