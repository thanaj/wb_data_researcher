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

obj.INFO_BOX_SELECTOR ='[data-target="info-box"]'
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
},
{

  "id":"MO.INDEX.SRLW.XQ","name":"Safety and Rule of Law",
  "sourceNote":"Personal Safety:  Within this sub-category the Ibrahim Index measures: (i) Safety of the Person – level of criminality in a country. (ii) Violent Crime – prevalence of violent crime, both organised and common. (iii) Social Unrest – prevalence of violent social unrest. (iv) Human Trafficking – government efforts to combat human trafficking. (v) Domestic Political Persecution – clustered indicator (an average) of the following variables: Physical Integrity Rights Index – government respect for citizens’ rights to freedom from torture, extrajudicial killing, political imprisonment, and disappearance.  Political Terror Scale – levels of state-instigated political violence and terror."
},
{
"id":"SG.VAW.1549.ZS","name":"Proportion of women subjected to physical and\/or sexual violence in the last 12 months (% of women age 15-49)",
"sourceNote":"Proportion of women subjected to physical and\/or sexual violence in the last 12 months is the percentage of ever partnered women age 15-49 who are subjected to physical violence, sexual violence or both by a current or former intimate partner in the last 12 months."

},
{
  "id":"SG.OWN.HSAL.MA.ZS","name":"Men who own house alone (% of men)",
  "sourceNote":"Men who own house alone (% of men) is the percentage of men who only solely own a house which is legally registered with their name or cannot be sold without their signature."
},
{
  "id":"SG.OWN.HSAL.FE.ZS","name":"Women who own house alone (% of women age 15-49)",
  "sourceNote":"Women who own house alone (% of women age 15-49) is the percentage of women age 15-49 who only own a house, which legally registered with their name or cannot be sold without their signature, alone (don't share ownership with anyone)."
},
{
  "id":"IC.FRM.THEV.ZS","name":"Firms experiencing losses due to theft and vandalism (% of firms)",
  "sourceNote":"Percent of firms experiencing losses due to theft, robbery, vandalism or arson that occurred on the establishment's premises."
},
{
  "id":"SG.LEG.MRRP","name":"Legislation explicitly criminalizes marital rape (1=yes; 0=no)",
"sourceNote":'Legislation explicitly criminalizes marital rape is whether there is legislation that explicitly criminalizes the act of marital rape by providing that rape or sexual assault provisions apply "irrespective of the nature of the relationship" between the perpetrator and complainant or by stating that "no marriage or other relationship shall constitute a defense to a charge of rape or sexual assault under the legislation" '
},
{
  "id":"IT.NET.USER.ZS","name":"Individuals using the Internet (% of population)",
  "sourceNote":"Internet users are individuals who have used the Internet (from any location) in the last 3 months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV etc."
},
{
  "id":"IT.NET.USER.P2","name":"Internet users (per 100 people)",
  "sourceNote":"Internet users are individuals who have used the Internet (from any location) in the last 3 months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV etc."
},
{
  "id":"VC.HOM.ITEN.P5.LE","name":"Intentional homicide rate (per 100,000 people, WHO)",
  "sourceNote":""
},{
  "id":"VC.BTL.DETH","name":"Battle-related deaths (number of people)",
  "sourceNote":"Battle-related deaths are deaths in battle-related conflicts between warring parties in the conflict dyad (two conflict units that are parties to a conflict). Typically, battle-related deaths occur in warfare involving the armed forces of the warring parties. This includes traditional battlefield fighting, guerrilla activities, and all kinds of bombardments of military units, cities, and villages, etc. The targets are usually the military itself and its installations or state institutions and state representatives, but there is often substantial collateral damage in the form of civilians being killed in crossfire, in indiscriminate bombings, etc. All deaths--military as well as civilian--incurred in such situations, are counted as battle-related deaths."
},
{
"id":"VA.STD.ERR","name":"Voice and Accountability: Standard Error",
"sourceNote":"Voice and Accountability captures perceptions of the extent to which a country's citizens are able to participate in selecting their government, as well as freedom of expression, freedom of association, and a free media."
},
{
  "id":"5.51.01.07.gender","name":"Gender equality",
  "sourceNote":"The indicator is defined as the ratio of the gross enrollment rate of girls to boys in primary and secondary education levels in both public and private schools. Women have an enormous impact on the well-being of their families and societies, but their potential is sometimes not realized because of discriminatory social norms, incentives, and legal institutions. Although their status has improved in recent decades, gender inequalities persist. Education is one of the most important aspects of human development, and eliminating gender disparity at all levels of education would help to increase the status and capabilities of women. This indicator provides a measure of equality of educational opportunity and relates to the third MDG that seeks to promote gender equality and the empowerment of women."
},
{
  "id":"VC.IHR.NPOL.P5","name":"Intentional homicides, government police sources (per 100,000 people)",
  "sourceNote":""
},
{
  "id":"NE.CON.PRVT.ZS","name":"Households and NPISHs final consumption expenditure (% of GDP)",
  "sourceNote":"Household final consumption expenditure (formerly private consumption) is the market value of all goods and services, including durable products (such as cars, washing machines, and home computers), purchased by households. It excludes purchases of dwellings but includes imputed rent for owner-occupied dwellings. It also includes payments and fees to governments to obtain permits and licenses. Here, household consumption expenditure includes the expenditures of nonprofit institutions serving households, even when reported separately by the country. This item also includes any statistical discrepancy in the use of resources relative to the supply of resources.","sourceOrganization":"World Bank national accounts data, and OECD National Accounts data files."
},
{
  "id":"IS.VEH.PCAR.P3","name":"Passenger cars (per 1,000 people)",
  "sourceNote":"Passenger cars refer to road motor vehicles, other than two-wheelers, intended for the carriage of passengers and designed to seat no more than nine people (including the driver)."
},
{
  "id":"SH.STA.ACSN.UR","name":"Improved sanitation facilities, urban (% of urban population with access)",
  "sourceNote":"Access to improved sanitation facilities, urban, refers to the percentage of the urban population using improved sanitation facilities. Improved sanitation facilities are likely to ensure hygienic separation of human excreta from human contact. They include flush\/pour flush (to piped sewer system, septic tank, pit latrine), ventilated improved pit (VIP) latrine, pit latrine with slab, and composting toilet."
},
{
  "id":"IC.FRM.OBS.OBST4","name":"Percent of firms choosing corruption as their biggest obstacle",
  "sourceNote":"Percent of firms that chose corruption as the biggest obstacle faced by this establishment.  (Survey respondents were presented with a list of 15 potential obstacles.)   Source:World Bank, Enterprise Surveys Project(http:\/\/www.enterprisesurveys.org\/CustomQuery)."
},
{
  "id":"GV.TI.SCOR.IDX","name":"Corruption Perceptions Index (score)",
  "sourceNote":"This information is from the http:\/\/www.transparency.org Transparency International web site.  More information may be available there.  CPI Score relates to perceptions of the degree of corruption as seen by business people and country analysts, and ranges between 0 (highly corrupt) and 10 (highly clean).  Data for 2012 Corruption Perceptions Index scores countries on a scale from 0 (highly corrupt) to 100 (very clean).  Confidence range provides a range of possible values of the CPI score. This reflects how a country's score may vary, depending on measurement precision. Nominally, with 5 percent probability the score is above this range and with another 5 percent it is below."
},
{
  "id":"IC.FRM.CORR.GRAFT2","name":"Bribery index (% of gift or informal payment requests during public transactions)",
  "sourceNote":"Bribery index is the percentage of gift or informal payment requests during 6 infrastructure, permits and licences, and tax transactions.   Source:World Bank, Enterprise Surveys Project(http:\/\/www.enterprisesurveys.org\/Data\/ExploreTopics\/corruption)."
},
{
  "id":"HOU.ELC.ACSN.ZS","name":"Household Access to Electricity: Total (in % of total household)",
"sourceNote":""
},
{
  "id":"FX.OWN.TOTL.ZS","name":"Account ownership at a financial institution or with a mobile-money-service provider (% of population ages 15+)",
  "sourceNote":"Account denotes the percentage of respondents who report having an account (by themselves or together with someone else) at a bank or another type of financial institution or report personally using a mobile money service in the past 12 months (% age 15+)."
},
{
  "id":"SH.STA.ACCH.ZS","name":"Health care (% of population with access)",
  "sourceNote":""
},
{
  "id":"SH.STA.BASS.ZS","name":"People using at least basic sanitation services (% of population)",
  "sourceNote":"The percentage of people using at least basic sanitation services, that is, improved sanitation facilities that are not shared with other households.  This indicator encompasses both people using basic sanitation services as well as those using safely managed sanitation services.   Improved sanitation facilities include flush\/pour flush to piped sewer systems, septic tanks or pit latrines; ventilated improved pit latrines, compositing toilets or pit latrines with slabs."
},
{
"id":"SI.POV.25DAY","name":"Poverty headcount ratio at $2.5 a day (PPP) (% of population)",
"sourceNote":"Population below $2.5 a day is the percentage of the population living on less than $2.5 a day at 2005 international prices. "
},
{
  "id":"SI.POV.NAPR.ZS","name":"Poverty Rate (in % of population)","sourceNote":""
},
{
  "id":"SI.POV.NAHC","name":"Poverty headcount ratio at national poverty lines (% of population)",
  "sourceNote":"National poverty headcount ratio is the percentage of the population living below the national poverty lines. National estimates are based on population-weighted subgroup estimates from household surveys."
},
{
  "id":"SH.ADM.INPT","name":"Inpatient admission rate (% of population )","sourceNote":""
},
{
  "id":"SH.DYN.AIDS.ZS","name":"Prevalence of HIV, total (% of population ages 15-49)",
  "sourceNote":"Prevalence of HIV refers to the percentage of people ages 15-49 who are infected with HIV."
},
{
  "id":"SM.POP.TOTL.ZS","name":"International migrant stock (% of population)",
  "sourceNote":`International migrant stock is the number of people born in a country other than that in which they live. It also includes refugees. The data used to estimate the international migrant stock at a particular time are obtained mainly from population censuses. The estimates are derived from the data on foreign-born population--people who have residence in one country but were born in another country. When data on the foreign-born population are not available, data on foreign population--that is, people who are citizens of a country other than the country in which they reside--are used as estimates. After the breakup of the Soviet Union in 1991 people living in one of the newly independent countries who were born in another were classified as international migrants. Estimates of migrant stock in the newly independent states from 1990 on are based on the 1989 census of the Soviet Union. For countries with information on the international migrant stock for at least two points in time, interpolation or extrapolation was used to estimate the international migrant stock on July 1 of the reference years. For countries with only one observation, estimates for the reference years were derived using rates of change in the migrant stock in the years preceding or following the single observation available. A model was used to estimate migrants for countries that had no data.`
},
{
  "id":"SN.ITK.DEFC.ZS","name":"Prevalence of undernourishment (% of population)",
  "sourceNote":"Population below minimum level of dietary energy consumption (also referred to as prevalence of undernourishment) shows the percentage of the population whose food intake is insufficient to meet dietary energy requirements continuously. Data showing as 5 may signify a prevalence of undernourishment below 5%.","sourceOrganization":"Food and Agriculture Organization (http:\/\/www.fao.org\/publications\/en\/)."
},
{
  "id":"SH.STA.ODFC.ZS","name":"People practicing open defecation (% of population)",
"sourceNote":"People practicing open defecation refers to the percentage of the population defecating in the open, such as in fields, forest, bushes, open bodies of water, on beaches, in other open spaces or disposed of with solid waste."
}






]



export default obj;
