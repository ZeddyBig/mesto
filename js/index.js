let page = document.querySelector('.page');
let likeButton = page.querySelectorAll('.element__like-button');
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].onclick = function(){
    if (likeButton[i].innerHTML === '<img src="images/element__like-button.svg" alt="Лайк">') {
			likeButton[i].innerHTML = '<img src="images/element__like-button_active.svg" alt="Лайк">';
		}
		else {
			likeButton[i].innerHTML = '<img src="images/element__like-button.svg" alt="Лайк">';
		}
	};
};

let profileEdit = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');
profileEdit.addEventListener('click', function(){
	popup.style = `display: block;`;
});

let popupCloseButton = page.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', function(){
	popup.style = `display: none;`;
});

// Находим форму в DOM
let formElement = page.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInput = formElement.querySelector('.popup__container-name');// Воспользуйтесь инструментом .querySelector()
		let jobInput = formElement.querySelector('.popup__container-job');// Воспользуйтесь инструментом .querySelector()
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = page.querySelector('.profile__name');
		let profileJob = page.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.style = `display: none;`;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 