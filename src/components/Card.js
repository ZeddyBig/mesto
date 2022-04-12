export class Card {
    constructor (data, cardTemptaleSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
        this._elementTemplate = cardTemptaleSelector.content.querySelector('.element');
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;


        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

        _setEventListeners() {
        const elementTrash = this._elementCard.querySelector('.element__trash');
        elementTrash.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });

        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
        this._elementImageButton.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    _addFillLikes = () => {
        this._likeButton.classList.add('element__like-button_active');
    };

    _removeFillLikes = () => {
        this._likeButton.classList.remove('element__like-button_active');
    };

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCountElement = this._elementCard.querySelector('.element__like-count')
        likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._addFillLikes()
        } else {
            this._removeFillLikes()
        }
    }

    deleteCard() {
        this._elementCard.remove();
    }

    createCard() {
        this._elementCard = this._elementTemplate.cloneNode(true);
        
        this._likeButton = this._elementCard.querySelector('.element__like-button');
        this._elementImageButton = this._elementCard.querySelector('.element__image');
        
        this._elementImageButton.src = this._link;
        this._elementCard.querySelector('.element__name').textContent = this._name;
        this._setEventListeners();
        this.setLikes(this._likes);

        if (this._ownerId !== this._userId) {
            this._elementCard.querySelector('.element__trash').style.display = 'none';
        }


        return this._elementCard;
    };
}