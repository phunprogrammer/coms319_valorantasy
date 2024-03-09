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
                    <table class="player-table" border="1">
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/asc.jpg" alt="ascent" width="70" height="40">
                                    </td>
                                    <td colspan="9">ASCENT STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/bind.jpg" alt="bind" width="70" height="40">
                                    </td>
                                    <td colspan="9">BIND STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/breeze.jpg" alt="breeze" width="70" height="40">
                                    </td>
                                    <td colspan="9">BREEZE STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/icebox.jpg" alt="icebox" width="70" height="40">
                                    </td>
                                    <td colspan="9">ICEBOX STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/lotus.jpg" alt="lotus" width="70" height="40">
                                    </td>
                                    <td colspan="9">LOTUS STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/split.jpg" alt="split" width="70" height="40">
                                    </td>
                                    <td colspan="9">SPLIT STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                        <tr>
                            <thead>
                                <tr>
                                    <td>
                                        <img class="map-img" src="./resources/img/sunset.jpg" alt="sunset" width="70" height="40">
                                    </td>
                                    <td colspan="9">SUNSET STATS</td>
                                </tr>
                                <tr>
                                    <td>WIN%: 42%</td>
                                    <td>W: 41</td>
                                    <td>L: 50</td>
                                    <td>AWIN%: 38%</td>
                                    <td>RW: 30</td>
                                    <td>RL: 51</td>
                                    <td>DWIN%: 46%</td>
                                    <td>RW: 42</td>
                                    <td>RL: 45</td>
                                </tr>
                            </thead>
                        </tr>
                    </table>
                </div>
            </div>
    `;
    teamContainer.children[0].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    });
    teamList.appendChild(teamContainer);
}