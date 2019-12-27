
function pairingsTeams(numOfTeams, numOfGames) {

    var pairs = [];
    var teamObj={};
    var isOddGame = numOfGames % 2 == 0 ? false : true;
    var isOddTeam = numOfTeams % 2 == 0 ? false : true;

    var generatePairs = function(){
        var pairNum = Math.floor( (numOfTeams - 1) / 2);
        
        // Initialize the list of teams
        var teams = Array(numOfTeams).fill().map((val,idx) => idx)

        for(var i = 0; i < Math.round(numOfTeams/2); i++) {

            var remainGames = numOfGames
            while(remainGames > 0) {
                var delta = remainGames - pairNum
                var repeatNum = delta > 0 ? pairNum : remainGames
                
                for (var k = 0; k < repeatNum; k++) {
                    pairs.push(`${teams[pairNum - k]},${teams[pairNum + k + 1]}`);
                }

                if (!isOddTeam) {
                    pairs.push(`${teams[0]},${teams[numOfTeams - 1]}`)
                }

                // rotate team array
                var last = teams.pop()
                teams.unshift(last)
                remainGames = delta
            }
        }
    }

    var breakdownPairs = function(){
        pairs.forEach(function(i) {
            var key = i;
            let away = key.split(',')[1];
            let home = key.split(',')[0];

            if (!teamObj[away]) {
                teamObj[away] = {home:0, away: 0};
            }
            if (!teamObj[home]) {
                teamObj[home] =  {home:0, away: 0};
            }

            teamObj[away]['away'] += 1;
            teamObj[home]['home'] += 1;
        })
    }

    generatePairs();
    breakdownPairs();

    console.log("pairs", pairs);
    console.log("Home/Away Breakdown >>>");
    console.log(teamObj);
}

// pairingsTeams(11,9);
// pairingsTeams(4,11);
pairingsTeams(10,4);