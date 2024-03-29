import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Post from './Post';
import Story, { StoryItem } from './Story';
import Suggested from './Suggested';
import Loading from '~/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '~/redux/reducers/postSlice';

const cx = classNames.bind(styles);

function Home() {
    const logout = useSelector((state) => state.auth.logout);
    const auth = useSelector((state) => state.auth.auth);
    const post = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [
        post.create.isLoading,
        post.delete.isLoading,
        post.update.isLoading,
        post.like.isLoading,
        post.unlike.isLoading,
    ]);

    return (
        <div className={cx('wrapper')}>
            {(logout.isLoading || post.create.isLoading || post.delete.isLoading || post.update.isLoading) && (
                <Loading />
            )}

            <div className={cx('container')}>
                <Story>
                    <StoryItem />
                </Story>
                <Post posts={post.posts.data} />
            </div>
            <Suggested />
        </div>
    );
}

export default Home;
