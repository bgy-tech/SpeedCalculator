//we write in camel case
//this code defines the Haversine formula, which is used for calculating a nearly precise distance between two ponints 

// services/haversineCalculator.js
export class HaversineCalculator {

    static toRad(deg) {
        return deg * Math.PI / 180;
    }

    static distanceKm(lat1, lon1, lat2, lon2) {//static: method belongs to the class itself not for any specific instance
        const R = 6371; // Earth radius in km

        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(this.toRad(lat1)) *
            Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
