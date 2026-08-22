import { useEffect, useRef, useState } from 'react';

/**
 * Renders a video, an image, or a gradient plate.
 *
 * Video only plays while it is actually on screen — an autoplaying
 * grid of videos is the fastest way to melt a laptop battery. The
 * observer watches a wrapper rather than the <video> itself so the
 * element can be torn down without losing the observation target.
 */
export default function MediaItem({ item, className = '', onClick }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || item.type !== 'video') return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '50px', threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [item.type]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      // play() rejects if the element is detached or autoplay is
      // blocked; neither is worth surfacing to the user.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  if (item.type === 'video') {
    return (
      <div ref={wrapRef} className={`gmedia ${className}`}>
        <video
          ref={videoRef}
          className="gmedia__el"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="metadata"
          poster={item.poster}
        >
          <source src={item.url} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (item.type === 'image') {
    return (
      <img
        src={item.url}
        alt={item.title}
        className={`gmedia__el ${className}`}
        onClick={onClick}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // Gradient plate — reuses the project tone classes.
  return (
    <div
      className={`gmedia__el work__plate--${item.tone} ${className}`}
      onClick={onClick}
    />
  );
}
