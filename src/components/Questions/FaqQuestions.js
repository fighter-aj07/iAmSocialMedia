import FAQ from "./FAQ";
import { useState } from "react";
import "./Questions.css";
const FaqQuestions = () => {
  const [faqs, setfaqs] = useState([
    {
      question: "How to recover password?",
      answer: "Click on forgot password.",
      open: false,
    },

    {
      question: "How to block a friend",
      answer: "Click on blocklist.",
      open: false,
    },

    {
      question: "What names are allowed ?",
      answer: "Click on blocklist.",
      open: false,
    },

    {
      question: "How to find new friends",
      answer: "Click on blocklist.",
      open: false,
    },

    {
      question: "How upload a photo ?",
      answer: "Click on blocklist",
      open: false,
    },

    {
      question: "How to deactivate the account ?",
      answer: "Click on blocklist.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  return (
    <div className="faqs">
      {faqs.map((faq, i) => (
        <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
      ))}
    </div>
  );
};

export default FaqQuestions;
