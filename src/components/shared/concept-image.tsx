import Image from "next/image";

type ConceptImageProps = {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  sizes?: string;
};

export function ConceptImage({
  src,
  alt,
  className = "",
  caption = "BMYGYM concept visualisation",
  sizes = "(max-width: 767px) 100vw, 50vw",
}: ConceptImageProps) {
  return (
    <figure className={`concept-image ${className}`}>
      <div className="image-frame">
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
