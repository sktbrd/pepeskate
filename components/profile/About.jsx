import React, { useEffect, useState } from 'react';
import useAuthUser from '../../pages/api/UseAuthUser';
import { Client } from '@hiveio/dhive';
import styles from '../../styles/About.module.css';

const client = new Client([
  'https://api.hive.blog',
  'https://anyx.io',
  'https://api.pharesim.me'
]);

const ProfileItem = ({ label, value }) => (
  <tr>
    <td>{label}:</td>
    <td>{value}</td>
  </tr>
);

export default function About() {
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState(true);
  const [profileAbout, setProfileAbout] = useState('');

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      const metadata = JSON.parse(user.posting_json_metadata);
      if (metadata && metadata.profile && metadata.profile.about) {
        setProfileAbout(metadata.profile.about);
      }
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div>
          <h1 className={styles.heading}>User Account Resume</h1>
          <h1>{profileAbout}</h1>

          <table className={styles.table}>
            <tbody>
              <ProfileItem label="ID" value={user.id} />
              <ProfileItem label="Name" value={user.name} />
              <ProfileItem label="About" value={profileAbout} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
