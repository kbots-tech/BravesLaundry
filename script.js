// Replace 'jsonDataURL' with the URL of your JSON data source
const baseAPIURL = 'https://mycscgo.com/api/v1/location/c0a88120-c994-4581-8f6f-51f35533cf5c/room/';

// Create a mapping of Room IDs to Location Names
const roomToLocationMap = {
    "2320032-002": "U-Hall",

    "2320032-001": "WILLIAMS HALL 1ST",
    "2320032-014": "WILLIAMS HALL 2 FL",
    "2320032-015": "WILLIAMS HALL 3 FL",
    "2320032-016": "WILLIAMS HALL 4 FL",
    "2320032-017": "WILLIAMS HALL 5 FL",

    "2320032-013": "GEISERT  HALL 2 FL",
    "2320032-022": "GEISERT HALL 10 FL",
    "2320032-019": "GEISERT HALL 4 FL",
    "2320032-020": "GEISERT HALL 6 FL",
    "2320032-021": "GEISERT HALL 8 FL",

    "2320032-007": "HEITZ HALL 1B - 1ST",
    "2320032-018": "HEITZ HALL 3B - 3 F",

    "2320032-009": "HARPER HALL",

    "2320032-012": "ELMWOOD HALL 2",

    "2320032-028": "917 W SAINT JAMES ST",
    "2320032-051": "919 W SAINT JAMES ST",
    "2320032-027": "1005 W SAINT JAMES ST",
    "2320032-026": "1011 W SAINT JAMES ST",
    "2320032-025": "1015 W SAINT JAMES ST",
    "2320032-011": " 1315 W SAINT JAMES ST ",
    
    "2320032-039": "1010 W BRADLEY AVE",
    "2320032-040": "1020 W BRADLEY AVE",

    "2320032-036": "808 N FRINK ST",
    "2320032-034": "824 N FRINK ST",
    "2320032-033": "828 N FRINK ST",
    "2320032-032": "832 N FRINK ST",
    "2320032-035": "834 N FRINK ST",
    "2320032-031": "904 N FRINK ST",
    "2320032-030": "908 N FRINK ST",

    "2320032-037": "906 W BRADLEY AVE",
    "2320032-038": "918 W BRADLEY AVE",

    "2320032-024": "1400 W FREDONIA AVE",

    "2320032-023": "STUDENT APT COMPLEX (SACS)",
    "2320032-003": "STUDENT APT COMPLEX (SACS)",
    
    "2320032-006": "DELTA TAU DELTA",
    
    "2320032-005": "COLLEGE HALL",

    "2320032-004": "PI KAPPA PHI",
    // Add more mappings as needed
};

// Create dropdown menu based on roomToLocationMap
const dropdownButton = document.getElementById('dropdown-button');
const dropdownContent = document.getElementById('dropdown-content');

for (const roomId in roomToLocationMap) {
    const locationName = roomToLocationMap[roomId];
    const locationId = locationName.replace(/ /g, '-').toLowerCase();

    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = locationName;
    link.href = `#${locationId}`;

    listItem.appendChild(link);
    dropdownContent.appendChild(listItem);
}

// Toggle dropdown menu
dropdownButton.addEventListener('click', () => {
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
});


// Function to get the Location Name based on Location ID
function getLocationName(locationId) {
    return roomToLocationMap[locationId] || "Unknown Location";
}

// Function to fetch and display machines for a location
function fetchAndDisplayMachines(locationId, locationName) {
    const locationContainer = document.createElement('div');
    locationContainer.classList.add('location-card');

    // Large card for location
    const locationCard = document.createElement('div');
    locationCard.classList.add('large-card');
    
    // Location Name
    const locationTitle = document.createElement('h2');
    locationTitle.textContent = locationName;
    locationCard.id =  locationName.replace(/ /g, '-').toLowerCase();
    locationCard.appendChild(locationTitle);
    
    // Small cards for machines within the location
    const machinesContainer = document.createElement('div');
    machinesContainer.classList.add('machines-container');

    // Fetch JSON data for the location
    fetch(`${baseAPIURL}${locationId}/machines`)
    .then(response => response.json())
    .then(data => {
        data.forEach(machine => {
            const machineCard = document.createElement('div');
            machineCard.classList.add('small-card');

            // Create and populate paragraphs for machine data
            const type = document.createElement('p');
            type.textContent = `Type: ${machine.type}`;
            machineCard.appendChild(type);

            const status = document.createElement('p');
            status.textContent = `Status: ${machine.mode}`;
            machineCard.appendChild(status);

            const availability = document.createElement('p');
            availability.textContent = `Ready: ${machine.available}`;
            machineCard.appendChild(availability);

            const timeRemaining = document.createElement('p');
            timeRemaining.textContent = `Time Remaining: ${machine.timeRemaining} minutes`;
            machineCard.appendChild(timeRemaining);

            // Check the availability and set the background color accordingly
            if (machine.available) {
                machineCard.classList.add('green-background'); // Add a CSS class for green background
            }else{
                machineCard.classList.add('red-background'); // Add a CSS class for red background
            }

            machinesContainer.appendChild(machineCard);
        });
    })
    .catch(error => {
        console.error(`Error fetching data for location ${locationId}:`, error);
    });

    locationCard.appendChild(machinesContainer);
    locationContainer.appendChild(locationCard);
    document.getElementById('machine-container').appendChild(locationContainer);
}

// Loop through each Location ID and fetch data
for (const locationId in roomToLocationMap) {
    if (roomToLocationMap.hasOwnProperty(locationId)) {
        const locationName = getLocationName(locationId);
        fetchAndDisplayMachines(locationId, locationName);
    }
}