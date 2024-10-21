import "../../src/styles/header.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Link } from "react-router-dom";

gsap.registerPlugin(CustomEase);

const Header = () => {
  const menuToggleRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    CustomEase.create(    
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1" // Maximum speed with minimal control points
    );

    const menuToggle = menuToggleRef.current;
    const menu = menuRef.current;
    const links = document.querySelectorAll(".links");
    const socialLinks = document.querySelectorAll(".socials p");

    let isOpen = false; // Track if the menu is open or closed
    let isAnimating = false;

    // Function to split text into spans
    const splitTextIntoSpans = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const text = element.textContent || "";
        const splitText = text
          .split("")
          .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
          .join("");
        element.innerHTML = splitText;
      });
    };

    splitTextIntoSpans(".header h1");

    const openMenuTimeline = gsap.timeline({ paused: true });

    openMenuTimeline
      .to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5, // Fast opening
        onStart: () => {
          if (menu) menu.style.pointerEvents = "all";
        },
      })
      .to(
        [links, socialLinks], // Animate both links and social links together
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85, // Fast appearance
          duration: 1,
          ease: "power3.out",
        },
        0 // Start at the same time as the previous animation
      )
      .to(
        ".video-wrapper",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5, // Fast video wrapper animation
          ease: "hop",
          stagger: 0.1,
          delay: 0.5,
        },
        0
      ) // Start at the same time
      .to(
        ".header",
        {
          stagger: 0.1,
          delay: 0.5,
          y: 0,
          scale: 1,
          duration: 1.5, // Fast header animation
          ease: "power4.out",
          opacity: 1,
        },
        0
      ); // Start at the same time

    // Handle menu toggle click event
    const handleMenuToggle = () => {
      if (isAnimating) return; // Prevent animations overlap
      isAnimating = true;

      if (!isOpen) {
        // Open the menu
        menuToggle?.classList.remove("closed");
        menuToggle?.classList.add("opened");
        openMenuTimeline.play(); // Play the animation timeline
      } else {
        // Close the menu
        menuToggle?.classList.remove("opened");
        menuToggle?.classList.add("closed");
        openMenuTimeline.reverse(); // Reverse the animation timeline
      }

      isOpen = !isOpen; // Toggle the menu state

    };

    // This will reset `isAnimating` when the timeline is completed (both open and close)
    openMenuTimeline.eventCallback("onComplete", () => {
      isAnimating = false;
    });

    // Add onReverseComplete to reset `isAnimating` when the reverse animation finishes
    openMenuTimeline.eventCallback("onReverseComplete", () => {
      isAnimating = false;
    });

    menuToggle?.addEventListener("click", handleMenuToggle);

    // Cleanup event listener on unmount
    return () => {
      menuToggle?.removeEventListener("click", handleMenuToggle);
    };
  }, []);

  return (
    <div className="header-body">
      {/* logo */}
      <div className="menu-logo">
        <Link className="" to="/">
          AKARU
        </Link>
      </div>

      {/* menu toggle button  */}
      <div ref={menuToggleRef} className="menu-toggle closed">
        <div className="menu-toggle-icon">
          <div className="hamburger">
            <div className="menu-bar" data-position="top"></div>
            <div className="menu-bar" data-position="bottom"></div>
          </div>
        </div>

        <div className="menu-copy">
          <p>MENU</p>
        </div>
      </div>

      {/* menu desplegable */}
      <div ref={menuRef} className="menu">
        {/* col 1 */}
        <div className="col col-1">
          {/* logo */}
          <div className="menu-logo">
            <a className="" href="#">
              AKARU
            </a>
          </div>

          {/* links */}
          <div className="links">
            <Link className="link" to="/">
              Projects
            </Link>
            <Link className="link" to="/">
              Expertise
            </Link>
            <Link className="link" to="/">
              Agency
            </Link>
            <Link className="link" to="/">
              Contact
            </Link>
          </div>

          {/* video wrapper */}
          <div className="video-wrapper">
            <video autoPlay muted loop>
              <source src="/AKARU/assets/city_timelapse.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* col 2 */}
        <div className="col col-2">
          {/* socials */}
          <div className="socials">
            <div className="sub-col">
              <p>x.com/AKARU</p>
              <p>github.com/AKARU</p>
              <p>linkedin.com/in/AKARU/</p>

              <br />
              <p>AKARU@outlook.es</p>
              <p>+54 9 11 4029-5235</p>
            </div>

            <div className="sub-col sub-2">
              <p>Twitter</p>
              <p>Github</p>
              <p>Linkedin</p>

              <br />

              <p>Email</p>
              <p>Number</p>
            </div>
          </div>

          {/* header */}
          <div className="header">
            <h1>AKARU</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
