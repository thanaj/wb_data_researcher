import {default as get} from './helper.js';
import {default as variables} from './variables.js';

let msg = 'hello world bank';

console.log(msg)
let myUrl1 = 'https://api.worldbank.org/v2/countries?format=JSON'

let promise = get(myUrl1)
promise.then(function(data){
  getCountries(data);
}).catch(function(error){
  //console.log(error)
})
//console.log(promise)

let selectContainer = document.querySelector(variables.SELECT_COUNTRY_SELECTOR)
let gdpContainer = document.querySelector(variables.GDP_CONTAINER_SELECTOR)
let select = document.createElement('SELECT')
select.setAttribute('value','poka poka')
select.addEventListener('change',getGDP)
//console.log(selectContainer)
function getCountries(countries) {

  countries = JSON.parse(countries)
  //countries = Array.from(data);
  //console.log(countries)
  let option;
  countries[1].forEach(item => {
    //console.log(item);
    option = document.createElement('OPTION')
    option.setAttribute('value',item.id)
    option.setAttribute('label',item.name)
    select.appendChild(option);
  })

  selectContainer.appendChild(select)
}

function getGDP(event) {
  console.log(event.target.value)
  let myUrl2 =`http://api.worldbank.org/v2/countries/${event.target.value}/indicators/NY.GDP.MKTP.CD?format=json`
  console.log(myUrl2)
  let promise2 = get(myUrl2)
  promise2.then(function(data){
    data = JSON.parse(data);
    console.log('to tu '+data)
    generateGDP(data)
  }).catch(function(error){
    console.log(error)
  })
}

function generateGDP(data) {
  if(gdpContainer.hasChildNodes()){
    console.log('skasowalo');
    gdpContainer.innerHTML =''
  }
  let table = document.createElement('TABLE')
  let headerRow = document.createElement('TR')
  //console.log(headerRow)
  let year =  document.createElement('TH')
  year.innerHTML = 'year'
  let value =  document.createElement('TH')
  value.innerHTML = 'value'
  headerRow.appendChild(year)
  headerRow.appendChild(value)
  table.appendChild(headerRow);


  //data = JSON.parse(data)
  data = data[1]
  //console.log(data)
  let yearData;
  let valueData;
  data.forEach(item => {
    let dataRow =  document.createElement('TR')
    yearData = document.createElement('TD')
    valueData = document.createElement('TD')

    yearData.innerHTML = item.date
    yearData.setAttribute('class','year')
    dataRow.appendChild(yearData)

    valueData.innerHTML = Number(item.value).toFixed(2)
    dataRow.appendChild(valueData)

    table.appendChild(dataRow);
    //console.log(item.date)
  })

  gdpContainer.appendChild(table)
}
