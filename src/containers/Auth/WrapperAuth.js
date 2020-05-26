import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const WrapperAuth = (props) => {
  const x = props.x;
  const wrapper = useRef(null);
  useEffect(() => {
    const tl = gsap;
    const auth = wrapper.current;
    tl.from(auth, { duration: 1.5, ease: "power1.inOut", x });
  }, []);

  return <div ref={wrapper}>{props.children}</div>;
};

export default WrapperAuth;
