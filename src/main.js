import { GeolocationService } from './services/geolocationService.js';
import { SpeedCalculatorService } from './services/speedCalculatorServc.js';

document.addEventListener('DOMContentLoaded', () => {

    const output = document.getElementById('output');
    const positionEl = document.getElementById('position');

    const speedService = new SpeedCalculatorService(speed => {
        // show the computed speed
        if (output) output.textContent = 'Speed: ' + speed.toFixed(2) + ' km/h';
    });

     
   



    const geoService = new GeolocationService(pos => {
        // show raw position updates immediately so we can debug whether the device sends updates
        if (positionEl) {
            const lat = Number(pos.lat).toFixed(6);
            const lon = Number(pos.lon).toFixed(6);
            const time = pos.time ? new Date(pos.time).toLocaleTimeString() : new Date().toLocaleTimeString();
            positionEl.textContent = `Lat: ${lat}  Lon: ${lon}  (updated: ${time})`;
        }
        console.log('position callback', pos);
        speedService.newPosition(pos); // forward to speed calculator
    });

    const btnLocation = document.getElementById('location');
    if (btnLocation) {
        btnLocation.addEventListener('click', () => {
            if (output) output.textContent = 'Starting geolocation...';
            geoService.start();
        });
    }

    const btnStop = document.getElementById('stop');
    if (btnStop) {
        btnStop.addEventListener('click', () => {
            geoService.stopTrackingId();
        });
    }
});





