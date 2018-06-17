(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msg = 'hello world bank';

console.log(msg);
var myUrl1 = 'https://api.worldbank.org/v2/countries?format=JSON';

var promise = (0, _helper2.default)(myUrl1);
promise.then(function (data) {
  getCountries(data);
}).catch(function (error) {
  //console.log(error)
});
//console.log(promise)

var selectContainer = document.querySelector(_variables2.default.SELECT_COUNTRY_SELECTOR);
var gdpContainer = document.querySelector(_variables2.default.GDP_CONTAINER_SELECTOR);
var select = document.createElement('SELECT');
select.setAttribute('value', 'poka poka');
select.addEventListener('change', getGDP);
//console.log(selectContainer)
function getCountries(countries) {

  countries = JSON.parse(countries);
  //countries = Array.from(data);
  //console.log(countries)
  var option = void 0;
  countries[1].forEach(function (item) {
    //console.log(item);
    option = document.createElement('OPTION');
    option.setAttribute('value', item.id);
    option.setAttribute('label', item.name);
    select.appendChild(option);
  });

  selectContainer.appendChild(select);
}

function getGDP(event) {
  console.log(event.target.value);
  var myUrl2 = 'http://api.worldbank.org/v2/countries/' + event.target.value + '/indicators/NY.GDP.MKTP.CD?format=json';
  console.log(myUrl2);
  var promise2 = (0, _helper2.default)(myUrl2);
  promise2.then(function (data) {
    data = JSON.parse(data);
    console.log('to tu ' + data);
    generateGDP(data);
  }).catch(function (error) {
    console.log(error);
  });
}

function generateGDP(data) {
  if (gdpContainer.hasChildNodes()) {
    console.log('skasowalo');
    gdpContainer.innerHTML = '';
  }
  var table = document.createElement('TABLE');
  var headerRow = document.createElement('TR');
  //console.log(headerRow)
  var year = document.createElement('TH');
  year.innerHTML = 'year';
  var value = document.createElement('TH');
  value.innerHTML = 'value';
  headerRow.appendChild(year);
  headerRow.appendChild(value);
  table.appendChild(headerRow);

  //data = JSON.parse(data)
  data = data[1];
  //console.log(data)
  var yearData = void 0;
  var valueData = void 0;
  data.forEach(function (item) {
    var dataRow = document.createElement('TR');
    yearData = document.createElement('TD');
    valueData = document.createElement('TD');

    yearData.innerHTML = item.date;
    yearData.setAttribute('class', 'year');
    dataRow.appendChild(yearData);

    valueData.innerHTML = Number(item.value).toFixed(2);
    dataRow.appendChild(valueData);

    table.appendChild(dataRow);
    //console.log(item.date)
  });

  gdpContainer.appendChild(table);
}

},{"./helper.js":2,"./variables.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(url) {
  console.log('poszlo');
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function () {
      if (xhttp.status == 200) {
        resolve(xhttp.response);
      } else {
        reject(xhttp.statusText);
      }
    };
    xhttp.onerror = function () {
      reject(xhttp.statusText);
    };
    xhttp.send();
  });
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var obj = {};

obj.SELECT_COUNTRY_SELECTOR = '[data-target="select-container"]';
obj.GDP_CONTAINER_SELECTOR = '[data-target="gdp-container"]';

exports.default = obj;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2VzNi9hcHAuanMiLCJzY3JpcHRzL2VzNi9oZWxwZXIuanMiLCJzY3JpcHRzL2VzNi92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksTUFBTSxrQkFBVjs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsSUFBSSxTQUFTLG9EQUFiOztBQUVBLElBQUksVUFBVSxzQkFBSSxNQUFKLENBQWQ7QUFDQSxRQUFRLElBQVIsQ0FBYSxVQUFTLElBQVQsRUFBYztBQUN6QixlQUFhLElBQWI7QUFDRCxDQUZELEVBRUcsS0FGSCxDQUVTLFVBQVMsS0FBVCxFQUFlO0FBQ3RCO0FBQ0QsQ0FKRDtBQUtBOztBQUVBLElBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixvQkFBVSx1QkFBakMsQ0FBdEI7QUFDQSxJQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLG9CQUFVLHNCQUFqQyxDQUFuQjtBQUNBLElBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLE9BQU8sWUFBUCxDQUFvQixPQUFwQixFQUE0QixXQUE1QjtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBaUMsTUFBakM7QUFDQTtBQUNBLFNBQVMsWUFBVCxDQUFzQixTQUF0QixFQUFpQzs7QUFFL0IsY0FBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQVo7QUFDQTtBQUNBO0FBQ0EsTUFBSSxlQUFKO0FBQ0EsWUFBVSxDQUFWLEVBQWEsT0FBYixDQUFxQixnQkFBUTtBQUMzQjtBQUNBLGFBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVQ7QUFDQSxXQUFPLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNEIsS0FBSyxFQUFqQztBQUNBLFdBQU8sWUFBUCxDQUFvQixPQUFwQixFQUE0QixLQUFLLElBQWpDO0FBQ0EsV0FBTyxX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LElBQU0sTUFBTSxFQUFaOztBQUVBLElBQUksdUJBQUosR0FBOEIsa0NBQTlCO0FBQ0EsSUFBSSxzQkFBSixHQUE0QiwrQkFBNUI7O2tCQUVlLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge2RlZmF1bHQgYXMgZ2V0fSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YXJpYWJsZXN9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBtc2cgPSAnaGVsbG8gd29ybGQgYmFuayc7XHJcblxyXG5jb25zb2xlLmxvZyhtc2cpXHJcbmxldCBteVVybDEgPSAnaHR0cHM6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXM/Zm9ybWF0PUpTT04nXHJcblxyXG5sZXQgcHJvbWlzZSA9IGdldChteVVybDEpXHJcbnByb21pc2UudGhlbihmdW5jdGlvbihkYXRhKXtcclxuICBnZXRDb3VudHJpZXMoZGF0YSk7XHJcbn0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAvL2NvbnNvbGUubG9nKGVycm9yKVxyXG59KVxyXG4vL2NvbnNvbGUubG9nKHByb21pc2UpXHJcblxyXG5sZXQgc2VsZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuU0VMRUNUX0NPVU5UUllfU0VMRUNUT1IpXHJcbmxldCBnZHBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5HRFBfQ09OVEFJTkVSX1NFTEVDVE9SKVxyXG5sZXQgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJylcclxuc2VsZWN0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdwb2thIHBva2EnKVxyXG5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxnZXRHRFApXHJcbi8vY29uc29sZS5sb2coc2VsZWN0Q29udGFpbmVyKVxyXG5mdW5jdGlvbiBnZXRDb3VudHJpZXMoY291bnRyaWVzKSB7XHJcblxyXG4gIGNvdW50cmllcyA9IEpTT04ucGFyc2UoY291bnRyaWVzKVxyXG4gIC8vY291bnRyaWVzID0gQXJyYXkuZnJvbShkYXRhKTtcclxuICAvL2NvbnNvbGUubG9nKGNvdW50cmllcylcclxuICBsZXQgb3B0aW9uO1xyXG4gIGNvdW50cmllc1sxXS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgLy9jb25zb2xlLmxvZyhpdGVtKTtcclxuICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpXHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsaXRlbS5pZClcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2xhYmVsJyxpdGVtLm5hbWUpXHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9KVxyXG5cclxuICBzZWxlY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHRFAoZXZlbnQpIHtcclxuICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQudmFsdWUpXHJcbiAgbGV0IG15VXJsMiA9YGh0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXMvJHtldmVudC50YXJnZXQudmFsdWV9L2luZGljYXRvcnMvTlkuR0RQLk1LVFAuQ0Q/Zm9ybWF0PWpzb25gXHJcbiAgY29uc29sZS5sb2cobXlVcmwyKVxyXG4gIGxldCBwcm9taXNlMiA9IGdldChteVVybDIpXHJcbiAgcHJvbWlzZTIudGhlbihmdW5jdGlvbihkYXRhKXtcclxuICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgY29uc29sZS5sb2coJ3RvIHR1ICcrZGF0YSlcclxuICAgIGdlbmVyYXRlR0RQKGRhdGEpXHJcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVHRFAoZGF0YSkge1xyXG4gIGlmKGdkcENvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpe1xyXG4gICAgY29uc29sZS5sb2coJ3NrYXNvd2FsbycpO1xyXG4gICAgZ2RwQ29udGFpbmVyLmlubmVySFRNTCA9JydcclxuICB9XHJcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEFCTEUnKVxyXG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpXHJcbiAgLy9jb25zb2xlLmxvZyhoZWFkZXJSb3cpXHJcbiAgbGV0IHllYXIgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKVxyXG4gIHllYXIuaW5uZXJIVE1MID0gJ3llYXInXHJcbiAgbGV0IHZhbHVlID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJylcclxuICB2YWx1ZS5pbm5lckhUTUwgPSAndmFsdWUnXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHllYXIpXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHZhbHVlKVxyXG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XHJcblxyXG5cclxuICAvL2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpXHJcbiAgZGF0YSA9IGRhdGFbMV1cclxuICAvL2NvbnNvbGUubG9nKGRhdGEpXHJcbiAgbGV0IHllYXJEYXRhO1xyXG4gIGxldCB2YWx1ZURhdGE7XHJcbiAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgbGV0IGRhdGFSb3cgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKVxyXG4gICAgeWVhckRhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpXHJcbiAgICB2YWx1ZURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpXHJcblxyXG4gICAgeWVhckRhdGEuaW5uZXJIVE1MID0gaXRlbS5kYXRlXHJcbiAgICB5ZWFyRGF0YS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywneWVhcicpXHJcbiAgICBkYXRhUm93LmFwcGVuZENoaWxkKHllYXJEYXRhKVxyXG5cclxuICAgIHZhbHVlRGF0YS5pbm5lckhUTUwgPSBOdW1iZXIoaXRlbS52YWx1ZSkudG9GaXhlZCgyKVxyXG4gICAgZGF0YVJvdy5hcHBlbmRDaGlsZCh2YWx1ZURhdGEpXHJcblxyXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQoZGF0YVJvdyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGl0ZW0uZGF0ZSlcclxuICB9KVxyXG5cclxuICBnZHBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0KHVybCl7XHJcbiAgY29uc29sZS5sb2coJ3Bvc3psbycpXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhodHRwLm9wZW4oXCJHRVRcIix1cmwsdHJ1ZSk7XHJcbiAgICB4aHR0cC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHhodHRwLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICByZXNvbHZlKHhodHRwLnJlc3BvbnNlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCh4aHR0cC5zdGF0dXNUZXh0KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhodHRwLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmVqZWN0KHhodHRwLnN0YXR1c1RleHQpXHJcbiAgICB9O1xyXG4gICAgeGh0dHAuc2VuZCgpO1xyXG4gIH0pXHJcbn1cclxuIiwiY29uc3Qgb2JqID0ge31cclxuXHJcbm9iai5TRUxFQ1RfQ09VTlRSWV9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzZWxlY3QtY29udGFpbmVyXCJdJztcclxub2JqLkdEUF9DT05UQUlORVJfU0VMRUNUT1IgPSdbZGF0YS10YXJnZXQ9XCJnZHAtY29udGFpbmVyXCJdJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iXX0=
