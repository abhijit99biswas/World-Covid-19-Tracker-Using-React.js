import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import {Typography} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData,prettyPrintStat} from './util';


function App() {




  //load countries
  // https://disease.sh/v3/covid-19/countries
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


  useEffect(()=>{
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2 
        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      })
    }
    getCountriesData();
  },[]);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = 
    countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      fetch(url)
      .then((response) => response.json())
      .then((data) => {

        setCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        setCountryInfo(data);
      });
    //for country
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    //for worldwide
    //https://disease.sh/v3/covid-19/all
  };


  return (
    <div className="app">


    <div className="app__left">
    <div className="headerdiv">
        <h1>C<span><img src="./virus.png" class="logo" alt="o"></img></span>vid-19 Tracker</h1>


    
          <FormControl className="app__dropdown">
            <Select className="app__dropdownselect" onChange={onCountryChange} variant = "outlined" value = {country} >
            <MenuItem className="app__dropdownselectmenu" value="worldwide">Worldwide</MenuItem>
                
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              </Select>
          </FormControl>

      </div>


    <div className="app__stats">

      <InfoBox title="Cases" 
      isYellow
      active = { casesType === "cases"}
      onClick = {e => setCasesType('cases')}
      cases = {prettyPrintStat(countryInfo.todayCases)} 
      total = {prettyPrintStat(countryInfo.cases)} 
      />
      <InfoBox title="Recovered" 
      active = { casesType === "recovered"}
      onClick = {e => setCasesType('recovered')}
      cases = {prettyPrintStat(countryInfo.todayRecovered)} 
      total = {prettyPrintStat(countryInfo.recovered)}
      />
      <InfoBox title="Deaths" 
      isRed
      active = { casesType === "deaths"}
      onClick = {e => setCasesType('deaths')}
      cases = {prettyPrintStat(countryInfo.todayDeaths)} 
      total = {prettyPrintStat(countryInfo.deaths)}
      />


    </div>
    <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
    </div>
      <div className="app__right">
          <div className="app__rightContent">
            <div className="tablediv">
              <h3>Cases of Top 10 Countries </h3>
              <Table countries={tableData}/>
            </div>
            <div className="chartdiv">
            <h3>60 day's Covid {casesType}</h3>
            <LineGraph
            casesType={casesType} />
            </div>
        </div>
      </div>
  </div>
  );
}

export default App;
