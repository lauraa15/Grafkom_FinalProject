// data pertanyaan trivia
export const questions = [
    { 
        question: "Who is the most followed person on Instagram?", 
        options: ["Kylie Jenner", "Taylor Swift", "Cristiano Ronaldo"], 
        correct: 2 },
    { 
        question: "In what year was the first Avatar movie released?", 
        options: ["2009", "2010", "2011"], 
        correct: 0 },
    { question: "Who was the longest raining monarch in British history?", 
        options: ["Queen Victoria", "Queen Elizabeth II", "King Philip II"], 
        correct: 1 },
    {
        question: "Before independence, what was Bangladesh called?",
        options: ["Ceylon", "Formosa", "East Pakistan"],
        correct: 2
    },
    {
        question: "The Statue Of Liberty was a gift from _____.",
        options: ["England", "France", "Spain"],
        correct: 1
    },
    {
        question: "Who was the only US President to serve more than two terms?",
        options: ["Thomas Jefferson", "Franklin D. Roosevelt", "Abraham Lincoln"],
        correct: 1
    },
    {
        question: "Which country has the longest coastline in the world?",
        options: ["Australia", "Canada", "Indonesia"],
        correct: 1
    },
    {
        question: "In which country is Machu Picchu located?",
        options: ["Brazil", "Peru", "Mexico"],
        correct: 1
    },
    {
        question: "What is the tallest building in the world?",
        options: ["The Burj Khalifa, UAE", "Shanghai Tower, China", "Merdeka 118, Malaysia"],
        correct: 0
    },
    {
        question: "What is the hottest planet in galaxy Milky Way?",
        options: ["Mars", "Jupiter", "Venus"],
        correct: 2
    },
    {
        question: "Which scientist coined the laws of motion?",
        options: ["Albert Einstein", "Isaac Newton", "Robert Boyle"],
        correct: 1
    },
    {
        question: "What gas is most prominent in the earth’s atmosphere?",
        options: ["Nitrogen", "Oxygen", "Carbon dioxide"],
        correct: 0
    },
    {
        question: "What is the rarest blood type in humans?",
        options: ["O Negative", "AB Positive", "A Positive"],
        correct: 1
    },
    {
        question: "Which Disney film features the song 'How Far I’ll Go'?",
        options: ["Tangled", "Moana", "Coco"],
        correct: 1
    },
    {
        question: "What was the first Pixar movie released?",
        options: ["Cars", "Finding Nemo", "Toy Story"],
        correct: 2
    },
    {
        question: "Which one is the fire type pokemon?",
        options: ["Charizard", "Magikarp", "Squirtle"],
        correct: 0
    },
    {
        question: "Who's the first one to visit the galaxy?",
        options: ["Neil Armstrong", "Oppenheimer", "Yuri Gagarin"],
        correct: 2
    },
    {
        question: "Which of the following languages has the longest alphabet?",
        options: ["Greek", "Russian", "Arabic"],
        correct: 1
    },
    {
        question: "Where was the earliest documented case of the Spanish flu?",
        options: ["USA", "Spain", "Mexico"],
        correct: 0
    },
    {
        question: "Our solar system is located in what galaxy?",
        options: ["Andromeda", "The Milky Way", "Sombrero"],
        correct: 1
    },
    {
        question: "What type of fish is Nemo?",
        options: ["Clownfish", "Luohan", "Yellowtail Fish"],
        correct: 0
    },
    {
        question: "What is the world's fastest animal?",
        options: ["Peregrine Falcon", "Cheetah", "Ostrich"],
        correct: 0
    },
    {
        question: "Compared to their body weight, what animal is the strongest?",
        options: ["Dung Beetle", "Elephant", "Ant"],
        correct: 0
    },
    {
        question: "What kind of food does not spoil?",
        options: ["Mustard", "Honey", "Cheese"],
        correct: 1
    },
    {
        question: "How many dots are there on a pair of dice?",
        options: ["36", "21", "42"],
        correct: 2
    },
    {
        question: "How many major planets are there in our solar system?",
        options: ["8", "9", "7"],
        correct: 0
    },
    {
        question: "What is the world's longest river?",
        options: ["Nile", "Mississipi", "Amazon"],
        correct: 0
    },
    {
        question: "A substance with that scores 9 on the pH scale is considered what?",
        options: ["Neutral", "Acid", "A base"],
        correct: 2
    },
    {
        question: "What is the freezing point of water in Celcius?",
        options: ["0", "-50", "1"],
        correct: 0
    },
    {
        question: "What SI unit is used to measure of weight?",
        options: ["Newton", "Kilogram", "Gram"],
        correct: 0
    }
];

// (menggunakan AI)
export function generateQuestions(quizElements) {
    const questionIndex = Array.from({length: questions.length}, (_, i) => i);
    for (let i = questionIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionIndex[i], questionIndex[j]] = [questionIndex[j], questionIndex[i]];
    }
    quizElements.forEach((quiz, index) => {
        quiz.setQuestionId(questionIndex[index]);
    });
}
// (ai)