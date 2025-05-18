import React, { useState, useRef, useEffect } from "react";
import SearchLogo from "../../assets/images/home/search.svg";
import styles from "../../assets/styles/search_bar/search_bar.module.css";

function SearchBar({ onSearch }) {
    const [expanded, setExpanded] = useState(false);
    const [query, setQuery]       = useState("");
    const inputRef                = useRef(null);
    useEffect(() => {
        if (expanded && inputRef.current) {
        inputRef.current.focus();
        }
    }, [expanded]);

    const handleToggle = () => {
        if (expanded && !query) {
        setExpanded(false);
        } else {
        setExpanded(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        onSearch(query);
        setQuery("");
        setExpanded(false);
        }
    };

    const handleBlur = () => {
        if (!query) setExpanded(false);
    };

    return (
        <div className={styles.container}>
        <input
            ref={inputRef}
            type="text"
            className={`${styles.input} ${expanded ? styles.expanded : ""}`}
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />

        <button
            type="button"
            className={styles.button}
            onClick={handleToggle}
            aria-label="Toggle search"
        >
            <img src={SearchLogo} alt="Search" className={styles.icon} />
        </button>
        </div>
    );
}

export default SearchBar;