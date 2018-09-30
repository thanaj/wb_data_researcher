const obj = {}


let keyPath = 'query';
let storeName = 'world-bank-data-researcher';
let configObj = { keyPath: 'query'}

obj.IND_DB_COUNTRY_LIST = 'countryList'
obj.IND_DB_KEY_PATH = 'query';
obj.IND_DB_CONFIG_OBJ = { keyPath: 'query'};
obj.IND_DB_STORE_NAME = 'world-bank-data-researcher';

obj.IND_DB_STORE_NAME = 'world-bank-data-researcher';
obj.SELECT_COUNTRY_SELECTOR = '[data-target="select-container"]';
obj.GDP_CONTAINER_SELECTOR = '[data-target="gdp-container"]';
obj.COUNTRY_LIST_LINK = 'https://api.worldbank.org/v2/countries?format=JSON&per_page=305';
//`http://api.worldbank.org/v2/countries/${event.target.value}/indicators/NY.GDP.MKTP.CD?format=json`
obj.INDICATORS_LINK = 'http://api.worldbank.org/v2/indicators?format=json';
obj.GET_DATA_BTN = '[data-target="get-data-button"]';

obj.DESCRIPTION_SELECTOR = '[data-target="description-container"]';

obj.VISUALIZATION_SELECTOR ='[data-target="visualisation-container"]';

obj.INDICATORS = [{
    "id": "NY.ADJ.AEDU.GN.ZS",
    "name": "Adjusted savings: education expenditure (% of GNI)",
    "sourceNote": "Education expenditure refers to the current operating expenditures in education, including wages and salaries and excluding capital investments in buildings and equipment.",
    "sourceOrganization": "UNESCO; data are extrapolated to the most recent year available"
  },

  {
    "id": "g20.t.receive.1",
    "name": "Received digital payments in the past year, male (% age 15+)",
    "sourceNote": "The percentage of respondents who report using mobile money, a debit or credit card, or a mobile phone to receive a payment through an account in the past 12 months. It also includes respondents who report receiving remittances, receiving payments for agricultural products, receiving government transfers, receiving wages, or receiving a public sector pension directly into a financial institution account or through a mobile money account in the past 12 months, male (% age 15+)."
  },
  {
    "id": "NY.GDP.DEFL.KD.ZG.AD",
    "name": "Inflation, GDP deflator: linked series (annual %)",
    "sourceNote": "Inflation as measured by the annual growth rate of the GDP implicit deflator shows the rate of price change in the economy as a whole. This series has been linked to produce a consistent time series to counteract breaks in series over time due to changes in base years, source data and methodologies. Thus, it may not be comparable with other national accounts series in the database for historical years."
  },
  {
    "id": "SM.POP.NETM",
    "name": "Net migration",
    "sourceNote": "Net migration is the net total of migrants during the period, that is, the total number of immigrants less the annual number of emigrants, including both citizens and noncitizens. Data are five-year estimates."
  },
  {
    "id": "SH.CON.AIDS.MA.ZS",
    "name": "Condom use at last high-risk sex, adult male (% ages 15-49)",
    "sourceNote": "Condom use at last high-risk sex, male is the percentage of the male population ages 15-49 who used a condom at last intercourse with a non-marital and non-cohabiting sexual partner in the last 12 months."
  },
  {
    "id": "SH.CON.AIDS.FE.ZS",
    "name": "Condom use at last high-risk sex, adult female (% ages 15-49)",
    "sourceNote": "Condom use at last high-risk sex, female is the percentage of the female population ages 15-49 who used a condom at last intercourse with a non-marital and non-cohabiting sexual partner in the last 12 months.",
  },
  {
    "id": "SH.CON.1524.MA.ZS",
    "name": "Condom use, population ages 15-24, male (% of males ages 15-24)",
    "sourceNote": "Condom use, male is the percentage of the male population ages 15-24 who used a condom at last intercourse in the last 12 months.",
  },
  {
    "id": "SH.CON.1524.FE.ZS",
    "name": "Condom use, population ages 15-24, female (% of females ages 15-24)",
    "sourceNote": "Condom use, female is the percentage of the female population ages 15-24 who used a condom at last intercourse in the last 12 months.",
  },
  {
    "id": "SG.RSX.TIRD.ZS",
    "name": "Women who believe a wife is justified refusing sex with her husband if she is tired or not in the mood (%)",
    "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband if she is tired or not in the mood."
  },

  {
    "id": "SG.RSX.TMDS.ZS",
    "name": "Women who believe a wife is justified refusing sex with her husband if she knows he has sexually transmitted disease (%)",
    "sourceNote": "Percentage of women aged 15-49 who believe that a wife is justified in refusing to have sex with her husband if she knows husband has sexually transmitted disease.",
  },
  {
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
  },



  {
    "id": "FB.BNK.CAPA.ZS",
    "name": "Bank capital to assets ratio (%)",
    "sourceNote": "Bank capital to assets is the ratio of bank capital and reserves to total assets. Capital and reserves include funds contributed by owners, retained earnings, general and special reserves, provisions, and valuation adjustments. Capital includes tier 1 capital (paid-up shares and common stock), which is a common feature in all countries' banking systems, and total regulatory capital, which includes several specified types of subordinated debt instruments that need not be repaid if the funds are required to maintain minimum capital levels (these comprise tier 2 and tier 3 capital). Total assets include all nonfinancial and financial assets."
  },

  {
    "id": "FB.BNK.BRCH.SF.P5",
    "name": "Branches, specialized state financial institutions (per 100,000 adults)",
    "sourceNote": ""
  },
  {
    "id": "FB.BNK.BRCH.P5",
    "name": "Bank branches (per 100,000 people)",
    "sourceNote": ""
  },
  {
    "id": "FB.BNK.BRCH.MF.P5",
    "name": "Branches, microfinance institutions (per 100,000 adults)",
    "sourceNote": ""
  },
  {
    "id": "FB.BNK.BRCH.CO.P5",
    "name": "Branches, cooperatives (per 100,000 adults)",
    "sourceNote": ""
  },
  {
    "id": "FB.BNK.BRCH.CB.P5",
    "name": "Branches, commercial banks (per 100,000 adults)",
    "sourceNote": ""
  },
  {
    "id": "FB.ATM.TOTL.P5",
    "name": "Automated teller machines (ATMs) (per 100,000 adults)",
    "sourceNote": "Automated teller machines are computerized telecommunications devices that provide clients of a financial institution with access to financial transactions in a public place."
  },
  {
    "id": "FB.AST.PUBO.ZS",
    "name": "Banking assets held by government-owned banks (% of total banking assets)",
    "sourceNote": ""
  },
  {
    "id": "FB.AST.NPER.ZS",
    "name": "Bank nonperforming loans to total gross loans (%)",
    "sourceNote": "Bank nonperforming loans to total gross loans are the value of nonperforming loans divided by the total value of the loan portfolio (including nonperforming loans before the deduction of specific loan-loss provisions). The loan amount recorded as nonperforming should be the gross value of the loan as recorded on the balance sheet, not just the amount that is overdue."
  },
  {
    "id":"NE.TRD.GNFS.ZS",
    "name":"Trade (% of GDP)",
    "sourceNote":"Trade is the sum of exports and imports of goods and services measured as a share of gross domestic product. "
  },
  {
    "id":"SL.GDP.PCAP.EM.KD.ZG",
    "name":"GDP per person employed (annual % growth)",
    "sourceNote":"GDP per person employed is gross domestic product (GDP) divided by total employment in the economy."
  },
  {
    "id":"NY.GDP.PCAP.PP.KD.ZG",
    "name":"GDP per capita, PPP annual growth (%)",
    "sourceNote":"Annual percentage growth rate of GDP per capita based on purchasing power parity (PPP). GDP per capita based on purchasing power parity (PPP). PPP GDP is gross domestic product converted to international dollars using purchasing power parity rates. An international dollar has the same purchasing power over GDP as the U.S. dollar has in the United States. GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in constant 2000 international dollars.  "
  },
  {
    "id":"NY.GDP.PCAP.PP.KD","name":"GDP per capita, PPP (constant 2011 international $)",
    "sourceNote":"GDP per capita based on purchasing power parity (PPP). PPP GDP is gross domestic product converted to international dollars using purchasing power parity rates. An international dollar has the same purchasing power over GDP as the U.S. dollar has in the United States. GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in constant 2011 international dollars."
  },
  {
    "id":"NY.GDP.PCAP.CD","name":"GDP per capita (current US$)",
    "sourceNote":"GDP per capita is gross domestic product divided by midyear population. GDP is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in current U.S. dollars."
  },
  {
    "id":"NY.GDP.MKTP.ZG","name":"Gross domestic product (Av. annual growth, %)",
    "sourceNote":"The GDP implicit deflator is the ratio of GDP in current local currency to GDP in constant local currency. The base year varies by country."
  },
  {
    "id":"NY.GDP.MKTP.KN.87.ZG","name":"GDP growth (annual %)",
    "sourceNote":""
  },
  {
    "id":"NY.GDP.MKTP.CD","name":"GDP (current US$)",
    "sourceNote":"GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in current U.S. dollars. Dollar figures for GDP are converted from domestic currencies using single year official exchange rates. For a few countries where the official exchange rate does not reflect the rate effectively applied to actual foreign exchange transactions, an alternative conversion factor is used."
  },
  {
"id":"SE.TER.ENRL.FE.ZS","name":"Percentage of students in tertiary education who are female (%)",
"sourceNote":"Number of female students at the tertiary education level (ISCED 5 to 8) expressed as a percentage of the total number of students (male and female) at the tertiary education level (ISCED 5 to 8) in a given school year."

},
{
  "id":"SE.TER.CUAT.MS.ZS","name":"Educational attainment, at least Master's or equivalent, population 25+, total (%) (cumulative)",
  "sourceNote":"The percentage of population ages 25 and over that attained or completed Master's or equivalent."
},
{
"id":"SE.TER.CUAT.MS.FE.ZS","name":"Educational attainment, at least Master's or equivalent, population 25+, female (%) (cumulative)",
"sourceNote":"The percentage of population ages 25 and over that attained or completed Master's or equivalent."
},
{
  "id":"SE.TER.CUAT.DO.ZS","name":"Educational attainment, Doctoral or equivalent, population 25+, total (%) (cumulative)",
  "sourceNote":"The percentage of population ages 25 and over that attained or completed Doctoral or equivalent."
},
{
  "id":"SE.TER.CUAT.MS.MA.ZS","name":"Educational attainment, at least Master's or equivalent, population 25+, male (%) (cumulative)",
  "sourceNote":"The percentage of population ages 25 and over that attained or completed Master's or equivalent."
},
{
  "id":"SH.FPL.FSEX.Q5.ZS","name":"Median age at first sexual intercourse (women ages 25-49): Q5 (highest)",
  "sourceNote":"Median age at first sexual intercourse: Median age at first sexual intercourse among women aged 25-49 years."
},
{
  "id":"SH.FPL.FSEX.Q1.ZS","name":"Median age at first sexual intercourse (women ages 25-49): Q1 (lowest)",
  "sourceNote":"Median age at first sexual intercourse: Median age at first sexual intercourse among women aged 25-49 years."
}
]



export default obj;
