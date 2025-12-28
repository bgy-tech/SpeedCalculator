export class BasicExceptions extends Error{
  constructor(message= "An unknown error occurred."){
    super(message);
    //this.name = "BasicExceptions";//gives specific name in debugger to the error.You have to do this for each error clas.
    //or:
    this.name = this.constructor.name;//gives for each subcalss in debugger the specific name of the error class.
    }
}

export class RequestDeniedError extends BasicExceptions{
    constructor(message= "User denied the request for Geolocation."){
    super(message);
    
    }
}
export class NoLocationError extends BasicExceptions{
    constructor(message= "Location information is unavailable."){
    super(message);
    
    }
}
export class RequestTimeOutError extends BasicExceptions{
    constructor(message = "The request to get user location timed out."){
    super(message);
    
    }
}   


