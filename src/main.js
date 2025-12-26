import { GeolocationService } from './services/geolocationService.js';

document.addEventListener('DOMContentLoaded', () => {
    const geoService = new GeolocationService();

    const btnLocation = document.getElementById('location');
    if (btnLocation) {
        btnLocation.addEventListener('click', () => {
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


