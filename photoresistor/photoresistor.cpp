#include "application.h"

int photoresistor = 0;

void setup()
{

  Spark.variable("photoresistor", &photoresistor, INT);

  pinMode(A2, INPUT);

}

void loop()
{
  photoresistor = analogRead(A2);
}


