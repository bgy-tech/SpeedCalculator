import { GeolocationService } from "./geolocationService";
import { HaversineCalculator } from "./haversineCalculator";
 




class SpeedCalculatorService{
    constructor(){
        this.distance = HaversineCalculator;
        this.latitude1 = GeolocationService.success.latitude;
        this.longitude1 = GeolocationService.success.longitude;
        this.latitude2 = lat2;
        this.longitude2 = lon2;
        this.time1 = time2;
        this.time2 = time1;
        



    }
    calcDistance(){
        const haversineDistance = new HaversineCalculator(
            this.longitude1,
            this.latitude1,
            this.longitude2,
            this.latitude2
        );
        ddistance =  haversineDistance.calculateTheA();
        return ddistance;
    }

    calculateTime(){
        dtime =(time1 - time2)/1000;
        return dtime;
    }


    calculateSpeed(ddistance = this.calcDistance(), dtime= this.calculateTime()){
        // Speed = Distance / Time
        const speed = ddistance / dtime; // speed in km/s
        return speed * 3.6; // convert to km/h
    }

}

