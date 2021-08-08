#include "SR04.h"

int trig = 12;
int echo = 11;


SR04 sensor = SR04(echo, trig);

long distance;

void setup() {
  // put your setup code here, to run once:
  delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
  distance = sensor.Distance();
  Serial.println(distance);
  
  delay(1000);

}
