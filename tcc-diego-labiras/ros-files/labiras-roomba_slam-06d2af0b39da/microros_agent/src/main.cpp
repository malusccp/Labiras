#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncElegantOTA.h>

#include <stdio.h>
#include <micro_ros_platformio.h>

#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>

#include <create_msgs/msg/pwm_wheel.h>
#include <std_msgs.h>
#include <irobot_create_msgs.h>

#include <roomba_functions.h>
#include <vector>

#if !defined(ESP32) && !defined(TARGET_PORTENTA_H7_M7) && !defined(ARDUINO_NANO_RP2040_CONNECT)
#error This example is only avaible for Arduino Portenta, Arduino Nano RP2040 Connect and ESP32 Dev module
#endif

#define RCCHECK(fn)              \
  {                              \
    rcl_ret_t temp_rc = fn;      \
    if ((temp_rc != RCL_RET_OK)) \
    {                            \
      error_loop();              \
    }                            \
  }
#define RCSOFTCHECK(fn)          \
  {                              \
    rcl_ret_t temp_rc = fn;      \
    if ((temp_rc != RCL_RET_OK)) \
    {                            \
    }                            \
  }

// Setting subscribers

rcl_subscription_t pwm_wheel_sub;
create_msgs__msg__PwmWheel pwm_wheel_msg;

rcl_subscription_t dock_sub;
std_msgs__msg__Bool dock_msg;

// Setting publishers

rcl_publisher_t battery;
create_msgs__msg__Battery battery_msg;

rcl_publisher_t bumper;
create_msgs__msg__Bumper bumper_msg;

rcl_publisher_t charging;
create_msgs__msg__ChargingState charging_msg;

rcl_publisher_t cliff;
create_msgs__msg__Cliff cliff_msg;

rcl_publisher_t wheels;
create_msgs__msg__Wheels wheels_msg;

// rcl_publisher_t testing;
// create_msgs__msg__Testing testing_msg;

// Create node object
rcl_node_t node;
const char *node_name_ = "roomba";

// Node namespace (Can remain empty "")
const char *namespace_ = "diff_cont";

char *ssid = "HUAWEI-2.4G-S7mw";
char *password = "labirasifpi";
IPAddress ip(192, 168, 100, 43);


bool serv_dock = 0;
bool serv_reset = 0;

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// MicroRos arguments
rcl_allocator_t allocator;
rclc_executor_t executor;
rclc_support_t support;
rcl_timer_t timer;

std_msgs__msg__Header header;

void error_loop()
{
  while (1)
  {
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    delay(100);
  }
}



const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <title>ESP Web Server</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:,">
  <style>
  html {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }
  h1 {
    font-size: 1.8rem;
    color: white;
  }
  h2{
    font-size: 1.5rem;
    font-weight: bold;
    color: #143642;
  }
  .topnav {
    overflow: hidden;
    background-color: #143642;
  }
  body {
    margin: 0;
  }
  .content {
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
  }
  .card {
    background-color: #F8F7F9;;
    box-shadow: 2px 2px 12px 1px rgba(140,140,140,.5);
    padding-top:10px;
    padding-bottom:20px;
    width: 400px;
    margin-left: 100px;
  }
  .button {
    padding: 15px 50px;
    font-size: 24px;
    text-align: center;
    outline: none;
    color: #fff;
    background-color: #0f8b8d;
    border: none;
    border-radius: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
   }
   /*.button:hover {background-color: #0f8b8d}*/
   .button:active {
     background-color: #0f8b8d;
     box-shadow: 2 2px #CDCDCD;
     transform: translateY(2px);
   }
   .state {
     font-size: 1.5rem;
     color:#8c8c8c;
     font-weight: bold;
   }
  </style>
<title>ESP Web Server</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:,">
</head>
<body>
  <div class="topnav">
    <h1>ESP WebSocket Server</h1>
  </div>
  <div class="content">
    <div class="card">
      <h2>Servico -  DOCK</h2>
      <p class="state">state: <span id="state1">%STATE1%</span></p>
      <p><button id="button1" class="button">Toggle</button></p>
    </div>
    <div class="card">
      <h2>Servico -  Reset Robotic Platform</h2>
      <p class="state">state: <span id="state2">%STATE2%</span></p>
      <p><button id="button2" class="button">Toggle</button></p>
    </div>
  </div>
  <div class="content">
    <div class="card">
      <h2>Sensor bateria</h2>
      <p class="state">state: <span id="sensor1">%SENSOR1%</span></p>
    </div>
    <div class="card">
      <h2>Sensor bumper</h2>
      <p class="state">state: <span id="sensor2">%SENSOR2%</span></p>
    </div>
  </div>
<script>
  var gateway = `ws://${window.location.hostname}/ws`;
  var websocket;
  window.addEventListener('load', onLoad);
  function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
    websocket.onmessage = onMessage; // <-- add this line
  }
  function onOpen(event) {
    console.log('Connection opened');
  }
  function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
  }
  function onMessage(event) {
    console.log(event)
    var state;
    if (event.data == "10"){
      state = "Servico Nao Requisitado";
      document.getElementById('state1').innerHTML = state;
    }
    else if (event.data == "11"){
      state = "Servico Requisitado";
      document.getElementById('state1').innerHTML = state;
    }
    else if (event.data == "20"){
      state = "Servico Nao Requisitado";
      document.getElementById('state2').innerHTML = state;
    }
    else if (event.data == "21"){
      state = "Servico Requisitado";
      document.getElementById('state2').innerHTML = state;
    }else{
      var input_data = event.data.split(":")
      console.log(input_data);
      if (input_data[0] == "S01"){
        document.getElementById('sensor1').innerHTML =  input_data[1];
      }
      else if (input_data[0] == "S02"){
        document.getElementById('sensor2').innerHTML =  input_data[1];
      }
    }
  }
  function onLoad(event) {
    initWebSocket();
    initButton();
  }
  function initButton() {
    document.getElementById('button1').addEventListener('click', toggle1);
    document.getElementById('button2').addEventListener('click', toggle2);
  }
  function toggle1(){
    websocket.send('toggle1');
  }
  function toggle2(){
    websocket.send('toggle2');
  }
</script>
</body>
</html>)rawliteral";

void notifyClients1() {
  ws.textAll("1"+String(serv_dock));
  Roomba.write(143);
}
void notifyClients2() {
  ws.textAll("2"+String(serv_reset));
}
void notifyClients3() {
  ws.textAll("S01:"+String(battery_msg.charge));
  ws.textAll("S02:Direito = "+String(bumper_msg.is_right_pressed)+", Esquerda = "+bumper_msg.is_left_pressed);
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    if (strcmp((char*)data, "toggle1") == 0) {
      serv_dock = !serv_dock;
      notifyClients1();
    }
    if (strcmp((char*)data, "toggle2") == 0) {
      serv_reset = !serv_reset;
      notifyClients2();
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

String processor(const String& var){
  Serial.println(var);
  if(var == "STATE1"){
    if (serv_dock){
      return "Servico Requisitado";
    }
    else{
      return "Servico Nao Requisitado";
    }
  }
  if(var == "STATE2"){
    if (serv_reset){
      return "Servico Requisitado";
    }
    else{
      return "Servico Nao Requisitado";
    }
  }
  return String();
}

void timer_callback(rcl_timer_t *timer, int64_t last_call_time)
{
  RCLC_UNUSED(last_call_time);
  if (timer != NULL)
  {
    std::vector<int> data = getSensorData();
    /*
    These are the packages returned by getSensorData() function.
    To change the values, go to roomba_functions.h

    [0]  bumper = 7;
    [1]  light_bumper = 45;
    [2]  cliff_left = 9;
    [3]  cliff_front_left = 10;
    [4]  cliff_front_right = 11;
    [5]  cliff_right = 12;
    [6]  chargin_state = 21;
    [7]  voltage = 22;
    [8]  current = 23;
    [9]  temperature = 24;
    [10] charge = 25;
    [11] capacity = 26;
    [12] velocity_right = 41;
    [13] velocity_left = 42;
    [14] encoder_left = 43;
    [15] encoder_right = 44;
    */

    header.stamp.sec = millis() / 1000;
    header.stamp.nanosec = RCL_MS_TO_NS(millis());

    // for testing (angle, distance)
    // testing_msg.angle = data[17];
    // testing_msg.distance = data[16];

    // filling bumper_msg
    bumper_msg.header = header;
    bumper_msg.is_right_pressed = (bitRead(data[0], 0)) == 1 ? true : false;
    bumper_msg.is_left_pressed = (bitRead(data[0], 1)) == 1 ? true : false;
    bumper_msg.is_light_left = (bitRead(data[45], 0)) == 1 ? true : false;
    bumper_msg.is_light_front_left = (bitRead(data[45], 1)) == 1 ? true : false;
    bumper_msg.is_light_center_left = (bitRead(data[45], 2)) == 1 ? true : false;
    bumper_msg.is_light_center_right = (bitRead(data[45], 3)) == 1 ? true : false;
    bumper_msg.is_light_front_right = (bitRead(data[45], 4)) == 1 ? true : false;
    bumper_msg.is_light_right = (bitRead(data[45], 5)) == 1 ? true : false;

    // filling cliff_msg
    cliff_msg.header = header;
    cliff_msg.is_cliff_left = data[2];
    cliff_msg.is_cliff_front_left = data[3];
    cliff_msg.is_cliff_right = data[4];
    cliff_msg.is_cliff_front_right = data[5];

    // filling charging_msg
    charging_msg.header = header;
    charging_msg.state = data[6];

    // filling battery_msg
    battery_msg.header = header;
    battery_msg.voltage = data[7];
    battery_msg.current = data[8];
    battery_msg.temperature = data[9];
    battery_msg.charge = data[10];
    battery_msg.capacity = data[11];

    // filling wheels_msg
    wheels_msg.header = header;
    wheels_msg.drop_left = (bitRead(data[0], 3)) == 1 ? true : false;
    wheels_msg.encoder_counts_left = data[14];
    wheels_msg.velocity_left = data[13];
    wheels_msg.drop_right = (bitRead(data[0], 2)) == 1 ? true : false;
    wheels_msg.encoder_counts_right = data[15];
    wheels_msg.velocity_right = data[12];

    RCSOFTCHECK(rcl_publish(&battery, &battery_msg, NULL));
    RCSOFTCHECK(rcl_publish(&bumper, &bumper_msg, NULL));
    RCSOFTCHECK(rcl_publish(&charging, &charging_msg, NULL));
    RCSOFTCHECK(rcl_publish(&cliff, &cliff_msg, NULL));
    RCSOFTCHECK(rcl_publish(&wheels, &wheels_msg, NULL));
    notifyClients3();
    // RCSOFTCHECK(rcl_publish(&testing, &testing_msg, NULL));
  }
}

void pwm_wheel_callback(const void *msgin)
{
  const create_msgs__msg__PwmWheel *msg = (const create_msgs__msg__PwmWheel *)msgin;

  driveWheelsPWM(msg->pwm_right_wheel, msg->pwm_left_wheel);
  
}

void dock_callback(const void *msgin)
{
  const std_msgs__msg__Bool *msg = (const std_msgs__msg__Bool *)msgin;
  (msg->data == true) ? Roomba.write(143) : false;
}

void setup()
{
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP Local IP Address
  Serial.println(WiFi.localIP());

  initWebSocket();

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });

  // Start ElegantOTA
  AsyncElegantOTA.begin(&server);
  // Start server
  server.begin();
  Serial.println("HTTP server started");

  // wifi communication


  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);
  Serial.begin(115200);
  set_microros_serial_transports(Serial);
  Roomba.begin(115200, SERIAL_8N1, 16, 17);
  pinMode(5, OUTPUT);
  wakeUp();
  startFull();
  delay(2000);
  add_song(naruto_song);

  play_song(0);

  allocator = rcl_get_default_allocator();

  // create init_options
  RCCHECK(rclc_support_init(&support, 0, NULL, &allocator));

  // create node
  RCCHECK(rclc_node_init_default(&node, node_name_, namespace_, &support));

  // create subscribers
  RCCHECK(rclc_subscription_init_default(
      &pwm_wheel_sub,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, PwmWheel),
      "pwm_wheel"));

  RCCHECK(rclc_subscription_init_default(
      &dock_sub,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Bool),
      "dock"));

  // create publishers
  RCCHECK(rclc_publisher_init_default(
      &battery,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, Battery),
      "battery"));

  RCCHECK(rclc_publisher_init_default(
      &bumper,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, Bumper),
      "bumper"));

  RCCHECK(rclc_publisher_init_default(
      &charging,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, ChargingState),
      "charging_state"));

  RCCHECK(rclc_publisher_init_default(
      &cliff,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, Cliff),
      "cliff"));

  RCCHECK(rclc_publisher_init_default(
      &wheels,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, Wheels),
      "wheels"));
  // RCCHECK(rclc_publisher_init_default(
  //     &testing,
  //     &node,
  //     ROSIDL_GET_MSG_TYPE_SUPPORT(create_msgs, msg, Testing),
  //     "testing"));

  // create timer,
  const unsigned int timer_timeout = 1000;
  RCCHECK(rclc_timer_init_default(
      &timer,
      &support,
      RCL_MS_TO_NS(timer_timeout),
      timer_callback));

  // create executor
  RCCHECK(rclc_executor_init(&executor, &support.context, 3, &allocator));
  RCCHECK(rclc_executor_add_subscription(&executor, &pwm_wheel_sub, &pwm_wheel_msg, &pwm_wheel_callback, ON_NEW_DATA));
  RCCHECK(rclc_executor_add_subscription(&executor, &dock_sub, &dock_msg, &dock_callback, ON_NEW_DATA));
  RCCHECK(rclc_executor_add_timer(&executor, &timer));
}

void loop()
{
  ws.cleanupClients();
  RCCHECK(rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100)));
}
