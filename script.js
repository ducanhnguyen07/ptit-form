// login
const loginForm = document.querySelector("#form-login");
if (loginForm) {
  const loginButton = document.querySelector("#button-login");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userName = document.querySelector(`input[name="user-name"]`);
    const dob = document.querySelector(`input[name="dob"]`);
    const cardId = document.querySelector(`input[name="card-id"]`);
    const address = document.querySelector(`input[name="address"]`);

    if (userName.value == "") {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }

    if (dob.value == "") {
      alert("Vui lòng nhập ngày tháng năm sinh!");
      return;
    }

    if (cardId.value == "") {
      alert("Vui lòng nhập căn cước công dân!");
      return;
    }

    if (address.value == "") {
      alert("Vui lòng nhập địa chỉ!");
      return;
    }

    localStorage.setItem("userName", userName.value);
    localStorage.setItem("dob", dob.value);
    localStorage.setItem("cardId", cardId.value);
    localStorage.setItem("address", address.value);

    window.location.href = "form.html";
  });
}
// end login

let quizzData;

function startQuizz() {

  loadData();
}

function loadData() {
  const jsonFile = "data.json";
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      quizzData = data;
      showQuestions();
    });
}

function showQuestions() {
  document.getElementById("student-info").style.display = "none";
  const quizzContainer = document.getElementById("quizz-container");
  quizzContainer.style.display = "block";

  quizzContainer.innerHTML +=
    `<h1 class="text-center">Khảo sát công dân</h1>`;

  quizzContainer.innerHTML += showTrueFalseQuestion(
    quizzData.trueFalseQuestions,
    1
  );
  quizzContainer.innerHTML += showOneChoiceQuestion(
    quizzData.oneChoiceQuestions,
    11
  );
  quizzContainer.innerHTML += showMultipleChoiceQuestion(
    quizzData.multipleChoiceQuestions,
    21
  );
  quizzContainer.innerHTML += showTextQuestion(quizzData.textQuestions, 31);

  quizzContainer.innerHTML +=
  `<button class='btn btn-danger w-2' style="margin-left: 400px;" onclick='submitQuizz()'>Nộp bài</button>`;
}

function showTrueFalseQuestion(questions, startId) {
  let html = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    html += `
            <div class="question my-4">
                <p class="m-0"><b>${startId + i}. ${question.question}</b></p>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="tfq${
                      startId + i
                    }" id="true-${i}" value="1">
                    <label class="form-check-label" for="true-${i}">Đúng</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="tfq${
                      startId + i
                    }" id="false-${i}" value="0">
                    <label class="form-check-label" for="false-${i}">Sai</label>
                </div>
            </div>`;
    }
  return html;
}

function showOneChoiceQuestion(questions, startId) {
  let html = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    html += `
            <div class="question my-4">
                <p class="m-0"><b>${startId + i}. ${question.question}</b></p>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${
                      startId + i
                    }" id="one-choice-${i}-0" value="0">
                    <label class="form-check-label" for="one-choice-${i}-1">${
      question.answers[0]
    }</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${
                      startId + i
                    }" id="one-choice-${i}-1" value="1">
                    <label class="form-check-label" for="one-choice-${i}-2">${
      question.answers[1]
    }</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${
                      startId + i
                    }" id="one-choice-${i}-2" value="2">
                    <label class="form-check-label" for="one-choice-${i}-3">${
      question.answers[2]
    }</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${
                      startId + i
                    }" id="one-choice-${i}-3" value="3">
                    <label class="form-check-label" for="one-choice-${i}-4">${
      question.answers[3]
    }</label>
                </div>
            </div>`;
  }
  return html;
}

function showMultipleChoiceQuestion(questions, startId) {
  let html = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    html += `
      <div class="question my-4">
        <p class="m-0"><b>${startId + i}. ${question.question}</b></p>
        <div class="form-check my-1">
          <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-0" value="0">
          <label class="form-check-label" for="multiple-choice-${i}-1">${question.answers[0]}</label>
        </div>
        <div class="form-check my-1">
          <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-1" value="1">
          <label class="form-check-label" for="multiple-choice-${i}-2">${question.answers[1]}</label>
        </div>
            <div class="form-check my-1">
                <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-2" value="2">
                <label class="form-check-label" for="multiple-choice-${i}-3">${question.answers[2]}</label>
            </div>
            <div class="form-check my-1">
                <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-3" value="3">
                <label class="form-check-label" for="multiple-choice-${i}-4">${question.answers[3]}</label>
            </div>
        </div>`;
  }
  return html;
}

function showTextQuestion(questions, startId) {
  let html = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    html += `
    <div class="question my-4">
      <p class="m-0"><b>${startId + i}. ${question.question}</b></p>
      <div class="form-group my-1">
        <textarea class="form-control" id="text-${i}" name="tq${startId + i} cols="30" rows="5"></textarea>
      </div>
    </div>`;
  }
  return html;
}

function isFinish() {
  const trueFalseQuestions = document.querySelectorAll(
    'input[type="radio"][name^="tfq"]'
  );
  const oneChoiceQuestions = document.querySelectorAll(
    'input[type="radio"][name^="ocq"]'
  );
  const multipleChoiceQuestions = document.querySelectorAll(
    'input[type="checkbox"][name^="mcq"]'
  );
  const textQuestions = document.querySelectorAll(
    'input[type="text"][name^="tq"]'
  );

  const totalQuestions =
    quizzData.trueFalseQuestions.length +
    quizzData.oneChoiceQuestions.length +
    quizzData.textQuestions.length +
    quizzData.multipleChoiceQuestions.length;
  let answeredQuestions = 0;

  for (let i = 0; i < trueFalseQuestions.length / 2; i++) {
    if (
      trueFalseQuestions[i * 2].checked ||
      trueFalseQuestions[i * 2 + 1].checked
    ) {
      answeredQuestions++;
    }
  }

  for (let i = 0; i < oneChoiceQuestions.length / 4; i++) {
    if (
      oneChoiceQuestions[i * 4].checked ||
      oneChoiceQuestions[i * 4 + 1].checked ||
      oneChoiceQuestions[i * 4 + 2].checked ||
      oneChoiceQuestions[i * 4 + 3].checked
    ) {
      answeredQuestions++;
    }
  }

  for (let i = 0; i < multipleChoiceQuestions.length / 4; i++) {
    if (
      multipleChoiceQuestions[i * 4].checked ||
      multipleChoiceQuestions[i * 4 + 1].checked ||
      multipleChoiceQuestions[i * 4 + 2].checked ||
      multipleChoiceQuestions[i * 4 + 3].checked
    ) {
      answeredQuestions++;
    }
  }

  for (let i = 0; i < textQuestions.length; i++) {
    if (textQuestions[i].value) {
      answeredQuestions++;
    }
  }

  return answeredQuestions >= totalQuestions / 2;
}

function getScore() {
  let score = 0;
  const trueFalseQuestions = document.querySelectorAll(
    'input[type="radio"][name^="tfq"]'
  );
  const oneChoiceQuestions = document.querySelectorAll(
    'input[type="radio"][name^="ocq"]'
  );
  const multipleChoiceQuestions = document.querySelectorAll(
    'input[type="checkbox"][name^="mcq"]'
  );
  const textQuestions = document.querySelectorAll(
    'input[type="text"][name^="tq"]'
  );

  const data = quizzData.trueFalseQuestions;
  for (let i = 0; i < data.length; i++) {
    if (
      (trueFalseQuestions[i * 2].checked &&
        parseInt(trueFalseQuestions[i * 2].value) === data[i].correctAnswer) ||
      (trueFalseQuestions[i * 2 + 1].checked &&
        parseInt(trueFalseQuestions[i * 2 + 1].value) === data[i].correctAnswer)
    ) {
      score++;
    }
  }

  const data2 = quizzData.oneChoiceQuestions;
  for (let i = 0; i < data2.length; i++) {
    if (
      (oneChoiceQuestions[i * 4].checked &&
        parseInt(oneChoiceQuestions[i * 4].value) === data2[i].correctAnswer) ||
      (oneChoiceQuestions[i * 4 + 1].checked &&
        parseInt(oneChoiceQuestions[i * 4 + 1].value) ===
          data2[i].correctAnswer) ||
      (oneChoiceQuestions[i * 4 + 2].checked &&
        parseInt(oneChoiceQuestions[i * 4 + 2].value) ===
          data2[i].correctAnswer) ||
      (oneChoiceQuestions[i * 4 + 3].checked &&
        parseInt(oneChoiceQuestions[i * 4 + 3].value) ===
          data2[i].correctAnswer)
    ) {
      score++;
    }
  }

  const data3 = quizzData.multipleChoiceQuestions;
  for (let i = 0; i < data3.length; i++) {
    let correctAnswers = data3[i].correctAnswers;
    let userAnswers = [];
    for (let j = 0; j < 4; j++) {
      if (multipleChoiceQuestions[i * 4 + j].checked) {
        userAnswers.push(parseInt(multipleChoiceQuestions[i * 4 + j].value));
      }
    }
    if (JSON.stringify(correctAnswers) === JSON.stringify(userAnswers)) {
      score++;
    }
  }

  return score;
}

function submitQuizz() {
  const score = getScore();

  const result = {
    score: score,
  };

  document.getElementById("quizz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";

  const userName = localStorage.getItem("userName");
  const dob = localStorage.getItem("dob");
  const cardId = localStorage.getItem("cardId");
  const address = localStorage.getItem("address");

  let html = `
    <div class="result">
      <p class="my-2">Họ và tên: <b>${userName}</b></p>
      <p class="my-2">Ngày sinh: <b>${dob}</b></p>
      <p class="my-2">Căn cước công dân: <b>${cardId}</b></p>
      <p class="my-2">Địa chỉ: <b>${address}</b></p>
      <p class="my-2">Điểm: <b>${result.score} / 40</b></p>
      <a href="index.html" class="btn btn-danger" style="margin-left: 170px;">HOME</a>
    </div>`;
  resultContainer.innerHTML += html;
}
