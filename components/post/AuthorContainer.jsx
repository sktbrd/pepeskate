// AuthorContainer.jsx
import React from 'react';
import styles from './PostModal.module.css';

export default function AuthorContainer({ avatarUrl, author, title }) {
  return (
    <div className={styles.authorContainer}>
      <img src={avatarUrl} alt="author-avatar" style={{ borderRadius: '100%' }} />
      <h2 style={{ color: 'limegreen' }}>{author}</h2>
      <hr></hr>
      <h1 style={{ color: 'limegreen' }}>{title}</h1>
    </div>
  );
}
