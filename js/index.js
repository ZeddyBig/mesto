let page = document.querySelector('.page');

let profileEdit = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');

function openPopup() {
	popup.classList.add('popup_opened');
};

function closePopup() {
	popup.classList.remove('popup_opened');
};

let formElement = page.querySelector('.popup__container-form');

let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
let nameInput = formElement.querySelector('.popup__container-line_theme_name');
let jobInput = formElement.querySelector('.popup__container-line_theme_job');

profileEdit.addEventListener('click', function(){
	openPopup();
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

let popupCloseButton = page.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup);

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
formElement.addEventListener('submit', formSubmitHandler); 