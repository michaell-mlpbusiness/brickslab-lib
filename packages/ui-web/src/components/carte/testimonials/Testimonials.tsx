// components/Testimonial/Testimonial.tsx
import React from "react";
import { LogoMark } from "../../navigation/logo_mark/LogoMark";
import { StarRating } from "./start_rating/StarRating";
import { TestimonialProps } from "./Testimonials.type";
import { Text as TextUI } from "../../typographie/text/Text";

export function Testimonial({
  userName,
  comment,
  rating,
  size = "md",
  imgSrc,
  imgAlt,
}: TestimonialProps) {
  return (
    <article
      className="testimonial-card"
      aria-label={`Témoignage de ${userName}`}
    >
      <header className="testimonial-card__header">
        <LogoMark
          size={size}
          shape="circle"
          variant="icon"
          imgSrc={imgSrc}
          imgAlt={imgAlt ?? `Logo de ${userName}`}
        />

        <div className="testimonial-card__meta">
          <TextUI texte={userName} variant="body-md" tone="brand" />
          <StarRating value={rating} />
        </div>
      </header>

      <div className="testimonial-card__body">
        <TextUI texte={comment} variant="body-sm" tone="default" />
      </div>
    </article>
  );
}