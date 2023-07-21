import React from 'react';
import styles from '../styles/PostModal.module.css';

export default function ModalFooter({ onClose, onVote }) {
  return (
    <div className={styles.modalFooter}>
      <button className={styles.modalCloseButton} onClick={onClose}>
        Close
      </button>
      <button className={styles.modalVoteButton} onClick={onVote}>
        Vote
      </button>
    </div>
  );
}
