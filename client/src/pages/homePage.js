import { sendLead } from "../api/send-lead";

import "../style.css"
const homePage = () => {
  document.querySelector('#app').innerHTML = `
      <div>
        <h1>Введите свое обращение</h1>
        <div class="card">
            <form class="form" id="lead-form">
                <input type="text" id="form-name" placeholder="Тема сообщения" required>
                <textarea id="message" placeholder="Ваше сообщение" required></textarea>
                <button type="submit" id="submit-btn">Отправить</button>
            </form>
            <div id="status"></div>
        </div>
        <a href="/admin" data-link>Посмотреть обращения</a>
      </div>
    `;

  const form = document.getElementById('lead-form');
  const titleInput = document.getElementById('form-name');
  const textInput = document.getElementById('message');
  const statusDiv = document.getElementById('status');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendLead(titleInput, textInput, statusDiv, form, submitBtn);
  });
};

export default homePage;