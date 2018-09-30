import { default as get} from './helper.js';
import {
  default as variables
} from './variables.js';
import {
  default as buildTable
} from './buildTable.js';
import {
  default as canvas
} from './canvas.js';
import {
  default as readDataDB
} from './readData.js';
import {
  default as addDataDB
} from './addDataDB.js';
let obj = {}


let selectContainer = document.querySelector(variables.SELECT_COUNTRY_SELECTOR);
let countryListLink = variables.COUNTRY_LIST_LINK;
let gdpContainer = document.querySelector(variables.GDP_CONTAINER_SELECTOR);
let select = document.createElement('SELECT');
let selectIndicator = document.createElement('SELECT');
let getDataBtn = document.querySelector(variables.GET_DATA_BTN);
let descriptionField = document.querySelector(variables.DESCRIPTION_SELECTOR);

getDataBtn.addEventListener('click', getData)

selectIndicator.addEventListener('change', getIndicatorDescription);


function getIndicatorDescription() {
  descriptionField.innerHTML = event.target.options[this.selectedIndex].getAttribute('data-target-sourcenote')
}

function getData() {
  let url = `http://api.worldbank.org/v2/countries/${select.value}/indicators/${selectIndicator.value}?format=json`
  let promise = get(url);
  promise.then(function(data) {
    data = JSON.parse(data);
    buildTable.buildTable(data);
    canvas.visualizeData(data)

  }).catch(function(error) {
    console.log('Error with getting data from wb api',error);
  })
}

function getCountries(countries) {
  countries = JSON.parse(countries)
  let option;
  countries[1].forEach(item => {
    //console.log(item);
    option = document.createElement('OPTION')
    option.setAttribute('value', item.id)
    option.setAttribute('label', item.name)
    select.appendChild(option);
  })
  selectContainer.appendChild(select);
}

function getIndicators() {
  let option;
  variables.INDICATORS.forEach(indicator => {
    option = document.createElement('OPTION');
    option.setAttribute('value', indicator.id)
    option.setAttribute('label', indicator.name)
    option.setAttribute('data-target-sourceNote', indicator.sourceNote)
    selectIndicator.appendChild(option);
  })

  selectContainer.appendChild(selectIndicator);
}



function init() {
  //console.log(countryListLink)
  let promis = readDataDB.readData(variables.IND_DB_COUNTRY_LIST);
  //console.log(promis)
  promis.then((data) => {
      //console.log('data', data, promis);
      ifdataExist(data);
    })
    .catch((error) => {
      console.log('error reading data', error)
    });

}

function ifdataExist(data) {
  if (!data) {
    console.log('dane z sieci')
    let countryList = getCountryList();
  } else{
    console.log('dane z bazy')
    getCountries(data.data)
  }
  getIndicators()
}


function getCountryList() {
  let countryList = get(variables.COUNTRY_LIST_LINK);
  //console.log('countryList:', countryList);
  countryList.then((data) => {
    //console.log('dataCountryList', data);
    getCountries(data)

    let dataToSave = {query:variables.IND_DB_COUNTRY_LIST,data:data}
    addDataDB.addData(dataToSave)
  }).catch((error) => {
    console.log('dataCountryList dupa zbita', error)
  })
  return countryList
}


obj = {
  init
}

export default obj;
