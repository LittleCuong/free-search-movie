import classNames from 'classnames/bind';
import Footer from '~/components/Footer/Footer';
import RegisterForm from '~/components/RegisterForm/RegisterForm';
import AuthProvider from '~/Context/AuthContext';
import styles from './RegisterLayout.module.scss';

const cx = classNames.bind(styles)

function RegisterLayout() {
    return (
        <AuthProvider>
        <div className={cx('wrapper')}>
            <div className={cx('modal-container')}>
                <RegisterForm/>
            </div>
            <Footer/>
        </div>
        </AuthProvider>
    );
}

export default RegisterLayout;