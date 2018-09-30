import { default as get } from './helper.js';
import { default as variables } from './variables.js';

let obj = {}


variables.IND_DB_STORE_NAME

function readData(lookedValue){
  return new Promise(resolve, reject) => {
    let indexedDb = window.indexedDB;
    let request = indexedDb.open(storeName);

    request.onupgradeneeded = function(event) {
      console.log('request onupgradeneeded', event);

      event.stopPropagation()
      let db = event.target.result
      let objectStore = db.createObjectStore(storeName, {
        keyPath: "name",
        autoIncrement: true
      });

      objectStore.createIndex("name", "name", {
        unique: true
      });
    }

    request.onerror = function(event) {
      console.log('request onerror', event)
      reject(event)
    };
    request.onsuccess = function(event) {
      console.log('request onsuccess', event)
      let db = event.target.result;
      let transaction = db.transaction([storeName], );
      let objectStore = transaction.objectStore(storeName);
      console.log('objStore: ',objectStore)
      let index = objectStore.index(indexName)
      let zapytanie = index.get(numer)
      //let zapytanie = objectStore.get(numer);

      zapytanie.onerror = function(event) {
        // Handle errors!
        console.log('zapytanie error',event)
        reject(event)
      };
      zapytanie.onsuccess = function(event) {
        // Do something with the request.result!
        //alert("Name for SSN 444-44-4444 is " + request.result.name);
        let result = event.target.result
        console.log('zapytanie result',event.target.result)
        if(result){
          output.innerHTML = JSON.stringify(result)
          console.log('zapytanie success 1 ',result.name,event)
          resolve(result)
        }else{
          console.log('zapytanie success 2',result,event)
          resolve(result)
        }

        //console.log('zapytanie',zapytanie)
      };
    }


  }
}







obj = {

}

export default obj;
