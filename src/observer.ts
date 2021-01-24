// `threshold` is value betwee 0.0 to 1.0,
// 0.0 means that even a single visible pixel counts as the target being visible.
// 1.0 means that the entire target element is visible
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Thresholds

const option = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0, 
}

export const createObserver = (page: number, setPage: 
        React.Dispatch<React.SetStateAction<number>>
    ) => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const y = entities[0].boundingClientRect.y
    }

    return new IntersectionObserver(handleObserver, option)
}
