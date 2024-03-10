const accordion = document.getElementsByClassName("team-container-title");

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    })
}

loadPlayers();

async function loadPlayers() {
    const mainResponse = await fetch("./resources/data/player-data.json");
    const json = await mainResponse.json();

    const iconResponse = await fetch("./resources/data/icons.json");
    const icons = await iconResponse.json();

    for (const [key, value] of Object.entries(json.data.teams)) {
        console.log(`Key: ${key}, Value: ${value}`);

        const teamReponse = await fetch(`./resources/data/teams/${key.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.json`);
        const team = await teamReponse.json();

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
                </div>
            </div>
            <div class="player-container-content-wrapper">
                <div class="player-container-content">
                    <table class="player-table">
                    </table>
                </div>
            </div>
        `;
        var table = teamContainer.getElementsByClassName("player-table")[0];

        for (let i = 0; i < value.players.length; i++) {  
            var stats = ["Rnd", "ACS", "K:D", "ADR", "K", "D", "A", "FK", "FD"];     
            playerName = value.players[i].name;
            playerRealName = value.players[i].realName;
            playerImg = value.players[i].image;

            let tbody = document.createElement("tbody");
            tbody.className = "player-card";
            tbody.innerHTML = `
                <tr>
                    <td rowspan="3" class="player-img">
                        <img src="${playerImg}" onerror="this.onerror=null; this.src='./resources/img/unknown-person-icon.png'" alt="${playerName}">
                    </td>
                    <td colspan="9" class="player-title">${playerName}
                        <p><em>${playerRealName}</em></p>
                    </td>
                </tr>

                <tr class="player-stats-label">
                </tr>
                <tr class="player-stats">
                </tr>
            `;

            var playerTitle = tbody.getElementsByClassName("player-title")[0];
            var playerStatsLabel = tbody.getElementsByClassName("player-stats-label")[0];
            var playerStats = tbody.getElementsByClassName("player-stats")[0];

            for (let j = 0; j < stats.length; j++) {
                let statLabelElement = document.createElement("td");
                statLabelElement.textContent = stats[j];
                playerStatsLabel.appendChild(statLabelElement);
                
                let statElement = document.createElement("td");
                let stat = value.players[i].stats[stats[j]];
                statElement.innerHTML = `${stat}`
                playerStats.appendChild(statElement);
            }

            for (let j = 0; j < value.players[i].agents.length; j++) {
                let agentElement = document.createElement("img");
                agentElement.className = "player-agent";

                let agent = value.players[i].agents[j];
                let lowerCase = agent.toLowerCase();

                agentElement.src = icons.data[Object.keys(icons.data).find(key => key.toLowerCase() === lowerCase)];
                agentElement.alt = agent;

                playerTitle.appendChild(agentElement);
            }

            table.appendChild(tbody);
        }



        teamContainer.children[0].addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('active');
            this.classList.toggle('active');
        });
        teamList.appendChild(teamContainer);
    }
}