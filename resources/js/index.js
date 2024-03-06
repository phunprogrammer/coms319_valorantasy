/*
        <div class="team-container">
            <div class="team-container-title">
                <img class="team-logo" src="https://owcdn.net/img/603c00d5c5a08.png" alt="100-thieves">
                <div class="team-info">
                    <a class="team-name" href="#">100 Thieves <img src="./resources/img/US.jpg" alt="US flag" width="25px" height="15px"></a>
                    <div class="team-stats"> 
                        <ul>
                            <li><strong>MATCHES WON: </strong></li>
                            <li><strong>MATCHES LOST: </strong></li>
                            <li><strong>MATCH WIN%: </strong></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="team-container-content-wrapper">
                <div class="team-container-content">
                    <p>PLAYER 1. </p>
                </div>
            </div>
        </div>
*/

var teams = [ "100t", "c9", "eg", "fur", "g2", "kru", "lev", "loud", "mibr", "nrg", "sen" ];

for (let i = 0; i < teams.length; i++) {
    fetch(`./resources/data/teams/${teams[i]}.json`)
        .then(response => response.json())
        .then(team => loadTeam(team));
}

const accordion = document.getElementsByClassName("team-container-title");

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    })
}
function loadTeam(team) {
    var teamName = team.data.name;
    var teamLogo = team.data.logo;
    var teamCountry = team.data.country.replace(/ /g,"_").toLowerCase();
    var teamTag = team.data.tag;

    var teamList = document.getElementsByClassName("team-list-container")[0];
    var teamContainer = document.createElement("div");

    teamContainer.className = "team-container";
    teamContainer.innerHTML = `
        <div class="team-container-title">
            <img class="team-logo" src="${teamLogo}" alt="${teamTag}">
            <div class="team-info">
                <a class="team-name" href="#">${teamName} <img src="./resources/img/${teamCountry}.jpg" alt="${teamCountry}" width="25px" height="15px"></a>
                <div class="team-stats"> 
                    <ul>
                        <li><strong>MATCHES WON: </strong></li>
                        <li><strong>MATCHES LOST: </strong></li>
                        <li><strong>MATCH WIN%: </strong></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="team-container-content-wrapper">
            <div class="team-container-content">
                <p>PLAYER 1. </p>
            </div>
        </div>  
    `;
    teamContainer.children[0].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    });
    teamList.appendChild(teamContainer);
}