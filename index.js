const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyBAqlFUPNA4WCfPJUm3iOorEIYDFqBqEuw',
    q: `${searchTerm}`,
    type: "video"
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
      <h2><a class="js-result-name" href="https://youtu.be/${result.id.videoId}" target="_blank">${result.snippet.title}</a></h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${result.id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
