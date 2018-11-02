const axios = require('axios')

async function commitResults(quizType, correctAnswers) {
    try {
        const results = {
            level: quizType,
            score: correctAnswers
          };
        const commitStatus = await axios.put(process.env.REACT_APP_API_URL + "/api/result/update_results", results, 
        {
            withCredentials: true,
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
            withCredentials: true,
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
        const results = await axios.get(process.env.REACT_APP_API_URL + "/api/result", 
        {
            withCredentials: true,
            validateStatus: validateStatus
        });
        if(results.data.results[quizLevel].progress) {
            return results.data.results[quizLevel].progress;
        } else return [];

    } catch (error) {
        return {status: "error"};
    }
}

function validateStatus(status) {
    return true;
}
export {commitResults, getResults, getResultsBaseOnLevel}