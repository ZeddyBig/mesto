const formSubmit = (event, form) => {
    event.preventDefault();
    if (form.validity.valid) {
        form.reset();
    }
}

const setInputValid = ({inputErrorClass, errorClass}, errorMessage, input) => {
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
    errorMessage.classList.remove(errorClass);
}

const setInputInvalid = ({inputErrorClass, errorClass}, errorMessage, input) => {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    errorMessage.classList.add(errorClass);
}

const checkInputValidity = ({ inputErrorClass }, form, input) => {
    const errorMessage = form.querySelector(`#error-${input.id}`);

    if (input.validity.valid) {
        setInputValid(inputErrorClass, errorMessage, input);
    } else {
        setInputInvalid(inputErrorClass, errorMessage, input);
    }
}

const disableButton = (inactiveButtonClass, button) => {
    button.setAttribute('disabled', '');
    button.classList.add(inactiveButtonClass);
}

const checkButtonValidity = ({ inactiveButtonClass }, form, button) => {
    if (form.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove(inactiveButtonClass);
    } else {
        disableButton(inactiveButtonClass, button);
    }
}


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};


function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {
    const formList = Array.from(document.querySelectorAll(formSelector)); 
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
		  evt.preventDefault();
		});

	    formElement.addEventListener('submit', (event) => formSubmit(event, formSelector));
	    const inputs = formElement.querySelectorAll(inputSelector);
	    const button = formElement.querySelector(submitButtonSelector);

	    formElement.addEventListener('reset', () => {
	        disableButton(rest, button);
	    });

	    checkButtonValidity(rest, formElement, button);

	    inputs.forEach(input => {
	        input.addEventListener('input', (event) => {
	            checkInputValidity(rest, formElement, input);
	            checkButtonValidity(rest, formElement, button);
	        });
	    });
    }); 
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'popup__error_active'
});