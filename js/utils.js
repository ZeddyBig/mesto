export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeButton);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeButton); 
};

/* Закрытие popup по нажатию Escape */
export function escapeButton(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};