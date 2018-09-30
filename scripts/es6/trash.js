function getGDP(event) {
  //console.log(event.target.value)
  let myUrl2 = `http://api.worldbank.org/v2/countries/${event.target.value}/indicators/NY.GDP.MKTP.CD?format=json`
  console.log(myUrl2)
  let promise2 = get(myUrl2)
  promise2.then(function(data) {
    data = JSON.parse(data);
    console.log('to tu ' + data)
    generateGDP(data)
  }).catch(function(error) {
    console.log(error)
  })
}

function generateGDP(data) {
  if (gdpContainer.hasChildNodes()) {
    console.log('skasowalo');
    gdpContainer.innerHTML = ''
  }
  let table = document.createElement('TABLE')
  let headerRow = document.createElement('TR')
  //console.log(headerRow)
  let year = document.createElement('TH')
  year.innerHTML = 'year'
  let value = document.createElement('TH')
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
    let dataRow = document.createElement('TR')
    yearData = document.createElement('TD')
    valueData = document.createElement('TD')
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
