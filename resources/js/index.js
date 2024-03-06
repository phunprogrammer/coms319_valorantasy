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

var teamList = document.getElementsByClassName("team-list-container")[0];

var teamContainer = document.createElement("div");
teamContainer.className = "team-container";
teamContainer.innerHTML = `
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
`;
teamList.appendChild(teamContainer);

const accordion = document.getElementsByClassName("team-container-title");

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    })
}