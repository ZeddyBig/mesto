import {openPopup, closePopup, popupOpenedImg} from './utils.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const initialCards = [ 
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
  ];

const page = document.querySelector('.page');
const profileEditButton = page.querySelector('.profile__edit');
const profileAddButton = page.querySelector('.profile__add-button');
const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
const popupAddElement = page.querySelector('.popup_type_add-element');
const formProfileEdit = page.querySelector('.popup__container-form_profile-edit');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
const jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');
const popupCloseButtonEdit = page.querySelector('.popup__close-button');
const popupCloseButtonElement = page.querySelector('.popup__close-button_element');
const popupCloseButtonImg = page.querySelector('.popup__close-button_type_opened-img');
const elementTemplate = document.querySelector('#element-template');
const elementsList = document.querySelector('.elements__list');
const formAddElement = page.querySelector('.popup__container-form_add-element');
const placeNameInput = formAddElement.querySelector('.popup__container-line_theme_place-name');
const placeLinkInput = formAddElement.querySelector('.popup__container-line_theme_place-link');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupButtonSubmit = popupAddElement.querySelector('.popup__button');

/* -- Валидация форм -- */
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-type-error',
    errorClass: 'popup__error_active'
}

const popupAddElementValidator = new FormValidator(validationConfig, popupAddElement);
const formProfileEditValidator = new FormValidator(validationConfig, formProfileEdit);

popupAddElementValidator.enableValidation();
formProfileEditValidator.enableValidation();
/* ------------------------------------------ */

function handleCardClick () {
    const popupFullImg = document.querySelector('.popup-img__full-img');
    const popupFullImgText = document.querySelector('.popup-img__full-img-text');

    popupFullImg.src = this._link;
    popupFullImg.alt = this._name;
    popupFullImgText.textContent = this._name;

    openPopup(popupOpenedImg);
}

/* Добавление любой карточки */

function buildCard(data) {
    const card = new Card(data, elementTemplate, handleCardClick);
    const cardElement = card.createCard();
    return cardElement
}

const renderCard = (data, wrap) => {
    wrap.prepend(buildCard(data));
}

/* Добавление начальных карточек */
initialCards.forEach(data => {
    renderCard(data, elementsList);
});

// Обработчик «отправки» формы
function handleProfileSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', handleProfileSubmit); 

/* Начало. Добавление элемента */

function handleNewCardSubmit (evt) {
    evt.preventDefault();

    const newCard = { 
        name: placeNameInput.value,
        link: placeLinkInput.value 
    }
    renderCard(newCard, elementsList);
    
    closePopup(popupAddElement);
    formAddElement.reset();
}

formAddElement.addEventListener('submit', handleNewCardSubmit);
/* Конец. Добавление элемента */

/* Закрытие popup по клику на тёмное место */
popups.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popupElement);
        }
    });
});

// Обработчики

profileEditButton.addEventListener('click', function() {
	openPopup(popupProfileEdit);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
    formProfileEditValidator.resetValidation();
});

profileAddButton.addEventListener('click', function() { 
    openPopup(popupAddElement);
    popupAddElementValidator.resetValidation();
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
});