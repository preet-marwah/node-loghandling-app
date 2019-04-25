#!/bin/bash

CURRENTDATE=`date +"%Y-%m-%d-%T"`
#FILENAME = "TestAT-" + $CURRENTDATE

echo $FILENAME

npm test |& tee -a $CURRENTDATE