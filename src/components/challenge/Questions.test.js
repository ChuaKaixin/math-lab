import Questions from './Questions'
import Constants from '../utilities/Constants';
import React from 'react'
import {render, fireEvent, within} from 'react-testing-library'
import 'jest-dom/extend-expect'
import generateQuestion from './MathQuestionGenerator'

jest.mock("./MathQuestionGenerator");

beforeEach(() => {
    jest.resetAllMocks();
  });

it("should display the question with answers", () => {
    let props = {
        quizType : Constants.level1Description
    }
    let answer = {num1:3, num2:4, operation: '+', answer:{answerArray:[7,8,9,10], correctAnswerPosition:0}};
    generateQuestion.mockReturnValueOnce(answer);
    const {container} = render(<Questions {...props}/>);

    //checks the question display
    const questionDisplay = container.querySelector('.questionGrid');
    expect(questionDisplay.children.length).toBe(7);
    expect(within(questionDisplay).getByText(answer.num1.toString()));
    expect(within(questionDisplay).getByText(answer.num2.toString()));
    expect(within(questionDisplay).getByText(answer.operation));
    expect(within(questionDisplay).getByText("="));

    //checks the answer display
    const answerDisplay = container.querySelector('.answerGrid');
    for(const ans of answer.answer.answerArray) {
        expect(within(answerDisplay).getByText(ans.toString()));
    }
})

it("should update the display when answer is selected", () => {
    let props = {
        quizType : Constants.level1Description,
        updateQuizResults : jest.fn()
    }
    let answer = {num1:3, num2:4, operation: '+', answer:{answerArray:[7,8,9,10], correctAnswerPosition:0}};
    generateQuestion.mockReturnValueOnce(answer);
    const {container} = render(<Questions {...props}/>);

    const answerDisplay = container.querySelector('.answerGrid');
    let rightAnswer = within(answerDisplay).getByText(answer.answer.answerArray[0].toString());
    fireEvent.click(rightAnswer);

    //expect answer clicked to be marked with *
    expect(within(answerDisplay).getByText("*" + answer.answer.answerArray[0].toString()));
    //expect results to be updated as answered correctly
    expect(props.updateQuizResults).toHaveBeenCalledTimes(1);
    expect(props.updateQuizResults).toHaveBeenCalledWith(true);
})

it("should display the next question when Next is clicked", () => {
    let props = {
        quizType : Constants.level1Description,
        updateQuizResults : jest.fn()
    }
    let answer1 = {num1:3, num2:4, operation: '+', answer:{answerArray:[7,8,9,10], correctAnswerPosition:0}};
    let answer2 = {num1:3, num2:4, operation: '-', answer:{answerArray:[7,-1,9,10], correctAnswerPosition:1}};
    generateQuestion.mockReturnValueOnce(answer1).mockReturnValueOnce(answer2);
    const {container, getByText} = render(<Questions {...props}/>);

    let nextButton = getByText('Next')
    fireEvent.click(nextButton);

    //expect generation of questions twice (initial + clicking on Next button)
    expect(generateQuestion).toHaveBeenCalledTimes(2);
    //expect displaying 2nd set of questions after clicking next
    const questionDisplay = container.querySelector('.questionGrid');
    expect(questionDisplay.children.length).toBe(7);
    expect(within(questionDisplay).getByText(answer2.num1.toString()));
    expect(within(questionDisplay).getByText(answer2.num2.toString()));
    expect(within(questionDisplay).getByText(answer2.operation));
    expect(within(questionDisplay).getByText("="));
    //expect displaying 2nd set of answers after clicking next
    const answerDisplay = container.querySelector('.answerGrid');
    for(const ans of answer2.answer.answerArray) {
        expect(within(answerDisplay).getByText(ans.toString()));
    }
})
