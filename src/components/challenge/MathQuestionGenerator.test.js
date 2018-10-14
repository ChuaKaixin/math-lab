import Constants from '../utilities/Constants';
import generateQuestion from './MathQuestionGenerator'


it("should generate an addition question with correct answer and 3 other random answers", () => {
    const mockRandom = jest.fn();
    global.Math.random = mockRandom;
    mockRandom
    .mockReturnValueOnce(0.1)   //operator
    .mockReturnValueOnce(0.1)   //num1
    .mockReturnValueOnce(0.2)   //num2
    .mockReturnValueOnce(0.2)   //correct answer position
    .mockReturnValueOnce(0.1)   //random answer index 1 - use subtraction
    .mockReturnValueOnce(0.5)   //random answer index 1 - Floor(0.5*5) - 1 = 1 [random answer is 5-1=4]
    .mockReturnValueOnce(0.4)   //random answer index 2 - use addition
    .mockReturnValueOnce(0.5)   //random answer index 2 - Floor(0.5*5) + 1 = 3 [random answer is 5+3=8]
    .mockReturnValueOnce(0.7)   //random answer index 3 - use multiplication
    .mockReturnValueOnce(0.5)   //random answer index 3 - Floor(0.5*4) + 1 = 3 [random answer is 5*3=15]
    let randomQuestion = generateQuestion(Constants.level1Description);
    expect(randomQuestion.operation).toEqual('+'); //add operation
    expect(randomQuestion.num1).toEqual(2); //num1 = (Floor(0.1 * 10) + 1) = 2
    expect(randomQuestion.num2).toEqual(3); //num2 = (Floor(0.2 * 10) + 1) = 3
    expect(randomQuestion.answer.correctAnswerPosition).toEqual(0); //num2 = (Floor(0.2 * 4)) = 0
    expect(randomQuestion.answer.answerArray[0]).toEqual(5);    //correct answer is at position 0
    expect(randomQuestion.answer.answerArray[1]).toEqual(4);    //index 1 random answer = 4
    expect(randomQuestion.answer.answerArray[2]).toEqual(8);    //index 2 random answer = 8
    expect(randomQuestion.answer.answerArray[3]).toEqual(15);   //index 3 random answer = 15
})

it("should generate a subtraction question with correct answer and 3 other random answers", () => {
    const mockRandom = jest.fn();
    global.Math.random = mockRandom;
    mockRandom
    .mockReturnValueOnce(0.4)   //operator
    .mockReturnValueOnce(0.1)   //num1
    .mockReturnValueOnce(0.2)   //num2
    .mockReturnValueOnce(0.4)   //correct answer position
    .mockReturnValueOnce(0.1)   //random answer index 1 - use subtraction
    .mockReturnValueOnce(0.5)   //random answer index 1 - Floor(0.5*5) - 1 = 1 [random answer is -1-1=-2]
    .mockReturnValueOnce(0.4)   //random answer index 2 - use addition
    .mockReturnValueOnce(0.5)   //random answer index 2 - Floor(0.5*5) + 1 = 3 [random answer is -1+3=2]
    .mockReturnValueOnce(0.7)   //random answer index 3 - use multiplication
    .mockReturnValueOnce(0.5)   //random answer index 3 - Floor(0.5*4) + 1 = 3 [random answer is -1*3=-3]
    let randomQuestion = generateQuestion(Constants.level1Description);
    expect(randomQuestion.operation).toEqual('-'); //add operation
    expect(randomQuestion.num1).toEqual(2); //num1 = (Floor(0.1 * 10) + 1) = 2
    expect(randomQuestion.num2).toEqual(3); //num2 = (Floor(0.2 * 10) + 1) = 3
    expect(randomQuestion.answer.correctAnswerPosition).toEqual(1); //num2 = (Floor(0.4 * 4)) = 1
    expect(randomQuestion.answer.answerArray[1]).toEqual(-1);    //correct answer is at position 1
    expect(randomQuestion.answer.answerArray[0]).toEqual(-2);    //index 0 random answer = -2
    expect(randomQuestion.answer.answerArray[2]).toEqual(2);    //index 2 random answer = 2
    expect(randomQuestion.answer.answerArray[3]).toEqual(-3);   //index 3 random answer = -3
})

it("should generate a multiplication question with correct answer and 3 other random answers", () => {
    const mockRandom = jest.fn();
    global.Math.random = mockRandom;
    mockRandom
    .mockReturnValueOnce(0.6)   //operator
    .mockReturnValueOnce(0.1)   //num1
    .mockReturnValueOnce(0.2)   //num2
    .mockReturnValueOnce(0.4)   //correct answer position
    .mockReturnValueOnce(0.1)   //random answer index 1 - use subtraction
    .mockReturnValueOnce(0.5)   //random answer index 1 - Floor(0.5*5) - 1 = 1 [random answer is 6-1=5]
    .mockReturnValueOnce(0.4)   //random answer index 2 - use addition
    .mockReturnValueOnce(0.5)   //random answer index 2 - Floor(0.5*5) + 1 = 3 [random answer is 6+3=9]
    .mockReturnValueOnce(0.7)   //random answer index 3 - use multiplication
    .mockReturnValueOnce(0.5)   //random answer index 3 - Floor(0.5*4) + 1 = 3 [random answer is 6*3=18]
    let randomQuestion = generateQuestion(Constants.level1Description);
    expect(randomQuestion.operation).toEqual('*'); //division operation
    expect(randomQuestion.num1).toEqual(2); //num1 = (Floor(0.1 * 10) + 1) = 2
    expect(randomQuestion.num2).toEqual(3); //num2 = (Floor(0.2 * 10) + 1) = 3
    expect(randomQuestion.answer.correctAnswerPosition).toEqual(1); //num2 = (Floor(0.4 * 4)) = 1
    expect(randomQuestion.answer.answerArray[1]).toEqual(6);    //correct answer is at position 1
    expect(randomQuestion.answer.answerArray[0]).toEqual(5);    //index 0 random answer = 5
    expect(randomQuestion.answer.answerArray[2]).toEqual(9);    //index 2 random answer = 9
    expect(randomQuestion.answer.answerArray[3]).toEqual(18);   //index 3 random answer = 18
})

it("should generate a division question with correct answer and 3 other random answers", () => {
    const mockRandom = jest.fn();
    global.Math.random = mockRandom;
    mockRandom
    .mockReturnValueOnce(0.8)   //operator
    .mockReturnValueOnce(0.1)   //num1
    .mockReturnValueOnce(0.2)   //num2
    .mockReturnValueOnce(0.4)   //correct answer position
    .mockReturnValueOnce(0.1)   //random answer index 1 - use subtraction
    .mockReturnValueOnce(0.5)   //random answer index 1 - Floor(0.5*5) - 1 = 1 [random answer is 2-1=1]
    .mockReturnValueOnce(0.4)   //random answer index 2 - use addition
    .mockReturnValueOnce(0.5)   //random answer index 2 - Floor(0.5*5) + 1 = 3 [random answer is 2+3=5]
    .mockReturnValueOnce(0.7)   //random answer index 3 - use multiplication
    .mockReturnValueOnce(0.5)   //random answer index 3 - Floor(0.5*4) + 1 = 3 [random answer is 2*3=6]
    let randomQuestion = generateQuestion(Constants.level1Description);
    expect(randomQuestion.operation).toEqual('/'); //add operation
    expect(randomQuestion.num1).toEqual(6); //num1 = (Floor(0.1 * 10) + 1) = 2
    expect(randomQuestion.num2).toEqual(3); //num2 = (Floor(0.2 * 10) + 1) = 3
    expect(randomQuestion.answer.correctAnswerPosition).toEqual(1); //num2 = (Floor(0.4 * 4)) = 1
    expect(randomQuestion.answer.answerArray[1]).toEqual(2);    //correct answer is at position 1
    expect(randomQuestion.answer.answerArray[0]).toEqual(1);    //index 0 random answer = 1
    expect(randomQuestion.answer.answerArray[2]).toEqual(5);    //index 2 random answer = 5
    expect(randomQuestion.answer.answerArray[3]).toEqual(6);   //index 3 random answer = 6
})
