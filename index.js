"use strict";

const apiKey = "8HTsjZokWKl3MARlOD3UFzTcBGag6mFgQPhCeDn5";
const searchURL = `https://developer.nps.gov/api/v1/parks`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    let data = responseJson.data[i];
    $("#results-list").append(`<li><h3>${data.fullName} - ${data.states}</h3>
      <p>${data.description}</p>
      <p><a href="${data.url}">${data.url}</a></p></li>`);
  }
  $("#results").removeClass("hidden");
}

function getNationalParks(query, maxResults = 10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(responseJson => displayResults(responseJson));
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchState = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getNationalParks(searchState, maxResults);
  });
}

$(watchForm);
