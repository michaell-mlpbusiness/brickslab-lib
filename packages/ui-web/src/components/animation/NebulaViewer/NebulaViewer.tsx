"use client";

import { useEffect, useRef, useState } from "react";
import "./NebulaViewer.css";
import type { NebulaViewerProps } from "./NebulaViewer.types";

export function NebulaViewer({
  title = "Nebula",
  description = "Découvrez vos modèles 3D dans une expérience immersive et fluide.",
  ctaLabel = "Découvrir",
  ctaLink = "#",
  models,
  autoRotate = true,
  viewerWidth = "650px",
  haloSize = "500px",
  showPauseButton = true,
  className = "",
}: NebulaViewerProps) {
  const viewerRef = useRef<any>(null);

  const [currentModel, setCurrentModel] = useState(models[0]?.src);
  const [rotating, setRotating] = useState(autoRotate);

  useEffect(() => {
    if (!viewerRef.current) return;

    if (rotating) {
      viewerRef.current.setAttribute("auto-rotate", "");
    } else {
      viewerRef.current.removeAttribute("auto-rotate");
    }
  }, [rotating]);

  const changeModel = (src: string) => {
    setCurrentModel(src);
  };

  const toggleRotation = () => {
    setRotating(!rotating);
  };

  return (
    <section className={`nebula-wrapper ${className}`}>

      {/* TEXT */}

      <div className="nebula-info">

        <h1>{title}</h1>

        <p>{description}</p>

        <a className="nebula-cta" href={ctaLink}>
          {ctaLabel}
        </a>

      </div>

      {/* VIEWER */}

      <div
        className="nebula-viewer-box"
        style={{ width: viewerWidth }}
      >
        <div
          className="nebula-halo"
          style={{ width: haloSize, height: haloSize }}
        />

        <model-viewer
          ref={viewerRef}
          src={currentModel}
          camera-controls
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
        ></model-viewer>

        <div className="nebula-shadow"></div>

        {/* OPTIONS */}

        <div className="nebula-options">
          {models.map((model, i) => (
            <div
              key={i}
              className={`nebula-opt ${
                currentModel === model.src ? "active" : ""
              }`}
              style={{ background: model.color }}
              onClick={() => changeModel(model.src)}
            />
          ))}
        </div>

        {/* PAUSE */}

        {showPauseButton && (
          <button className="nebula-pause-btn" onClick={toggleRotation}>
            {rotating ? "⏸" : "▶"}
          </button>
        )}
      </div>

    </section>
  );
}