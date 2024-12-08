// Adiciona evento ao botão de busca
document.getElementById('busca').addEventListener('click', function () {
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.innerText = 'Serviço em manutenção, volte depois :)';
  new bootstrap.Modal(document.getElementById('alertModal')).show();
});

// Login do usuário
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
    const logoutButton = document.getElementById('logoutButton');
    loginButton.disabled = true;
    logoutButton.classList.remove('d-none');

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

// Função de validação de e-mail p/ o modal login
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

// Função para tratar o evento de logout
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

// Validação de e-mail p/ o botão de subscrição no clube (footer)
function validateEmailSub(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Adiciona evento ao botão de subscrever no clube (footer)
document
  .getElementById('subscribeButton')
  .addEventListener('click', function () {
    const emailInput = document.getElementById('email').value;
    const modalMessage = document.getElementById('modalMessage');

    if (!emailInput) {
      modalMessage.innerText = 'O campo de e-mail não pode ser vazio.';
      new bootstrap.Modal(document.getElementById('alertModal')).show();
    } else if (!validateEmailSub(emailInput)) {
      modalMessage.innerText = 'Por favor, insira um e-mail válido.';
      new bootstrap.Modal(document.getElementById('alertModal')).show();
    } else {
      modalMessage.innerText =
        'Obrigado por se inscrever no nosso clube sustentável.';
      new bootstrap.Modal(document.getElementById('alertModal')).show();
      // Limpar o campo de e-mail
      document.getElementById('email').value = '';
    }
  });

//Funcionalidade de carrinho

document.addEventListener('DOMContentLoaded', () => {
  const contadorCarrinho = document.getElementById('contador-carrinho');

  //Limpar todos os itens do carrinho
  function clearCart() {
    localStorage.removeItem('cart'); // Remove o carrinho do localStorage
    updateCartCount(); // Atualiza o contador do carrinho na interface
    alert('Todos os itens foram removidos do carrinho!');
  }

  // Adiciona evento ao botão de limpar carrinho
  document.querySelector('.clear-cart').addEventListener('click', (event) => {
    event.preventDefault();
    clearCart();
  });

  // Atualiza a quantidade no carrinho
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    contadorCarrinho.innerText = totalItems;
  }

  // Adiciona produto ao carrinho
  function addToCart(productId, productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  // Remove produto do carrinho
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        cart = cart.filter((item) => item.id !== productId);
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  // Inicializa botões
  document.querySelectorAll('.product-card').forEach((card) => {
    const productId = card.dataset.id;
    const productName = card.querySelector('.card-title').innerText;
    const productPrice = card.querySelector('.card-header').innerText;

    card.querySelector('.add-to-cart').addEventListener('click', (event) => {
      event.preventDefault();
      addToCart(productId, productName, productPrice);
      //alert(`${productName} foi adicionado ao carrinho!`);
    });

    card
      .querySelector('.remove-from-cart')
      .addEventListener('click', (event) => {
        event.preventDefault();
        removeFromCart(productId);
        //alert(`${productName} foi removido do carrinho!`);
      });
  });

  // Atualiza o contador ao carregar a página
  updateCartCount();
});
