import {  default as variables } from './variables.js';

variables.VISUALIZATION_SELECTOR



let canvas = document.querySelector(variables.VISUALIZATION_SELECTOR)

function visualizeData(data) {
  data = data[1]
  console.log(data)
  if(data){
    let minYear = Math.min( ...data.map(item=> item.date))
    let maxYear =Math.max( ...data.map(item=> item.date))
    let minVal = Math.min( ...data.map(item=> item.value))
    let maxVal = Math.max( ...data.map(item=> item.value))
    let yearUnit = 400/(maxYear-minYear)
    let valueUnit = 200/(maxVal-minVal)

    console.log('yearUnit,valueUnit'+minYear,maxYear,yearUnit,valueUnit)

    let ctx = canvas.getContext("2d");
    ctx.strokeStyle="red";
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    let x=yearUnit;;
    let y=yearUnit;
    data.forEach(item=>{
      //x=yearUnit*item.date
      //console.log(valueUnit,item.value)
      y = (200 * item.value)/maxVal;
      console.log('xiy' + x,y)
      ctx.lineTo(x, y);
      x=x+ yearUnit
      y=0
    })
    //ctx.lineTo(200, 100);
    ctx.stroke();

    //console.log(canvas)
  }

}

const obj = {visualizeData}
export default obj;
