import { memo, useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  githubLink?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const videoUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
    };
  }, []);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);

      if (videoUrlRef.current) {
        setVideo(videoUrlRef.current);
        return;
      }

      const response = await fetch(`src/assets/${props.video}`);
      if (!response.ok) return;

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      videoUrlRef.current = blobUrl;
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
      >
        {props.link ? (
          <a
            className="work-image-link"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
          >
            <img
              src={props.image}
              alt={props.alt}
              loading="lazy"
              decoding="async"
            />
            {isVideo && (
              <video src={video} autoPlay muted playsInline loop></video>
            )}
          </a>
        ) : (
          <>
            <img
              src={props.image}
              alt={props.alt}
              loading="lazy"
              decoding="async"
            />
            {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
          </>
        )}

        {(props.link || props.githubLink) && (
          <div className="work-links">
            {props.githubLink && (
              <a
                className="work-link"
                href={props.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
                data-cursor="disable"
              >
                <FaGithub />
              </a>
            )}
            {props.link && (
              <a
                className="work-link"
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live project"
                data-cursor="disable"
              >
                <MdArrowOutward />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(WorkImage);
