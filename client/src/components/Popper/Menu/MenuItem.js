import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

import { useDispatch } from 'react-redux';
import { logoutUser } from '~/redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handler = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={data.action && handler}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
