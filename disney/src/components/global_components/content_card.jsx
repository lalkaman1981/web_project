import { IMAGE_BASE_URL } from '../../utils/movieApi';
import { addFavoriteFilm, addFavoriteSeries, removeFavoriteSeries, removeFavoriteFilm } from '../../utils/addFavorite';
import { useState, useEffect } from 'react';

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
    favorites,
    setFavorites
}) {

    const { filmIds = [], seriesIds = [] } = favorites || {};

    const [isAdded, setIsAdded] = useState(
        hoveredItem.title
            ? filmIds.includes(hoveredItem.id)
            : seriesIds.includes(hoveredItem.id)
    );

    useEffect(() => {
        setIsAdded(
            hoveredItem.title
                ? filmIds.includes(hoveredItem.id)
                : seriesIds.includes(hoveredItem.id)
        );
    }, [hoveredItem, filmIds, seriesIds]);

    const handleAddFavorite = async () => {
        try {
            if (hoveredItem.title) {
                await addFavoriteFilm({ email: localStorage.email, password: localStorage.password, filmId: hoveredItem.id });
                setFavorites({
                    ...favorites,
                    filmIds: [...filmIds, hoveredItem.id],
                    seriesIds
                });
            } else {
                await addFavoriteSeries({ email: localStorage.email, password: localStorage.password, seriesId: hoveredItem.id });
                setFavorites({
                    ...favorites,
                    filmIds,
                    seriesIds: [...seriesIds, hoveredItem.id]
                });
            }
            setIsAdded(true);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            if (hoveredItem.title) {
                await removeFavoriteFilm({ email: localStorage.email, password: localStorage.password, filmId: hoveredItem.id });
                setFavorites({
                    ...favorites,
                    filmIds: filmIds.filter(id => id !== hoveredItem.id),
                    seriesIds
                });
            } else {
                await removeFavoriteSeries({ email: localStorage.email, password: localStorage.password, seriesId: hoveredItem.id });
                setFavorites({
                    ...favorites,
                    filmIds,
                    seriesIds: seriesIds.filter(id => id !== hoveredItem.id)
                });
            }
            setIsAdded(false);
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
                {isAdded ?
                    <button
                        className={styles.preview_button}
                        onClick={handleRemoveFavorite}
                    >
                        Remove from favorites
                    </button>
                    :
                    <button
                        className={styles.preview_button}
                        onClick={handleAddFavorite}
                    >
                        Add to Favorites
                    </button>
                }
            </div>
        </div>
    );
};

export default ContentCard;
