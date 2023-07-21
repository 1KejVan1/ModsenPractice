export class Topic{
    #topic_name;
    #questions;

    constructor(name, questions){
        this.#topic_name = name;
        this.#questions = questions;
    }

    getTopicName(){
        return this.#topic_name;
    }

    getQuestions(){
        return this.#questions;
    }
}