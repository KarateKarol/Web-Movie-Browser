async function searchShows() {
    const query = document.getElementById('query').value.trim(); 
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (query === '') {
        alert('Insert movie title!');
        return;
    }

    try {
      
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        if (!response.ok) throw new Error('An error occurred while fetching data.');

        const data = await response.json();

        if (data.length === 0) {
            resultsContainer.innerHTML = '<p>No movie title like this.</p>';
            return;
        }

       
        data.forEach(item => {
            const show = item.show; 
            const showCard = document.createElement('div');
            showCard.classList.add('show-card');

            
            const rating = show.rating && show.rating.average ? show.rating.average : 0;
            const stars = generateStars(rating);

           
            const genres = show.genres && show.genres.length > 0 
                ? show.genres.map(genre => getGenreImage(genre)).join(' ') 
                : 'N/A';

            showCard.innerHTML = `
                <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}">
                <h3>${show.name}</h3>
                <p><strong>Language:</strong> ${show.language || 'N/A'}</p>
                <p><strong>Genre:</strong> ${genres}</p>
                <p><strong>Rating:</strong> ${stars}</p>
                <p>${show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No description available.'}</p>
                <a href="${show.url}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold;">Visit Movie Page</a>
            `;
            resultsContainer.appendChild(showCard);
        });
    } catch (error) {
        console.error('Error occurred:', error);
        resultsContainer.innerHTML = '<p>An error occurred while fetching data.</p>';
    }
}


function generateStars(rating) {
    const fullStar = '⭐';
    const emptyStar = '☆';
    const roundedRating = Math.round(rating); 

    let stars = '';
    for (let i = 1; i <= 10; i++) {
        stars += i <= roundedRating ? fullStar : emptyStar;
    }
    return stars;
}


function getGenreImage(genre) {
    const genreImages = {
        'Action': 'obrazki/action.ppg',
        'Biography': 'obrazki/biography.png',
        'Comedy': 'obrazki/comedy.png',
        'Crime': 'obrazki/detective.png',
        'Drama': 'obrazki/drama.png',
        'Fantasy': 'obrazki/fantasy.png',
        'History': 'obrazki/history.png',
        'Horror': 'obrazki/horror.png',
        'Musical': 'obrazki/musical.png',
        'Mystery': 'obrazki/mystery.png',
        'Romance': 'obrazki/romance.png',
        'Science-Fiction': 'obrazki/scifi.png',
        'Sport': 'obrazki/sport.png',
        'Thriller': 'obrazki/thriller.png',
        'War': 'obrazki/war.png',
        'Western': 'obrazki/western.png'
    };


    return genreImages[genre] ? `<img src="${genreImages[genre]}" alt="${genre}" class="genre-image">` : genre;
}
