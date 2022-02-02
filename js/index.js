let page = document.querySelector('.page');

let profileEdit = page.querySelector('.profile__edit');
let profileAddButton = page.querySelector('.profile__add-button');
let popupProfileEdit = page.querySelector('.popup_profile-edit');
let popupAddElement = page.querySelector('.popup_add-element');
let popupOpenedImg = page.querySelector('.popup_opened-img');

function openPopup() {
	popupProfileEdit.classList.add('popup_opened');
};

function closePopup() {
	popupProfileEdit.classList.remove('popup_opened');
};

function openPopupElement() {
    popupAddElement.classList.add('popup_opened');
};

function closePopupElement() {
    popupAddElement.classList.remove('popup_opened');
    placeNameInput.value = '';
    placeLinkInput.value = '';
};

function openPopupImg() {
    popupOpenedImg.classList.add('popup_opened');
};

function closePopupImg() {
    popupOpenedImg.classList.remove('popup_opened');
};


let formProfileEdit = page.querySelector('.popup__container-form_profile-edit');

let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
let nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
let jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');

profileEdit.addEventListener('click', function(){
	openPopup();
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

profileAddButton.addEventListener('click', openPopupElement);

let popupCloseButton = page.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup);
let popupCloseButtonElement = page.querySelector('.popup__close-button_element');
popupCloseButtonElement.addEventListener('click', closePopupElement);
let popupCloseButtonImg = page.querySelector('.popup__close-button_opened-img');
popupCloseButtonImg.addEventListener('click', closePopupImg);


// ---------------------------------------------------------------------------

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Начало. Добавление любой карточки */
const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

function addElement (elem) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

    elementCard.querySelector('.element__image').src = elem.link;
    elementCard.querySelector('.element__image').alt = elem.name;
    elementCard.querySelector('.element__name').textContent = elem.name;

    elementsList.prepend(elementCard);

    elementCard.querySelector('.element__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    elementTrash = page.querySelector('.element__trash');

    elementTrash.addEventListener('click', function () {
        const element = document.querySelector('.element');
        element.remove();
    });

    const elementImageButton = page.querySelector('.element__image-button');
    const popupFullImg = page.querySelector('.popup__full-img');
    const popupFullImgText = page.querySelector('.popup__full-img-text');
    elementImageButton.addEventListener('click', function () {
        openPopupImg();
        popupFullImg.src = elementCard.querySelector('.element__image').src;
        popupFullImg.alt = elementCard.querySelector('.element__image').alt;
        popupFullImgText.textContent = elementCard.querySelector('.element__image').alt;
    });

}
/* Конец. Добавление любой карточки */

/* Начало. Добавление начальных карточек */
for (let i = initialCards.length - 1; i >= 0; i--) {
    addElement(initialCards[i]);
}
/* Конец. Добавление начальных карточек */


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', formSubmitHandler); 

/* Начало. Добавление элемента */
let formAddElement = page.querySelector('.popup__container-form_add-element');

let placeNameInput = formAddElement.querySelector('.popup__container-line_theme_place-name');
let placeLinkInput = formAddElement.querySelector('.popup__container-line_theme_place-link');

function formSubmitElement (evt) {
    evt.preventDefault();

    let newCard = { 
        name: placeNameInput.value,
        link: placeLinkInput.value 
    }
    addElement(newCard);

    closePopupElement();
}

formAddElement.addEventListener('submit', formSubmitElement);
/* Конец. Добавление элемента */
