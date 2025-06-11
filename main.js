// Куки для сохранение аккаунтов, потому что я бедный студент, я не буду платить за хостинг для бэкенда 
function setCookie(name, value, days = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Функции для работы с аккаунтами
function getAllAccounts() {
  const accountsCookie = getCookie('demo_accounts');
  return accountsCookie ? JSON.parse(accountsCookie) : {};
}

function saveAllAccounts(accounts) {
  setCookie('demo_accounts', JSON.stringify(accounts), 30);
}

function register() {
    const login = document.getElementById('regLogin').value;
    const password = document.getElementById('regPassword').value;
    
    if (!login || !password) {
      alert('Заполните обязательные поля!');
      return false;
    }
    
    const accounts = getAllAccounts();
    
    if (accounts[login]) {
      alert('Этот логин уже занят!');
      return false;
    }
    
    // Добавление нового аккаунта
    accounts[login] = password;
    saveAllAccounts(accounts);
    
    // Автоматический вход
    setCookie('current_user', login);
    setCookie('auth', '1');
    
    //alert('Регистрация успешна!');
    window.location.href = "index.html";
    
    return false; 
  }

// Вход в учётку 
function login() {
  const login = document.getElementById('logLogin').value;
  const password = document.getElementById('logPassword').value;
  const accounts = getAllAccounts();
  
  if (accounts[login] === password) {
    setCookie('current_user', login);
    setCookie('auth', '1');
    //alert('Вход выполнен!');
    window.location.href = "index.html";
  } else {
    alert('Неверный логин или пароль');
    return false;
  }

  return false
}

// Выход из учётки
function logout() {
  setCookie('auth', '0');
  setCookie('current_user', '', -1); // Удаляем куку
  window.location.href = "index.html";
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const regOnly = document.querySelectorAll('.reg-only');

  if (getCookie("auth") === "1") {
    const currentUser = getCookie('current_user');
    const authElements = document.getElementsByClassName("auth");
    
    for (let element of authElements) {
      // Скрываем детей
      for (let child of element.children) {
        child.style.display = 'none';
      }
      
      // Добавляем приветствие и кнопку выхода
      const greeting = document.createElement('div');
      greeting.textContent = `Привет, ${currentUser}!`;
      element.appendChild(greeting);
      
      const logoutBtn = document.createElement("a");
      logoutBtn.textContent = "Выход";
      logoutBtn.classList.add("link-button");
      logoutBtn.addEventListener('click', logout);
      element.appendChild(logoutBtn);
    }

    for (let elem of regOnly) {
        elem.classList.remove('restricted');
    }
} else {
    for (let elem of regOnly) {
        elem.classList.add('restricted');
    }
  }


  
  const restrictedElements = document.getElementsByClassName('restricted');
  for (let elem of restrictedElements){
        const allChildren = elem.querySelectorAll('*');
    
        
        allChildren.forEach(child => {
            child.setAttribute('tabindex', '-1');
        });
        
        // Also set for the element itself if needed
        element.setAttribute('tabindex', '-1');
    }
});
