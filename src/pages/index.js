import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js'

let userId;

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);

        userId = res._id;
    })
    .catch(console.log)

api.getInitialCards()
    .then(cardList => {
        const cardListReversed = cardList.reverse();
        cardListReversed.forEach(data => {
            const card = buildCard(data);
            cardsAll.addItem(card);
        })
    })
    .catch(console.log)

import '../pages/index.css';

const page = document.querySelector('.page');
const profileEditButton = page.querySelector('.profile__edit');
const profileAddButton = page.querySelector('.profile__add-button');
const popupAddElement = page.querySelector('.popup_type_add-element');
const formProfileEdit = page.querySelector('.popup__container-form_profile-edit');
const nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
const jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');
const elementTemplate = document.querySelector('#element-template');
const formAddElement = page.querySelector('.popup__container-form_add-element');
const avatar = page.querySelector('.profile__button');
const popupAvatarElement = page.querySelector('.popup_type_update-avatar');

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
const avatarValidator = new FormValidator(validationConfig, popupAvatarElement);

popupAddElementValidator.enableValidation();
formProfileEditValidator.enableValidation();
avatarValidator.enableValidation();

const popupOpenedImgClass = new PopupWithImage('.popup_type_opened-img');
popupOpenedImgClass.setEventListeners();
const popupProfileEditClass = new PopupWithForm('.popup_type_profile-edit', handleProfileSubmit);
popupProfileEditClass.setEventListeners();
const popupAddElementClass = new PopupWithForm('.popup_type_add-element', handleNewCardSubmit);
popupAddElementClass.setEventListeners();
const popupDeleteConfirm = new PopupWithForm('.popup_type_delete-confirm');
popupDeleteConfirm.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_type_update-avatar', updateAvatarForm);
popupAvatar.setEventListeners();
/* ------------------------------------------ */

function handleCardClick(name, link) {
    popupOpenedImgClass.openPopup(name, link);
}

/* Добавление начальных карточек */
const cardsAll = new Section({
    items: [],
    renderer: (data) => {
        cardsAll.addItem(buildCard(data));
    }
}, '.elements__list');
  
cardsAll.renderItems();

/* Добавление любой карточки */
const buildCard = (data) => {
    const card = new Card(
        data,
        elementTemplate, 
        handleCardClick, 
        (id) => {
            popupDeleteConfirm.openPopup();
            popupDeleteConfirm.changeSubmitForm(() => {
                popupDeleteConfirm.changeButtonText('Удаление...');
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard();
                        popupDeleteConfirm.closePopup();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        popupProfileEditClass.changeButtonText('Да')
                    })
            });
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(console.log)
            } else {
                api.addLike(id)
                .then(res => {
                    card.setLikes(res.likes)
                })
                .catch(console.log)
            }
        },
        userId
    );
    const cardElement = card.createCard();
    return cardElement
}

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'})
function handleProfileSubmit ({name, job, avatar}) {  
    popupProfileEditClass.changeButtonText('Сохранение...');
    api.editProfile(name, job, avatar)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            popupProfileEditClass.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupProfileEditClass.changeButtonText('Сохранить')
        })
}

function updateAvatarForm(data) {
    popupAvatar.changeButtonText('Сохранение...');
    api.updateAvatar(data['update-avatar'])
        .then(res =>{
            userInfo.setUserInfo(res.name, res.about, res.avatar);   
            popupAvatar.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupAvatar.changeButtonText('Сохранить')
        })
}

/* Добавление элемента */
function handleNewCardSubmit(data) {
    popupAddElementClass.changeButtonText('Создание...');
    api.addCard(data['place-name'], data['place-url'])
        .then(res => {
            const card = buildCard(res);
            cardsAll.addItem(card);
            popupAddElementClass.closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupAddElementClass.changeButtonText('Создать')
        })
    formAddElement.reset();
}

// Обработчики

profileEditButton.addEventListener('click', function() {
    const {name, job} = userInfo.getUserInfo();
	nameInput.value = name;
	jobInput.value = job;
    formProfileEditValidator.resetValidation();
    popupProfileEditClass.openPopup();
});

profileAddButton.addEventListener('click', function() {
    popupAddElementValidator.resetValidation();
    popupAddElementClass.openPopup();
});

avatar.addEventListener('click', function() {
    avatarValidator.resetValidation();
    popupAvatar.openPopup();
});