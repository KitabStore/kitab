import React, { useEffect, useRef, useState } from 'react'

const Truncate = (props) => {
    const [isFull, setIsFull] = useState(false);
    const [lines, setLines] = useState();
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState();
    useEffect(()=>{
        setLines(Math.ceil(window.innerHeight/100));
        setIsVisible(!(Number(ref.current.scrollHeight) === Number(ref.current.clientHeight)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const pStyles = {
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box'
    };
  return (
    <div>
        <p className={props.className} style={isFull ? null : pStyles} ref={ref}>
            {props.children}
        </p>
        <div className='text-end'>
            {
                isVisible 
                    && 
                <span style={{cursor: 'pointer',}} className='text-dark-emphasis ' onClick={() => setIsFull(!isFull)}>{isFull ? "read less": "read more"}</span>
            }
        </div>
    </div>
  )
}
export default Truncate;