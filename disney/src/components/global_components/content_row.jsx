import useContentRowLogic from '../../hooks/useContentRowLogic';
import styles from "../../assets/styles/originals/originals.module.css";
import { IMAGE_BASE_URL } from '../../utils/movieApi';

const ContentRow = ({ title, items, playTrailer }) => {
    const {
        rowRef,
        cardsContainerRef,
        currentPage,
        hoveredItem,
        showPreview,
        previewPosition,
        showToLeft,
        isAnimating,
        partiallyVisibleItems,
        previewRef,
        handleDotClick,
        handlePrevClick,
        handleNextClick,
        handleMouseEnter,
        handleMouseLeave,
        handlePreviewMouseLeave,
        totalPages
    } = useContentRowLogic(items, styles);

    return (
        <div className={styles.content_row} ref={rowRef}>
            <div className={styles.content_name_and_dots}>
                <h2 className={styles.white_text}>{title}</h2>
                <div className={styles.slider_dots}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
            </div>
            <div className={styles.content_slider}>
                {/* Left Arrow */}
                {currentPage > 0 && (
                    <button
                        className={`${styles.arrow_button} ${styles.arrow_left}`}
                        onClick={handlePrevClick}
                        disabled={isAnimating}
                        aria-label="Previous page"
                    >
                        &lt;
                    </button>
                )}

                <div className={styles.content_cards} ref={cardsContainerRef}>
                    {items.map((item, index) => {
                        const isPartiallyVisible = partiallyVisibleItems.includes(index);

                        return (
                            <div
                                key={item.id}
                                className={`${styles.content_card} ${isPartiallyVisible ? styles.partially_visible : ''}`}
                                onMouseEnter={(e) => handleMouseEnter(item, e, index)}
                                onMouseLeave={(e) => handleMouseLeave(item, e)}
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
                    })}
                </div>

                {/* Right Arrow */}
                {currentPage < totalPages - 1 && (
                    <button
                        className={`${styles.arrow_button} ${styles.arrow_right}`}
                        onClick={handleNextClick}
                        disabled={isAnimating}
                        aria-label="Next page"
                    >
                        &gt;
                    </button>
                )}
            </div>

            {showPreview && hoveredItem && (
                <div
                    ref={previewRef}
                    className={`${styles.preview_window} ${showToLeft ? styles.preview_left_position : ''}`}
                    style={{
                        top: `${previewPosition.top - (window.pageYOffset || document.documentElement.scrollTop)}px`,
                        left: `${previewPosition.left - (window.pageXOffset || document.documentElement.scrollLeft)}px`,
                        transform: 'none',
                        zIndex: 10
                    }}
                    onMouseLeave={handlePreviewMouseLeave}
                >
                    <div className={styles.preview_left}>
                        <img
                            src={`${IMAGE_BASE_URL}${hoveredItem.poster_path}`}
                            alt={hoveredItem.title || hoveredItem.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                                e.target.parentElement.innerHTML = '<div class="' + styles.cardPlaceholder + '">No Image</div>';
                            }}
                        />
                    </div>
                    <div className={styles.preview_right}>
                        <h3>{hoveredItem.title || hoveredItem.name}</h3>
                        <button
                            className={styles.preview_button}
                            onClick={() => playTrailer(hoveredItem)}
                        >
                            Play
                        </button>
                        <button className={styles.preview_button}>Add to Favourites</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ContentRow;