(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

function createObjectStore(event, storeName, configObj) {
  var db = event.target.result;
  var objectStore = db.createObjectStore(storeName, configObj);
}

function createTransaction(db, storeName) {
  var transaction = db.transaction([storeName], "readwrite");
  transaction.oncomplete = function (event) {
    //console.log('oncomplete transction', event);
  };
  transaction.onerror = function (event) {
    console.log('onerror transction', event);
  };
  return transaction;
}

function addRecord(event, dataToBeAdd, promiseFn) {
  var db = event.target.result;
  var transaction = createTransaction(db, _variables2.default.IND_DB_STORE_NAME);
  var objectStore = transaction.objectStore(_variables2.default.IND_DB_STORE_NAME);

  //let query = objectStore.get(lookedValue)
  var result = void 0;

  var objectStore1 = transaction.objectStore(_variables2.default.IND_DB_STORE_NAME);
  var addRequest = objectStore1.add(dataToBeAdd);
  addRequest.oncomplete = function (event) {
    //console.log('addRequest complete', event)
    promiseFn.resolve(event);
  };
  addRequest.onerror = function (event) {
    console.log('addRequest error', event);
    console.log('addRequest onerror', event.target.error);
    promiseFn.reject(event);
  };
}

function requestOpenDb(promiseFn) {
  var indexedDb = window.indexedDB;
  var request = void 0;
  if (indexedDb) {
    var _request = indexedDb.open(_variables2.default.IND_DB_STORE_NAME);
    _request.onupgradeneeded = function (event) {
      createObjectStore(event, storeName, configObj);
    };

    _request.onblocked = function (event) {
      console.log('request blocked', event);
      promiseFn.reject(event);
    };

    _request.onerror = function (event) {
      console.log('request onerror', event);
      promiseFn.reject(event);
    };

    return _request;
  }
  return request;
}

function addData(dataToBeAdd) {
  return new Promise(function (resolve, reject) {
    var promiseObj = { resolve: resolve, reject: reject };

    var request = requestOpenDb(promiseObj);
    request.onsuccess = function (event) {
      //console.log('request onsuccess', event)
      return addRecord(event, dataToBeAdd, promiseObj);
    };
  });
};

obj = {
  addData: addData
};

exports.default = obj;

},{"./helper.js":7,"./variables.js":9}],2:[function(require,module,exports){
'use strict';

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _getCountries = require('./getCountries.js');

var _getCountries2 = _interopRequireDefault(_getCountries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_getCountries2.default.init();

/*
sprawdź czy jest baza
sprawdż czy lista państw jest na bazie
jeśli jest to ją pobierz
jeśli nie ma to pobierz z netu
i zapisz ja na bazie





*/

},{"./getCountries.js":6,"./helper.js":7,"./variables.js":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};
var gdpContainer = document.querySelector(_variables2.default.GDP_CONTAINER_SELECTOR);

function buildTable(data) {
  if (gdpContainer.hasChildNodes()) {
    gdpContainer.innerHTML = '';
  }
  var table = document.createElement('TABLE');
  var headerRow = document.createElement('TR');
  var year = document.createElement('TH');
  year.innerHTML = 'year';
  var value = document.createElement('TH');
  value.innerHTML = 'value';
  headerRow.appendChild(year);
  headerRow.appendChild(value);
  table.appendChild(headerRow);
  data = data[1];
  //console.log('dane' + data)
  if (data) {
    var yearData = void 0;
    var valueData = void 0;
    data.forEach(function (item) {
      var dataRow = document.createElement('TR');
      yearData = document.createElement('TD');
      valueData = document.createElement('TD');
      //console.log('dane',item.country.date, item.country.value)

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
}

obj = {
  buildTable: buildTable
};

exports.default = obj;

},{"./variables.js":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_variables2.default.VISUALIZATION_SELECTOR;
var canvas = document.querySelector(_variables2.default.VISUALIZATION_SELECTOR);

function visualizeData(data) {
  data = data[1];
  console.log(data);
  if (data) {
    var minYear = Math.min.apply(Math, _toConsumableArray(data.map(function (item) {
      return item.date;
    })));
    var maxYear = Math.max.apply(Math, _toConsumableArray(data.map(function (item) {
      return item.date;
    })));
    var minVal = Math.min.apply(Math, _toConsumableArray(data.map(function (item) {
      return item.value;
    })));
    var maxVal = Math.max.apply(Math, _toConsumableArray(data.map(function (item) {
      return item.value;
    })));
    var yearUnit = 400 / (maxYear - minYear);
    var valueUnit = 200 / (maxVal - minVal);

    console.log('yearUnit,valueUnit' + minYear, maxYear, yearUnit, valueUnit);

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    var x = yearUnit;;
    var y = yearUnit;
    data.forEach(function (item) {
      //x=yearUnit*item.date
      //console.log(valueUnit,item.value)
      y = 200 * item.value / maxVal;
      console.log('xiy' + x, y);
      ctx.lineTo(x, y);
      x = x + yearUnit;
      y = 0;
    });
    //ctx.lineTo(200, 100);
    ctx.stroke();

    //console.log(canvas)
  }
}

var obj = { visualizeData: visualizeData };
exports.default = obj;

},{"./variables.js":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};
google.charts.load('current', { 'packages': ['corechart'] });

function prepareDataForChart(dataForChart) {
  var preparedData = void 0;
  if (dataForChart) {
    dataForChart = dataForChart[1];
    dataForChart = dataForChart.reverse();

    preparedData = [
      //['Year', 'Value']
    ];
    dataForChart.forEach(function (item) {
      var oneItem = [];
      oneItem.push(item.date);
      oneItem.push(Number(item.value));
      preparedData.push(oneItem);
    });
    preparedData.sort(function (a, b) {
      return parseFloat(a[0]) - parseFloat(b[0]);
    });
    preparedData.unshift(['Year', 'Value']);
  }

  return preparedData;
}
function drawChartForGCharts(dataforChart, country) {
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart(dataforChart, country));
}

function drawChart(dataforChart, country) {

  var preparedData = prepareDataForChart(dataforChart);
  var data = google.visualization.arrayToDataTable(preparedData);

  var options = {
    title: country,
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

obj = {
  drawChartForGCharts: drawChartForGCharts
};

exports.default = obj;

},{"./variables.js":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _buildTable = require('./buildTable.js');

var _buildTable2 = _interopRequireDefault(_buildTable);

var _canvas = require('./canvas.js');

var _canvas2 = _interopRequireDefault(_canvas);

var _readData = require('./readData.js');

var _readData2 = _interopRequireDefault(_readData);

var _addDataDB = require('./addDataDB.js');

var _addDataDB2 = _interopRequireDefault(_addDataDB);

var _drawChart = require('./drawChart.js');

var _drawChart2 = _interopRequireDefault(_drawChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

var selectContainer = document.querySelector(_variables2.default.SELECT_COUNTRY_SELECTOR);
var countryListLink = _variables2.default.COUNTRY_LIST_LINK;
var gdpContainer = document.querySelector(_variables2.default.GDP_CONTAINER_SELECTOR);
var select = document.createElement('SELECT');
var selectIndicator = document.createElement('SELECT');
var getDataBtn = document.querySelector(_variables2.default.GET_DATA_BTN);
var descriptionField = document.querySelector(_variables2.default.DESCRIPTION_SELECTOR);
var infoBox = document.querySelector(_variables2.default.INFO_BOX_SELECTOR);

getDataBtn.addEventListener('click', getData);
selectIndicator.addEventListener('change', getIndicatorDescription);

function getIndicatorDescription() {
  descriptionField.innerHTML = event.target.options[this.selectedIndex].getAttribute('data-target-sourcenote');
}

function getData() {
  var url = 'http://api.worldbank.org/v2/countries/' + select.value + '/indicators/' + selectIndicator.value + '?format=json';
  var queryName = select.value + '_' + selectIndicator.value;
  var country = select.options[select.selectedIndex].getAttribute('data-target-country');
  infoBox.innerHTML = '';
  var promis = _readData2.default.readData(queryName);
  promis.then(function (data) {
    if (!data) {
      var promise = (0, _helper2.default)(url);
      promise.then(function (data) {

        data = JSON.parse(data);
        minifyData(data);
        _drawChart2.default.drawChartForGCharts(data, country);
        var dataToSave = { query: queryName, data: data };
        _addDataDB2.default.addData(dataToSave);
      }).catch(function (error) {
        infoBox.innerHTML = "Error with getting data from wb api";
        console.log('Error with getting data from wb api', error);
      });
    } else {
      _drawChart2.default.drawChartForGCharts(data.data, country);
    }
  }).catch(function (error) {
    console.log('error reading data', error);
  });
}

function minifyData(data) {
  var newData = [];
  //data.splice[0,1
  data[1].forEach(function (item) {
    var newItem = {
      date: item.date,
      value: item.value
    };
    newData.push(newItem);
  });
  data[1] = newData;
  return newData;
}

function getCountries(countries) {
  countries = JSON.parse(countries);
  countries[1].sort(function (a, b) {
    return ('' + a.name).localeCompare(b.name);
  });
  var option = void 0;
  countries[1].forEach(function (item) {
    if (item.capitalCity) {
      option = document.createElement('OPTION');
      option.setAttribute('value', item.id);
      option.setAttribute('label', item.name);
      option.setAttribute('data-target-country', item.name);
      select.appendChild(option);
    }
  });
  selectContainer.appendChild(select);
}

function getIndicators() {
  var option = void 0;
  _variables2.default.INDICATORS.forEach(function (indicator) {
    option = document.createElement('OPTION');
    option.setAttribute('value', indicator.id);
    option.setAttribute('label', indicator.name);
    option.setAttribute('data-target-sourceNote', indicator.sourceNote);
    selectIndicator.appendChild(option);
  });

  selectContainer.appendChild(selectIndicator);
}

function init() {
  var promis = _readData2.default.readData(_variables2.default.IND_DB_COUNTRY_LIST);
  promis.then(function (data) {
    ifCountryListExist(data);
  }).catch(function (error) {
    console.log('error reading data', error);
  });
}

function ifCountryListExist(data) {
  if (!data) {
    var countryList = getCountryList();
  } else {
    getCountries(data.data);
  }
  getIndicators();
}

function getCountryList() {
  var countryList = (0, _helper2.default)(_variables2.default.COUNTRY_LIST_LINK);
  countryList.then(function (data) {
    getCountries(data);
    var dataToSave = { query: _variables2.default.IND_DB_COUNTRY_LIST, data: data };
    _addDataDB2.default.addData(dataToSave);
  }).catch(function (error) {
    console.log('getCountryList error ', error);
  });
  return countryList;
}

obj = {
  init: init
};

exports.default = obj;

},{"./addDataDB.js":1,"./buildTable.js":3,"./canvas.js":4,"./drawChart.js":5,"./helper.js":7,"./readData.js":8,"./variables.js":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(url) {
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};
var keyPath = 'query';
var storeName = 'world-bank-data-researcher';
var configObj = { keyPath: 'query' };

function createObjectStore(event, storeName, configObj) {
  var db = event.target.result;
  var objectStore = db.createObjectStore(storeName, configObj);
}

function createTransaction(db, storeName, promiseFn) {
  var transaction = db.transaction([storeName]);
  transaction.oncomplete = function (event) {};
  transaction.onerror = function (event) {
    console.log('onerror transction', event);
    promiseFn.reject(event);
  };
  return transaction;
}

function readRecord(event, lookedValue, promiseFn) {
  var db = event.target.result;
  var transaction = createTransaction(db, storeName, promiseFn);
  var objectStore = transaction.objectStore(storeName);
  var query = objectStore.get(lookedValue);
  var result = void 0;

  query.onerror = function (event) {
    console.log('query error', event);
    promiseFn.reject(event);
  };
  query.onsuccess = function (event) {
    result = event.target.result;
    promiseFn.resolve(result);
  };
}
function requestOpenDb(promiseFn) {
  var indexedDb = window.indexedDB;
  var request = void 0;
  if (indexedDb) {
    var _request = indexedDb.open(storeName);
    _request.onupgradeneeded = function (event) {
      createObjectStore(event, storeName, configObj);
    };

    _request.onblocked = function (event) {
      console.log('request blocked', event);
      promiseFn.reject(event);
    };

    _request.onerror = function (event) {
      console.log('request onerror', event);
      promiseFn.reject(event);
    };

    return _request;
  }
  return request;
}

function readData(lookedValue) {
  return new Promise(function (resolve, reject) {
    var promiseObj = { resolve: resolve, reject: reject };
    var request = requestOpenDb(promiseObj);
    request.onsuccess = function (event) {
      return readRecord(event, lookedValue, promiseObj);
    };
  });
};

obj = {
  readData: readData
};

exports.default = obj;

},{"./helper.js":7,"./variables.js":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var obj = {};

var keyPath = 'query';
var storeName = 'world-bank-data-researcher';
var configObj = { keyPath: 'query' };

obj.IND_DB_COUNTRY_LIST = 'countryList';
obj.IND_DB_KEY_PATH = 'query';
obj.IND_DB_CONFIG_OBJ = { keyPath: 'query' };
obj.IND_DB_STORE_NAME = 'world-bank-data-researcher';

obj.IND_DB_STORE_NAME = 'world-bank-data-researcher';
obj.SELECT_COUNTRY_SELECTOR = '[data-target="select-container"]';
obj.GDP_CONTAINER_SELECTOR = '[data-target="gdp-container"]';
obj.COUNTRY_LIST_LINK = 'https://api.worldbank.org/v2/countries?format=JSON&per_page=305';
//`http://api.worldbank.org/v2/countries/${event.target.value}/indicators/NY.GDP.MKTP.CD?format=json`
obj.INDICATORS_LINK = 'http://api.worldbank.org/v2/indicators?format=json';
obj.GET_DATA_BTN = '[data-target="get-data-button"]';

obj.INFO_BOX_SELECTOR = '[data-target="info-box"]';
obj.DESCRIPTION_SELECTOR = '[data-target="description-container"]';

obj.VISUALIZATION_SELECTOR = '[data-target="visualisation-container"]';

obj.INDICATORS = [{
  "id": "NY.ADJ.AEDU.GN.ZS",
  "name": "Adjusted savings: education expenditure (% of GNI)",
  "sourceNote": "Education expenditure refers to the current operating expenditures in education, including wages and salaries and excluding capital investments in buildings and equipment.",
  "sourceOrganization": "UNESCO; data are extrapolated to the most recent year available"
}, {
  "id": "g20.t.receive.1",
  "name": "Received digital payments in the past year, male (% age 15+)",
  "sourceNote": "The percentage of respondents who report using mobile money, a debit or credit card, or a mobile phone to receive a payment through an account in the past 12 months. It also includes respondents who report receiving remittances, receiving payments for agricultural products, receiving government transfers, receiving wages, or receiving a public sector pension directly into a financial institution account or through a mobile money account in the past 12 months, male (% age 15+)."
}, {
  "id": "NY.GDP.DEFL.KD.ZG.AD",
  "name": "Inflation, GDP deflator: linked series (annual %)",
  "sourceNote": "Inflation as measured by the annual growth rate of the GDP implicit deflator shows the rate of price change in the economy as a whole. This series has been linked to produce a consistent time series to counteract breaks in series over time due to changes in base years, source data and methodologies. Thus, it may not be comparable with other national accounts series in the database for historical years."
}, {
  "id": "SM.POP.NETM",
  "name": "Net migration",
  "sourceNote": "Net migration is the net total of migrants during the period, that is, the total number of immigrants less the annual number of emigrants, including both citizens and noncitizens. Data are five-year estimates."
}, {
  "id": "SH.CON.AIDS.MA.ZS",
  "name": "Condom use at last high-risk sex, adult male (% ages 15-49)",
  "sourceNote": "Condom use at last high-risk sex, male is the percentage of the male population ages 15-49 who used a condom at last intercourse with a non-marital and non-cohabiting sexual partner in the last 12 months."
}, {
  "id": "SH.CON.AIDS.FE.ZS",
  "name": "Condom use at last high-risk sex, adult female (% ages 15-49)",
  "sourceNote": "Condom use at last high-risk sex, female is the percentage of the female population ages 15-49 who used a condom at last intercourse with a non-marital and non-cohabiting sexual partner in the last 12 months."
}, {
  "id": "SH.CON.1524.MA.ZS",
  "name": "Condom use, population ages 15-24, male (% of males ages 15-24)",
  "sourceNote": "Condom use, male is the percentage of the male population ages 15-24 who used a condom at last intercourse in the last 12 months."
}, {
  "id": "SH.CON.1524.FE.ZS",
  "name": "Condom use, population ages 15-24, female (% of females ages 15-24)",
  "sourceNote": "Condom use, female is the percentage of the female population ages 15-24 who used a condom at last intercourse in the last 12 months."
}, {
  "id": "SG.RSX.TIRD.ZS",
  "name": "Women who believe a wife is justified refusing sex with her husband if she is tired or not in the mood (%)",
  "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband if she is tired or not in the mood."
}, {
  "id": "SG.RSX.TMDS.ZS",
  "name": "Women who believe a wife is justified refusing sex with her husband if she knows he has sexually transmitted disease (%)",
  "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband if she knows husband has sexually transmitted disease."
}, {
  "id": "SG.RSX.SXOT.ZS",
  "name": "Women who believe a wife is justified refusing sex with her husband if she knows he has sex with other women (%)",
  "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband if she knows husband has sex with other women."
}, {
  "id": "SG.RSX.REAS.ZS",
  "name": "Women who believe a wife is justified refusing sex with her husband for all of the reasons (%)",
  "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband for all of the reasons: husband has sexually transmitted disease, husband has sex with other women, recently given birth, tired or not in the mood."
}, {
  "id": "SG.VAW.BURN.ZS",
  "name": "Women who believe a husband is justified in beating his wife when she burns the food (%)",
  "sourceNote": "Percentage of women ages 15-49 who believe a husband\/partner is justified in hitting or beating his wife\/partner when she burns the food."
}, {
  "id": "FB.BNK.CAPA.ZS",
  "name": "Bank capital to assets ratio (%)",
  "sourceNote": "Bank capital to assets is the ratio of bank capital and reserves to total assets. Capital and reserves include funds contributed by owners, retained earnings, general and special reserves, provisions, and valuation adjustments. Capital includes tier 1 capital (paid-up shares and common stock), which is a common feature in all countries' banking systems, and total regulatory capital, which includes several specified types of subordinated debt instruments that need not be repaid if the funds are required to maintain minimum capital levels (these comprise tier 2 and tier 3 capital). Total assets include all nonfinancial and financial assets."
}, {
  "id": "FB.BNK.BRCH.SF.P5",
  "name": "Branches, specialized state financial institutions (per 100,000 adults)",
  "sourceNote": ""
}, {
  "id": "FB.BNK.BRCH.P5",
  "name": "Bank branches (per 100,000 people)",
  "sourceNote": ""
}, {
  "id": "FB.BNK.BRCH.MF.P5",
  "name": "Branches, microfinance institutions (per 100,000 adults)",
  "sourceNote": ""
}, {
  "id": "FB.BNK.BRCH.CO.P5",
  "name": "Branches, cooperatives (per 100,000 adults)",
  "sourceNote": ""
}, {
  "id": "FB.BNK.BRCH.CB.P5",
  "name": "Branches, commercial banks (per 100,000 adults)",
  "sourceNote": ""
}, {
  "id": "FB.ATM.TOTL.P5",
  "name": "Automated teller machines (ATMs) (per 100,000 adults)",
  "sourceNote": "Automated teller machines are computerized telecommunications devices that provide clients of a financial institution with access to financial transactions in a public place."
}, {
  "id": "FB.AST.PUBO.ZS",
  "name": "Banking assets held by government-owned banks (% of total banking assets)",
  "sourceNote": ""
}, {
  "id": "FB.AST.NPER.ZS",
  "name": "Bank nonperforming loans to total gross loans (%)",
  "sourceNote": "Bank nonperforming loans to total gross loans are the value of nonperforming loans divided by the total value of the loan portfolio (including nonperforming loans before the deduction of specific loan-loss provisions). The loan amount recorded as nonperforming should be the gross value of the loan as recorded on the balance sheet, not just the amount that is overdue."
}, {
  "id": "NE.TRD.GNFS.ZS",
  "name": "Trade (% of GDP)",
  "sourceNote": "Trade is the sum of exports and imports of goods and services measured as a share of gross domestic product. "
}, {
  "id": "SL.GDP.PCAP.EM.KD.ZG",
  "name": "GDP per person employed (annual % growth)",
  "sourceNote": "GDP per person employed is gross domestic product (GDP) divided by total employment in the economy."
}, {
  "id": "NY.GDP.PCAP.PP.KD.ZG",
  "name": "GDP per capita, PPP annual growth (%)",
  "sourceNote": "Annual percentage growth rate of GDP per capita based on purchasing power parity (PPP). GDP per capita based on purchasing power parity (PPP). PPP GDP is gross domestic product converted to international dollars using purchasing power parity rates. An international dollar has the same purchasing power over GDP as the U.S. dollar has in the United States. GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in constant 2000 international dollars.  "
}, {
  "id": "NY.GDP.PCAP.PP.KD", "name": "GDP per capita, PPP (constant 2011 international $)",
  "sourceNote": "GDP per capita based on purchasing power parity (PPP). PPP GDP is gross domestic product converted to international dollars using purchasing power parity rates. An international dollar has the same purchasing power over GDP as the U.S. dollar has in the United States. GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in constant 2011 international dollars."
}, {
  "id": "NY.GDP.PCAP.CD", "name": "GDP per capita (current US$)",
  "sourceNote": "GDP per capita is gross domestic product divided by midyear population. GDP is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in current U.S. dollars."
}, {
  "id": "NY.GDP.MKTP.ZG", "name": "Gross domestic product (Av. annual growth, %)",
  "sourceNote": "The GDP implicit deflator is the ratio of GDP in current local currency to GDP in constant local currency. The base year varies by country."
}, {
  "id": "NY.GDP.MKTP.KN.87.ZG", "name": "GDP growth (annual %)",
  "sourceNote": ""
}, {
  "id": "NY.GDP.MKTP.CD", "name": "GDP (current US$)",
  "sourceNote": "GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in current U.S. dollars. Dollar figures for GDP are converted from domestic currencies using single year official exchange rates. For a few countries where the official exchange rate does not reflect the rate effectively applied to actual foreign exchange transactions, an alternative conversion factor is used."
}, {
  "id": "SE.TER.ENRL.FE.ZS", "name": "Percentage of students in tertiary education who are female (%)",
  "sourceNote": "Number of female students at the tertiary education level (ISCED 5 to 8) expressed as a percentage of the total number of students (male and female) at the tertiary education level (ISCED 5 to 8) in a given school year."

}, {
  "id": "SE.TER.CUAT.MS.ZS", "name": "Educational attainment, at least Master's or equivalent, population 25+, total (%) (cumulative)",
  "sourceNote": "The percentage of population ages 25 and over that attained or completed Master's or equivalent."
}, {
  "id": "SE.TER.CUAT.MS.FE.ZS", "name": "Educational attainment, at least Master's or equivalent, population 25+, female (%) (cumulative)",
  "sourceNote": "The percentage of population ages 25 and over that attained or completed Master's or equivalent."
}, {
  "id": "SE.TER.CUAT.DO.ZS", "name": "Educational attainment, Doctoral or equivalent, population 25+, total (%) (cumulative)",
  "sourceNote": "The percentage of population ages 25 and over that attained or completed Doctoral or equivalent."
}, {
  "id": "SE.TER.CUAT.MS.MA.ZS", "name": "Educational attainment, at least Master's or equivalent, population 25+, male (%) (cumulative)",
  "sourceNote": "The percentage of population ages 25 and over that attained or completed Master's or equivalent."
}, {
  "id": "SH.FPL.FSEX.Q5.ZS", "name": "Median age at first sexual intercourse (women ages 25-49): Q5 (highest)",
  "sourceNote": "Median age at first sexual intercourse: Median age at first sexual intercourse among women aged 25-49 years."
}, {
  "id": "SH.FPL.FSEX.Q1.ZS", "name": "Median age at first sexual intercourse (women ages 25-49): Q1 (lowest)",
  "sourceNote": "Median age at first sexual intercourse: Median age at first sexual intercourse among women aged 25-49 years."
}, {

  "id": "MO.INDEX.SRLW.XQ", "name": "Safety and Rule of Law",
  "sourceNote": "Personal Safety:  Within this sub-category the Ibrahim Index measures: (i) Safety of the Person – level of criminality in a country. (ii) Violent Crime – prevalence of violent crime, both organised and common. (iii) Social Unrest – prevalence of violent social unrest. (iv) Human Trafficking – government efforts to combat human trafficking. (v) Domestic Political Persecution – clustered indicator (an average) of the following variables: Physical Integrity Rights Index – government respect for citizens’ rights to freedom from torture, extrajudicial killing, political imprisonment, and disappearance.  Political Terror Scale – levels of state-instigated political violence and terror."
}, {
  "id": "SG.VAW.1549.ZS", "name": "Proportion of women subjected to physical and\/or sexual violence in the last 12 months (% of women age 15-49)",
  "sourceNote": "Proportion of women subjected to physical and\/or sexual violence in the last 12 months is the percentage of ever partnered women age 15-49 who are subjected to physical violence, sexual violence or both by a current or former intimate partner in the last 12 months."

}, {
  "id": "SG.OWN.HSAL.MA.ZS", "name": "Men who own house alone (% of men)",
  "sourceNote": "Men who own house alone (% of men) is the percentage of men who only solely own a house which is legally registered with their name or cannot be sold without their signature."
}, {
  "id": "SG.OWN.HSAL.FE.ZS", "name": "Women who own house alone (% of women age 15-49)",
  "sourceNote": "Women who own house alone (% of women age 15-49) is the percentage of women age 15-49 who only own a house, which legally registered with their name or cannot be sold without their signature, alone (don't share ownership with anyone)."
}, {
  "id": "IC.FRM.THEV.ZS", "name": "Firms experiencing losses due to theft and vandalism (% of firms)",
  "sourceNote": "Percent of firms experiencing losses due to theft, robbery, vandalism or arson that occurred on the establishment's premises."
}, {
  "id": "SG.LEG.MRRP", "name": "Legislation explicitly criminalizes marital rape (1=yes; 0=no)",
  "sourceNote": 'Legislation explicitly criminalizes marital rape is whether there is legislation that explicitly criminalizes the act of marital rape by providing that rape or sexual assault provisions apply "irrespective of the nature of the relationship" between the perpetrator and complainant or by stating that "no marriage or other relationship shall constitute a defense to a charge of rape or sexual assault under the legislation" '
}, {
  "id": "IT.NET.USER.ZS", "name": "Individuals using the Internet (% of population)",
  "sourceNote": "Internet users are individuals who have used the Internet (from any location) in the last 3 months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV etc."
}, {
  "id": "IT.NET.USER.P2", "name": "Internet users (per 100 people)",
  "sourceNote": "Internet users are individuals who have used the Internet (from any location) in the last 3 months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV etc."
}, {
  "id": "VC.HOM.ITEN.P5.LE", "name": "Intentional homicide rate (per 100,000 people, WHO)",
  "sourceNote": ""
}, {
  "id": "VC.BTL.DETH", "name": "Battle-related deaths (number of people)",
  "sourceNote": "Battle-related deaths are deaths in battle-related conflicts between warring parties in the conflict dyad (two conflict units that are parties to a conflict). Typically, battle-related deaths occur in warfare involving the armed forces of the warring parties. This includes traditional battlefield fighting, guerrilla activities, and all kinds of bombardments of military units, cities, and villages, etc. The targets are usually the military itself and its installations or state institutions and state representatives, but there is often substantial collateral damage in the form of civilians being killed in crossfire, in indiscriminate bombings, etc. All deaths--military as well as civilian--incurred in such situations, are counted as battle-related deaths."
}, {
  "id": "VA.STD.ERR", "name": "Voice and Accountability: Standard Error",
  "sourceNote": "Voice and Accountability captures perceptions of the extent to which a country's citizens are able to participate in selecting their government, as well as freedom of expression, freedom of association, and a free media."
}, {
  "id": "5.51.01.07.gender", "name": "Gender equality",
  "sourceNote": "The indicator is defined as the ratio of the gross enrollment rate of girls to boys in primary and secondary education levels in both public and private schools. Women have an enormous impact on the well-being of their families and societies, but their potential is sometimes not realized because of discriminatory social norms, incentives, and legal institutions. Although their status has improved in recent decades, gender inequalities persist. Education is one of the most important aspects of human development, and eliminating gender disparity at all levels of education would help to increase the status and capabilities of women. This indicator provides a measure of equality of educational opportunity and relates to the third MDG that seeks to promote gender equality and the empowerment of women."
}, {
  "id": "VC.IHR.NPOL.P5", "name": "Intentional homicides, government police sources (per 100,000 people)",
  "sourceNote": ""
}, {
  "id": "NE.CON.PRVT.ZS", "name": "Households and NPISHs final consumption expenditure (% of GDP)",
  "sourceNote": "Household final consumption expenditure (formerly private consumption) is the market value of all goods and services, including durable products (such as cars, washing machines, and home computers), purchased by households. It excludes purchases of dwellings but includes imputed rent for owner-occupied dwellings. It also includes payments and fees to governments to obtain permits and licenses. Here, household consumption expenditure includes the expenditures of nonprofit institutions serving households, even when reported separately by the country. This item also includes any statistical discrepancy in the use of resources relative to the supply of resources.", "sourceOrganization": "World Bank national accounts data, and OECD National Accounts data files."
}, {
  "id": "IS.VEH.PCAR.P3", "name": "Passenger cars (per 1,000 people)",
  "sourceNote": "Passenger cars refer to road motor vehicles, other than two-wheelers, intended for the carriage of passengers and designed to seat no more than nine people (including the driver)."
}, {
  "id": "SH.STA.ACSN.UR", "name": "Improved sanitation facilities, urban (% of urban population with access)",
  "sourceNote": "Access to improved sanitation facilities, urban, refers to the percentage of the urban population using improved sanitation facilities. Improved sanitation facilities are likely to ensure hygienic separation of human excreta from human contact. They include flush\/pour flush (to piped sewer system, septic tank, pit latrine), ventilated improved pit (VIP) latrine, pit latrine with slab, and composting toilet."
}, {
  "id": "IC.FRM.OBS.OBST4", "name": "Percent of firms choosing corruption as their biggest obstacle",
  "sourceNote": "Percent of firms that chose corruption as the biggest obstacle faced by this establishment.  (Survey respondents were presented with a list of 15 potential obstacles.)   Source:World Bank, Enterprise Surveys Project(http:\/\/www.enterprisesurveys.org\/CustomQuery)."
}, {
  "id": "GV.TI.SCOR.IDX", "name": "Corruption Perceptions Index (score)",
  "sourceNote": "This information is from the http:\/\/www.transparency.org Transparency International web site.  More information may be available there.  CPI Score relates to perceptions of the degree of corruption as seen by business people and country analysts, and ranges between 0 (highly corrupt) and 10 (highly clean).  Data for 2012 Corruption Perceptions Index scores countries on a scale from 0 (highly corrupt) to 100 (very clean).  Confidence range provides a range of possible values of the CPI score. This reflects how a country's score may vary, depending on measurement precision. Nominally, with 5 percent probability the score is above this range and with another 5 percent it is below."
}, {
  "id": "IC.FRM.CORR.GRAFT2", "name": "Bribery index (% of gift or informal payment requests during public transactions)",
  "sourceNote": "Bribery index is the percentage of gift or informal payment requests during 6 infrastructure, permits and licences, and tax transactions.   Source:World Bank, Enterprise Surveys Project(http:\/\/www.enterprisesurveys.org\/Data\/ExploreTopics\/corruption)."
}, {
  "id": "HOU.ELC.ACSN.ZS", "name": "Household Access to Electricity: Total (in % of total household)",
  "sourceNote": ""
}, {
  "id": "FX.OWN.TOTL.ZS", "name": "Account ownership at a financial institution or with a mobile-money-service provider (% of population ages 15+)",
  "sourceNote": "Account denotes the percentage of respondents who report having an account (by themselves or together with someone else) at a bank or another type of financial institution or report personally using a mobile money service in the past 12 months (% age 15+)."
}, {
  "id": "SH.STA.ACCH.ZS", "name": "Health care (% of population with access)",
  "sourceNote": ""
}, {
  "id": "SH.STA.BASS.ZS", "name": "People using at least basic sanitation services (% of population)",
  "sourceNote": "The percentage of people using at least basic sanitation services, that is, improved sanitation facilities that are not shared with other households.  This indicator encompasses both people using basic sanitation services as well as those using safely managed sanitation services.   Improved sanitation facilities include flush\/pour flush to piped sewer systems, septic tanks or pit latrines; ventilated improved pit latrines, compositing toilets or pit latrines with slabs."
}, {
  "id": "SI.POV.25DAY", "name": "Poverty headcount ratio at $2.5 a day (PPP) (% of population)",
  "sourceNote": "Population below $2.5 a day is the percentage of the population living on less than $2.5 a day at 2005 international prices. "
}, {
  "id": "SI.POV.NAPR.ZS", "name": "Poverty Rate (in % of population)", "sourceNote": ""
}, {
  "id": "SI.POV.NAHC", "name": "Poverty headcount ratio at national poverty lines (% of population)",
  "sourceNote": "National poverty headcount ratio is the percentage of the population living below the national poverty lines. National estimates are based on population-weighted subgroup estimates from household surveys."
}, {
  "id": "SH.ADM.INPT", "name": "Inpatient admission rate (% of population )", "sourceNote": ""
}, {
  "id": "SH.DYN.AIDS.ZS", "name": "Prevalence of HIV, total (% of population ages 15-49)",
  "sourceNote": "Prevalence of HIV refers to the percentage of people ages 15-49 who are infected with HIV."
}, {
  "id": "SM.POP.TOTL.ZS", "name": "International migrant stock (% of population)",
  "sourceNote": 'International migrant stock is the number of people born in a country other than that in which they live. It also includes refugees. The data used to estimate the international migrant stock at a particular time are obtained mainly from population censuses. The estimates are derived from the data on foreign-born population--people who have residence in one country but were born in another country. When data on the foreign-born population are not available, data on foreign population--that is, people who are citizens of a country other than the country in which they reside--are used as estimates. After the breakup of the Soviet Union in 1991 people living in one of the newly independent countries who were born in another were classified as international migrants. Estimates of migrant stock in the newly independent states from 1990 on are based on the 1989 census of the Soviet Union. For countries with information on the international migrant stock for at least two points in time, interpolation or extrapolation was used to estimate the international migrant stock on July 1 of the reference years. For countries with only one observation, estimates for the reference years were derived using rates of change in the migrant stock in the years preceding or following the single observation available. A model was used to estimate migrants for countries that had no data.'
}, {
  "id": "SN.ITK.DEFC.ZS", "name": "Prevalence of undernourishment (% of population)",
  "sourceNote": "Population below minimum level of dietary energy consumption (also referred to as prevalence of undernourishment) shows the percentage of the population whose food intake is insufficient to meet dietary energy requirements continuously. Data showing as 5 may signify a prevalence of undernourishment below 5%.", "sourceOrganization": "Food and Agriculture Organization (http:\/\/www.fao.org\/publications\/en\/)."
}, {
  "id": "SH.STA.ODFC.ZS", "name": "People practicing open defecation (% of population)",
  "sourceNote": "People practicing open defecation refers to the percentage of the population defecating in the open, such as in fields, forest, bushes, open bodies of water, on beaches, in other open spaces or disposed of with solid waste."
}];

exports.default = obj;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2VzNi9hZGREYXRhREIuanMiLCJzY3JpcHRzL2VzNi9hcHAuanMiLCJzY3JpcHRzL2VzNi9idWlsZFRhYmxlLmpzIiwic2NyaXB0cy9lczYvY2FudmFzLmpzIiwic2NyaXB0cy9lczYvZHJhd0NoYXJ0LmpzIiwic2NyaXB0cy9lczYvZ2V0Q291bnRyaWVzLmpzIiwic2NyaXB0cy9lczYvaGVscGVyLmpzIiwic2NyaXB0cy9lczYvcmVhZERhdGEuanMiLCJzY3JpcHRzL2VzNi92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE1BQU0sRUFBVjs7QUFFQSxTQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWlDLFNBQWpDLEVBQTJDLFNBQTNDLEVBQXNEO0FBQ3BELE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1BQUksY0FBYyxHQUFHLGlCQUFILENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLENBQWxCO0FBQ0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixFQUEzQixFQUE4QixTQUE5QixFQUF3QztBQUN0QyxNQUFJLGNBQWMsR0FBRyxXQUFILENBQWUsQ0FBQyxTQUFELENBQWYsRUFBNEIsV0FBNUIsQ0FBbEI7QUFDQSxjQUFZLFVBQVosR0FBeUIsVUFBUyxLQUFULEVBQWdCO0FBQ3ZDO0FBQ0QsR0FGRDtBQUdBLGNBQVksT0FBWixHQUFzQixVQUFTLEtBQVQsRUFBZ0I7QUFDcEMsWUFBUSxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7QUFDRCxHQUZEO0FBR0EsU0FBTyxXQUFQO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQXlCLFdBQXpCLEVBQXFDLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1B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QjtBQUNFLFFBQUssZ0JBRFAsRUFDd0IsUUFBTyxpSEFEL0I7QUFFRSxnQkFBYTtBQUZmLENBcFFpQixFQXdRakI7QUFDRSxRQUFLLGdCQURQLEVBQ3dCLFFBQU8sMkNBRC9CO0FBRUUsZ0JBQWE7QUFGZixDQXhRaUIsRUE0UWpCO0FBQ0UsUUFBSyxnQkFEUCxFQUN3QixRQUFPLG1FQUQvQjtBQUVFLGdCQUFhO0FBRmYsQ0E1UWlCLEVBZ1JqQjtBQUNBLFFBQUssY0FETCxFQUNvQixRQUFPLCtEQUQzQjtBQUVBLGdCQUFhO0FBRmIsQ0FoUmlCLEVBb1JqQjtBQUNFLFFBQUssZ0JBRFAsRUFDd0IsUUFBTyxtQ0FEL0IsRUFDbUUsY0FBYTtBQURoRixDQXBSaUIsRUF1UmpCO0FBQ0UsUUFBSyxhQURQLEVBQ3FCLFFBQU8scUVBRDVCO0FBRUUsZ0JBQWE7QUFGZixDQXZSaUIsRUEyUmpCO0FBQ0UsUUFBSyxhQURQLEVBQ3FCLFFBQU8sNkNBRDVCLEVBQzBFLGNBQWE7QUFEdkYsQ0EzUmlCLEVBOFJqQjtBQUNFLFFBQUssZ0JBRFAsRUFDd0IsUUFBTyx1REFEL0I7QUFFRSxnQkFBYTtBQUZmLENBOVJpQixFQWtTakI7QUFDRSxRQUFLLGdCQURQLEVBQ3dCLFFBQU8sK0NBRC9CO0FBRUU7QUFGRixDQWxTaUIsRUFzU2pCO0FBQ0UsUUFBSyxnQkFEUCxFQUN3QixRQUFPLGtEQUQvQjtBQUVFLGdCQUFhLHVUQUZmLEVBRXVVLHNCQUFxQjtBQUY1VixDQXRTaUIsRUEwU2pCO0FBQ0UsUUFBSyxnQkFEUCxFQUN3QixRQUFPLHFEQUQvQjtBQUVBLGdCQUFhO0FBRmIsQ0ExU2lCLENBQWpCOztrQkF3VGUsRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IGRlZmF1bHQgYXMgZ2V0IH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHZhcmlhYmxlcyB9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQsc3RvcmVOYW1lLGNvbmZpZ09iaikge1xyXG4gIGxldCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuICBsZXQgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUsIGNvbmZpZ09iaik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHN0b3JlTmFtZSl7XHJcbiAgbGV0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oW3N0b3JlTmFtZV0sIFwicmVhZHdyaXRlXCIpO1xyXG4gIHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZygnb25jb21wbGV0ZSB0cmFuc2N0aW9uJywgZXZlbnQpO1xyXG4gIH07XHJcbiAgdHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnb25lcnJvciB0cmFuc2N0aW9uJywgZXZlbnQpXHJcbiAgfTtcclxuICByZXR1cm4gdHJhbnNhY3Rpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlY29yZChldmVudCxkYXRhVG9CZUFkZCxwcm9taXNlRm4gKXtcclxuICBsZXQgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcbiAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuXHJcbiAgLy9sZXQgcXVlcnkgPSBvYmplY3RTdG9yZS5nZXQobG9va2VkVmFsdWUpXHJcbiAgbGV0IHJlc3VsdDtcclxuXHJcbiAgbGV0IG9iamVjdFN0b3JlMSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcbiAgbGV0IGFkZFJlcXVlc3QgPSBvYmplY3RTdG9yZTEuYWRkKGRhdGFUb0JlQWRkKTtcclxuICBhZGRSZXF1ZXN0Lm9uY29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZygnYWRkUmVxdWVzdCBjb21wbGV0ZScsIGV2ZW50KVxyXG4gICAgcHJvbWlzZUZuLnJlc29sdmUoZXZlbnQpXHJcbiAgfTtcclxuICBhZGRSZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ2FkZFJlcXVlc3QgZXJyb3InLCBldmVudClcclxuICAgIGNvbnNvbGUubG9nKCdhZGRSZXF1ZXN0IG9uZXJyb3InLGV2ZW50LnRhcmdldC5lcnJvcilcclxuICAgIHByb21pc2VGbi5yZWplY3QoZXZlbnQpXHJcbiAgfTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcXVlc3RPcGVuRGIocHJvbWlzZUZuKXtcclxuICBsZXQgaW5kZXhlZERiID0gd2luZG93LmluZGV4ZWREQjtcclxuICBsZXQgcmVxdWVzdDtcclxuICBpZihpbmRleGVkRGIpe1xyXG4gICAgbGV0IHJlcXVlc3QgPSBpbmRleGVkRGIub3Blbih2YXJpYWJsZXMuSU5EX0RCX1NUT1JFX05BTUUpO1xyXG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25ibG9ja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYmxvY2tlZCcsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IG9uZXJyb3InLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGREYXRhKGRhdGFUb0JlQWRkKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgIGxldCBwcm9taXNlT2JqID0ge3Jlc29sdmUscmVqZWN0fTtcclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IHJlcXVlc3RPcGVuRGIocHJvbWlzZU9iailcclxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncmVxdWVzdCBvbnN1Y2Nlc3MnLCBldmVudClcclxuICAgICAgcmV0dXJuIGFkZFJlY29yZChldmVudCxkYXRhVG9CZUFkZCwgcHJvbWlzZU9iailcclxuICAgIH07XHJcblxyXG5cclxuICB9KVxyXG5cclxufTtcclxuXHJcblxyXG5vYmogPSB7XHJcbiAgYWRkRGF0YVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB7ZGVmYXVsdCBhcyBnZXR9IGZyb20gJy4vaGVscGVyLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHZhcmlhYmxlc30gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgZ2V0Q291bnRyaWVzfSBmcm9tICcuL2dldENvdW50cmllcy5qcyc7XHJcblxyXG5nZXRDb3VudHJpZXMuaW5pdCgpXHJcblxyXG5cclxuLypcclxuc3ByYXdkxbogY3p5IGplc3QgYmF6YVxyXG5zcHJhd2TFvCBjenkgbGlzdGEgcGHFhHN0dyBqZXN0IG5hIGJhemllXHJcbmplxZtsaSBqZXN0IHRvIGrEhSBwb2JpZXJ6XHJcbmplxZtsaSBuaWUgbWEgdG8gcG9iaWVyeiB6IG5ldHVcclxuaSB6YXBpc3ogamEgbmEgYmF6aWVcclxuXHJcblxyXG5cclxuXHJcblxyXG4qL1xyXG4iLCJpbXBvcnQgeyAgZGVmYXVsdCBhcyB2YXJpYWJsZXMgfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmxldCBvYmogPSB7fVxyXG5sZXQgZ2RwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG5mdW5jdGlvbiBidWlsZFRhYmxlKGRhdGEpIHtcclxuICBpZiAoZ2RwQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgZ2RwQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXHJcbiAgfVxyXG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RBQkxFJylcclxuICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKVxyXG4gIGxldCB5ZWFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKVxyXG4gIHllYXIuaW5uZXJIVE1MID0gJ3llYXInXHJcbiAgbGV0IHZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKVxyXG4gIHZhbHVlLmlubmVySFRNTCA9ICd2YWx1ZSdcclxuICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoeWVhcilcclxuICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQodmFsdWUpXHJcbiAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcclxuICBkYXRhID0gZGF0YVsxXVxyXG4gIC8vY29uc29sZS5sb2coJ2RhbmUnICsgZGF0YSlcclxuICBpZihkYXRhKXtcclxuICAgIGxldCB5ZWFyRGF0YTtcclxuICAgIGxldCB2YWx1ZURhdGE7XHJcbiAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGxldCBkYXRhUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKVxyXG4gICAgICB5ZWFyRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJylcclxuICAgICAgdmFsdWVEYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKCdkYW5lJyxpdGVtLmNvdW50cnkuZGF0ZSwgaXRlbS5jb3VudHJ5LnZhbHVlKVxyXG5cclxuICAgICAgeWVhckRhdGEuaW5uZXJIVE1MID0gaXRlbS5kYXRlXHJcbiAgICAgIHllYXJEYXRhLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAneWVhcicpXHJcbiAgICAgIGRhdGFSb3cuYXBwZW5kQ2hpbGQoeWVhckRhdGEpXHJcbiAgICAgIHZhbHVlRGF0YS5pbm5lckhUTUwgPSBOdW1iZXIoaXRlbS52YWx1ZSkudG9GaXhlZCgyKVxyXG4gICAgICBkYXRhUm93LmFwcGVuZENoaWxkKHZhbHVlRGF0YSlcclxuICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoZGF0YVJvdyk7XHJcbiAgICAgIC8vY29uc29sZS5sb2coaXRlbS5kYXRlKVxyXG4gICAgfSlcclxuXHJcbiAgICBnZHBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxub2JqID0ge1xyXG4gIGJ1aWxkVGFibGVcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQgeyAgZGVmYXVsdCBhcyB2YXJpYWJsZXMgfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG52YXJpYWJsZXMuVklTVUFMSVpBVElPTl9TRUxFQ1RPUlxyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuVklTVUFMSVpBVElPTl9TRUxFQ1RPUilcclxuXHJcbmZ1bmN0aW9uIHZpc3VhbGl6ZURhdGEoZGF0YSkge1xyXG4gIGRhdGEgPSBkYXRhWzFdXHJcbiAgY29uc29sZS5sb2coZGF0YSlcclxuICBpZihkYXRhKXtcclxuICAgIGxldCBtaW5ZZWFyID0gTWF0aC5taW4oIC4uLmRhdGEubWFwKGl0ZW09PiBpdGVtLmRhdGUpKVxyXG4gICAgbGV0IG1heFllYXIgPU1hdGgubWF4KCAuLi5kYXRhLm1hcChpdGVtPT4gaXRlbS5kYXRlKSlcclxuICAgIGxldCBtaW5WYWwgPSBNYXRoLm1pbiggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0udmFsdWUpKVxyXG4gICAgbGV0IG1heFZhbCA9IE1hdGgubWF4KCAuLi5kYXRhLm1hcChpdGVtPT4gaXRlbS52YWx1ZSkpXHJcbiAgICBsZXQgeWVhclVuaXQgPSA0MDAvKG1heFllYXItbWluWWVhcilcclxuICAgIGxldCB2YWx1ZVVuaXQgPSAyMDAvKG1heFZhbC1taW5WYWwpXHJcblxyXG4gICAgY29uc29sZS5sb2coJ3llYXJVbml0LHZhbHVlVW5pdCcrbWluWWVhcixtYXhZZWFyLHllYXJVbml0LHZhbHVlVW5pdClcclxuXHJcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGN0eC5zdHJva2VTdHlsZT1cInJlZFwiO1xyXG4gICAgY3R4LmxpbmVXaWR0aD01O1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbygwLCAzMDApO1xyXG4gICAgbGV0IHg9eWVhclVuaXQ7O1xyXG4gICAgbGV0IHk9eWVhclVuaXQ7XHJcbiAgICBkYXRhLmZvckVhY2goaXRlbT0+e1xyXG4gICAgICAvL3g9eWVhclVuaXQqaXRlbS5kYXRlXHJcbiAgICAgIC8vY29uc29sZS5sb2codmFsdWVVbml0LGl0ZW0udmFsdWUpXHJcbiAgICAgIHkgPSAoMjAwICogaXRlbS52YWx1ZSkvbWF4VmFsO1xyXG4gICAgICBjb25zb2xlLmxvZygneGl5JyArIHgseSlcclxuICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcclxuICAgICAgeD14KyB5ZWFyVW5pdFxyXG4gICAgICB5PTBcclxuICAgIH0pXHJcbiAgICAvL2N0eC5saW5lVG8oMjAwLCAxMDApO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2coY2FudmFzKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IG9iaiA9IHt2aXN1YWxpemVEYXRhfVxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyB2YXJpYWJsZXNcclxufSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxuZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeydwYWNrYWdlcyc6Wydjb3JlY2hhcnQnXX0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVEYXRhRm9yQ2hhcnQoZGF0YUZvckNoYXJ0KXtcclxuICBsZXQgcHJlcGFyZWREYXRhO1xyXG4gIGlmKGRhdGFGb3JDaGFydCl7XHJcbiAgICBkYXRhRm9yQ2hhcnQgPSBkYXRhRm9yQ2hhcnRbMV1cclxuICAgIGRhdGFGb3JDaGFydCA9IGRhdGFGb3JDaGFydC5yZXZlcnNlKClcclxuXHJcbiAgICBwcmVwYXJlZERhdGEgPSBbXHJcbiAgICAgIC8vWydZZWFyJywgJ1ZhbHVlJ11cclxuICAgIF07XHJcbiAgICBkYXRhRm9yQ2hhcnQuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgbGV0IG9uZUl0ZW0gPSBbXVxyXG4gICAgICBvbmVJdGVtLnB1c2goaXRlbS5kYXRlKVxyXG4gICAgICBvbmVJdGVtLnB1c2goTnVtYmVyKGl0ZW0udmFsdWUpKVxyXG4gICAgICBwcmVwYXJlZERhdGEucHVzaChvbmVJdGVtKVxyXG4gICAgfSlcclxuICAgIHByZXBhcmVkRGF0YS5zb3J0KChhLGIpPT5wYXJzZUZsb2F0KGFbMF0pLXBhcnNlRmxvYXQoYlswXSkpXHJcbiAgICBwcmVwYXJlZERhdGEudW5zaGlmdChbJ1llYXInLCAnVmFsdWUnXSlcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIHByZXBhcmVkRGF0YVxyXG59XHJcbmZ1bmN0aW9uIGRyYXdDaGFydEZvckdDaGFydHMoZGF0YWZvckNoYXJ0LGNvdW50cnkpe1xyXG4gIGdvb2dsZS5jaGFydHMubG9hZCgnY3VycmVudCcsIHsncGFja2FnZXMnOlsnY29yZWNoYXJ0J119KTtcclxuICBnb29nbGUuY2hhcnRzLnNldE9uTG9hZENhbGxiYWNrKGRyYXdDaGFydChkYXRhZm9yQ2hhcnQsY291bnRyeSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3Q2hhcnQoZGF0YWZvckNoYXJ0LGNvdW50cnkpIHtcclxuXHJcblxyXG4gIGxldCBwcmVwYXJlZERhdGEgPSBwcmVwYXJlRGF0YUZvckNoYXJ0KGRhdGFmb3JDaGFydCk7XHJcbiAgbGV0IGRhdGEgPSBnb29nbGUudmlzdWFsaXphdGlvbi5hcnJheVRvRGF0YVRhYmxlKHByZXBhcmVkRGF0YSlcclxuXHJcbiAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICB0aXRsZTogY291bnRyeSxcclxuICAgIGN1cnZlVHlwZTogJ2Z1bmN0aW9uJyxcclxuICAgIGxlZ2VuZDogeyBwb3NpdGlvbjogJ2JvdHRvbScgfVxyXG4gIH07XHJcblxyXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnZlX2NoYXJ0JykpO1xyXG5cclxuICBjaGFydC5kcmF3KGRhdGEsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGRyYXdDaGFydEZvckdDaGFydHNcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgdmFyaWFibGVzXHJcbn0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgYnVpbGRUYWJsZVxyXG59IGZyb20gJy4vYnVpbGRUYWJsZS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBjYW52YXNcclxufSBmcm9tICcuL2NhbnZhcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyByZWFkRGF0YURCXHJcbn0gZnJvbSAnLi9yZWFkRGF0YS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBhZGREYXRhREJcclxufSBmcm9tICcuL2FkZERhdGFEQi5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBkcmF3Q2hhcnRcclxufSBmcm9tICcuL2RyYXdDaGFydC5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxuXHJcblxyXG5sZXQgc2VsZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuU0VMRUNUX0NPVU5UUllfU0VMRUNUT1IpO1xyXG5sZXQgY291bnRyeUxpc3RMaW5rID0gdmFyaWFibGVzLkNPVU5UUllfTElTVF9MSU5LO1xyXG5sZXQgZ2RwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcbmxldCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTRUxFQ1QnKTtcclxubGV0IHNlbGVjdEluZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpO1xyXG5sZXQgZ2V0RGF0YUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkdFVF9EQVRBX0JUTik7XHJcbmxldCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuREVTQ1JJUFRJT05fU0VMRUNUT1IpO1xyXG5sZXQgaW5mb0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLklORk9fQk9YX1NFTEVDVE9SKTtcclxuXHJcbmdldERhdGFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXREYXRhKVxyXG5zZWxlY3RJbmRpY2F0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0SW5kaWNhdG9yRGVzY3JpcHRpb24pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEluZGljYXRvckRlc2NyaXB0aW9uKCkge1xyXG4gIGRlc2NyaXB0aW9uRmllbGQuaW5uZXJIVE1MID0gZXZlbnQudGFyZ2V0Lm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXNvdXJjZW5vdGUnKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gIGxldCB1cmwgPSBgaHR0cDovL2FwaS53b3JsZGJhbmsub3JnL3YyL2NvdW50cmllcy8ke3NlbGVjdC52YWx1ZX0vaW5kaWNhdG9ycy8ke3NlbGVjdEluZGljYXRvci52YWx1ZX0/Zm9ybWF0PWpzb25gXHJcbiAgbGV0IHF1ZXJ5TmFtZSA9IGAke3NlbGVjdC52YWx1ZX1fJHtzZWxlY3RJbmRpY2F0b3IudmFsdWV9YFxyXG4gIGxldCBjb3VudHJ5ID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY291bnRyeScpXHJcbiAgaW5mb0JveC5pbm5lckhUTUwgPScnXHJcbiAgbGV0IHByb21pcyA9IHJlYWREYXRhREIucmVhZERhdGEocXVlcnlOYW1lKTtcclxuICBwcm9taXMudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBnZXQodXJsKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgbWluaWZ5RGF0YShkYXRhKVxyXG4gICAgICAgICAgZHJhd0NoYXJ0LmRyYXdDaGFydEZvckdDaGFydHMoZGF0YSxjb3VudHJ5KVxyXG4gICAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSB7cXVlcnk6cXVlcnlOYW1lLGRhdGE6ZGF0YX1cclxuICAgICAgICAgIGFkZERhdGFEQi5hZGREYXRhKGRhdGFUb1NhdmUpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpbmZvQm94LmlubmVySFRNTCA9IFwiRXJyb3Igd2l0aCBnZXR0aW5nIGRhdGEgZnJvbSB3YiBhcGlcIlxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHdpdGggZ2V0dGluZyBkYXRhIGZyb20gd2IgYXBpJyxlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZHJhd0NoYXJ0LmRyYXdDaGFydEZvckdDaGFydHMoZGF0YS5kYXRhLGNvdW50cnkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciByZWFkaW5nIGRhdGEnLCBlcnJvcilcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWluaWZ5RGF0YShkYXRhKXtcclxuICBsZXQgbmV3RGF0YSA9IFtdO1xyXG4gIC8vZGF0YS5zcGxpY2VbMCwxXHJcbiAgZGF0YVsxXS5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgbGV0IG5ld0l0ZW0gPSB7XHJcbiAgICAgIGRhdGU6aXRlbS5kYXRlLFxyXG4gICAgICB2YWx1ZTppdGVtLnZhbHVlXHJcbiAgICB9XHJcbiAgICBuZXdEYXRhLnB1c2gobmV3SXRlbSlcclxuICB9KVxyXG4gIGRhdGFbMV09bmV3RGF0YVxyXG4gIHJldHVybiBuZXdEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb3VudHJpZXMoY291bnRyaWVzKSB7XHJcbiAgY291bnRyaWVzID0gSlNPTi5wYXJzZShjb3VudHJpZXMpXHJcbiAgY291bnRyaWVzWzFdLnNvcnQoKGEsYik9PiAoJycrIGEubmFtZSkubG9jYWxlQ29tcGFyZShiLm5hbWUpKVxyXG4gIGxldCBvcHRpb247XHJcbiAgY291bnRyaWVzWzFdLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZihpdGVtLmNhcGl0YWxDaXR5KXtcclxuICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJylcclxuICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpdGVtLmlkKVxyXG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdsYWJlbCcsIGl0ZW0ubmFtZSlcclxuICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY291bnRyeScsIGl0ZW0ubmFtZSlcclxuICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGljYXRvcnMoKSB7XHJcbiAgbGV0IG9wdGlvbjtcclxuICB2YXJpYWJsZXMuSU5ESUNBVE9SUy5mb3JFYWNoKGluZGljYXRvciA9PiB7XHJcbiAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaW5kaWNhdG9yLmlkKVxyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnbGFiZWwnLCBpbmRpY2F0b3IubmFtZSlcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXNvdXJjZU5vdGUnLCBpbmRpY2F0b3Iuc291cmNlTm90ZSlcclxuICAgIHNlbGVjdEluZGljYXRvci5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gIH0pXHJcblxyXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RJbmRpY2F0b3IpO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgbGV0IHByb21pcyA9IHJlYWREYXRhREIucmVhZERhdGEodmFyaWFibGVzLklORF9EQl9DT1VOVFJZX0xJU1QpO1xyXG4gIHByb21pcy50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGlmQ291bnRyeUxpc3RFeGlzdChkYXRhKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciByZWFkaW5nIGRhdGEnLCBlcnJvcilcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpZkNvdW50cnlMaXN0RXhpc3QoZGF0YSkge1xyXG4gIGlmICghZGF0YSkge1xyXG4gICAgbGV0IGNvdW50cnlMaXN0ID0gZ2V0Q291bnRyeUxpc3QoKTtcclxuICB9IGVsc2V7XHJcbiAgICBnZXRDb3VudHJpZXMoZGF0YS5kYXRhKVxyXG4gIH1cclxuICBnZXRJbmRpY2F0b3JzKClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldENvdW50cnlMaXN0KCkge1xyXG4gIGxldCBjb3VudHJ5TGlzdCA9IGdldCh2YXJpYWJsZXMuQ09VTlRSWV9MSVNUX0xJTkspO1xyXG4gIGNvdW50cnlMaXN0LnRoZW4oKGRhdGEpID0+IHtcclxuICAgIGdldENvdW50cmllcyhkYXRhKVxyXG4gICAgbGV0IGRhdGFUb1NhdmUgPSB7cXVlcnk6dmFyaWFibGVzLklORF9EQl9DT1VOVFJZX0xJU1QsZGF0YTpkYXRhfVxyXG4gICAgYWRkRGF0YURCLmFkZERhdGEoZGF0YVRvU2F2ZSlcclxuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdnZXRDb3VudHJ5TGlzdCBlcnJvciAnLCBlcnJvcilcclxuICB9KVxyXG4gIHJldHVybiBjb3VudHJ5TGlzdFxyXG59XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGluaXRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXQodXJsKXtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGh0dHAub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcclxuICAgIHhodHRwLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoeGh0dHAuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIHJlc29sdmUoeGh0dHAucmVzcG9uc2UpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KHhodHRwLnN0YXR1c1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGh0dHAub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZWplY3QoeGh0dHAuc3RhdHVzVGV4dClcclxuICAgIH07XHJcbiAgICB4aHR0cC5zZW5kKCk7XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldCB9IGZyb20gJy4vaGVscGVyLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyB2YXJpYWJsZXMgfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxubGV0IGtleVBhdGggPSAncXVlcnknO1xyXG5sZXQgc3RvcmVOYW1lID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxubGV0IGNvbmZpZ09iaiA9IHsga2V5UGF0aDogJ3F1ZXJ5J31cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQsc3RvcmVOYW1lLGNvbmZpZ09iaikge1xyXG4gIGxldCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuICBsZXQgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUsIGNvbmZpZ09iaik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHN0b3JlTmFtZSxwcm9taXNlRm4pe1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFtzdG9yZU5hbWVdLCApO1xyXG4gIHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICB9O1xyXG4gIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uZXJyb3IgdHJhbnNjdGlvbicsIGV2ZW50KVxyXG4gICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICB9O1xyXG4gIHJldHVybiB0cmFuc2FjdGlvbjtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRSZWNvcmQoZXZlbnQsbG9va2VkVmFsdWUscHJvbWlzZUZuICl7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYixzdG9yZU5hbWUscHJvbWlzZUZuKTtcclxuICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gIGxldCBxdWVyeSA9IG9iamVjdFN0b3JlLmdldChsb29rZWRWYWx1ZSlcclxuICBsZXQgcmVzdWx0O1xyXG5cclxuICBxdWVyeS5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdxdWVyeSBlcnJvcicsZXZlbnQpXHJcbiAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gIH07XHJcbiAgcXVlcnkub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuICAgIHByb21pc2VGbi5yZXNvbHZlKHJlc3VsdClcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlcXVlc3RPcGVuRGIocHJvbWlzZUZuKXtcclxuICBsZXQgaW5kZXhlZERiID0gd2luZG93LmluZGV4ZWREQjtcclxuICBsZXQgcmVxdWVzdDtcclxuICBpZihpbmRleGVkRGIpe1xyXG4gICAgbGV0IHJlcXVlc3QgPSBpbmRleGVkRGIub3BlbihzdG9yZU5hbWUpO1xyXG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25ibG9ja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYmxvY2tlZCcsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IG9uZXJyb3InLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWREYXRhKGxvb2tlZFZhbHVlKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgIGxldCBwcm9taXNlT2JqID0ge3Jlc29sdmUscmVqZWN0fTtcclxuICAgIGxldCByZXF1ZXN0ID0gcmVxdWVzdE9wZW5EYihwcm9taXNlT2JqKVxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICByZXR1cm4gcmVhZFJlY29yZChldmVudCxsb29rZWRWYWx1ZSwgcHJvbWlzZU9iailcclxuICAgIH07XHJcbiAgfSlcclxufTtcclxuXHJcblxyXG5cclxub2JqID0ge1xyXG4gIHJlYWREYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiY29uc3Qgb2JqID0ge31cclxuXHJcblxyXG5sZXQga2V5UGF0aCA9ICdxdWVyeSc7XHJcbmxldCBzdG9yZU5hbWUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5sZXQgY29uZmlnT2JqID0geyBrZXlQYXRoOiAncXVlcnknfVxyXG5cclxub2JqLklORF9EQl9DT1VOVFJZX0xJU1QgPSAnY291bnRyeUxpc3QnXHJcbm9iai5JTkRfREJfS0VZX1BBVEggPSAncXVlcnknO1xyXG5vYmouSU5EX0RCX0NPTkZJR19PQkogPSB7IGtleVBhdGg6ICdxdWVyeSd9O1xyXG5vYmouSU5EX0RCX1NUT1JFX05BTUUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5cclxub2JqLklORF9EQl9TVE9SRV9OQU1FID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxub2JqLlNFTEVDVF9DT1VOVFJZX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInNlbGVjdC1jb250YWluZXJcIl0nO1xyXG5vYmouR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJnZHAtY29udGFpbmVyXCJdJztcclxub2JqLkNPVU5UUllfTElTVF9MSU5LID0gJ2h0dHBzOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyaWVzP2Zvcm1hdD1KU09OJnBlcl9wYWdlPTMwNSc7XHJcbi8vYGh0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXMvJHtldmVudC50YXJnZXQudmFsdWV9L2luZGljYXRvcnMvTlkuR0RQLk1LVFAuQ0Q/Zm9ybWF0PWpzb25gXHJcbm9iai5JTkRJQ0FUT1JTX0xJTksgPSAnaHR0cDovL2FwaS53b3JsZGJhbmsub3JnL3YyL2luZGljYXRvcnM/Zm9ybWF0PWpzb24nO1xyXG5vYmouR0VUX0RBVEFfQlROID0gJ1tkYXRhLXRhcmdldD1cImdldC1kYXRhLWJ1dHRvblwiXSc7XHJcblxyXG5vYmouSU5GT19CT1hfU0VMRUNUT1IgPSdbZGF0YS10YXJnZXQ9XCJpbmZvLWJveFwiXSdcclxub2JqLkRFU0NSSVBUSU9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImRlc2NyaXB0aW9uLWNvbnRhaW5lclwiXSc7XHJcblxyXG5vYmouVklTVUFMSVpBVElPTl9TRUxFQ1RPUiA9J1tkYXRhLXRhcmdldD1cInZpc3VhbGlzYXRpb24tY29udGFpbmVyXCJdJztcclxuXHJcbm9iai5JTkRJQ0FUT1JTID0gW3tcclxuICAgIFwiaWRcIjogXCJOWS5BREouQUVEVS5HTi5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQWRqdXN0ZWQgc2F2aW5nczogZWR1Y2F0aW9uIGV4cGVuZGl0dXJlICglIG9mIEdOSSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkVkdWNhdGlvbiBleHBlbmRpdHVyZSByZWZlcnMgdG8gdGhlIGN1cnJlbnQgb3BlcmF0aW5nIGV4cGVuZGl0dXJlcyBpbiBlZHVjYXRpb24sIGluY2x1ZGluZyB3YWdlcyBhbmQgc2FsYXJpZXMgYW5kIGV4Y2x1ZGluZyBjYXBpdGFsIGludmVzdG1lbnRzIGluIGJ1aWxkaW5ncyBhbmQgZXF1aXBtZW50LlwiLFxyXG4gICAgXCJzb3VyY2VPcmdhbml6YXRpb25cIjogXCJVTkVTQ087IGRhdGEgYXJlIGV4dHJhcG9sYXRlZCB0byB0aGUgbW9zdCByZWNlbnQgeWVhciBhdmFpbGFibGVcIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJnMjAudC5yZWNlaXZlLjFcIixcclxuICAgIFwibmFtZVwiOiBcIlJlY2VpdmVkIGRpZ2l0YWwgcGF5bWVudHMgaW4gdGhlIHBhc3QgeWVhciwgbWFsZSAoJSBhZ2UgMTUrKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiVGhlIHBlcmNlbnRhZ2Ugb2YgcmVzcG9uZGVudHMgd2hvIHJlcG9ydCB1c2luZyBtb2JpbGUgbW9uZXksIGEgZGViaXQgb3IgY3JlZGl0IGNhcmQsIG9yIGEgbW9iaWxlIHBob25lIHRvIHJlY2VpdmUgYSBwYXltZW50IHRocm91Z2ggYW4gYWNjb3VudCBpbiB0aGUgcGFzdCAxMiBtb250aHMuIEl0IGFsc28gaW5jbHVkZXMgcmVzcG9uZGVudHMgd2hvIHJlcG9ydCByZWNlaXZpbmcgcmVtaXR0YW5jZXMsIHJlY2VpdmluZyBwYXltZW50cyBmb3IgYWdyaWN1bHR1cmFsIHByb2R1Y3RzLCByZWNlaXZpbmcgZ292ZXJubWVudCB0cmFuc2ZlcnMsIHJlY2VpdmluZyB3YWdlcywgb3IgcmVjZWl2aW5nIGEgcHVibGljIHNlY3RvciBwZW5zaW9uIGRpcmVjdGx5IGludG8gYSBmaW5hbmNpYWwgaW5zdGl0dXRpb24gYWNjb3VudCBvciB0aHJvdWdoIGEgbW9iaWxlIG1vbmV5IGFjY291bnQgaW4gdGhlIHBhc3QgMTIgbW9udGhzLCBtYWxlICglIGFnZSAxNSspLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiTlkuR0RQLkRFRkwuS0QuWkcuQURcIixcclxuICAgIFwibmFtZVwiOiBcIkluZmxhdGlvbiwgR0RQIGRlZmxhdG9yOiBsaW5rZWQgc2VyaWVzIChhbm51YWwgJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkluZmxhdGlvbiBhcyBtZWFzdXJlZCBieSB0aGUgYW5udWFsIGdyb3d0aCByYXRlIG9mIHRoZSBHRFAgaW1wbGljaXQgZGVmbGF0b3Igc2hvd3MgdGhlIHJhdGUgb2YgcHJpY2UgY2hhbmdlIGluIHRoZSBlY29ub215IGFzIGEgd2hvbGUuIFRoaXMgc2VyaWVzIGhhcyBiZWVuIGxpbmtlZCB0byBwcm9kdWNlIGEgY29uc2lzdGVudCB0aW1lIHNlcmllcyB0byBjb3VudGVyYWN0IGJyZWFrcyBpbiBzZXJpZXMgb3ZlciB0aW1lIGR1ZSB0byBjaGFuZ2VzIGluIGJhc2UgeWVhcnMsIHNvdXJjZSBkYXRhIGFuZCBtZXRob2RvbG9naWVzLiBUaHVzLCBpdCBtYXkgbm90IGJlIGNvbXBhcmFibGUgd2l0aCBvdGhlciBuYXRpb25hbCBhY2NvdW50cyBzZXJpZXMgaW4gdGhlIGRhdGFiYXNlIGZvciBoaXN0b3JpY2FsIHllYXJzLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU00uUE9QLk5FVE1cIixcclxuICAgIFwibmFtZVwiOiBcIk5ldCBtaWdyYXRpb25cIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIk5ldCBtaWdyYXRpb24gaXMgdGhlIG5ldCB0b3RhbCBvZiBtaWdyYW50cyBkdXJpbmcgdGhlIHBlcmlvZCwgdGhhdCBpcywgdGhlIHRvdGFsIG51bWJlciBvZiBpbW1pZ3JhbnRzIGxlc3MgdGhlIGFubnVhbCBudW1iZXIgb2YgZW1pZ3JhbnRzLCBpbmNsdWRpbmcgYm90aCBjaXRpemVucyBhbmQgbm9uY2l0aXplbnMuIERhdGEgYXJlIGZpdmUteWVhciBlc3RpbWF0ZXMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTSC5DT04uQUlEUy5NQS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIGFkdWx0IG1hbGUgKCUgYWdlcyAxNS00OSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkNvbmRvbSB1c2UgYXQgbGFzdCBoaWdoLXJpc2sgc2V4LCBtYWxlIGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBtYWxlIHBvcHVsYXRpb24gYWdlcyAxNS00OSB3aG8gdXNlZCBhIGNvbmRvbSBhdCBsYXN0IGludGVyY291cnNlIHdpdGggYSBub24tbWFyaXRhbCBhbmQgbm9uLWNvaGFiaXRpbmcgc2V4dWFsIHBhcnRuZXIgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0guQ09OLkFJRFMuRkUuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkNvbmRvbSB1c2UgYXQgbGFzdCBoaWdoLXJpc2sgc2V4LCBhZHVsdCBmZW1hbGUgKCUgYWdlcyAxNS00OSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkNvbmRvbSB1c2UgYXQgbGFzdCBoaWdoLXJpc2sgc2V4LCBmZW1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGZlbWFsZSBwb3B1bGF0aW9uIGFnZXMgMTUtNDkgd2hvIHVzZWQgYSBjb25kb20gYXQgbGFzdCBpbnRlcmNvdXJzZSB3aXRoIGEgbm9uLW1hcml0YWwgYW5kIG5vbi1jb2hhYml0aW5nIHNleHVhbCBwYXJ0bmVyIGluIHRoZSBsYXN0IDEyIG1vbnRocy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTSC5DT04uMTUyNC5NQS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ29uZG9tIHVzZSwgcG9wdWxhdGlvbiBhZ2VzIDE1LTI0LCBtYWxlICglIG9mIG1hbGVzIGFnZXMgMTUtMjQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJDb25kb20gdXNlLCBtYWxlIGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBtYWxlIHBvcHVsYXRpb24gYWdlcyAxNS0yNCB3aG8gdXNlZCBhIGNvbmRvbSBhdCBsYXN0IGludGVyY291cnNlIGluIHRoZSBsYXN0IDEyIG1vbnRocy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTSC5DT04uMTUyNC5GRS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ29uZG9tIHVzZSwgcG9wdWxhdGlvbiBhZ2VzIDE1LTI0LCBmZW1hbGUgKCUgb2YgZmVtYWxlcyBhZ2VzIDE1LTI0KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSwgZmVtYWxlIGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBmZW1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTI0IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2UgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNHLlJTWC5USVJELlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIHdpZmUgaXMganVzdGlmaWVkIHJlZnVzaW5nIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBpcyB0aXJlZCBvciBub3QgaW4gdGhlIG1vb2QgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZWQgMTUtNDkgd2hvIGJlbGlldmUgdGhhdCBhIHdpZmUgaXMganVzdGlmaWVkIGluIHJlZnVzaW5nIHRvIGhhdmUgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGlzIHRpcmVkIG9yIG5vdCBpbiB0aGUgbW9vZC5cIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guVE1EUy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaGUgaGFzIHNleHVhbGx5IHRyYW5zbWl0dGVkIGRpc2Vhc2UgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZWQgMTUtNDkgd2hvIGJlbGlldmUgdGhhdCBhIHdpZmUgaXMganVzdGlmaWVkIGluIHJlZnVzaW5nIHRvIGhhdmUgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGtub3dzIGh1c2JhbmQgaGFzIHNleHVhbGx5IHRyYW5zbWl0dGVkIGRpc2Vhc2UuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0cuUlNYLlNYT1QuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgd2lmZSBpcyBqdXN0aWZpZWQgcmVmdXNpbmcgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGtub3dzIGhlIGhhcyBzZXggd2l0aCBvdGhlciB3b21lbiAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaHVzYmFuZCBoYXMgc2V4IHdpdGggb3RoZXIgd29tZW4uXCJcclxuICB9LCB7XHJcbiAgICBcImlkXCI6IFwiU0cuUlNYLlJFQVMuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgd2lmZSBpcyBqdXN0aWZpZWQgcmVmdXNpbmcgc2V4IHdpdGggaGVyIGh1c2JhbmQgZm9yIGFsbCBvZiB0aGUgcmVhc29ucyAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBmb3IgYWxsIG9mIHRoZSByZWFzb25zOiBodXNiYW5kIGhhcyBzZXh1YWxseSB0cmFuc21pdHRlZCBkaXNlYXNlLCBodXNiYW5kIGhhcyBzZXggd2l0aCBvdGhlciB3b21lbiwgcmVjZW50bHkgZ2l2ZW4gYmlydGgsIHRpcmVkIG9yIG5vdCBpbiB0aGUgbW9vZC5cIlxyXG4gIH0sIHtcclxuICAgIFwiaWRcIjogXCJTRy5WQVcuQlVSTi5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSBodXNiYW5kIGlzIGp1c3RpZmllZCBpbiBiZWF0aW5nIGhpcyB3aWZlIHdoZW4gc2hlIGJ1cm5zIHRoZSBmb29kICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VzIDE1LTQ5IHdobyBiZWxpZXZlIGEgaHVzYmFuZFxcL3BhcnRuZXIgaXMganVzdGlmaWVkIGluIGhpdHRpbmcgb3IgYmVhdGluZyBoaXMgd2lmZVxcL3BhcnRuZXIgd2hlbiBzaGUgYnVybnMgdGhlIGZvb2QuXCJcclxuICB9LFxyXG5cclxuXHJcblxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQ0FQQS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFuayBjYXBpdGFsIHRvIGFzc2V0cyByYXRpbyAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkJhbmsgY2FwaXRhbCB0byBhc3NldHMgaXMgdGhlIHJhdGlvIG9mIGJhbmsgY2FwaXRhbCBhbmQgcmVzZXJ2ZXMgdG8gdG90YWwgYXNzZXRzLiBDYXBpdGFsIGFuZCByZXNlcnZlcyBpbmNsdWRlIGZ1bmRzIGNvbnRyaWJ1dGVkIGJ5IG93bmVycywgcmV0YWluZWQgZWFybmluZ3MsIGdlbmVyYWwgYW5kIHNwZWNpYWwgcmVzZXJ2ZXMsIHByb3Zpc2lvbnMsIGFuZCB2YWx1YXRpb24gYWRqdXN0bWVudHMuIENhcGl0YWwgaW5jbHVkZXMgdGllciAxIGNhcGl0YWwgKHBhaWQtdXAgc2hhcmVzIGFuZCBjb21tb24gc3RvY2spLCB3aGljaCBpcyBhIGNvbW1vbiBmZWF0dXJlIGluIGFsbCBjb3VudHJpZXMnIGJhbmtpbmcgc3lzdGVtcywgYW5kIHRvdGFsIHJlZ3VsYXRvcnkgY2FwaXRhbCwgd2hpY2ggaW5jbHVkZXMgc2V2ZXJhbCBzcGVjaWZpZWQgdHlwZXMgb2Ygc3Vib3JkaW5hdGVkIGRlYnQgaW5zdHJ1bWVudHMgdGhhdCBuZWVkIG5vdCBiZSByZXBhaWQgaWYgdGhlIGZ1bmRzIGFyZSByZXF1aXJlZCB0byBtYWludGFpbiBtaW5pbXVtIGNhcGl0YWwgbGV2ZWxzICh0aGVzZSBjb21wcmlzZSB0aWVyIDIgYW5kIHRpZXIgMyBjYXBpdGFsKS4gVG90YWwgYXNzZXRzIGluY2x1ZGUgYWxsIG5vbmZpbmFuY2lhbCBhbmQgZmluYW5jaWFsIGFzc2V0cy5cIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5TRi5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhbmNoZXMsIHNwZWNpYWxpemVkIHN0YXRlIGZpbmFuY2lhbCBpbnN0aXR1dGlvbnMgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJhbmsgYnJhbmNoZXMgKHBlciAxMDAsMDAwIHBlb3BsZSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guTUYuUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBtaWNyb2ZpbmFuY2UgaW5zdGl0dXRpb25zIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILkNPLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCcmFuY2hlcywgY29vcGVyYXRpdmVzIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILkNCLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCcmFuY2hlcywgY29tbWVyY2lhbCBiYW5rcyAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5BVE0uVE9UTC5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXV0b21hdGVkIHRlbGxlciBtYWNoaW5lcyAoQVRNcykgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkF1dG9tYXRlZCB0ZWxsZXIgbWFjaGluZXMgYXJlIGNvbXB1dGVyaXplZCB0ZWxlY29tbXVuaWNhdGlvbnMgZGV2aWNlcyB0aGF0IHByb3ZpZGUgY2xpZW50cyBvZiBhIGZpbmFuY2lhbCBpbnN0aXR1dGlvbiB3aXRoIGFjY2VzcyB0byBmaW5hbmNpYWwgdHJhbnNhY3Rpb25zIGluIGEgcHVibGljIHBsYWNlLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQVNULlBVQk8uWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkJhbmtpbmcgYXNzZXRzIGhlbGQgYnkgZ292ZXJubWVudC1vd25lZCBiYW5rcyAoJSBvZiB0b3RhbCBiYW5raW5nIGFzc2V0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQVNULk5QRVIuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkJhbmsgbm9ucGVyZm9ybWluZyBsb2FucyB0byB0b3RhbCBncm9zcyBsb2FucyAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkJhbmsgbm9ucGVyZm9ybWluZyBsb2FucyB0byB0b3RhbCBncm9zcyBsb2FucyBhcmUgdGhlIHZhbHVlIG9mIG5vbnBlcmZvcm1pbmcgbG9hbnMgZGl2aWRlZCBieSB0aGUgdG90YWwgdmFsdWUgb2YgdGhlIGxvYW4gcG9ydGZvbGlvIChpbmNsdWRpbmcgbm9ucGVyZm9ybWluZyBsb2FucyBiZWZvcmUgdGhlIGRlZHVjdGlvbiBvZiBzcGVjaWZpYyBsb2FuLWxvc3MgcHJvdmlzaW9ucykuIFRoZSBsb2FuIGFtb3VudCByZWNvcmRlZCBhcyBub25wZXJmb3JtaW5nIHNob3VsZCBiZSB0aGUgZ3Jvc3MgdmFsdWUgb2YgdGhlIGxvYW4gYXMgcmVjb3JkZWQgb24gdGhlIGJhbGFuY2Ugc2hlZXQsIG5vdCBqdXN0IHRoZSBhbW91bnQgdGhhdCBpcyBvdmVyZHVlLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJORS5UUkQuR05GUy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6XCJUcmFkZSAoJSBvZiBHRFApXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIlRyYWRlIGlzIHRoZSBzdW0gb2YgZXhwb3J0cyBhbmQgaW1wb3J0cyBvZiBnb29kcyBhbmQgc2VydmljZXMgbWVhc3VyZWQgYXMgYSBzaGFyZSBvZiBncm9zcyBkb21lc3RpYyBwcm9kdWN0LiBcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiU0wuR0RQLlBDQVAuRU0uS0QuWkdcIixcclxuICAgIFwibmFtZVwiOlwiR0RQIHBlciBwZXJzb24gZW1wbG95ZWQgKGFubnVhbCAlIGdyb3d0aClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIHBlciBwZXJzb24gZW1wbG95ZWQgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCAoR0RQKSBkaXZpZGVkIGJ5IHRvdGFsIGVtcGxveW1lbnQgaW4gdGhlIGVjb25vbXkuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5QQ0FQLlBQLktELlpHXCIsXHJcbiAgICBcIm5hbWVcIjpcIkdEUCBwZXIgY2FwaXRhLCBQUFAgYW5udWFsIGdyb3d0aCAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiQW5udWFsIHBlcmNlbnRhZ2UgZ3Jvd3RoIHJhdGUgb2YgR0RQIHBlciBjYXBpdGEgYmFzZWQgb24gcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgKFBQUCkuIEdEUCBwZXIgY2FwaXRhIGJhc2VkIG9uIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IChQUFApLiBQUFAgR0RQIGlzIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QgY29udmVydGVkIHRvIGludGVybmF0aW9uYWwgZG9sbGFycyB1c2luZyBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSByYXRlcy4gQW4gaW50ZXJuYXRpb25hbCBkb2xsYXIgaGFzIHRoZSBzYW1lIHB1cmNoYXNpbmcgcG93ZXIgb3ZlciBHRFAgYXMgdGhlIFUuUy4gZG9sbGFyIGhhcyBpbiB0aGUgVW5pdGVkIFN0YXRlcy4gR0RQIGF0IHB1cmNoYXNlcidzIHByaWNlcyBpcyB0aGUgc3VtIG9mIGdyb3NzIHZhbHVlIGFkZGVkIGJ5IGFsbCByZXNpZGVudCBwcm9kdWNlcnMgaW4gdGhlIGVjb25vbXkgcGx1cyBhbnkgcHJvZHVjdCB0YXhlcyBhbmQgbWludXMgYW55IHN1YnNpZGllcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBwcm9kdWN0cy4gSXQgaXMgY2FsY3VsYXRlZCB3aXRob3V0IG1ha2luZyBkZWR1Y3Rpb25zIGZvciBkZXByZWNpYXRpb24gb2YgZmFicmljYXRlZCBhc3NldHMgb3IgZm9yIGRlcGxldGlvbiBhbmQgZGVncmFkYXRpb24gb2YgbmF0dXJhbCByZXNvdXJjZXMuIERhdGEgYXJlIGluIGNvbnN0YW50IDIwMDAgaW50ZXJuYXRpb25hbCBkb2xsYXJzLiAgXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5QQ0FQLlBQLktEXCIsXCJuYW1lXCI6XCJHRFAgcGVyIGNhcGl0YSwgUFBQIChjb25zdGFudCAyMDExIGludGVybmF0aW9uYWwgJClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIHBlciBjYXBpdGEgYmFzZWQgb24gcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgKFBQUCkuIFBQUCBHRFAgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCBjb252ZXJ0ZWQgdG8gaW50ZXJuYXRpb25hbCBkb2xsYXJzIHVzaW5nIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IHJhdGVzLiBBbiBpbnRlcm5hdGlvbmFsIGRvbGxhciBoYXMgdGhlIHNhbWUgcHVyY2hhc2luZyBwb3dlciBvdmVyIEdEUCBhcyB0aGUgVS5TLiBkb2xsYXIgaGFzIGluIHRoZSBVbml0ZWQgU3RhdGVzLiBHRFAgYXQgcHVyY2hhc2VyJ3MgcHJpY2VzIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY29uc3RhbnQgMjAxMSBpbnRlcm5hdGlvbmFsIGRvbGxhcnMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5QQ0FQLkNEXCIsXCJuYW1lXCI6XCJHRFAgcGVyIGNhcGl0YSAoY3VycmVudCBVUyQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIkdEUCBwZXIgY2FwaXRhIGlzIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QgZGl2aWRlZCBieSBtaWR5ZWFyIHBvcHVsYXRpb24uIEdEUCBpcyB0aGUgc3VtIG9mIGdyb3NzIHZhbHVlIGFkZGVkIGJ5IGFsbCByZXNpZGVudCBwcm9kdWNlcnMgaW4gdGhlIGVjb25vbXkgcGx1cyBhbnkgcHJvZHVjdCB0YXhlcyBhbmQgbWludXMgYW55IHN1YnNpZGllcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBwcm9kdWN0cy4gSXQgaXMgY2FsY3VsYXRlZCB3aXRob3V0IG1ha2luZyBkZWR1Y3Rpb25zIGZvciBkZXByZWNpYXRpb24gb2YgZmFicmljYXRlZCBhc3NldHMgb3IgZm9yIGRlcGxldGlvbiBhbmQgZGVncmFkYXRpb24gb2YgbmF0dXJhbCByZXNvdXJjZXMuIERhdGEgYXJlIGluIGN1cnJlbnQgVS5TLiBkb2xsYXJzLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuTUtUUC5aR1wiLFwibmFtZVwiOlwiR3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCAoQXYuIGFubnVhbCBncm93dGgsICUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIlRoZSBHRFAgaW1wbGljaXQgZGVmbGF0b3IgaXMgdGhlIHJhdGlvIG9mIEdEUCBpbiBjdXJyZW50IGxvY2FsIGN1cnJlbmN5IHRvIEdEUCBpbiBjb25zdGFudCBsb2NhbCBjdXJyZW5jeS4gVGhlIGJhc2UgeWVhciB2YXJpZXMgYnkgY291bnRyeS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLk1LVFAuS04uODcuWkdcIixcIm5hbWVcIjpcIkdEUCBncm93dGggKGFubnVhbCAlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLk1LVFAuQ0RcIixcIm5hbWVcIjpcIkdEUCAoY3VycmVudCBVUyQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIkdEUCBhdCBwdXJjaGFzZXIncyBwcmljZXMgaXMgdGhlIHN1bSBvZiBncm9zcyB2YWx1ZSBhZGRlZCBieSBhbGwgcmVzaWRlbnQgcHJvZHVjZXJzIGluIHRoZSBlY29ub215IHBsdXMgYW55IHByb2R1Y3QgdGF4ZXMgYW5kIG1pbnVzIGFueSBzdWJzaWRpZXMgbm90IGluY2x1ZGVkIGluIHRoZSB2YWx1ZSBvZiB0aGUgcHJvZHVjdHMuIEl0IGlzIGNhbGN1bGF0ZWQgd2l0aG91dCBtYWtpbmcgZGVkdWN0aW9ucyBmb3IgZGVwcmVjaWF0aW9uIG9mIGZhYnJpY2F0ZWQgYXNzZXRzIG9yIGZvciBkZXBsZXRpb24gYW5kIGRlZ3JhZGF0aW9uIG9mIG5hdHVyYWwgcmVzb3VyY2VzLiBEYXRhIGFyZSBpbiBjdXJyZW50IFUuUy4gZG9sbGFycy4gRG9sbGFyIGZpZ3VyZXMgZm9yIEdEUCBhcmUgY29udmVydGVkIGZyb20gZG9tZXN0aWMgY3VycmVuY2llcyB1c2luZyBzaW5nbGUgeWVhciBvZmZpY2lhbCBleGNoYW5nZSByYXRlcy4gRm9yIGEgZmV3IGNvdW50cmllcyB3aGVyZSB0aGUgb2ZmaWNpYWwgZXhjaGFuZ2UgcmF0ZSBkb2VzIG5vdCByZWZsZWN0IHRoZSByYXRlIGVmZmVjdGl2ZWx5IGFwcGxpZWQgdG8gYWN0dWFsIGZvcmVpZ24gZXhjaGFuZ2UgdHJhbnNhY3Rpb25zLCBhbiBhbHRlcm5hdGl2ZSBjb252ZXJzaW9uIGZhY3RvciBpcyB1c2VkLlwiXHJcbiAgfSxcclxuICB7XHJcblwiaWRcIjpcIlNFLlRFUi5FTlJMLkZFLlpTXCIsXCJuYW1lXCI6XCJQZXJjZW50YWdlIG9mIHN0dWRlbnRzIGluIHRlcnRpYXJ5IGVkdWNhdGlvbiB3aG8gYXJlIGZlbWFsZSAoJSlcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJOdW1iZXIgb2YgZmVtYWxlIHN0dWRlbnRzIGF0IHRoZSB0ZXJ0aWFyeSBlZHVjYXRpb24gbGV2ZWwgKElTQ0VEIDUgdG8gOCkgZXhwcmVzc2VkIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgbnVtYmVyIG9mIHN0dWRlbnRzIChtYWxlIGFuZCBmZW1hbGUpIGF0IHRoZSB0ZXJ0aWFyeSBlZHVjYXRpb24gbGV2ZWwgKElTQ0VEIDUgdG8gOCkgaW4gYSBnaXZlbiBzY2hvb2wgeWVhci5cIlxyXG5cclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNFLlRFUi5DVUFULk1TLlpTXCIsXCJuYW1lXCI6XCJFZHVjYXRpb25hbCBhdHRhaW5tZW50LCBhdCBsZWFzdCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LCBwb3B1bGF0aW9uIDI1KywgdG90YWwgKCUpIChjdW11bGF0aXZlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhlIHBlcmNlbnRhZ2Ugb2YgcG9wdWxhdGlvbiBhZ2VzIDI1IGFuZCBvdmVyIHRoYXQgYXR0YWluZWQgb3IgY29tcGxldGVkIE1hc3RlcidzIG9yIGVxdWl2YWxlbnQuXCJcclxufSxcclxue1xyXG5cImlkXCI6XCJTRS5URVIuQ1VBVC5NUy5GRS5aU1wiLFwibmFtZVwiOlwiRWR1Y2F0aW9uYWwgYXR0YWlubWVudCwgYXQgbGVhc3QgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudCwgcG9wdWxhdGlvbiAyNSssIGZlbWFsZSAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcblwic291cmNlTm90ZVwiOlwiVGhlIHBlcmNlbnRhZ2Ugb2YgcG9wdWxhdGlvbiBhZ2VzIDI1IGFuZCBvdmVyIHRoYXQgYXR0YWluZWQgb3IgY29tcGxldGVkIE1hc3RlcidzIG9yIGVxdWl2YWxlbnQuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNFLlRFUi5DVUFULkRPLlpTXCIsXCJuYW1lXCI6XCJFZHVjYXRpb25hbCBhdHRhaW5tZW50LCBEb2N0b3JhbCBvciBlcXVpdmFsZW50LCBwb3B1bGF0aW9uIDI1KywgdG90YWwgKCUpIChjdW11bGF0aXZlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhlIHBlcmNlbnRhZ2Ugb2YgcG9wdWxhdGlvbiBhZ2VzIDI1IGFuZCBvdmVyIHRoYXQgYXR0YWluZWQgb3IgY29tcGxldGVkIERvY3RvcmFsIG9yIGVxdWl2YWxlbnQuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNFLlRFUi5DVUFULk1TLk1BLlpTXCIsXCJuYW1lXCI6XCJFZHVjYXRpb25hbCBhdHRhaW5tZW50LCBhdCBsZWFzdCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LCBwb3B1bGF0aW9uIDI1KywgbWFsZSAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guRlBMLkZTRVguUTUuWlNcIixcIm5hbWVcIjpcIk1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlICh3b21lbiBhZ2VzIDI1LTQ5KTogUTUgKGhpZ2hlc3QpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZTogTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgYW1vbmcgd29tZW4gYWdlZCAyNS00OSB5ZWFycy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guRlBMLkZTRVguUTEuWlNcIixcIm5hbWVcIjpcIk1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlICh3b21lbiBhZ2VzIDI1LTQ5KTogUTEgKGxvd2VzdClcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIk1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlOiBNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZSBhbW9uZyB3b21lbiBhZ2VkIDI1LTQ5IHllYXJzLlwiXHJcbn0sXHJcbntcclxuXHJcbiAgXCJpZFwiOlwiTU8uSU5ERVguU1JMVy5YUVwiLFwibmFtZVwiOlwiU2FmZXR5IGFuZCBSdWxlIG9mIExhd1wiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUGVyc29uYWwgU2FmZXR5OiAgV2l0aGluIHRoaXMgc3ViLWNhdGVnb3J5IHRoZSBJYnJhaGltIEluZGV4IG1lYXN1cmVzOiAoaSkgU2FmZXR5IG9mIHRoZSBQZXJzb24g4oCTIGxldmVsIG9mIGNyaW1pbmFsaXR5IGluIGEgY291bnRyeS4gKGlpKSBWaW9sZW50IENyaW1lIOKAkyBwcmV2YWxlbmNlIG9mIHZpb2xlbnQgY3JpbWUsIGJvdGggb3JnYW5pc2VkIGFuZCBjb21tb24uIChpaWkpIFNvY2lhbCBVbnJlc3Qg4oCTIHByZXZhbGVuY2Ugb2YgdmlvbGVudCBzb2NpYWwgdW5yZXN0LiAoaXYpIEh1bWFuIFRyYWZmaWNraW5nIOKAkyBnb3Zlcm5tZW50IGVmZm9ydHMgdG8gY29tYmF0IGh1bWFuIHRyYWZmaWNraW5nLiAodikgRG9tZXN0aWMgUG9saXRpY2FsIFBlcnNlY3V0aW9uIOKAkyBjbHVzdGVyZWQgaW5kaWNhdG9yIChhbiBhdmVyYWdlKSBvZiB0aGUgZm9sbG93aW5nIHZhcmlhYmxlczogUGh5c2ljYWwgSW50ZWdyaXR5IFJpZ2h0cyBJbmRleCDigJMgZ292ZXJubWVudCByZXNwZWN0IGZvciBjaXRpemVuc+KAmSByaWdodHMgdG8gZnJlZWRvbSBmcm9tIHRvcnR1cmUsIGV4dHJhanVkaWNpYWwga2lsbGluZywgcG9saXRpY2FsIGltcHJpc29ubWVudCwgYW5kIGRpc2FwcGVhcmFuY2UuICBQb2xpdGljYWwgVGVycm9yIFNjYWxlIOKAkyBsZXZlbHMgb2Ygc3RhdGUtaW5zdGlnYXRlZCBwb2xpdGljYWwgdmlvbGVuY2UgYW5kIHRlcnJvci5cIlxyXG59LFxyXG57XHJcblwiaWRcIjpcIlNHLlZBVy4xNTQ5LlpTXCIsXCJuYW1lXCI6XCJQcm9wb3J0aW9uIG9mIHdvbWVuIHN1YmplY3RlZCB0byBwaHlzaWNhbCBhbmRcXC9vciBzZXh1YWwgdmlvbGVuY2UgaW4gdGhlIGxhc3QgMTIgbW9udGhzICglIG9mIHdvbWVuIGFnZSAxNS00OSlcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJQcm9wb3J0aW9uIG9mIHdvbWVuIHN1YmplY3RlZCB0byBwaHlzaWNhbCBhbmRcXC9vciBzZXh1YWwgdmlvbGVuY2UgaW4gdGhlIGxhc3QgMTIgbW9udGhzIGlzIHRoZSBwZXJjZW50YWdlIG9mIGV2ZXIgcGFydG5lcmVkIHdvbWVuIGFnZSAxNS00OSB3aG8gYXJlIHN1YmplY3RlZCB0byBwaHlzaWNhbCB2aW9sZW5jZSwgc2V4dWFsIHZpb2xlbmNlIG9yIGJvdGggYnkgYSBjdXJyZW50IG9yIGZvcm1lciBpbnRpbWF0ZSBwYXJ0bmVyIGluIHRoZSBsYXN0IDEyIG1vbnRocy5cIlxyXG5cclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNHLk9XTi5IU0FMLk1BLlpTXCIsXCJuYW1lXCI6XCJNZW4gd2hvIG93biBob3VzZSBhbG9uZSAoJSBvZiBtZW4pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJNZW4gd2hvIG93biBob3VzZSBhbG9uZSAoJSBvZiBtZW4pIGlzIHRoZSBwZXJjZW50YWdlIG9mIG1lbiB3aG8gb25seSBzb2xlbHkgb3duIGEgaG91c2Ugd2hpY2ggaXMgbGVnYWxseSByZWdpc3RlcmVkIHdpdGggdGhlaXIgbmFtZSBvciBjYW5ub3QgYmUgc29sZCB3aXRob3V0IHRoZWlyIHNpZ25hdHVyZS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0cuT1dOLkhTQUwuRkUuWlNcIixcIm5hbWVcIjpcIldvbWVuIHdobyBvd24gaG91c2UgYWxvbmUgKCUgb2Ygd29tZW4gYWdlIDE1LTQ5KVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiV29tZW4gd2hvIG93biBob3VzZSBhbG9uZSAoJSBvZiB3b21lbiBhZ2UgMTUtNDkpIGlzIHRoZSBwZXJjZW50YWdlIG9mIHdvbWVuIGFnZSAxNS00OSB3aG8gb25seSBvd24gYSBob3VzZSwgd2hpY2ggbGVnYWxseSByZWdpc3RlcmVkIHdpdGggdGhlaXIgbmFtZSBvciBjYW5ub3QgYmUgc29sZCB3aXRob3V0IHRoZWlyIHNpZ25hdHVyZSwgYWxvbmUgKGRvbid0IHNoYXJlIG93bmVyc2hpcCB3aXRoIGFueW9uZSkuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklDLkZSTS5USEVWLlpTXCIsXCJuYW1lXCI6XCJGaXJtcyBleHBlcmllbmNpbmcgbG9zc2VzIGR1ZSB0byB0aGVmdCBhbmQgdmFuZGFsaXNtICglIG9mIGZpcm1zKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUGVyY2VudCBvZiBmaXJtcyBleHBlcmllbmNpbmcgbG9zc2VzIGR1ZSB0byB0aGVmdCwgcm9iYmVyeSwgdmFuZGFsaXNtIG9yIGFyc29uIHRoYXQgb2NjdXJyZWQgb24gdGhlIGVzdGFibGlzaG1lbnQncyBwcmVtaXNlcy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0cuTEVHLk1SUlBcIixcIm5hbWVcIjpcIkxlZ2lzbGF0aW9uIGV4cGxpY2l0bHkgY3JpbWluYWxpemVzIG1hcml0YWwgcmFwZSAoMT15ZXM7IDA9bm8pXCIsXHJcblwic291cmNlTm90ZVwiOidMZWdpc2xhdGlvbiBleHBsaWNpdGx5IGNyaW1pbmFsaXplcyBtYXJpdGFsIHJhcGUgaXMgd2hldGhlciB0aGVyZSBpcyBsZWdpc2xhdGlvbiB0aGF0IGV4cGxpY2l0bHkgY3JpbWluYWxpemVzIHRoZSBhY3Qgb2YgbWFyaXRhbCByYXBlIGJ5IHByb3ZpZGluZyB0aGF0IHJhcGUgb3Igc2V4dWFsIGFzc2F1bHQgcHJvdmlzaW9ucyBhcHBseSBcImlycmVzcGVjdGl2ZSBvZiB0aGUgbmF0dXJlIG9mIHRoZSByZWxhdGlvbnNoaXBcIiBiZXR3ZWVuIHRoZSBwZXJwZXRyYXRvciBhbmQgY29tcGxhaW5hbnQgb3IgYnkgc3RhdGluZyB0aGF0IFwibm8gbWFycmlhZ2Ugb3Igb3RoZXIgcmVsYXRpb25zaGlwIHNoYWxsIGNvbnN0aXR1dGUgYSBkZWZlbnNlIHRvIGEgY2hhcmdlIG9mIHJhcGUgb3Igc2V4dWFsIGFzc2F1bHQgdW5kZXIgdGhlIGxlZ2lzbGF0aW9uXCIgJ1xyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSVQuTkVULlVTRVIuWlNcIixcIm5hbWVcIjpcIkluZGl2aWR1YWxzIHVzaW5nIHRoZSBJbnRlcm5ldCAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiSW50ZXJuZXQgdXNlcnMgYXJlIGluZGl2aWR1YWxzIHdobyBoYXZlIHVzZWQgdGhlIEludGVybmV0IChmcm9tIGFueSBsb2NhdGlvbikgaW4gdGhlIGxhc3QgMyBtb250aHMuIFRoZSBJbnRlcm5ldCBjYW4gYmUgdXNlZCB2aWEgYSBjb21wdXRlciwgbW9iaWxlIHBob25lLCBwZXJzb25hbCBkaWdpdGFsIGFzc2lzdGFudCwgZ2FtZXMgbWFjaGluZSwgZGlnaXRhbCBUViBldGMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklULk5FVC5VU0VSLlAyXCIsXCJuYW1lXCI6XCJJbnRlcm5ldCB1c2VycyAocGVyIDEwMCBwZW9wbGUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJJbnRlcm5ldCB1c2VycyBhcmUgaW5kaXZpZHVhbHMgd2hvIGhhdmUgdXNlZCB0aGUgSW50ZXJuZXQgKGZyb20gYW55IGxvY2F0aW9uKSBpbiB0aGUgbGFzdCAzIG1vbnRocy4gVGhlIEludGVybmV0IGNhbiBiZSB1c2VkIHZpYSBhIGNvbXB1dGVyLCBtb2JpbGUgcGhvbmUsIHBlcnNvbmFsIGRpZ2l0YWwgYXNzaXN0YW50LCBnYW1lcyBtYWNoaW5lLCBkaWdpdGFsIFRWIGV0Yy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiVkMuSE9NLklURU4uUDUuTEVcIixcIm5hbWVcIjpcIkludGVudGlvbmFsIGhvbWljaWRlIHJhdGUgKHBlciAxMDAsMDAwIHBlb3BsZSwgV0hPKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiXCJcclxufSx7XHJcbiAgXCJpZFwiOlwiVkMuQlRMLkRFVEhcIixcIm5hbWVcIjpcIkJhdHRsZS1yZWxhdGVkIGRlYXRocyAobnVtYmVyIG9mIHBlb3BsZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkJhdHRsZS1yZWxhdGVkIGRlYXRocyBhcmUgZGVhdGhzIGluIGJhdHRsZS1yZWxhdGVkIGNvbmZsaWN0cyBiZXR3ZWVuIHdhcnJpbmcgcGFydGllcyBpbiB0aGUgY29uZmxpY3QgZHlhZCAodHdvIGNvbmZsaWN0IHVuaXRzIHRoYXQgYXJlIHBhcnRpZXMgdG8gYSBjb25mbGljdCkuIFR5cGljYWxseSwgYmF0dGxlLXJlbGF0ZWQgZGVhdGhzIG9jY3VyIGluIHdhcmZhcmUgaW52b2x2aW5nIHRoZSBhcm1lZCBmb3JjZXMgb2YgdGhlIHdhcnJpbmcgcGFydGllcy4gVGhpcyBpbmNsdWRlcyB0cmFkaXRpb25hbCBiYXR0bGVmaWVsZCBmaWdodGluZywgZ3VlcnJpbGxhIGFjdGl2aXRpZXMsIGFuZCBhbGwga2luZHMgb2YgYm9tYmFyZG1lbnRzIG9mIG1pbGl0YXJ5IHVuaXRzLCBjaXRpZXMsIGFuZCB2aWxsYWdlcywgZXRjLiBUaGUgdGFyZ2V0cyBhcmUgdXN1YWxseSB0aGUgbWlsaXRhcnkgaXRzZWxmIGFuZCBpdHMgaW5zdGFsbGF0aW9ucyBvciBzdGF0ZSBpbnN0aXR1dGlvbnMgYW5kIHN0YXRlIHJlcHJlc2VudGF0aXZlcywgYnV0IHRoZXJlIGlzIG9mdGVuIHN1YnN0YW50aWFsIGNvbGxhdGVyYWwgZGFtYWdlIGluIHRoZSBmb3JtIG9mIGNpdmlsaWFucyBiZWluZyBraWxsZWQgaW4gY3Jvc3NmaXJlLCBpbiBpbmRpc2NyaW1pbmF0ZSBib21iaW5ncywgZXRjLiBBbGwgZGVhdGhzLS1taWxpdGFyeSBhcyB3ZWxsIGFzIGNpdmlsaWFuLS1pbmN1cnJlZCBpbiBzdWNoIHNpdHVhdGlvbnMsIGFyZSBjb3VudGVkIGFzIGJhdHRsZS1yZWxhdGVkIGRlYXRocy5cIlxyXG59LFxyXG57XHJcblwiaWRcIjpcIlZBLlNURC5FUlJcIixcIm5hbWVcIjpcIlZvaWNlIGFuZCBBY2NvdW50YWJpbGl0eTogU3RhbmRhcmQgRXJyb3JcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJWb2ljZSBhbmQgQWNjb3VudGFiaWxpdHkgY2FwdHVyZXMgcGVyY2VwdGlvbnMgb2YgdGhlIGV4dGVudCB0byB3aGljaCBhIGNvdW50cnkncyBjaXRpemVucyBhcmUgYWJsZSB0byBwYXJ0aWNpcGF0ZSBpbiBzZWxlY3RpbmcgdGhlaXIgZ292ZXJubWVudCwgYXMgd2VsbCBhcyBmcmVlZG9tIG9mIGV4cHJlc3Npb24sIGZyZWVkb20gb2YgYXNzb2NpYXRpb24sIGFuZCBhIGZyZWUgbWVkaWEuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIjUuNTEuMDEuMDcuZ2VuZGVyXCIsXCJuYW1lXCI6XCJHZW5kZXIgZXF1YWxpdHlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBpbmRpY2F0b3IgaXMgZGVmaW5lZCBhcyB0aGUgcmF0aW8gb2YgdGhlIGdyb3NzIGVucm9sbG1lbnQgcmF0ZSBvZiBnaXJscyB0byBib3lzIGluIHByaW1hcnkgYW5kIHNlY29uZGFyeSBlZHVjYXRpb24gbGV2ZWxzIGluIGJvdGggcHVibGljIGFuZCBwcml2YXRlIHNjaG9vbHMuIFdvbWVuIGhhdmUgYW4gZW5vcm1vdXMgaW1wYWN0IG9uIHRoZSB3ZWxsLWJlaW5nIG9mIHRoZWlyIGZhbWlsaWVzIGFuZCBzb2NpZXRpZXMsIGJ1dCB0aGVpciBwb3RlbnRpYWwgaXMgc29tZXRpbWVzIG5vdCByZWFsaXplZCBiZWNhdXNlIG9mIGRpc2NyaW1pbmF0b3J5IHNvY2lhbCBub3JtcywgaW5jZW50aXZlcywgYW5kIGxlZ2FsIGluc3RpdHV0aW9ucy4gQWx0aG91Z2ggdGhlaXIgc3RhdHVzIGhhcyBpbXByb3ZlZCBpbiByZWNlbnQgZGVjYWRlcywgZ2VuZGVyIGluZXF1YWxpdGllcyBwZXJzaXN0LiBFZHVjYXRpb24gaXMgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCBhc3BlY3RzIG9mIGh1bWFuIGRldmVsb3BtZW50LCBhbmQgZWxpbWluYXRpbmcgZ2VuZGVyIGRpc3Bhcml0eSBhdCBhbGwgbGV2ZWxzIG9mIGVkdWNhdGlvbiB3b3VsZCBoZWxwIHRvIGluY3JlYXNlIHRoZSBzdGF0dXMgYW5kIGNhcGFiaWxpdGllcyBvZiB3b21lbi4gVGhpcyBpbmRpY2F0b3IgcHJvdmlkZXMgYSBtZWFzdXJlIG9mIGVxdWFsaXR5IG9mIGVkdWNhdGlvbmFsIG9wcG9ydHVuaXR5IGFuZCByZWxhdGVzIHRvIHRoZSB0aGlyZCBNREcgdGhhdCBzZWVrcyB0byBwcm9tb3RlIGdlbmRlciBlcXVhbGl0eSBhbmQgdGhlIGVtcG93ZXJtZW50IG9mIHdvbWVuLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJWQy5JSFIuTlBPTC5QNVwiLFwibmFtZVwiOlwiSW50ZW50aW9uYWwgaG9taWNpZGVzLCBnb3Zlcm5tZW50IHBvbGljZSBzb3VyY2VzIChwZXIgMTAwLDAwMCBwZW9wbGUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiTkUuQ09OLlBSVlQuWlNcIixcIm5hbWVcIjpcIkhvdXNlaG9sZHMgYW5kIE5QSVNIcyBmaW5hbCBjb25zdW1wdGlvbiBleHBlbmRpdHVyZSAoJSBvZiBHRFApXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJIb3VzZWhvbGQgZmluYWwgY29uc3VtcHRpb24gZXhwZW5kaXR1cmUgKGZvcm1lcmx5IHByaXZhdGUgY29uc3VtcHRpb24pIGlzIHRoZSBtYXJrZXQgdmFsdWUgb2YgYWxsIGdvb2RzIGFuZCBzZXJ2aWNlcywgaW5jbHVkaW5nIGR1cmFibGUgcHJvZHVjdHMgKHN1Y2ggYXMgY2Fycywgd2FzaGluZyBtYWNoaW5lcywgYW5kIGhvbWUgY29tcHV0ZXJzKSwgcHVyY2hhc2VkIGJ5IGhvdXNlaG9sZHMuIEl0IGV4Y2x1ZGVzIHB1cmNoYXNlcyBvZiBkd2VsbGluZ3MgYnV0IGluY2x1ZGVzIGltcHV0ZWQgcmVudCBmb3Igb3duZXItb2NjdXBpZWQgZHdlbGxpbmdzLiBJdCBhbHNvIGluY2x1ZGVzIHBheW1lbnRzIGFuZCBmZWVzIHRvIGdvdmVybm1lbnRzIHRvIG9idGFpbiBwZXJtaXRzIGFuZCBsaWNlbnNlcy4gSGVyZSwgaG91c2Vob2xkIGNvbnN1bXB0aW9uIGV4cGVuZGl0dXJlIGluY2x1ZGVzIHRoZSBleHBlbmRpdHVyZXMgb2Ygbm9ucHJvZml0IGluc3RpdHV0aW9ucyBzZXJ2aW5nIGhvdXNlaG9sZHMsIGV2ZW4gd2hlbiByZXBvcnRlZCBzZXBhcmF0ZWx5IGJ5IHRoZSBjb3VudHJ5LiBUaGlzIGl0ZW0gYWxzbyBpbmNsdWRlcyBhbnkgc3RhdGlzdGljYWwgZGlzY3JlcGFuY3kgaW4gdGhlIHVzZSBvZiByZXNvdXJjZXMgcmVsYXRpdmUgdG8gdGhlIHN1cHBseSBvZiByZXNvdXJjZXMuXCIsXCJzb3VyY2VPcmdhbml6YXRpb25cIjpcIldvcmxkIEJhbmsgbmF0aW9uYWwgYWNjb3VudHMgZGF0YSwgYW5kIE9FQ0QgTmF0aW9uYWwgQWNjb3VudHMgZGF0YSBmaWxlcy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSVMuVkVILlBDQVIuUDNcIixcIm5hbWVcIjpcIlBhc3NlbmdlciBjYXJzIChwZXIgMSwwMDAgcGVvcGxlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUGFzc2VuZ2VyIGNhcnMgcmVmZXIgdG8gcm9hZCBtb3RvciB2ZWhpY2xlcywgb3RoZXIgdGhhbiB0d28td2hlZWxlcnMsIGludGVuZGVkIGZvciB0aGUgY2FycmlhZ2Ugb2YgcGFzc2VuZ2VycyBhbmQgZGVzaWduZWQgdG8gc2VhdCBubyBtb3JlIHRoYW4gbmluZSBwZW9wbGUgKGluY2x1ZGluZyB0aGUgZHJpdmVyKS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guU1RBLkFDU04uVVJcIixcIm5hbWVcIjpcIkltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcywgdXJiYW4gKCUgb2YgdXJiYW4gcG9wdWxhdGlvbiB3aXRoIGFjY2VzcylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkFjY2VzcyB0byBpbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMsIHVyYmFuLCByZWZlcnMgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHVyYmFuIHBvcHVsYXRpb24gdXNpbmcgaW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzLiBJbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMgYXJlIGxpa2VseSB0byBlbnN1cmUgaHlnaWVuaWMgc2VwYXJhdGlvbiBvZiBodW1hbiBleGNyZXRhIGZyb20gaHVtYW4gY29udGFjdC4gVGhleSBpbmNsdWRlIGZsdXNoXFwvcG91ciBmbHVzaCAodG8gcGlwZWQgc2V3ZXIgc3lzdGVtLCBzZXB0aWMgdGFuaywgcGl0IGxhdHJpbmUpLCB2ZW50aWxhdGVkIGltcHJvdmVkIHBpdCAoVklQKSBsYXRyaW5lLCBwaXQgbGF0cmluZSB3aXRoIHNsYWIsIGFuZCBjb21wb3N0aW5nIHRvaWxldC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSUMuRlJNLk9CUy5PQlNUNFwiLFwibmFtZVwiOlwiUGVyY2VudCBvZiBmaXJtcyBjaG9vc2luZyBjb3JydXB0aW9uIGFzIHRoZWlyIGJpZ2dlc3Qgb2JzdGFjbGVcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlBlcmNlbnQgb2YgZmlybXMgdGhhdCBjaG9zZSBjb3JydXB0aW9uIGFzIHRoZSBiaWdnZXN0IG9ic3RhY2xlIGZhY2VkIGJ5IHRoaXMgZXN0YWJsaXNobWVudC4gIChTdXJ2ZXkgcmVzcG9uZGVudHMgd2VyZSBwcmVzZW50ZWQgd2l0aCBhIGxpc3Qgb2YgMTUgcG90ZW50aWFsIG9ic3RhY2xlcy4pICAgU291cmNlOldvcmxkIEJhbmssIEVudGVycHJpc2UgU3VydmV5cyBQcm9qZWN0KGh0dHA6XFwvXFwvd3d3LmVudGVycHJpc2VzdXJ2ZXlzLm9yZ1xcL0N1c3RvbVF1ZXJ5KS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiR1YuVEkuU0NPUi5JRFhcIixcIm5hbWVcIjpcIkNvcnJ1cHRpb24gUGVyY2VwdGlvbnMgSW5kZXggKHNjb3JlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhpcyBpbmZvcm1hdGlvbiBpcyBmcm9tIHRoZSBodHRwOlxcL1xcL3d3dy50cmFuc3BhcmVuY3kub3JnIFRyYW5zcGFyZW5jeSBJbnRlcm5hdGlvbmFsIHdlYiBzaXRlLiAgTW9yZSBpbmZvcm1hdGlvbiBtYXkgYmUgYXZhaWxhYmxlIHRoZXJlLiAgQ1BJIFNjb3JlIHJlbGF0ZXMgdG8gcGVyY2VwdGlvbnMgb2YgdGhlIGRlZ3JlZSBvZiBjb3JydXB0aW9uIGFzIHNlZW4gYnkgYnVzaW5lc3MgcGVvcGxlIGFuZCBjb3VudHJ5IGFuYWx5c3RzLCBhbmQgcmFuZ2VzIGJldHdlZW4gMCAoaGlnaGx5IGNvcnJ1cHQpIGFuZCAxMCAoaGlnaGx5IGNsZWFuKS4gIERhdGEgZm9yIDIwMTIgQ29ycnVwdGlvbiBQZXJjZXB0aW9ucyBJbmRleCBzY29yZXMgY291bnRyaWVzIG9uIGEgc2NhbGUgZnJvbSAwIChoaWdobHkgY29ycnVwdCkgdG8gMTAwICh2ZXJ5IGNsZWFuKS4gIENvbmZpZGVuY2UgcmFuZ2UgcHJvdmlkZXMgYSByYW5nZSBvZiBwb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIENQSSBzY29yZS4gVGhpcyByZWZsZWN0cyBob3cgYSBjb3VudHJ5J3Mgc2NvcmUgbWF5IHZhcnksIGRlcGVuZGluZyBvbiBtZWFzdXJlbWVudCBwcmVjaXNpb24uIE5vbWluYWxseSwgd2l0aCA1IHBlcmNlbnQgcHJvYmFiaWxpdHkgdGhlIHNjb3JlIGlzIGFib3ZlIHRoaXMgcmFuZ2UgYW5kIHdpdGggYW5vdGhlciA1IHBlcmNlbnQgaXQgaXMgYmVsb3cuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklDLkZSTS5DT1JSLkdSQUZUMlwiLFwibmFtZVwiOlwiQnJpYmVyeSBpbmRleCAoJSBvZiBnaWZ0IG9yIGluZm9ybWFsIHBheW1lbnQgcmVxdWVzdHMgZHVyaW5nIHB1YmxpYyB0cmFuc2FjdGlvbnMpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJCcmliZXJ5IGluZGV4IGlzIHRoZSBwZXJjZW50YWdlIG9mIGdpZnQgb3IgaW5mb3JtYWwgcGF5bWVudCByZXF1ZXN0cyBkdXJpbmcgNiBpbmZyYXN0cnVjdHVyZSwgcGVybWl0cyBhbmQgbGljZW5jZXMsIGFuZCB0YXggdHJhbnNhY3Rpb25zLiAgIFNvdXJjZTpXb3JsZCBCYW5rLCBFbnRlcnByaXNlIFN1cnZleXMgUHJvamVjdChodHRwOlxcL1xcL3d3dy5lbnRlcnByaXNlc3VydmV5cy5vcmdcXC9EYXRhXFwvRXhwbG9yZVRvcGljc1xcL2NvcnJ1cHRpb24pLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJIT1UuRUxDLkFDU04uWlNcIixcIm5hbWVcIjpcIkhvdXNlaG9sZCBBY2Nlc3MgdG8gRWxlY3RyaWNpdHk6IFRvdGFsIChpbiAlIG9mIHRvdGFsIGhvdXNlaG9sZClcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiRlguT1dOLlRPVEwuWlNcIixcIm5hbWVcIjpcIkFjY291bnQgb3duZXJzaGlwIGF0IGEgZmluYW5jaWFsIGluc3RpdHV0aW9uIG9yIHdpdGggYSBtb2JpbGUtbW9uZXktc2VydmljZSBwcm92aWRlciAoJSBvZiBwb3B1bGF0aW9uIGFnZXMgMTUrKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiQWNjb3VudCBkZW5vdGVzIHRoZSBwZXJjZW50YWdlIG9mIHJlc3BvbmRlbnRzIHdobyByZXBvcnQgaGF2aW5nIGFuIGFjY291bnQgKGJ5IHRoZW1zZWx2ZXMgb3IgdG9nZXRoZXIgd2l0aCBzb21lb25lIGVsc2UpIGF0IGEgYmFuayBvciBhbm90aGVyIHR5cGUgb2YgZmluYW5jaWFsIGluc3RpdHV0aW9uIG9yIHJlcG9ydCBwZXJzb25hbGx5IHVzaW5nIGEgbW9iaWxlIG1vbmV5IHNlcnZpY2UgaW4gdGhlIHBhc3QgMTIgbW9udGhzICglIGFnZSAxNSspLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5TVEEuQUNDSC5aU1wiLFwibmFtZVwiOlwiSGVhbHRoIGNhcmUgKCUgb2YgcG9wdWxhdGlvbiB3aXRoIGFjY2VzcylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5TVEEuQkFTUy5aU1wiLFwibmFtZVwiOlwiUGVvcGxlIHVzaW5nIGF0IGxlYXN0IGJhc2ljIHNhbml0YXRpb24gc2VydmljZXMgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB1c2luZyBhdCBsZWFzdCBiYXNpYyBzYW5pdGF0aW9uIHNlcnZpY2VzLCB0aGF0IGlzLCBpbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMgdGhhdCBhcmUgbm90IHNoYXJlZCB3aXRoIG90aGVyIGhvdXNlaG9sZHMuICBUaGlzIGluZGljYXRvciBlbmNvbXBhc3NlcyBib3RoIHBlb3BsZSB1c2luZyBiYXNpYyBzYW5pdGF0aW9uIHNlcnZpY2VzIGFzIHdlbGwgYXMgdGhvc2UgdXNpbmcgc2FmZWx5IG1hbmFnZWQgc2FuaXRhdGlvbiBzZXJ2aWNlcy4gICBJbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMgaW5jbHVkZSBmbHVzaFxcL3BvdXIgZmx1c2ggdG8gcGlwZWQgc2V3ZXIgc3lzdGVtcywgc2VwdGljIHRhbmtzIG9yIHBpdCBsYXRyaW5lczsgdmVudGlsYXRlZCBpbXByb3ZlZCBwaXQgbGF0cmluZXMsIGNvbXBvc2l0aW5nIHRvaWxldHMgb3IgcGl0IGxhdHJpbmVzIHdpdGggc2xhYnMuXCJcclxufSxcclxue1xyXG5cImlkXCI6XCJTSS5QT1YuMjVEQVlcIixcIm5hbWVcIjpcIlBvdmVydHkgaGVhZGNvdW50IHJhdGlvIGF0ICQyLjUgYSBkYXkgKFBQUCkgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJQb3B1bGF0aW9uIGJlbG93ICQyLjUgYSBkYXkgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHBvcHVsYXRpb24gbGl2aW5nIG9uIGxlc3MgdGhhbiAkMi41IGEgZGF5IGF0IDIwMDUgaW50ZXJuYXRpb25hbCBwcmljZXMuIFwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSS5QT1YuTkFQUi5aU1wiLFwibmFtZVwiOlwiUG92ZXJ0eSBSYXRlIChpbiAlIG9mIHBvcHVsYXRpb24pXCIsXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0kuUE9WLk5BSENcIixcIm5hbWVcIjpcIlBvdmVydHkgaGVhZGNvdW50IHJhdGlvIGF0IG5hdGlvbmFsIHBvdmVydHkgbGluZXMgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIk5hdGlvbmFsIHBvdmVydHkgaGVhZGNvdW50IHJhdGlvIGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBwb3B1bGF0aW9uIGxpdmluZyBiZWxvdyB0aGUgbmF0aW9uYWwgcG92ZXJ0eSBsaW5lcy4gTmF0aW9uYWwgZXN0aW1hdGVzIGFyZSBiYXNlZCBvbiBwb3B1bGF0aW9uLXdlaWdodGVkIHN1Ymdyb3VwIGVzdGltYXRlcyBmcm9tIGhvdXNlaG9sZCBzdXJ2ZXlzLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5BRE0uSU5QVFwiLFwibmFtZVwiOlwiSW5wYXRpZW50IGFkbWlzc2lvbiByYXRlICglIG9mIHBvcHVsYXRpb24gKVwiLFwic291cmNlTm90ZVwiOlwiXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILkRZTi5BSURTLlpTXCIsXCJuYW1lXCI6XCJQcmV2YWxlbmNlIG9mIEhJViwgdG90YWwgKCUgb2YgcG9wdWxhdGlvbiBhZ2VzIDE1LTQ5KVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUHJldmFsZW5jZSBvZiBISVYgcmVmZXJzIHRvIHRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSBhZ2VzIDE1LTQ5IHdobyBhcmUgaW5mZWN0ZWQgd2l0aCBISVYuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNNLlBPUC5UT1RMLlpTXCIsXCJuYW1lXCI6XCJJbnRlcm5hdGlvbmFsIG1pZ3JhbnQgc3RvY2sgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpgSW50ZXJuYXRpb25hbCBtaWdyYW50IHN0b2NrIGlzIHRoZSBudW1iZXIgb2YgcGVvcGxlIGJvcm4gaW4gYSBjb3VudHJ5IG90aGVyIHRoYW4gdGhhdCBpbiB3aGljaCB0aGV5IGxpdmUuIEl0IGFsc28gaW5jbHVkZXMgcmVmdWdlZXMuIFRoZSBkYXRhIHVzZWQgdG8gZXN0aW1hdGUgdGhlIGludGVybmF0aW9uYWwgbWlncmFudCBzdG9jayBhdCBhIHBhcnRpY3VsYXIgdGltZSBhcmUgb2J0YWluZWQgbWFpbmx5IGZyb20gcG9wdWxhdGlvbiBjZW5zdXNlcy4gVGhlIGVzdGltYXRlcyBhcmUgZGVyaXZlZCBmcm9tIHRoZSBkYXRhIG9uIGZvcmVpZ24tYm9ybiBwb3B1bGF0aW9uLS1wZW9wbGUgd2hvIGhhdmUgcmVzaWRlbmNlIGluIG9uZSBjb3VudHJ5IGJ1dCB3ZXJlIGJvcm4gaW4gYW5vdGhlciBjb3VudHJ5LiBXaGVuIGRhdGEgb24gdGhlIGZvcmVpZ24tYm9ybiBwb3B1bGF0aW9uIGFyZSBub3QgYXZhaWxhYmxlLCBkYXRhIG9uIGZvcmVpZ24gcG9wdWxhdGlvbi0tdGhhdCBpcywgcGVvcGxlIHdobyBhcmUgY2l0aXplbnMgb2YgYSBjb3VudHJ5IG90aGVyIHRoYW4gdGhlIGNvdW50cnkgaW4gd2hpY2ggdGhleSByZXNpZGUtLWFyZSB1c2VkIGFzIGVzdGltYXRlcy4gQWZ0ZXIgdGhlIGJyZWFrdXAgb2YgdGhlIFNvdmlldCBVbmlvbiBpbiAxOTkxIHBlb3BsZSBsaXZpbmcgaW4gb25lIG9mIHRoZSBuZXdseSBpbmRlcGVuZGVudCBjb3VudHJpZXMgd2hvIHdlcmUgYm9ybiBpbiBhbm90aGVyIHdlcmUgY2xhc3NpZmllZCBhcyBpbnRlcm5hdGlvbmFsIG1pZ3JhbnRzLiBFc3RpbWF0ZXMgb2YgbWlncmFudCBzdG9jayBpbiB0aGUgbmV3bHkgaW5kZXBlbmRlbnQgc3RhdGVzIGZyb20gMTk5MCBvbiBhcmUgYmFzZWQgb24gdGhlIDE5ODkgY2Vuc3VzIG9mIHRoZSBTb3ZpZXQgVW5pb24uIEZvciBjb3VudHJpZXMgd2l0aCBpbmZvcm1hdGlvbiBvbiB0aGUgaW50ZXJuYXRpb25hbCBtaWdyYW50IHN0b2NrIGZvciBhdCBsZWFzdCB0d28gcG9pbnRzIGluIHRpbWUsIGludGVycG9sYXRpb24gb3IgZXh0cmFwb2xhdGlvbiB3YXMgdXNlZCB0byBlc3RpbWF0ZSB0aGUgaW50ZXJuYXRpb25hbCBtaWdyYW50IHN0b2NrIG9uIEp1bHkgMSBvZiB0aGUgcmVmZXJlbmNlIHllYXJzLiBGb3IgY291bnRyaWVzIHdpdGggb25seSBvbmUgb2JzZXJ2YXRpb24sIGVzdGltYXRlcyBmb3IgdGhlIHJlZmVyZW5jZSB5ZWFycyB3ZXJlIGRlcml2ZWQgdXNpbmcgcmF0ZXMgb2YgY2hhbmdlIGluIHRoZSBtaWdyYW50IHN0b2NrIGluIHRoZSB5ZWFycyBwcmVjZWRpbmcgb3IgZm9sbG93aW5nIHRoZSBzaW5nbGUgb2JzZXJ2YXRpb24gYXZhaWxhYmxlLiBBIG1vZGVsIHdhcyB1c2VkIHRvIGVzdGltYXRlIG1pZ3JhbnRzIGZvciBjb3VudHJpZXMgdGhhdCBoYWQgbm8gZGF0YS5gXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTTi5JVEsuREVGQy5aU1wiLFwibmFtZVwiOlwiUHJldmFsZW5jZSBvZiB1bmRlcm5vdXJpc2htZW50ICglIG9mIHBvcHVsYXRpb24pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQb3B1bGF0aW9uIGJlbG93IG1pbmltdW0gbGV2ZWwgb2YgZGlldGFyeSBlbmVyZ3kgY29uc3VtcHRpb24gKGFsc28gcmVmZXJyZWQgdG8gYXMgcHJldmFsZW5jZSBvZiB1bmRlcm5vdXJpc2htZW50KSBzaG93cyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgcG9wdWxhdGlvbiB3aG9zZSBmb29kIGludGFrZSBpcyBpbnN1ZmZpY2llbnQgdG8gbWVldCBkaWV0YXJ5IGVuZXJneSByZXF1aXJlbWVudHMgY29udGludW91c2x5LiBEYXRhIHNob3dpbmcgYXMgNSBtYXkgc2lnbmlmeSBhIHByZXZhbGVuY2Ugb2YgdW5kZXJub3VyaXNobWVudCBiZWxvdyA1JS5cIixcInNvdXJjZU9yZ2FuaXphdGlvblwiOlwiRm9vZCBhbmQgQWdyaWN1bHR1cmUgT3JnYW5pemF0aW9uIChodHRwOlxcL1xcL3d3dy5mYW8ub3JnXFwvcHVibGljYXRpb25zXFwvZW5cXC8pLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5TVEEuT0RGQy5aU1wiLFwibmFtZVwiOlwiUGVvcGxlIHByYWN0aWNpbmcgb3BlbiBkZWZlY2F0aW9uICglIG9mIHBvcHVsYXRpb24pXCIsXHJcblwic291cmNlTm90ZVwiOlwiUGVvcGxlIHByYWN0aWNpbmcgb3BlbiBkZWZlY2F0aW9uIHJlZmVycyB0byB0aGUgcGVyY2VudGFnZSBvZiB0aGUgcG9wdWxhdGlvbiBkZWZlY2F0aW5nIGluIHRoZSBvcGVuLCBzdWNoIGFzIGluIGZpZWxkcywgZm9yZXN0LCBidXNoZXMsIG9wZW4gYm9kaWVzIG9mIHdhdGVyLCBvbiBiZWFjaGVzLCBpbiBvdGhlciBvcGVuIHNwYWNlcyBvciBkaXNwb3NlZCBvZiB3aXRoIHNvbGlkIHdhc3RlLlwiXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiJdfQ==
