import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Prism from 'prism-react-renderer';
import { nightOwl } from 'prism-react-renderer';
import styles from './PostModal.module.css';
import useAuthUser from '../../pages/api/UseAuthUser';
import voteOnContent from '../../pages/api/voting.js';
import remarkGfm from 'remark-gfm'; // Import remark-gfm

import AuthorContainer from './AuthorContainer'; // Import the AuthorContainer component

// Import the placeholder image
import placeholderImageUrl from '../../public/pepeskate.gif';

import Footer from './ModalFooter'; // Import the ModalFooter subcomponent

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
      await voteOnContent(user, author, permlink, 5000); // Adjust the weight value as needed
      console.log('Vote successful!');
    } catch (error) {
      console.error('Vote failed:', error);
      // Handle voting error
    }
  };

  const preprocessContent = (content) => {
    // Update the regex pattern to handle links with parentheses in the URL
    const imageRegexEcency = /\(https:\/\/images\.ecency\.com\/[^)]+\)/g;
    const imageRegexHiveBlog = /\(https:\/\/images\.hive\.blog\/[^)]+\)/g;
    const imageRegexEcencyP = /\(https:\/\/images\.ecency\.com\/p\/[^)]+\)/g;
  
    const replacedContent = content
      .replace(imageRegexEcency, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      })
      .replace(imageRegexHiveBlog, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      })
      .replace(imageRegexEcencyP, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      });
  
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
      <blockquote style={{ color: 'limegreen', paddingLeft: '1em', borderLeft: '0.25em solid #ddd' }}>
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ color: 'limegreen', borderCollapse: 'collapse', width: '100%' }}>
          {children}
        </table>
      </div>
    ),
    
    tableCell: ({ isHeader, children }) => {
      const Tag = isHeader ? 'th' : 'td';
      return <Tag style={{  color: 'limegreen', padding: '10px', border: isHeader ? 'none' : '1px solid #ddd' }}>{children}</Tag>;
    },
    image: ({ src, alt }) => {
      // Check if the image URL matches the avatar image URL pattern
      if (src.startsWith('https://images.ecency.com/webp/u/')) {
        return <img src={src} alt={alt} style={{  marginLeft:'40%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '100%' }} />;
      } else {
        // Render a placeholder image for other images
        return <img src={placeholderImageUrl} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
      }
    },
    link: ({ href, children }) => {
      // Check if the link is from "images.ecency.com" or "images.hive.blog"
      if (href.startsWith('https://images.ecency.com/p/') || href.startsWith('https://images.hive.blog/')) {
        // Render the link as an image
        return <img src={href} alt="Link Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
      } else {
        // If it's not from "images.ecency.com" or "images.hive.blog", render a regular anchor tag
        return (
          <a style={{ color: 'yellow' }} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
    },
    // Custom renderer for bold text
    strong: ({ children }) => <strong style={{ fontWeight: 'bold', color: 'rgb(255, 235, 18)' }}>{children}</strong>,
    // Custom paragraph renderer
    paragraph: ({ children }) => (
      <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'limegreen' }}>{children}</p>
    ),
    // Custom renderer for the b (bold) tag
    b: ({ children }) => {
      // Convert the children array to a string
      const textContent = React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('');
  
      // Check if there is a markdown link inside the bold tag
      const markdownLinkRegex = /\[(.*?)\]\((.*?)\)/;
      const matches = textContent.match(markdownLinkRegex);
  
      if (matches) {
        const linkText = matches[1];
        const linkHref = matches[2];
  
        // Render the markdown link inside the bold tag as a clickable link
        return (
          <a style={{ fontWeight: 'bold', color: 'limegreen' }} href={linkHref} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>
        );
      } else {
        // If there are no markdown links, render the bold text without any changes
        return <strong style={{ fontWeight: 'bold', color: 'limegreen' }}>{children}</strong>;
      }
    },
    div: ({ children, className }) => {
      if (className === 'pull-left') {
        return (
          <div style={{ float: 'left' }}>
            {children}
          </div>
        );
      } else if (className === 'pull-right') {
        return (
          <div style={{ float: 'right' }}>
            {children}
          </div>
        );
      } else {
        return <div>{children}</div>;
      }
    },
  };

  // State variable to keep track of the number of characters to display
  const [charactersToShow, setCharactersToShow] = useState(0);

  // State variable to track if the user has manually scrolled
  const [userScrolled, setUserScrolled] = useState(false);

  // Event handler to track the user's scrolling behavior
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the modal
    const isAtBottom = modalContainerRef.current.scrollTop >= modalContainerRef.current.scrollHeight - modalContainerRef.current.offsetHeight;
    setUserScrolled(!isAtBottom);
  };

  useEffect(() => {
    // Show a new character every 5 milliseconds (adjust as needed)
    const timer = setInterval(() => {
      setCharactersToShow((prevChars) => {
        // Check if all characters are already shown
        if (prevChars >= processedContent.length) {
          // Clear the interval
          clearInterval(timer);
        } else {
          // If not all characters are shown, increment the count
          return prevChars + 1;
        }
      });
    }, 5);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [processedContent]);
  

  useEffect(() => {
    // Scroll the modal container as characters are added, but only if the user has not scrolled manually
    if (modalContainerRef.current && !userScrolled) {
      modalContainerRef.current.scrollTop = modalContainerRef.current.scrollHeight;
    }
  }, [charactersToShow, userScrolled]);

  // Ref to access the modal container element
  const modalContainerRef = useRef(null);

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer} ref={modalContainerRef} onScroll={handleScroll}>
            <hr></hr>
            <br></br>
            {/* Use the AuthorContainer component */}
            <AuthorContainer avatarUrl={avatarUrl} author={author} title={title} />
            <hr></hr>
            <div className={styles.modalContent}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={renderers}
              >
                {processedContent.substring(0, charactersToShow)}
              </ReactMarkdown>
            </div>
            {/* Use the ModalFooter subcomponent for the footer */}
            <Footer onClose={handleClose} onVote={handleVote} />
          </div>
        </div>
      )}
    </>
  );
}
