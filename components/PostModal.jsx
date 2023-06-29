import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Prism from 'prism-react-renderer';
import { nightOwl } from 'prism-react-renderer';
import styles from '../styles/PostModal.module.css';
import useAuthUser from '../pages/api/UseAuthUser';
import voteOnContent from '../pages/api/voting.js';
import remarkGfm from 'remark-gfm'; // Import remark-gfm

export default function PostModal({ title, content, author, permlink, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuthUser();

  const handleClose = () => {
    setIsOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleVote = async () => {
    try {
      await voteOnContent(user, author, permlink, 10000); // Adjust the weight value as needed
      console.log('Vote successful!');
    } catch (error) {
      console.error('Vote failed:', error);
      // Handle voting error
    }
  };

  const preprocessContent = (content) => {
    const peakdImageRegex = /(https:\/\/files\.peakd\.com\/.*?\.(?:png|jpg|jpeg|gif|svg))/g;
    const hiveImageRegex = /(https:\/\/images\.hive\.blog\/.*?\.(?:png|jpg|jpeg|gif|svg))/g;
    const imageReplacement = '![]($1)';
    const replacedContent = content
      .replace(peakdImageRegex, imageReplacement)
      .replace(hiveImageRegex, imageReplacement);
    return replacedContent;
  };

  const processedContent = preprocessContent(content);

  // Generate the avatar image URL based on the author's name
  const avatarUrl = `https://images.ecency.com/webp/u/${author}/avatar/small`;

  const renderers = {
    code: ({ language, value }) => (
      <Prism
        code={value}
        language={language}
        theme={nightOwl}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Prism>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ color: '#666', paddingLeft: '1em', borderLeft: '0.25em solid #ddd' }}>
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>{children}</table>
    ),
    tableCell: ({ isHeader, children }) => {
      const Tag = isHeader ? 'th' : 'td';
      return <Tag style={{ padding: '10px', border: isHeader ? 'none' : '1px solid #ddd' }}>{children}</Tag>;
    },
    image: ({ src, alt }) => {
      // Check if the image URL matches the avatar image URL pattern
      if (src.startsWith('https://images.ecency.com/webp/u/')) {
        return <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '100%' }} />;
      } else {
        // Render a placeholder image for other images
        return <img src={placeholderImageUrl} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
      }
    },
    link: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.authorContainer}>
              <img src={avatarUrl} alt="author-avatar" style={{ borderRadius: '100%' }} /> {/* Render the author's avatar image with border radius */}
              <h2>{author}</h2>
              <h3>{title}</h3>
            </div>
            <div className={styles.modalContent}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]} // Enable remark-gfm plugin
                rehypePlugins={[rehypeRaw]}
                components={renderers}
              >
                {processedContent}
              </ReactMarkdown>
            </div>
            <button className={styles.modalCloseButton} onClick={handleClose}>
              Close
            </button>
            <button className={styles.modalVoteButton} onClick={handleVote}>
              VOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
