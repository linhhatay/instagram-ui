import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiSmile } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CommentIcon, HeartIcon, HeartIconActive, InboxIcon, SaveIcon } from '~/components/Icons';
import Image from '~/components/Image';
import styles from './Post.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, unlikePost, commentPost } from '~/redux/reducers/postSlice';

import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [isModal, setIsModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [comment, setComment] = useState('');

    const auth = useSelector((state) => state.auth.auth);

    const dispatch = useDispatch();

    const handleRemovePost = (id) => {
        dispatch(deletePost(id));
    };

    const handleEditPost = (data) => {
        if (auth.user._id === data.author._id) {
            setIsEdit(true);
            setIsModal(true);
        } else {
            alert('Bạn không phải người đăng bài, không thể chỉnh sửa bài viết này');
        }
    };

    const handleLikePost = () => {
        const state = { idPost: data._id, user: auth.user._id };
        if (isLike) {
            setIsLike(false);
            dispatch(unlikePost(state));
        } else {
            setIsLike(true);
            dispatch(likePost(state));
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        const state = {
            postId: data._id,
            content: comment,
            author: auth.user._id,
        };
        dispatch(commentPost(state));
    };

    useEffect(() => {
        if (data.likes.find((like) => like === auth.user._id)) {
            setIsLike(true);
        }
    }, [data.likes]);

    return (
        <div className={cx('post-item')}>
            {isModal && <Modal isEdit={isEdit} data={data} setIsModal={setIsModal} />}

            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Image className={cx('avatar')} src={data.author.avatar} />
                    <div className={cx('desc')}>
                        <Link to="" className={cx('user-name')}>
                            {data.author?.username}
                        </Link>
                        <div className={cx('location')}>{data.location}</div>
                    </div>
                </div>
                <Tippy
                    trigger="click"
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('content')} tabIndex="-1" {...attrs}>
                            <div className={cx('menu-options')}>
                                <div onClick={() => handleEditPost(data)}>Chỉnh sửa</div>
                                <div onClick={() => handleRemovePost(data._id)}>Xóa</div>
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('options')}>
                        <BiDotsHorizontalRounded className={cx('btn-actions')} />
                    </div>
                </Tippy>
            </div>
            <div className={cx('content')}>
                <Image className={cx('image')} src={data.image} />
                <div className={cx('actions')}>
                    <div>
                        <button className={cx('action-btn')} onClick={handleLikePost}>
                            {isLike ? <HeartIconActive /> : <HeartIcon />}
                        </button>
                        <button className={cx('action-btn')}>
                            <CommentIcon />
                        </button>
                        <button className={cx('action-btn')}>
                            <InboxIcon />
                        </button>
                    </div>
                    <div>
                        <button className={cx('save')}>
                            <SaveIcon />
                        </button>
                    </div>
                </div>
                <div className={cx('post')}>
                    <span className={cx('likes')}>{data.likes.length} likes</span>
                    {data.content && (
                        <div className={cx('details')}>
                            <span className={cx('author')}>{data.author?.username}</span>&nbsp;{' '}
                            <span className={cx('text')}>{data.content}</span>
                        </div>
                    )}
                    <button className={cx('load-more')}>
                        View All <span>22,413 </span> comments
                    </button>
                    <div className={cx('user-comment')}>
                        <div className={cx('box')}>
                            <span className={cx('author')}>lih_hatay24</span>&nbsp;{' '}
                            <span className={cx('text')}>Good news!</span>
                        </div>
                        <button className={cx('loves')}>
                            <HeartIcon height={12} width={12} />
                        </button>
                    </div>
                    <div className={cx('times')}>1 HOURS AGO</div>
                </div>
                <div className={cx('comment')}>
                    <form>
                        <button className={cx('icons')}>
                            <FiSmile />
                        </button>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                        ></textarea>
                        <button type="submit" className={cx('send')} onClick={handleComment}>
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
