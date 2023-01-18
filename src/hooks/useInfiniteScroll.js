
import { useState, useRef, useCallback, useEffect } from 'react';

function useInfiniteScroll() {
    const [currentPage, setCurrentPage] = useState(1);
    const elementRef = useRef(null);

    const handleObserver = useCallback((entries) => {
        const [target] = entries;

        if (target.isIntersecting) {
            setCurrentPage((prev) => {
                if (prev <= 9)
                    return prev + 1
                return prev
            });
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, option);

        if (elementRef.current) observer.observe(elementRef.current);
    }, [handleObserver]);

    return { elementRef, currentPage };
}

export default useInfiniteScroll;