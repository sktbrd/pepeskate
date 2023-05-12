import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../styles/PostModal.module.css";

export default function PostModal({ title, content, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const onNext = () => {
    console.log("testing arrow");
    console.log(content);
  };

  const onPrev = () => {
    console.log("testing arrow");
  };

  const excludedStrings = ["Watch on 3Speak", "<center>", "</center>"];

  const preprocessContent = (content) => {
    let processedContent = content;
    excludedStrings.forEach((str) => {
      processedContent = processedContent.replace(new RegExp(str, "g"), "");
    });
    return processedContent;
  };

  const processedContent = preprocessContent(content);

  const renderers = {
    paragraph: ({ children }) => <p>{children}</p>,
    heading: ({ level, children }) => {
      const HeadingComponent = `h${level}`;
      return <HeadingComponent>{children}</HeadingComponent>;
    },
    link: ({ href, children }) => <a href={href}>{children}</a>,
    image: ({ src, alt }) => <img src={src} alt={alt} />,
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <button className={styles.modalPrevButton} onClick={onPrev}>
            {"<"}
          </button>
          <button className={styles.modalNextButton} onClick={onNext}>
            {">"}
          </button>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>{title}</h3>
            </div>
            <div className={`${styles.modalContent} ${styles.scrollable}`}>
              <ReactMarkdown renderers={renderers}>
                {processedContent}
              </ReactMarkdown>
            </div>
            <button className={styles.modalCloseButton} onClick={handleClose}>
              Close
            </button>
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
