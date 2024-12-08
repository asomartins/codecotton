document.getElementById('loginButton').addEventListener('click', function () {
  // Captura os campos
  const nome = document.getElementById('nome-user');
  const email = document.getElementById('email-user');
  const password = document.getElementById('password');

  // Captura os elementos de erro
  const nomeError = document.getElementById('nomeError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Remove mensagens de erro antigas
  nomeError.classList.add('d-none');
  emailError.classList.add('d-none');
  passwordError.classList.add('d-none');

  // Variável para rastrear erros
  let hasError = false;

  // Valida o nome
  if (nome.value.trim() === '' || nome.value.length > 10) {
    nomeError.textContent =
      'O nome não pode estar vazio e deve ter no máximo 10 caracteres.';
    nomeError.classList.remove('d-none');
    hasError = true;
  }

  // Valida o e-mail com a função validateEmail()
  if (!validateEmail(email)) {
    emailError.classList.remove('d-none');
    hasError = true;
  }

  // Valida a senha (mínimo de 6 caracteres)
  if (password.value.trim().length < 6) {
    passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    passwordError.classList.remove('d-none');
    hasError = true;
  }

  // Se não houver erros, exibe a saudação e fecha o modal
  if (!hasError) {
    const userNameDisplay = document.getElementById('userNameDisplay');
    userNameDisplay.textContent = `Olá, ${nome.value}!`;
    userNameDisplay.style.display = 'inline';

    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = true;

    // Fecha o modal
    const modalElement = document.getElementById('loginModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    // Exibe o modal de "Usuário logado" após fechar o modal de login
    const loggedInModal = new bootstrap.Modal(
      document.getElementById('loggedInModal'),
    );
    loggedInModal.show();
  }
});

// Função de validação de e-mail (adaptada para usar mensagens no formulário)
function validateEmail(emailField) {
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Limpa o erro anterior
  emailError.classList.add('d-none');

  // Valida o e-mail
  if (!emailField.value.trim()) {
    emailError.textContent = 'O campo de e-mail é obrigatório.';
    return false;
  }

  if (!emailRegex.test(emailField.value.trim())) {
    emailError.textContent = 'Por favor, insira um e-mail válido.';
    return false;
  }

  return true;
}

// Função para lidar com o botão "Terminar sessão"
document.getElementById('logoutButton').addEventListener('click', function () {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const nome = document.getElementById('nome-user');
  const email = document.getElementById('email-user');
  const password = document.getElementById('password');

  // Limpa os campos do formulário
  nome.value = '';
  email.value = '';
  password.value = '';

  // Limpa a saudação
  userNameDisplay.textContent = '';
  userNameDisplay.style.display = 'none';

  // Reabilita o botão de login e oculta o botão de logout
  loginButton.disabled = false;
  logoutButton.classList.add('d-none');
});
