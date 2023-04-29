import { useState } from "react";
import styles from "../styles/PostModal.module.css";

export default function PostModal({ title, content, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>{title}</h3>
            </div>
            <div className={styles.modalContent}>{content}</div>
            <button className={styles.modalCloseButton} onClick={handleClose}>
                Close
            </button>
            <button className={styles.modalVoteButton} onClick={console.log("good luck setting this function")}>
                VOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
