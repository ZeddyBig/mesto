export class FormValidator {
     constructor(settings, form) {
          this._form = form;
          this._settings = settings;
          this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
          this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
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

     _hasInvalidInput() {
          return this._inputList.some((inputElement) => {
               return !inputElement.validity.valid;
          });
     }

     _disableButton () {
          this._buttonElement.classList.add(this._settings.inactiveButtonClass);
          this._buttonElement.disabled = true;
     }
     
     _enableButton () {
          this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
          this._buttonElement.disabled = false;
     }
     
     _checkButtonValidity () {
          if (this._hasInvalidInput(this._inputList)) {
              this._disableButton(this._buttonElement);
          } else {
              this._enableButton(this._buttonElement);
          }
     }

     _setEventListeners() {
          this._inputList.forEach((inputElement) => {
               inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._checkButtonValidity();
               });
          });
     };

     resetValidation() {
          this._checkButtonValidity();
    
          this._inputList.forEach((inputElement) => {
               this._checkInputValidity(inputElement);
          });
     }

     enableValidation() {
          this._form.addEventListener('submit', (evt) => {
               evt.preventDefault();
          });

          this._setEventListeners();         
     }
}