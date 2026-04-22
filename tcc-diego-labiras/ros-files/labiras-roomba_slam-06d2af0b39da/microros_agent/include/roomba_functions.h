#include <Arduino.h>
#include <HardwareSerial.h>
#include <vector>

#define clamp(value, min, max) (value < min ? min : value > max ? max \
                                                                : value)

#define ON 1
#define OFF 0
#define LED_PIN 2

int ddPin = 5;

byte single_byte_packets[22] = {7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 21, 24, 34, 35, 36, 37, 38, 45, 52, 53, 58};

HardwareSerial Roomba(1);

bool debrisLED;
bool spotLED;
bool dockLED;
bool warningLED;

byte color;
byte intensity;

// enum packetIds
// {
//     // todos enviados dentro do pacote 7, precisam descompactar o byte na recuperação
//     rightBumper = 101,
//     leftBumper = 102,
//     rightWheelDrop = 103,
//     leftWheelDrop = 104,

//     // todos enviados dentro do pacote 14, precisam descompactar o byte na recuperação
//     sideBrushOvercurrent = 105,
//     mainBrushOvercurrent = 106,
//     rightWheelOvercurrent = 107,
//     leftWheelOvercurrent = 108,

//     // todos enviados dentro do pacote 18, precisam descompactar o byte na recuperação
//     cleanButton = 109,
//     spotButton = 110,
//     dockButton = 111,
//     minuteButton = 112,
//     hourButton = 113,
//     dayButton = 114,
//     scheduleButton = 115,
//     clockButton = 116,

//     // todos enviados dentro do pacote 45, precisam descompactar o byte na recuperação
//     lightBumperLeft = 117,
//     lightBumperFrontLeft = 118,
//     lightBumperCenterLeft = 119,
//     lightBumperCenterRight = 120,
//     lightBumperFrontRight = 121,
//     lightBumperRight = 122,

//     // valores booleanos
//     wallSensor = 8,
//     leftCliff = 9,
//     frontLeftCliff = 10,
//     frontRightCliff = 11,
//     rightCliff = 12,
//     virtualWall = 13,
//     songPlaying = 37,
//     stasis = 58,

//     // valores byte
//     dirtDetector = 15,
//     irOmnidirectional = 17,
//     irLeft = 52,
//     irRight = 53,
//     chargingState = 21,   // 0-5
//     chargingSources = 34, // 0-3
//     operationalMode = 35, // 0-3
//     songNumber = 36,      // 0-15
//     streamPackets = 38,   // 0-108

//     // valores caracteres
//     batteryTempInC = 24,

//     // valores inteiros
//     distanceTraveled = 19,
//     degreesTurned = 20,
//     currentFlow = 23,
//     wallSignal = 27,            // 0-1027
//     leftCliffSignal = 28,       // 0-4095
//     frontLeftCliffSignal = 29,  // 0-4095
//     frontRightCliffSignal = 30, // 0-4095
//     rightCliffSignal = 31,      // 0-4095
//     requestedVelocity = 39,     //-500 - 500
//     requestedRadius = 40,
//     requestedRightVelocity = 41,       //-500 - 500
//     requestedLeftVelocity = 42,        //-500 - 500
//     lightBumperLeftSignal = 46,        // 0-4095
//     lightBumperFrontLeftSignal = 47,   // 0-4095
//     lightBumperCenterLeftSignal = 48,  // 0-4095
//     lightBumperCenterRightSignal = 49, // 0-4095
//     lightBumperFrontRightSignal = 50,  // 0-4095
//     lightBumperRightSignal = 51,       // 0-4095
//     leftMotorCurrent = 54,
//     rightMotorCurrent = 55,
//     mainBrushCurrent = 56,
//     sideBrushCurrent = 57,

//     // valores inteiros não sinalizados
//     batteryVoltage = 22,
//     batterCharge = 25,
//     batteryCapacity = 26,
//     leftEncoderCount = 43,
//     rightEncoderCount = 44
// };


/* Funções para LEDs */

void setPowerLED(byte setColor, byte setIntensity)
{
    color = setColor;
    intensity = setIntensity;
    Roomba.write(139);
    Roomba.write((byte)0x00);
    Roomba.write((byte)color);
    Roomba.write((byte)intensity);
}

void setWarningLED(bool enable)
{
    warningLED = enable;
    Roomba.write(139);
    Roomba.write((debrisLED ? 1 : 0) + (spotLED ? 2 : 0) + (dockLED ? 4 : 0) + (warningLED ? 8 : 0));
    Roomba.write((byte)color);
    Roomba.write((byte)intensity);
}

/* Funções gerais do Roomba */

void wakeUp(void)
{
    setWarningLED(ON);
    digitalWrite(ddPin, HIGH);
    delay(100);
    digitalWrite(ddPin, LOW);
    delay(500);
    digitalWrite(ddPin, HIGH);
    delay(2000);
}

void startSafe()
{
    Roomba.write(128); // começa
    Roomba.write(131); // modo seguro
}

void startFull()
{
    Roomba.write(128); // começa
    Roomba.write(132); // modo completo
    delay(1000);
}

/* Funções para motores */

void driveWheels(int right, int left)
{
    clamp(right, -500, 500);
    clamp(left, -500, 500);

    Roomba.write(145);
    Roomba.write(right >> 8);
    Roomba.write(right);
    Roomba.write(left >> 8);
    Roomba.write(left);
}

void drive(const float xVel, const float angularVel){
    float leftVel = xVel*1000 - 117.5 * angularVel*2;
    float rightVel = xVel*1000 + 117.5 * angularVel*2;
    driveWheels(rightVel, leftVel);
}

void driveStop(void)
{
    driveWheels(0, 0);
}

void driveWheelsPWM(int rightPWM, int leftPWM)
{
  clamp(rightPWM, -255, 255);
  clamp(leftPWM, -255, 255);
  
  Roomba.write(146);
  Roomba.write(rightPWM >> 8);
  Roomba.write(rightPWM);
  Roomba.write(leftPWM >> 8);
  Roomba.write(leftPWM);
}
// Adicionando música
std::vector<int> naruto_song = {140, 0, 13, 76, 64, 2, 2, 76, 16, 78, 16, 79, 32, 78, 64, 74, 64, 76, 64, 2, 2, 76, 16, 78, 16, 79, 32, 81, 64};


void add_song(std::vector<int> song){
  for (int i = 0; i < song.size(); i++){
    Roomba.write(song[i]);
  }
}

void play_song(int song_ID){
  Roomba.write(141);
  Roomba.write(song_ID);
}


bool is_in_array(byte val)
{
  for (int i = 0; i < 22; i++)
  {
    if (val == single_byte_packets[i])
    {
      return true;
    }
  }
  return false;
}

std::vector<int>  getSensorData()
{
  std::vector<int> packetIDs = {7, 45, 9, 10, 11, 12, 21, 22, 23, 24, 25, 26, 41, 42, 43, 44};
  int n = 0;
  int n2 = 0;
  int l = packetIDs.size();
  std::vector<int> returnVal;

  Roomba.write(148);
  Roomba.write(l);

  for (int i = 0; i < l; i++)
  {
    Roomba.write(packetIDs[i]);
    is_in_array(packetIDs[i]) ? n++ : n2++;
  }

  while (!Roomba.available())
      ;

  for (int i = 0; i < (3 + n * 2 + n2 * 3); i++)
  {
    int data = Roomba.read();
    if(i>1){
      returnVal.push_back(data);
    }
  }
  Roomba.write(150);
  Roomba.write(0);
  returnVal.pop_back();
  for (int i=0; i<returnVal.size(); i++){
    if(is_in_array(returnVal[i])){
      returnVal.erase(returnVal.begin()+i);
    }
    else{
      returnVal.erase(returnVal.begin()+i);
      returnVal[i] = returnVal[i]*255+returnVal[i+1];
      returnVal.erase(returnVal.begin()+i+1);
    }
  }
  return returnVal;
}