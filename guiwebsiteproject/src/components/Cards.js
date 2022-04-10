import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Placeholder from './images/placeholder.jpg'
import { Stack, Container, Row, Col } from 'react-bootstrap';
import { getPoliticians } from "../components/politicians";
import { useEffect } from "react";

function Cards() {
    // REPLACE WITH MONGODB CALL
    // get all politicians data object
    let politicians = getPoliticians();
  
    // React function to handle data requests
    useEffect(() => {
      // function to call API and get unique politician list
      async function getPoliticiansUnique() {
        // build data slug for API request
        const dataSlugMongoTest = {
          requestType: "uniqueCongress",
          requestData: {
          }
        }
  
        // build options for API request
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataSlugMongoTest)
        }
  
        // fetch request to server API
        console.log("Sending api request...");
        console.log(dataSlugMongoTest);
        // const response = await fetch('http://localhost:5000/apiTEST', options);
        // console.log(response.message);
      }
  
      // call async function to get data
      getPoliticiansUnique();
    });

  return (
        <div className='cards'>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
              {politicians.map((politician) => (
                <CardItem
                  src={Placeholder}
                  text={politician.name}
                  path={`/politician/${politician.id}`}
                  key={politician.id}
                />
                ))}
              </ul>
            </div>
          </div>
        </div>
  );
}

export default Cards;