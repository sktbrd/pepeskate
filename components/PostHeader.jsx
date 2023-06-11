
//import styles from "../styles/Navbar.module.css";
import HiveFeed from "./HiveFeed";
import { useState } from "react";


export default function PostHeader(author, title) {
    
  return (
    <nav>
      <a href="/" target="_blank">
        { author }
      </a>

      <div>
      </div>
    </nav>
  );
}
