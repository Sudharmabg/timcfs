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
    // --- Image Phase ---
    const imgScrollDistance = window.innerHeight * 4;

    const tlImg = gsap.timeline({
      scrollTrigger: {
        trigger: imageWrapperRef.current,
        start: 'top top+=90',
        end: `+=${imgScrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 0 -> 1: Zoom image, no text yet
    tlImg.fromTo(imageContainerRef.current,
      { scale: 1, borderRadius: '0px' },
      { scale: 0.92, borderRadius: '35px', ease: 'none', duration: 1 }, 0);
    tlImg.fromTo(imageOverlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0)' },
      { backgroundColor: 'rgba(0, 40, 94, 0.75)', ease: 'none', duration: 1 }, 0);

    // 1 -> 2: Text fades in
    tlImg.fromTo(textsRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, 1);

    // 2 -> 3: Hold text reading time
    tlImg.to(textsRef.current, { opacity: 1, duration: 1 }, 2);

    // 3 -> 4: Text fades out and overlay lightens to show pure image again
    tlImg.to(textsRef.current, { opacity: 0, y: -20, duration: 1, ease: 'power2.in' }, 3);
    tlImg.to(imageOverlayRef.current, { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 1 }, 3);

    // --- Video Phase ---
    const videoScrollDistance = window.innerHeight * 6;

    const tlVid = gsap.timeline({
      scrollTrigger: {
        trigger: videoWrapperRef.current,
        start: 'top top+=90',
        end: `+=${videoScrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 0 -> 1: Video Frame Shrinks
    tlVid.fromTo(videoContainerRef.current,
      { scale: 1, borderRadius: '0px' },
      { scale: 0.92, borderRadius: '35px', ease: 'none', duration: 1 }, 0);

    tlVid.fromTo(overlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0)' },
      { backgroundColor: 'rgba(0, 40, 94, 0.4)', ease: 'none', duration: 1 }, 0);

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
