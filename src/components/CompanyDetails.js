import  "isomorphic-fetch";
import React, { useEffect, useState } from "react";
import {  Button } from 'react-bootstrap';
import './CompanyDetails.css'




function CompanyDetails() {
    const [companyName, setCompanyName] = useState("");
  
    const [result, setResult] = useState({});

  const FetchDetails = (companyName) => {
      console.log({companyName})
      
     const API_KEY = 'qfNfdijpFhbhPhA7j2ZxvtEGkfv8DftTtmTEbnWN';
   const API_ENDPOINT = 'https://api.craft.co/v1/query';
  // Query
  let GRAPHQL_QUERY = 'query findCompanyByName($name: String!) { company(nameContains: $name) { displayName, locationsCount, locations { city, country } }}'
  
  //Variables
  //{ "name": "Stripe" }
  //GRAPHQL_QUERY = 'query getCompany($domain: String!) { company(domain: $domain) { locations { city, country } } }';
  
  let requestHeaders = { 'Content-Type': 'application/json', 'x-craft-api-key': API_KEY };
  //requestData = { 'query': GRAPHQL_QUERY, 'variables': { 'domain': 'facebook.com' } };
  let requestData = { 'query': GRAPHQL_QUERY, 'variables': { "name": companyName }};
  fetch(API_ENDPOINT, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestData),
      //body: JSON.stringify(requestData),
  })
      .then(async function (response) {
          let res = await response.json()
          console.log(res.data.company)
          //console.log(res.data.company.locations[0])
          setResult(res.data.company)
          
      })
  
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    const { displayName, locationsCount, locations } = result;
    // console.log(locations[0].city)
  },[result])
//   let location;
//  if(result.locations.length > 0){
//       location = result.locations.forEach(({city, country}) => {
//   return <span>
//     <h2>{city}</h2>
//     <h2>{country}</h2>
//   </span>
// }) 
//  }

console.log(result?.locations)
 return (
     <> 
     <h1 className="heading">Get Company Location</h1>
     <div className="inputContent">
              <label>Enter Company Name: &nbsp;</label>
              <input type='text' className="inputbox" value={companyName} onChange={(e) => setCompanyName(String(e.target.value))} /> <br /> <br />
              <Button variant="outline-success" className="btn" onClick={() => FetchDetails(companyName)}>Search</Button>
      </div>
        
        {/* <DisplayContent result={result} /> */}
        <div className="content">
           <h1>Company Name:<span> {result.displayName}</span></h1>
          <h1>Total Locations Count: <span>{result.locationsCount}</span></h1>
       

          {result?.locations?.map((value, index) => {
            return (
              <div className="container" key={value.city}>
            <h1> City:<span >&nbsp;&nbsp;&nbsp;&nbsp;{value.city}</span> </h1>
            <h1><strong>Country:</strong>   <span >&nbsp;&nbsp;&nbsp;{value.country}</span> </h1>
            
            
            </div>
            )
          })}
          </div>
          
      
      </>
    )
 }

export default CompanyDetails;