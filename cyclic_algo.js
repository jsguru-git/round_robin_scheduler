
function pairingsTeams(numOfTeams, numOfGames) {

    var pairs = [];
    var teamHAObj = {};
    var teamGObj = {};

    var isOddTeam = numOfTeams % 2 == 0 ? false : true;
    var bye = -1;
    var home, away;
    var generatePairs = function(){
        var pairNum = Math.floor( (numOfTeams - 1) / 2);
        
        // Initialize the list of teams
        var teams = Array(numOfTeams).fill().map((val,idx) => idx);
        if (isOddTeam) teams.push(bye);

        // for (var i = 0; i < numOfGames; i++) {
        var remainGames = numOfGames;
        while (remainGames > 0) {
            for (var k = 0; k < pairNum; k++) {
                if (k % 2 == 0) {
                    home = teams[pairNum - k];
                    away = teams[pairNum + k + 1];
                } else {
                    home = teams[pairNum + k + 1];
                    away = teams[pairNum - k];
                }
                
                if (home === bye || away === bye)
                    continue;
                pairs.push(`${home},${away}`);
            }

            if (remainGames % 2 == 0){
                home = teams[0];
                away = teams[teams.length - 1];
            } else {
                home = teams[teams.length - 1];
                away = teams[0];
            }

            if (home !== bye && away !== bye) {
                pairs.push(`${home},${away}`);
                remainGames -= 1;
            }

            // rotate team array
            var last = teams.pop();
            teams.splice(1, 0, last);
            
        }
    }

    var spliteHomeAway = function(){
        pairs.forEach(function(i) {
            var key = i;
            let away = key.split(',')[1];
            let home = key.split(',')[0];

            if (!teamHAObj[away]) {
                teamHAObj[away] = {home:0, away: 0};
            }
            if (!teamHAObj[home]) {
                teamHAObj[home] =  {home:0, away: 0};
            }

            teamHAObj[away]['away'] += 1;
            teamHAObj[home]['home'] += 1;
        })
    }

    var gamesPerTeam = function(){
        pairs.forEach(function(i) {
            var key = i;
            let away = key.split(',')[1];
            let home = key.split(',')[0];

            if (!teamGObj[away]) {
                teamGObj[away] = {[home]: 0}
            }

            if (!teamGObj[home]) {
                teamGObj[home] = {[away]: 0}
            }

            if (!teamGObj[away][home]) {
                teamGObj[away][home] = 0
            }

            if (!teamGObj[home][away]) {
                teamGObj[home][away] = 0
            }

            teamGObj[away][home] += 1;
            teamGObj[home][away] += 1;
        })
    }

    generatePairs();
    spliteHomeAway();
    gamesPerTeam();

    console.log(">>>>>>>>>>>>>>>>>>>>>")
    console.log(`teams: ${numOfTeams}, games: ${numOfGames}`)
    console.log(">>>>>>>>>>>>>>>>>>>>>")
    console.log("pairs", pairs);
    console.log("Home/Away Breakdown >>>");
    console.log(teamHAObj);
    console.log("number of games with other teams per team >>>");
    console.log(JSON.stringify(teamGObj, null, 2));
}

// pairingsTeams(11,9);
// pairingsTeams(4,11);
pairingsTeams(8,11);