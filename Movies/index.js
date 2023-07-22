$(document).ready(function () {
  var debounceTimeout = null;
  $("#searchInput").on("input", function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => getMovie(this.value.trim()), 1500);
  });

  $("#showMore").on("click", function () {
    onShowMoreClicked();
  });
});

function getMovie(title) {
  if (!title) {
    return;
  }

  onBeforeSend();

  fetchMovieFromApi(title);
}

function fetchMovieFromApi(title) {
  let ajaxRequest = new XMLHttpRequest();

  ajaxRequest.open("GET", `http://omdbapi.com/?t=${title}&apikey=b7eac1`, true);
  ajaxRequest.timeout = 5000;
  ajaxRequest.ontimeout = (e) => onApiError();

  ajaxRequest.onreadystatechange = function () {
    if (ajaxRequest.readyState === 4) {
      if (ajaxRequest.status === 200) {
        handleRequest(JSON.parse(ajaxRequest.responseText));
      } else {
        onApiError();
      }
    }
  };
  ajaxRequest.send();
}

function handleRequest(response) {
  if (response.Response === "True") {
    let transformedResponse = transformResponse(response);

    buildMovie(transformedResponse);
  } else if (response.Response === "False") {
    hideComponent("#waiting");
    showNotFound();
  }
}

function buildMovie(apiResponse) {
  if (apiResponse.poster) {
    $("#image")
      .attr("src", apiResponse.poster)
      .on("load", function () {
        buildMovieMetadata(apiResponse);
      });
  } else {
    buildMovieMetadata(apiResponse);
  }
}

function onBeforeSend() {
  showComponent("#waiting");
  hideComponent(".movie");
  hideNotFound();
  hideError();
  collapsePlot();
  hideExtras();
}

function onApiError() {
  hideComponent("#waiting");
  showError();
}

function buildMovieMetadata(apiResponse) {
  hideComponent("#waiting");
  handleLiterals(apiResponse);
  showComponent(".movie");
}

function handleLiterals(apiResponse) {
  $(".movie")
    .find("[id]")
    .each((index, item) => {
      if ($(item).is("a")) {
        $(item).attr("href", apiResponse[item.id]);
      } else {
        let valueElement = $(item).children("span");
        let metaDataValue = apiResponse[item.id] ? apiResponse[item.id] : "-";

        valueElement.length
          ? valueElement.text(metaDataValue)
          : $(item).text(metaDataValue);
      }
    });
}

function transformResponse(apiResponse) {
  let camelCaseKeysResponse = camelCaseKeys(apiResponse);
  buildImdbLink(camelCaseKeysResponse);
  clearNotAvailableInformation(camelCaseKeysResponse);
  return camelCaseKeysResponse;
}

function camelCaseKeys(apiResponse) {
  return _.mapKeys(apiResponse, (value, key) => _.camelCase(key));
}

function buildImdbLink(apiResponse) {
  if (apiResponse.imdbId && apiResponse.imdbId !== "N/A") {
    apiResponse.imdbId = `https://www.imdb.com/title/${apiResponse.imdbId}`;
  }
}

function clearNotAvailableInformation(apiResponse) {
  for (let key in apiResponse) {
    if (apiResponse.hasOwnProperty(key) && apiResponse[key] === "N/A") {
      apiResponse[key] = "-";
    }
  }
}

function onShowMoreClicked() {
  $("plot").toggleClass("expanded");

  if ($(".extended").is(":visible")) {
    $(".extended").hide(700);
  } else {
    $(".extended").show(700);
  }
}

function showComponent(jquerySelector) {
  return $(jquerySelector).removeClass("hidden");
}

function hideComponent(jquerySelector) {
  return $(jquerySelector).addClass("hidden");
}

function showNotFound() {
  return $(".center").clone().removeClass("hidden").appendTo(".center");
}

function hideNotFound() {
  return $(".center").find("not-found").remove();
}

function showError() {
  $(".error").clone().removeClass("hidden").appendTo(".center");
}

function hideError() {
  return $(".center").find("error").remove();
}

function hideExtras() {
  $(".extended").hide();
}

function collapsePlot() {
  $("#plot").removeClass("expanded");
}
