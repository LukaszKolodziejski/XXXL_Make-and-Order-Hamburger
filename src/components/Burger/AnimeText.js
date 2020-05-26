import React, { useEffect, useRef } from "react";

const AnimeText = (props) => {
  const wrapper = useRef(null);
  useEffect(() => {
    const box = wrapper.current;
    const speed = 150;
    let wordIndex = 0;
    let textIndex = 0;
    let oldTime = 0;
    let activeDOMelement;
    const text = [
      "Choose your dream ingredients! ",
      "Let's go my friend: 3   2   1   0... ",
      "This are the last seconds of super prices !!! ",
      "I'm waiting still...",
      "Hmm, so ... ",
      "The End ??? ",
    ];

    const typing = (newTime) => {
      if (newTime - oldTime > speed) {
        let letter = text[textIndex].substr(wordIndex, 1);
        if (wordIndex === text[textIndex].length - 1) {
          if (textIndex === text.length - 1) return;
          waitTimeAndRestartAnimation();
        } else if (wordIndex === 0 || letter === "^") {
          if (letter === "^") letter = " ";
          const p = document.createElement("p");
          box.appendChild(p);
          activeDOMelement = p;
        }
        oldTime = newTime;
        activeDOMelement.textContent += letter;
        wordIndex++;
      }
      requestAnimationFrame(typing);
    };

    typing();

    const waitTimeAndRestartAnimation = () => {
      return setTimeout(() => {
        wordIndex = 0;
        textIndex++;
        box.textContent = "";
        requestAnimationFrame(typing);
      }, 3000);
    };
  }, []);

  return <div ref={wrapper}></div>;
};

export default AnimeText;
