import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../styles/PostModal.module.css";
import useAuthUser from "../pages/api/UseAuthUser";
import voteOnContent from "../pages/api/voting.js";


export default function PostModal({ title, content, author, permlink, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuthUser();

  const handleClose = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleVote = async () => {
    try {
      await voteOnContent(user, author, permlink, 10000); // Adjust the weight value as needed
      console.log("Vote successful!");
    } catch (error) {
      console.error("Vote failed:", error);
      // Handle voting error
    }
  };

  const onNext = () => {
    console.log("testing arrow");
    console.log(content);
    console.log(author);
  };

  const onPrev = () => {
    console.log("testing arrow");
    console.log(user);
    console.log(author);
    console.log(permlink);
    console.log(user?.name);
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

  // Console.log current username
  console.log("Current username:", user?.name);

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
              <h2>{author}</h2>
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
            <button className={styles.modalVoteButton} onClick={handleVote}>
              VOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
