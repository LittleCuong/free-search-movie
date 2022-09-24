import classNames from "classnames/bind";
import { useRef, useState } from "react";
import styles from './RegisterForm.module.scss'
import AuthProvider, { useAuth } from "~/Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function RegisterForm({className}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }

        try {
            // setError tro lai ban dau
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Faile to sign up')
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
            {error && <h3>{error}</h3>}
            <form className={cx('modal-body')}  onSubmit={handleSubmit}>
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

                <label className={cx('modal-input-label')} htmlFor='passwordConfirm'>Password confirmation</label>
                <input 
                    ref={passwordConfirmRef} 
                    required
                    className={cx('modal-input')} 
                    type="password" 
                    id='passwordConfirm' 
                    name='passwordConfirm'
                />
                <button disabled={loading} className={cx('submit-button')}>
                    <span>Submit</span>
                </button>
                <div className={cx('login')}>
                    <span>Already have an account?</span>
                    <Link className={cx('login-button')} to="/login">Log in</Link>
                </div>
            </form>        
        </div>
    );
}

export default RegisterForm;