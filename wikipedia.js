let inputEl = document.getElementById("inputId");
let resultContainer = document.getElementById("searchResultsId");
let spinnerEl = document.getElementById("spinnerId");

function appendingData(searchResult){
    let {title, link, description} = searchResult;

    let itemEl = document.createElement("div");
    itemEl.classList.add("result-item");
    resultContainer.appendChild(itemEl);

    let titleEl = document.createElement("a");
    titleEl.classList.add("html-title");
    titleEl.textContent = title;
    titleEl.href = link;
    itemEl.appendChild(titleEl);

    let linebreak = document.createElement("br");
    itemEl.appendChild(linebreak);

    let linkEl = document.createElement("a");
    linkEl.classList.add("html-link");
    linkEl.textContent = link;
    linkEl.href = link;
    itemEl.appendChild(linkEl);

    let linebreak2 = document.createElement("br");
    itemEl.appendChild(linebreak2);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("html-description");
    descriptionEl.textContent = description;
    itemEl.appendChild(descriptionEl);

}

function displayResults(searchResults){
    spinnerEl.classList.toggle('none');
    for(let result of searchResults){
        appendingData(result);
    }
}

function fetchingResults(event){
    if(event.key === "Enter"){
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputEl.value;
        let options = {
            method: "GET"
        }

        resultContainer.textContent = "";
        spinnerEl.classList.toggle('none');
        
        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            console.log(jsonData);
            let {search_results} = jsonData;
            displayResults(search_results);
        });
    }
}

inputEl.addEventListener("keydown", fetchingResults);