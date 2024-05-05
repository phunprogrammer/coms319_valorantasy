const puppeteer = require('puppeteer');
const { Player } = require("../models/playerModel");

const scrapeAllStats = async (id) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.vlr.gg/event/stats/${id}`);

        await page.waitForSelector("tbody tr");

        const players = await scrapeTable(page, id);

        await browser.close();

        return players;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

const scrapeWeekStats = async (id, week) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.vlr.gg/event/stats/${id}`);

        const weekButtons = await page.$$('div.wf-tag-btn');

        for (const button of weekButtons) {
            const buttonText = await button.evaluate(node => node.textContent.trim());

            const number = parseInt(buttonText.split(' ')[1]);

            if (number !== week)
                await button.click();
        }

        await page.click("#wrapper > div.col-container > div > form > div > div:nth-child(2) > div:nth-child(3) > input");

        await page.waitForSelector("tbody tr");

        const players = await scrapeTable(page, id);

        await browser.close();

        return players;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

const scrapeTable = async (page, id) => {
    var players = await page.$$eval("tbody tr", rows => {
        let players = [];

        var labels = Array.from(document.querySelectorAll("thead tr th")).map(label => label.textContent).slice(2);

        rows.forEach(row => {
            let player = {};
            player.id = row.querySelector("a").getAttribute("href").split("/")[2];
            player.name = row.querySelector("div.text-of").textContent.trim();
            player.team = row.querySelector("div.stats-player-country").textContent.trim();

            player.stats = {};

            var i = 0;
            player.stats[labels[i++]] = row.querySelector("td.mod-rnd").textContent;
            row.querySelectorAll("td.mod-color-sq div.color-sq span").forEach((span) => {
                player.stats[labels[i++]] = span.textContent.trim();
            });

            player.stats[labels[i++]] = row.querySelector("td.mod-cl").textContent.trim();
            player.stats[labels[i++]] = row.querySelector("td.mod-kmax a").textContent.trim();

            row.querySelectorAll("td:not([class])").forEach((td) => {
                player.stats[labels[i++]] = td.textContent.trim();
            });

            players.push(player);
        });

        return players;
    });

    for (var player of players) {
        await page.goto(`https://www.vlr.gg/player/${player.id}`);
        const playerData = await page.evaluate(() => {
            return {
                image: document.querySelector("div.player-header img").getAttribute("src"),
                realName: document.querySelector("div.player-header h2.player-real-name").textContent
            };
        });

        player.eventId = id;
        player.realName = playerData.realName;
        player.image = playerData.image;

        player.agents = await page.$$eval("tbody tr", rows => {
            var agents = {};

            rows.forEach(row => {
                const agentName = row.querySelector("td img").getAttribute("src").split("/").slice(-1)[0].split(".")[0];
                const agentNum = row.querySelector("td:nth-child(2) > span").textContent.match(/\((\d+)\)/)?.[1];
                agents[agentName] = agentNum;
            });

            return agents;
        });
        
        player.stats["PTS"] = calcPoints(player).toFixed(2);
    }

    return players;
};

const calcPoints = (player) => {
    const K = parseFloat(player.stats["K"]) || 0;
    const D = parseFloat(player.stats["D"]) || 0;
    const A = parseFloat(player.stats["A"]) || 0;
    const FK = parseFloat(player.stats["FK"]) || 0;
    const FD = parseFloat(player.stats["FD"]) || 0;
    const CL = player.stats["CL"] ? parseFloat(player.stats["CL"].split("/")[0]) : 0;

    return (K - D) * 0.75 + A * 0.5 + FK - FD + (CL * 3);
};

const generateStats = async (week) => {
    await Player.deleteMany({});

    var players = await scrapeAllStats(2004, 5);

    for(const { stats, ...player } of players) {
        const newPlayer = new Player(player);
        newPlayer.stats["total"] = stats;
        await newPlayer.save();
    }

    for (let i = 1; i <= week; i++) {
        players = await scrapeWeekStats(2004, i);
        
        for(const { stats, ...player } of players) {
            const existingPlayer = await Player.findOne({ id: player.id });
            await Player.updateOne(
                { _id: existingPlayer._id },
                { $set: { ["stats.week" + i]: stats } }
            );
        }
    }
};

module.exports = {
    scrapeAllStats,
    scrapeWeekStats,
    generateStats
};