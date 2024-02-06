import { useState, useRef, useEffect } from "react";
import "boxicons";

export default function Dropdown({ placeholder, items, updateDOB }) {
  // items static for now

  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(placeholder);

  useEffect(() => {
    if (selected != placeholder) updateDOB(selected);
  }, [selected]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
          console.log("hi");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="dropdown-container" ref={wrapperRef}>
      <div
        className="dropdown-content"
        style={{ visibility: isActive ? "visible" : "hidden" }}
      >
        <div
          className="dropdown-item"
          onClick={(e) => {
            setSelected(e.target.textContent); // should later be an id
            setIsActive(!isActive);
          }}
        >
          item 1
        </div>

        <div
          className="dropdown-item"
          onClick={(e) => {
            setSelected(e.target.textContent); // should later be an id
            setIsActive(!isActive);
          }}
        >
          item 2
        </div>

        <div
          className="dropdown-item"
          onClick={(e) => {
            setSelected(e.target.textContent); // should later be an id
            setIsActive(!isActive);
          }}
        >
          item 3
        </div>
      </div>

      <div className="dropdown-button" onClick={(e) => setIsActive(!isActive)}>
        <input placeholder={selected} />
        <span className="dropdown-chevron">
          {isActive ? (
            <box-icon name="chevron-up" color="#8f8e8e" size="20px"></box-icon>
          ) : (
            <box-icon
              name="chevron-down"
              color="#8f8e8e"
              size="20px"
            ></box-icon>
          )}
        </span>
      </div>
    </div>
  );
}
