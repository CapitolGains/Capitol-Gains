// REPLACE THIS FILE WITH MONGO CALLS, this is a temporary file to simulate DB calls
import bernie from "./images/bernie.jpg"
import kennedy from "./images/kennedy.jpg"
import lincoln from "./images/lincoln.jpg"
import mcconnell from "./images/mcconnell.jpg"
import washington from "./images/washington.jpg"

let politicians = [
    {
      name: "Bernie Sanders",
      dob: "September 8, 1941",
      state: "Vermont",
      congressType: "Senator",
      party: "Democrat",
      photo: bernie,
      id: 1,
    },
    {
      name: "Mitch McConnell",
      dob: "February 20, 1942",
      state: "Kentucky",
      congressType: "Senator",
      party: "Republican",
      photo: mcconnell,
      id: 2,
    },
    {
      name: "Abraham Lincoln",
      dob: "February 12, 1809",
      state: "Washington DC",
      congressType: "Representative",
      party: "National Union Party",
      photo: lincoln,
      id: 3,
    },
    {
      name: "George Washington",
      state: "DC",
      congressType: "Representative",
      party: "N",
      id: 4,
    },
    {
      name: "Joe Kennedy",
      state: "MA",
      congressType: "Representative",
      party: "D",
      id: 5,
    }
  ];
  
  // return array of json objects of all politiicans
  export function getPoliticians() {
    return politicians;
  }
  
  // return a specific politician id
  export function getPolitician(id) {
    return politicians.find(
      (politician) => politician.id === id
    );
  }