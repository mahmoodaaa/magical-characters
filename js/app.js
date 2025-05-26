const charactersContainer = document.getElementById("charactersContainer"); // Removed extra space
const houseFilter = document.getElementById("houseFilter");
let charactersArray = [];

// Call fetchData when page loads
document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
        if (!response.ok) {
            throw new Error("the response status is not ok");
        }
        return response.json();
    })
    .then(data => {
        charactersArray = data;
        renderData(charactersArray.slice(0,16)); 
    })
    .catch(error => {
        charactersContainer.innerHTML=`<p class="error">Failed to fetch characters</p>`;
        console.log(error);
    });
}

// Filter characters by house
houseFilter.addEventListener('change', function() {
    try {
        const selectedHouse = this.value;
        let filteredCharacters = charactersArray;
        if (selectedHouse !== 'All') { // Changed from 'all' to 'All'
            filteredCharacters = charactersArray.filter(character => 
                character.house === selectedHouse
            );
        }
        renderData(filteredCharacters.slice(0, 16));
    } catch (err) {
        console.error('Filter Error:', err);
        charactersContainer.innerHTML = `<p class="error">Something wrong while filtering.</p>`;
    }
});

function renderData(characters) {
  charactersContainer.innerHTML = '';
  characters.forEach(char => {
    try {
      if (!char || !char.name) {
        console.warn('invalid character data');
        return;
      }
      
      const card = document.createElement('div');
      card.className = `card ${char.house ? char.house.toLowerCase() : ''}`;
      
      card.innerHTML = `
        <img src="${char.image || 'images/not-found.png'}" alt="${char.name}" />
        <h3>${char.name}</h3>
        <p>House: ${char.house || 'Unknown'}</p>
        <p>DOB: ${char.dateOfBirth || 'N/A'}</p>
      `;
      
      charactersContainer.appendChild(card);
    } catch (error) {
      console.error('Error creating character card:', error);
    }
  });
}