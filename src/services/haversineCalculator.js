//we write in camel case
//this code defines the Haversine formula, which is used for calculating a nearly precise distance between two ponints 

class HaversineCalculator {
    constructor(lon1, lat1, lon2, lat2){
        this.lon1 = lon1;
        this.lat1 = lat1;
        this.lon2 = lon2;
        this.lat2 = lat2;
        this.EarthRadius = 6371; // Radius of the Earth in kilometers
    }
    calculateTheA(this){
        var dLon=geoToRad(this.lon2-this.lon1)
        var dLat=geoToRad(this.lat2-this.lat1)

        var a=this.Math.sin(dLat/2) * this.Math.sin(dLat/2) +
        this.Math.cos(this.lat1) * this.Math.cos(this.lat2) *
        this.Math.sin(dLon/2) * this.Math.sin(dLon/2);

        var c = 2 * this.Math.atan2(this.Math.sqrt(a), this.Math.sqrt(1-a));
        var distance=this.EarthRadius * c;
        return distance;
    }
    geoToRad(degrees){
        return degrees * (this.Math.PI/180);
    }
}