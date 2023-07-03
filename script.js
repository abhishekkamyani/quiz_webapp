let data;
let totalQues;
let score = 0;
let objIndex = 0;

async function fetchQuestions() {
    const response = await fetch('https://quizapi.io/api/v1/questions?apiKey=jDzPqTU8o7x8uB9nkK4Ax19hRT1BHaj3XS9ISfCu&limit=5&tags=JavaScript&HTML');
    const data = await response.json();
    return data;
}


fetchQuestions().then((result) => {
    data = result;
    totalQues = data.length;
    loadQuestions();
    submit.classList.remove('d-none');
})
.catch(error => { console.log('please wait because:', error) })


async function loadQuestions() {
    const obj = await data[objIndex];
    const answers = obj.answers;
    const labels = document.getElementsByClassName('form-check-label');
    const radios = document.getElementsByName('options');
    const myQues = document.getElementById('question');

    myQues.innerText = obj.question;

    let lab = 0;
    for (const key in answers) {
        labels[lab].innerText = answers[key];
        if (answers[key] == null) {
            radios[lab].classList.add('d-none');
        }
        else {
            radios[lab].classList.remove('d-none');
        }
        lab++;
        if (lab > 3) {
            break;
        }
    }

}

submit.addEventListener('click', async () => {
    const obj = await data[objIndex++];
    const correctAnswers = obj.correct_answers;
    const radios = document.getElementsByName('options');

    const correctOpt = getCorrectOpt();
    function getCorrectOpt() {
        for (const key in correctAnswers) {
            if (correctAnswers[key] == 'true') {
                return key.slice(7,8);
            }
        }
    }

    const selectedOpt = selectedOption();
    function selectedOption() {
        for (let index = 0; index < radios.length; index++) {
            if (radios[index].checked) {
                return radios[index].value;
            }
        }
    }

    if (selectedOpt == correctOpt) {
        score++;
    }

    function clearRadios() {
        radios.forEach(radio => {
            radio.checked = false;
        });
    }
    clearRadios();

    if (objIndex < totalQues) {
        loadQuestions();
    }
    else {
        quizBox.innerHTML = `
            <h4 class="py-5 text-center">Thank You For Playing!</h4>
            <h2 class="text-danger pb-5 text-center">Your score is ${score} / ${totalQues}</h2>`;
    }
})