var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        //request was sucsessful
        if (response.ok) {
            response.json().then(function (data) {
                //pass response data to dom function
                displayIssues(data);

                //check if api had pignated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
}

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no opoen isues!";
        return;

    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create span to; hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check it issuse is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container 
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function (repo) {
    //add text to wearning container
    limitWarningEl.textContent = "To see more than 30 isues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See more Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warining contrainer
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");