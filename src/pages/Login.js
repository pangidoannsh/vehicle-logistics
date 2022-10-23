import { useEffect, useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [slide, setSlide] = useState({
        onRight: false,
        way: 'left-0'
    });

    const handleChange = e => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPass(e.target.value)
                break
        }

    }
    const handleSubmit = e => {
        e.preventDefault()

    }
    const handleHover = () => {
        let way = 'left-40'
        if (slide.onRight) {
            way = 'left-0'
        }
        setSlide({
            onRight: !slide.onRight,
            way
        })
    }

    useEffect(() => {
        if ((email !== '') && (pass !== '')) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [email, pass]);
    return (
        <div className='grid grid-cols-3 gap-20 justify-center  items-center h-96'>
            <div className="col-span-1"></div>
            <form onSubmit={handleSubmit} action="" className='col-span-1'>
                <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={handleChange} name='email' id='email' value={email}
                        placeholder='xxx@example.com' className='border border-black rounded-md py-2 px-1' />
                </div>
                <div className="flex flex-col my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={handleChange} name='password' id='password' value={pass}
                        className='border border-black rounded-md py-2 px-1' />
                </div>
                <button onMouseEnter={handleHover}
                    className={`relative duration-300 focus:bg-teal-700 bg-teal-500 col-span-1 rounded-md text-white py-2 px-4
                     ${!isValid && slide.way}`}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login