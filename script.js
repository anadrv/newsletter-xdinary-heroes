const form = document.querySelector("#form");

const nameInput = document.querySelector("#name");
const birthdateInput = document.querySelector("#birthdate");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const cpfInput = document.querySelector("#cpf");
const phoneInput = document.querySelector("#phone");

const frequencySelect = document.querySelector("#frequency");
const biasSelect = document.querySelector("#bias");

const privacyCheckbox = document.querySelector("#privacy");

const toast = document.querySelector("#toast");

const showError = (id, message) => {
  document.querySelector(`#${id}`).textContent = message;
};

const clearError = (id) => {
  document.querySelector(`#${id}`).textContent = "";
};

function validatePassword(password, minDigit) {
  if (password.length >= minDigit) {
    return true;
  }
  return false;
}

const validateBirthdate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  const match = date.match(regex);

  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (year < 1900) return false;

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) return false;

  return true;
};

const validateCpf = (cpf) => {
  const onlyNumbers = cpf.replace(/\D/g, "");
  return /^\d{11}$/.test(onlyNumbers);
};

const validatePhone = (phone) => {
  const regex = /^[1-9]{2}[0-9]{8,9}$/;
  return regex.test(phone);
};

const inputsToClear = [
  { el: nameInput, errorId: "name-error" },
  { el: birthdateInput, errorId: "birthdate-error" },
  { el: emailInput, errorId: "email-error" },
  { el: cpfInput, errorId: "cpf-error" },
  { el: phoneInput, errorId: "phone-error" },
  { el: passwordInput, errorId: "password-error" },
  { el: confirmPasswordInput, errorId: "confirm-password-error" },
];

inputsToClear.forEach(({ el, errorId }) => {
  el.addEventListener("input", () => clearError(errorId));
});

frequencySelect.addEventListener("change", () => clearError("frequency-error"));
biasSelect.addEventListener("change", () => clearError("bias-error"));
privacyCheckbox.addEventListener("change", () => clearError("privacy-error"));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  [
    "name-error",
    "birthdate-error",
    "cpf-error",
    "phone-error",
    "email-error",
    "password-error",
    "confirm-password-error",
    "frequency-error",
    "bias-error",
    "privacy-error",
  ].forEach((id) => clearError(id));

  let isValid = true;

  if (nameInput.value.trim() === "") {
    showError("name-error", "*Campo obrigatório");
    isValid = false;
  }

  if (!validateBirthdate(birthdateInput.value)) {
    showError("birthdate-error", "*Formato inválido");
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    showError("email-error", "*Campo obrigatório");
    isValid = false;
  }

  if (!validateCpf(cpfInput.value)) {
    showError("cpf-error", "*Formato inválido");
    isValid = false;
  }

  if (!validatePhone(phoneInput.value)) {
    showError("phone-error", "*Telefone inválido (DDD + número)");
    isValid = false;
  }

  if (!validatePassword(passwordInput.value, 8)) {
    showError("password-error", "*Mínimo 8 dígitos");
    isValid = false;
  }

  if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
    showError("confirm-password-error", "*As senhas não coincidem");
    isValid = false;
  }

  if (frequencySelect.value === "") {
    showError("frequency-error", "*Campo obrigatório");
    isValid = false;
  }

  if (biasSelect.value === "") {
    showError("bias-error", "*Campo obrigatório");
    isValid = false;
  }

  if (!privacyCheckbox.checked) {
    showError(
      "privacy-error",
      "*Você precisa aceitar a Política de Privacidade"
    );
    isValid = false;
  }

  if (isValid) {
    alert("Deseja confirmar a inscrição?");

    toast.textContent = `Bem-vindo(a), Villian! ✦ Inscrição realizada com sucesso!`;
    toast.classList.add("show");

    form.reset();

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }
});
