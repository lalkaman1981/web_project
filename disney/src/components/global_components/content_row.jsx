import useContentRowLogic from '../../hooks/useContentRowLogic';
import styles from "../../assets/styles/originals/originals.module.css";
import ContentCard from './content_card.jsx';
import ArrowLeft from "../../assets/images/originals/arrow_left.svg";
import ArrowRight from "../../assets/images/originals/arrow_right.svg";


const ContentRow = ({ title, items, playTrailer, favorites, setFavorites }) => {
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
                        <img src={ArrowLeft} alt="Left" />
                    </button>
                )}

                <div className={styles.content_cards} ref={cardsContainerRef}>
                    {items.map((item, index) => (
                        <ContentCard
                            item={item}
                            index={index}
                            isPartiallyVisible={partiallyVisibleItems.includes(index)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            styles={styles}
                            playTrailer={playTrailer}
                        />
                    ))}
                </div>

                {/* Right Arrow */}
                {currentPage < totalPages - 1 && (
                    <button
                        className={`${styles.arrow_button} ${styles.arrow_right}`}
                        onClick={handleNextClick}
                        disabled={isAnimating}
                        aria-label="Next page"
                    >
                        <img src={ArrowRight} alt="Right" />
                    </button>
                )}
            </div>

            {showPreview && hoveredItem && (
                <ContentCard.Preview
                    hoveredItem={hoveredItem}
                    previewRef={previewRef}
                    previewPosition={previewPosition}
                    showToLeft={showToLeft}
                    styles={styles}
                    playTrailer={playTrailer}
                    onMouseLeave={handlePreviewMouseLeave}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
            )}
        </div>
    );
};


export default ContentRow;