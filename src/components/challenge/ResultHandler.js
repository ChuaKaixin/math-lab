const axios = require('axios')
axios.defaults.withCredentials = true;

async function commitResults(quizType, correctAnswers) {
    try {
        const results = {
            level: quizType,
            score: correctAnswers
          };
        const commitStatus = await axios.put(process.env.REACT_APP_API_URL + "/api/result/update_results", results, 
        {
            validateStatus: validateStatus
        });
        if(commitStatus.progress) {
            return {status:"done"};
        }

    } catch (error) {
        return {status: "error"};
    }
}

async function getResults() {
    try {
        const results = await axios.get(process.env.REACT_APP_API_URL + "/api/result", 
        {
            validateStatus: validateStatus
        });
        if(results.data.results) {
            return results.data.results;
        }

    } catch (error) {
        return {status: "error"};
    }
}

async function getResultsBaseOnLevel(quizLevel) {
    try {
        const allResults = await getResults();
        if(allResults[quizLevel].progress) {
            return allResults[quizLevel].progress;
        } else return [];
    } catch (error) {
        return {status: "error"};
    }
}

async function getScoreBoard() {
    try {
        const results = await axios.get(process.env.REACT_APP_API_URL + "/api/score_board", 
        {
            validateStatus: validateStatus
        });
        let returnResults = {}
        if(results.data) {
            for(let score of results.data) {
                returnResults[score.level] = score.scoreList;
            }
        } 
        return returnResults;
    } catch (error) {
        return {status: "error"}
    }
}


function validateStatus(status) {
    return true;
}
export {commitResults, getResults, getResultsBaseOnLevel, getScoreBoard}