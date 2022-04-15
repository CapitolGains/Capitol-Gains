import React, { useEffect } from 'react';

import './Cards.css';
import CardItem from './CardItem';
import Placeholder from './images/placeholder.jpg'
import { getPoliticians } from "../components/politicians";
import $ from "jquery";
 
let politicians = getPoliticians();
let sortMethod = "name";

function sorted(politicians, sort) {
  sortMethod = sort;
  //politicians = getPoliticians();
  //nameSelect(document.getElementById('inputname').value, politicians)

  if (sortMethod === "new") {
      function dateComparison(a, b) {
          const date1 = new Date(a)
          const date2 = new Date(b)
          
          return date1 - date2;
      }
      
      politicians.sort(dateComparison);
  }    

  if (sortMethod === "old") { //sort by oldest
    
  }
  if (sortMethod === "name") { //sort by age
    politicians.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  if (sortMethod === "party") { //sort by party
    politicians.sort((a, b) => (a.party > b.party) ? 1 : -1);
  }  
  if (sortMethod === "state") { //sort by state
    politicians.sort((a, b) => (a.state > b.state) ? 1 : -1);
  } 
  if (sortMethod === "age") { //sort by age
    politicians.sort((a, b) => (a.date_of_birth > b.date_of_birth) ? 1 : -1);
  } 
  if (sortMethod === "chamber") { //sort by chamber
    politicians.sort((a, b) => (a.congressType > b.congressType) ? 1 : -1);
  } 

  console.log("Sorted end:", politicians);
  redo();
  return politicians;
}

function nameSelect (nameSegment, politicians) {
  politicians = getPoliticians();
  console.log("name:", nameSegment);
  if(nameSegment) {
        console.log("Before name:", nameSegment, " politicians:", politicians);
    politicians = politicians.filter(politician => politician.name.includes(nameSegment)); //currently case sensitive

    console.log("After name:", nameSegment, " politicians:", politicians);
  }

  politicians = sorted(politicians,sortMethod); //sort selected names
  redo();
  return politicians;
}

function redo() { 
  //console.log("in redo");
  //console.log("Redo Politicians before:", politicians);
  //$('#cards__container').load('#cards__container');
  //console.log("Redo Politicians after:", politicians);
  
  //$("#cards__container").load("#cards__container");
  //$("#cards__items").load(window.location.href + " #cards__items" );

}

function drop() {
  document.getElementById("dropped").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function Cards() {
    // REPLACE WITH MONGODB CALL
    // get all politicians data object
    politicians = getPoliticians();
  
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
  
        // make api call
        const response = await fetch('http://localhost:5000/api', options);
        // get response object as json
        const body = await response.json();
        console.log(body.message);
      }
  
      // call async function to get data
      getPoliticiansUnique();
    });

  /*Testing*/
  let sortMethod = "name";     //get this from user
  sorted(politicians, sortMethod);  //initial page sort

    //let politicianName = "Bernie";

    //console.log("Old Politicians: ", politicians);
    //politicians = nameSelect (politicianName, politicians);
    //console.log("New Politicians: ", politicians);


  return (
        <div className='cards'>
          <div className='topbar'>
              <label id="inputname">Name:</label>
              <input type="text" id="inputname" className="inputname" onInput={() => (politicians = nameSelect(document.querySelector('input').value, politicians))}/>
              <button className="searchBtn" onClick={() => (politicians = nameSelect(document.getElementById('inputname').value, politicians))}>Search</button>
            <div className='searchbar'>
              <div className="dropdown">
                <label id="droplabel">Sort:</label>
                <button onClick={() => drop()} className="dropbtn">Dropdown</button>
                <div id="dropped" className="dropdown-content">
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, 'name'))}>Name</button>
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, "state"))}>State</button>
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, "sector"))}>Sector</button>
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, "party"))}>Party</button>
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, "chamber"))}>Chamber</button>
                  <button className="dropdown-option" onClick={() => (politicians = sorted(politicians, "age"))}>Age</button>
                </div>
              </div>
            </div>
          </div>
          <div className='cards__container' id="cards__container" class="cards__container">
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