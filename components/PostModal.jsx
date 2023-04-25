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
              <button className={styles.modalCloseButton} onClick={handleClose}>
                X
              </button>
            </div>
            <div className={styles.modalContent}>{content}</div>
          </div>
        </div>
      )}
    </>
  );
}
