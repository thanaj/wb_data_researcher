import {  default as variables } from './variables.js';
let obj = {}
let gdpContainer = document.querySelector(variables.GDP_CONTAINER_SELECTOR);

function buildTable(data) {
  if (gdpContainer.hasChildNodes()) {
    gdpContainer.innerHTML = ''
  }
  let table = document.createElement('TABLE')
  let headerRow = document.createElement('TR')
  let year = document.createElement('TH')
  year.innerHTML = 'year'
  let value = document.createElement('TH')
  value.innerHTML = 'value'
  headerRow.appendChild(year)
  headerRow.appendChild(value)
  table.appendChild(headerRow);
  data = data[1]
  //console.log('dane' + data)
  if(data){
    let yearData;
    let valueData;
    data.forEach(item => {
      let dataRow = document.createElement('TR')
      yearData = document.createElement('TD')
      valueData = document.createElement('TD')
      //console.log('dane',item.country.date, item.country.value)

      yearData.innerHTML = item.date
      yearData.setAttribute('class', 'year')
      dataRow.appendChild(yearData)
      valueData.innerHTML = Number(item.value).toFixed(2)
      dataRow.appendChild(valueData)
      table.appendChild(dataRow);
      //console.log(item.date)
    })

    gdpContainer.appendChild(table)
  }


}



obj = {
  buildTable
}

export default obj;
