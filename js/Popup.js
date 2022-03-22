export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    
    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); 
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    };

    
}