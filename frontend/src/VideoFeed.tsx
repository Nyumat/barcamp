import { useEffect, useRef } from "react";

const VideoFeed = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            (videoRef.current as HTMLVideoElement).srcObject = stream;
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      controls
      ref={videoRef}
    ></video>
  );
};

export default VideoFeed;
