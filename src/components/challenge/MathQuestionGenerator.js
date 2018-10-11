export default function generateQuestion (quizType){
    const operatorList = ['+','-','*','/'];
    let operation = Math.floor(Math.random() * 4) ;
    
        let correctAns = 0;
        let num1 = Math.floor(Math.random() * 100) + 1 ;
        let num2 = Math.floor(Math.random() * 100) + 1 ;
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
        return {num1, num2, operation: operatorList[operation], answer:generateAnswerList(correctAns)}
}

function generateAnswerList(correctAns) {
    let correctAnswerPosition = Math.floor(Math.random() * 3) 
    let answerArray = []
    for(let i = 0; i<=3; i++) {
        if(i===correctAnswerPosition) {
            answerArray.push(correctAns);
        } else {
            answerArray.push(randomAnswerGenerator(correctAns));
        }
    }
    return {answerArray, correctAnswerPosition};
}

function randomAnswerGenerator(correctAns) {
    let randomizer = Math.floor(Math.random() * 3);
    switch(randomizer) {
        case 0:
            return correctAns - (Math.floor(Math.random() * 20)+1);
        case 1:
            return correctAns + (Math.floor(Math.random() * 20)+1);
        case 2:
            return correctAns * (Math.floor(Math.random() * 4)+1);
        default:
            break;
    }
}