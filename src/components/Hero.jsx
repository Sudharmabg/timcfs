import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageWrapperRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageOverlayRef = useRef(null);
  const textsRef = useRef(null);

  const videoWrapperRef = useRef(null);
  const videoContainerRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    // We map the requested 15 "seconds" into a reasonable scroll distance ratio.
    // 5 "seconds" for Image = 2.5 window heights (0.5 height per second)
    // 10 "seconds" for Video = 5 window heights (0.5 height per second)
    const timeScale = 0.5;

    // --- Image Phase ---
    const imgScrollDistance = window.innerHeight * 5 * timeScale; // 2.5 h

    const tlImg = gsap.timeline({
      scrollTrigger: {
        trigger: imageWrapperRef.current,
        start: 'top top+=90',
        end: `+=${imgScrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      }
    });

    // Total Image Timeline Duration = 5 units
    // 0 -> 5: Zoom image backwards gently over the entire 5 units
    tlImg.to(imageContainerRef.current,
      { scale: 0.95, borderRadius: '35px', ease: 'none', duration: 5 }, 0);

    // 0 -> 2: PURE IMAGE

    // 2 -> 2.5: Text and Overlay smoothly fade in
    tlImg.to(imageOverlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0.65)', duration: 0.5, ease: 'power1.inOut' }, 2);
    tlImg.to(textsRef.current,
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, 2);

    // 2.5 -> 3.5: Text holds visibly (combining fade + hold = 2 units total of text action)

    // 3.5 -> 4: Text and overlay smoothly fade out
    tlImg.to(textsRef.current,
      { opacity: 0, y: -20, scale: 0.95, duration: 0.5, ease: 'power2.in' }, 3.5);
    tlImg.to(imageOverlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 0.5, ease: 'power1.inOut' }, 3.5);

    // 4 -> 5: PURE IMAGE

    // --- Video Phase ---
    const videoScrollDistance = window.innerHeight * 10 * timeScale; // 5 h

    const tlVid = gsap.timeline({
      scrollTrigger: {
        trigger: videoWrapperRef.current,
        start: 'top top+=90',
        end: `+=${videoScrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      }
    });

    // 0 -> 10: Video Frame Shrinks over exactly 10 units
    tlVid.fromTo(videoContainerRef.current,
      { scale: 1, borderRadius: '0px' },
      { scale: 0.95, borderRadius: '35px', ease: 'none', duration: 10 }, 0);

    tlVid.fromTo(overlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0)' },
      { backgroundColor: 'rgba(0, 0, 0, 0.4)', ease: 'none', duration: 10 }, 0);

    // ==========================================================
    // AUTOPLAY HYBRID LOGIC
    // Automatically smoothly scrolls the page downward to play the intro like a movie,
    // but instantly hands control back to the user seamlessly if they try to touch / scroll themselves.
    // ==========================================================
    let isInterrupted = false;
    let autoScrollTween;

    const interrupt = () => {
      isInterrupted = true;
      if (autoScrollTween) autoScrollTween.kill();
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('pointerdown', interrupt);
      window.removeEventListener('keydown', interrupt);
    };

    // Listen for any kind of manual user interaction intended to scroll or touch the screen
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('pointerdown', interrupt, { passive: true });
    window.addEventListener('keydown', interrupt, { passive: true });

    // Allow components to mount for 500ms before we begin moving the camera automatically
    gsap.delayedCall(0.5, () => {
      // Skip auto-scroll if user navigated here via a hash link (e.g., /#team from another page)
      if (sessionStorage.getItem('hashNav')) {
        sessionStorage.removeItem('hashNav');
        return;
      }
      // Don't auto-scroll if the user has already scrolled or interrupted during the 500ms delay
      if (isInterrupted || window.scrollY > 50) return;

      const totalDistance = imgScrollDistance + videoScrollDistance;
      const autoScrollObj = { y: window.scrollY };

      // Total duration 20 seconds to match the requested relaxed pacing (5s image, 15s video)
      autoScrollTween = gsap.to(autoScrollObj, {
        y: totalDistance,
        duration: 20,
        ease: 'none',
        onUpdate: () => window.scrollTo(0, autoScrollObj.y)
      });
    });

    // Cleanup listeners upon navigating away
    return () => interrupt();

  });

  return (
    <>
      <section className="hero-wrapper" ref={imageWrapperRef}>
        <div className="hero-video-container" ref={imageContainerRef}>
          <img className="hero-video" src="/hero-img.jpg" alt="Train the Manchester City Way" loading="eager" />
          <div className="hero-overlay" ref={imageOverlayRef}></div>

          <div className="hero-texts" ref={textsRef}>
            <h1 className="hero-text">Train the Manchester City Way</h1>
            <p className="hero-subtext">
              Built on the philosophy and training methodology of the Manchester City Academy, Techno India Manchester City Football School offers boys and girls aged 6–17 the opportunity to develop their football skills, stay active, build friendships, and enjoy the game in a positive, supportive learning environment under the guidance of fully qualified Manchester City–trained coaches.
            </p>
          </div>
        </div>
      </section>

      <section className="hero-wrapper" ref={videoWrapperRef}>
        <div className="hero-video-container" ref={videoContainerRef}>
          <video className="hero-video" autoPlay loop muted playsInline>
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" ref={overlayRef}></div>
        </div>
      </section>
    </>
  );
};

export default Hero;
