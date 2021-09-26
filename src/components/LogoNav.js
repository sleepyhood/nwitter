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

  return scrollDirection === "down" || window.scrollY < 40 ? (
    <div className="logoNav active" onClick={onHandleTop}>
      <span className="logos">
        {/* <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDBDMTE0LjgzNywwLDAsMTE0LjgzNywwLDI1NnMxMTQuODM3LDI1NiwyNTYsMjU2czI1Ni0xMTQuODM3LDI1Ni0yNTZTMzk3LjE2MywwLDI1NiwweiBNMjU2LDQ5MC42NjcNCgkJCWMtMTI5LjM4NywwLTIzNC42NjctMTA1LjI4LTIzNC42NjctMjM0LjY2N1MxMjYuNjEzLDIxLjMzMywyNTYsMjEuMzMzUzQ5MC42NjcsMTI2LjYxMyw0OTAuNjY3LDI1NlMzODUuMzg3LDQ5MC42NjcsMjU2LDQ5MC42Njd6DQoJCQkiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /> */}
        <span className="circle">○</span>
        <span className="triangle">△</span>
        <span className="rectangle">□</span>
        {/* <i className="far fa-dot-circle fa-3x"></i>
        <i className="far fa-play-circle fa-3x fa-rotate-270"></i>
        <i className="far fa-stop-circle fa-3x"></i> */}
      </span>

      {/* <i className="fas fa-shapes fa-2x"></i> */}
      {/* <i className="fas fa-campground fa-2x"></i>{" "} */}
    </div>
  ) : (
    <div className="logoNav hidden"></div>
  );
};
export default LogoNav;
