import { HaversineCalculator } from "./haversineCalculator.js";
 




class SpeedCalculatorService{
    constructor(whenSpeed){
        this.prev = null;
        this.whenSpeed = whenSpeed;
        this.MIN_DISTANCE_KM = 0.005; // 3 meters minim distance what should user move, ELSE dist == 0
        this.MIN_ACCURACY = 25; // meters. Reject readings worse than this.
        this.ALPHA = 0.8//for smoother speed(ex: 0-> 6 -> 0-> 4 to dont be like this)

        this.currentSmoothedSpeedKmh = 0;   
    }
        
    
    newPosition(current){
    // If we don't have a previous reading yet, save and wait for the next one
    if (this.prev == null) {
        this.prev = current;
       // console.log('saved first position, waiting for next', current);
        return; // don't compute speed on the first reading
    }

    if (current.accuracy > this.MIN_ACCURACY) {
            console.log(`Skipping position: Accuracy too low (${current.accuracy}m)`);
            return;
        }

    const distanceDiff = HaversineCalculator.distanceKm(
        this.prev.lat,
        this.prev.lon,
        current.lat,
        current.lon
    );
    const timeDiff = (current.time - this.prev.time) / 1000; // miliseconds -> seconds

//---part2: instant speed calculation---:
    
    let INSTANT_SPEED_KMH = 0;

    //console.log('prev:', this.prev, 'current:', current, 'distanceKm:', distanceDiff, 'timeS:', timeDiff);
    if (timeDiff == 0) return
   
    if (distanceDiff < this.MIN_DISTANCE_KM) {
            //console.log('distanceDiff < MIN_DISTANCE_KM, setting speed to 0');
        INSTANT_SPEED_KMH = 0;
        this.whenSpeed(INSTANT_SPEED_KMH);
        return;
    }else{

        if (timeDiff > 0){
            INSTANT_SPEED_KMH = (distanceDiff / timeDiff) * 3600; // km/h
        }

        this.prev = current;
    }
//---part3: smoothing speed calculation---: 

    //formula(smoothedSpeed): smoothedSpeed = aplha * newSpeed + (1 - aplha) * previousSpeed
    this.currentSmoothedSpeedKmh = 
      (this.ALPHA * INSTANT_SPEED_KMH)+
      (1 - this.ALPHA) * this.currentSmoothedSpeedKmh;

    //preventing tiny decimals/negative zero
    if (this.currentSmoothedSpeedKmh < 0.1) this.currentSmoothedSpeedKmh = 0;

    //if speed is too big, ignore it:
    if (this.currentSmoothedSpeedKmh > 250) return;


    this.whenSpeed(this.currentSmoothedSpeedKmh);

    }

}

export {SpeedCalculatorService};

























