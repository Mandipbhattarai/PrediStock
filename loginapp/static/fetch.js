document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const fetchButton = document.getElementById('fetchButton');

    // Function to fetch and display news based on the provided date
    function fetchNewsByDate() {
        const dateValue = dateInput.value.trim(); // Get the date value from the input field
        if (!isValidDate(dateValue)) {
            alert('Please enter a valid date in YYYY-MM-DD format.');
            return;
        }

        // Fetch news data from the API based on the provided date
        fetch(`https://api.polygon.io/v2/reference/news?limit=4&ticker=AMZN&published_utc=${dateValue}&order=desc&apiKey=xWu6XxECpCjH0y5kFjQIKcUvTMSEew_K`)
            .then(response => response.json())
            .then(data => {
                // Get the news container
                const newsContainer = document.getElementById('newsContainer');

                // Remove existing news cards
                newsContainer.innerHTML = '';

                // Loop through each news item and create HTML elements
                data.results.forEach(newsItem => {
                    const newsCard = document.createElement('div');
                    newsCard.classList.add('col-md-6', 'mb-4');

                    const imageSrc = newsItem.image_url ? newsItem.image_url : 'https://via.placeholder.com/150'; // Use a placeholder image as fallback

                    const truncatedDescription = truncateText(newsItem.description, 20); // Truncate description to 20 words

                    newsCard.innerHTML = `
                        <div class="card card-trends">
                            <img src="${imageSrc}" class="card-img-top" alt="${newsItem.title}" />
                            <div class="card-body">
                                <h5 class="card-title">${newsItem.title}</h5>
                                <p class="card-text">${truncatedDescription}</p>
                                <a href="${newsItem.article_url}" target="_blank" class="btn btn-success">Read More</a>
                            </div>
                        </div>
                    `;

                    // Append the news card to the news container
                    newsContainer.appendChild(newsCard);
                });
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }

    // Function to truncate text to a specified word limit
    function truncateText(text, maxWords) {
        const words = text.split(' ');
        const truncatedWords = words.slice(0, maxWords);
        return truncatedWords.join(' ') + (words.length > maxWords ? '...' : '');
    }

    // Function to validate date format (YYYY-MM-DD)
    function isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }

    // Add event listener to the fetch button to fetch news when clicked
    fetchButton.addEventListener('click', fetchNewsByDate);
});



// Daily news
document.addEventListener('DOMContentLoaded', function () {
    const dailyNews = document.getElementById('daily-news');
    const storageKey = 'lastFetchedDate';

    // Get the last fetched date from local storage
    let lastFetchedDate = localStorage.getItem(storageKey);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`; // Current date in YYYY-MM-DD format

    // Check if the last fetched date is different from the current date
    if (lastFetchedDate !== currentDate) {
        fetchNews(currentDate);
    }

    function fetchNews(date) {
        const apiKey = 'xWu6XxECpCjH0y5kFjQIKcUvTMSEew_K';
        const url = `https://api.polygon.io/v2/reference/news?limit=5&ticker=AMZN&published_utc=${date}&order=desc&apiKey=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderNews(data.results);
                // Store the current date in local storage as the last fetched date
                localStorage.setItem(storageKey, date);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                alert('An error occurred while fetching news. Please try again later.');
            });
    }

    function renderNews(newsItems) {
        dailyNews.innerHTML = '';

        newsItems.forEach(newsItem => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('card', 'card-news', 'mb-2');

            newsCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${newsItem.title}</h5>
                    <p class="card-text">${newsItem.description}</p>
                    <a href="${newsItem.article_url}" class="btn btn-success read-more">Read More</a>
                </div>
            `;

            dailyNews.appendChild(newsCard);
        });

        addReadMoreEventListeners();
    }

    function addReadMoreEventListeners() {
        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                window.open(this.href, '_blank');
            });
        });
    }
});