import { default as get } from './helper.js';
import { default as variables } from './variables.js';

let obj = {}
let keyPath = 'query';
let storeName = 'world-bank-data-researcher';
let configObj = { keyPath: 'query'}



function createObjectStore(event,storeName,configObj) {
  let db = event.target.result
  let objectStore = db.createObjectStore(storeName, configObj);
}

function createTransaction(db,storeName){
  let transaction = db.transaction([storeName], );
  transaction.oncomplete = function(event) {
    //console.log('oncomplete transction', event);
  };
  transaction.onerror = function(event) {
    console.log('onerror transction', event)
  };
  return transaction;

}

function readRecord(event,lookedValue,promiseFn ){
  let db = event.target.result;
  let transaction = createTransaction(db,storeName);
  let objectStore = transaction.objectStore(storeName);
  let query = objectStore.get(lookedValue)
  let result;

  query.onerror = function(event) {
    console.log('query error',event)
    promiseFn.reject(event)
    //return result;
  };
  query.onsuccess = function(event) {
    //console.log('query sukces',event)
    result = event.target.result
    promiseFn.resolve(result)
    //return result;
  };
}
function requestOpenDb(promiseFn){
  //console.log(promiseFn)
  let indexedDb = window.indexedDB;
  let request;
  if(indexedDb){
    let request = indexedDb.open(storeName);
    request.onupgradeneeded = function(event) {
      //console.log('request onupgradeneeded', event);
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

function readData(lookedValue) {
  return new Promise((resolve,reject)=>{
    let promiseObj = {resolve,reject};
    let request = requestOpenDb(promiseObj)
    request.onsuccess = function(event) {
      //console.log('request onsuccess', event)
      return readRecord(event,lookedValue, promiseObj)
    };
  })
};



function createData(key,value) {
  let indexedDb = window.indexedDB
  if (!indexedDb) {
    return;
  }
}



obj = {
  readData,
  createData
}

export default obj;
