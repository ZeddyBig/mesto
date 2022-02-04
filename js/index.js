const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit');
const profileAddButton = page.querySelector('.profile__add-button');
const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
const popupAddElement = page.querySelector('.popup_type_add-element');
const popupOpenedImg = page.querySelector('.popup_type_opened-img');

function openPopup(popup) {
	popup.classList.add('popup_opened');
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
};

const formProfileEdit = page.querySelector('.popup__container-form_profile-edit');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const nameInput = formProfileEdit.querySelector('.popup__container-line_theme_name');
const jobInput = formProfileEdit.querySelector('.popup__container-line_theme_job');

profileEditButton.addEventListener('click', function() {
	openPopup(popupProfileEdit);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

profileAddButton.addEventListener('click', function() { 
    openPopup(popupAddElement);
});

const popupCloseButtonEdit = page.querySelector('.popup__close-button');
popupCloseButtonEdit.addEventListener('click', function() {
    closePopup(popupProfileEdit);
});
const popupCloseButtonElement = page.querySelector('.popup__close-button_element');
popupCloseButtonElement.addEventListener('click', function() {
    closePopup(popupAddElement);
});
const popupCloseButtonImg = page.querySelector('.popup__close-button_type_opened-img');
popupCloseButtonImg.addEventListener('click', function() {
    closePopup(popupOpenedImg);
});

// ---------------------------------------------------------------------------

/* Начало. Добавление любой карточки */
const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

function createCard (elem) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elementCard.querySelector('.element__image');

    elementImage.src = elem.link;
    elementImage.alt = elem.name;
    elementCard.querySelector('.element__name').textContent = elem.name;

    elementCard.querySelector('.element__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    const elementImageButton = elementCard.querySelector('.element__image');
    const popupFullImg = page.querySelector('.popup-img__full-img');
    const popupFullImgText = page.querySelector('.popup-img__full-img-text');
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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', handleProfileSubmit); 

/* Начало. Добавление элемента */
const formAddElement = page.querySelector('.popup__container-form_add-element');

const placeNameInput = formAddElement.querySelector('.popup__container-line_theme_place-name');
const placeLinkInput = formAddElement.querySelector('.popup__container-line_theme_place-link');

function handleNewCardSubmit (evt) {
    evt.preventDefault();

    let newCard = { 
        name: placeNameInput.value,
        link: placeLinkInput.value 
    }
    elementsList.prepend(createCard(newCard));

    closePopup(popupAddElement);
    placeNameInput.value = '';
    placeLinkInput.value = '';
}

formAddElement.addEventListener('submit', handleNewCardSubmit);
/* Конец. Добавление элемента */