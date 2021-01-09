// Global variables
var search = $(".searchTerm");
var num = $("#num");
var yearStart = $(".yearStart");
var yearEnd = $(".yearEnd");

/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
  // Gets term searched for
   var searchTerm = search.val();
   console.log(searchTerm);
  //var searchTerm2 = "cake";
  // Returns API URL with term searched
  return "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=0GWKvvC2MKV3ZR6QAeTJ6kJAdnB98AG7";
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */
function updatePage(NYTData) {
  console.log(NYTData);
  // Storing array of search results
  var results = NYTData.response.docs;

  // For loop going through array of search results
  for (i=0;i<results.length;i++){
    // Creates elements to show results
    var div=$("<div>");
    var aTag=$("<a>");
    var pTag=$("<p>");

    // Retrieves and adds headline and article URL to div
    //div.text(results[i].headline.main);
    aTag.attr("href",results[i].web_url);
    aTag.text(results[i].headline.main);
    div.append(aTag);

    // Retrieves and adds byline to div
    pTag.text(results[i].byline.original);
    div.append(pTag);

    $(".listarticles").append(div);
  };
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}
// Assigns id to run-search, creates search button and appends to container
$(".container").append($("<button>").attr("id","run-search").text("cake"));

$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  console.log("click");
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  console.log(queryURL);
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
