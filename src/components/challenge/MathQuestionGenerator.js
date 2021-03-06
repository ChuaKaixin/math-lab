import Constants from '../utilities/Constants';

export default function generateQuestion (quizType){
    const operatorList = ['+','-','*','/'];
    let operation = Math.floor(Math.random() * 4) ;
    let factor = determineQuestionFactorBaseOnQuizType(quizType);
    let correctAns = 0;
    let validQuestion = false;
    let num1, num2;
    while(!validQuestion) {
        num1 = Math.floor(Math.random() * factor) + 1 ;
        num2 = Math.floor(Math.random() * factor) + 1 ;
        switch(operation) {
            case 0:
                correctAns = num1 + num2;
                break;
            case 1:
                correctAns = num1 - num2;
                break;
            case 2: 
                correctAns = num1 * num2;
                break;
            case 3:
                correctAns = num1;
                num1 = num1*num2;
                break;
            default:
                correctAns = 0;
        }
        if(quizType!==Constants.level1Description || correctAns >= 0) {
            validQuestion = true;
        }
    }
    return {num1, num2, operation: operatorList[operation], answer:generateAnswerList(correctAns, quizType)}
}

function determineQuestionFactorBaseOnQuizType(quizType) {
    switch(quizType) {
        case Constants.level1Description:
            return 10;
        case Constants.level2Description:
            return 20;
        case Constants.level3Description:
            return 30;
        default:
        return 1;
    }
}

function determineAnswerFactorBaseOnQuizType(quizType) {
    switch(quizType) {
        case Constants.level1Description:
            return 5;
        case Constants.level2Description:
            return 7;
        case Constants.level3Description:
            return 13;
        default:
            return 1;
    }
}

function generateAnswerList(correctAns, quizType) {
    let correctAnswerPosition = Math.floor(Math.random() * 4) 
    let answerArray = []
    for(let i = 0; i<=3; i++) {
        if(i===correctAnswerPosition) {
            answerArray.push(correctAns);
        } else {
            let isUnique = false;
            let randomAns = 0;
            do {
                randomAns = randomAnswerGenerator(correctAns, quizType);
                isUnique = (!answerArray.includes(randomAns)) && randomAns!==correctAns;
                if(isUnique) {
                    answerArray.push(randomAns);
                }
            } while(!isUnique);
        }
    }
    console.log({answerArray, correctAnswerPosition});
    return {answerArray, correctAnswerPosition};
}

function randomAnswerGenerator(correctAns, quizType) {
    let randomizer = Math.floor(Math.random() * 3);
    let factor = determineAnswerFactorBaseOnQuizType(quizType);
    switch(randomizer) {
        case 0:
            return correctAns - (Math.floor(Math.random() * factor)-1);
        case 1:
            return correctAns + (Math.floor(Math.random() * factor)+1);
        case 2:
            let mFactor = Math.floor(Math.random() * 4) + 1;
            return correctAns * (mFactor===1?2:mFactor);
        default:
            break;
    }
}