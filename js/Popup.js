export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', escapeButton);
    };
    
    closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', escapeButton); 
    };

}