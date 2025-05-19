import { useEffect, useState, useRef } from 'react';
import { easeInOutCubic, getPartiallyVisibleItems } from '../utils/contentRowUtils';

export default function useContentRowLogic(items, styles, itemsPerPage = 4, previewWidth = 400, previewMargin = 10) {
    const rowRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
    const [initialScrollY, setInitialScrollY] = useState(0);
    const [showToLeft, setShowToLeft] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [partiallyVisibleItems, setPartiallyVisibleItems] = useState([]);
    const previewRef = useRef(null);
    const hoverIntentTimerRef = useRef(null);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        return () => {
            if (hoverIntentTimerRef.current) {
                clearTimeout(hoverIntentTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (showPreview) {
            const handleScroll = () => {
                const scrollDiff = Math.abs(window.scrollY - initialScrollY);
                if (scrollDiff > 20) {
                    setShowPreview(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [showPreview, initialScrollY]);

    useEffect(() => {
        const checkPartiallyVisibleItems = () => {
            if (styles.content_card) {
                setPartiallyVisibleItems(getPartiallyVisibleItems(cardsContainerRef.current, styles.content_card));
            } else {
                setPartiallyVisibleItems([]);
            }
        };

        checkPartiallyVisibleItems();

        const resizeObserver = new ResizeObserver(checkPartiallyVisibleItems);
        if (cardsContainerRef.current) {
            resizeObserver.observe(cardsContainerRef.current);
        }

        const handleScroll = () => {
            checkPartiallyVisibleItems();
        };

        if (cardsContainerRef.current) {
            cardsContainerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (cardsContainerRef.current) {
                cardsContainerRef.current.removeEventListener('scroll', handleScroll);
            }
            resizeObserver.disconnect();
        };
    }, [currentPage, isAnimating, styles.content_card]);

    useEffect(() => {
        if (cardsContainerRef.current) {
            const cardWidth = 240;
            const gap = 16;
            const scrollTo = currentPage * (itemsPerPage * (cardWidth + gap));

            if (!isAnimating) {
                setIsAnimating(true);

                const startTime = performance.now();
                const startPosition = cardsContainerRef.current.scrollLeft;
                const distance = scrollTo - startPosition;
                const duration = 400;

                const animateScroll = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = easeInOutCubic(progress);

                    cardsContainerRef.current.scrollLeft = startPosition + distance * easeProgress;

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        setIsAnimating(false);
                    }
                };

                requestAnimationFrame(animateScroll);
            }
        }
    }, [currentPage, itemsPerPage]);

    const handleDotClick = (pageIndex) => {
        if (currentPage !== pageIndex && !isAnimating) {
            setCurrentPage(pageIndex);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 0 && !isAnimating) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages - 1 && !isAnimating) {
            setCurrentPage(currentPage + 1);
        }
    };

    const hoverIntentThreshold = 300;

    const handleMouseEnter = (item, event, index) => {
        if (partiallyVisibleItems.includes(index)) {
            return;
        }

        if (hoverIntentTimerRef.current) {
            clearTimeout(hoverIntentTimerRef.current);
        }

        const currentTarget = event.currentTarget;

        hoverIntentTimerRef.current = setTimeout(() => {
            if (currentTarget.matches(':hover')) {
                const cardRect = currentTarget.getBoundingClientRect();
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                const windowWidth = window.innerWidth;

                let topPosition = cardRect.top + scrollY;

                const wouldOverflowRight = (cardRect.right + previewWidth + previewMargin) > windowWidth;

                setHoveredItem(item);
                setInitialScrollY(scrollY);
                setShowToLeft(wouldOverflowRight);

                if (wouldOverflowRight) {
                    setPreviewPosition({
                        top: topPosition,
                        left: cardRect.left - previewWidth - previewMargin
                    });
                } else {
                    setPreviewPosition({
                        top: topPosition,
                        left: cardRect.right + scrollLeft + previewMargin
                    });
                }

                setShowPreview(true);
            }
        }, hoverIntentThreshold);
    };

    const handleMouseLeave = (item, event) => {
        if (hoverIntentTimerRef.current) {
            clearTimeout(hoverIntentTimerRef.current);
            hoverIntentTimerRef.current = null;
        }

        // Fix: Only check contains if relatedTarget is a Node
        if (
            previewRef.current &&
            event.relatedTarget &&
            typeof event.relatedTarget === "object" &&
            typeof previewRef.current.contains === "function" &&
            previewRef.current.contains(event.relatedTarget)
        ) {
            // Do nothing, mouse moved to preview
            return;
        }

        const timeout = setTimeout(() => {
            const isOverPreview =
                previewRef.current &&
                typeof previewRef.current.matches === "function" &&
                previewRef.current.matches(':hover');
            if (!isOverPreview) {
                setShowPreview(false);
            }
        }, 100);

        return () => clearTimeout(timeout);
    };

    const handlePreviewMouseLeave = (event) => {
        const relatedTarget = event.relatedTarget;
        const isGoingToCard = relatedTarget && relatedTarget.classList.contains(styles.content_card);

        if (!isGoingToCard) {
            setShowPreview(false);
        }
    };

    return {
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
    };
}
