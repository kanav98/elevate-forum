import { useCallback, useEffect, useState } from 'react'
import './styles.css'

const AutoCompleteSearchbar = ({ getPostsOrAuthors, handleOptionSelect, searchedValue }) => {
    const [suggestedOptions, setSuggestedOptions] = useState([])
    const [listVisible, setListVisible] = useState(false)

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleChange = (e) => {
        setSuggestedOptions(getPostsOrAuthors(e.target.value))
    };

    useEffect(() => {
        if (searchedValue === '')
            setListVisible(false)
        else
            setListVisible(true)
    }, [searchedValue])

    const debuncedSearch = debounce(handleChange)

    const styleClass = listVisible ? '' : 'hidden'

    const handleSelect = (_, value, id, type) => {
        handleOptionSelect(value, id, type)
        setListVisible(false)
    }

    return (
        <div className='autocomplete'>
            <input
                type='text'
                onChange={debuncedSearch}
            />
            {
                <div className={`autocomplete-items ${styleClass}`}>
                    {suggestedOptions?.map(option =>
                        <div
                            key={`${option?.id}-${option?.title || option?.name}`}
                            onClick={(e) => handleSelect(e, option?.title || option?.name, option.id, !!option?.title ? 'post' : 'author')}>
                            {option?.title || option?.name}
                        </div>
                    )}
                </div>
            }
        </div >
    )
}

export default AutoCompleteSearchbar