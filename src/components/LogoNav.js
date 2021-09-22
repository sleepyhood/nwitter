import React, { useEffect, useState } from "react";

const LogoNav = () => {
  const [scrollDirection, setScrollDirection] = useState();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // the offset of the document.body
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const listener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect());

    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  const onHandleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return scrollDirection === "down" ? (
    <div className="logoNav active" onClick={onHandleTop}>
      <i class="fas fa-campground fa-2x"></i>{" "}
    </div>
  ) : (
    <div className="logoNav hidden"></div>
  );
};
export default LogoNav;
