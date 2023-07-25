
import React, { useState } from 'react';
import * as dhive from '@hiveio/dhive';
import styles from './PostPage.module.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Prism from 'prism-react-renderer';
import parse from 'html-react-parser';

const renderers = {
  // ... other renderers ...

  html: ({ value }) => parse(value),


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
  html: ({ value }) => {
    // Create a new DOM parser
    const parser = new DOMParser();

    // Parse the HTML string
    const doc = parser.parseFromString(value, 'text/html');

    // Get all iframes in the HTML
    const iframes = doc.getElementsByTagName('iframe');

    // If there are any iframes, return the first one
    if (iframes.length > 0) {
      const iframe = iframes[0];

      // Create a new React element from the iframe
      return React.createElement('iframe', {
        src: iframe.src,
        width: iframe.width,
        height: iframe.height,
        frameBorder: iframe.frameBorder,
        allow: iframe.allow,
        allowFullScreen: iframe.allowFullScreen,
      });
    }

    // If there are no iframes, return null
    return null;
  },
};
const PostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const privateKey = dhive.PrivateKey.fromString(document.getElementById('postingKey').value);
      const account = document.getElementById('username').value;
      const taglist = tags.split(' ');
      const json_metadata = JSON.stringify({ tags: taglist });
      const permlink = Math.random().toString(36).substring(2);

      const accountInfo = await client.database.call('get_accounts', [[account]]);
      const postingKeyAuthority = accountInfo[0].posting.key_auths[0][0];

      const result = await client.broadcast.comment(
        {
          author: account,
          body: body,
          json_metadata: json_metadata,
          parent_author: '',
          parent_permlink: taglist[0],
          permlink: permlink,
          title: title,
        },
        privateKey,
        postingKeyAuthority
      );

      setTitle('');
      setBody('');
      setTags('');

      console.log({ result });
    } catch (error) {
      console.error(error);
    }
  };


  const renderBody = () => {
    const lines = body.split('\n');
    return lines.map((line, index) => {
      if (line.trim().startsWith('<iframe')) {
        // If the line is an iframe, render it as HTML
        return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
      } else {
        // Otherwise, render it as markdown
        return <ReactMarkdown key={index} renderers={renderers} plugins={[gfm]} children={line} />;
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <h1>POST</h1>
        <div className={styles.inputGroup}>
          <h2>Title:</h2>
          <input type="text" placeholder="Enter a title" value={title} onChange={handleTitleChange} />
        </div>
  
        <div className={styles.inputGroup}>
          <h2>Body:</h2>
          <textarea className={styles.textarea} placeholder="Enter the post body" value={body} onChange={handleBodyChange}></textarea>
        </div>
  
        <div className={styles.inputGroup}>
          <h2>Tags:</h2>
          <input type="text" placeholder="Enter tags (space-separated)" value={tags} onChange={handleTagsChange} />
        </div>
        <div className={styles.inputGroup}>
        <h2>Posting Key:</h2>
        <input type="password" placeholder="Enter posting key" id="postingKey" />
      </div>

      <div className={styles.inputGroup}>
        <h2>Username:</h2>
        <input type="text" placeholder="Enter username" id="username" />
      </div>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
  
      <div className={styles.previewContainer}>
        <h2>Preview</h2>
        {renderBody()}
      </div>
    </div>
  );
};

const client = new dhive.Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network',
]);

export default PostPage;
