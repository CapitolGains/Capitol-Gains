// REPLACE THIS FILE WITH MONGO CALLS, this is a temporary file to simulate DB calls

let politicians = [
  {
    name: "Bernie Sanders",
    state: "VT",
    congressType: "Senator",
    party: "D",
    id: 1,
  },
  {
    name: "Mitch McConnell",
    state: "KY",
    congressType: "Senator",
    party: "R",
    id: 2,
  },
  {
    name: "Abraham Lincoln",
    state: "DC",
    congressType: "Representative",
    party: "N",
    id: 3,
  },
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