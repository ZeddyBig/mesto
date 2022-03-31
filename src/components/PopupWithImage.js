import Popup from './Popup.js';

export class PopupWithImage extends Popup {

    constructor (popupSelector) {
        super(popupSelector);
        this._popupFullImg = this._popup.querySelector('.popup-img__full-img');
        this._popupFullImgText = this._popup.querySelector('.popup-img__full-img-text');
}
     
    openPopup(name, link) {
        this._popupFullImg.src = link;
        this._popupFullImg.alt = name;
        this._popupFullImgText.textContent = name;
        super.openPopup();
    }
}