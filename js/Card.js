class Card {
    constructor (data, cardTemptaleSelector) {
        this._elementTemplate = document.querySelector(cardTemptaleSelector).content;
        this._name = data.name;
        this._link = data.link;
    }

    createCard() {
        const elementCard = this._elementTemplate.querySelector('.element').cloneNode(true);
        const elementImage = elementCard.querySelector('.element__image');
        const elementImageButton = elementCard.querySelector('.element__image');
        const popupFullImg = page.querySelector('.popup-img__full-img');
        const popupFullImgText = page.querySelector('.popup-img__full-img-text');
    
        elementImage.src = elem.link;
        elementImage.alt = elem.name;
        elementCard.querySelector('.element__name').textContent = elem.name;
    
        elementCard.querySelector('.element__like-button').addEventListener('click', function(evt) {
            evt.target.classList.toggle('element__like-button_active');
        });
    
        elementImageButton.addEventListener('click', function () {
            openPopup(popupOpenedImg);
            popupFullImg.src = elementImage.src;
            popupFullImg.alt = elementImage.alt;
            popupFullImgText.textContent = elementImage.alt;
        });
    
        /* Начало. Удаление элемента */
        const elementTrash = elementCard.querySelector('.element__trash'); 
        elementTrash.addEventListener('click', function () {
            const elementDelete = elementTrash.closest('.element');
            elementDelete.remove();
        });
        /* Конец. Удаление элемента */
        return elementCard;
    }
}