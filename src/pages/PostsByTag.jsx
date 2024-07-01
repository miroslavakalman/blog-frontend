import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostsByTag = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Установка состояния загрузки перед запросом
        const response = await axios.get(`/posts/search?tag=${tag}`);
        setPosts(response.data);
        setLoading(false); // Установка состояния загрузки после получения данных
      } catch (error) {
        setError(error.message); // Обработка ошибки при запросе
        setLoading(false); // Установка состояния загрузки в случае ошибки
      }
    };

    fetchPosts();
  }, [tag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Posts tagged with "{tag}"</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <p>Tags: {post.tags.join(', ')}</p>
          <p>Views: {post.viewsCount}</p>
          {/* Дополнительные данные по необходимости */}
        </div>
      ))}
    </div>
  );
};

export default PostsByTag;
