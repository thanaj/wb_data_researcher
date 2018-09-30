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
    console.log('oncomplete transction', event);
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
    console.log('addRequest complete', event);
    promiseFn.resolve(event);
  };
  addRequest.onerror = function (event) {
    console.log('addRequest error', event);
    console.log('addRequest onerror', event.target.error);
    promiseFn.reject(event);
  };
  /*
  query.onerror = function(event) {
    console.log('query error',event)
    promiseFn.reject(event)
    //return result;
  };
  query.onsuccess = function(event) {
    console.log('query sukces',event)
    result = event.target.result
    promiseFn.resolve(result)
    //return result;
  };
  */
}

function requestOpenDb(promiseFn) {
  console.log(promiseFn);
  var indexedDb = window.indexedDB;
  var request = void 0;
  if (indexedDb) {
    var _request = indexedDb.open(_variables2.default.IND_DB_STORE_NAME);
    _request.onupgradeneeded = function (event) {
      console.log('request onupgradeneeded', event);
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
      console.log('request onsuccess', event);
      return addRecord(event, dataToBeAdd, promiseObj);
    };
  });
};

obj = {
  addData: addData
};

exports.default = obj;

},{"./helper.js":6,"./variables.js":8}],2:[function(require,module,exports){
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

},{"./getCountries.js":5,"./helper.js":6,"./variables.js":8}],3:[function(require,module,exports){
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

},{"./variables.js":8}],4:[function(require,module,exports){
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

},{"./variables.js":8}],5:[function(require,module,exports){
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
  var promise = (0, _helper2.default)(url);
  promise.then(function (data) {
    data = JSON.parse(data);
    _buildTable2.default.buildTable(data);
    _canvas2.default.visualizeData(data);
  }).catch(function (error) {
    console.log('Error with getting data from wb api', error);
  });
}

function getCountries(countries) {
  countries = JSON.parse(countries);
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
  //console.log(countryListLink)
  var promis = _readData2.default.readData(_variables2.default.IND_DB_COUNTRY_LIST);
  //console.log(promis)
  promis.then(function (data) {
    //console.log('data', data, promis);
    ifdataExist(data);
  }).catch(function (error) {
    console.log('error reading data', error);
  });
}

function ifdataExist(data) {
  if (!data) {
    console.log('dane z sieci');
    var countryList = getCountryList();
  } else {
    console.log('dane z bazy');
    getCountries(data.data);
  }
  getIndicators();
}

function getCountryList() {
  var countryList = (0, _helper2.default)(_variables2.default.COUNTRY_LIST_LINK);
  //console.log('countryList:', countryList);
  countryList.then(function (data) {
    //console.log('dataCountryList', data);
    getCountries(data);

    var dataToSave = { query: _variables2.default.IND_DB_COUNTRY_LIST, data: data };
    _addDataDB2.default.addData(dataToSave);
  }).catch(function (error) {
    console.log('dataCountryList dupa zbita', error);
  });
  return countryList;
}

obj = {
  init: init
};

exports.default = obj;

},{"./addDataDB.js":1,"./buildTable.js":3,"./canvas.js":4,"./helper.js":6,"./readData.js":7,"./variables.js":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(url) {
  console.log('poszlo' + ': ' + url);
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

},{}],7:[function(require,module,exports){
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

},{"./helper.js":6,"./variables.js":8}],8:[function(require,module,exports){
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
}];

exports.default = obj;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2VzNi9hZGREYXRhREIuanMiLCJzY3JpcHRzL2VzNi9hcHAuanMiLCJzY3JpcHRzL2VzNi9idWlsZFRhYmxlLmpzIiwic2NyaXB0cy9lczYvY2FudmFzLmpzIiwic2NyaXB0cy9lczYvZ2V0Q291bnRyaWVzLmpzIiwic2NyaXB0cy9lczYvaGVscGVyLmpzIiwic2NyaXB0cy9lczYvcmVhZERhdGEuanMiLCJzY3JpcHRzL2VzNi92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE1BQU0sRUFBVjs7QUFFQSxTQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWlDLFNBQWpDLEVBQTJDLFNBQTNDLEVBQXNEO0FBQ3BELE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtBQUNBLE1BQUksY0FBYyxHQUFHLGlCQUFILENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLENBQWxCO0FBQ0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixFQUEzQixFQUE4QixTQUE5QixFQUF3QztBQUN0QyxNQUFJLGNBQWMsR0FBRyxXQUFILENBQWUsQ0FBQyxTQUFELENBQWYsRUFBNEIsV0FBNUIsQ0FBbEI7QUFDQSxjQUFZLFVBQVosR0FBeUIsVUFBUyxLQUFULEVBQWdCO0FBQ3ZDLFlBQVEsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEtBQXJDO0FBQ0QsR0FGRDtBQUdBLGNBQVksT0FBWixHQUFzQixVQUFTLEtBQVQsRUFBZ0I7QUFDcEMsWUFBUSxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7QUFDRCxHQUZEO0FBR0EsU0FBTyxXQUFQO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQXlCLFdBQXpCLEVBQXFDLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUksS0FBSyxNQUFNLE1BQU4sQ0FBYSxNQUF0QjtB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RixRQUFLLG1CQURILEVBQ3VCLFFBQU8saUVBRDlCO0FBRUYsZ0JBQWE7O0FBRlgsQ0F0SmUsRUEySmpCO0FBQ0UsUUFBSyxtQkFEUCxFQUMyQixRQUFPLGlHQURsQztBQUVFLGdCQUFhO0FBRmYsQ0EzSmlCLEVBK0pqQjtBQUNBLFFBQUssc0JBREwsRUFDNEIsUUFBTyxrR0FEbkM7QUFFQSxnQkFBYTtBQUZiLENBL0ppQixFQW1LakI7QUFDRSxRQUFLLG1CQURQLEVBQzJCLFFBQU8sd0ZBRGxDO0FBRUUsZ0JBQWE7QUFGZixDQW5LaUIsRUF1S2pCO0FBQ0UsUUFBSyxzQkFEUCxFQUM4QixRQUFPLGdHQURyQztBQUVFLGdCQUFhO0FBRmYsQ0F2S2lCLEVBMktqQjtBQUNFLFFBQUssbUJBRFAsRUFDMkIsUUFBTyx5RUFEbEM7QUFFRSxnQkFBYTtBQUZmLENBM0tpQixFQStLakI7QUFDRSxRQUFLLG1CQURQLEVBQzJCLFFBQU8sd0VBRGxDO0FBRUUsZ0JBQWE7QUFGZixDQS9LaUIsQ0FBakI7O2tCQXVMZSxHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgZGVmYXVsdCBhcyBnZXQgfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKSB7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSwgY29uZmlnT2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVHJhbnNhY3Rpb24oZGIsc3RvcmVOYW1lKXtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihbc3RvcmVOYW1lXSwgXCJyZWFkd3JpdGVcIik7XHJcbiAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnb25jb21wbGV0ZSB0cmFuc2N0aW9uJywgZXZlbnQpO1xyXG4gIH07XHJcbiAgdHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnb25lcnJvciB0cmFuc2N0aW9uJywgZXZlbnQpXHJcbiAgfTtcclxuICByZXR1cm4gdHJhbnNhY3Rpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlY29yZChldmVudCxkYXRhVG9CZUFkZCxwcm9taXNlRm4gKXtcclxuICBsZXQgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcbiAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuXHJcbiAgLy9sZXQgcXVlcnkgPSBvYmplY3RTdG9yZS5nZXQobG9va2VkVmFsdWUpXHJcbiAgbGV0IHJlc3VsdDtcclxuXHJcbiAgbGV0IG9iamVjdFN0b3JlMSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHZhcmlhYmxlcy5JTkRfREJfU1RPUkVfTkFNRSk7XHJcbiAgbGV0IGFkZFJlcXVlc3QgPSBvYmplY3RTdG9yZTEuYWRkKGRhdGFUb0JlQWRkKTtcclxuICBhZGRSZXF1ZXN0Lm9uY29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ2FkZFJlcXVlc3QgY29tcGxldGUnLCBldmVudClcclxuICAgIHByb21pc2VGbi5yZXNvbHZlKGV2ZW50KVxyXG4gIH07XHJcbiAgYWRkUmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdhZGRSZXF1ZXN0IGVycm9yJywgZXZlbnQpXHJcbiAgICBjb25zb2xlLmxvZygnYWRkUmVxdWVzdCBvbmVycm9yJyxldmVudC50YXJnZXQuZXJyb3IpXHJcbiAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gIH07XHJcbiAgLypcclxuICBxdWVyeS5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdxdWVyeSBlcnJvcicsZXZlbnQpXHJcbiAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgLy9yZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbiAgcXVlcnkub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdxdWVyeSBzdWtjZXMnLGV2ZW50KVxyXG4gICAgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gICAgcHJvbWlzZUZuLnJlc29sdmUocmVzdWx0KVxyXG4gICAgLy9yZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbiAgKi9cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcXVlc3RPcGVuRGIocHJvbWlzZUZuKXtcclxuICBjb25zb2xlLmxvZyhwcm9taXNlRm4pXHJcbiAgbGV0IGluZGV4ZWREYiA9IHdpbmRvdy5pbmRleGVkREI7XHJcbiAgbGV0IHJlcXVlc3Q7XHJcbiAgaWYoaW5kZXhlZERiKXtcclxuICAgIGxldCByZXF1ZXN0ID0gaW5kZXhlZERiLm9wZW4odmFyaWFibGVzLklORF9EQl9TVE9SRV9OQU1FKTtcclxuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3Qgb251cGdyYWRlbmVlZGVkJywgZXZlbnQpO1xyXG4gICAgICBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25ibG9ja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYmxvY2tlZCcsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IG9uZXJyb3InLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGREYXRhKGRhdGFUb0JlQWRkKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgIGxldCBwcm9taXNlT2JqID0ge3Jlc29sdmUscmVqZWN0fTtcclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IHJlcXVlc3RPcGVuRGIocHJvbWlzZU9iailcclxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3Qgb25zdWNjZXNzJywgZXZlbnQpXHJcbiAgICAgIHJldHVybiBhZGRSZWNvcmQoZXZlbnQsZGF0YVRvQmVBZGQsIHByb21pc2VPYmopXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgfSlcclxuXHJcbn07XHJcblxyXG5cclxub2JqID0ge1xyXG4gIGFkZERhdGFcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQge2RlZmF1bHQgYXMgZ2V0fSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YXJpYWJsZXN9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGdldENvdW50cmllc30gZnJvbSAnLi9nZXRDb3VudHJpZXMuanMnO1xyXG5cclxuZ2V0Q291bnRyaWVzLmluaXQoKVxyXG5cclxuXHJcbi8qXHJcbnNwcmF3ZMW6IGN6eSBqZXN0IGJhemFcclxuc3ByYXdkxbwgY3p5IGxpc3RhIHBhxYRzdHcgamVzdCBuYSBiYXppZVxyXG5qZcWbbGkgamVzdCB0byBqxIUgcG9iaWVyelxyXG5qZcWbbGkgbmllIG1hIHRvIHBvYmllcnogeiBuZXR1XHJcbmkgemFwaXN6IGphIG5hIGJhemllXHJcblxyXG5cclxuXHJcblxyXG5cclxuKi9cclxuIiwiaW1wb3J0IHsgIGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5sZXQgb2JqID0ge31cclxubGV0IGdkcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkdEUF9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxuZnVuY3Rpb24gYnVpbGRUYWJsZShkYXRhKSB7XHJcbiAgaWYgKGdkcENvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgIGdkcENvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xyXG4gIH1cclxuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUQUJMRScpXHJcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJylcclxuICBsZXQgeWVhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJylcclxuICB5ZWFyLmlubmVySFRNTCA9ICd5ZWFyJ1xyXG4gIGxldCB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJylcclxuICB2YWx1ZS5pbm5lckhUTUwgPSAndmFsdWUnXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHllYXIpXHJcbiAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHZhbHVlKVxyXG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XHJcbiAgZGF0YSA9IGRhdGFbMV1cclxuICAvL2NvbnNvbGUubG9nKCdkYW5lJyArIGRhdGEpXHJcbiAgaWYoZGF0YSl7XHJcbiAgICBsZXQgeWVhckRhdGE7XHJcbiAgICBsZXQgdmFsdWVEYXRhO1xyXG4gICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBsZXQgZGF0YVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJylcclxuICAgICAgeWVhckRhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpXHJcbiAgICAgIHZhbHVlRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJylcclxuICAgICAgLy9jb25zb2xlLmxvZygnZGFuZScsaXRlbS5jb3VudHJ5LmRhdGUsIGl0ZW0uY291bnRyeS52YWx1ZSlcclxuXHJcbiAgICAgIHllYXJEYXRhLmlubmVySFRNTCA9IGl0ZW0uZGF0ZVxyXG4gICAgICB5ZWFyRGF0YS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3llYXInKVxyXG4gICAgICBkYXRhUm93LmFwcGVuZENoaWxkKHllYXJEYXRhKVxyXG4gICAgICB2YWx1ZURhdGEuaW5uZXJIVE1MID0gTnVtYmVyKGl0ZW0udmFsdWUpLnRvRml4ZWQoMilcclxuICAgICAgZGF0YVJvdy5hcHBlbmRDaGlsZCh2YWx1ZURhdGEpXHJcbiAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRhdGFSb3cpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGl0ZW0uZGF0ZSlcclxuICAgIH0pXHJcblxyXG4gICAgZ2RwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbm9iaiA9IHtcclxuICBidWlsZFRhYmxlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiaW1wb3J0IHsgIGRlZmF1bHQgYXMgdmFyaWFibGVzIH0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxudmFyaWFibGVzLlZJU1VBTElaQVRJT05fU0VMRUNUT1JcclxuXHJcblxyXG5cclxubGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLlZJU1VBTElaQVRJT05fU0VMRUNUT1IpXHJcblxyXG5mdW5jdGlvbiB2aXN1YWxpemVEYXRhKGRhdGEpIHtcclxuICBkYXRhID0gZGF0YVsxXVxyXG4gIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgaWYoZGF0YSl7XHJcbiAgICBsZXQgbWluWWVhciA9IE1hdGgubWluKCAuLi5kYXRhLm1hcChpdGVtPT4gaXRlbS5kYXRlKSlcclxuICAgIGxldCBtYXhZZWFyID1NYXRoLm1heCggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0uZGF0ZSkpXHJcbiAgICBsZXQgbWluVmFsID0gTWF0aC5taW4oIC4uLmRhdGEubWFwKGl0ZW09PiBpdGVtLnZhbHVlKSlcclxuICAgIGxldCBtYXhWYWwgPSBNYXRoLm1heCggLi4uZGF0YS5tYXAoaXRlbT0+IGl0ZW0udmFsdWUpKVxyXG4gICAgbGV0IHllYXJVbml0ID0gNDAwLyhtYXhZZWFyLW1pblllYXIpXHJcbiAgICBsZXQgdmFsdWVVbml0ID0gMjAwLyhtYXhWYWwtbWluVmFsKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCd5ZWFyVW5pdCx2YWx1ZVVuaXQnK21pblllYXIsbWF4WWVhcix5ZWFyVW5pdCx2YWx1ZVVuaXQpXHJcblxyXG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGU9XCJyZWRcIjtcclxuICAgIGN0eC5saW5lV2lkdGg9NTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5tb3ZlVG8oMCwgMzAwKTtcclxuICAgIGxldCB4PXllYXJVbml0OztcclxuICAgIGxldCB5PXllYXJVbml0O1xyXG4gICAgZGF0YS5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgLy94PXllYXJVbml0Kml0ZW0uZGF0ZVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHZhbHVlVW5pdCxpdGVtLnZhbHVlKVxyXG4gICAgICB5ID0gKDIwMCAqIGl0ZW0udmFsdWUpL21heFZhbDtcclxuICAgICAgY29uc29sZS5sb2coJ3hpeScgKyB4LHkpXHJcbiAgICAgIGN0eC5saW5lVG8oeCwgeSk7XHJcbiAgICAgIHg9eCsgeWVhclVuaXRcclxuICAgICAgeT0wXHJcbiAgICB9KVxyXG4gICAgLy9jdHgubGluZVRvKDIwMCwgMTAwKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKGNhbnZhcylcclxuICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBvYmogPSB7dmlzdWFsaXplRGF0YX1cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIGdldH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgdmFyaWFibGVzXHJcbn0gZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gIGRlZmF1bHQgYXMgYnVpbGRUYWJsZVxyXG59IGZyb20gJy4vYnVpbGRUYWJsZS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBjYW52YXNcclxufSBmcm9tICcuL2NhbnZhcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyByZWFkRGF0YURCXHJcbn0gZnJvbSAnLi9yZWFkRGF0YS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdCBhcyBhZGREYXRhREJcclxufSBmcm9tICcuL2FkZERhdGFEQi5qcyc7XHJcbmxldCBvYmogPSB7fVxyXG5cclxuXHJcbmxldCBzZWxlY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5TRUxFQ1RfQ09VTlRSWV9TRUxFQ1RPUik7XHJcbmxldCBjb3VudHJ5TGlzdExpbmsgPSB2YXJpYWJsZXMuQ09VTlRSWV9MSVNUX0xJTks7XHJcbmxldCBnZHBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5HRFBfQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxubGV0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpO1xyXG5sZXQgc2VsZWN0SW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJyk7XHJcbmxldCBnZXREYXRhQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuR0VUX0RBVEFfQlROKTtcclxubGV0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5ERVNDUklQVElPTl9TRUxFQ1RPUik7XHJcblxyXG5nZXREYXRhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0RGF0YSlcclxuXHJcbnNlbGVjdEluZGljYXRvci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRJbmRpY2F0b3JEZXNjcmlwdGlvbik7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0SW5kaWNhdG9yRGVzY3JpcHRpb24oKSB7XHJcbiAgZGVzY3JpcHRpb25GaWVsZC5pbm5lckhUTUwgPSBldmVudC50YXJnZXQub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtc291cmNlbm90ZScpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGEoKSB7XHJcbiAgbGV0IHVybCA9IGBodHRwOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyaWVzLyR7c2VsZWN0LnZhbHVlfS9pbmRpY2F0b3JzLyR7c2VsZWN0SW5kaWNhdG9yLnZhbHVlfT9mb3JtYXQ9anNvbmBcclxuICBsZXQgcHJvbWlzZSA9IGdldCh1cmwpO1xyXG4gIHByb21pc2UudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgIGJ1aWxkVGFibGUuYnVpbGRUYWJsZShkYXRhKTtcclxuICAgIGNhbnZhcy52aXN1YWxpemVEYXRhKGRhdGEpXHJcblxyXG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRXJyb3Igd2l0aCBnZXR0aW5nIGRhdGEgZnJvbSB3YiBhcGknLGVycm9yKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb3VudHJpZXMoY291bnRyaWVzKSB7XHJcbiAgY291bnRyaWVzID0gSlNPTi5wYXJzZShjb3VudHJpZXMpXHJcbiAgbGV0IG9wdGlvbjtcclxuICBjb3VudHJpZXNbMV0uZm9yRWFjaChpdGVtID0+IHtcclxuICAgIC8vY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKVxyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpdGVtLmlkKVxyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnbGFiZWwnLCBpdGVtLm5hbWUpXHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9KVxyXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JzKCkge1xyXG4gIGxldCBvcHRpb247XHJcbiAgdmFyaWFibGVzLklORElDQVRPUlMuZm9yRWFjaChpbmRpY2F0b3IgPT4ge1xyXG4gICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGluZGljYXRvci5pZClcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2xhYmVsJywgaW5kaWNhdG9yLm5hbWUpXHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1zb3VyY2VOb3RlJywgaW5kaWNhdG9yLnNvdXJjZU5vdGUpXHJcbiAgICBzZWxlY3RJbmRpY2F0b3IuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9KVxyXG5cclxuICBzZWxlY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0SW5kaWNhdG9yKTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIC8vY29uc29sZS5sb2coY291bnRyeUxpc3RMaW5rKVxyXG4gIGxldCBwcm9taXMgPSByZWFkRGF0YURCLnJlYWREYXRhKHZhcmlhYmxlcy5JTkRfREJfQ09VTlRSWV9MSVNUKTtcclxuICAvL2NvbnNvbGUubG9nKHByb21pcylcclxuICBwcm9taXMudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdkYXRhJywgZGF0YSwgcHJvbWlzKTtcclxuICAgICAgaWZkYXRhRXhpc3QoZGF0YSk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnZXJyb3IgcmVhZGluZyBkYXRhJywgZXJyb3IpXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlmZGF0YUV4aXN0KGRhdGEpIHtcclxuICBpZiAoIWRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKCdkYW5lIHogc2llY2knKVxyXG4gICAgbGV0IGNvdW50cnlMaXN0ID0gZ2V0Q291bnRyeUxpc3QoKTtcclxuICB9IGVsc2V7XHJcbiAgICBjb25zb2xlLmxvZygnZGFuZSB6IGJhenknKVxyXG4gICAgZ2V0Q291bnRyaWVzKGRhdGEuZGF0YSlcclxuICB9XHJcbiAgZ2V0SW5kaWNhdG9ycygpXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRDb3VudHJ5TGlzdCgpIHtcclxuICBsZXQgY291bnRyeUxpc3QgPSBnZXQodmFyaWFibGVzLkNPVU5UUllfTElTVF9MSU5LKTtcclxuICAvL2NvbnNvbGUubG9nKCdjb3VudHJ5TGlzdDonLCBjb3VudHJ5TGlzdCk7XHJcbiAgY291bnRyeUxpc3QudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgLy9jb25zb2xlLmxvZygnZGF0YUNvdW50cnlMaXN0JywgZGF0YSk7XHJcbiAgICBnZXRDb3VudHJpZXMoZGF0YSlcclxuXHJcbiAgICBsZXQgZGF0YVRvU2F2ZSA9IHtxdWVyeTp2YXJpYWJsZXMuSU5EX0RCX0NPVU5UUllfTElTVCxkYXRhOmRhdGF9XHJcbiAgICBhZGREYXRhREIuYWRkRGF0YShkYXRhVG9TYXZlKVxyXG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2RhdGFDb3VudHJ5TGlzdCBkdXBhIHpiaXRhJywgZXJyb3IpXHJcbiAgfSlcclxuICByZXR1cm4gY291bnRyeUxpc3RcclxufVxyXG5cclxuXHJcbm9iaiA9IHtcclxuICBpbml0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0KHVybCl7XHJcbiAgY29uc29sZS5sb2coJ3Bvc3psbycgKyAnOiAnICsgdXJsKVxyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xyXG4gICAgeGh0dHAub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh4aHR0cC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh4aHR0cC5yZXNwb25zZSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoeGh0dHAuc3RhdHVzVGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHR0cC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJlamVjdCh4aHR0cC5zdGF0dXNUZXh0KVxyXG4gICAgfTtcclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9KVxyXG59XHJcbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgZ2V0IH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHZhcmlhYmxlcyB9IGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5sZXQga2V5UGF0aCA9ICdxdWVyeSc7XHJcbmxldCBzdG9yZU5hbWUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5sZXQgY29uZmlnT2JqID0geyBrZXlQYXRoOiAncXVlcnknfVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKSB7XHJcbiAgbGV0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSwgY29uZmlnT2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVHJhbnNhY3Rpb24oZGIsc3RvcmVOYW1lKXtcclxuICBsZXQgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihbc3RvcmVOYW1lXSwgKTtcclxuICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coJ29uY29tcGxldGUgdHJhbnNjdGlvbicsIGV2ZW50KTtcclxuICB9O1xyXG4gIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uZXJyb3IgdHJhbnNjdGlvbicsIGV2ZW50KVxyXG4gIH07XHJcbiAgcmV0dXJuIHRyYW5zYWN0aW9uO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFJlY29yZChldmVudCxsb29rZWRWYWx1ZSxwcm9taXNlRm4gKXtcclxuICBsZXQgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gIGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLHN0b3JlTmFtZSk7XHJcbiAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuICBsZXQgcXVlcnkgPSBvYmplY3RTdG9yZS5nZXQobG9va2VkVmFsdWUpXHJcbiAgbGV0IHJlc3VsdDtcclxuXHJcbiAgcXVlcnkub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygncXVlcnkgZXJyb3InLGV2ZW50KVxyXG4gICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIC8vcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG4gIHF1ZXJ5Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdxdWVyeSBzdWtjZXMnLGV2ZW50KVxyXG4gICAgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxyXG4gICAgcHJvbWlzZUZuLnJlc29sdmUocmVzdWx0KVxyXG4gICAgLy9yZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gcmVxdWVzdE9wZW5EYihwcm9taXNlRm4pe1xyXG4gIC8vY29uc29sZS5sb2cocHJvbWlzZUZuKVxyXG4gIGxldCBpbmRleGVkRGIgPSB3aW5kb3cuaW5kZXhlZERCO1xyXG4gIGxldCByZXF1ZXN0O1xyXG4gIGlmKGluZGV4ZWREYil7XHJcbiAgICBsZXQgcmVxdWVzdCA9IGluZGV4ZWREYi5vcGVuKHN0b3JlTmFtZSk7XHJcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3JlcXVlc3Qgb251cGdyYWRlbmVlZGVkJywgZXZlbnQpO1xyXG4gICAgICBjcmVhdGVPYmplY3RTdG9yZShldmVudCxzdG9yZU5hbWUsY29uZmlnT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25ibG9ja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYmxvY2tlZCcsIGV2ZW50KVxyXG4gICAgICBwcm9taXNlRm4ucmVqZWN0KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IG9uZXJyb3InLCBldmVudClcclxuICAgICAgcHJvbWlzZUZuLnJlamVjdChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWREYXRhKGxvb2tlZFZhbHVlKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgIGxldCBwcm9taXNlT2JqID0ge3Jlc29sdmUscmVqZWN0fTtcclxuICAgIGxldCByZXF1ZXN0ID0gcmVxdWVzdE9wZW5EYihwcm9taXNlT2JqKVxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdyZXF1ZXN0IG9uc3VjY2VzcycsIGV2ZW50KVxyXG4gICAgICByZXR1cm4gcmVhZFJlY29yZChldmVudCxsb29rZWRWYWx1ZSwgcHJvbWlzZU9iailcclxuICAgIH07XHJcbiAgfSlcclxufTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGF0YShrZXksdmFsdWUpIHtcclxuICBsZXQgaW5kZXhlZERiID0gd2luZG93LmluZGV4ZWREQlxyXG4gIGlmICghaW5kZXhlZERiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbm9iaiA9IHtcclxuICByZWFkRGF0YSxcclxuICBjcmVhdGVEYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiY29uc3Qgb2JqID0ge31cclxuXHJcblxyXG5sZXQga2V5UGF0aCA9ICdxdWVyeSc7XHJcbmxldCBzdG9yZU5hbWUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5sZXQgY29uZmlnT2JqID0geyBrZXlQYXRoOiAncXVlcnknfVxyXG5cclxub2JqLklORF9EQl9DT1VOVFJZX0xJU1QgPSAnY291bnRyeUxpc3QnXHJcbm9iai5JTkRfREJfS0VZX1BBVEggPSAncXVlcnknO1xyXG5vYmouSU5EX0RCX0NPTkZJR19PQkogPSB7IGtleVBhdGg6ICdxdWVyeSd9O1xyXG5vYmouSU5EX0RCX1NUT1JFX05BTUUgPSAnd29ybGQtYmFuay1kYXRhLXJlc2VhcmNoZXInO1xyXG5cclxub2JqLklORF9EQl9TVE9SRV9OQU1FID0gJ3dvcmxkLWJhbmstZGF0YS1yZXNlYXJjaGVyJztcclxub2JqLlNFTEVDVF9DT1VOVFJZX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInNlbGVjdC1jb250YWluZXJcIl0nO1xyXG5vYmouR0RQX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJnZHAtY29udGFpbmVyXCJdJztcclxub2JqLkNPVU5UUllfTElTVF9MSU5LID0gJ2h0dHBzOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyaWVzP2Zvcm1hdD1KU09OJnBlcl9wYWdlPTMwNSc7XHJcbi8vYGh0dHA6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJpZXMvJHtldmVudC50YXJnZXQudmFsdWV9L2luZGljYXRvcnMvTlkuR0RQLk1LVFAuQ0Q/Zm9ybWF0PWpzb25gXHJcbm9iai5JTkRJQ0FUT1JTX0xJTksgPSAnaHR0cDovL2FwaS53b3JsZGJhbmsub3JnL3YyL2luZGljYXRvcnM/Zm9ybWF0PWpzb24nO1xyXG5vYmouR0VUX0RBVEFfQlROID0gJ1tkYXRhLXRhcmdldD1cImdldC1kYXRhLWJ1dHRvblwiXSc7XHJcblxyXG5vYmouREVTQ1JJUFRJT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwiZGVzY3JpcHRpb24tY29udGFpbmVyXCJdJztcclxuXHJcbm9iai5WSVNVQUxJWkFUSU9OX1NFTEVDVE9SID0nW2RhdGEtdGFyZ2V0PVwidmlzdWFsaXNhdGlvbi1jb250YWluZXJcIl0nO1xyXG5cclxub2JqLklORElDQVRPUlMgPSBbe1xyXG4gICAgXCJpZFwiOiBcIk5ZLkFESi5BRURVLkdOLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBZGp1c3RlZCBzYXZpbmdzOiBlZHVjYXRpb24gZXhwZW5kaXR1cmUgKCUgb2YgR05JKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiRWR1Y2F0aW9uIGV4cGVuZGl0dXJlIHJlZmVycyB0byB0aGUgY3VycmVudCBvcGVyYXRpbmcgZXhwZW5kaXR1cmVzIGluIGVkdWNhdGlvbiwgaW5jbHVkaW5nIHdhZ2VzIGFuZCBzYWxhcmllcyBhbmQgZXhjbHVkaW5nIGNhcGl0YWwgaW52ZXN0bWVudHMgaW4gYnVpbGRpbmdzIGFuZCBlcXVpcG1lbnQuXCIsXHJcbiAgICBcInNvdXJjZU9yZ2FuaXphdGlvblwiOiBcIlVORVNDTzsgZGF0YSBhcmUgZXh0cmFwb2xhdGVkIHRvIHRoZSBtb3N0IHJlY2VudCB5ZWFyIGF2YWlsYWJsZVwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImcyMC50LnJlY2VpdmUuMVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmVjZWl2ZWQgZGlnaXRhbCBwYXltZW50cyBpbiB0aGUgcGFzdCB5ZWFyLCBtYWxlICglIGFnZSAxNSspXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJUaGUgcGVyY2VudGFnZSBvZiByZXNwb25kZW50cyB3aG8gcmVwb3J0IHVzaW5nIG1vYmlsZSBtb25leSwgYSBkZWJpdCBvciBjcmVkaXQgY2FyZCwgb3IgYSBtb2JpbGUgcGhvbmUgdG8gcmVjZWl2ZSBhIHBheW1lbnQgdGhyb3VnaCBhbiBhY2NvdW50IGluIHRoZSBwYXN0IDEyIG1vbnRocy4gSXQgYWxzbyBpbmNsdWRlcyByZXNwb25kZW50cyB3aG8gcmVwb3J0IHJlY2VpdmluZyByZW1pdHRhbmNlcywgcmVjZWl2aW5nIHBheW1lbnRzIGZvciBhZ3JpY3VsdHVyYWwgcHJvZHVjdHMsIHJlY2VpdmluZyBnb3Zlcm5tZW50IHRyYW5zZmVycywgcmVjZWl2aW5nIHdhZ2VzLCBvciByZWNlaXZpbmcgYSBwdWJsaWMgc2VjdG9yIHBlbnNpb24gZGlyZWN0bHkgaW50byBhIGZpbmFuY2lhbCBpbnN0aXR1dGlvbiBhY2NvdW50IG9yIHRocm91Z2ggYSBtb2JpbGUgbW9uZXkgYWNjb3VudCBpbiB0aGUgcGFzdCAxMiBtb250aHMsIG1hbGUgKCUgYWdlIDE1KykuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJOWS5HRFAuREVGTC5LRC5aRy5BRFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiSW5mbGF0aW9uLCBHRFAgZGVmbGF0b3I6IGxpbmtlZCBzZXJpZXMgKGFubnVhbCAlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiSW5mbGF0aW9uIGFzIG1lYXN1cmVkIGJ5IHRoZSBhbm51YWwgZ3Jvd3RoIHJhdGUgb2YgdGhlIEdEUCBpbXBsaWNpdCBkZWZsYXRvciBzaG93cyB0aGUgcmF0ZSBvZiBwcmljZSBjaGFuZ2UgaW4gdGhlIGVjb25vbXkgYXMgYSB3aG9sZS4gVGhpcyBzZXJpZXMgaGFzIGJlZW4gbGlua2VkIHRvIHByb2R1Y2UgYSBjb25zaXN0ZW50IHRpbWUgc2VyaWVzIHRvIGNvdW50ZXJhY3QgYnJlYWtzIGluIHNlcmllcyBvdmVyIHRpbWUgZHVlIHRvIGNoYW5nZXMgaW4gYmFzZSB5ZWFycywgc291cmNlIGRhdGEgYW5kIG1ldGhvZG9sb2dpZXMuIFRodXMsIGl0IG1heSBub3QgYmUgY29tcGFyYWJsZSB3aXRoIG90aGVyIG5hdGlvbmFsIGFjY291bnRzIHNlcmllcyBpbiB0aGUgZGF0YWJhc2UgZm9yIGhpc3RvcmljYWwgeWVhcnMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTTS5QT1AuTkVUTVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTmV0IG1pZ3JhdGlvblwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiTmV0IG1pZ3JhdGlvbiBpcyB0aGUgbmV0IHRvdGFsIG9mIG1pZ3JhbnRzIGR1cmluZyB0aGUgcGVyaW9kLCB0aGF0IGlzLCB0aGUgdG90YWwgbnVtYmVyIG9mIGltbWlncmFudHMgbGVzcyB0aGUgYW5udWFsIG51bWJlciBvZiBlbWlncmFudHMsIGluY2x1ZGluZyBib3RoIGNpdGl6ZW5zIGFuZCBub25jaXRpemVucy4gRGF0YSBhcmUgZml2ZS15ZWFyIGVzdGltYXRlcy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi5BSURTLk1BLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlIGF0IGxhc3QgaGlnaC1yaXNrIHNleCwgYWR1bHQgbWFsZSAoJSBhZ2VzIDE1LTQ5KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIG1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIG1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTQ5IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2Ugd2l0aCBhIG5vbi1tYXJpdGFsIGFuZCBub24tY29oYWJpdGluZyBzZXh1YWwgcGFydG5lciBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTSC5DT04uQUlEUy5GRS5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIGFkdWx0IGZlbWFsZSAoJSBhZ2VzIDE1LTQ5KVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQ29uZG9tIHVzZSBhdCBsYXN0IGhpZ2gtcmlzayBzZXgsIGZlbWFsZSBpcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZmVtYWxlIHBvcHVsYXRpb24gYWdlcyAxNS00OSB3aG8gdXNlZCBhIGNvbmRvbSBhdCBsYXN0IGludGVyY291cnNlIHdpdGggYSBub24tbWFyaXRhbCBhbmQgbm9uLWNvaGFiaXRpbmcgc2V4dWFsIHBhcnRuZXIgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi4xNTI0Lk1BLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlLCBwb3B1bGF0aW9uIGFnZXMgMTUtMjQsIG1hbGUgKCUgb2YgbWFsZXMgYWdlcyAxNS0yNClcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIkNvbmRvbSB1c2UsIG1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIG1hbGUgcG9wdWxhdGlvbiBhZ2VzIDE1LTI0IHdobyB1c2VkIGEgY29uZG9tIGF0IGxhc3QgaW50ZXJjb3Vyc2UgaW4gdGhlIGxhc3QgMTIgbW9udGhzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNILkNPTi4xNTI0LkZFLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDb25kb20gdXNlLCBwb3B1bGF0aW9uIGFnZXMgMTUtMjQsIGZlbWFsZSAoJSBvZiBmZW1hbGVzIGFnZXMgMTUtMjQpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJDb25kb20gdXNlLCBmZW1hbGUgaXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGZlbWFsZSBwb3B1bGF0aW9uIGFnZXMgMTUtMjQgd2hvIHVzZWQgYSBjb25kb20gYXQgbGFzdCBpbnRlcmNvdXJzZSBpbiB0aGUgbGFzdCAxMiBtb250aHMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiU0cuUlNYLlRJUkQuWlNcIixcclxuICAgIFwibmFtZVwiOiBcIldvbWVuIHdobyBiZWxpZXZlIGEgd2lmZSBpcyBqdXN0aWZpZWQgcmVmdXNpbmcgc2V4IHdpdGggaGVyIGh1c2JhbmQgaWYgc2hlIGlzIHRpcmVkIG9yIG5vdCBpbiB0aGUgbW9vZCAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUgaXMgdGlyZWQgb3Igbm90IGluIHRoZSBtb29kLlwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIlNHLlJTWC5UTURTLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIHdpZmUgaXMganVzdGlmaWVkIHJlZnVzaW5nIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBoZSBoYXMgc2V4dWFsbHkgdHJhbnNtaXR0ZWQgZGlzZWFzZSAoJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlBlcmNlbnRhZ2Ugb2Ygd29tZW4gYWdlZCAxNS00OSB3aG8gYmVsaWV2ZSB0aGF0IGEgd2lmZSBpcyBqdXN0aWZpZWQgaW4gcmVmdXNpbmcgdG8gaGF2ZSBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaHVzYmFuZCBoYXMgc2V4dWFsbHkgdHJhbnNtaXR0ZWQgZGlzZWFzZS5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guU1hPVC5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBpZiBzaGUga25vd3MgaGUgaGFzIHNleCB3aXRoIG90aGVyIHdvbWVuICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGlmIHNoZSBrbm93cyBodXNiYW5kIGhhcyBzZXggd2l0aCBvdGhlciB3b21lbi5cIlxyXG4gIH0sIHtcclxuICAgIFwiaWRcIjogXCJTRy5SU1guUkVBUy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV29tZW4gd2hvIGJlbGlldmUgYSB3aWZlIGlzIGp1c3RpZmllZCByZWZ1c2luZyBzZXggd2l0aCBoZXIgaHVzYmFuZCBmb3IgYWxsIG9mIHRoZSByZWFzb25zICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiUGVyY2VudGFnZSBvZiB3b21lbiBhZ2VkIDE1LTQ5IHdobyBiZWxpZXZlIHRoYXQgYSB3aWZlIGlzIGp1c3RpZmllZCBpbiByZWZ1c2luZyB0byBoYXZlIHNleCB3aXRoIGhlciBodXNiYW5kIGZvciBhbGwgb2YgdGhlIHJlYXNvbnM6IGh1c2JhbmQgaGFzIHNleHVhbGx5IHRyYW5zbWl0dGVkIGRpc2Vhc2UsIGh1c2JhbmQgaGFzIHNleCB3aXRoIG90aGVyIHdvbWVuLCByZWNlbnRseSBnaXZlbiBiaXJ0aCwgdGlyZWQgb3Igbm90IGluIHRoZSBtb29kLlwiXHJcbiAgfSwge1xyXG4gICAgXCJpZFwiOiBcIlNHLlZBVy5CVVJOLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJXb21lbiB3aG8gYmVsaWV2ZSBhIGh1c2JhbmQgaXMganVzdGlmaWVkIGluIGJlYXRpbmcgaGlzIHdpZmUgd2hlbiBzaGUgYnVybnMgdGhlIGZvb2QgKCUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJQZXJjZW50YWdlIG9mIHdvbWVuIGFnZXMgMTUtNDkgd2hvIGJlbGlldmUgYSBodXNiYW5kXFwvcGFydG5lciBpcyBqdXN0aWZpZWQgaW4gaGl0dGluZyBvciBiZWF0aW5nIGhpcyB3aWZlXFwvcGFydG5lciB3aGVuIHNoZSBidXJucyB0aGUgZm9vZC5cIlxyXG4gIH0sXHJcblxyXG5cclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5DQVBBLlpTXCIsXHJcbiAgICBcIm5hbWVcIjogXCJCYW5rIGNhcGl0YWwgdG8gYXNzZXRzIHJhdGlvICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQmFuayBjYXBpdGFsIHRvIGFzc2V0cyBpcyB0aGUgcmF0aW8gb2YgYmFuayBjYXBpdGFsIGFuZCByZXNlcnZlcyB0byB0b3RhbCBhc3NldHMuIENhcGl0YWwgYW5kIHJlc2VydmVzIGluY2x1ZGUgZnVuZHMgY29udHJpYnV0ZWQgYnkgb3duZXJzLCByZXRhaW5lZCBlYXJuaW5ncywgZ2VuZXJhbCBhbmQgc3BlY2lhbCByZXNlcnZlcywgcHJvdmlzaW9ucywgYW5kIHZhbHVhdGlvbiBhZGp1c3RtZW50cy4gQ2FwaXRhbCBpbmNsdWRlcyB0aWVyIDEgY2FwaXRhbCAocGFpZC11cCBzaGFyZXMgYW5kIGNvbW1vbiBzdG9jayksIHdoaWNoIGlzIGEgY29tbW9uIGZlYXR1cmUgaW4gYWxsIGNvdW50cmllcycgYmFua2luZyBzeXN0ZW1zLCBhbmQgdG90YWwgcmVndWxhdG9yeSBjYXBpdGFsLCB3aGljaCBpbmNsdWRlcyBzZXZlcmFsIHNwZWNpZmllZCB0eXBlcyBvZiBzdWJvcmRpbmF0ZWQgZGVidCBpbnN0cnVtZW50cyB0aGF0IG5lZWQgbm90IGJlIHJlcGFpZCBpZiB0aGUgZnVuZHMgYXJlIHJlcXVpcmVkIHRvIG1haW50YWluIG1pbmltdW0gY2FwaXRhbCBsZXZlbHMgKHRoZXNlIGNvbXByaXNlIHRpZXIgMiBhbmQgdGllciAzIGNhcGl0YWwpLiBUb3RhbCBhc3NldHMgaW5jbHVkZSBhbGwgbm9uZmluYW5jaWFsIGFuZCBmaW5hbmNpYWwgYXNzZXRzLlwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkJOSy5CUkNILlNGLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJCcmFuY2hlcywgc3BlY2lhbGl6ZWQgc3RhdGUgZmluYW5jaWFsIGluc3RpdHV0aW9ucyAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFuayBicmFuY2hlcyAocGVyIDEwMCwwMDAgcGVvcGxlKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5CTksuQlJDSC5NRi5QNVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhbmNoZXMsIG1pY3JvZmluYW5jZSBpbnN0aXR1dGlvbnMgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guQ08uUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBjb29wZXJhdGl2ZXMgKHBlciAxMDAsMDAwIGFkdWx0cylcIixcclxuICAgIFwic291cmNlTm90ZVwiOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiRkIuQk5LLkJSQ0guQ0IuUDVcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW5jaGVzLCBjb21tZXJjaWFsIGJhbmtzIChwZXIgMTAwLDAwMCBhZHVsdHMpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIkZCLkFUTS5UT1RMLlA1XCIsXHJcbiAgICBcIm5hbWVcIjogXCJBdXRvbWF0ZWQgdGVsbGVyIG1hY2hpbmVzIChBVE1zKSAocGVyIDEwMCwwMDAgYWR1bHRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQXV0b21hdGVkIHRlbGxlciBtYWNoaW5lcyBhcmUgY29tcHV0ZXJpemVkIHRlbGVjb21tdW5pY2F0aW9ucyBkZXZpY2VzIHRoYXQgcHJvdmlkZSBjbGllbnRzIG9mIGEgZmluYW5jaWFsIGluc3RpdHV0aW9uIHdpdGggYWNjZXNzIHRvIGZpbmFuY2lhbCB0cmFuc2FjdGlvbnMgaW4gYSBwdWJsaWMgcGxhY2UuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5BU1QuUFVCTy5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFua2luZyBhc3NldHMgaGVsZCBieSBnb3Zlcm5tZW50LW93bmVkIGJhbmtzICglIG9mIHRvdGFsIGJhbmtpbmcgYXNzZXRzKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJGQi5BU1QuTlBFUi5aU1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFuayBub25wZXJmb3JtaW5nIGxvYW5zIHRvIHRvdGFsIGdyb3NzIGxvYW5zICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6IFwiQmFuayBub25wZXJmb3JtaW5nIGxvYW5zIHRvIHRvdGFsIGdyb3NzIGxvYW5zIGFyZSB0aGUgdmFsdWUgb2Ygbm9ucGVyZm9ybWluZyBsb2FucyBkaXZpZGVkIGJ5IHRoZSB0b3RhbCB2YWx1ZSBvZiB0aGUgbG9hbiBwb3J0Zm9saW8gKGluY2x1ZGluZyBub25wZXJmb3JtaW5nIGxvYW5zIGJlZm9yZSB0aGUgZGVkdWN0aW9uIG9mIHNwZWNpZmljIGxvYW4tbG9zcyBwcm92aXNpb25zKS4gVGhlIGxvYW4gYW1vdW50IHJlY29yZGVkIGFzIG5vbnBlcmZvcm1pbmcgc2hvdWxkIGJlIHRoZSBncm9zcyB2YWx1ZSBvZiB0aGUgbG9hbiBhcyByZWNvcmRlZCBvbiB0aGUgYmFsYW5jZSBzaGVldCwgbm90IGp1c3QgdGhlIGFtb3VudCB0aGF0IGlzIG92ZXJkdWUuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5FLlRSRC5HTkZTLlpTXCIsXHJcbiAgICBcIm5hbWVcIjpcIlRyYWRlICglIG9mIEdEUClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiVHJhZGUgaXMgdGhlIHN1bSBvZiBleHBvcnRzIGFuZCBpbXBvcnRzIG9mIGdvb2RzIGFuZCBzZXJ2aWNlcyBtZWFzdXJlZCBhcyBhIHNoYXJlIG9mIGdyb3NzIGRvbWVzdGljIHByb2R1Y3QuIFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJTTC5HRFAuUENBUC5FTS5LRC5aR1wiLFxyXG4gICAgXCJuYW1lXCI6XCJHRFAgcGVyIHBlcnNvbiBlbXBsb3llZCAoYW5udWFsICUgZ3Jvd3RoKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgcGVyIHBlcnNvbiBlbXBsb3llZCBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IChHRFApIGRpdmlkZWQgYnkgdG90YWwgZW1wbG95bWVudCBpbiB0aGUgZWNvbm9teS5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuUFAuS0QuWkdcIixcclxuICAgIFwibmFtZVwiOlwiR0RQIHBlciBjYXBpdGEsIFBQUCBhbm51YWwgZ3Jvd3RoICglKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJBbm51YWwgcGVyY2VudGFnZSBncm93dGggcmF0ZSBvZiBHRFAgcGVyIGNhcGl0YSBiYXNlZCBvbiBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSAoUFBQKS4gR0RQIHBlciBjYXBpdGEgYmFzZWQgb24gcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgKFBQUCkuIFBQUCBHRFAgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCBjb252ZXJ0ZWQgdG8gaW50ZXJuYXRpb25hbCBkb2xsYXJzIHVzaW5nIHB1cmNoYXNpbmcgcG93ZXIgcGFyaXR5IHJhdGVzLiBBbiBpbnRlcm5hdGlvbmFsIGRvbGxhciBoYXMgdGhlIHNhbWUgcHVyY2hhc2luZyBwb3dlciBvdmVyIEdEUCBhcyB0aGUgVS5TLiBkb2xsYXIgaGFzIGluIHRoZSBVbml0ZWQgU3RhdGVzLiBHRFAgYXQgcHVyY2hhc2VyJ3MgcHJpY2VzIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY29uc3RhbnQgMjAwMCBpbnRlcm5hdGlvbmFsIGRvbGxhcnMuICBcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuUFAuS0RcIixcIm5hbWVcIjpcIkdEUCBwZXIgY2FwaXRhLCBQUFAgKGNvbnN0YW50IDIwMTEgaW50ZXJuYXRpb25hbCAkKVwiLFxyXG4gICAgXCJzb3VyY2VOb3RlXCI6XCJHRFAgcGVyIGNhcGl0YSBiYXNlZCBvbiBwdXJjaGFzaW5nIHBvd2VyIHBhcml0eSAoUFBQKS4gUFBQIEdEUCBpcyBncm9zcyBkb21lc3RpYyBwcm9kdWN0IGNvbnZlcnRlZCB0byBpbnRlcm5hdGlvbmFsIGRvbGxhcnMgdXNpbmcgcHVyY2hhc2luZyBwb3dlciBwYXJpdHkgcmF0ZXMuIEFuIGludGVybmF0aW9uYWwgZG9sbGFyIGhhcyB0aGUgc2FtZSBwdXJjaGFzaW5nIHBvd2VyIG92ZXIgR0RQIGFzIHRoZSBVLlMuIGRvbGxhciBoYXMgaW4gdGhlIFVuaXRlZCBTdGF0ZXMuIEdEUCBhdCBwdXJjaGFzZXIncyBwcmljZXMgaXMgdGhlIHN1bSBvZiBncm9zcyB2YWx1ZSBhZGRlZCBieSBhbGwgcmVzaWRlbnQgcHJvZHVjZXJzIGluIHRoZSBlY29ub215IHBsdXMgYW55IHByb2R1Y3QgdGF4ZXMgYW5kIG1pbnVzIGFueSBzdWJzaWRpZXMgbm90IGluY2x1ZGVkIGluIHRoZSB2YWx1ZSBvZiB0aGUgcHJvZHVjdHMuIEl0IGlzIGNhbGN1bGF0ZWQgd2l0aG91dCBtYWtpbmcgZGVkdWN0aW9ucyBmb3IgZGVwcmVjaWF0aW9uIG9mIGZhYnJpY2F0ZWQgYXNzZXRzIG9yIGZvciBkZXBsZXRpb24gYW5kIGRlZ3JhZGF0aW9uIG9mIG5hdHVyYWwgcmVzb3VyY2VzLiBEYXRhIGFyZSBpbiBjb25zdGFudCAyMDExIGludGVybmF0aW9uYWwgZG9sbGFycy5cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOlwiTlkuR0RQLlBDQVAuQ0RcIixcIm5hbWVcIjpcIkdEUCBwZXIgY2FwaXRhIChjdXJyZW50IFVTJClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIHBlciBjYXBpdGEgaXMgZ3Jvc3MgZG9tZXN0aWMgcHJvZHVjdCBkaXZpZGVkIGJ5IG1pZHllYXIgcG9wdWxhdGlvbi4gR0RQIGlzIHRoZSBzdW0gb2YgZ3Jvc3MgdmFsdWUgYWRkZWQgYnkgYWxsIHJlc2lkZW50IHByb2R1Y2VycyBpbiB0aGUgZWNvbm9teSBwbHVzIGFueSBwcm9kdWN0IHRheGVzIGFuZCBtaW51cyBhbnkgc3Vic2lkaWVzIG5vdCBpbmNsdWRlZCBpbiB0aGUgdmFsdWUgb2YgdGhlIHByb2R1Y3RzLiBJdCBpcyBjYWxjdWxhdGVkIHdpdGhvdXQgbWFraW5nIGRlZHVjdGlvbnMgZm9yIGRlcHJlY2lhdGlvbiBvZiBmYWJyaWNhdGVkIGFzc2V0cyBvciBmb3IgZGVwbGV0aW9uIGFuZCBkZWdyYWRhdGlvbiBvZiBuYXR1cmFsIHJlc291cmNlcy4gRGF0YSBhcmUgaW4gY3VycmVudCBVLlMuIGRvbGxhcnMuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjpcIk5ZLkdEUC5NS1RQLlpHXCIsXCJuYW1lXCI6XCJHcm9zcyBkb21lc3RpYyBwcm9kdWN0IChBdi4gYW5udWFsIGdyb3d0aCwgJSlcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiVGhlIEdEUCBpbXBsaWNpdCBkZWZsYXRvciBpcyB0aGUgcmF0aW8gb2YgR0RQIGluIGN1cnJlbnQgbG9jYWwgY3VycmVuY3kgdG8gR0RQIGluIGNvbnN0YW50IGxvY2FsIGN1cnJlbmN5LiBUaGUgYmFzZSB5ZWFyIHZhcmllcyBieSBjb3VudHJ5LlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuTUtUUC5LTi44Ny5aR1wiLFwibmFtZVwiOlwiR0RQIGdyb3d0aCAoYW5udWFsICUpXCIsXHJcbiAgICBcInNvdXJjZU5vdGVcIjpcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6XCJOWS5HRFAuTUtUUC5DRFwiLFwibmFtZVwiOlwiR0RQIChjdXJyZW50IFVTJClcIixcclxuICAgIFwic291cmNlTm90ZVwiOlwiR0RQIGF0IHB1cmNoYXNlcidzIHByaWNlcyBpcyB0aGUgc3VtIG9mIGdyb3NzIHZhbHVlIGFkZGVkIGJ5IGFsbCByZXNpZGVudCBwcm9kdWNlcnMgaW4gdGhlIGVjb25vbXkgcGx1cyBhbnkgcHJvZHVjdCB0YXhlcyBhbmQgbWludXMgYW55IHN1YnNpZGllcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBwcm9kdWN0cy4gSXQgaXMgY2FsY3VsYXRlZCB3aXRob3V0IG1ha2luZyBkZWR1Y3Rpb25zIGZvciBkZXByZWNpYXRpb24gb2YgZmFicmljYXRlZCBhc3NldHMgb3IgZm9yIGRlcGxldGlvbiBhbmQgZGVncmFkYXRpb24gb2YgbmF0dXJhbCByZXNvdXJjZXMuIERhdGEgYXJlIGluIGN1cnJlbnQgVS5TLiBkb2xsYXJzLiBEb2xsYXIgZmlndXJlcyBmb3IgR0RQIGFyZSBjb252ZXJ0ZWQgZnJvbSBkb21lc3RpYyBjdXJyZW5jaWVzIHVzaW5nIHNpbmdsZSB5ZWFyIG9mZmljaWFsIGV4Y2hhbmdlIHJhdGVzLiBGb3IgYSBmZXcgY291bnRyaWVzIHdoZXJlIHRoZSBvZmZpY2lhbCBleGNoYW5nZSByYXRlIGRvZXMgbm90IHJlZmxlY3QgdGhlIHJhdGUgZWZmZWN0aXZlbHkgYXBwbGllZCB0byBhY3R1YWwgZm9yZWlnbiBleGNoYW5nZSB0cmFuc2FjdGlvbnMsIGFuIGFsdGVybmF0aXZlIGNvbnZlcnNpb24gZmFjdG9yIGlzIHVzZWQuXCJcclxuICB9LFxyXG4gIHtcclxuXCJpZFwiOlwiU0UuVEVSLkVOUkwuRkUuWlNcIixcIm5hbWVcIjpcIlBlcmNlbnRhZ2Ugb2Ygc3R1ZGVudHMgaW4gdGVydGlhcnkgZWR1Y2F0aW9uIHdobyBhcmUgZmVtYWxlICglKVwiLFxyXG5cInNvdXJjZU5vdGVcIjpcIk51bWJlciBvZiBmZW1hbGUgc3R1ZGVudHMgYXQgdGhlIHRlcnRpYXJ5IGVkdWNhdGlvbiBsZXZlbCAoSVNDRUQgNSB0byA4KSBleHByZXNzZWQgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCBudW1iZXIgb2Ygc3R1ZGVudHMgKG1hbGUgYW5kIGZlbWFsZSkgYXQgdGhlIHRlcnRpYXJ5IGVkdWNhdGlvbiBsZXZlbCAoSVNDRUQgNSB0byA4KSBpbiBhIGdpdmVuIHNjaG9vbCB5ZWFyLlwiXHJcblxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuTVMuWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIGF0IGxlYXN0IE1hc3RlcidzIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCB0b3RhbCAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcblwiaWRcIjpcIlNFLlRFUi5DVUFULk1TLkZFLlpTXCIsXCJuYW1lXCI6XCJFZHVjYXRpb25hbCBhdHRhaW5tZW50LCBhdCBsZWFzdCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LCBwb3B1bGF0aW9uIDI1KywgZmVtYWxlICglKSAoY3VtdWxhdGl2ZSlcIixcclxuXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgTWFzdGVyJ3Mgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuRE8uWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIERvY3RvcmFsIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCB0b3RhbCAoJSkgKGN1bXVsYXRpdmUpXCIsXHJcbiAgXCJzb3VyY2VOb3RlXCI6XCJUaGUgcGVyY2VudGFnZSBvZiBwb3B1bGF0aW9uIGFnZXMgMjUgYW5kIG92ZXIgdGhhdCBhdHRhaW5lZCBvciBjb21wbGV0ZWQgRG9jdG9yYWwgb3IgZXF1aXZhbGVudC5cIlxyXG59LFxyXG57XHJcbiAgXCJpZFwiOlwiU0UuVEVSLkNVQVQuTVMuTUEuWlNcIixcIm5hbWVcIjpcIkVkdWNhdGlvbmFsIGF0dGFpbm1lbnQsIGF0IGxlYXN0IE1hc3RlcidzIG9yIGVxdWl2YWxlbnQsIHBvcHVsYXRpb24gMjUrLCBtYWxlICglKSAoY3VtdWxhdGl2ZSlcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIlRoZSBwZXJjZW50YWdlIG9mIHBvcHVsYXRpb24gYWdlcyAyNSBhbmQgb3ZlciB0aGF0IGF0dGFpbmVkIG9yIGNvbXBsZXRlZCBNYXN0ZXIncyBvciBlcXVpdmFsZW50LlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5GUEwuRlNFWC5RNS5aU1wiLFwibmFtZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgKHdvbWVuIGFnZXMgMjUtNDkpOiBRNSAoaGlnaGVzdClcIixcclxuICBcInNvdXJjZU5vdGVcIjpcIk1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlOiBNZWRpYW4gYWdlIGF0IGZpcnN0IHNleHVhbCBpbnRlcmNvdXJzZSBhbW9uZyB3b21lbiBhZ2VkIDI1LTQ5IHllYXJzLlwiXHJcbn0sXHJcbntcclxuICBcImlkXCI6XCJTSC5GUEwuRlNFWC5RMS5aU1wiLFwibmFtZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2UgKHdvbWVuIGFnZXMgMjUtNDkpOiBRMSAobG93ZXN0KVwiLFxyXG4gIFwic291cmNlTm90ZVwiOlwiTWVkaWFuIGFnZSBhdCBmaXJzdCBzZXh1YWwgaW50ZXJjb3Vyc2U6IE1lZGlhbiBhZ2UgYXQgZmlyc3Qgc2V4dWFsIGludGVyY291cnNlIGFtb25nIHdvbWVuIGFnZWQgMjUtNDkgeWVhcnMuXCJcclxufVxyXG5dXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIl19
