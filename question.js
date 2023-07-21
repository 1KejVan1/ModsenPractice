export class Question{
    #question;
    #answerOptions;
    #quantityOfCurrectAnswer;
    #currectAnswer;

    constructor(question, answerOptions, quantityOfCurrectAnswer, currectAnswer){
        this.#question = question;
        this.#answerOptions = answerOptions;
        this.#quantityOfCurrectAnswer = quantityOfCurrectAnswer;
        this.#currectAnswer = currectAnswer;
    }

    getQuestion(){
        return this.#question;
    }

    getAnswerOptions(){
        return this.#answerOptions;
    }

    getCurrectAnswer(){
        return this.#currectAnswer;
    }

    getQuantityOfCurrectAnswer(){
        return this.#quantityOfCurrectAnswer;
    }
}