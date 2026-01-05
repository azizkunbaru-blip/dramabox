import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (src.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    video.src = src;
  }, [src]);

  return <video ref={videoRef} controls className="w-full rounded-2xl" poster={poster} />;
} 
