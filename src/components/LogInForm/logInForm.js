import classNames from "classnames/bind";
import { useRef, useState } from "react";
import styles from './LogInForm.module.scss'
import { useAuth } from "~/Context/AuthContext";
import { Link, useNavigate} from "react-router-dom";

const cx = classNames.bind(styles)

function LogInForm({className}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            // setError tro lai ban dau
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/user')
        } catch{
            setError('Failed to sign in')
        }

        setLoading(false)
    }

    const classes = cx('wrapper',{
        // Khi có className thì lấy data của className truyền vào [className] làm key
        [className]: className
    });

    return ( 
        <div className={classes}>
            <h3 className={cx('modal-header')}>Sign Up</h3>
            <form 
                className={cx('modal-body')} 
                // onSubmit={handleSubmit}
            >
                <label className={cx('modal-input-label')} htmlFor='email'>Enter your email</label>
                <input
                    ref={emailRef}
                    required
                    className={cx('modal-input')} 
                    type="text" id='emmail' 
                    name='email'
                />

                <label className={cx('modal-input-label')} htmlFor='password'>Enter your password</label>
                <input 
                    ref={passwordRef} 
                    required
                    className={cx('modal-input')} 
                    type="password" id='password' 
                    name='password'
                />
                <button disabled={loading} onClick={handleSubmit} className={cx('submit-button')}>
                    <span>Submit</span>
                </button>
                <div className={cx('register')}>
                    <span>Don't have an account?</span>
                    <Link className={cx('register-button')} to="/register">Sign in</Link>
                </div>
            </form>
            
        </div>
    );
}

export default LogInForm;