import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.id] = input.value;
        });
        
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(),
            this._submitForm(this._getInputValues())
        });
    }
}