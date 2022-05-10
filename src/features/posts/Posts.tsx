import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { selectPosts, fetchPostsAsync, selectStatus, Statuses } from './postSlice';
import Post from './Post';
import PostForm from './PostForm';

// useAppDispatch can not be used inside a callback function like in useEffect.
// That is why we are going to use simple useDispatch hook.

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <div className="card">
      <div className="card-body">
        <h3>{status}</h3>
        <PostForm />
        {posts && posts.length > 0 && posts.map(post => {
          return <div className="key" key={post.id}>
            <Post
              dispatch={dispatch}
              post={post}
            />
          </div>
        })}
      </div>
    </div>
  }

  return (
    <div>
      <h1>Posts</h1>
        {contents}
    </div>
  );
}

export default Posts;
