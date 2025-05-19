import { IMAGE_BASE_URL } from '../../utils/movieApi';
import { addFavoriteFilm, addFavoriteSeries } from '../../utils/addFavorite';

function ContentCard({
    item,
    index,
    isPartiallyVisible,
    onMouseEnter,
    onMouseLeave,
    styles
}) {
    return (
        <div
            className={`${styles.content_card} ${isPartiallyVisible ? styles.partially_visible : ''}`}
            onMouseEnter={(e) => onMouseEnter(item, e, index)}
            onMouseLeave={(e) => onMouseLeave(item, e)}
        >
            {item.backdrop_path ? (
                <img
                    src={`${IMAGE_BASE_URL}${item.backdrop_path}`}
                    alt={"No Image"}
                    onError={e => { e.target.onerror = null; e.target.style.display = "none"; }}
                />
            ) : (
                <div className={styles.cardPlaceholder}>No Image</div>
            )}
            <div className={styles.card_title}>
                {item.title || item.name}
            </div>
        </div>
    );
}

ContentCard.Preview = function CardPreview({
    hoveredItem,
    previewRef,
    previewPosition,
    showToLeft,
    styles,
    playTrailer,
    onMouseLeave,
}) {
    // Get user credentials once
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    const handleAddFavorite = async () => {
        try {
            if (hoveredItem.title) {
                await addFavoriteFilm({ email, password, filmId: hoveredItem.id });
            } else {
                await addFavoriteSeries({ email, password, seriesId: hoveredItem.id });
            }
            // Optionally show a toast or feedback here
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div
            ref={previewRef}
            className={`${styles.preview_window} ${showToLeft ? styles.preview_left_position : ''}`}
            style={{
                top: `${previewPosition.top - (window.pageYOffset || document.documentElement.scrollTop)}px`,
                left: `${previewPosition.left - (window.pageXOffset || document.documentElement.scrollLeft)}px`,
                transform: 'none',
                zIndex: 10
            }}
            onMouseLeave={onMouseLeave}
        >
            <div className={styles.preview_left}>
                <img
                    src={`${IMAGE_BASE_URL}${hoveredItem.poster_path || hoveredItem.backdrop_path || ""}`}
                    alt={hoveredItem.title || hoveredItem.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = '<div class="' + styles.cardPlaceholder + '">No Image</div>';
                        }
                    }}
                />
            </div>
            <div className={styles.preview_right}>
                <h3>{hoveredItem.title || hoveredItem.name}</h3>
                {playTrailer && (
                    <button
                        className={styles.preview_button}
                        onClick={() => playTrailer(hoveredItem)}
                    >
                        Play
                    </button>
                )}
                <button
                    className={styles.preview_button}
                    onClick={handleAddFavorite}
                >
                    Add to Favourites
                </button>
            </div>
        </div>
    );
};

export default ContentCard;
