import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';

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
const popupAddElement = page.querySelector('.popup_type_add-element');
const formProfileEdit = page.querySelector('.popup__container-form_profile-edit');
const nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
const jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');
const elementTemplate = document.querySelector('#element-template');
const elementsList = document.querySelector('.elements__list');
const formAddElement = page.querySelector('.popup__container-form_add-element');
const placeNameInput = formAddElement.querySelector('.popup__container-line_theme_place-name');
const placeLinkInput = formAddElement.querySelector('.popup__container-line_theme_place-link');

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

const popupOpenedImgClass = new PopupWithImage('.popup_type_opened-img');
popupOpenedImgClass.setEventListeners();
const popupProfileEditClass = new PopupWithForm('.popup_type_profile-edit', handleProfileSubmit);
popupProfileEditClass.setEventListeners();
const popupAddElementClass = new PopupWithForm('.popup_type_add-element', handleNewCardSubmit);
popupAddElementClass.setEventListeners();
/* ------------------------------------------ */

function handleCardClick(name, link) {
    popupOpenedImgClass.openPopup(name, link);
}

/* Добавление начальных карточек */
const cardsFirst = new Section({
    items: initialCards,
    renderer: (data) => {
        cardsFirst.addItem(buildCard(data));
    }
}, elementsList);
  
cardsFirst.renderItems();

/* Добавление любой карточки */
function buildCard(data) {
    const card = new Card(data, elementTemplate, handleCardClick);
    const cardElement = card.createCard();
    return cardElement
}

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'})
function handleProfileSubmit (info) {
    userInfo.setUserInfo(info);
    popupProfileEditClass.closePopup();
}

/* Добавление элемента */
function handleNewCardSubmit() {
    const newCard = [{
        name: placeNameInput.value,
        link: placeLinkInput.value 
    }];

    const anyCard = new Section({
        items: newCard,
        renderer: (data) => {
            anyCard.addItem(buildCard(data));
        }
    }, elementsList);
    anyCard.renderItems();
    
    popupAddElementClass.closePopup();
    formAddElement.reset();
}

// Обработчики

profileEditButton.addEventListener('click', function() {
    popupProfileEditClass.openPopup();
    const {name, job} = userInfo.getUserInfo();
	nameInput.value = name;
	jobInput.value = job;
    formProfileEditValidator.resetValidation();
});

profileAddButton.addEventListener('click', function() {
    popupAddElementClass.openPopup();
    popupAddElementValidator.resetValidation();
});