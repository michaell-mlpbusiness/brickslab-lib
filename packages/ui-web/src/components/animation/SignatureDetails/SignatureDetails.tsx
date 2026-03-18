"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import "./SignatureDetails.css";
import type { SignatureDetailsProps } from "./SignatureDetails.types";

export function SignatureDetails({
  details,
  title = "Détails Signature",
  subtitle = "Chaque pièce est définie par un savoir-faire méticuleux et des matériaux d’exception.",
  columns = 4,
  cardRadius = "4px",
  sectionPadding = "8rem 0",
  overlayColor = "rgba(20,20,20,0.9)",
  imageAspectRatio = "3/4",
  className = "",
}: SignatureDetailsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      className={`signature-section ${className}`}
      style={{ padding: sectionPadding }}
    >
      <div className="signature-container">

        {/* Header */}
        <motion.div
          className="signature-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div
          className="signature-grid"
          style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}
        >
          {details.map((detail, index) => {
            const imgSrc = detail.image;

            return (
              <motion.div
                key={detail.id}
                className="signature-card"
                style={{ borderRadius: cardRadius }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(detail.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="signature-image-wrapper"
                  style={{
                    aspectRatio: imageAspectRatio,
                    borderRadius: cardRadius,
                  }}
                >
                  <motion.img
                    src={imgSrc}
                    alt={detail.title}
                    animate={{
                      scale: hoveredId === detail.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    draggable={false}
                  />
                </div>

                {/* Overlay */}
                <motion.div
                  className="signature-overlay"
                  style={{
                    background: `linear-gradient(to top, ${overlayColor}, transparent)`,
                    borderRadius: cardRadius,
                  }}
                  animate={{
                    opacity: hoveredId === detail.id ? 1 : 0,
                  }}
                >
                  <h3>{detail.title}</h3>
                  <p>{detail.description}</p>
                </motion.div>

                {/* Title */}
                {hoveredId !== detail.id && (
                  <div className="signature-title">
                    <h3>{detail.title}</h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}