import React, { useEffect } from 'react';

import './Cards.css';
import CardItem from './CardItem';
import Placeholder from './images/placeholder.jpg'
import { getPoliticians } from "../components/politicians";
import $ from "jquery";
import { Container, Row, Col } from 'react-bootstrap';
 
let politicians = getPoliticians();
let sortMethod = "name";
let party = "unselected";
let state = "unselected";
let congress = "unselected";

// Reorders the politician cards by either age, name, or state name
function sorted(sort) {
  if (sort === "age") { //sort by oldest
    politicians.sort((a, b) => (a.age > b.age) ? 1 : -1);
  }
  if (sort === "name") { //sort by age
    politicians.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  if (sort === "state") { //sort by age
    politicians.sort((a, b) => (a.state > b.state) ? 1 : -1);
  }

  sortMethod = sort;

  /*refresh the page*/
}

// Filters the politicians cards, only displaying politicians from the selected party. Options are Democrat, Republican, or Other
function filterParty (selectedParty) {
  if(party !== selectedParty) {                                                                 //checks that the user has selected a different party
    if(party !== "unselected") {                                                                //If the user has selected a new party, get full politician list and refilter other variables
        politicians = getPoliticians();
        filterState(state);
        filterCongress(congress);
    } 
    if((selectedParty === "Democrat") || (selectedParty === "Republican")) {
      politicians = politicians.filter(politician => politician.party.includes(selectedParty)); //Filter by selected party. case sensitive
      party = selectedParty;
    }
    else if (selectedParty === "Other") {                                                       //Filters out Democrats and Repubicans
      politicians = politicians.filter(politician => !politician.party.includes("Democrat"));   //case sensitive
      politicians = politicians.filter(politician => !politician.party.includes("Republican")); //case sensitive
      party = selectedParty;
    }

    /*refresh the page*/
  }
}

// Filters the politicians cards, only displaying politicians from the selected state.
function filterState (selectedState) {
  if(state !== selectedState) {                                                                 //checks that the user has selected a different party, get full politician list and refilter other variables
    if(state !== "unselected") {                                                                //If the user has selected a new state
        politicians = getPoliticians();
        filterParty(party);
        filterCongress(congress);
    } 
    politicians = politicians.filter(politician => politician.state.includes(selectedState));   //Filter by selected state. Case sensitive
    state = selectedState;

    /*refresh the page*/
  }
}

// Filters the politicians cards, only displaying politicians from the selected congress.
function filterCongress (selectedCongress) {
  if(congress !== selectedCongress) {
    if(congress !== "unselected") {                                                                    //If the user has selected a different congress, get full politician list and refilter other variables
        politicians = getPoliticians();
        filterParty(party);
        filterState(state);
    } 
    politicians = politicians.filter(politician => politician.congressType.includes(selectedCongress)); //Filter by selected Congress. case sensitive
    congress = selectedCongress;

    /*refresh the page*/
  }
}

function nameSelect (nameSegment, politicians) {
  politicians = getPoliticians();

  if(nameSegment) {                                                                        //if the user has typed in a name or part of a name
    politicians = politicians.filter(politician => politician.name.includes(nameSegment)); //filter politicians by the name fragment. case sensitive
  }

  politicians = sorted(sortMethod);                                                        //sort filtered names
  
  /*refresh the page*/
}

function clearfilters() {
  politicians = getPoliticians();
  party = "unselected";
  state = "unselected";
  congress = "unselected";

  /*refresh the page*/
}

//Toggles the dropdown menus 
function sortSelect() {
  document.getElementById("sort-selection").classList.toggle("show");

  document.getElementById("party-selection").classList.remove("show");
  document.getElementById("state-selection").classList.remove("show");
  document.getElementById("congress-selection").classList.remove("show");
}
function partySelect() {
  document.getElementById("party-selection").classList.toggle("show");

  document.getElementById("sort-selection").classList.remove("show");
  document.getElementById("state-selection").classList.remove("show");
  document.getElementById("congress-selection").classList.remove("show");
}
function stateSelect() {
  document.getElementById("state-selection").classList.toggle("show");

  document.getElementById("sort-selection").classList.remove("show");
  document.getElementById("party-selection").classList.remove("show");
  document.getElementById("congress-selection").classList.remove("show");
}
function congressSelect() {
  document.getElementById("congress-selection").classList.toggle("show");

  document.getElementById("sort-selection").classList.remove("show");
  document.getElementById("party-selection").classList.remove("show");
  document.getElementById("state-selection").classList.remove("show");
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

  return (
        <div className='cards'>
          <br></br>
          <div className='topbar'>
              <input type="text" id="inputname" className="inputname" placeholder="Search Politicians" onInput={() => (politicians = nameSelect(document.querySelector('input').value, politicians))}/>
            <div className='searchbar'>
              <div className="sort-dropdown dropdown">
                <button onClick={() => sortSelect()} className="dropbtn">Sort Method</button>
                <div id="sort-selection" className="sort-content dropdown-content">
                  <button className="dropdown-option" onClick={() => (sorted("name"))}>Name</button>
                  <button className="dropdown-option" onClick={() => (sorted("age"))}>Age</button>
                  <button className="dropdown-option" onClick={() => (sorted("state"))}>State</button>
                </div>
              </div>
              <div className="party-dropdown dropdown">
                <button onClick={() => partySelect()} className="dropbtn">Party</button>
                <div id="party-selection" className="party-content dropdown-content">
                  <button className="dropdown-option" onClick={() => (filterParty("Democrat"))}>Democrat</button>
                  <button className="dropdown-option" onClick={() => (filterParty("Republican"))}>Republican</button>
                  <button className="dropdown-option" onClick={() => (filterParty("Other"))}>Other</button>
                </div>
              </div>
              <div className="state-dropdown dropdown">
                <button onClick={() => stateSelect()} className="dropbtn">State</button>
                <div id="state-selection" className="state-content dropdown-content">
                  <button className="dropdown-option" onClick={() => (filterState("Alabama"))}>Alabama</button>
                  <button className="dropdown-option" onClick={() => (filterState("Alaska"))}>Alaska</button>
                  <button className="dropdown-option" onClick={() => (filterState("Arizona"))}>Arizona</button>
                  <button className="dropdown-option" onClick={() => (filterState("Arkansas"))}>Arkansas</button>
                  <button className="dropdown-option" onClick={() => (filterState("California"))}>California</button>
                  <button className="dropdown-option" onClick={() => (filterState("Colorado"))}>Colorado</button>
                  <button className="dropdown-option" onClick={() => (filterState("Connecticut"))}>Connecticut</button>
                  <button className="dropdown-option" onClick={() => (filterState("Delaware"))}>Delaware</button>
                  <button className="dropdown-option" onClick={() => (filterState("Florida"))}>Florida</button>
                  <button className="dropdown-option" onClick={() => (filterState("Georgia"))}>Georgia</button>
                  <button className="dropdown-option" onClick={() => (filterState("Hawaii"))}>Hawaii</button>
                  <button className="dropdown-option" onClick={() => (filterState("Idaho"))}>Idaho</button>
                  <button className="dropdown-option" onClick={() => (filterState("Illinois"))}>Illinois</button>
                  <button className="dropdown-option" onClick={() => (filterState("Indiana"))}>Indiana</button>
                  <button className="dropdown-option" onClick={() => (filterState("Iowa"))}>Iowa</button>
                  <button className="dropdown-option" onClick={() => (filterState("Kansas"))}>Kansas</button>
                  <button className="dropdown-option" onClick={() => (filterState("Kentucky"))}>Kentucky</button>
                  <button className="dropdown-option" onClick={() => (filterState("Louisiana"))}>Louisiana</button>
                  <button className="dropdown-option" onClick={() => (filterState("Maine"))}>Maine</button>
                  <button className="dropdown-option" onClick={() => (filterState("Maryland"))}>Maryland</button>
                  <button className="dropdown-option" onClick={() => (filterState("Massachusetts"))}>Massachusetts</button>
                  <button className="dropdown-option" onClick={() => (filterState("Michigan"))}>Michigan</button>
                  <button className="dropdown-option" onClick={() => (filterState("Minnesota"))}>Minnesota</button>
                  <button className="dropdown-option" onClick={() => (filterState("Mississippi"))}>Mississippi</button>
                  <button className="dropdown-option" onClick={() => (filterState("Missouri"))}>Missouri</button>
                  <button className="dropdown-option" onClick={() => (filterState("Montana"))}>Montana</button>
                  <button className="dropdown-option" onClick={() => (filterState("Nebraska"))}>Nebraska</button>
                  <button className="dropdown-option" onClick={() => (filterState("Nevada"))}>Nevada</button>
                  <button className="dropdown-option" onClick={() => (filterState("New Hampshire"))}>New Hampshire</button>
                  <button className="dropdown-option" onClick={() => (filterState("New Jersey"))}>New Jersey</button>
                  <button className="dropdown-option" onClick={() => (filterState("New Mexico"))}>New Mexico</button>
                  <button className="dropdown-option" onClick={() => (filterState("New York"))}>New York</button>
                  <button className="dropdown-option" onClick={() => (filterState("North Carolina"))}>North Carolina</button>
                  <button className="dropdown-option" onClick={() => (filterState("North Dakota"))}>North Dakota</button>
                  <button className="dropdown-option" onClick={() => (filterState("Ohio"))}>Ohio</button>
                  <button className="dropdown-option" onClick={() => (filterState("Oklahoma"))}>Oklahoma</button>
                  <button className="dropdown-option" onClick={() => (filterState("Oregon"))}>Oregon</button>
                  <button className="dropdown-option" onClick={() => (filterState("Pennsylvania"))}>Pennsylvania</button>
                  <button className="dropdown-option" onClick={() => (filterState("Rhode Island"))}>Rhode Island</button>
                  <button className="dropdown-option" onClick={() => (filterState("South Carolina"))}>South Carolina</button>
                  <button className="dropdown-option" onClick={() => (filterState("South Dakota"))}>South Dakota</button>
                  <button className="dropdown-option" onClick={() => (filterState("Tennessee"))}>Tennessee</button>
                  <button className="dropdown-option" onClick={() => (filterState("Texas"))}>Texas</button>
                  <button className="dropdown-option" onClick={() => (filterState("Utah"))}>Utah</button>
                  <button className="dropdown-option" onClick={() => (filterState("Vermont"))}>Vermont</button>
                  <button className="dropdown-option" onClick={() => (filterState("Virginia"))}>Virginia</button>
                  <button className="dropdown-option" onClick={() => (filterState("Washington"))}>Washington</button>
                  <button className="dropdown-option" onClick={() => (filterState("West Virginia"))}>West Virginia</button>
                  <button className="dropdown-option" onClick={() => (filterState("Wisconsin"))}>Wisconsin</button>
                  <button className="dropdown-option" onClick={() => (filterState("Wyoming"))}>Wyoming</button>
                </div>
              </div>
              <div className="congress-dropdown dropdown">
                <button onClick={() => congressSelect()} className="dropbtn">Congress</button>
                <div id="congress-selection" className="congress-content dropdown-content">
                  <button className="dropdown-option" onClick={() => (filterCongress("House"))}>House</button>
                  <button className="dropdown-option" onClick={() => (filterCongress("Senate"))}>Senate</button>
                </div>
              </div>
              <button onClick={() => clearfilters()} className="clearbtn">Clear Filters</button>
            </div>
          </div>
          <div className='cards__container' id="cards__container">
            <div className='cards__wrapper'>
              <Container>
              <Row>
                {politicians.map((politician) => (
                  <CardItem
                    src={politician.photo}
                    text={politician.name}
                    path={`/politician/${politician.id}`}
                    key={politician.id}
                  />
                ))}
              </Row>
              </Container>
            </div>
          </div>
        </div>
  );
}

export default Cards;