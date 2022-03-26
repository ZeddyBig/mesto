export class Card {
    constructor (data, cardTemptaleSelector, handleCardClick) {
        this._elementTemplate = cardTemptaleSelector.content.querySelector('.element');
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _handleLikeIcon = () => {
        this._likeButton.classList.toggle('element__like-button_active');
    };

    _handleDeleteCard = () => {
        this._elementCard.remove();
    }

    _setEventListeners() {
        const elementTrash = this._elementCard.querySelector('.element__trash');
        elementTrash.addEventListener('click', this._handleDeleteCard);
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        this._elementImageButton.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    createCard() {
        this._elementCard = this._elementTemplate.cloneNode(true);
        this._likeButton = this._elementCard.querySelector('.element__like-button');
        this._elementImageButton = this._elementCard.querySelector('.element__image');
        
        this._elementImageButton.src = this._link;
        this._elementCard.querySelector('.element__name').textContent = this._name;

        this._setEventListeners();

        return this._elementCard;
    };
}