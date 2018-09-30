import {
  default as variables
} from './variables.js';

let obj = {}
google.charts.load('current', {'packages':['corechart']});


function prepareDataForChart(dataForChart){
  let preparedData;
  if(dataForChart){
    dataForChart = dataForChart[1]
    dataForChart = dataForChart.reverse()

    preparedData = [
      //['Year', 'Value']
    ];
    dataForChart.forEach((item)=>{
      let oneItem = []
      oneItem.push(item.date)
      oneItem.push(Number(item.value))
      preparedData.push(oneItem)
    })
    preparedData.sort((a,b)=>parseFloat(a[0])-parseFloat(b[0]))
    preparedData.unshift(['Year', 'Value'])

  }


  return preparedData
}
function drawChartForGCharts(dataforChart,country){
  console.log(dataforChart)
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart(dataforChart,country));
}

function drawChart(dataforChart,country) {


  let preparedData = prepareDataForChart(dataforChart);
  let data = google.visualization.arrayToDataTable(preparedData)

  var options = {
    title: country,
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}


obj = {
  drawChartForGCharts
}

export default obj;
