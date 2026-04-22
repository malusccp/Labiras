import ROSLIB, { Message } from 'roslib'

// Message {
//   header: { stamp: { sec: 0, nanosec: 0 }, frame_id: '' },
//   voltage: 12,
//   current: 5,
//   temperature: 40,
//   charge: 4532,
//   capacity: 7000
// }


class BatteryMessage {
  private _message: any
  private _charge: number


  constructor(message: any) {
    // super(message)

    this._message = message
    this._charge = message.header
  }


  public get charge(): number {
    return this._charge
  }

  


}


function App() {
  const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });

  ros.on("connection", () => console.log("connected"))

  // ros.addListener("message", (event) => console.log(event))


  const listener = new ROSLIB.Topic({
    ros: ros,
    name: '/topic',
    messageType: 'create_msgs/msg/Battery'
  });

  listener.subscribe(function (message) {


    //console.log('Received message on ' + listener.name + ': ', message);
    const formattedMessage = new BatteryMessage(message)

    console.log(
      formattedMessage.charge
    );

    // console.log("Message type");

    // console.log(listener.messageType);


    listener.unsubscribe();
  });
}

App()