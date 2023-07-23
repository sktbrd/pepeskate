import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import * as dhive from '@hiveio/dhive';
import styles from './PostPage.module.css';

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

  return (
    <div className={styles.container}>
      <h1>POST</h1>
      <div className={styles.inputGroup}>
        <h2>Title:</h2>
        <input type="text" placeholder="Enter a title" value={title} onChange={handleTitleChange} />
      </div>

      <div className={styles.inputGroup}>
        <h2>Body:</h2>
        <textarea placeholder="Enter the post body" value={body} onChange={handleBodyChange}></textarea>
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
  );
};

const client = new dhive.Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network',
]);

export default PostPage;
