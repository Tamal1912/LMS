import { useEffect, useState } from 'react';

const TypewriterText = ({ texts = [], speed = 50 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
      {texts[index].substring(0, subIndex)}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterText;
