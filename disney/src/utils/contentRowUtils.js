export function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function getPartiallyVisibleItems(cardsContainer, cardClass) {
    if (!cardsContainer) return [];
    const containerRect = cardsContainer.getBoundingClientRect();
    const cards = cardsContainer.querySelectorAll(`.${cardClass}`);
    const partial = [];
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const isPartiallyVisible =
            (cardRect.left < containerRect.left && cardRect.right > containerRect.left) ||
            (cardRect.left < containerRect.right && cardRect.right > containerRect.right);
        if (isPartiallyVisible) {
            partial.push(index);
        }
    });
    return partial;
}
