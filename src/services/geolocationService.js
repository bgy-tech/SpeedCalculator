import { RequestDeniedError, NoLocationError, RequestTimeOutError, BasicExceptions } from '../utils/exceptions.js';
export class GeolocationService {
    constructor(whenPosition){
        // prefer a dedicated output element if present, otherwise fall back to the button
        this.whenPosition = whenPosition
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
        const data = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy,//capture accuracy of browser (in meters)
            time: position.timestamp    
        }
        this.whenPosition(data);
        }
        

    
    
    error(err){
       //error handling for geolocation request
        //err.PERMISSION_DENIED=1;
        //err.POSITION_UNAVAILABLE=2;
        //err.TIMEOUT=3;
        //err.UNKNOWN_ERROR=4;
        // Map numeric codes to messages and surface them in the UI instead of throwing
        let msg = 'An unknown geolocation error occurred.';
        switch(err.code) {
            case 1:
                msg = 'User denied the request for Geolocation.';
                break;
            case 2:
                msg = 'Location information is unavailable.';
                break;
            case 3:
                msg = 'The request to get user location timed out.';
                break;
            default:
                msg = (err && err.message) ? err.message : msg;
                break;
        }
        console.error('Geolocation error:', err);
        // try to show the message on the page if an #output element exists
        const out = document.getElementById('output');
        if (out) out.textContent = msg;
        // also inform the caller via whenPosition (optional) so UI can react
        try {
            if (this.whenPosition) this.whenPosition({ error: true, message: msg });
        } catch (e) {
            // swallow any errors from the callback to avoid unhandled exceptions
            console.error('whenPosition callback threw while reporting error', e);
        }
    }
}

