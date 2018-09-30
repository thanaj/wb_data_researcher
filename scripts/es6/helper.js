export default function get(url){
  return new Promise(function(resolve, reject){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve(xhttp.response)
      } else {
        reject(xhttp.statusText);
      }
    };
    xhttp.onerror = function() {
      reject(xhttp.statusText)
    };
    xhttp.send();
  })
}
