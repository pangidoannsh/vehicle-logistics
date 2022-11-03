function SlideButton(props) {
    return (
        <button className={`fixed duration-500 z-10 top-[22px]  p-2
                ${props.isOpen ? 'left-[196px]' : 'left-[14px]'}`}
            onClick={props.handleClick}>
            < div className="flex" >
                <div>
                    <span className={`duration-1000  bg-[#DDA842] top-burger ${props.isOpen ? 'w-3 -rotate-45' : 'w-5'}`}></span>
                    <span className={`duration-500 ${props.isOpen ? 'w-5 h-[6px] block' : ' bg-[#DDA842] mid-burger'}`}></span>
                    <span className={`duration-1000 bg-[#DDA842]  bottom-burger ${props.isOpen ? 'w-3 rotate-45' : 'w-5'}`}></span>
                </div>
            </ div>
        </button>
    )
}

export default SlideButton

//button 2 chevron
    //  < div className = "flex" >
    //      <div>
    //          <span className={`duration-500  bg-[#DDA842] top-burger ${props.isOpen ? 'w-3 -rotate-45' : 'w-5'}`}></span>
    //          <span className={`duration-500 ${props.isOpen ? 'w-5 h-[6px] block' : ' bg-[#DDA842] mid-burger'}`}></span>
    //          <span className={`duration-500 bg-[#DDA842]  bottom-burger ${props.isOpen ? 'w-3 rotate-45' : 'w-5'}`}></span>
    //      </div>
    //       <div className={`-ml-[10px] ${!props.isOpen && 'hidden'}`}>
    //          <span className={`duration-500  bg-[#DDA842] top-burger ${props.isOpen ? 'w-3 -rotate-45' : 'w-5'}`}></span>
    //          <span className={`duration-500 ${props.isOpen ? 'w-5 h-[6px] block' : ' bg-[#DDA842] mid-burger'}`}></span>
    //          <span className={`duration-500 bg-[#DDA842]  bottom-burger ${props.isOpen ? 'w-3 rotate-45' : 'w-5'}`}></span>
    //      </div>
    //  </ div>

// Icon Cross (X)
    //  < span className = {`duration-1000 w-5 bg-gold top-burger ${props.isOpen && '-rotate-45'}`}></ >
    //  <span className={`duration-1000 ${!props.isOpen && 'bg-gold mid-burger my-2'}`}></span>
    //  <span className={`duration-1000 w-5 bg-gold  bottom-burger ${props.isOpen && 'rotate-45 -mt-[2px]'}`}></span>