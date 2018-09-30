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
import {
  default as drawChart
} from './drawChart.js';

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
  let queryName = `${select.value}_${selectIndicator.value}`
  let country = select.options[select.selectedIndex].getAttribute('data-target-country')
  
  let promis = readDataDB.readData(queryName);
  promis.then((data) => {
      if(!data){
        let promise = get(url);
        promise.then(function(data) {
          //console.log(data)
          data = JSON.parse(data);
          drawChart.drawChartForGCharts(data,country)
          let dataToSave = {query:queryName,data:data}
          addDataDB.addData(dataToSave)

        }).catch(function(error) {
          console.log('Error with getting data from wb api',error);
        })
      }else{
        drawChart.drawChartForGCharts(data.data,country)
      }
    })
    .catch((error) => {
      console.log('error reading data', error)
    });





}

function getDataFromWeb(){

}

function getCountries(countries) {
  countries = JSON.parse(countries)
  countries[1].sort((a,b)=> (''+ a.name).localeCompare(b.name))
  let option;
  countries[1].forEach(item => {
    if(item.capitalCity){
      option = document.createElement('OPTION')
      option.setAttribute('value', item.id)
      option.setAttribute('label', item.name)
      option.setAttribute('data-target-country', item.name)
      select.appendChild(option);
    }

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
  let promis = readDataDB.readData(variables.IND_DB_COUNTRY_LIST);
  promis.then((data) => {
      ifCountryListExist(data);
    })
    .catch((error) => {
      console.log('error reading data', error)
    });
}

function ifCountryListExist(data) {
  if (!data) {
    let countryList = getCountryList();
  } else{
    getCountries(data.data)
  }
  getIndicators()
}


function getCountryList() {
  let countryList = get(variables.COUNTRY_LIST_LINK);
  countryList.then((data) => {
    getCountries(data)
    let dataToSave = {query:variables.IND_DB_COUNTRY_LIST,data:data}
    addDataDB.addData(dataToSave)
  }).catch((error) => {
    console.log('getCountryList error ', error)
  })
  return countryList
}


obj = {
  init
}

export default obj;
