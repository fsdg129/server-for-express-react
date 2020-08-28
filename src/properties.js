import {CORS_DOMAIN, CORS_PORT} from "../env";

var domain;
if(CORS_DOMAIN){
  domain = CORS_DOMAIN;
} else{
  domain = "localhost";
}

var port;
if(CORS_PORT){
  port = CORS_PORT;
} else{
  port = 8443;
}

export const apiUrl = "https://" + domain + ":" + port + "/api/";

export const createCorsInit = (method, authorization, data) => {
  let init = {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json',
      'Authorization' : 'Basic ' + window.btoa(authorization)
    },
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  };
  if(data == null){
    delete init.body;
  }
  if(authorization == null){
    delete init.headers.Authorization;
    init.credentials = 'omit';
  }
  
  return init;
};