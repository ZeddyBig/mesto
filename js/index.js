let page = document.querySelector('.page');

let profileEdit = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');

profileEdit.addEventListener('click', function(){
	popup.classList.add('popup_opened');
	let profileName = page.querySelector('.profile__name');
	let profileJob = page.querySelector('.profile__job');
	let nameInput = formElement.querySelector('.popup__container-line_name');
	let jobInput = formElement.querySelector('.popup__container-line_job');
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

let popupCloseButton = page.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', function(){
	popup.classList.remove('popup_opened');
});

// Находим форму в DOM
let formElement = page.querySelector('.popup__container-form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInput = formElement.querySelector('.popup__container-line_name');// Воспользуйтесь инструментом .querySelector()
		let jobInput = formElement.querySelector('.popup__container-line_job');// Воспользуйтесь инструментом .querySelector()
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = page.querySelector('.profile__name');
		let profileJob = page.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 