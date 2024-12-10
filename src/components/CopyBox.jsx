import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
export default function CopyBox({ text, value, label }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (!isHovered && isCopied) {
      setIsCopied(false);
    }
  }, [isHovered, isCopied]);
  return (
    <div className="copy-box-container">
      <label>{label}</label>
      <div
        className="copy-box"
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isCopied ? (
          <FaCheckSquare className="copy-icon" />
        ) : (
          <FaCopy className="copy-icon" />
        )}
        <p>{text}</p>
      </div>
    </div>
  );
}
