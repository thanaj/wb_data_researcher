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

getDataBtn.addEventListener('click', getData);
selectIndicator.addEventListener('change', getIndicatorDescription);

function getIndicatorDescription() {
  descriptionField.innerHTML = event.target.options[this.selectedIndex].getAttribute('data-target-sourcenote');
}

function getData() {
  var url = 'http://api.worldbank.org/v2/countries/' + select.value + '/indicators/' + selectIndicator.value + '?format=json';
  var queryName = select.value + '_' + selectIndicator.value;
  var country = select.options[select.selectedIndex].getAttribute('data-target-country');

  var promis = _readData2.default.readData(queryName);
  promis.then(function (data) {
    if (!data) {
      var promise = (0, _helper2.default)(url);
      promise.then(function (data) {
        //console.log(data)
        data = JSON.parse(data);
        _drawChart2.default.drawChartForGCharts(data, country);
        var dataToSave = { query: queryName, data: data };
        _addDataDB2.default.addData(dataToSave);
      }).catch(function (error) {
        console.log('Error with getting data from wb api', error);
      });
    } else {
      _drawChart2.default.drawChartForGCharts(data.data, country);
    }
  }).catch(function (error) {
    console.log('error reading data', error);
  });
}

function getDataFromWeb() {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2VzNi9hZGREYXRhREIuanMiLCJzY3JpcHRzL2VzNi9hcHAuanMiLCJzY3JpcHRzL2VzNi9idWlsZFRhYmxlLmpzIiwic2NyaXB0cy9lczYvY2FudmFzLmpzIiwic2NyaXB0cy9lczYvZHJhd0NoYXJ0LmpzIiwic2NyaXB0cy9lczYvZ2V0Q291bnRyaWVzLmpzIiwic2NyaXB0cy9lczYvaGVscGVyLmpzIiwic2NyaXB0cy9lczYvcmVhZERhdGEuanMiLCJzY3JpcHRzL2VzNi92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE1BQU0sRUFBVjs7QUFFQSxTQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWlDLFNBQWpDLEVBQTJDLFNBQTNDLEVBQXNEO0FBQ3BELE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1BQUksY0FBYyxHQUFHLGlCQUFILENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLENBQWxCO0FBQ0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixFQUEzQixFQUE4QixTQUE5QixFQUF3QztBQUN0QyxNQUFJLGNBQWMsR0FBRyxXQUFILENBQWUsQ0FBQyxTQUFELENBQWYsRUFBNEIsV0FBNUIsQ0FBbEI7QUFDQSxjQUFZLFVBQVosR0FBeUIsVUFBUyxLQUFULEVBQWdCO0FBQ3ZDO0FBQ0QsR0FGRDtBQUdBLGNBQVksT0FBWixHQUFzQixVQUFTLEtBQVQsRUFBZ0I7QUFDcEMsWUFBUSxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7QUFDRCxHQUZEO0FBR0EsU0FBTyxXQUFQO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQXlCLFdBQXpCLEVBQXFDLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1B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QSxnQkFBYTtBQUZiLENBaFJpQixFQW9SakI7QUFDRSxRQUFLLGdCQURQLEVBQ3dCLFFBQU8sbUNBRC9CLEVBQ21FLGNBQWE7QUFEaEYsQ0FwUmlCLEVBdVJqQjtBQUNFLFFBQUssYUFEUCxFQUNxQixRQUFPLHFFQUQ1QjtBQUVFLGdCQUFhO0FBRmYsQ0F2UmlCLEVBMlJqQjtBQUNFLFFBQUssYUFEUCxFQUNxQixRQUFPLDZDQUQ1QixFQUMwRSxjQUFhO0FBRHZGLENBM1JpQixFQThSakI7QUFDRSxRQUFLLGdCQURQLEVBQ3dCLFFBQU8sdURBRC9CO0FBRUUsZ0JBQWE7QUFGZixDQTlSaUIsRUFrU2pCO0FBQ0UsUUFBSyxnQkFEUCxFQUN3QixRQUFPLCtDQUQvQjtBQUVFO0FBRkYsQ0FsU2lCLEVBc1NqQjtBQUNFLFFBQUssZ0JBRFAsRUFDd0IsUUFBTyxrREFEL0I7QUFFRSxnQkFBYSx1VEFGZixFQUV1VSxzQkFBcUI7QUFGNVYsQ0F0U2lCLEVBMFNqQjtBQUNFLFFBQUssZ0JBRFAsRUFDd0IsUUFBTyxxREFEL0I7QUFFQSxnQkFBYTtBQUZiLENBMVNpQixDQUFqQjs7a0JBd1RlLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldCB9IGZyb20gJy4vaGVscGVyLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyB2YXJpYWJsZXMgfSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFN0b3JlKGV2ZW50LHN0b3JlTmFtZSxjb25maWdPYmopIHtcclxuICBsZXQgZGIgPSBldmVudC50YXJnZXQucmVzdWx0XHJcbiAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lLCBjb25maWdPYmopO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2FjdGlvbihkYixzdG9yZU5hbWUpe1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFtzdG9yZU5hbWVdLCBcInJlYWR3cml0ZVwiKTtcclxuICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coJ29uY29tcGxldGUgdHJhbnNjdGlvbicsIGV2ZW50KTtcclxuICB9O1xyXG4gIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uZXJyb3IgdHJhbnNjdGlvbicsIGV2ZW50KVxyXG4gIH07XHJcbiAgcmV0dXJuIHRyYW5zYWN0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZWNvcmQoZXZlbnQsZGF0YVRvQmVBZGQscHJvbWlzZUZuICl7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYix2YXJpYWJsZXMuSU5EX0RCX1NUT1JFX05BTUUpO1xyXG4gIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcblxyXG4gIC8vbGV0IHF1ZXJ5ID0gb2JqZWN0U3RvcmUuZ2V0KGxvb2tlZFZhbHVlKVxyXG4gIGxldCByZXN1bHQ7XHJcblxyXG4gIGxldCBvYmplY3RTdG9yZTEgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh2YXJpYWJsZXMuSU5EX0RCX1NUT1JFX05BTUUpO1xyXG4gIGxldCBhZGRSZXF1ZXN0ID0gb2JqZWN0U3RvcmUxLmFkZChkYXRhVG9CZUFkZCk7XHJcbiAgYWRkUmVxdWVzdC5vbmNvbXBsZXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coJ2FkZFJlcXVlc3QgY29tcGxldGUnLCBldmVudClcclxuICAgIHByb21pc2VGbi5yZXNvbHZlKGV2ZW50KVxyXG4gIH07XHJcbiAgYWRkUmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdhZGRSZXF1ZXN0IGVycm9yJywgZXZlbnQpXHJcbiAgICBjb25zb2xlLmxvZygnYWRkUmVxdWVzdCBvbmVycm9yJyxldmVudC50YXJnZXQuZXJyb3IpXHJcbiAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gIH07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiByZXF1ZXN0T3BlbkRiKHByb21pc2VGbil7XHJcbiAgbGV0IGluZGV4ZWREYiA9IHdpbmRvdy5pbmRleGVkREI7XHJcbiAgbGV0IHJlcXVlc3Q7XHJcbiAgaWYoaW5kZXhlZERiKXtcclxuICAgIGxldCByZXF1ZXN0ID0gaW5kZXhlZERiLm9wZW4odmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQsc3RvcmVOYW1lLGNvbmZpZ09iailcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGJsb2NrZWQnLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBvbmVycm9yJywgZXZlbnQpXHJcbiAgICAgIHByb21pc2VGbi5yZWplY3QoZXZlbnQpXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0XHJcbiAgfVxyXG4gIHJldHVybiByZXF1ZXN0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkRGF0YShkYXRhVG9CZUFkZCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICBsZXQgcHJvbWlzZU9iaiA9IHtyZXNvbHZlLHJlamVjdH07XHJcblxyXG4gICAgbGV0IHJlcXVlc3QgPSByZXF1ZXN0T3BlbkRiKHByb21pc2VPYmopXHJcbiAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3JlcXVlc3Qgb25zdWNjZXNzJywgZXZlbnQpXHJcbiAgICAgIHJldHVybiBhZGRSZWNvcmQoZXZlbnQsZGF0YVRvQmVBZGQsIHByb21pc2VPYmopXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgfSlcclxuXHJcbn07XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGFkZERhdGFcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQge2RlZmF1bHQgYXMgZ2V0fSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YXJpYWJsZXN9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGdldENvdW50cmllc30gZnJvbSAnLi9nZXRDb3VudHJpZXMuanMnO1xyXG5cclxuZ2V0Q291bnRyaWVzLmluaXQoKVxyXG5cclxuXHJcbi8qXHJcbnNwcmF3ZMW6IGN6eSBqZXN0IGJhemFcclxuc3ByYXdkxbwgY3p5IGxpc3RhIHBhxYRzdHcgamVzdCBuYSBiYXppZVxyXG5qZcWbbGkgamVzdCB0byBqxIUgcG9iaWVyelxyXG5qZcWbbGkgbmllIG1hIHRvIHBvYmllcnogeiBuZXR1XHJcbmkgemFwaXN6IGphIG5hIGJhemllXHJcblxyXG5cclxuXHJcblxyXG5cclxuKi9cclxuIiwiaW1wb3J0IHsgIGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5sZXQgb2JqID0ge31cclxubGV0IGdkcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkdEUF9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxuZnVuY3Rpb24gYnVpbGRUYWJsZShkYXRhKSB7XHJcbiAgaWYgKGdkcENvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgIGdkcENvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xyXG4gIH1cclxuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUQUJMRScpXHJcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJylcclxuICBsZXQgeWVhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJylcclxuICB5ZWFyLmlubmVySFRNTCA9ICd5ZWFyJ1xyXG4gIGxldCB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJylcclxuICB2YWx1ZS5pbm5lckhUTUwgPSAndmFsdWUnXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHllYXIpXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHZhbHVlKVxyXG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XHJcbiAgZGF0YSA9IGRhdGFbMV1cclxuICAvL2NvbnNvbGUubG9nKCdkYW5lJyArIGRhdGEpXHJcbiAgaWYoZGF0YSl7XHJcbiAgICBsZXQgeWVhckRhdGE7XHJcbiAgICBsZXQgdmFsdWVEYXRhO1xyXG4gICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBsZXQgZGF0YVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJylcclxuICAgICAgeWVhckRhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpXHJcbiAgICAgIHZhbHVlRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJylcclxuICAgICAgLy9jb25zb2xlLmxvZygnZGFuZScsaXRlbS5jb3VudHJ5LmRhdGUsIGl0ZW0uY291bnRyeS52YWx1ZSlcclxuXHJcbiAgICAgIHllYXJEYXRhLmlubmVySFRNTCA9IGl0ZW0uZGF0ZVxyXG4gICAgICB5ZWFyRGF0YS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3llYXInKVxyXG4gICAgICBkYXRhUm93LmFwcGVuZENoaWxkKHllYXJEYXRhKVxyXG4gICAgICB2YWx1ZURhdGEuaW5uZXJIVE1MID0gTnVtYmVyKGl0ZW0udmFsdWUpLnRvRml4ZWQoMilcclxuICAgICAgZGF0YVJvdy5hcHBlbmRDaGlsZCh2YWx1ZURhdGEpXHJcbiAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRhdGFSb3cpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGl0ZW0uZGF0ZSlcclxuICAgIH0pXHJcblxyXG4gICAgZ2RwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbm9iaiA9IHtcclxuICBidWlsZFRhYmxlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiaW1wb3J0IHsgIGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxudmFyaWFibGVzLlZJU1VBTElaQVRJT05fU0VMRUNUT1JcclxubGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLlZJU1VBTElaQVRJT05fU0VMRUNUT1IpXHJcblxyXG5mdW5jdGlvbiB2aXN1YWxpemVEYXRhKGRhdGEpIHtcclxuICBkYXRhID0gZGF0YVsxXVxyXG4gIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgaWYoZGF0YSl7XHJcbiAgICBsZXQgbWluWWVhciA9IE1hdGgubWluKCAuLi5kYXRhLm1hcChpdGVtPT4gaXRlbS5kYXRlKSlcclxuICAgIGxldCBtYXhZZWFyID1NYXRoLm1heCggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0uZGF0ZSkpXHJcbiAgICBsZXQgbWluVmFsID0gTWF0aC5taW4oIC4uLmRhdGEubWFwKGl0ZW09PiBpdGVtLnZhbHVlKSlcclxuICAgIGxldCBtYXhWYWwgPSBNYXRoLm1heCggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0udmFsdWUpKVxyXG4gICAgbGV0IHllYXJVbml0ID0gNDAwLyhtYXhZZWFyLW1pblllYXIpXHJcbiAgICBsZXQgdmFsdWVVbml0ID0gMjAwLyhtYXhWYWwtbWluVmFsKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCd5ZWFyVW5pdCx2YWx1ZVVuaXQnK21pblllYXIsbWF4WWVhcix5ZWFyVW5pdCx2YWx1ZVVuaXQpXHJcblxyXG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGU9XCJyZWRcIjtcclxuICAgIGN0eC5saW5lV2lkdGg9NTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5tb3ZlVG8oMCwgMzAwKTtcclxuICAgIGxldCB4PXllYXJVbml0OztcclxuICAgIGxldCB5PXllYXJVbml0O1xyXG4gICAgZGF0YS5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgLy94PXllYXJVbml0Kml0ZW0uZGF0ZVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHZhbHVlVW5pdCxpdGVtLnZhbHVlKVxyXG4gICAgICB5ID0gKDIwMCAqIGl0ZW0udmFsdWUpL21heFZhbDtcclxuICAgICAgY29uc29sZS5sb2coJ3hpeScgKyB4LHkpXHJcbiAgICAgIGN0eC5saW5lVG8oeCwgeSk7XHJcbiAgICAgIHg9eCsgeWVhclVuaXRcclxuICAgICAgeT0wXHJcbiAgICB9KVxyXG4gICAgLy9jdHgubGluZVRvKDIwMCwgMTAwKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKGNhbnZhcylcclxuICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBvYmogPSB7dmlzdWFsaXplRGF0YX1cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgdmFyaWFibGVzXHJcbn0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9XHJcbmdvb2dsZS5jaGFydHMubG9hZCgnY3VycmVudCcsIHsncGFja2FnZXMnOlsnY29yZWNoYXJ0J119KTtcclxuXHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlRGF0YUZvckNoYXJ0KGRhdGFGb3JDaGFydCl7XHJcbiAgbGV0IHByZXBhcmVkRGF0YTtcclxuICBpZihkYXRhRm9yQ2hhcnQpe1xyXG4gICAgZGF0YUZvckNoYXJ0ID0gZGF0YUZvckNoYXJ0WzFdXHJcbiAgICBkYXRhRm9yQ2hhcnQgPSBkYXRhRm9yQ2hhcnQucmV2ZXJzZSgpXHJcblxyXG4gICAgcHJlcGFyZWREYXRhID0gW1xyXG4gICAgICAvL1snWWVhcicsICdWYWx1ZSddXHJcbiAgICBdO1xyXG4gICAgZGF0YUZvckNoYXJ0LmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgIGxldCBvbmVJdGVtID0gW11cclxuICAgICAgb25lSXRlbS5wdXNoKGl0ZW0uZGF0ZSlcclxuICAgICAgb25lSXRlbS5wdXNoKE51bWJlcihpdGVtLnZhbHVlKSlcclxuICAgICAgcHJlcGFyZWREYXRhLnB1c2gob25lSXRlbSlcclxuICAgIH0pXHJcbiAgICBwcmVwYXJlZERhdGEuc29ydCgoYSxiKT0+cGFyc2VGbG9hdChhWzBdKS1wYXJzZUZsb2F0KGJbMF0pKVxyXG4gICAgcHJlcGFyZWREYXRhLnVuc2hpZnQoWydZZWFyJywgJ1ZhbHVlJ10pXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIHJldHVybiBwcmVwYXJlZERhdGFcclxufVxyXG5mdW5jdGlvbiBkcmF3Q2hhcnRGb3JHQ2hhcnRzKGRhdGFmb3JDaGFydCxjb3VudHJ5KXtcclxuICBjb25zb2xlLmxvZyhkYXRhZm9yQ2hhcnQpXHJcbiAgZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeydwYWNrYWdlcyc6Wydjb3JlY2hhcnQnXX0pO1xyXG4gIGdvb2dsZS5jaGFydHMuc2V0T25Mb2FkQ2FsbGJhY2soZHJhd0NoYXJ0KGRhdGFmb3JDaGFydCxjb3VudHJ5KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdDaGFydChkYXRhZm9yQ2hhcnQsY291bnRyeSkge1xyXG5cclxuXHJcbiAgbGV0IHByZXBhcmVkRGF0YSA9IHByZXBhcmVEYXRhRm9yQ2hhcnQoZGF0YWZvckNoYXJ0KTtcclxuICBsZXQgZGF0YSA9IGdvb2dsZS52aXN1YWxpemF0aW9uLmFycmF5VG9EYXRhVGFibGUocHJlcGFyZWREYXRhKVxyXG5cclxuICB2YXIgb3B0aW9ucyA9IHtcclxuICAgIHRpdGxlOiBjb3VudHJ5LFxyXG4gICAgY3VydmVUeXBlOiAnZnVuY3Rpb24nLFxyXG4gICAgbGVnZW5kOiB7IHBvc2l0aW9uOiAnYm90dG9tJyB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkxpbmVDaGFydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VydmVfY2hhcnQnKSk7XHJcblxyXG4gIGNoYXJ0LmRyYXcoZGF0YSwgb3B0aW9ucyk7XHJcbn1cclxuXHJcblxyXG5vYmogPSB7XHJcbiAgZHJhd0NoYXJ0Rm9yR0NoYXJ0c1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgZ2V0fSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyB2YXJpYWJsZXNcclxufSBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBidWlsZFRhYmxlXHJcbn0gZnJvbSAnLi9idWlsZFRhYmxlLmpzJztcclxuaW1wb3J0IHtcclxuICBkZWZhdWx0IGFzIGNhbnZhc1xyXG59IGZyb20gJy4vY2FudmFzLmpzJztcclxuaW1wb3J0IHtcclxuICBkZWZhdWx0IGFzIHJlYWREYXRhREJcclxufSBmcm9tICcuL3JlYWREYXRhLmpzJztcclxuaW1wb3J0IHtcclxuICBkZWZhdWx0IGFzIGFkZERhdGFEQlxyXG59IGZyb20gJy4vYWRkRGF0YURCLmpzJztcclxuaW1wb3J0IHtcclxuICBkZWZhdWx0IGFzIGRyYXdDaGFydFxyXG59IGZyb20gJy4vZHJhd0NoYXJ0LmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5cclxuXHJcbmxldCBzZWxlY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5TRUxFQ1RfQ09VTlRSWV9TRUxFQ1RPUik7XHJcbmxldCBjb3VudHJ5TGlzdExpbmsgPSB2YXJpYWJsZXMuQ09VTlRSWV9MSVNUX0xJTks7XHJcbmxldCBnZHBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5HRFBfQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxubGV0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpO1xyXG5sZXQgc2VsZWN0SW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJyk7XHJcbmxldCBnZXREYXRhQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuR0VUX0RBVEFfQlROKTtcclxubGV0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5ERVNDUklQVElPTl9TRUxFQ1RPUik7XHJcblxyXG5nZXREYXRhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0RGF0YSlcclxuc2VsZWN0SW5kaWNhdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldEluZGljYXRvckRlc2NyaXB0aW9uKTtcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JEZXNjcmlwdGlvbigpIHtcclxuICBkZXNjcmlwdGlvbkZpZWxkLmlubmVySFRNTCA9IGV2ZW50LnRhcmdldC5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1zb3VyY2Vub3RlJylcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICBsZXQgdXJsID0gYGh0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXMvJHtzZWxlY3QudmFsdWV9L2luZGljYXRvcnMvJHtzZWxlY3RJbmRpY2F0b3IudmFsdWV9P2Zvcm1hdD1qc29uYFxyXG4gIGxldCBxdWVyeU5hbWUgPSBgJHtzZWxlY3QudmFsdWV9XyR7c2VsZWN0SW5kaWNhdG9yLnZhbHVlfWBcclxuICBsZXQgY291bnRyeSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWNvdW50cnknKVxyXG4gIFxyXG4gIGxldCBwcm9taXMgPSByZWFkRGF0YURCLnJlYWREYXRhKHF1ZXJ5TmFtZSk7XHJcbiAgcHJvbWlzLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgaWYoIWRhdGEpe1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gZ2V0KHVybCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgZHJhd0NoYXJ0LmRyYXdDaGFydEZvckdDaGFydHMoZGF0YSxjb3VudHJ5KVxyXG4gICAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSB7cXVlcnk6cXVlcnlOYW1lLGRhdGE6ZGF0YX1cclxuICAgICAgICAgIGFkZERhdGFEQi5hZGREYXRhKGRhdGFUb1NhdmUpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igd2l0aCBnZXR0aW5nIGRhdGEgZnJvbSB3YiBhcGknLGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBkcmF3Q2hhcnQuZHJhd0NoYXJ0Rm9yR0NoYXJ0cyhkYXRhLmRhdGEsY291bnRyeSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHJlYWRpbmcgZGF0YScsIGVycm9yKVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YUZyb21XZWIoKXtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvdW50cmllcyhjb3VudHJpZXMpIHtcclxuICBjb3VudHJpZXMgPSBKU09OLnBhcnNlKGNvdW50cmllcylcclxuICBjb3VudHJpZXNbMV0uc29ydCgoYSxiKT0+ICgnJysgYS5uYW1lKS5sb2NhbGVDb21wYXJlKGIubmFtZSkpXHJcbiAgbGV0IG9wdGlvbjtcclxuICBjb3VudHJpZXNbMV0uZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGlmKGl0ZW0uY2FwaXRhbENpdHkpe1xyXG4gICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKVxyXG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGl0ZW0uaWQpXHJcbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2xhYmVsJywgaXRlbS5uYW1lKVxyXG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1jb3VudHJ5JywgaXRlbS5uYW1lKVxyXG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuICBzZWxlY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SW5kaWNhdG9ycygpIHtcclxuICBsZXQgb3B0aW9uO1xyXG4gIHZhcmlhYmxlcy5JTkRJQ0FUT1JTLmZvckVhY2goaW5kaWNhdG9yID0+IHtcclxuICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpO1xyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpbmRpY2F0b3IuaWQpXHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdsYWJlbCcsIGluZGljYXRvci5uYW1lKVxyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtc291cmNlTm90ZScsIGluZGljYXRvci5zb3VyY2VOb3RlKVxyXG4gICAgc2VsZWN0SW5kaWNhdG9yLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgfSlcclxuXHJcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdEluZGljYXRvcik7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBsZXQgcHJvbWlzID0gcmVhZERhdGFEQi5yZWFkRGF0YSh2YXJpYWJsZXMuSU5EX0RCX0NPVU5UUllfTElTVCk7XHJcbiAgcHJvbWlzLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgaWZDb3VudHJ5TGlzdEV4aXN0KGRhdGEpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHJlYWRpbmcgZGF0YScsIGVycm9yKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlmQ291bnRyeUxpc3RFeGlzdChkYXRhKSB7XHJcbiAgaWYgKCFkYXRhKSB7XHJcbiAgICBsZXQgY291bnRyeUxpc3QgPSBnZXRDb3VudHJ5TGlzdCgpO1xyXG4gIH0gZWxzZXtcclxuICAgIGdldENvdW50cmllcyhkYXRhLmRhdGEpXHJcbiAgfVxyXG4gIGdldEluZGljYXRvcnMoKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0Q291bnRyeUxpc3QoKSB7XHJcbiAgbGV0IGNvdW50cnlMaXN0ID0gZ2V0KHZhcmlhYmxlcy5DT1VOVFJZX0xJU1RfTElOSyk7XHJcbiAgY291bnRyeUxpc3QudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgZ2V0Q291bnRyaWVzKGRhdGEpXHJcbiAgICBsZXQgZGF0YVRvU2F2ZSA9IHtxdWVyeTp2YXJpYWJsZXMuSU5EX0RCX0NPVU5UUllfTElTVCxkYXRhOmRhdGF9XHJcbiAgICBhZGREYXRhREIuYWRkRGF0YShkYXRhVG9TYXZlKVxyXG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2dldENvdW50cnlMaXN0IGVycm9yICcsIGVycm9yKVxyXG4gIH0pXHJcbiAgcmV0dXJuIGNvdW50cnlMaXN0XHJcbn1cclxuXHJcblxyXG5vYmogPSB7XHJcbiAgaW5pdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldCh1cmwpe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xyXG4gICAgeGh0dHAub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh4aHR0cC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh4aHR0cC5yZXNwb25zZSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoeGh0dHAuc3RhdHVzVGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHR0cC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJlamVjdCh4aHR0cC5zdGF0dXNUZXh0KVxyXG4gICAgfTtcclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9KVxyXG59XHJcbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgZ2V0IH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHZhcmlhYmxlcyB9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5sZXQga2V5UGF0aCA9ICdxdWVyeSc7XHJcbmxldCBzdG9yZU5hbWUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5sZXQgY29uZmlnT2JqID0geyBrZXlQYXRoOiAncXVlcnknfVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKSB7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSwgY29uZmlnT2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVHJhbnNhY3Rpb24oZGIsc3RvcmVOYW1lKXtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihbc3RvcmVOYW1lXSwgKTtcclxuICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coJ29uY29tcGxldGUgdHJhbnNjdGlvbicsIGV2ZW50KTtcclxuICB9O1xyXG4gIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uZXJyb3IgdHJhbnNjdGlvbicsIGV2ZW50KVxyXG4gIH07XHJcbiAgcmV0dXJuIHRyYW5zYWN0aW9uO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFJlY29yZChldmVudCxsb29rZWRWYWx1ZSxwcm9taXNlRm4gKXtcclxuICBsZXQgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHN0b3JlTmFtZSk7XHJcbiAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuICBsZXQgcXVlcnkgPSBvYmplY3RTdG9yZS5nZXQobG9va2VkVmFsdWUpXHJcbiAgbGV0IHJlc3VsdDtcclxuXHJcbiAgcXVlcnkub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygncXVlcnkgZXJyb3InLGV2ZW50KVxyXG4gICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIC8vcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG4gIHF1ZXJ5Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdxdWVyeSBzdWtjZXMnLGV2ZW50KVxyXG4gICAgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gICAgcHJvbWlzZUZuLnJlc29sdmUocmVzdWx0KVxyXG4gICAgLy9yZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gcmVxdWVzdE9wZW5EYihwcm9taXNlRm4pe1xyXG4gIC8vY29uc29sZS5sb2cocHJvbWlzZUZuKVxyXG4gIGxldCBpbmRleGVkRGIgPSB3aW5kb3cuaW5kZXhlZERCO1xyXG4gIGxldCByZXF1ZXN0O1xyXG4gIGlmKGluZGV4ZWREYil7XHJcbiAgICBsZXQgcmVxdWVzdCA9IGluZGV4ZWREYi5vcGVuKHN0b3JlTmFtZSk7XHJcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3JlcXVlc3Qgb251cGdyYWRlbmVlZGVkJywgZXZlbnQpO1xyXG4gICAgICBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25ibG9ja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYmxvY2tlZCcsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IG9uZXJyb3InLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWREYXRhKGxvb2tlZFZhbHVlKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgIGxldCBwcm9taXNlT2JqID0ge3Jlc29sdmUscmVqZWN0fTtcclxuICAgIGxldCByZXF1ZXN0ID0gcmVxdWVzdE9wZW5EYihwcm9taXNlT2JqKVxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdyZXF1ZXN0IG9uc3VjY2VzcycsIGV2ZW50KVxyXG4gICAgICByZXR1cm4gcmVhZFJlY29yZChldmVudCxsb29rZWRWYWx1ZSwgcHJvbWlzZU9iailcclxuICAgIH07XHJcbiAgfSlcclxufTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGF0YShrZXksdmFsdWUpIHtcclxuICBsZXQgaW5kZXhlZERiID0gd2luZG93LmluZGV4ZWREQlxyXG4gIGlmICghaW5kZXhlZERiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbm9iaiA9IHtcclxuICByZWFkRGF0YSxcclxuICBjcmVhdGVEYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiY29uc3Qgb2JqID0ge31cclxuXHJcblxyXG5sZXQga2V5UGF0aCA9ICdxdWVyeSc7XHJcbmxldCBzdG9yZU5hbWUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5sZXQgY29uZmlnT2JqID0geyBrZXlQYXRoOiAncXVlcnknfVxyXG5cclxub2JqLklORF9EQl9DT1VOVFJZX0xJU1QgPSAnY291bnRyeUxpc3QnXHJcbm9iai5JTkRfREJfS0VZX1BBVEggPSAncXVlcnknO1xyXG5vYmouSU5EX0RCX0NPTkZJR19PQkogPSB7IGtleVBhdGg6ICdxdWVyeSd9O1xyXG5vYmouSU5EX0RCX1NUT1JFX05BTUUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5cclxub2JqLklORF9EQl9TVE9SRV9OQU1FID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxub2JqLlNFTEVDVF9DT1VOVFJZX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInNlbGVjdC1jb250YWluZXJcIl0nO1xyXG5vYmouR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJnZHAtY29udGFpbmVyXCJdJztcclxub2JqLkNPVU5UUllfTElTVF9MSU5LID0gJ2h0dHBzOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyaWVzP2Zvcm1hdD1KU09OJnBlcl9wYWdlPTMwNSc7XHJcbi8vYGh0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXMvJHtldmVudC50YXJnZXQudmFsdWV9L2luZGljYXRvcnMvTlkuR0RQLk1LVFAuQ0Q/Zm9ybWF0PWpzb25gXHJcbm9iai5JTkRJQ0FUT1JTX0xJTksgPSAnaHR0cDovL2FwaS53b3JsZGJhbmsub3JnL3YyL2luZGljYXRvcnM/Zm9ybWF0PWpzb24nO1xyXG5vYmouR0VUX0RBVEFfQlROID0gJ1tkYXRhLXRhcmdldD1cImdldC1kYXRhLWJ1dHRvblwiXSc7XHJcblxyXG5vYmouREVTQ1JJUFRJT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwiZGVzY3JpcHRpb24tY29udGFpbmVyXCJdJztcclxuXHJcbm9iai5WSVNVQUxJWkFUSU9OX1NFTEVDVE9SID0nW2RhdGEtdGFyZ2V0PVwidmlzdWFsaXNhdGlvbi1jb250YWluZXJcIl0nO1xyXG5cclxub2JqLklORElDQVRPUlMgPSBbe1xyXG4gICAgXCJpZFwiOiBcIk5ZLkFESi5BRURVLkdOLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBZGp1c3RlZCBzYXZpbmdzOiBlZHVjYXRpb24gZXhwZW5kaXR1cmUgKCUgb2YgR05JKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiRWR1Y2F0aW9uIGV4cGVuZGl0dXJlIHJlZmVycyB0byB0aGUgY3VycmVudCBvcGVyYXRpbmcgZXhwZW5kaXR1cmVzIGluIGVkdWNhdGlvbiwgaW5jbHVkaW5nIHdhZ2VzIGFuZCBzYWxhcmllcyBhbmQgZXhjbHVkaW5nIGNhcGl0YWwgaW52ZXN0bWVudHMgaW4gYnVpbGRpbmdzIGFuZCBlcXVpcG1lbnQuXCIsXHJcbiAgICBcInNvdXJjZU9yZ2FuaXphdGlvblwiOiBcIlVORVNDTzsgZGF0YSBhcmUgZXh0cmFwb2xhdGVkIHRvIHRoZSBtb3N0IHJlY2VudCB5ZWFyIGF2YWlsYWJsZVwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImcyMC50LnJlY2VpdmUuMVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmVjZWl2ZWQgZGlnaXRhbCBwYXltZW50cyBpbiB0aGUgcGFzdCB5ZWFyLCBtYWxlICglIGFnZSAxNSspXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJUaGUgcGVyY2VudGFnZSBvZiByZXNwb25kZW50cyB3aG8gcmVwb3J0IHVzaW5nIG1vYmlsZSBtb25leSwgYSBkZWJpdCBvciBjcmVkaXQgY2FyZCwgb3IgYSBtb2JpbGUgcGhvbmUgdG8gcmVjZWl2ZSBhIHBheW1lbnQgdGhyb3VnaCBhbiBhY2NvdW50IGluIHRoZSBwYXN0IDEyIG1vbnRocy4gSXQgYWxzbyBpbmNsdWRlcyByZXNwb25kZW50cyB3aG8gcmVwb3J0IHJlY2VpdmluZyByZW1pdHRhbmNlcywgcmVjZWl2aW5nIHBheW1lbnRzIGZvciBhZ3JpY3VsdHVyYWwgcHJvZHVjdHMsIHJlY2VpdmluZyBnb3Zlcm5tZW50IHRyYW5zZmVycywgcmVjZWl2aW5nIHdhZ2VzLCBvciByZWNlaXZpbmcgYSBwdWJsaWMgc2VjdG9yIHBlbnNpb24gZGlyZWN0bHkgaW50byBhIGZpbmFuY2lhbCBpbnN0aXR1dGlvbiBhY2NvdW50IG9yIHRocm91Z2ggYSBtb2JpbGUgbW9uZXkgYWNjb3VudCBpbiB0aGUgcGFzdCAxMiBtb250aHMsIG1hbGUgKCUgYWdlIDE1KykuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJOWS5HRFAuREVGTC5LRC5aRy5BRFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiSW5mbGF0aW9uLCBHRFAgZGVmbGF0b3I6IGxpbmtlZCBzZXJpZXMgKGFubnVhbCAlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiSW5mbGF0aW9uIGFzIG1lYXN1cmVkIGJ5IHRoZSBhbm51YWwgZ3Jvd3RoIHJhdGUgb2YgdGhlIEdEUCBpbXBsaWNpdCBkZWZsYXRvciBzaG93cyB0aGUgcmF0ZSBvZiBwcmljZSBjaGFuZ2UgaW4gdGhlIGVjb25vbXkgYXMgYSB3aG9sZS4gVGhpcyBzZXJpZXMgaGFzIGJlZW4gbGlua2VkIHRvIHByb2R1Y2UgYSBjb25zaXN0ZW50IHRpbWUgc2VyaWVzIHRvIGNvdW50ZXJhY3QgYnJlYWtzIGluIHNlcmllcyBvdmVyIHRpbWUgZHVlIHRvIGNoYW5nZXMgaW4gYmFzZSB5ZWFycywgc291cmNlIGRhdGEgYW5kIG1ldGhvZG9sb2dpZXMuIFRodXMsIGl0IG1heSBub3QgYmUgY29tcGFyYWJsZSB3aXRoIG90aGVyIG5hdGlvbmFsIGFjY291bnRzIHNlcmllcyBpbiB0aGUgZGF0YWJhc2UgZm9yIGhpc3RvcmljYWwgeWVhcnMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTTS5QT1AuTkVUTVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTmV0IG1pZ3JhdGlvblwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiTmV0IG1pZ3JhdGlvbiBpcyB0aGUgbmV0IHRvdGFsIG9mIG1pZ3JhbnRzIGR1cmluZyB0aGUgcGVyaW9kLCB0aGF0IGlzLCB0aGUgdG90YWwgbnVtYmVyIG9mIGltbWlncmFudHMgbGVzcyB0aGUgYW5udWFsIG51bWJlciBvZiBlbWlncmFudHMsIGluY2x1ZGluZyBib3RoIGNpdGl6ZW5zIGFuZCBub25jaXRpemVucy4gRGF0YSBhcmUgZml2ZS15ZWFyIGVzdGltYXRlcy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi5BSURTLk1BLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlIGF0IGxhc3QgaGlnaC1yaXNrIHNleCwgYWR1bHQgbWFsZSAoJSBhZ2VzIDE1LTQ5KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIG1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIG1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTQ5IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2Ugd2l0aCBhIG5vbi1tYXJpdGFsIGFuZCBub24tY29oYWJpdGluZyBzZXh1YWwgcGFydG5lciBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTSC5DT04uQUlEUy5GRS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIGFkdWx0IGZlbWFsZSAoJSBhZ2VzIDE1LTQ5KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIGZlbWFsZSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZmVtYWxlIHBvcHVsYXRpb24gYWdlcyAxNS00OSB3aG8gdXNlZCBhIGNvbmRvbSBhdCBsYXN0IGludGVyY291cnNlIHdpdGggYSBub24tbWFyaXRhbCBhbmQgbm9uLWNvaGFiaXRpbmcgc2V4dWFsIHBhcnRuZXIgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi4xNTI0Lk1BLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlLCBwb3B1bGF0aW9uIGFnZXMgMTUtMjQsIG1hbGUgKCUgb2YgbWFsZXMgYWdlcyAxNS0yNClcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkNvbmRvbSB1c2UsIG1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIG1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTI0IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2UgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi4xNTI0LkZFLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlLCBwb3B1bGF0aW9uIGFnZXMgMTUtMjQsIGZlbWFsZSAoJSBvZiBmZW1hbGVzIGFnZXMgMTUtMjQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJDb25kb20gdXNlLCBmZW1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGZlbWFsZSBwb3B1bGF0aW9uIGFnZXMgMTUtMjQgd2hvIHVzZWQgYSBjb25kb20gYXQgbGFzdCBpbnRlcmNvdXJzZSBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0cuUlNYLlRJUkQuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgd2lmZSBpcyBqdXN0aWZpZWQgcmVmdXNpbmcgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGlzIHRpcmVkIG9yIG5vdCBpbiB0aGUgbW9vZCAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUgaXMgdGlyZWQgb3Igbm90IGluIHRoZSBtb29kLlwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNHLlJTWC5UTURTLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIHdpZmUgaXMganVzdGlmaWVkIHJlZnVzaW5nIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBoZSBoYXMgc2V4dWFsbHkgdHJhbnNtaXR0ZWQgZGlzZWFzZSAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaHVzYmFuZCBoYXMgc2V4dWFsbHkgdHJhbnNtaXR0ZWQgZGlzZWFzZS5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guU1hPVC5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaGUgaGFzIHNleCB3aXRoIG90aGVyIHdvbWVuICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBodXNiYW5kIGhhcyBzZXggd2l0aCBvdGhlciB3b21lbi5cIlxyXG4gIH0sIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guUkVBUy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBmb3IgYWxsIG9mIHRoZSByZWFzb25zICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGZvciBhbGwgb2YgdGhlIHJlYXNvbnM6IGh1c2JhbmQgaGFzIHNleHVhbGx5IHRyYW5zbWl0dGVkIGRpc2Vhc2UsIGh1c2JhbmQgaGFzIHNleCB3aXRoIG90aGVyIHdvbWVuLCByZWNlbnRseSBnaXZlbiBiaXJ0aCwgdGlyZWQgb3Igbm90IGluIHRoZSBtb29kLlwiXHJcbiAgfSwge1xyXG4gICAgXCJpZFwiOiBcIlNHLlZBVy5CVVJOLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIGh1c2JhbmQgaXMganVzdGlmaWVkIGluIGJlYXRpbmcgaGlzIHdpZmUgd2hlbiBzaGUgYnVybnMgdGhlIGZvb2QgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZXMgMTUtNDkgd2hvIGJlbGlldmUgYSBodXNiYW5kXFwvcGFydG5lciBpcyBqdXN0aWZpZWQgaW4gaGl0dGluZyBvciBiZWF0aW5nIGhpcyB3aWZlXFwvcGFydG5lciB3aGVuIHNoZSBidXJucyB0aGUgZm9vZC5cIlxyXG4gIH0sXHJcblxyXG5cclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5DQVBBLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJCYW5rIGNhcGl0YWwgdG8gYXNzZXRzIHJhdGlvICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQmFuayBjYXBpdGFsIHRvIGFzc2V0cyBpcyB0aGUgcmF0aW8gb2YgYmFuayBjYXBpdGFsIGFuZCByZXNlcnZlcyB0byB0b3RhbCBhc3NldHMuIENhcGl0YWwgYW5kIHJlc2VydmVzIGluY2x1ZGUgZnVuZHMgY29udHJpYnV0ZWQgYnkgb3duZXJzLCByZXRhaW5lZCBlYXJuaW5ncywgZ2VuZXJhbCBhbmQgc3BlY2lhbCByZXNlcnZlcywgcHJvdmlzaW9ucywgYW5kIHZhbHVhdGlvbiBhZGp1c3RtZW50cy4gQ2FwaXRhbCBpbmNsdWRlcyB0aWVyIDEgY2FwaXRhbCAocGFpZC11cCBzaGFyZXMgYW5kIGNvbW1vbiBzdG9jayksIHdoaWNoIGlzIGEgY29tbW9uIGZlYXR1cmUgaW4gYWxsIGNvdW50cmllcycgYmFua2luZyBzeXN0ZW1zLCBhbmQgdG90YWwgcmVndWxhdG9yeSBjYXBpdGFsLCB3aGljaCBpbmNsdWRlcyBzZXZlcmFsIHNwZWNpZmllZCB0eXBlcyBvZiBzdWJvcmRpbmF0ZWQgZGVidCBpbnN0cnVtZW50cyB0aGF0IG5lZWQgbm90IGJlIHJlcGFpZCBpZiB0aGUgZnVuZHMgYXJlIHJlcXVpcmVkIHRvIG1haW50YWluIG1pbmltdW0gY2FwaXRhbCBsZXZlbHMgKHRoZXNlIGNvbXByaXNlIHRpZXIgMiBhbmQgdGllciAzIGNhcGl0YWwpLiBUb3RhbCBhc3NldHMgaW5jbHVkZSBhbGwgbm9uZmluYW5jaWFsIGFuZCBmaW5hbmNpYWwgYXNzZXRzLlwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILlNGLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCcmFuY2hlcywgc3BlY2lhbGl6ZWQgc3RhdGUgZmluYW5jaWFsIGluc3RpdHV0aW9ucyAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFuayBicmFuY2hlcyAocGVyIDEwMCwwMDAgcGVvcGxlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5NRi5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhbmNoZXMsIG1pY3JvZmluYW5jZSBpbnN0aXR1dGlvbnMgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guQ08uUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBjb29wZXJhdGl2ZXMgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guQ0IuUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBjb21tZXJjaWFsIGJhbmtzIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkFUTS5UT1RMLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJBdXRvbWF0ZWQgdGVsbGVyIG1hY2hpbmVzIChBVE1zKSAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQXV0b21hdGVkIHRlbGxlciBtYWNoaW5lcyBhcmUgY29tcHV0ZXJpemVkIHRlbGVjb21tdW5pY2F0aW9ucyBkZXZpY2VzIHRoYXQgcHJvdmlkZSBjbGllbnRzIG9mIGEgZmluYW5jaWFsIGluc3RpdHV0aW9uIHdpdGggYWNjZXNzIHRvIGZpbmFuY2lhbCB0cmFuc2FjdGlvbnMgaW4gYSBwdWJsaWMgcGxhY2UuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5BU1QuUFVCTy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFua2luZyBhc3NldHMgaGVsZCBieSBnb3Zlcm5tZW50LW93bmVkIGJhbmtzICglIG9mIHRvdGFsIGJhbmtpbmcgYXNzZXRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5BU1QuTlBFUi5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFuayBub25wZXJmb3JtaW5nIGxvYW5zIHRvIHRvdGFsIGdyb3NzIGxvYW5zICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQmFuayBub25wZXJmb3JtaW5nIGxvYW5zIHRvIHRvdGFsIGdyb3NzIGxvYW5zIGFyZSB0aGUgdmFsdWUgb2Ygbm9ucGVyZm9ybWluZyBsb2FucyBkaXZpZGVkIGJ5IHRoZSB0b3RhbCB2YWx1ZSBvZiB0aGUgbG9hbiBwb3J0Zm9saW8gKGluY2x1ZGluZyBub25wZXJmb3JtaW5nIGxvYW5zIGJlZm9yZSB0aGUgZGVkdWN0aW9uIG9mIHNwZWNpZmljIGxvYW4tbG9zcyBwcm92aXNpb25zKS4gVGhlIGxvYW4gYW1vdW50IHJlY29yZGVkIGFzIG5vbnBlcmZvcm1pbmcgc2hvdWxkIGJlIHRoZSBncm9zcyB2YWx1ZSBvZiB0aGUgbG9hbiBhcyByZWNvcmRlZCBvbiB0aGUgYmFsYW5jZSBzaGVldCwgbm90IGp1c3QgdGhlIGFtb3VudCB0aGF0IGlzIG92ZXJkdWUuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5FLlRSRC5HTkZTLlpTXCIsXHJcbiAgICBcIm5hbWVcIjpcIlRyYWRlICglIG9mIEdEUClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiVHJhZGUgaXMgdGhlIHN1bSBvZiBleHBvcnRzIGFuZCBpbXBvcnRzIG9mIGdvb2RzIGFuZCBzZXJ2aWNlcyBtZWFzdXJlZCBhcyBhIHNoYXJlIG9mIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QuIFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJTTC5HRFAuUENBUC5FTS5LRC5aR1wiLFxyXG4gICAgXCJuYW1lXCI6XCJHRFAgcGVyIHBlcnNvbiBlbXBsb3llZCAoYW5udWFsICUgZ3Jvd3RoKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgcGVyIHBlcnNvbiBlbXBsb3llZCBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IChHRFApIGRpdmlkZWQgYnkgdG90YWwgZW1wbG95bWVudCBpbiB0aGUgZWNvbm9teS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuUFAuS0QuWkdcIixcclxuICAgIFwibmFtZVwiOlwiR0RQIHBlciBjYXBpdGEsIFBQUCBhbm51YWwgZ3Jvd3RoICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJBbm51YWwgcGVyY2VudGFnZSBncm93dGggcmF0ZSBvZiBHRFAgcGVyIGNhcGl0YSBiYXNlZCBvbiBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSAoUFBQKS4gR0RQIHBlciBjYXBpdGEgYmFzZWQgb24gcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgKFBQUCkuIFBQUCBHRFAgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCBjb252ZXJ0ZWQgdG8gaW50ZXJuYXRpb25hbCBkb2xsYXJzIHVzaW5nIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IHJhdGVzLiBBbiBpbnRlcm5hdGlvbmFsIGRvbGxhciBoYXMgdGhlIHNhbWUgcHVyY2hhc2luZyBwb3dlciBvdmVyIEdEUCBhcyB0aGUgVS5TLiBkb2xsYXIgaGFzIGluIHRoZSBVbml0ZWQgU3RhdGVzLiBHRFAgYXQgcHVyY2hhc2VyJ3MgcHJpY2VzIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY29uc3RhbnQgMjAwMCBpbnRlcm5hdGlvbmFsIGRvbGxhcnMuICBcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuUFAuS0RcIixcIm5hbWVcIjpcIkdEUCBwZXIgY2FwaXRhLCBQUFAgKGNvbnN0YW50IDIwMTEgaW50ZXJuYXRpb25hbCAkKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgcGVyIGNhcGl0YSBiYXNlZCBvbiBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSAoUFBQKS4gUFBQIEdEUCBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IGNvbnZlcnRlZCB0byBpbnRlcm5hdGlvbmFsIGRvbGxhcnMgdXNpbmcgcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgcmF0ZXMuIEFuIGludGVybmF0aW9uYWwgZG9sbGFyIGhhcyB0aGUgc2FtZSBwdXJjaGFzaW5nIHBvd2VyIG92ZXIgR0RQIGFzIHRoZSBVLlMuIGRvbGxhciBoYXMgaW4gdGhlIFVuaXRlZCBTdGF0ZXMuIEdEUCBhdCBwdXJjaGFzZXIncyBwcmljZXMgaXMgdGhlIHN1bSBvZiBncm9zcyB2YWx1ZSBhZGRlZCBieSBhbGwgcmVzaWRlbnQgcHJvZHVjZXJzIGluIHRoZSBlY29ub215IHBsdXMgYW55IHByb2R1Y3QgdGF4ZXMgYW5kIG1pbnVzIGFueSBzdWJzaWRpZXMgbm90IGluY2x1ZGVkIGluIHRoZSB2YWx1ZSBvZiB0aGUgcHJvZHVjdHMuIEl0IGlzIGNhbGN1bGF0ZWQgd2l0aG91dCBtYWtpbmcgZGVkdWN0aW9ucyBmb3IgZGVwcmVjaWF0aW9uIG9mIGZhYnJpY2F0ZWQgYXNzZXRzIG9yIGZvciBkZXBsZXRpb24gYW5kIGRlZ3JhZGF0aW9uIG9mIG5hdHVyYWwgcmVzb3VyY2VzLiBEYXRhIGFyZSBpbiBjb25zdGFudCAyMDExIGludGVybmF0aW9uYWwgZG9sbGFycy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuQ0RcIixcIm5hbWVcIjpcIkdEUCBwZXIgY2FwaXRhIChjdXJyZW50IFVTJClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIHBlciBjYXBpdGEgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCBkaXZpZGVkIGJ5IG1pZHllYXIgcG9wdWxhdGlvbi4gR0RQIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY3VycmVudCBVLlMuIGRvbGxhcnMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5NS1RQLlpHXCIsXCJuYW1lXCI6XCJHcm9zcyBkb21lc3RpYyBwcm9kdWN0IChBdi4gYW5udWFsIGdyb3d0aCwgJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiVGhlIEdEUCBpbXBsaWNpdCBkZWZsYXRvciBpcyB0aGUgcmF0aW8gb2YgR0RQIGluIGN1cnJlbnQgbG9jYWwgY3VycmVuY3kgdG8gR0RQIGluIGNvbnN0YW50IGxvY2FsIGN1cnJlbmN5LiBUaGUgYmFzZSB5ZWFyIHZhcmllcyBieSBjb3VudHJ5LlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuTUtUUC5LTi44Ny5aR1wiLFwibmFtZVwiOlwiR0RQIGdyb3d0aCAoYW5udWFsICUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuTUtUUC5DRFwiLFwibmFtZVwiOlwiR0RQIChjdXJyZW50IFVTJClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIGF0IHB1cmNoYXNlcidzIHByaWNlcyBpcyB0aGUgc3VtIG9mIGdyb3NzIHZhbHVlIGFkZGVkIGJ5IGFsbCByZXNpZGVudCBwcm9kdWNlcnMgaW4gdGhlIGVjb25vbXkgcGx1cyBhbnkgcHJvZHVjdCB0YXhlcyBhbmQgbWludXMgYW55IHN1YnNpZGllcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBwcm9kdWN0cy4gSXQgaXMgY2FsY3VsYXRlZCB3aXRob3V0IG1ha2luZyBkZWR1Y3Rpb25zIGZvciBkZXByZWNpYXRpb24gb2YgZmFicmljYXRlZCBhc3NldHMgb3IgZm9yIGRlcGxldGlvbiBhbmQgZGVncmFkYXRpb24gb2YgbmF0dXJhbCByZXNvdXJjZXMuIERhdGEgYXJlIGluIGN1cnJlbnQgVS5TLiBkb2xsYXJzLiBEb2xsYXIgZmlndXJlcyBmb3IgR0RQIGFyZSBjb252ZXJ0ZWQgZnJvbSBkb21lc3RpYyBjdXJyZW5jaWVzIHVzaW5nIHNpbmdsZSB5ZWFyIG9mZmljaWFsIGV4Y2hhbmdlIHJhdGVzLiBGb3IgYSBmZXcgY291bnRyaWVzIHdoZXJlIHRoZSBvZmZpY2lhbCBleGNoYW5nZSByYXRlIGRvZXMgbm90IHJlZmxlY3QgdGhlIHJhdGUgZWZmZWN0aXZlbHkgYXBwbGllZCB0byBhY3R1YWwgZm9yZWlnbiBleGNoYW5nZSB0cmFuc2FjdGlvbnMsIGFuIGFsdGVybmF0aXZlIGNvbnZlcnNpb24gZmFjdG9yIGlzIHVzZWQuXCJcclxuICB9LFxyXG4gIHtcclxuXCJpZFwiOlwiU0UuVEVSLkVOUkwuRkUuWlNcIixcIm5hbWVcIjpcIlBlcmNlbnRhZ2Ugb2Ygc3R1ZGVudHMgaW4gdGVydGlhcnkgZWR1Y2F0aW9uIHdobyBhcmUgZmVtYWxlICglKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIk51bWJlciBvZiBmZW1hbGUgc3R1ZGVudHMgYXQgdGhlIHRlcnRpYXJ5IGVkdWNhdGlvbiBsZXZlbCAoSVNDRUQgNSB0byA4KSBleHByZXNzZWQgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCBudW1iZXIgb2Ygc3R1ZGVudHMgKG1hbGUgYW5kIGZlbWFsZSkgYXQgdGhlIHRlcnRpYXJ5IGVkdWNhdGlvbiBsZXZlbCAoSVNDRUQgNSB0byA4KSBpbiBhIGdpdmVuIHNjaG9vbCB5ZWFyLlwiXHJcblxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuTVMuWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIGF0IGxlYXN0IE1hc3RlcidzIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCB0b3RhbCAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcblwiaWRcIjpcIlNFLlRFUi5DVUFULk1TLkZFLlpTXCIsXCJuYW1lXCI6XCJFZHVjYXRpb25hbCBhdHRhaW5tZW50LCBhdCBsZWFzdCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LCBwb3B1bGF0aW9uIDI1KywgZmVtYWxlICglKSAoY3VtdWxhdGl2ZSlcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuRE8uWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIERvY3RvcmFsIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCB0b3RhbCAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgRG9jdG9yYWwgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuTVMuTUEuWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIGF0IGxlYXN0IE1hc3RlcidzIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCBtYWxlICglKSAoY3VtdWxhdGl2ZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBvcHVsYXRpb24gYWdlcyAyNSBhbmQgb3ZlciB0aGF0IGF0dGFpbmVkIG9yIGNvbXBsZXRlZCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5GUEwuRlNFWC5RNS5aU1wiLFwibmFtZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgKHdvbWVuIGFnZXMgMjUtNDkpOiBRNSAoaGlnaGVzdClcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIk1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlOiBNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZSBhbW9uZyB3b21lbiBhZ2VkIDI1LTQ5IHllYXJzLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5GUEwuRlNFWC5RMS5aU1wiLFwibmFtZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgKHdvbWVuIGFnZXMgMjUtNDkpOiBRMSAobG93ZXN0KVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2U6IE1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlIGFtb25nIHdvbWVuIGFnZWQgMjUtNDkgeWVhcnMuXCJcclxufSxcclxue1xyXG5cclxuICBcImlkXCI6XCJNTy5JTkRFWC5TUkxXLlhRXCIsXCJuYW1lXCI6XCJTYWZldHkgYW5kIFJ1bGUgb2YgTGF3XCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQZXJzb25hbCBTYWZldHk6ICBXaXRoaW4gdGhpcyBzdWItY2F0ZWdvcnkgdGhlIElicmFoaW0gSW5kZXggbWVhc3VyZXM6IChpKSBTYWZldHkgb2YgdGhlIFBlcnNvbiDigJMgbGV2ZWwgb2YgY3JpbWluYWxpdHkgaW4gYSBjb3VudHJ5LiAoaWkpIFZpb2xlbnQgQ3JpbWUg4oCTIHByZXZhbGVuY2Ugb2YgdmlvbGVudCBjcmltZSwgYm90aCBvcmdhbmlzZWQgYW5kIGNvbW1vbi4gKGlpaSkgU29jaWFsIFVucmVzdCDigJMgcHJldmFsZW5jZSBvZiB2aW9sZW50IHNvY2lhbCB1bnJlc3QuIChpdikgSHVtYW4gVHJhZmZpY2tpbmcg4oCTIGdvdmVybm1lbnQgZWZmb3J0cyB0byBjb21iYXQgaHVtYW4gdHJhZmZpY2tpbmcuICh2KSBEb21lc3RpYyBQb2xpdGljYWwgUGVyc2VjdXRpb24g4oCTIGNsdXN0ZXJlZCBpbmRpY2F0b3IgKGFuIGF2ZXJhZ2UpIG9mIHRoZSBmb2xsb3dpbmcgdmFyaWFibGVzOiBQaHlzaWNhbCBJbnRlZ3JpdHkgUmlnaHRzIEluZGV4IOKAkyBnb3Zlcm5tZW50IHJlc3BlY3QgZm9yIGNpdGl6ZW5z4oCZIHJpZ2h0cyB0byBmcmVlZG9tIGZyb20gdG9ydHVyZSwgZXh0cmFqdWRpY2lhbCBraWxsaW5nLCBwb2xpdGljYWwgaW1wcmlzb25tZW50LCBhbmQgZGlzYXBwZWFyYW5jZS4gIFBvbGl0aWNhbCBUZXJyb3IgU2NhbGUg4oCTIGxldmVscyBvZiBzdGF0ZS1pbnN0aWdhdGVkIHBvbGl0aWNhbCB2aW9sZW5jZSBhbmQgdGVycm9yLlwiXHJcbn0sXHJcbntcclxuXCJpZFwiOlwiU0cuVkFXLjE1NDkuWlNcIixcIm5hbWVcIjpcIlByb3BvcnRpb24gb2Ygd29tZW4gc3ViamVjdGVkIHRvIHBoeXNpY2FsIGFuZFxcL29yIHNleHVhbCB2aW9sZW5jZSBpbiB0aGUgbGFzdCAxMiBtb250aHMgKCUgb2Ygd29tZW4gYWdlIDE1LTQ5KVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlByb3BvcnRpb24gb2Ygd29tZW4gc3ViamVjdGVkIHRvIHBoeXNpY2FsIGFuZFxcL29yIHNleHVhbCB2aW9sZW5jZSBpbiB0aGUgbGFzdCAxMiBtb250aHMgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgZXZlciBwYXJ0bmVyZWQgd29tZW4gYWdlIDE1LTQ5IHdobyBhcmUgc3ViamVjdGVkIHRvIHBoeXNpY2FsIHZpb2xlbmNlLCBzZXh1YWwgdmlvbGVuY2Ugb3IgYm90aCBieSBhIGN1cnJlbnQgb3IgZm9ybWVyIGludGltYXRlIHBhcnRuZXIgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiXHJcblxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0cuT1dOLkhTQUwuTUEuWlNcIixcIm5hbWVcIjpcIk1lbiB3aG8gb3duIGhvdXNlIGFsb25lICglIG9mIG1lbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIk1lbiB3aG8gb3duIGhvdXNlIGFsb25lICglIG9mIG1lbikgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgbWVuIHdobyBvbmx5IHNvbGVseSBvd24gYSBob3VzZSB3aGljaCBpcyBsZWdhbGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGVpciBuYW1lIG9yIGNhbm5vdCBiZSBzb2xkIHdpdGhvdXQgdGhlaXIgc2lnbmF0dXJlLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRy5PV04uSFNBTC5GRS5aU1wiLFwibmFtZVwiOlwiV29tZW4gd2hvIG93biBob3VzZSBhbG9uZSAoJSBvZiB3b21lbiBhZ2UgMTUtNDkpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJXb21lbiB3aG8gb3duIGhvdXNlIGFsb25lICglIG9mIHdvbWVuIGFnZSAxNS00OSkgaXMgdGhlIHBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlIDE1LTQ5IHdobyBvbmx5IG93biBhIGhvdXNlLCB3aGljaCBsZWdhbGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGVpciBuYW1lIG9yIGNhbm5vdCBiZSBzb2xkIHdpdGhvdXQgdGhlaXIgc2lnbmF0dXJlLCBhbG9uZSAoZG9uJ3Qgc2hhcmUgb3duZXJzaGlwIHdpdGggYW55b25lKS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSUMuRlJNLlRIRVYuWlNcIixcIm5hbWVcIjpcIkZpcm1zIGV4cGVyaWVuY2luZyBsb3NzZXMgZHVlIHRvIHRoZWZ0IGFuZCB2YW5kYWxpc20gKCUgb2YgZmlybXMpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQZXJjZW50IG9mIGZpcm1zIGV4cGVyaWVuY2luZyBsb3NzZXMgZHVlIHRvIHRoZWZ0LCByb2JiZXJ5LCB2YW5kYWxpc20gb3IgYXJzb24gdGhhdCBvY2N1cnJlZCBvbiB0aGUgZXN0YWJsaXNobWVudCdzIHByZW1pc2VzLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTRy5MRUcuTVJSUFwiLFwibmFtZVwiOlwiTGVnaXNsYXRpb24gZXhwbGljaXRseSBjcmltaW5hbGl6ZXMgbWFyaXRhbCByYXBlICgxPXllczsgMD1ubylcIixcclxuXCJzb3VyY2VOb3RlXCI6J0xlZ2lzbGF0aW9uIGV4cGxpY2l0bHkgY3JpbWluYWxpemVzIG1hcml0YWwgcmFwZSBpcyB3aGV0aGVyIHRoZXJlIGlzIGxlZ2lzbGF0aW9uIHRoYXQgZXhwbGljaXRseSBjcmltaW5hbGl6ZXMgdGhlIGFjdCBvZiBtYXJpdGFsIHJhcGUgYnkgcHJvdmlkaW5nIHRoYXQgcmFwZSBvciBzZXh1YWwgYXNzYXVsdCBwcm92aXNpb25zIGFwcGx5IFwiaXJyZXNwZWN0aXZlIG9mIHRoZSBuYXR1cmUgb2YgdGhlIHJlbGF0aW9uc2hpcFwiIGJldHdlZW4gdGhlIHBlcnBldHJhdG9yIGFuZCBjb21wbGFpbmFudCBvciBieSBzdGF0aW5nIHRoYXQgXCJubyBtYXJyaWFnZSBvciBvdGhlciByZWxhdGlvbnNoaXAgc2hhbGwgY29uc3RpdHV0ZSBhIGRlZmVuc2UgdG8gYSBjaGFyZ2Ugb2YgcmFwZSBvciBzZXh1YWwgYXNzYXVsdCB1bmRlciB0aGUgbGVnaXNsYXRpb25cIiAnXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJVC5ORVQuVVNFUi5aU1wiLFwibmFtZVwiOlwiSW5kaXZpZHVhbHMgdXNpbmcgdGhlIEludGVybmV0ICglIG9mIHBvcHVsYXRpb24pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJJbnRlcm5ldCB1c2VycyBhcmUgaW5kaXZpZHVhbHMgd2hvIGhhdmUgdXNlZCB0aGUgSW50ZXJuZXQgKGZyb20gYW55IGxvY2F0aW9uKSBpbiB0aGUgbGFzdCAzIG1vbnRocy4gVGhlIEludGVybmV0IGNhbiBiZSB1c2VkIHZpYSBhIGNvbXB1dGVyLCBtb2JpbGUgcGhvbmUsIHBlcnNvbmFsIGRpZ2l0YWwgYXNzaXN0YW50LCBnYW1lcyBtYWNoaW5lLCBkaWdpdGFsIFRWIGV0Yy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSVQuTkVULlVTRVIuUDJcIixcIm5hbWVcIjpcIkludGVybmV0IHVzZXJzIChwZXIgMTAwIHBlb3BsZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkludGVybmV0IHVzZXJzIGFyZSBpbmRpdmlkdWFscyB3aG8gaGF2ZSB1c2VkIHRoZSBJbnRlcm5ldCAoZnJvbSBhbnkgbG9jYXRpb24pIGluIHRoZSBsYXN0IDMgbW9udGhzLiBUaGUgSW50ZXJuZXQgY2FuIGJlIHVzZWQgdmlhIGEgY29tcHV0ZXIsIG1vYmlsZSBwaG9uZSwgcGVyc29uYWwgZGlnaXRhbCBhc3Npc3RhbnQsIGdhbWVzIG1hY2hpbmUsIGRpZ2l0YWwgVFYgZXRjLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJWQy5IT00uSVRFTi5QNS5MRVwiLFwibmFtZVwiOlwiSW50ZW50aW9uYWwgaG9taWNpZGUgcmF0ZSAocGVyIDEwMCwwMDAgcGVvcGxlLCBXSE8pXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LHtcclxuICBcImlkXCI6XCJWQy5CVEwuREVUSFwiLFwibmFtZVwiOlwiQmF0dGxlLXJlbGF0ZWQgZGVhdGhzIChudW1iZXIgb2YgcGVvcGxlKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiQmF0dGxlLXJlbGF0ZWQgZGVhdGhzIGFyZSBkZWF0aHMgaW4gYmF0dGxlLXJlbGF0ZWQgY29uZmxpY3RzIGJldHdlZW4gd2FycmluZyBwYXJ0aWVzIGluIHRoZSBjb25mbGljdCBkeWFkICh0d28gY29uZmxpY3QgdW5pdHMgdGhhdCBhcmUgcGFydGllcyB0byBhIGNvbmZsaWN0KS4gVHlwaWNhbGx5LCBiYXR0bGUtcmVsYXRlZCBkZWF0aHMgb2NjdXIgaW4gd2FyZmFyZSBpbnZvbHZpbmcgdGhlIGFybWVkIGZvcmNlcyBvZiB0aGUgd2FycmluZyBwYXJ0aWVzLiBUaGlzIGluY2x1ZGVzIHRyYWRpdGlvbmFsIGJhdHRsZWZpZWxkIGZpZ2h0aW5nLCBndWVycmlsbGEgYWN0aXZpdGllcywgYW5kIGFsbCBraW5kcyBvZiBib21iYXJkbWVudHMgb2YgbWlsaXRhcnkgdW5pdHMsIGNpdGllcywgYW5kIHZpbGxhZ2VzLCBldGMuIFRoZSB0YXJnZXRzIGFyZSB1c3VhbGx5IHRoZSBtaWxpdGFyeSBpdHNlbGYgYW5kIGl0cyBpbnN0YWxsYXRpb25zIG9yIHN0YXRlIGluc3RpdHV0aW9ucyBhbmQgc3RhdGUgcmVwcmVzZW50YXRpdmVzLCBidXQgdGhlcmUgaXMgb2Z0ZW4gc3Vic3RhbnRpYWwgY29sbGF0ZXJhbCBkYW1hZ2UgaW4gdGhlIGZvcm0gb2YgY2l2aWxpYW5zIGJlaW5nIGtpbGxlZCBpbiBjcm9zc2ZpcmUsIGluIGluZGlzY3JpbWluYXRlIGJvbWJpbmdzLCBldGMuIEFsbCBkZWF0aHMtLW1pbGl0YXJ5IGFzIHdlbGwgYXMgY2l2aWxpYW4tLWluY3VycmVkIGluIHN1Y2ggc2l0dWF0aW9ucywgYXJlIGNvdW50ZWQgYXMgYmF0dGxlLXJlbGF0ZWQgZGVhdGhzLlwiXHJcbn0sXHJcbntcclxuXCJpZFwiOlwiVkEuU1RELkVSUlwiLFwibmFtZVwiOlwiVm9pY2UgYW5kIEFjY291bnRhYmlsaXR5OiBTdGFuZGFyZCBFcnJvclwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlZvaWNlIGFuZCBBY2NvdW50YWJpbGl0eSBjYXB0dXJlcyBwZXJjZXB0aW9ucyBvZiB0aGUgZXh0ZW50IHRvIHdoaWNoIGEgY291bnRyeSdzIGNpdGl6ZW5zIGFyZSBhYmxlIHRvIHBhcnRpY2lwYXRlIGluIHNlbGVjdGluZyB0aGVpciBnb3Zlcm5tZW50LCBhcyB3ZWxsIGFzIGZyZWVkb20gb2YgZXhwcmVzc2lvbiwgZnJlZWRvbSBvZiBhc3NvY2lhdGlvbiwgYW5kIGEgZnJlZSBtZWRpYS5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiNS41MS4wMS4wNy5nZW5kZXJcIixcIm5hbWVcIjpcIkdlbmRlciBlcXVhbGl0eVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhlIGluZGljYXRvciBpcyBkZWZpbmVkIGFzIHRoZSByYXRpbyBvZiB0aGUgZ3Jvc3MgZW5yb2xsbWVudCByYXRlIG9mIGdpcmxzIHRvIGJveXMgaW4gcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGVkdWNhdGlvbiBsZXZlbHMgaW4gYm90aCBwdWJsaWMgYW5kIHByaXZhdGUgc2Nob29scy4gV29tZW4gaGF2ZSBhbiBlbm9ybW91cyBpbXBhY3Qgb24gdGhlIHdlbGwtYmVpbmcgb2YgdGhlaXIgZmFtaWxpZXMgYW5kIHNvY2lldGllcywgYnV0IHRoZWlyIHBvdGVudGlhbCBpcyBzb21ldGltZXMgbm90IHJlYWxpemVkIGJlY2F1c2Ugb2YgZGlzY3JpbWluYXRvcnkgc29jaWFsIG5vcm1zLCBpbmNlbnRpdmVzLCBhbmQgbGVnYWwgaW5zdGl0dXRpb25zLiBBbHRob3VnaCB0aGVpciBzdGF0dXMgaGFzIGltcHJvdmVkIGluIHJlY2VudCBkZWNhZGVzLCBnZW5kZXIgaW5lcXVhbGl0aWVzIHBlcnNpc3QuIEVkdWNhdGlvbiBpcyBvbmUgb2YgdGhlIG1vc3QgaW1wb3J0YW50IGFzcGVjdHMgb2YgaHVtYW4gZGV2ZWxvcG1lbnQsIGFuZCBlbGltaW5hdGluZyBnZW5kZXIgZGlzcGFyaXR5IGF0IGFsbCBsZXZlbHMgb2YgZWR1Y2F0aW9uIHdvdWxkIGhlbHAgdG8gaW5jcmVhc2UgdGhlIHN0YXR1cyBhbmQgY2FwYWJpbGl0aWVzIG9mIHdvbWVuLiBUaGlzIGluZGljYXRvciBwcm92aWRlcyBhIG1lYXN1cmUgb2YgZXF1YWxpdHkgb2YgZWR1Y2F0aW9uYWwgb3Bwb3J0dW5pdHkgYW5kIHJlbGF0ZXMgdG8gdGhlIHRoaXJkIE1ERyB0aGF0IHNlZWtzIHRvIHByb21vdGUgZ2VuZGVyIGVxdWFsaXR5IGFuZCB0aGUgZW1wb3dlcm1lbnQgb2Ygd29tZW4uXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlZDLklIUi5OUE9MLlA1XCIsXCJuYW1lXCI6XCJJbnRlbnRpb25hbCBob21pY2lkZXMsIGdvdmVybm1lbnQgcG9saWNlIHNvdXJjZXMgKHBlciAxMDAsMDAwIHBlb3BsZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJORS5DT04uUFJWVC5aU1wiLFwibmFtZVwiOlwiSG91c2Vob2xkcyBhbmQgTlBJU0hzIGZpbmFsIGNvbnN1bXB0aW9uIGV4cGVuZGl0dXJlICglIG9mIEdEUClcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkhvdXNlaG9sZCBmaW5hbCBjb25zdW1wdGlvbiBleHBlbmRpdHVyZSAoZm9ybWVybHkgcHJpdmF0ZSBjb25zdW1wdGlvbikgaXMgdGhlIG1hcmtldCB2YWx1ZSBvZiBhbGwgZ29vZHMgYW5kIHNlcnZpY2VzLCBpbmNsdWRpbmcgZHVyYWJsZSBwcm9kdWN0cyAoc3VjaCBhcyBjYXJzLCB3YXNoaW5nIG1hY2hpbmVzLCBhbmQgaG9tZSBjb21wdXRlcnMpLCBwdXJjaGFzZWQgYnkgaG91c2Vob2xkcy4gSXQgZXhjbHVkZXMgcHVyY2hhc2VzIG9mIGR3ZWxsaW5ncyBidXQgaW5jbHVkZXMgaW1wdXRlZCByZW50IGZvciBvd25lci1vY2N1cGllZCBkd2VsbGluZ3MuIEl0IGFsc28gaW5jbHVkZXMgcGF5bWVudHMgYW5kIGZlZXMgdG8gZ292ZXJubWVudHMgdG8gb2J0YWluIHBlcm1pdHMgYW5kIGxpY2Vuc2VzLiBIZXJlLCBob3VzZWhvbGQgY29uc3VtcHRpb24gZXhwZW5kaXR1cmUgaW5jbHVkZXMgdGhlIGV4cGVuZGl0dXJlcyBvZiBub25wcm9maXQgaW5zdGl0dXRpb25zIHNlcnZpbmcgaG91c2Vob2xkcywgZXZlbiB3aGVuIHJlcG9ydGVkIHNlcGFyYXRlbHkgYnkgdGhlIGNvdW50cnkuIFRoaXMgaXRlbSBhbHNvIGluY2x1ZGVzIGFueSBzdGF0aXN0aWNhbCBkaXNjcmVwYW5jeSBpbiB0aGUgdXNlIG9mIHJlc291cmNlcyByZWxhdGl2ZSB0byB0aGUgc3VwcGx5IG9mIHJlc291cmNlcy5cIixcInNvdXJjZU9yZ2FuaXphdGlvblwiOlwiV29ybGQgQmFuayBuYXRpb25hbCBhY2NvdW50cyBkYXRhLCBhbmQgT0VDRCBOYXRpb25hbCBBY2NvdW50cyBkYXRhIGZpbGVzLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJUy5WRUguUENBUi5QM1wiLFwibmFtZVwiOlwiUGFzc2VuZ2VyIGNhcnMgKHBlciAxLDAwMCBwZW9wbGUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQYXNzZW5nZXIgY2FycyByZWZlciB0byByb2FkIG1vdG9yIHZlaGljbGVzLCBvdGhlciB0aGFuIHR3by13aGVlbGVycywgaW50ZW5kZWQgZm9yIHRoZSBjYXJyaWFnZSBvZiBwYXNzZW5nZXJzIGFuZCBkZXNpZ25lZCB0byBzZWF0IG5vIG1vcmUgdGhhbiBuaW5lIHBlb3BsZSAoaW5jbHVkaW5nIHRoZSBkcml2ZXIpLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5TVEEuQUNTTi5VUlwiLFwibmFtZVwiOlwiSW1wcm92ZWQgc2FuaXRhdGlvbiBmYWNpbGl0aWVzLCB1cmJhbiAoJSBvZiB1cmJhbiBwb3B1bGF0aW9uIHdpdGggYWNjZXNzKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiQWNjZXNzIHRvIGltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcywgdXJiYW4sIHJlZmVycyB0byB0aGUgcGVyY2VudGFnZSBvZiB0aGUgdXJiYW4gcG9wdWxhdGlvbiB1c2luZyBpbXByb3ZlZCBzYW5pdGF0aW9uIGZhY2lsaXRpZXMuIEltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcyBhcmUgbGlrZWx5IHRvIGVuc3VyZSBoeWdpZW5pYyBzZXBhcmF0aW9uIG9mIGh1bWFuIGV4Y3JldGEgZnJvbSBodW1hbiBjb250YWN0LiBUaGV5IGluY2x1ZGUgZmx1c2hcXC9wb3VyIGZsdXNoICh0byBwaXBlZCBzZXdlciBzeXN0ZW0sIHNlcHRpYyB0YW5rLCBwaXQgbGF0cmluZSksIHZlbnRpbGF0ZWQgaW1wcm92ZWQgcGl0IChWSVApIGxhdHJpbmUsIHBpdCBsYXRyaW5lIHdpdGggc2xhYiwgYW5kIGNvbXBvc3RpbmcgdG9pbGV0LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJJQy5GUk0uT0JTLk9CU1Q0XCIsXCJuYW1lXCI6XCJQZXJjZW50IG9mIGZpcm1zIGNob29zaW5nIGNvcnJ1cHRpb24gYXMgdGhlaXIgYmlnZ2VzdCBvYnN0YWNsZVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiUGVyY2VudCBvZiBmaXJtcyB0aGF0IGNob3NlIGNvcnJ1cHRpb24gYXMgdGhlIGJpZ2dlc3Qgb2JzdGFjbGUgZmFjZWQgYnkgdGhpcyBlc3RhYmxpc2htZW50LiAgKFN1cnZleSByZXNwb25kZW50cyB3ZXJlIHByZXNlbnRlZCB3aXRoIGEgbGlzdCBvZiAxNSBwb3RlbnRpYWwgb2JzdGFjbGVzLikgICBTb3VyY2U6V29ybGQgQmFuaywgRW50ZXJwcmlzZSBTdXJ2ZXlzIFByb2plY3QoaHR0cDpcXC9cXC93d3cuZW50ZXJwcmlzZXN1cnZleXMub3JnXFwvQ3VzdG9tUXVlcnkpLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJHVi5USS5TQ09SLklEWFwiLFwibmFtZVwiOlwiQ29ycnVwdGlvbiBQZXJjZXB0aW9ucyBJbmRleCAoc2NvcmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGlzIGluZm9ybWF0aW9uIGlzIGZyb20gdGhlIGh0dHA6XFwvXFwvd3d3LnRyYW5zcGFyZW5jeS5vcmcgVHJhbnNwYXJlbmN5IEludGVybmF0aW9uYWwgd2ViIHNpdGUuICBNb3JlIGluZm9ybWF0aW9uIG1heSBiZSBhdmFpbGFibGUgdGhlcmUuICBDUEkgU2NvcmUgcmVsYXRlcyB0byBwZXJjZXB0aW9ucyBvZiB0aGUgZGVncmVlIG9mIGNvcnJ1cHRpb24gYXMgc2VlbiBieSBidXNpbmVzcyBwZW9wbGUgYW5kIGNvdW50cnkgYW5hbHlzdHMsIGFuZCByYW5nZXMgYmV0d2VlbiAwIChoaWdobHkgY29ycnVwdCkgYW5kIDEwIChoaWdobHkgY2xlYW4pLiAgRGF0YSBmb3IgMjAxMiBDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IHNjb3JlcyBjb3VudHJpZXMgb24gYSBzY2FsZSBmcm9tIDAgKGhpZ2hseSBjb3JydXB0KSB0byAxMDAgKHZlcnkgY2xlYW4pLiAgQ29uZmlkZW5jZSByYW5nZSBwcm92aWRlcyBhIHJhbmdlIG9mIHBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgQ1BJIHNjb3JlLiBUaGlzIHJlZmxlY3RzIGhvdyBhIGNvdW50cnkncyBzY29yZSBtYXkgdmFyeSwgZGVwZW5kaW5nIG9uIG1lYXN1cmVtZW50IHByZWNpc2lvbi4gTm9taW5hbGx5LCB3aXRoIDUgcGVyY2VudCBwcm9iYWJpbGl0eSB0aGUgc2NvcmUgaXMgYWJvdmUgdGhpcyByYW5nZSBhbmQgd2l0aCBhbm90aGVyIDUgcGVyY2VudCBpdCBpcyBiZWxvdy5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiSUMuRlJNLkNPUlIuR1JBRlQyXCIsXCJuYW1lXCI6XCJCcmliZXJ5IGluZGV4ICglIG9mIGdpZnQgb3IgaW5mb3JtYWwgcGF5bWVudCByZXF1ZXN0cyBkdXJpbmcgcHVibGljIHRyYW5zYWN0aW9ucylcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIkJyaWJlcnkgaW5kZXggaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgZ2lmdCBvciBpbmZvcm1hbCBwYXltZW50IHJlcXVlc3RzIGR1cmluZyA2IGluZnJhc3RydWN0dXJlLCBwZXJtaXRzIGFuZCBsaWNlbmNlcywgYW5kIHRheCB0cmFuc2FjdGlvbnMuICAgU291cmNlOldvcmxkIEJhbmssIEVudGVycHJpc2UgU3VydmV5cyBQcm9qZWN0KGh0dHA6XFwvXFwvd3d3LmVudGVycHJpc2VzdXJ2ZXlzLm9yZ1xcL0RhdGFcXC9FeHBsb3JlVG9waWNzXFwvY29ycnVwdGlvbikuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIkhPVS5FTEMuQUNTTi5aU1wiLFwibmFtZVwiOlwiSG91c2Vob2xkIEFjY2VzcyB0byBFbGVjdHJpY2l0eTogVG90YWwgKGluICUgb2YgdG90YWwgaG91c2Vob2xkKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJGWC5PV04uVE9UTC5aU1wiLFwibmFtZVwiOlwiQWNjb3VudCBvd25lcnNoaXAgYXQgYSBmaW5hbmNpYWwgaW5zdGl0dXRpb24gb3Igd2l0aCBhIG1vYmlsZS1tb25leS1zZXJ2aWNlIHByb3ZpZGVyICglIG9mIHBvcHVsYXRpb24gYWdlcyAxNSspXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJBY2NvdW50IGRlbm90ZXMgdGhlIHBlcmNlbnRhZ2Ugb2YgcmVzcG9uZGVudHMgd2hvIHJlcG9ydCBoYXZpbmcgYW4gYWNjb3VudCAoYnkgdGhlbXNlbHZlcyBvciB0b2dldGhlciB3aXRoIHNvbWVvbmUgZWxzZSkgYXQgYSBiYW5rIG9yIGFub3RoZXIgdHlwZSBvZiBmaW5hbmNpYWwgaW5zdGl0dXRpb24gb3IgcmVwb3J0IHBlcnNvbmFsbHkgdXNpbmcgYSBtb2JpbGUgbW9uZXkgc2VydmljZSBpbiB0aGUgcGFzdCAxMiBtb250aHMgKCUgYWdlIDE1KykuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILlNUQS5BQ0NILlpTXCIsXCJuYW1lXCI6XCJIZWFsdGggY2FyZSAoJSBvZiBwb3B1bGF0aW9uIHdpdGggYWNjZXNzKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILlNUQS5CQVNTLlpTXCIsXCJuYW1lXCI6XCJQZW9wbGUgdXNpbmcgYXQgbGVhc3QgYmFzaWMgc2FuaXRhdGlvbiBzZXJ2aWNlcyAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiVGhlIHBlcmNlbnRhZ2Ugb2YgcGVvcGxlIHVzaW5nIGF0IGxlYXN0IGJhc2ljIHNhbml0YXRpb24gc2VydmljZXMsIHRoYXQgaXMsIGltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcyB0aGF0IGFyZSBub3Qgc2hhcmVkIHdpdGggb3RoZXIgaG91c2Vob2xkcy4gIFRoaXMgaW5kaWNhdG9yIGVuY29tcGFzc2VzIGJvdGggcGVvcGxlIHVzaW5nIGJhc2ljIHNhbml0YXRpb24gc2VydmljZXMgYXMgd2VsbCBhcyB0aG9zZSB1c2luZyBzYWZlbHkgbWFuYWdlZCBzYW5pdGF0aW9uIHNlcnZpY2VzLiAgIEltcHJvdmVkIHNhbml0YXRpb24gZmFjaWxpdGllcyBpbmNsdWRlIGZsdXNoXFwvcG91ciBmbHVzaCB0byBwaXBlZCBzZXdlciBzeXN0ZW1zLCBzZXB0aWMgdGFua3Mgb3IgcGl0IGxhdHJpbmVzOyB2ZW50aWxhdGVkIGltcHJvdmVkIHBpdCBsYXRyaW5lcywgY29tcG9zaXRpbmcgdG9pbGV0cyBvciBwaXQgbGF0cmluZXMgd2l0aCBzbGFicy5cIlxyXG59LFxyXG57XHJcblwiaWRcIjpcIlNJLlBPVi4yNURBWVwiLFwibmFtZVwiOlwiUG92ZXJ0eSBoZWFkY291bnQgcmF0aW8gYXQgJDIuNSBhIGRheSAoUFBQKSAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIlBvcHVsYXRpb24gYmVsb3cgJDIuNSBhIGRheSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgcG9wdWxhdGlvbiBsaXZpbmcgb24gbGVzcyB0aGFuICQyLjUgYSBkYXkgYXQgMjAwNSBpbnRlcm5hdGlvbmFsIHByaWNlcy4gXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNJLlBPVi5OQVBSLlpTXCIsXCJuYW1lXCI6XCJQb3ZlcnR5IFJhdGUgKGluICUgb2YgcG9wdWxhdGlvbilcIixcInNvdXJjZU5vdGVcIjpcIlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSS5QT1YuTkFIQ1wiLFwibmFtZVwiOlwiUG92ZXJ0eSBoZWFkY291bnQgcmF0aW8gYXQgbmF0aW9uYWwgcG92ZXJ0eSBsaW5lcyAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiTmF0aW9uYWwgcG92ZXJ0eSBoZWFkY291bnQgcmF0aW8gaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHBvcHVsYXRpb24gbGl2aW5nIGJlbG93IHRoZSBuYXRpb25hbCBwb3ZlcnR5IGxpbmVzLiBOYXRpb25hbCBlc3RpbWF0ZXMgYXJlIGJhc2VkIG9uIHBvcHVsYXRpb24td2VpZ2h0ZWQgc3ViZ3JvdXAgZXN0aW1hdGVzIGZyb20gaG91c2Vob2xkIHN1cnZleXMuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILkFETS5JTlBUXCIsXCJuYW1lXCI6XCJJbnBhdGllbnQgYWRtaXNzaW9uIHJhdGUgKCUgb2YgcG9wdWxhdGlvbiApXCIsXCJzb3VyY2VOb3RlXCI6XCJcIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0guRFlOLkFJRFMuWlNcIixcIm5hbWVcIjpcIlByZXZhbGVuY2Ugb2YgSElWLCB0b3RhbCAoJSBvZiBwb3B1bGF0aW9uIGFnZXMgMTUtNDkpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJQcmV2YWxlbmNlIG9mIEhJViByZWZlcnMgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgcGVvcGxlIGFnZXMgMTUtNDkgd2hvIGFyZSBpbmZlY3RlZCB3aXRoIEhJVi5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU00uUE9QLlRPVEwuWlNcIixcIm5hbWVcIjpcIkludGVybmF0aW9uYWwgbWlncmFudCBzdG9jayAoJSBvZiBwb3B1bGF0aW9uKVwiLFxyXG4gIFwic291cmNlTm90ZVwiOmBJbnRlcm5hdGlvbmFsIG1pZ3JhbnQgc3RvY2sgaXMgdGhlIG51bWJlciBvZiBwZW9wbGUgYm9ybiBpbiBhIGNvdW50cnkgb3RoZXIgdGhhbiB0aGF0IGluIHdoaWNoIHRoZXkgbGl2ZS4gSXQgYWxzbyBpbmNsdWRlcyByZWZ1Z2Vlcy4gVGhlIGRhdGEgdXNlZCB0byBlc3RpbWF0ZSB0aGUgaW50ZXJuYXRpb25hbCBtaWdyYW50IHN0b2NrIGF0IGEgcGFydGljdWxhciB0aW1lIGFyZSBvYnRhaW5lZCBtYWlubHkgZnJvbSBwb3B1bGF0aW9uIGNlbnN1c2VzLiBUaGUgZXN0aW1hdGVzIGFyZSBkZXJpdmVkIGZyb20gdGhlIGRhdGEgb24gZm9yZWlnbi1ib3JuIHBvcHVsYXRpb24tLXBlb3BsZSB3aG8gaGF2ZSByZXNpZGVuY2UgaW4gb25lIGNvdW50cnkgYnV0IHdlcmUgYm9ybiBpbiBhbm90aGVyIGNvdW50cnkuIFdoZW4gZGF0YSBvbiB0aGUgZm9yZWlnbi1ib3JuIHBvcHVsYXRpb24gYXJlIG5vdCBhdmFpbGFibGUsIGRhdGEgb24gZm9yZWlnbiBwb3B1bGF0aW9uLS10aGF0IGlzLCBwZW9wbGUgd2hvIGFyZSBjaXRpemVucyBvZiBhIGNvdW50cnkgb3RoZXIgdGhhbiB0aGUgY291bnRyeSBpbiB3aGljaCB0aGV5IHJlc2lkZS0tYXJlIHVzZWQgYXMgZXN0aW1hdGVzLiBBZnRlciB0aGUgYnJlYWt1cCBvZiB0aGUgU292aWV0IFVuaW9uIGluIDE5OTEgcGVvcGxlIGxpdmluZyBpbiBvbmUgb2YgdGhlIG5ld2x5IGluZGVwZW5kZW50IGNvdW50cmllcyB3aG8gd2VyZSBib3JuIGluIGFub3RoZXIgd2VyZSBjbGFzc2lmaWVkIGFzIGludGVybmF0aW9uYWwgbWlncmFudHMuIEVzdGltYXRlcyBvZiBtaWdyYW50IHN0b2NrIGluIHRoZSBuZXdseSBpbmRlcGVuZGVudCBzdGF0ZXMgZnJvbSAxOTkwIG9uIGFyZSBiYXNlZCBvbiB0aGUgMTk4OSBjZW5zdXMgb2YgdGhlIFNvdmlldCBVbmlvbi4gRm9yIGNvdW50cmllcyB3aXRoIGluZm9ybWF0aW9uIG9uIHRoZSBpbnRlcm5hdGlvbmFsIG1pZ3JhbnQgc3RvY2sgZm9yIGF0IGxlYXN0IHR3byBwb2ludHMgaW4gdGltZSwgaW50ZXJwb2xhdGlvbiBvciBleHRyYXBvbGF0aW9uIHdhcyB1c2VkIHRvIGVzdGltYXRlIHRoZSBpbnRlcm5hdGlvbmFsIG1pZ3JhbnQgc3RvY2sgb24gSnVseSAxIG9mIHRoZSByZWZlcmVuY2UgeWVhcnMuIEZvciBjb3VudHJpZXMgd2l0aCBvbmx5IG9uZSBvYnNlcnZhdGlvbiwgZXN0aW1hdGVzIGZvciB0aGUgcmVmZXJlbmNlIHllYXJzIHdlcmUgZGVyaXZlZCB1c2luZyByYXRlcyBvZiBjaGFuZ2UgaW4gdGhlIG1pZ3JhbnQgc3RvY2sgaW4gdGhlIHllYXJzIHByZWNlZGluZyBvciBmb2xsb3dpbmcgdGhlIHNpbmdsZSBvYnNlcnZhdGlvbiBhdmFpbGFibGUuIEEgbW9kZWwgd2FzIHVzZWQgdG8gZXN0aW1hdGUgbWlncmFudHMgZm9yIGNvdW50cmllcyB0aGF0IGhhZCBubyBkYXRhLmBcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNOLklUSy5ERUZDLlpTXCIsXCJuYW1lXCI6XCJQcmV2YWxlbmNlIG9mIHVuZGVybm91cmlzaG1lbnQgKCUgb2YgcG9wdWxhdGlvbilcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlBvcHVsYXRpb24gYmVsb3cgbWluaW11bSBsZXZlbCBvZiBkaWV0YXJ5IGVuZXJneSBjb25zdW1wdGlvbiAoYWxzbyByZWZlcnJlZCB0byBhcyBwcmV2YWxlbmNlIG9mIHVuZGVybm91cmlzaG1lbnQpIHNob3dzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBwb3B1bGF0aW9uIHdob3NlIGZvb2QgaW50YWtlIGlzIGluc3VmZmljaWVudCB0byBtZWV0IGRpZXRhcnkgZW5lcmd5IHJlcXVpcmVtZW50cyBjb250aW51b3VzbHkuIERhdGEgc2hvd2luZyBhcyA1IG1heSBzaWduaWZ5IGEgcHJldmFsZW5jZSBvZiB1bmRlcm5vdXJpc2htZW50IGJlbG93IDUlLlwiLFwic291cmNlT3JnYW5pemF0aW9uXCI6XCJGb29kIGFuZCBBZ3JpY3VsdHVyZSBPcmdhbml6YXRpb24gKGh0dHA6XFwvXFwvd3d3LmZhby5vcmdcXC9wdWJsaWNhdGlvbnNcXC9lblxcLykuXCJcclxufSxcclxue1xyXG4gIFwiaWRcIjpcIlNILlNUQS5PREZDLlpTXCIsXCJuYW1lXCI6XCJQZW9wbGUgcHJhY3RpY2luZyBvcGVuIGRlZmVjYXRpb24gKCUgb2YgcG9wdWxhdGlvbilcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJQZW9wbGUgcHJhY3RpY2luZyBvcGVuIGRlZmVjYXRpb24gcmVmZXJzIHRvIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBwb3B1bGF0aW9uIGRlZmVjYXRpbmcgaW4gdGhlIG9wZW4sIHN1Y2ggYXMgaW4gZmllbGRzLCBmb3Jlc3QsIGJ1c2hlcywgb3BlbiBib2RpZXMgb2Ygd2F0ZXIsIG9uIGJlYWNoZXMsIGluIG90aGVyIG9wZW4gc3BhY2VzIG9yIGRpc3Bvc2VkIG9mIHdpdGggc29saWQgd2FzdGUuXCJcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5dXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIl19
