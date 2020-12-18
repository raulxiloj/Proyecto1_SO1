package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
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

func getCPU() (idle, total uint64) {
	contents, err := ioutil.ReadFile("/proc/stat")
	if err != nil {
		return
	}
	lines := strings.Split(string(contents), "\n")
	for _, line := range lines {
		fields := strings.Fields(line)
		if fields[0] == "cpu" {
			numFields := len(fields)
			for i := 1; i < numFields; i++ {
				val, err := strconv.ParseUint(fields[i], 10, 64)
				if err != nil {
					fmt.Println("Error: ", i, fields[i], err)
				}
				total += val //tally up all the numbers to get total ticks
				if i == 4 {
					idle = val
				}
			}
			return
		}
	}
	return
}

func readerCPU(ws *websocket.Conn) {
	for { //for loop that run forever (like a while(true))

		messageType, _, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		for {
			idle0, total0 := getCPU()
			time.Sleep(1 * time.Second)
			idle1, total1 := getCPU()

			idleTicks := float64(idle1 - idle0)
			totalTicks := float64(total1 - total0)
			cpuUsage := 100 * (totalTicks - idleTicks) / totalTicks
			fmt.Printf("CPU usage is %f%% ", cpuUsage)
			ws.WriteMessage(messageType, []byte(strconv.FormatFloat(cpuUsage, 'f', 2, 64)))
			time.Sleep(1 * time.Second)
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

func cpuHandler(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println("Client Succesfully connected to cpu socket")
	readerCPU(ws)
}

func main() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsHandler)
	http.HandleFunc("/ws2", cpuHandler)
	log.Println("Server on port :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

//$HOME/go/bin/CompileDaemon --command="./server"
