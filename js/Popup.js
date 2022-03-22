export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    };
    
    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this)); 
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    };

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        })
    }
}