import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import styles from './RegisterForm.module.scss'
import { useAuth } from "~/Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const cx = classNames.bind(styles)

function RegisterForm({className}) {
    const { signInWithGoogle, signInWithFacebook, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleGoogle = async (e) => {
        e.preventDefault()

        try {
            // setError tro lai ban dau
            setError('')
            setLoading(true)
            await signInWithGoogle()
        } catch {
            setError('Faile to sign up')
        }

        setLoading(false)
    }

    const handleFacebook = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signInWithFacebook()
        } catch {
            setError('Faile to sign up')
        }

        setLoading(false)
    }

    useEffect(() => {
        if (currentUser != null) {
            navigate('/cng-movie')
        }
    }, [currentUser, navigate])

    const classes = cx('wrapper',{
        // Khi có className thì lấy data của className truyền vào [className] làm key
        [className]: className
    });

    return ( 
        <div className={classes}>
            <h3 className={cx('modal-header')}>Sign Up</h3>
            {error && <h3>{error}</h3>}
            <div className={cx('modal-body')}>         
                <button className={cx('signin-button')} onClick={handleGoogle}>
                    <div className={cx('icon-wrapper')}>
                        <img 
                            alt="Google"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/180px-Google_%22G%22_Logo.svg.png"
                            className={cx('signin-icon')}
                        />
                    </div>
                    <span>Sign in with Google</span>
                </button>  
                <span className={cx('or')}>or</span>
                <button className={cx('signin-button')} onClick={handleFacebook}>
                    <div className={cx('icon-wrapper')}>
                        <img 
                            alt="Google"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1024px-Facebook_circle_pictogram.svg.png"
                            className={cx('signin-icon')}
                        />
                    </div>
                    <span>Sign in with Facebook</span>
                </button>             
            </div>        
        </div>
    );
}

export default RegisterForm;