import { useState } from "react";
import styles from "../styles/PostModal.module.css";

export default function PostModal({ title, content, onClose}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const onNext = () => {
    console.log("testing arrow")
  };
  const onPrev = () => {
    console.log("testing arrow")
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
            <div className={styles.modalNavigation}>
              <button className={styles.modalPrevButton} onClick={onPrev}>
                {"<"}
              </button>
              <button className={styles.modalNextButton} onClick={onNext}>
                {">"}
              </button>
            </div>
            <button
              className={styles.modalVoteButton}
              onClick={() => console.log("vote clicked")}
            >
              VOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
