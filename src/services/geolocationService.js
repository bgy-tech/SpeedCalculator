class GeolocationService {
    constructor(){
        this.x = document.getElementById("location");
    }

    getLocation()
    {
        //We check if the user has allowed for the browser to get his location
        if(navigator.geolocation){
           
            this.id = navigator.geolocation.watchPosition(
                position => this.success(position),
                err => this.error(err),
                {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
                }                      
            );

        } else {
            if (this.x) this.x.innerHTML = "Geolocation is not supported by this browser.";
        } 
    }
    stopTrackingId(){
        if (this.id != null) {
            navigator.geolocation.clearWatch(this.id);
            this.id = null;
        }
    }
   
    success(position){
        // longitude and latitude as string saved in html element
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (this.x) {
            this.x.innerHTML = "Latitude: " + latitude +
                "Longitude: " + longitude;
            log.console("Latitude: " + latitude +
                "Longitude: " + longitude)
        }

    }
    error(err){
       //error handling for geolocation request
        switch(err.code) {
            case error.PERMISSION_DENIED:
            this.x.innerHTML = "User denied the request for Geolocation."
            break;
            case error.POSITION_UNAVAILABLE:
            this.x.innerHTML = "Location information is unavailable."
            break;
            case error.TIMEOUT:
            this.x.innerHTML = "The request to get user location timed out."
            break;
            case error.UNKNOWN_ERROR:
            this.x.innerHTML = "An unknown error occurred."
            break;
        }
    }
}
