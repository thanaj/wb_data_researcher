import { default as get } from './helper.js';
import { default as variables } from './variables.js';

let obj = {}

function createObjectStore(event,storeName,configObj) {
  let db = event.target.result
  let objectStore = db.createObjectStore(storeName, configObj);
}

function createTransaction(db,storeName){
  let transaction = db.transaction([storeName], "readwrite");
  transaction.oncomplete = function(event) {
    console.log('oncomplete transction', event);
  };
  transaction.onerror = function(event) {
    console.log('onerror transction', event)
  };
  return transaction;
}

function addRecord(event,dataToBeAdd,promiseFn ){
  let db = event.target.result;
  let transaction = createTransaction(db,variables.IND_DB_STORE_NAME);
  let objectStore = transaction.objectStore(variables.IND_DB_STORE_NAME);

  //let query = objectStore.get(lookedValue)
  let result;

  let objectStore1 = transaction.objectStore(variables.IND_DB_STORE_NAME);
  let addRequest = objectStore1.add(dataToBeAdd);
  addRequest.oncomplete = function(event) {
    console.log('addRequest complete', event)
    promiseFn.resolve(event)
  };
  addRequest.onerror = function(event) {
    console.log('addRequest error', event)
    console.log('addRequest onerror',event.target.error)
    promiseFn.reject(event)
  };
  /*
  query.onerror = function(event) {
    console.log('query error',event)
    promiseFn.reject(event)
    //return result;
  };
  query.onsuccess = function(event) {
    console.log('query sukces',event)
    result = event.target.result
    promiseFn.resolve(result)
    //return result;
  };
  */
}





function requestOpenDb(promiseFn){
  console.log(promiseFn)
  let indexedDb = window.indexedDB;
  let request;
  if(indexedDb){
    let request = indexedDb.open(variables.IND_DB_STORE_NAME);
    request.onupgradeneeded = function(event) {
      console.log('request onupgradeneeded', event);
      createObjectStore(event,storeName,configObj)
    }

    request.onblocked = function(event) {
      console.log('request blocked', event)
      promiseFn.reject(event)
    }

    request.onerror = function(event) {
      console.log('request onerror', event)
      promiseFn.reject(event)
    };

    return request
  }
  return request;
}


function addData(dataToBeAdd) {
  return new Promise((resolve,reject)=>{
    let promiseObj = {resolve,reject};

    let request = requestOpenDb(promiseObj)
    request.onsuccess = function(event) {
      console.log('request onsuccess', event)
      return addRecord(event,dataToBeAdd, promiseObj)
    };


  })

};


obj = {
  addData
}

export default obj;
