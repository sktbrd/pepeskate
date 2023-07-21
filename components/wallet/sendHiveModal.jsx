import styles from '../../pages/wallet/sendHiveModal.module.css'; // Import the styles for the Modal
import React from 'react';
import { useState, useEffect } from 'react';

export default function Modal({ toAddress, setToAddress, amount, setAmount, handleTransfer, setShowModal }) {
  return (
    <div className={styles.modal}>
      <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} placeholder="To Address" />
      <br></br>
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={handleTransfer}>Send Hive</button>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
}
