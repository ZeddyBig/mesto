export class FormValidator {
     constructor(settings, form) {
          this._form = form;
          this._settings = settings;
     }

     _setInputValid (errorMessage, inputElement) {
          errorMessage.textContent = '';
          inputElement.classList.remove(this._settings.inputErrorClass);
          errorMessage.classList.remove(this._settings.errorClass);
     };
      
     _setInputInvalid (errorMessage, inputElement) {
          errorMessage.textContent = inputElement.validationMessage;
          inputElement.classList.add(this._settings.inputErrorClass);
          errorMessage.classList.add(this._settings.errorClass);
     };

     _checkInputValidity (inputElement) {
          const errorMessage = this._form.querySelector(`#error-${inputElement.id}`);
      
          if (inputElement.validity.valid) {
              this._setInputValid(errorMessage, inputElement);
          } else {
              this._setInputInvalid(errorMessage, inputElement);
          }
     };

     _hasInvalidInput(inputList) {
          return inputList.some((inputElement) => {
               return !inputElement.validity.valid;
          });
     }

     _disableButton (button) {
          button.classList.add(this._settings.inactiveButtonClass);
          button.disabled = true;
     }
     
     _enableButton (button) {
        button.classList.remove(this._settings.inactiveButtonClass);
        button.disabled = false;
     }
     
     _checkButtonValidity (inputList, button) {
          if (this._hasInvalidInput(inputList)) {
              this._disableButton(button);
          } else {
              this._enableButton(button);
          }
     }

     _setEventListeners() {
          const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
          const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

          inputList.forEach((inputElement) => {
               inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._checkButtonValidity(inputList, buttonElement);
               });
          });
     };

     enableValidation() {
          this._form.addEventListener('submit', (evt) => {
               evt.preventDefault();
          });

          this._setEventListeners();         
     }
}