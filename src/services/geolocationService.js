import { RequestDeniedError, NoLocationError, RequestTimeOutError, BasicExceptions } from '../utils/exceptions.js';
export class GeolocationService {
    constructor(realPosition){
        // prefer a dedicated output element if present, otherwise fall back to the button
        this.realPosition = realPosition
        this.id = null;
        
        
    }

    start(){
        //We check if the user has allowed for the browser to get his location
        if(!navigator.geolocation){
            
            throw new Error( "Geolocation is not supported by this browser.");
        }
            if (this.id != null) return; 

        this.id = navigator.geolocation.watchPosition(
            position => this.success(position),//anonymous function
            err => this.error(err),//anonymous function
            {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
            }                      
        );

    } 
           
        
    

    stopTrackingId(){
        if (this.id != null) {
            navigator.geolocation.clearWatch(this.id);
            this.id = null;
        }
        

    }

    
   
    success(position){
        data = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            time: position.timestamp    
        }
         return this.realPosition(data);
        }
        

    
    
    error(err){
       //error handling for geolocation request
        //err.PERMISSION_DENIED=1;
        //err.POSITION_UNAVAILABLE=2;
        //err.TIMEOUT=3;
        //err.UNKNOWN_ERROR=4;
        switch(err.code) {
            case 1:
                throw new  RequestDeniedError();
            case 2:
                throw new NoLocationError();
            case 3:
                throw new RequestTimeOutError();
            default:
                throw new BasicExceptions();
        }
    }
}

