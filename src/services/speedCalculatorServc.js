import { HaversineCalculator } from "./haversineCalculator.js";
 




class SpeedCalculatorService{
    constructor(whenSpeed){
        this.prev = null;
        this.whenSpeed = whenSpeed;
    }
        
    
    newPosition(current){
    // If we don't have a previous reading yet, save and wait for the next one
    if (this.prev == null) {
        this.prev = current;
        console.log('saved first position, waiting for next', current);
        return; // don't compute speed on the first reading
    }

    const distanceDiff = HaversineCalculator.distanceKm(
        this.prev.lat,
        this.prev.lon,
        current.lat,
        current.lon
    );
    const timeDiff = (current.time - this.prev.time) / 1000; // seconds

    console.log('prev:', this.prev, 'current:', current, 'distanceKm:', distanceDiff, 'timeS:', timeDiff);

    if (timeDiff > 0) {
        const speedInKmH = (distanceDiff / timeDiff) * 3600; // km/h
        // if distance is essentially zero, this will be 0
        this.whenSpeed(speedInKmH);
        console.log('computed speed km/h:', speedInKmH);
    }

    this.prev = current;
    }  
}

export {SpeedCalculatorService};

























