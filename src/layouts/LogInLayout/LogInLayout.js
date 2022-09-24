import classNames from 'classnames/bind';
import Footer from '~/components/Footer/Footer';
import LogInForm from '~/components/LogInForm/logInForm';
import AuthProvider from '~/Context/AuthContext';
import styles from './LogInLayout.module.scss';

const cx = classNames.bind(styles)

function LogInLayout() {
    return (
        <AuthProvider>
        <div className={cx('wrapper')}>
            <div className={cx('modal-container')}>
                <LogInForm/>
            </div>
            <Footer/>
        </div>
        </AuthProvider>
    );
}

export default LogInLayout;