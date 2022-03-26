import Popup from './Popup.js';

export class PopupWithImage extends Popup {

    constructor (popupSelector) {
        super(popupSelector);
        this._popupFullImg = document.querySelector('.popup-img__full-img');
        this._popupFullImgText = document.querySelector('.popup-img__full-img-text');
}
     
    openPopup(name, link) {
        super.openPopup();
        this._popupFullImg.src = link;
        this._popupFullImg.alt = name;
        this._popupFullImgText.textContent = name;
    }
}