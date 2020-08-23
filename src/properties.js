const domain = "https://ec2-35-168-3-98.compute-1.amazonaws.com";
export const apiUrl = domain + ":8443/api/";

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