type VideoProps = {
  /** Direct video file (mp4/webm). Use this OR `embed`. */
  src?: string;
  /** Embed URL (e.g. a YouTube/Vimeo iframe src). Use this OR `src`. */
  embed?: string;
  poster?: string;
  caption?: string;
};

// Responsive 16:9 video for MDX posts: a native <video> for self-hosted files,
// or an <iframe> for embeds.
export default function Video({ src, embed, poster, caption }: VideoProps) {
  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5">
        {embed ? (
          <iframe
            src={embed}
            title={caption ?? "Embedded video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm opacity-60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
