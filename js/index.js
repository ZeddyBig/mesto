const page = document.querySelector('.page');
const profileEditButton = page.querySelector('.profile__edit');
const profileAddButton = page.querySelector('.profile__add-button');
const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
const popupAddElement = page.querySelector('.popup_type_add-element');
const popupOpenedImg = page.querySelector('.popup_type_opened-img');
const formProfileEdit = page.querySelector('.popup__container-form_profile-edit');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
const jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');
const popupCloseButtonEdit = page.querySelector('.popup__close-button');
const popupCloseButtonElement = page.querySelector('.popup__close-button_element');
const popupCloseButtonImg = page.querySelector('.popup__close-button_type_opened-img');
const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');
const formAddElement = page.querySelector('.popup__container-form_add-element');
const placeNameInput = formAddElement.querySelector('.popup__container-line_theme_place-name');
const placeLinkInput = formAddElement.querySelector('.popup__container-line_theme_place-link');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupButtonSubmit = popupAddElement.querySelector('.popup__button');


function openPopup(popup) {
	popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeButton);
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
    document.addEventListener('keydown', escapeButton);
};

profileEditButton.addEventListener('click', function() {
	openPopup(popupProfileEdit);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

profileAddButton.addEventListener('click', function() { 
    openPopup(popupAddElement);
});

popupCloseButtonEdit.addEventListener('click', function() {
    closePopup(popupProfileEdit);
});

popupCloseButtonElement.addEventListener('click', function() {
    closePopup(popupAddElement);
});

popupCloseButtonImg.addEventListener('click', function() {
    closePopup(popupOpenedImg);
});

// ---------------------------------------------------------------------------

/* Начало. Добавление любой карточки */

function createCard (elem) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
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
/* Конец. Добавление любой карточки */

/* Начало. Добавление начальных карточек */
initialCards.forEach(element => elementsList.append(createCard(element)));
/* Конец. Добавление начальных карточек */

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
    elementsList.prepend(createCard(newCard));

    closePopup(popupAddElement);
    /* Пробовал сделать через reset(). Почему-то не работает :( */
    placeNameInput.value = '';
    placeLinkInput.value = '';

    popupButtonSubmit.setAttribute('disabled', '');
    popupButtonSubmit.classList.add('popup__button_disabled');
}

formAddElement.addEventListener('submit', handleNewCardSubmit);
/* Конец. Добавление элемента */

/* Закрытие popup по нажатию Escape */
function escapeButton(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
}

/* Закрытие popup по клику на тёмное место */
popups.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popupElement);
        }
    });
});