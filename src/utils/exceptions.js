class BasicExceptions{
  constructor(message){
    this.message = "An unknown error occurred.";
    this.name = "BasicExceptions";//gives specific name in debugger to the error
    }
}

export class RequestDeniedError extends BasicExceptions{
    constructor(message= "User denied the request for Geolocation."){
    super(message);
    this.name = "RequestDeniedError";
    }
}
export class NoLocationError extends BasicExceptions{
    constructor(message= "Location information is unavailable."){
    super(message);
    this.name = "NoLocationError";
    }
}
export class RequestTimeOutError extends BasicExceptions{
    constructor(message = "The request to get user location timed out."){
    super(message);
    this.name = "RequestTimeOutError";
    }
}   


