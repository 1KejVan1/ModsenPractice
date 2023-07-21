export class Answer{
    #answer_arr = [];
    #answer_div_arr = [];

    constructor(answer){
        this.#answer_arr.unshift(answer);
    }

    getAnswers(){
        return this.#answer_arr;
    }

    getAnswersDiv(){
        return this.#answer_div_arr;
    }

    addAnswer(answer, div){
        this.#answer_arr.unshift(answer);
        this.#answer_div_arr.unshift(div);
    }

    resetAnswers(){
        this.#answer_arr = [];
        this.#answer_div_arr = [];
    }

}