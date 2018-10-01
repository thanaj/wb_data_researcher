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
  console.log(dataforChart);
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

function createTransaction(db, storeName) {
  var transaction = db.transaction([storeName]);
  transaction.oncomplete = function (event) {
    //console.log('oncomplete transction', event);
  };
  transaction.onerror = function (event) {
    console.log('onerror transction', event);
  };
  return transaction;
}

function readRecord(event, lookedValue, promiseFn) {
  var db = event.target.result;
  var transaction = createTransaction(db, storeName);
  var objectStore = transaction.objectStore(storeName);
  var query = objectStore.get(lookedValue);
  var result = void 0;

  query.onerror = function (event) {
    console.log('query error', event);
    promiseFn.reject(event);
    //return result;
  };
  query.onsuccess = function (event) {
    //console.log('query sukces',event)
    result = event.target.result;
    promiseFn.resolve(result);
    //return result;
  };
}
function requestOpenDb(promiseFn) {
  //console.log(promiseFn)
  var indexedDb = window.indexedDB;
  var request = void 0;
  if (indexedDb) {
    var _request = indexedDb.open(storeName);
    _request.onupgradeneeded = function (event) {
      //console.log('request onupgradeneeded', event);
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
      //console.log('request onsuccess', event)
      return readRecord(event, lookedValue, promiseObj);
    };
  });
};

function createData(key, value) {
  var indexedDb = window.indexedDB;
  if (!indexedDb) {
    return;
  }
}

obj = {
  readData: readData,
  createData: createData
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2VzNi9hZGREYXRhREIuanMiLCJzY3JpcHRzL2VzNi9hcHAuanMiLCJzY3JpcHRzL2VzNi9idWlsZFRhYmxlLmpzIiwic2NyaXB0cy9lczYvY2FudmFzLmpzIiwic2NyaXB0cy9lczYvZHJhd0NoYXJ0LmpzIiwic2NyaXB0cy9lczYvZ2V0Q291bnRyaWVzLmpzIiwic2NyaXB0cy9lczYvaGVscGVyLmpzIiwic2NyaXB0cy9lczYvcmVhZERhdGEuanMiLCJzY3JpcHRzL2VzNi92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE1BQU0sRUFBVjs7QUFFQSxTQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWlDLFNBQWpDLEVBQTJDLFNBQTNDLEVBQXNEO0FBQ3BELE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1BQUksY0FBYyxHQUFHLGlCQUFILENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLENBQWxCO0FBQ0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixFQUEzQixFQUE4QixTQUE5QixFQUF3QztBQUN0QyxNQUFJLGNBQWMsR0FBRyxXQUFILENBQWUsQ0FBQyxTQUFELENBQWYsRUFBNEIsV0FBNUIsQ0FBbEI7QUFDQSxjQUFZLFVBQVosR0FBeUIsVUFBUyxLQUFULEVBQWdCO0FBQ3ZDO0FBQ0QsR0FGRDtBQUdBLGNBQVksT0FBWixHQUFzQixVQUFTLEtBQVQsRUFBZ0I7QUFDcEMsWUFBUSxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7QUFDRCxHQUZEO0FBR0EsU0FBTyxXQUFQO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQXlCLFdBQXpCLEVBQXFDLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1B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LCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgZGVmYXVsdCBhcyBnZXQgfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKSB7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSwgY29uZmlnT2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVHJhbnNhY3Rpb24oZGIsc3RvcmVOYW1lKXtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihbc3RvcmVOYW1lXSwgXCJyZWFkd3JpdGVcIik7XHJcbiAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdvbmNvbXBsZXRlIHRyYW5zY3Rpb24nLCBldmVudCk7XHJcbiAgfTtcclxuICB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdvbmVycm9yIHRyYW5zY3Rpb24nLCBldmVudClcclxuICB9O1xyXG4gIHJldHVybiB0cmFuc2FjdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUmVjb3JkKGV2ZW50LGRhdGFUb0JlQWRkLHByb21pc2VGbiApe1xyXG4gIGxldCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgbGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsdmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh2YXJpYWJsZXMuSU5EX0RCX1NUT1JFX05BTUUpO1xyXG5cclxuICAvL2xldCBxdWVyeSA9IG9iamVjdFN0b3JlLmdldChsb29rZWRWYWx1ZSlcclxuICBsZXQgcmVzdWx0O1xyXG5cclxuICBsZXQgb2JqZWN0U3RvcmUxID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuICBsZXQgYWRkUmVxdWVzdCA9IG9iamVjdFN0b3JlMS5hZGQoZGF0YVRvQmVBZGQpO1xyXG4gIGFkZFJlcXVlc3Qub25jb21wbGV0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdhZGRSZXF1ZXN0IGNvbXBsZXRlJywgZXZlbnQpXHJcbiAgICBwcm9taXNlRm4ucmVzb2x2ZShldmVudClcclxuICB9O1xyXG4gIGFkZFJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnYWRkUmVxdWVzdCBlcnJvcicsIGV2ZW50KVxyXG4gICAgY29uc29sZS5sb2coJ2FkZFJlcXVlc3Qgb25lcnJvcicsZXZlbnQudGFyZ2V0LmVycm9yKVxyXG4gICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICB9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcmVxdWVzdE9wZW5EYihwcm9taXNlRm4pe1xyXG4gIGxldCBpbmRleGVkRGIgPSB3aW5kb3cuaW5kZXhlZERCO1xyXG4gIGxldCByZXF1ZXN0O1xyXG4gIGlmKGluZGV4ZWREYil7XHJcbiAgICBsZXQgcmVxdWVzdCA9IGluZGV4ZWREYi5vcGVuKHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNyZWF0ZU9iamVjdFN0b3JlKGV2ZW50LHN0b3JlTmFtZSxjb25maWdPYmopXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdC5vbmJsb2NrZWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBibG9ja2VkJywgZXZlbnQpXHJcbiAgICAgIHByb21pc2VGbi5yZWplY3QoZXZlbnQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3Qgb25lcnJvcicsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdFxyXG4gIH1cclxuICByZXR1cm4gcmVxdWVzdDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGFkZERhdGEoZGF0YVRvQmVBZGQpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgbGV0IHByb21pc2VPYmogPSB7cmVzb2x2ZSxyZWplY3R9O1xyXG5cclxuICAgIGxldCByZXF1ZXN0ID0gcmVxdWVzdE9wZW5EYihwcm9taXNlT2JqKVxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdyZXF1ZXN0IG9uc3VjY2VzcycsIGV2ZW50KVxyXG4gICAgICByZXR1cm4gYWRkUmVjb3JkKGV2ZW50LGRhdGFUb0JlQWRkLCBwcm9taXNlT2JqKVxyXG4gICAgfTtcclxuXHJcblxyXG4gIH0pXHJcblxyXG59O1xyXG5cclxuXHJcbm9iaiA9IHtcclxuICBhZGREYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiaW1wb3J0IHtkZWZhdWx0IGFzIGdldH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgdmFyaWFibGVzfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBnZXRDb3VudHJpZXN9IGZyb20gJy4vZ2V0Q291bnRyaWVzLmpzJztcclxuXHJcbmdldENvdW50cmllcy5pbml0KClcclxuXHJcblxyXG4vKlxyXG5zcHJhd2TFuiBjenkgamVzdCBiYXphXHJcbnNwcmF3ZMW8IGN6eSBsaXN0YSBwYcWEc3R3IGplc3QgbmEgYmF6aWVcclxuamXFm2xpIGplc3QgdG8gasSFIHBvYmllcnpcclxuamXFm2xpIG5pZSBtYSB0byBwb2JpZXJ6IHogbmV0dVxyXG5pIHphcGlzeiBqYSBuYSBiYXppZVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiovXHJcbiIsImltcG9ydCB7ICBkZWZhdWx0IGFzIHZhcmlhYmxlcyB9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxubGV0IG9iaiA9IHt9XHJcbmxldCBnZHBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5HRFBfQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVGFibGUoZGF0YSkge1xyXG4gIGlmIChnZHBDb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICBnZHBDb250YWluZXIuaW5uZXJIVE1MID0gJydcclxuICB9XHJcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEFCTEUnKVxyXG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpXHJcbiAgbGV0IHllYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpXHJcbiAgeWVhci5pbm5lckhUTUwgPSAneWVhcidcclxuICBsZXQgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpXHJcbiAgdmFsdWUuaW5uZXJIVE1MID0gJ3ZhbHVlJ1xyXG4gIGhlYWRlclJvdy5hcHBlbmRDaGlsZCh5ZWFyKVxyXG4gIGhlYWRlclJvdy5hcHBlbmRDaGlsZCh2YWx1ZSlcclxuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xyXG4gIGRhdGEgPSBkYXRhWzFdXHJcbiAgLy9jb25zb2xlLmxvZygnZGFuZScgKyBkYXRhKVxyXG4gIGlmKGRhdGEpe1xyXG4gICAgbGV0IHllYXJEYXRhO1xyXG4gICAgbGV0IHZhbHVlRGF0YTtcclxuICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgbGV0IGRhdGFSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpXHJcbiAgICAgIHllYXJEYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKVxyXG4gICAgICB2YWx1ZURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpXHJcbiAgICAgIC8vY29uc29sZS5sb2coJ2RhbmUnLGl0ZW0uY291bnRyeS5kYXRlLCBpdGVtLmNvdW50cnkudmFsdWUpXHJcblxyXG4gICAgICB5ZWFyRGF0YS5pbm5lckhUTUwgPSBpdGVtLmRhdGVcclxuICAgICAgeWVhckRhdGEuc2V0QXR0cmlidXRlKCdjbGFzcycsICd5ZWFyJylcclxuICAgICAgZGF0YVJvdy5hcHBlbmRDaGlsZCh5ZWFyRGF0YSlcclxuICAgICAgdmFsdWVEYXRhLmlubmVySFRNTCA9IE51bWJlcihpdGVtLnZhbHVlKS50b0ZpeGVkKDIpXHJcbiAgICAgIGRhdGFSb3cuYXBwZW5kQ2hpbGQodmFsdWVEYXRhKVxyXG4gICAgICB0YWJsZS5hcHBlbmRDaGlsZChkYXRhUm93KTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhpdGVtLmRhdGUpXHJcbiAgICB9KVxyXG5cclxuICAgIGdkcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSlcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5vYmogPSB7XHJcbiAgYnVpbGRUYWJsZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB7ICBkZWZhdWx0IGFzIHZhcmlhYmxlcyB9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbnZhcmlhYmxlcy5WSVNVQUxJWkFUSU9OX1NFTEVDVE9SXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5WSVNVQUxJWkFUSU9OX1NFTEVDVE9SKVxyXG5cclxuZnVuY3Rpb24gdmlzdWFsaXplRGF0YShkYXRhKSB7XHJcbiAgZGF0YSA9IGRhdGFbMV1cclxuICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gIGlmKGRhdGEpe1xyXG4gICAgbGV0IG1pblllYXIgPSBNYXRoLm1pbiggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0uZGF0ZSkpXHJcbiAgICBsZXQgbWF4WWVhciA9TWF0aC5tYXgoIC4uLmRhdGEubWFwKGl0ZW09PiBpdGVtLmRhdGUpKVxyXG4gICAgbGV0IG1pblZhbCA9IE1hdGgubWluKCAuLi5kYXRhLm1hcChpdGVtPT4gaXRlbS52YWx1ZSkpXHJcbiAgICBsZXQgbWF4VmFsID0gTWF0aC5tYXgoIC4uLmRhdGEubWFwKGl0ZW09PiBpdGVtLnZhbHVlKSlcclxuICAgIGxldCB5ZWFyVW5pdCA9IDQwMC8obWF4WWVhci1taW5ZZWFyKVxyXG4gICAgbGV0IHZhbHVlVW5pdCA9IDIwMC8obWF4VmFsLW1pblZhbClcclxuXHJcbiAgICBjb25zb2xlLmxvZygneWVhclVuaXQsdmFsdWVVbml0JyttaW5ZZWFyLG1heFllYXIseWVhclVuaXQsdmFsdWVVbml0KVxyXG5cclxuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlPVwicmVkXCI7XHJcbiAgICBjdHgubGluZVdpZHRoPTU7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKDAsIDMwMCk7XHJcbiAgICBsZXQgeD15ZWFyVW5pdDs7XHJcbiAgICBsZXQgeT15ZWFyVW5pdDtcclxuICAgIGRhdGEuZm9yRWFjaChpdGVtPT57XHJcbiAgICAgIC8veD15ZWFyVW5pdCppdGVtLmRhdGVcclxuICAgICAgLy9jb25zb2xlLmxvZyh2YWx1ZVVuaXQsaXRlbS52YWx1ZSlcclxuICAgICAgeSA9ICgyMDAgKiBpdGVtLnZhbHVlKS9tYXhWYWw7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd4aXknICsgeCx5KVxyXG4gICAgICBjdHgubGluZVRvKHgsIHkpO1xyXG4gICAgICB4PXgrIHllYXJVbml0XHJcbiAgICAgIHk9MFxyXG4gICAgfSlcclxuICAgIC8vY3R4LmxpbmVUbygyMDAsIDEwMCk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhjYW52YXMpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3Qgb2JqID0ge3Zpc3VhbGl6ZURhdGF9XHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiaW1wb3J0IHtcclxuICBkZWZhdWx0IGFzIHZhcmlhYmxlc1xyXG59IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5nb29nbGUuY2hhcnRzLmxvYWQoJ2N1cnJlbnQnLCB7J3BhY2thZ2VzJzpbJ2NvcmVjaGFydCddfSk7XHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZURhdGFGb3JDaGFydChkYXRhRm9yQ2hhcnQpe1xyXG4gIGxldCBwcmVwYXJlZERhdGE7XHJcbiAgaWYoZGF0YUZvckNoYXJ0KXtcclxuICAgIGRhdGFGb3JDaGFydCA9IGRhdGFGb3JDaGFydFsxXVxyXG4gICAgZGF0YUZvckNoYXJ0ID0gZGF0YUZvckNoYXJ0LnJldmVyc2UoKVxyXG5cclxuICAgIHByZXBhcmVkRGF0YSA9IFtcclxuICAgICAgLy9bJ1llYXInLCAnVmFsdWUnXVxyXG4gICAgXTtcclxuICAgIGRhdGFGb3JDaGFydC5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICBsZXQgb25lSXRlbSA9IFtdXHJcbiAgICAgIG9uZUl0ZW0ucHVzaChpdGVtLmRhdGUpXHJcbiAgICAgIG9uZUl0ZW0ucHVzaChOdW1iZXIoaXRlbS52YWx1ZSkpXHJcbiAgICAgIHByZXBhcmVkRGF0YS5wdXNoKG9uZUl0ZW0pXHJcbiAgICB9KVxyXG4gICAgcHJlcGFyZWREYXRhLnNvcnQoKGEsYik9PnBhcnNlRmxvYXQoYVswXSktcGFyc2VGbG9hdChiWzBdKSlcclxuICAgIHByZXBhcmVkRGF0YS51bnNoaWZ0KFsnWWVhcicsICdWYWx1ZSddKVxyXG5cclxuICB9XHJcblxyXG5cclxuICByZXR1cm4gcHJlcGFyZWREYXRhXHJcbn1cclxuZnVuY3Rpb24gZHJhd0NoYXJ0Rm9yR0NoYXJ0cyhkYXRhZm9yQ2hhcnQsY291bnRyeSl7XHJcbiAgY29uc29sZS5sb2coZGF0YWZvckNoYXJ0KVxyXG4gIGdvb2dsZS5jaGFydHMubG9hZCgnY3VycmVudCcsIHsncGFja2FnZXMnOlsnY29yZWNoYXJ0J119KTtcclxuICBnb29nbGUuY2hhcnRzLnNldE9uTG9hZENhbGxiYWNrKGRyYXdDaGFydChkYXRhZm9yQ2hhcnQsY291bnRyeSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3Q2hhcnQoZGF0YWZvckNoYXJ0LGNvdW50cnkpIHtcclxuXHJcblxyXG4gIGxldCBwcmVwYXJlZERhdGEgPSBwcmVwYXJlRGF0YUZvckNoYXJ0KGRhdGFmb3JDaGFydCk7XHJcbiAgbGV0IGRhdGEgPSBnb29nbGUudmlzdWFsaXphdGlvbi5hcnJheVRvRGF0YVRhYmxlKHByZXBhcmVkRGF0YSlcclxuXHJcbiAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICB0aXRsZTogY291bnRyeSxcclxuICAgIGN1cnZlVHlwZTogJ2Z1bmN0aW9uJyxcclxuICAgIGxlZ2VuZDogeyBwb3NpdGlvbjogJ2JvdHRvbScgfVxyXG4gIH07XHJcblxyXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnZlX2NoYXJ0JykpO1xyXG5cclxuICBjaGFydC5kcmF3KGRhdGEsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGRyYXdDaGFydEZvckdDaGFydHNcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgdmFyaWFibGVzXHJcbn0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgYnVpbGRUYWJsZVxyXG59IGZyb20gJy4vYnVpbGRUYWJsZS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBjYW52YXNcclxufSBmcm9tICcuL2NhbnZhcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyByZWFkRGF0YURCXHJcbn0gZnJvbSAnLi9yZWFkRGF0YS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBhZGREYXRhREJcclxufSBmcm9tICcuL2FkZERhdGFEQi5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBkcmF3Q2hhcnRcclxufSBmcm9tICcuL2RyYXdDaGFydC5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxuXHJcblxyXG5sZXQgc2VsZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuU0VMRUNUX0NPVU5UUllfU0VMRUNUT1IpO1xyXG5sZXQgY291bnRyeUxpc3RMaW5rID0gdmFyaWFibGVzLkNPVU5UUllfTElTVF9MSU5LO1xyXG5sZXQgZ2RwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcbmxldCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTRUxFQ1QnKTtcclxubGV0IHNlbGVjdEluZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpO1xyXG5sZXQgZ2V0RGF0YUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkdFVF9EQVRBX0JUTik7XHJcbmxldCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuREVTQ1JJUFRJT05fU0VMRUNUT1IpO1xyXG5sZXQgaW5mb0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLklORk9fQk9YX1NFTEVDVE9SKTtcclxuXHJcbmdldERhdGFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXREYXRhKVxyXG5zZWxlY3RJbmRpY2F0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0SW5kaWNhdG9yRGVzY3JpcHRpb24pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEluZGljYXRvckRlc2NyaXB0aW9uKCkge1xyXG4gIGRlc2NyaXB0aW9uRmllbGQuaW5uZXJIVE1MID0gZXZlbnQudGFyZ2V0Lm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXNvdXJjZW5vdGUnKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gIGxldCB1cmwgPSBgaHR0cDovL2FwaS53b3JsZGJhbmsub3JnL3YyL2NvdW50cmllcy8ke3NlbGVjdC52YWx1ZX0vaW5kaWNhdG9ycy8ke3NlbGVjdEluZGljYXRvci52YWx1ZX0/Zm9ybWF0PWpzb25gXHJcbiAgbGV0IHF1ZXJ5TmFtZSA9IGAke3NlbGVjdC52YWx1ZX1fJHtzZWxlY3RJbmRpY2F0b3IudmFsdWV9YFxyXG4gIGxldCBjb3VudHJ5ID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY291bnRyeScpXHJcbiAgaW5mb0JveC5pbm5lckhUTUwgPScnXHJcbiAgbGV0IHByb21pcyA9IHJlYWREYXRhREIucmVhZERhdGEocXVlcnlOYW1lKTtcclxuICBwcm9taXMudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBnZXQodXJsKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgbWluaWZ5RGF0YShkYXRhKVxyXG4gICAgICAgICAgZHJhd0NoYXJ0LmRyYXdDaGFydEZvckdDaGFydHMoZGF0YSxjb3VudHJ5KVxyXG4gICAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSB7cXVlcnk6cXVlcnlOYW1lLGRhdGE6ZGF0YX1cclxuICAgICAgICAgIGFkZERhdGFEQi5hZGREYXRhKGRhdGFUb1NhdmUpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpbmZvQm94LmlubmVySFRNTCA9IFwiRXJyb3Igd2l0aCBnZXR0aW5nIGRhdGEgZnJvbSB3YiBhcGlcIlxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHdpdGggZ2V0dGluZyBkYXRhIGZyb20gd2IgYXBpJyxlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZHJhd0NoYXJ0LmRyYXdDaGFydEZvckdDaGFydHMoZGF0YS5kYXRhLGNvdW50cnkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciByZWFkaW5nIGRhdGEnLCBlcnJvcilcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWluaWZ5RGF0YShkYXRhKXtcclxuICBsZXQgbmV3RGF0YSA9IFtdO1xyXG4gIC8vZGF0YS5zcGxpY2VbMCwxXHJcbiAgZGF0YVsxXS5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgbGV0IG5ld0l0ZW0gPSB7XHJcbiAgICAgIGRhdGU6aXRlbS5kYXRlLFxyXG4gICAgICB2YWx1ZTppdGVtLnZhbHVlXHJcbiAgICB9XHJcbiAgICBuZXdEYXRhLnB1c2gobmV3SXRlbSlcclxuICB9KVxyXG4gIGRhdGFbMV09bmV3RGF0YVxyXG4gIHJldHVybiBuZXdEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb3VudHJpZXMoY291bnRyaWVzKSB7XHJcbiAgY291bnRyaWVzID0gSlNPTi5wYXJzZShjb3VudHJpZXMpXHJcbiAgY291bnRyaWVzWzFdLnNvcnQoKGEsYik9PiAoJycrIGEubmFtZSkubG9jYWxlQ29tcGFyZShiLm5hbWUpKVxyXG4gIGxldCBvcHRpb247XHJcbiAgY291bnRyaWVzWzFdLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZihpdGVtLmNhcGl0YWxDaXR5KXtcclxuICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJylcclxuICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpdGVtLmlkKVxyXG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdsYWJlbCcsIGl0ZW0ubmFtZSlcclxuICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY291bnRyeScsIGl0ZW0ubmFtZSlcclxuICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGljYXRvcnMoKSB7XHJcbiAgbGV0IG9wdGlvbjtcclxuICB2YXJpYWJsZXMuSU5ESUNBVE9SUy5mb3JFYWNoKGluZGljYXRvciA9PiB7XHJcbiAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaW5kaWNhdG9yLmlkKVxyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnbGFiZWwnLCBpbmRpY2F0b3IubmFtZSlcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXNvdXJjZU5vdGUnLCBpbmRpY2F0b3Iuc291cmNlTm90ZSlcclxuICAgIHNlbGVjdEluZGljYXRvci5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gIH0pXHJcblxyXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RJbmRpY2F0b3IpO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgbGV0IHByb21pcyA9IHJlYWREYXRhREIucmVhZERhdGEodmFyaWFibGVzLklORF9EQl9DT1VOVFJZX0xJU1QpO1xyXG4gIHByb21pcy50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGlmQ291bnRyeUxpc3RFeGlzdChkYXRhKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciByZWFkaW5nIGRhdGEnLCBlcnJvcilcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpZkNvdW50cnlMaXN0RXhpc3QoZGF0YSkge1xyXG4gIGlmICghZGF0YSkge1xyXG4gICAgbGV0IGNvdW50cnlMaXN0ID0gZ2V0Q291bnRyeUxpc3QoKTtcclxuICB9IGVsc2V7XHJcbiAgICBnZXRDb3VudHJpZXMoZGF0YS5kYXRhKVxyXG4gIH1cclxuICBnZXRJbmRpY2F0b3JzKClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldENvdW50cnlMaXN0KCkge1xyXG4gIGxldCBjb3VudHJ5TGlzdCA9IGdldCh2YXJpYWJsZXMuQ09VTlRSWV9MSVNUX0xJTkspO1xyXG4gIGNvdW50cnlMaXN0LnRoZW4oKGRhdGEpID0+IHtcclxuICAgIGdldENvdW50cmllcyhkYXRhKVxyXG4gICAgbGV0IGRhdGFUb1NhdmUgPSB7cXVlcnk6dmFyaWFibGVzLklORF9EQl9DT1VOVFJZX0xJU1QsZGF0YTpkYXRhfVxyXG4gICAgYWRkRGF0YURCLmFkZERhdGEoZGF0YVRvU2F2ZSlcclxuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdnZXRDb3VudHJ5TGlzdCBlcnJvciAnLCBlcnJvcilcclxuICB9KVxyXG4gIHJldHVybiBjb3VudHJ5TGlzdFxyXG59XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGluaXRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXQodXJsKXtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGh0dHAub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcclxuICAgIHhodHRwLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoeGh0dHAuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIHJlc29sdmUoeGh0dHAucmVzcG9uc2UpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KHhodHRwLnN0YXR1c1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGh0dHAub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZWplY3QoeGh0dHAuc3RhdHVzVGV4dClcclxuICAgIH07XHJcbiAgICB4aHR0cC5zZW5kKCk7XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldCB9IGZyb20gJy4vaGVscGVyLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyB2YXJpYWJsZXMgfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxubGV0IGtleVBhdGggPSAncXVlcnknO1xyXG5sZXQgc3RvcmVOYW1lID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxubGV0IGNvbmZpZ09iaiA9IHsga2V5UGF0aDogJ3F1ZXJ5J31cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQsc3RvcmVOYW1lLGNvbmZpZ09iaikge1xyXG4gIGxldCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuICBsZXQgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUsIGNvbmZpZ09iaik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHN0b3JlTmFtZSl7XHJcbiAgbGV0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oW3N0b3JlTmFtZV0sICk7XHJcbiAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdvbmNvbXBsZXRlIHRyYW5zY3Rpb24nLCBldmVudCk7XHJcbiAgfTtcclxuICB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdvbmVycm9yIHRyYW5zY3Rpb24nLCBldmVudClcclxuICB9O1xyXG4gIHJldHVybiB0cmFuc2FjdGlvbjtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRSZWNvcmQoZXZlbnQsbG9va2VkVmFsdWUscHJvbWlzZUZuICl7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYixzdG9yZU5hbWUpO1xyXG4gIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgbGV0IHF1ZXJ5ID0gb2JqZWN0U3RvcmUuZ2V0KGxvb2tlZFZhbHVlKVxyXG4gIGxldCByZXN1bHQ7XHJcblxyXG4gIHF1ZXJ5Lm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ3F1ZXJ5IGVycm9yJyxldmVudClcclxuICAgIHByb21pc2VGbi5yZWplY3QoZXZlbnQpXHJcbiAgICAvL3JldHVybiByZXN1bHQ7XHJcbiAgfTtcclxuICBxdWVyeS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZygncXVlcnkgc3VrY2VzJyxldmVudClcclxuICAgIHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuICAgIHByb21pc2VGbi5yZXNvbHZlKHJlc3VsdClcclxuICAgIC8vcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlcXVlc3RPcGVuRGIocHJvbWlzZUZuKXtcclxuICAvL2NvbnNvbGUubG9nKHByb21pc2VGbilcclxuICBsZXQgaW5kZXhlZERiID0gd2luZG93LmluZGV4ZWREQjtcclxuICBsZXQgcmVxdWVzdDtcclxuICBpZihpbmRleGVkRGIpe1xyXG4gICAgbGV0IHJlcXVlc3QgPSBpbmRleGVkRGIub3BlbihzdG9yZU5hbWUpO1xyXG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdyZXF1ZXN0IG9udXBncmFkZW5lZWRlZCcsIGV2ZW50KTtcclxuICAgICAgY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQsc3RvcmVOYW1lLGNvbmZpZ09iailcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGJsb2NrZWQnLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBvbmVycm9yJywgZXZlbnQpXHJcbiAgICAgIHByb21pc2VGbi5yZWplY3QoZXZlbnQpXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0XHJcbiAgfVxyXG4gIHJldHVybiByZXF1ZXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkRGF0YShsb29rZWRWYWx1ZSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICBsZXQgcHJvbWlzZU9iaiA9IHtyZXNvbHZlLHJlamVjdH07XHJcbiAgICBsZXQgcmVxdWVzdCA9IHJlcXVlc3RPcGVuRGIocHJvbWlzZU9iailcclxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncmVxdWVzdCBvbnN1Y2Nlc3MnLCBldmVudClcclxuICAgICAgcmV0dXJuIHJlYWRSZWNvcmQoZXZlbnQsbG9va2VkVmFsdWUsIHByb21pc2VPYmopXHJcbiAgICB9O1xyXG4gIH0pXHJcbn07XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGEoa2V5LHZhbHVlKSB7XHJcbiAgbGV0IGluZGV4ZWREYiA9IHdpbmRvdy5pbmRleGVkREJcclxuICBpZiAoIWluZGV4ZWREYikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5vYmogPSB7XHJcbiAgcmVhZERhdGEsXHJcbiAgY3JlYXRlRGF0YVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImNvbnN0IG9iaiA9IHt9XHJcblxyXG5cclxubGV0IGtleVBhdGggPSAncXVlcnknO1xyXG5sZXQgc3RvcmVOYW1lID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxubGV0IGNvbmZpZ09iaiA9IHsga2V5UGF0aDogJ3F1ZXJ5J31cclxuXHJcbm9iai5JTkRfREJfQ09VTlRSWV9MSVNUID0gJ2NvdW50cnlMaXN0J1xyXG5vYmouSU5EX0RCX0tFWV9QQVRIID0gJ3F1ZXJ5Jztcclxub2JqLklORF9EQl9DT05GSUdfT0JKID0geyBrZXlQYXRoOiAncXVlcnknfTtcclxub2JqLklORF9EQl9TVE9SRV9OQU1FID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxuXHJcbm9iai5JTkRfREJfU1RPUkVfTkFNRSA9ICd3b3JsZC1iYW5rLWRhdGEtcmVzZWFyY2hlcic7XHJcbm9iai5TRUxFQ1RfQ09VTlRSWV9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzZWxlY3QtY29udGFpbmVyXCJdJztcclxub2JqLkdEUF9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwiZ2RwLWNvbnRhaW5lclwiXSc7XHJcbm9iai5DT1VOVFJZX0xJU1RfTElOSyA9ICdodHRwczovL2FwaS53b3JsZGJhbmsub3JnL3YyL2NvdW50cmllcz9mb3JtYXQ9SlNPTiZwZXJfcGFnZT0zMDUnO1xyXG4vL2BodHRwOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyaWVzLyR7ZXZlbnQudGFyZ2V0LnZhbHVlfS9pbmRpY2F0b3JzL05ZLkdEUC5NS1RQLkNEP2Zvcm1hdD1qc29uYFxyXG5vYmouSU5ESUNBVE9SU19MSU5LID0gJ2h0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9pbmRpY2F0b3JzP2Zvcm1hdD1qc29uJztcclxub2JqLkdFVF9EQVRBX0JUTiA9ICdbZGF0YS10YXJnZXQ9XCJnZXQtZGF0YS1idXR0b25cIl0nO1xyXG5cclxub2JqLklORk9fQk9YX1NFTEVDVE9SID0nW2RhdGEtdGFyZ2V0PVwiaW5mby1ib3hcIl0nXHJcbm9iai5ERVNDUklQVElPTl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJkZXNjcmlwdGlvbi1jb250YWluZXJcIl0nO1xyXG5cclxub2JqLlZJU1VBTElaQVRJT05fU0VMRUNUT1IgPSdbZGF0YS10YXJnZXQ9XCJ2aXN1YWxpc2F0aW9uLWNvbnRhaW5lclwiXSc7XHJcblxyXG5vYmouSU5ESUNBVE9SUyA9IFt7XHJcbiAgICBcImlkXCI6IFwiTlkuQURKLkFFRFUuR04uWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkFkanVzdGVkIHNhdmluZ3M6IGVkdWNhdGlvbiBleHBlbmRpdHVyZSAoJSBvZiBHTkkpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJFZHVjYXRpb24gZXhwZW5kaXR1cmUgcmVmZXJzIHRvIHRoZSBjdXJyZW50IG9wZXJhdGluZyBleHBlbmRpdHVyZXMgaW4gZWR1Y2F0aW9uLCBpbmNsdWRpbmcgd2FnZXMgYW5kIHNhbGFyaWVzIGFuZCBleGNsdWRpbmcgY2FwaXRhbCBpbnZlc3RtZW50cyBpbiBidWlsZGluZ3MgYW5kIGVxdWlwbWVudC5cIixcclxuICAgIFwic291cmNlT3JnYW5pemF0aW9uXCI6IFwiVU5FU0NPOyBkYXRhIGFyZSBleHRyYXBvbGF0ZWQgdG8gdGhlIG1vc3QgcmVjZW50IHllYXIgYXZhaWxhYmxlXCJcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBcImlkXCI6IFwiZzIwLnQucmVjZWl2ZS4xXCIsXHJcbiAgICBcIm5hbWVcIjogXCJSZWNlaXZlZCBkaWdpdGFsIHBheW1lbnRzIGluIHRoZSBwYXN0IHllYXIsIG1hbGUgKCUgYWdlIDE1KylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlRoZSBwZXJjZW50YWdlIG9mIHJlc3BvbmRlbnRzIHdobyByZXBvcnQgdXNpbmcgbW9iaWxlIG1vbmV5LCBhIGRlYml0IG9yIGNyZWRpdCBjYXJkLCBvciBhIG1vYmlsZSBwaG9uZSB0byByZWNlaXZlIGEgcGF5bWVudCB0aHJvdWdoIGFuIGFjY291bnQgaW4gdGhlIHBhc3QgMTIgbW9udGhzLiBJdCBhbHNvIGluY2x1ZGVzIHJlc3BvbmRlbnRzIHdobyByZXBvcnQgcmVjZWl2aW5nIHJlbWl0dGFuY2VzLCByZWNlaXZpbmcgcGF5bWVudHMgZm9yIGFncmljdWx0dXJhbCBwcm9kdWN0cywgcmVjZWl2aW5nIGdvdmVybm1lbnQgdHJhbnNmZXJzLCByZWNlaXZpbmcgd2FnZXMsIG9yIHJlY2VpdmluZyBhIHB1YmxpYyBzZWN0b3IgcGVuc2lvbiBkaXJlY3RseSBpbnRvIGEgZmluYW5jaWFsIGluc3RpdHV0aW9uIGFjY291bnQgb3IgdGhyb3VnaCBhIG1vYmlsZSBtb25leSBhY2NvdW50IGluIHRoZSBwYXN0IDEyIG1vbnRocywgbWFsZSAoJSBhZ2UgMTUrKS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIk5ZLkdEUC5ERUZMLktELlpHLkFEXCIsXHJcbiAgICBcIm5hbWVcIjogXCJJbmZsYXRpb24sIEdEUCBkZWZsYXRvcjogbGlua2VkIHNlcmllcyAoYW5udWFsICUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJJbmZsYXRpb24gYXMgbWVhc3VyZWQgYnkgdGhlIGFubnVhbCBncm93dGggcmF0ZSBvZiB0aGUgR0RQIGltcGxpY2l0IGRlZmxhdG9yIHNob3dzIHRoZSByYXRlIG9mIHByaWNlIGNoYW5nZSBpbiB0aGUgZWNvbm9teSBhcyBhIHdob2xlLiBUaGlzIHNlcmllcyBoYXMgYmVlbiBsaW5rZWQgdG8gcHJvZHVjZSBhIGNvbnNpc3RlbnQgdGltZSBzZXJpZXMgdG8gY291bnRlcmFjdCBicmVha3MgaW4gc2VyaWVzIG92ZXIgdGltZSBkdWUgdG8gY2hhbmdlcyBpbiBiYXNlIHllYXJzLCBzb3VyY2UgZGF0YSBhbmQgbWV0aG9kb2xvZ2llcy4gVGh1cywgaXQgbWF5IG5vdCBiZSBjb21wYXJhYmxlIHdpdGggb3RoZXIgbmF0aW9uYWwgYWNjb3VudHMgc2VyaWVzIGluIHRoZSBkYXRhYmFzZSBmb3IgaGlzdG9yaWNhbCB5ZWFycy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNNLlBPUC5ORVRNXCIsXHJcbiAgICBcIm5hbWVcIjogXCJOZXQgbWlncmF0aW9uXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJOZXQgbWlncmF0aW9uIGlzIHRoZSBuZXQgdG90YWwgb2YgbWlncmFudHMgZHVyaW5nIHRoZSBwZXJpb2QsIHRoYXQgaXMsIHRoZSB0b3RhbCBudW1iZXIgb2YgaW1taWdyYW50cyBsZXNzIHRoZSBhbm51YWwgbnVtYmVyIG9mIGVtaWdyYW50cywgaW5jbHVkaW5nIGJvdGggY2l0aXplbnMgYW5kIG5vbmNpdGl6ZW5zLiBEYXRhIGFyZSBmaXZlLXllYXIgZXN0aW1hdGVzLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0guQ09OLkFJRFMuTUEuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkNvbmRvbSB1c2UgYXQgbGFzdCBoaWdoLXJpc2sgc2V4LCBhZHVsdCBtYWxlICglIGFnZXMgMTUtNDkpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJDb25kb20gdXNlIGF0IGxhc3QgaGlnaC1yaXNrIHNleCwgbWFsZSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgbWFsZSBwb3B1bGF0aW9uIGFnZXMgMTUtNDkgd2hvIHVzZWQgYSBjb25kb20gYXQgbGFzdCBpbnRlcmNvdXJzZSB3aXRoIGEgbm9uLW1hcml0YWwgYW5kIG5vbi1jb2hhYml0aW5nIHNleHVhbCBwYXJ0bmVyIGluIHRoZSBsYXN0IDEyIG1vbnRocy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi5BSURTLkZFLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlIGF0IGxhc3QgaGlnaC1yaXNrIHNleCwgYWR1bHQgZmVtYWxlICglIGFnZXMgMTUtNDkpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJDb25kb20gdXNlIGF0IGxhc3QgaGlnaC1yaXNrIHNleCwgZmVtYWxlIGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBmZW1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTQ5IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2Ugd2l0aCBhIG5vbi1tYXJpdGFsIGFuZCBub24tY29oYWJpdGluZyBzZXh1YWwgcGFydG5lciBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0guQ09OLjE1MjQuTUEuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkNvbmRvbSB1c2UsIHBvcHVsYXRpb24gYWdlcyAxNS0yNCwgbWFsZSAoJSBvZiBtYWxlcyBhZ2VzIDE1LTI0KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSwgbWFsZSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgbWFsZSBwb3B1bGF0aW9uIGFnZXMgMTUtMjQgd2hvIHVzZWQgYSBjb25kb20gYXQgbGFzdCBpbnRlcmNvdXJzZSBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0guQ09OLjE1MjQuRkUuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkNvbmRvbSB1c2UsIHBvcHVsYXRpb24gYWdlcyAxNS0yNCwgZmVtYWxlICglIG9mIGZlbWFsZXMgYWdlcyAxNS0yNClcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkNvbmRvbSB1c2UsIGZlbWFsZSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZmVtYWxlIHBvcHVsYXRpb24gYWdlcyAxNS0yNCB3aG8gdXNlZCBhIGNvbmRvbSBhdCBsYXN0IGludGVyY291cnNlIGluIHRoZSBsYXN0IDEyIG1vbnRocy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guVElSRC5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUgaXMgdGlyZWQgb3Igbm90IGluIHRoZSBtb29kICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBpcyB0aXJlZCBvciBub3QgaW4gdGhlIG1vb2QuXCJcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0cuUlNYLlRNRFMuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgd2lmZSBpcyBqdXN0aWZpZWQgcmVmdXNpbmcgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGtub3dzIGhlIGhhcyBzZXh1YWxseSB0cmFuc21pdHRlZCBkaXNlYXNlICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBodXNiYW5kIGhhcyBzZXh1YWxseSB0cmFuc21pdHRlZCBkaXNlYXNlLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNHLlJTWC5TWE9ULlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIHdpZmUgaXMganVzdGlmaWVkIHJlZnVzaW5nIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBoZSBoYXMgc2V4IHdpdGggb3RoZXIgd29tZW4gKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZWQgMTUtNDkgd2hvIGJlbGlldmUgdGhhdCBhIHdpZmUgaXMganVzdGlmaWVkIGluIHJlZnVzaW5nIHRvIGhhdmUgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGtub3dzIGh1c2JhbmQgaGFzIHNleCB3aXRoIG90aGVyIHdvbWVuLlwiXHJcbiAgfSwge1xyXG4gICAgXCJpZFwiOiBcIlNHLlJTWC5SRUFTLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIHdpZmUgaXMganVzdGlmaWVkIHJlZnVzaW5nIHNleCB3aXRoIGhlciBodXNiYW5kIGZvciBhbGwgb2YgdGhlIHJlYXNvbnMgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZWQgMTUtNDkgd2hvIGJlbGlldmUgdGhhdCBhIHdpZmUgaXMganVzdGlmaWVkIGluIHJlZnVzaW5nIHRvIGhhdmUgc2V4IHdpdGggaGVyIGh1c2JhbmQgZm9yIGFsbCBvZiB0aGUgcmVhc29uczogaHVzYmFuZCBoYXMgc2V4dWFsbHkgdHJhbnNtaXR0ZWQgZGlzZWFzZSwgaHVzYmFuZCBoYXMgc2V4IHdpdGggb3RoZXIgd29tZW4sIHJlY2VudGx5IGdpdmVuIGJpcnRoLCB0aXJlZCBvciBub3QgaW4gdGhlIG1vb2QuXCJcclxuICB9LCB7XHJcbiAgICBcImlkXCI6IFwiU0cuVkFXLkJVUk4uWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgaHVzYmFuZCBpcyBqdXN0aWZpZWQgaW4gYmVhdGluZyBoaXMgd2lmZSB3aGVuIHNoZSBidXJucyB0aGUgZm9vZCAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlcyAxNS00OSB3aG8gYmVsaWV2ZSBhIGh1c2JhbmRcXC9wYXJ0bmVyIGlzIGp1c3RpZmllZCBpbiBoaXR0aW5nIG9yIGJlYXRpbmcgaGlzIHdpZmVcXC9wYXJ0bmVyIHdoZW4gc2hlIGJ1cm5zIHRoZSBmb29kLlwiXHJcbiAgfSxcclxuXHJcblxyXG5cclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkNBUEEuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIkJhbmsgY2FwaXRhbCB0byBhc3NldHMgcmF0aW8gKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJCYW5rIGNhcGl0YWwgdG8gYXNzZXRzIGlzIHRoZSByYXRpbyBvZiBiYW5rIGNhcGl0YWwgYW5kIHJlc2VydmVzIHRvIHRvdGFsIGFzc2V0cy4gQ2FwaXRhbCBhbmQgcmVzZXJ2ZXMgaW5jbHVkZSBmdW5kcyBjb250cmlidXRlZCBieSBvd25lcnMsIHJldGFpbmVkIGVhcm5pbmdzLCBnZW5lcmFsIGFuZCBzcGVjaWFsIHJlc2VydmVzLCBwcm92aXNpb25zLCBhbmQgdmFsdWF0aW9uIGFkanVzdG1lbnRzLiBDYXBpdGFsIGluY2x1ZGVzIHRpZXIgMSBjYXBpdGFsIChwYWlkLXVwIHNoYXJlcyBhbmQgY29tbW9uIHN0b2NrKSwgd2hpY2ggaXMgYSBjb21tb24gZmVhdHVyZSBpbiBhbGwgY291bnRyaWVzJyBiYW5raW5nIHN5c3RlbXMsIGFuZCB0b3RhbCByZWd1bGF0b3J5IGNhcGl0YWwsIHdoaWNoIGluY2x1ZGVzIHNldmVyYWwgc3BlY2lmaWVkIHR5cGVzIG9mIHN1Ym9yZGluYXRlZCBkZWJ0IGluc3RydW1lbnRzIHRoYXQgbmVlZCBub3QgYmUgcmVwYWlkIGlmIHRoZSBmdW5kcyBhcmUgcmVxdWlyZWQgdG8gbWFpbnRhaW4gbWluaW11bSBjYXBpdGFsIGxldmVscyAodGhlc2UgY29tcHJpc2UgdGllciAyIGFuZCB0aWVyIDMgY2FwaXRhbCkuIFRvdGFsIGFzc2V0cyBpbmNsdWRlIGFsbCBub25maW5hbmNpYWwgYW5kIGZpbmFuY2lhbCBhc3NldHMuXCJcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guU0YuUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBzcGVjaWFsaXplZCBzdGF0ZSBmaW5hbmNpYWwgaW5zdGl0dXRpb25zIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCYW5rIGJyYW5jaGVzIChwZXIgMTAwLDAwMCBwZW9wbGUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILk1GLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCcmFuY2hlcywgbWljcm9maW5hbmNlIGluc3RpdHV0aW9ucyAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5DTy5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhbmNoZXMsIGNvb3BlcmF0aXZlcyAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5DQi5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhbmNoZXMsIGNvbW1lcmNpYWwgYmFua3MgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQVRNLlRPVEwuUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkF1dG9tYXRlZCB0ZWxsZXIgbWFjaGluZXMgKEFUTXMpIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJBdXRvbWF0ZWQgdGVsbGVyIG1hY2hpbmVzIGFyZSBjb21wdXRlcml6ZWQgdGVsZWNvbW11bmljYXRpb25zIGRldmljZXMgdGhhdCBwcm92aWRlIGNsaWVudHMgb2YgYSBmaW5hbmNpYWwgaW5zdGl0dXRpb24gd2l0aCBhY2Nlc3MgdG8gZmluYW5jaWFsIHRyYW5zYWN0aW9ucyBpbiBhIHB1YmxpYyBwbGFjZS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkFTVC5QVUJPLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJCYW5raW5nIGFzc2V0cyBoZWxkIGJ5IGdvdmVybm1lbnQtb3duZWQgYmFua3MgKCUgb2YgdG90YWwgYmFua2luZyBhc3NldHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkFTVC5OUEVSLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJCYW5rIG5vbnBlcmZvcm1pbmcgbG9hbnMgdG8gdG90YWwgZ3Jvc3MgbG9hbnMgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJCYW5rIG5vbnBlcmZvcm1pbmcgbG9hbnMgdG8gdG90YWwgZ3Jvc3MgbG9hbnMgYXJlIHRoZSB2YWx1ZSBvZiBub25wZXJmb3JtaW5nIGxvYW5zIGRpdmlkZWQgYnkgdGhlIHRvdGFsIHZhbHVlIG9mIHRoZSBsb2FuIHBvcnRmb2xpbyAoaW5jbHVkaW5nIG5vbnBlcmZvcm1pbmcgbG9hbnMgYmVmb3JlIHRoZSBkZWR1Y3Rpb24gb2Ygc3BlY2lmaWMgbG9hbi1sb3NzIHByb3Zpc2lvbnMpLiBUaGUgbG9hbiBhbW91bnQgcmVjb3JkZWQgYXMgbm9ucGVyZm9ybWluZyBzaG91bGQgYmUgdGhlIGdyb3NzIHZhbHVlIG9mIHRoZSBsb2FuIGFzIHJlY29yZGVkIG9uIHRoZSBiYWxhbmNlIHNoZWV0LCBub3QganVzdCB0aGUgYW1vdW50IHRoYXQgaXMgb3ZlcmR1ZS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTkUuVFJELkdORlMuWlNcIixcclxuICAgIFwibmFtZVwiOlwiVHJhZGUgKCUgb2YgR0RQKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJUcmFkZSBpcyB0aGUgc3VtIG9mIGV4cG9ydHMgYW5kIGltcG9ydHMgb2YgZ29vZHMgYW5kIHNlcnZpY2VzIG1lYXN1cmVkIGFzIGEgc2hhcmUgb2YgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdC4gXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIlNMLkdEUC5QQ0FQLkVNLktELlpHXCIsXHJcbiAgICBcIm5hbWVcIjpcIkdEUCBwZXIgcGVyc29uIGVtcGxveWVkIChhbm51YWwgJSBncm93dGgpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIkdEUCBwZXIgcGVyc29uIGVtcGxveWVkIGlzIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QgKEdEUCkgZGl2aWRlZCBieSB0b3RhbCBlbXBsb3ltZW50IGluIHRoZSBlY29ub215LlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuUENBUC5QUC5LRC5aR1wiLFxyXG4gICAgXCJuYW1lXCI6XCJHRFAgcGVyIGNhcGl0YSwgUFBQIGFubnVhbCBncm93dGggKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIkFubnVhbCBwZXJjZW50YWdlIGdyb3d0aCByYXRlIG9mIEdEUCBwZXIgY2FwaXRhIGJhc2VkIG9uIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IChQUFApLiBHRFAgcGVyIGNhcGl0YSBiYXNlZCBvbiBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSAoUFBQKS4gUFBQIEdEUCBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IGNvbnZlcnRlZCB0byBpbnRlcm5hdGlvbmFsIGRvbGxhcnMgdXNpbmcgcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgcmF0ZXMuIEFuIGludGVybmF0aW9uYWwgZG9sbGFyIGhhcyB0aGUgc2FtZSBwdXJjaGFzaW5nIHBvd2VyIG92ZXIgR0RQIGFzIHRoZSBVLlMuIGRvbGxhciBoYXMgaW4gdGhlIFVuaXRlZCBTdGF0ZXMuIEdEUCBhdCBwdXJjaGFzZXIncyBwcmljZXMgaXMgdGhlIHN1bSBvZiBncm9zcyB2YWx1ZSBhZGRlZCBieSBhbGwgcmVzaWRlbnQgcHJvZHVjZXJzIGluIHRoZSBlY29ub215IHBsdXMgYW55IHByb2R1Y3QgdGF4ZXMgYW5kIG1pbnVzIGFueSBzdWJzaWRpZXMgbm90IGluY2x1ZGVkIGluIHRoZSB2YWx1ZSBvZiB0aGUgcHJvZHVjdHMuIEl0IGlzIGNhbGN1bGF0ZWQgd2l0aG91dCBtYWtpbmcgZGVkdWN0aW9ucyBmb3IgZGVwcmVjaWF0aW9uIG9mIGZhYnJpY2F0ZWQgYXNzZXRzIG9yIGZvciBkZXBsZXRpb24gYW5kIGRlZ3JhZGF0aW9uIG9mIG5hdHVyYWwgcmVzb3VyY2VzLiBEYXRhIGFyZSBpbiBjb25zdGFudCAyMDAwIGludGVybmF0aW9uYWwgZG9sbGFycy4gIFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuUENBUC5QUC5LRFwiLFwibmFtZVwiOlwiR0RQIHBlciBjYXBpdGEsIFBQUCAoY29uc3RhbnQgMjAxMSBpbnRlcm5hdGlvbmFsICQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIkdEUCBwZXIgY2FwaXRhIGJhc2VkIG9uIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IChQUFApLiBQUFAgR0RQIGlzIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QgY29udmVydGVkIHRvIGludGVybmF0aW9uYWwgZG9sbGFycyB1c2luZyBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSByYXRlcy4gQW4gaW50ZXJuYXRpb25hbCBkb2xsYXIgaGFzIHRoZSBzYW1lIHB1cmNoYXNpbmcgcG93ZXIgb3ZlciBHRFAgYXMgdGhlIFUuUy4gZG9sbGFyIGhhcyBpbiB0aGUgVW5pdGVkIFN0YXRlcy4gR0RQIGF0IHB1cmNoYXNlcidzIHByaWNlcyBpcyB0aGUgc3VtIG9mIGdyb3NzIHZhbHVlIGFkZGVkIGJ5IGFsbCByZXNpZGVudCBwcm9kdWNlcnMgaW4gdGhlIGVjb25vbXkgcGx1cyBhbnkgcHJvZHVjdCB0YXhlcyBhbmQgbWludXMgYW55IHN1YnNpZGllcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBwcm9kdWN0cy4gSXQgaXMgY2FsY3VsYXRlZCB3aXRob3V0IG1ha2luZyBkZWR1Y3Rpb25zIGZvciBkZXByZWNpYXRpb24gb2YgZmFicmljYXRlZCBhc3NldHMgb3IgZm9yIGRlcGxldGlvbiBhbmQgZGVncmFkYXRpb24gb2YgbmF0dXJhbCByZXNvdXJjZXMuIERhdGEgYXJlIGluIGNvbnN0YW50IDIwMTEgaW50ZXJuYXRpb25hbCBkb2xsYXJzLlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuUENBUC5DRFwiLFwibmFtZVwiOlwiR0RQIHBlciBjYXBpdGEgKGN1cnJlbnQgVVMkKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgcGVyIGNhcGl0YSBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IGRpdmlkZWQgYnkgbWlkeWVhciBwb3B1bGF0aW9uLiBHRFAgaXMgdGhlIHN1bSBvZiBncm9zcyB2YWx1ZSBhZGRlZCBieSBhbGwgcmVzaWRlbnQgcHJvZHVjZXJzIGluIHRoZSBlY29ub215IHBsdXMgYW55IHByb2R1Y3QgdGF4ZXMgYW5kIG1pbnVzIGFueSBzdWJzaWRpZXMgbm90IGluY2x1ZGVkIGluIHRoZSB2YWx1ZSBvZiB0aGUgcHJvZHVjdHMuIEl0IGlzIGNhbGN1bGF0ZWQgd2l0aG91dCBtYWtpbmcgZGVkdWN0aW9ucyBmb3IgZGVwcmVjaWF0aW9uIG9mIGZhYnJpY2F0ZWQgYXNzZXRzIG9yIGZvciBkZXBsZXRpb24gYW5kIGRlZ3JhZGF0aW9uIG9mIG5hdHVyYWwgcmVzb3VyY2VzLiBEYXRhIGFyZSBpbiBjdXJyZW50IFUuUy4gZG9sbGFycy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLk1LVFAuWkdcIixcIm5hbWVcIjpcIkdyb3NzIGRvbWVzdGljIHByb2R1Y3QgKEF2LiBhbm51YWwgZ3Jvd3RoLCAlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgR0RQIGltcGxpY2l0IGRlZmxhdG9yIGlzIHRoZSByYXRpbyBvZiBHRFAgaW4gY3VycmVudCBsb2NhbCBjdXJyZW5jeSB0byBHRFAgaW4gY29uc3RhbnQgbG9jYWwgY3VycmVuY3kuIFRoZSBiYXNlIHllYXIgdmFyaWVzIGJ5IGNvdW50cnkuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5NS1RQLktOLjg3LlpHXCIsXCJuYW1lXCI6XCJHRFAgZ3Jvd3RoIChhbm51YWwgJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5NS1RQLkNEXCIsXCJuYW1lXCI6XCJHRFAgKGN1cnJlbnQgVVMkKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgYXQgcHVyY2hhc2VyJ3MgcHJpY2VzIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY3VycmVudCBVLlMuIGRvbGxhcnMuIERvbGxhciBmaWd1cmVzIGZvciBHRFAgYXJlIGNvbnZlcnRlZCBmcm9tIGRvbWVzdGljIGN1cnJlbmNpZXMgdXNpbmcgc2luZ2xlIHllYXIgb2ZmaWNpYWwgZXhjaGFuZ2UgcmF0ZXMuIEZvciBhIGZldyBjb3VudHJpZXMgd2hlcmUgdGhlIG9mZmljaWFsIGV4Y2hhbmdlIHJhdGUgZG9lcyBub3QgcmVmbGVjdCB0aGUgcmF0ZSBlZmZlY3RpdmVseSBhcHBsaWVkIHRvIGFjdHVhbCBmb3JlaWduIGV4Y2hhbmdlIHRyYW5zYWN0aW9ucywgYW4gYWx0ZXJuYXRpdmUgY29udmVyc2lvbiBmYWN0b3IgaXMgdXNlZC5cIlxyXG4gIH0sXHJcbiAge1xyXG5cImlkXCI6XCJTRS5URVIuRU5STC5GRS5aU1wiLFwibmFtZVwiOlwiUGVyY2VudGFnZSBvZiBzdHVkZW50cyBpbiB0ZXJ0aWFyeSBlZHVjYXRpb24gd2hvIGFyZSBmZW1hbGUgKCUpXCIsXHJcblwic291cmNlTm90ZVwiOlwiTnVtYmVyIG9mIGZlbWFsZSBzdHVkZW50cyBhdCB0aGUgdGVydGlhcnkgZWR1Y2F0aW9uIGxldmVsIChJU0NFRCA1IHRvIDgpIGV4cHJlc3NlZCBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIG51bWJlciBvZiBzdHVkZW50cyAobWFsZSBhbmQgZmVtYWxlKSBhdCB0aGUgdGVydGlhcnkgZWR1Y2F0aW9uIGxldmVsIChJU0NFRCA1IHRvIDgpIGluIGEgZ2l2ZW4gc2Nob29sIHllYXIuXCJcclxuXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRS5URVIuQ1VBVC5NUy5aU1wiLFwibmFtZVwiOlwiRWR1Y2F0aW9uYWwgYXR0YWlubWVudCwgYXQgbGVhc3QgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudCwgcG9wdWxhdGlvbiAyNSssIHRvdGFsICglKSAoY3VtdWxhdGl2ZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBvcHVsYXRpb24gYWdlcyAyNSBhbmQgb3ZlciB0aGF0IGF0dGFpbmVkIG9yIGNvbXBsZXRlZCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LlwiXHJcbn0sXHJcbntcclxuXCJpZFwiOlwiU0UuVEVSLkNVQVQuTVMuRkUuWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIGF0IGxlYXN0IE1hc3RlcidzIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCBmZW1hbGUgKCUpIChjdW11bGF0aXZlKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBvcHVsYXRpb24gYWdlcyAyNSBhbmQgb3ZlciB0aGF0IGF0dGFpbmVkIG9yIGNvbXBsZXRlZCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRS5URVIuQ1VBVC5ETy5aU1wiLFwibmFtZVwiOlwiRWR1Y2F0aW9uYWwgYXR0YWlubWVudCwgRG9jdG9yYWwgb3IgZXF1aXZhbGVudCwgcG9wdWxhdGlvbiAyNSssIHRvdGFsICglKSAoY3VtdWxhdGl2ZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBvcHVsYXRpb24gYWdlcyAyNSBhbmQgb3ZlciB0aGF0IGF0dGFpbmVkIG9yIGNvbXBsZXRlZCBEb2N0b3JhbCBvciBlcXVpdmFsZW50LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRS5URVIuQ1VBVC5NUy5NQS5aU1wiLFwibmFtZVwiOlwiRWR1Y2F0aW9uYWwgYXR0YWlubWVudCwgYXQgbGVhc3QgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudCwgcG9wdWxhdGlvbiAyNSssIG1hbGUgKCUpIChjdW11bGF0aXZlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhlIHBlcmNlbnRhZ2Ugb2YgcG9wdWxhdGlvbiBhZ2VzIDI1IGFuZCBvdmVyIHRoYXQgYXR0YWluZWQgb3IgY29tcGxldGVkIE1hc3RlcidzIG9yIGVxdWl2YWxlbnQuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILkZQTC5GU0VYLlE1LlpTXCIsXCJuYW1lXCI6XCJNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZSAod29tZW4gYWdlcyAyNS00OSk6IFE1IChoaWdoZXN0KVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2U6IE1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlIGFtb25nIHdvbWVuIGFnZWQgMjUtNDkgeWVhcnMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILkZQTC5GU0VYLlExLlpTXCIsXCJuYW1lXCI6XCJNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZSAod29tZW4gYWdlcyAyNS00OSk6IFExIChsb3dlc3QpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZTogTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgYW1vbmcgd29tZW4gYWdlZCAyNS00OSB5ZWFycy5cIlxyXG59LFxyXG57XHJcblxyXG4gIFwiaWRcIjpcIk1PLklOREVYLlNSTFcuWFFcIixcIm5hbWVcIjpcIlNhZmV0eSBhbmQgUnVsZSBvZiBMYXdcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlBlcnNvbmFsIFNhZmV0eTogIFdpdGhpbiB0aGlzIHN1Yi1jYXRlZ29yeSB0aGUgSWJyYWhpbSBJbmRleCBtZWFzdXJlczogKGkpIFNhZmV0eSBvZiB0aGUgUGVyc29uIOKAkyBsZXZlbCBvZiBjcmltaW5hbGl0eSBpbiBhIGNvdW50cnkuIChpaSkgVmlvbGVudCBDcmltZSDigJMgcHJldmFsZW5jZSBvZiB2aW9sZW50IGNyaW1lLCBib3RoIG9yZ2FuaXNlZCBhbmQgY29tbW9uLiAoaWlpKSBTb2NpYWwgVW5yZXN0IOKAkyBwcmV2YWxlbmNlIG9mIHZpb2xlbnQgc29jaWFsIHVucmVzdC4gKGl2KSBIdW1hbiBUcmFmZmlja2luZyDigJMgZ292ZXJubWVudCBlZmZvcnRzIHRvIGNvbWJhdCBodW1hbiB0cmFmZmlja2luZy4gKHYpIERvbWVzdGljIFBvbGl0aWNhbCBQZXJzZWN1dGlvbiDigJMgY2x1c3RlcmVkIGluZGljYXRvciAoYW4gYXZlcmFnZSkgb2YgdGhlIGZvbGxvd2luZyB2YXJpYWJsZXM6IFBoeXNpY2FsIEludGVncml0eSBSaWdodHMgSW5kZXgg4oCTIGdvdmVybm1lbnQgcmVzcGVjdCBmb3IgY2l0aXplbnPigJkgcmlnaHRzIHRvIGZyZWVkb20gZnJvbSB0b3J0dXJlLCBleHRyYWp1ZGljaWFsIGtpbGxpbmcsIHBvbGl0aWNhbCBpbXByaXNvbm1lbnQsIGFuZCBkaXNhcHBlYXJhbmNlLiAgUG9saXRpY2FsIFRlcnJvciBTY2FsZSDigJMgbGV2ZWxzIG9mIHN0YXRlLWluc3RpZ2F0ZWQgcG9saXRpY2FsIHZpb2xlbmNlIGFuZCB0ZXJyb3IuXCJcclxufSxcclxue1xyXG5cImlkXCI6XCJTRy5WQVcuMTU0OS5aU1wiLFwibmFtZVwiOlwiUHJvcG9ydGlvbiBvZiB3b21lbiBzdWJqZWN0ZWQgdG8gcGh5c2ljYWwgYW5kXFwvb3Igc2V4dWFsIHZpb2xlbmNlIGluIHRoZSBsYXN0IDEyIG1vbnRocyAoJSBvZiB3b21lbiBhZ2UgMTUtNDkpXCIsXHJcblwic291cmNlTm90ZVwiOlwiUHJvcG9ydGlvbiBvZiB3b21lbiBzdWJqZWN0ZWQgdG8gcGh5c2ljYWwgYW5kXFwvb3Igc2V4dWFsIHZpb2xlbmNlIGluIHRoZSBsYXN0IDEyIG1vbnRocyBpcyB0aGUgcGVyY2VudGFnZSBvZiBldmVyIHBhcnRuZXJlZCB3b21lbiBhZ2UgMTUtNDkgd2hvIGFyZSBzdWJqZWN0ZWQgdG8gcGh5c2ljYWwgdmlvbGVuY2UsIHNleHVhbCB2aW9sZW5jZSBvciBib3RoIGJ5IGEgY3VycmVudCBvciBmb3JtZXIgaW50aW1hdGUgcGFydG5lciBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCJcclxuXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRy5PV04uSFNBTC5NQS5aU1wiLFwibmFtZVwiOlwiTWVuIHdobyBvd24gaG91c2UgYWxvbmUgKCUgb2YgbWVuKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiTWVuIHdobyBvd24gaG91c2UgYWxvbmUgKCUgb2YgbWVuKSBpcyB0aGUgcGVyY2VudGFnZSBvZiBtZW4gd2hvIG9ubHkgc29sZWx5IG93biBhIGhvdXNlIHdoaWNoIGlzIGxlZ2FsbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZWlyIG5hbWUgb3IgY2Fubm90IGJlIHNvbGQgd2l0aG91dCB0aGVpciBzaWduYXR1cmUuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNHLk9XTi5IU0FMLkZFLlpTXCIsXCJuYW1lXCI6XCJXb21lbiB3aG8gb3duIGhvdXNlIGFsb25lICglIG9mIHdvbWVuIGFnZSAxNS00OSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIldvbWVuIHdobyBvd24gaG91c2UgYWxvbmUgKCUgb2Ygd29tZW4gYWdlIDE1LTQ5KSBpcyB0aGUgcGVyY2VudGFnZSBvZiB3b21lbiBhZ2UgMTUtNDkgd2hvIG9ubHkgb3duIGEgaG91c2UsIHdoaWNoIGxlZ2FsbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZWlyIG5hbWUgb3IgY2Fubm90IGJlIHNvbGQgd2l0aG91dCB0aGVpciBzaWduYXR1cmUsIGFsb25lIChkb24ndCBzaGFyZSBvd25lcnNoaXAgd2l0aCBhbnlvbmUpLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJQy5GUk0uVEhFVi5aU1wiLFwibmFtZVwiOlwiRmlybXMgZXhwZXJpZW5jaW5nIGxvc3NlcyBkdWUgdG8gdGhlZnQgYW5kIHZhbmRhbGlzbSAoJSBvZiBmaXJtcylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlBlcmNlbnQgb2YgZmlybXMgZXhwZXJpZW5jaW5nIGxvc3NlcyBkdWUgdG8gdGhlZnQsIHJvYmJlcnksIHZhbmRhbGlzbSBvciBhcnNvbiB0aGF0IG9jY3VycmVkIG9uIHRoZSBlc3RhYmxpc2htZW50J3MgcHJlbWlzZXMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNHLkxFRy5NUlJQXCIsXCJuYW1lXCI6XCJMZWdpc2xhdGlvbiBleHBsaWNpdGx5IGNyaW1pbmFsaXplcyBtYXJpdGFsIHJhcGUgKDE9eWVzOyAwPW5vKVwiLFxyXG5cInNvdXJjZU5vdGVcIjonTGVnaXNsYXRpb24gZXhwbGljaXRseSBjcmltaW5hbGl6ZXMgbWFyaXRhbCByYXBlIGlzIHdoZXRoZXIgdGhlcmUgaXMgbGVnaXNsYXRpb24gdGhhdCBleHBsaWNpdGx5IGNyaW1pbmFsaXplcyB0aGUgYWN0IG9mIG1hcml0YWwgcmFwZSBieSBwcm92aWRpbmcgdGhhdCByYXBlIG9yIHNleHVhbCBhc3NhdWx0IHByb3Zpc2lvbnMgYXBwbHkgXCJpcnJlc3BlY3RpdmUgb2YgdGhlIG5hdHVyZSBvZiB0aGUgcmVsYXRpb25zaGlwXCIgYmV0d2VlbiB0aGUgcGVycGV0cmF0b3IgYW5kIGNvbXBsYWluYW50IG9yIGJ5IHN0YXRpbmcgdGhhdCBcIm5vIG1hcnJpYWdlIG9yIG90aGVyIHJlbGF0aW9uc2hpcCBzaGFsbCBjb25zdGl0dXRlIGEgZGVmZW5zZSB0byBhIGNoYXJnZSBvZiByYXBlIG9yIHNleHVhbCBhc3NhdWx0IHVuZGVyIHRoZSBsZWdpc2xhdGlvblwiICdcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklULk5FVC5VU0VSLlpTXCIsXCJuYW1lXCI6XCJJbmRpdmlkdWFscyB1c2luZyB0aGUgSW50ZXJuZXQgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkludGVybmV0IHVzZXJzIGFyZSBpbmRpdmlkdWFscyB3aG8gaGF2ZSB1c2VkIHRoZSBJbnRlcm5ldCAoZnJvbSBhbnkgbG9jYXRpb24pIGluIHRoZSBsYXN0IDMgbW9udGhzLiBUaGUgSW50ZXJuZXQgY2FuIGJlIHVzZWQgdmlhIGEgY29tcHV0ZXIsIG1vYmlsZSBwaG9uZSwgcGVyc29uYWwgZGlnaXRhbCBhc3Npc3RhbnQsIGdhbWVzIG1hY2hpbmUsIGRpZ2l0YWwgVFYgZXRjLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJVC5ORVQuVVNFUi5QMlwiLFwibmFtZVwiOlwiSW50ZXJuZXQgdXNlcnMgKHBlciAxMDAgcGVvcGxlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiSW50ZXJuZXQgdXNlcnMgYXJlIGluZGl2aWR1YWxzIHdobyBoYXZlIHVzZWQgdGhlIEludGVybmV0IChmcm9tIGFueSBsb2NhdGlvbikgaW4gdGhlIGxhc3QgMyBtb250aHMuIFRoZSBJbnRlcm5ldCBjYW4gYmUgdXNlZCB2aWEgYSBjb21wdXRlciwgbW9iaWxlIHBob25lLCBwZXJzb25hbCBkaWdpdGFsIGFzc2lzdGFudCwgZ2FtZXMgbWFjaGluZSwgZGlnaXRhbCBUViBldGMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlZDLkhPTS5JVEVOLlA1LkxFXCIsXCJuYW1lXCI6XCJJbnRlbnRpb25hbCBob21pY2lkZSByYXRlIChwZXIgMTAwLDAwMCBwZW9wbGUsIFdITylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0se1xyXG4gIFwiaWRcIjpcIlZDLkJUTC5ERVRIXCIsXCJuYW1lXCI6XCJCYXR0bGUtcmVsYXRlZCBkZWF0aHMgKG51bWJlciBvZiBwZW9wbGUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJCYXR0bGUtcmVsYXRlZCBkZWF0aHMgYXJlIGRlYXRocyBpbiBiYXR0bGUtcmVsYXRlZCBjb25mbGljdHMgYmV0d2VlbiB3YXJyaW5nIHBhcnRpZXMgaW4gdGhlIGNvbmZsaWN0IGR5YWQgKHR3byBjb25mbGljdCB1bml0cyB0aGF0IGFyZSBwYXJ0aWVzIHRvIGEgY29uZmxpY3QpLiBUeXBpY2FsbHksIGJhdHRsZS1yZWxhdGVkIGRlYXRocyBvY2N1ciBpbiB3YXJmYXJlIGludm9sdmluZyB0aGUgYXJtZWQgZm9yY2VzIG9mIHRoZSB3YXJyaW5nIHBhcnRpZXMuIFRoaXMgaW5jbHVkZXMgdHJhZGl0aW9uYWwgYmF0dGxlZmllbGQgZmlnaHRpbmcsIGd1ZXJyaWxsYSBhY3Rpdml0aWVzLCBhbmQgYWxsIGtpbmRzIG9mIGJvbWJhcmRtZW50cyBvZiBtaWxpdGFyeSB1bml0cywgY2l0aWVzLCBhbmQgdmlsbGFnZXMsIGV0Yy4gVGhlIHRhcmdldHMgYXJlIHVzdWFsbHkgdGhlIG1pbGl0YXJ5IGl0c2VsZiBhbmQgaXRzIGluc3RhbGxhdGlvbnMgb3Igc3RhdGUgaW5zdGl0dXRpb25zIGFuZCBzdGF0ZSByZXByZXNlbnRhdGl2ZXMsIGJ1dCB0aGVyZSBpcyBvZnRlbiBzdWJzdGFudGlhbCBjb2xsYXRlcmFsIGRhbWFnZSBpbiB0aGUgZm9ybSBvZiBjaXZpbGlhbnMgYmVpbmcga2lsbGVkIGluIGNyb3NzZmlyZSwgaW4gaW5kaXNjcmltaW5hdGUgYm9tYmluZ3MsIGV0Yy4gQWxsIGRlYXRocy0tbWlsaXRhcnkgYXMgd2VsbCBhcyBjaXZpbGlhbi0taW5jdXJyZWQgaW4gc3VjaCBzaXR1YXRpb25zLCBhcmUgY291bnRlZCBhcyBiYXR0bGUtcmVsYXRlZCBkZWF0aHMuXCJcclxufSxcclxue1xyXG5cImlkXCI6XCJWQS5TVEQuRVJSXCIsXCJuYW1lXCI6XCJWb2ljZSBhbmQgQWNjb3VudGFiaWxpdHk6IFN0YW5kYXJkIEVycm9yXCIsXHJcblwic291cmNlTm90ZVwiOlwiVm9pY2UgYW5kIEFjY291bnRhYmlsaXR5IGNhcHR1cmVzIHBlcmNlcHRpb25zIG9mIHRoZSBleHRlbnQgdG8gd2hpY2ggYSBjb3VudHJ5J3MgY2l0aXplbnMgYXJlIGFibGUgdG8gcGFydGljaXBhdGUgaW4gc2VsZWN0aW5nIHRoZWlyIGdvdmVybm1lbnQsIGFzIHdlbGwgYXMgZnJlZWRvbSBvZiBleHByZXNzaW9uLCBmcmVlZG9tIG9mIGFzc29jaWF0aW9uLCBhbmQgYSBmcmVlIG1lZGlhLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCI1LjUxLjAxLjA3LmdlbmRlclwiLFwibmFtZVwiOlwiR2VuZGVyIGVxdWFsaXR5XCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgaW5kaWNhdG9yIGlzIGRlZmluZWQgYXMgdGhlIHJhdGlvIG9mIHRoZSBncm9zcyBlbnJvbGxtZW50IHJhdGUgb2YgZ2lybHMgdG8gYm95cyBpbiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgZWR1Y2F0aW9uIGxldmVscyBpbiBib3RoIHB1YmxpYyBhbmQgcHJpdmF0ZSBzY2hvb2xzLiBXb21lbiBoYXZlIGFuIGVub3Jtb3VzIGltcGFjdCBvbiB0aGUgd2VsbC1iZWluZyBvZiB0aGVpciBmYW1pbGllcyBhbmQgc29jaWV0aWVzLCBidXQgdGhlaXIgcG90ZW50aWFsIGlzIHNvbWV0aW1lcyBub3QgcmVhbGl6ZWQgYmVjYXVzZSBvZiBkaXNjcmltaW5hdG9yeSBzb2NpYWwgbm9ybXMsIGluY2VudGl2ZXMsIGFuZCBsZWdhbCBpbnN0aXR1dGlvbnMuIEFsdGhvdWdoIHRoZWlyIHN0YXR1cyBoYXMgaW1wcm92ZWQgaW4gcmVjZW50IGRlY2FkZXMsIGdlbmRlciBpbmVxdWFsaXRpZXMgcGVyc2lzdC4gRWR1Y2F0aW9uIGlzIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgYXNwZWN0cyBvZiBodW1hbiBkZXZlbG9wbWVudCwgYW5kIGVsaW1pbmF0aW5nIGdlbmRlciBkaXNwYXJpdHkgYXQgYWxsIGxldmVscyBvZiBlZHVjYXRpb24gd291bGQgaGVscCB0byBpbmNyZWFzZSB0aGUgc3RhdHVzIGFuZCBjYXBhYmlsaXRpZXMgb2Ygd29tZW4uIFRoaXMgaW5kaWNhdG9yIHByb3ZpZGVzIGEgbWVhc3VyZSBvZiBlcXVhbGl0eSBvZiBlZHVjYXRpb25hbCBvcHBvcnR1bml0eSBhbmQgcmVsYXRlcyB0byB0aGUgdGhpcmQgTURHIHRoYXQgc2Vla3MgdG8gcHJvbW90ZSBnZW5kZXIgZXF1YWxpdHkgYW5kIHRoZSBlbXBvd2VybWVudCBvZiB3b21lbi5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiVkMuSUhSLk5QT0wuUDVcIixcIm5hbWVcIjpcIkludGVudGlvbmFsIGhvbWljaWRlcywgZ292ZXJubWVudCBwb2xpY2Ugc291cmNlcyAocGVyIDEwMCwwMDAgcGVvcGxlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIk5FLkNPTi5QUlZULlpTXCIsXCJuYW1lXCI6XCJIb3VzZWhvbGRzIGFuZCBOUElTSHMgZmluYWwgY29uc3VtcHRpb24gZXhwZW5kaXR1cmUgKCUgb2YgR0RQKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiSG91c2Vob2xkIGZpbmFsIGNvbnN1bXB0aW9uIGV4cGVuZGl0dXJlIChmb3JtZXJseSBwcml2YXRlIGNvbnN1bXB0aW9uKSBpcyB0aGUgbWFya2V0IHZhbHVlIG9mIGFsbCBnb29kcyBhbmQgc2VydmljZXMsIGluY2x1ZGluZyBkdXJhYmxlIHByb2R1Y3RzIChzdWNoIGFzIGNhcnMsIHdhc2hpbmcgbWFjaGluZXMsIGFuZCBob21lIGNvbXB1dGVycyksIHB1cmNoYXNlZCBieSBob3VzZWhvbGRzLiBJdCBleGNsdWRlcyBwdXJjaGFzZXMgb2YgZHdlbGxpbmdzIGJ1dCBpbmNsdWRlcyBpbXB1dGVkIHJlbnQgZm9yIG93bmVyLW9jY3VwaWVkIGR3ZWxsaW5ncy4gSXQgYWxzbyBpbmNsdWRlcyBwYXltZW50cyBhbmQgZmVlcyB0byBnb3Zlcm5tZW50cyB0byBvYnRhaW4gcGVybWl0cyBhbmQgbGljZW5zZXMuIEhlcmUsIGhvdXNlaG9sZCBjb25zdW1wdGlvbiBleHBlbmRpdHVyZSBpbmNsdWRlcyB0aGUgZXhwZW5kaXR1cmVzIG9mIG5vbnByb2ZpdCBpbnN0aXR1dGlvbnMgc2VydmluZyBob3VzZWhvbGRzLCBldmVuIHdoZW4gcmVwb3J0ZWQgc2VwYXJhdGVseSBieSB0aGUgY291bnRyeS4gVGhpcyBpdGVtIGFsc28gaW5jbHVkZXMgYW55IHN0YXRpc3RpY2FsIGRpc2NyZXBhbmN5IGluIHRoZSB1c2Ugb2YgcmVzb3VyY2VzIHJlbGF0aXZlIHRvIHRoZSBzdXBwbHkgb2YgcmVzb3VyY2VzLlwiLFwic291cmNlT3JnYW5pemF0aW9uXCI6XCJXb3JsZCBCYW5rIG5hdGlvbmFsIGFjY291bnRzIGRhdGEsIGFuZCBPRUNEIE5hdGlvbmFsIEFjY291bnRzIGRhdGEgZmlsZXMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklTLlZFSC5QQ0FSLlAzXCIsXCJuYW1lXCI6XCJQYXNzZW5nZXIgY2FycyAocGVyIDEsMDAwIHBlb3BsZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlBhc3NlbmdlciBjYXJzIHJlZmVyIHRvIHJvYWQgbW90b3IgdmVoaWNsZXMsIG90aGVyIHRoYW4gdHdvLXdoZWVsZXJzLCBpbnRlbmRlZCBmb3IgdGhlIGNhcnJpYWdlIG9mIHBhc3NlbmdlcnMgYW5kIGRlc2lnbmVkIHRvIHNlYXQgbm8gbW9yZSB0aGFuIG5pbmUgcGVvcGxlIChpbmNsdWRpbmcgdGhlIGRyaXZlcikuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILlNUQS5BQ1NOLlVSXCIsXCJuYW1lXCI6XCJJbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMsIHVyYmFuICglIG9mIHVyYmFuIHBvcHVsYXRpb24gd2l0aCBhY2Nlc3MpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJBY2Nlc3MgdG8gaW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzLCB1cmJhbiwgcmVmZXJzIHRvIHRoZSBwZXJjZW50YWdlIG9mIHRoZSB1cmJhbiBwb3B1bGF0aW9uIHVzaW5nIGltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcy4gSW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzIGFyZSBsaWtlbHkgdG8gZW5zdXJlIGh5Z2llbmljIHNlcGFyYXRpb24gb2YgaHVtYW4gZXhjcmV0YSBmcm9tIGh1bWFuIGNvbnRhY3QuIFRoZXkgaW5jbHVkZSBmbHVzaFxcL3BvdXIgZmx1c2ggKHRvIHBpcGVkIHNld2VyIHN5c3RlbSwgc2VwdGljIHRhbmssIHBpdCBsYXRyaW5lKSwgdmVudGlsYXRlZCBpbXByb3ZlZCBwaXQgKFZJUCkgbGF0cmluZSwgcGl0IGxhdHJpbmUgd2l0aCBzbGFiLCBhbmQgY29tcG9zdGluZyB0b2lsZXQuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIklDLkZSTS5PQlMuT0JTVDRcIixcIm5hbWVcIjpcIlBlcmNlbnQgb2YgZmlybXMgY2hvb3NpbmcgY29ycnVwdGlvbiBhcyB0aGVpciBiaWdnZXN0IG9ic3RhY2xlXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQZXJjZW50IG9mIGZpcm1zIHRoYXQgY2hvc2UgY29ycnVwdGlvbiBhcyB0aGUgYmlnZ2VzdCBvYnN0YWNsZSBmYWNlZCBieSB0aGlzIGVzdGFibGlzaG1lbnQuICAoU3VydmV5IHJlc3BvbmRlbnRzIHdlcmUgcHJlc2VudGVkIHdpdGggYSBsaXN0IG9mIDE1IHBvdGVudGlhbCBvYnN0YWNsZXMuKSAgIFNvdXJjZTpXb3JsZCBCYW5rLCBFbnRlcnByaXNlIFN1cnZleXMgUHJvamVjdChodHRwOlxcL1xcL3d3dy5lbnRlcnByaXNlc3VydmV5cy5vcmdcXC9DdXN0b21RdWVyeSkuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIkdWLlRJLlNDT1IuSURYXCIsXCJuYW1lXCI6XCJDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IChzY29yZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoaXMgaW5mb3JtYXRpb24gaXMgZnJvbSB0aGUgaHR0cDpcXC9cXC93d3cudHJhbnNwYXJlbmN5Lm9yZyBUcmFuc3BhcmVuY3kgSW50ZXJuYXRpb25hbCB3ZWIgc2l0ZS4gIE1vcmUgaW5mb3JtYXRpb24gbWF5IGJlIGF2YWlsYWJsZSB0aGVyZS4gIENQSSBTY29yZSByZWxhdGVzIHRvIHBlcmNlcHRpb25zIG9mIHRoZSBkZWdyZWUgb2YgY29ycnVwdGlvbiBhcyBzZWVuIGJ5IGJ1c2luZXNzIHBlb3BsZSBhbmQgY291bnRyeSBhbmFseXN0cywgYW5kIHJhbmdlcyBiZXR3ZWVuIDAgKGhpZ2hseSBjb3JydXB0KSBhbmQgMTAgKGhpZ2hseSBjbGVhbikuICBEYXRhIGZvciAyMDEyIENvcnJ1cHRpb24gUGVyY2VwdGlvbnMgSW5kZXggc2NvcmVzIGNvdW50cmllcyBvbiBhIHNjYWxlIGZyb20gMCAoaGlnaGx5IGNvcnJ1cHQpIHRvIDEwMCAodmVyeSBjbGVhbikuICBDb25maWRlbmNlIHJhbmdlIHByb3ZpZGVzIGEgcmFuZ2Ugb2YgcG9zc2libGUgdmFsdWVzIG9mIHRoZSBDUEkgc2NvcmUuIFRoaXMgcmVmbGVjdHMgaG93IGEgY291bnRyeSdzIHNjb3JlIG1heSB2YXJ5LCBkZXBlbmRpbmcgb24gbWVhc3VyZW1lbnQgcHJlY2lzaW9uLiBOb21pbmFsbHksIHdpdGggNSBwZXJjZW50IHByb2JhYmlsaXR5IHRoZSBzY29yZSBpcyBhYm92ZSB0aGlzIHJhbmdlIGFuZCB3aXRoIGFub3RoZXIgNSBwZXJjZW50IGl0IGlzIGJlbG93LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJQy5GUk0uQ09SUi5HUkFGVDJcIixcIm5hbWVcIjpcIkJyaWJlcnkgaW5kZXggKCUgb2YgZ2lmdCBvciBpbmZvcm1hbCBwYXltZW50IHJlcXVlc3RzIGR1cmluZyBwdWJsaWMgdHJhbnNhY3Rpb25zKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiQnJpYmVyeSBpbmRleCBpcyB0aGUgcGVyY2VudGFnZSBvZiBnaWZ0IG9yIGluZm9ybWFsIHBheW1lbnQgcmVxdWVzdHMgZHVyaW5nIDYgaW5mcmFzdHJ1Y3R1cmUsIHBlcm1pdHMgYW5kIGxpY2VuY2VzLCBhbmQgdGF4IHRyYW5zYWN0aW9ucy4gICBTb3VyY2U6V29ybGQgQmFuaywgRW50ZXJwcmlzZSBTdXJ2ZXlzIFByb2plY3QoaHR0cDpcXC9cXC93d3cuZW50ZXJwcmlzZXN1cnZleXMub3JnXFwvRGF0YVxcL0V4cGxvcmVUb3BpY3NcXC9jb3JydXB0aW9uKS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSE9VLkVMQy5BQ1NOLlpTXCIsXCJuYW1lXCI6XCJIb3VzZWhvbGQgQWNjZXNzIHRvIEVsZWN0cmljaXR5OiBUb3RhbCAoaW4gJSBvZiB0b3RhbCBob3VzZWhvbGQpXCIsXHJcblwic291cmNlTm90ZVwiOlwiXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIkZYLk9XTi5UT1RMLlpTXCIsXCJuYW1lXCI6XCJBY2NvdW50IG93bmVyc2hpcCBhdCBhIGZpbmFuY2lhbCBpbnN0aXR1dGlvbiBvciB3aXRoIGEgbW9iaWxlLW1vbmV5LXNlcnZpY2UgcHJvdmlkZXIgKCUgb2YgcG9wdWxhdGlvbiBhZ2VzIDE1KylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkFjY291bnQgZGVub3RlcyB0aGUgcGVyY2VudGFnZSBvZiByZXNwb25kZW50cyB3aG8gcmVwb3J0IGhhdmluZyBhbiBhY2NvdW50IChieSB0aGVtc2VsdmVzIG9yIHRvZ2V0aGVyIHdpdGggc29tZW9uZSBlbHNlKSBhdCBhIGJhbmsgb3IgYW5vdGhlciB0eXBlIG9mIGZpbmFuY2lhbCBpbnN0aXR1dGlvbiBvciByZXBvcnQgcGVyc29uYWxseSB1c2luZyBhIG1vYmlsZSBtb25leSBzZXJ2aWNlIGluIHRoZSBwYXN0IDEyIG1vbnRocyAoJSBhZ2UgMTUrKS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guU1RBLkFDQ0guWlNcIixcIm5hbWVcIjpcIkhlYWx0aCBjYXJlICglIG9mIHBvcHVsYXRpb24gd2l0aCBhY2Nlc3MpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guU1RBLkJBU1MuWlNcIixcIm5hbWVcIjpcIlBlb3BsZSB1c2luZyBhdCBsZWFzdCBiYXNpYyBzYW5pdGF0aW9uIHNlcnZpY2VzICglIG9mIHBvcHVsYXRpb24pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwZW9wbGUgdXNpbmcgYXQgbGVhc3QgYmFzaWMgc2FuaXRhdGlvbiBzZXJ2aWNlcywgdGhhdCBpcywgaW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzIHRoYXQgYXJlIG5vdCBzaGFyZWQgd2l0aCBvdGhlciBob3VzZWhvbGRzLiAgVGhpcyBpbmRpY2F0b3IgZW5jb21wYXNzZXMgYm90aCBwZW9wbGUgdXNpbmcgYmFzaWMgc2FuaXRhdGlvbiBzZXJ2aWNlcyBhcyB3ZWxsIGFzIHRob3NlIHVzaW5nIHNhZmVseSBtYW5hZ2VkIHNhbml0YXRpb24gc2VydmljZXMuICAgSW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzIGluY2x1ZGUgZmx1c2hcXC9wb3VyIGZsdXNoIHRvIHBpcGVkIHNld2VyIHN5c3RlbXMsIHNlcHRpYyB0YW5rcyBvciBwaXQgbGF0cmluZXM7IHZlbnRpbGF0ZWQgaW1wcm92ZWQgcGl0IGxhdHJpbmVzLCBjb21wb3NpdGluZyB0b2lsZXRzIG9yIHBpdCBsYXRyaW5lcyB3aXRoIHNsYWJzLlwiXHJcbn0sXHJcbntcclxuXCJpZFwiOlwiU0kuUE9WLjI1REFZXCIsXCJuYW1lXCI6XCJQb3ZlcnR5IGhlYWRjb3VudCByYXRpbyBhdCAkMi41IGEgZGF5IChQUFApICglIG9mIHBvcHVsYXRpb24pXCIsXHJcblwic291cmNlTm90ZVwiOlwiUG9wdWxhdGlvbiBiZWxvdyAkMi41IGEgZGF5IGlzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBwb3B1bGF0aW9uIGxpdmluZyBvbiBsZXNzIHRoYW4gJDIuNSBhIGRheSBhdCAyMDA1IGludGVybmF0aW9uYWwgcHJpY2VzLiBcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0kuUE9WLk5BUFIuWlNcIixcIm5hbWVcIjpcIlBvdmVydHkgUmF0ZSAoaW4gJSBvZiBwb3B1bGF0aW9uKVwiLFwic291cmNlTm90ZVwiOlwiXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNJLlBPVi5OQUhDXCIsXCJuYW1lXCI6XCJQb3ZlcnR5IGhlYWRjb3VudCByYXRpbyBhdCBuYXRpb25hbCBwb3ZlcnR5IGxpbmVzICglIG9mIHBvcHVsYXRpb24pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJOYXRpb25hbCBwb3ZlcnR5IGhlYWRjb3VudCByYXRpbyBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgcG9wdWxhdGlvbiBsaXZpbmcgYmVsb3cgdGhlIG5hdGlvbmFsIHBvdmVydHkgbGluZXMuIE5hdGlvbmFsIGVzdGltYXRlcyBhcmUgYmFzZWQgb24gcG9wdWxhdGlvbi13ZWlnaHRlZCBzdWJncm91cCBlc3RpbWF0ZXMgZnJvbSBob3VzZWhvbGQgc3VydmV5cy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guQURNLklOUFRcIixcIm5hbWVcIjpcIklucGF0aWVudCBhZG1pc3Npb24gcmF0ZSAoJSBvZiBwb3B1bGF0aW9uIClcIixcInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5EWU4uQUlEUy5aU1wiLFwibmFtZVwiOlwiUHJldmFsZW5jZSBvZiBISVYsIHRvdGFsICglIG9mIHBvcHVsYXRpb24gYWdlcyAxNS00OSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlByZXZhbGVuY2Ugb2YgSElWIHJlZmVycyB0byB0aGUgcGVyY2VudGFnZSBvZiBwZW9wbGUgYWdlcyAxNS00OSB3aG8gYXJlIGluZmVjdGVkIHdpdGggSElWLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTTS5QT1AuVE9UTC5aU1wiLFwibmFtZVwiOlwiSW50ZXJuYXRpb25hbCBtaWdyYW50IHN0b2NrICglIG9mIHBvcHVsYXRpb24pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6YEludGVybmF0aW9uYWwgbWlncmFudCBzdG9jayBpcyB0aGUgbnVtYmVyIG9mIHBlb3BsZSBib3JuIGluIGEgY291bnRyeSBvdGhlciB0aGFuIHRoYXQgaW4gd2hpY2ggdGhleSBsaXZlLiBJdCBhbHNvIGluY2x1ZGVzIHJlZnVnZWVzLiBUaGUgZGF0YSB1c2VkIHRvIGVzdGltYXRlIHRoZSBpbnRlcm5hdGlvbmFsIG1pZ3JhbnQgc3RvY2sgYXQgYSBwYXJ0aWN1bGFyIHRpbWUgYXJlIG9idGFpbmVkIG1haW5seSBmcm9tIHBvcHVsYXRpb24gY2Vuc3VzZXMuIFRoZSBlc3RpbWF0ZXMgYXJlIGRlcml2ZWQgZnJvbSB0aGUgZGF0YSBvbiBmb3JlaWduLWJvcm4gcG9wdWxhdGlvbi0tcGVvcGxlIHdobyBoYXZlIHJlc2lkZW5jZSBpbiBvbmUgY291bnRyeSBidXQgd2VyZSBib3JuIGluIGFub3RoZXIgY291bnRyeS4gV2hlbiBkYXRhIG9uIHRoZSBmb3JlaWduLWJvcm4gcG9wdWxhdGlvbiBhcmUgbm90IGF2YWlsYWJsZSwgZGF0YSBvbiBmb3JlaWduIHBvcHVsYXRpb24tLXRoYXQgaXMsIHBlb3BsZSB3aG8gYXJlIGNpdGl6ZW5zIG9mIGEgY291bnRyeSBvdGhlciB0aGFuIHRoZSBjb3VudHJ5IGluIHdoaWNoIHRoZXkgcmVzaWRlLS1hcmUgdXNlZCBhcyBlc3RpbWF0ZXMuIEFmdGVyIHRoZSBicmVha3VwIG9mIHRoZSBTb3ZpZXQgVW5pb24gaW4gMTk5MSBwZW9wbGUgbGl2aW5nIGluIG9uZSBvZiB0aGUgbmV3bHkgaW5kZXBlbmRlbnQgY291bnRyaWVzIHdobyB3ZXJlIGJvcm4gaW4gYW5vdGhlciB3ZXJlIGNsYXNzaWZpZWQgYXMgaW50ZXJuYXRpb25hbCBtaWdyYW50cy4gRXN0aW1hdGVzIG9mIG1pZ3JhbnQgc3RvY2sgaW4gdGhlIG5ld2x5IGluZGVwZW5kZW50IHN0YXRlcyBmcm9tIDE5OTAgb24gYXJlIGJhc2VkIG9uIHRoZSAxOTg5IGNlbnN1cyBvZiB0aGUgU292aWV0IFVuaW9uLiBGb3IgY291bnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb24gdGhlIGludGVybmF0aW9uYWwgbWlncmFudCBzdG9jayBmb3IgYXQgbGVhc3QgdHdvIHBvaW50cyBpbiB0aW1lLCBpbnRlcnBvbGF0aW9uIG9yIGV4dHJhcG9sYXRpb24gd2FzIHVzZWQgdG8gZXN0aW1hdGUgdGhlIGludGVybmF0aW9uYWwgbWlncmFudCBzdG9jayBvbiBKdWx5IDEgb2YgdGhlIHJlZmVyZW5jZSB5ZWFycy4gRm9yIGNvdW50cmllcyB3aXRoIG9ubHkgb25lIG9ic2VydmF0aW9uLCBlc3RpbWF0ZXMgZm9yIHRoZSByZWZlcmVuY2UgeWVhcnMgd2VyZSBkZXJpdmVkIHVzaW5nIHJhdGVzIG9mIGNoYW5nZSBpbiB0aGUgbWlncmFudCBzdG9jayBpbiB0aGUgeWVhcnMgcHJlY2VkaW5nIG9yIGZvbGxvd2luZyB0aGUgc2luZ2xlIG9ic2VydmF0aW9uIGF2YWlsYWJsZS4gQSBtb2RlbCB3YXMgdXNlZCB0byBlc3RpbWF0ZSBtaWdyYW50cyBmb3IgY291bnRyaWVzIHRoYXQgaGFkIG5vIGRhdGEuYFxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU04uSVRLLkRFRkMuWlNcIixcIm5hbWVcIjpcIlByZXZhbGVuY2Ugb2YgdW5kZXJub3VyaXNobWVudCAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUG9wdWxhdGlvbiBiZWxvdyBtaW5pbXVtIGxldmVsIG9mIGRpZXRhcnkgZW5lcmd5IGNvbnN1bXB0aW9uIChhbHNvIHJlZmVycmVkIHRvIGFzIHByZXZhbGVuY2Ugb2YgdW5kZXJub3VyaXNobWVudCkgc2hvd3MgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHBvcHVsYXRpb24gd2hvc2UgZm9vZCBpbnRha2UgaXMgaW5zdWZmaWNpZW50IHRvIG1lZXQgZGlldGFyeSBlbmVyZ3kgcmVxdWlyZW1lbnRzIGNvbnRpbnVvdXNseS4gRGF0YSBzaG93aW5nIGFzIDUgbWF5IHNpZ25pZnkgYSBwcmV2YWxlbmNlIG9mIHVuZGVybm91cmlzaG1lbnQgYmVsb3cgNSUuXCIsXCJzb3VyY2VPcmdhbml6YXRpb25cIjpcIkZvb2QgYW5kIEFncmljdWx0dXJlIE9yZ2FuaXphdGlvbiAoaHR0cDpcXC9cXC93d3cuZmFvLm9yZ1xcL3B1YmxpY2F0aW9uc1xcL2VuXFwvKS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guU1RBLk9ERkMuWlNcIixcIm5hbWVcIjpcIlBlb3BsZSBwcmFjdGljaW5nIG9wZW4gZGVmZWNhdGlvbiAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlBlb3BsZSBwcmFjdGljaW5nIG9wZW4gZGVmZWNhdGlvbiByZWZlcnMgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHBvcHVsYXRpb24gZGVmZWNhdGluZyBpbiB0aGUgb3Blbiwgc3VjaCBhcyBpbiBmaWVsZHMsIGZvcmVzdCwgYnVzaGVzLCBvcGVuIGJvZGllcyBvZiB3YXRlciwgb24gYmVhY2hlcywgaW4gb3RoZXIgb3BlbiBzcGFjZXMgb3IgZGlzcG9zZWQgb2Ygd2l0aCBzb2xpZCB3YXN0ZS5cIlxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbl1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iXX0=
