"use client";

import { NebulaViewer, type NebulaModelOption } from "@brickslab./ui-web";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { ComponentHeader, Preview, SectionTitle } from "../../../catalog/PageSection";

const sampleModels: NebulaModelOption[] = [
  {
    src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    color: "#7C3AED",
  },
  {
    src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    color: "#0EA5E9",
  },
];

const props: PropDef[] = [
  { name: "title", type: "string", default: `"Nebula"`, description: "Main title displayed in the info panel." },
  { name: "description", type: "string", default: `"Découvrez vos modèles 3D..."`, description: "Short descriptive text under the title." },
  { name: "ctaLabel", type: "string", default: `"Découvrir"`, description: "Call-to-action label." },
  { name: "ctaLink", type: "string", default: `"#"`, description: "CTA link URL." },
  { name: "models", type: "NebulaModelOption[]", required: true, description: "List of 3D models (.glb format) available in the viewer." },
  { name: "autoRotate", type: "boolean", default: "true", description: "Enable or disable auto-rotation." },
  { name: "viewerWidth", type: "string", default: `"650px"`, description: "Width of the viewer container." },
  { name: "haloSize", type: "string", default: `"500px"`, description: "Size of the background halo glow." },
  { name: "showPauseButton", type: "boolean", default: "true", description: "Show a pause/play button to toggle rotation." },
  { name: "className", type: "string", description: "Additional CSS class on the wrapper." },
];

const usageCode = `import { NebulaViewer } from "@brickslab./ui-web";

const models = [
  { src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", color: "#7C3AED" },
  { src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb", color: "#0EA5E9" },
];

<NebulaViewer
  title="Nebula"
  description="Découvrez vos modèles 3D dans une expérience immersive et fluide."
  ctaLabel="Découvrir"
  ctaLink="#"
  models={models}
/>;`;

export default function NebulaViewerPage() {
  return (
    <div>
      <ComponentHeader
        name="NebulaViewer"
        section="Animation"
        description="Viewer 3D basé sur <model-viewer> avec halo, sélecteur de modèles et rotation auto (pause/play)."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <Preview
        background="linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.85))"
        style={{ padding: 0, overflow: "visible" }}
      >
        <div style={{ width: "100%" }}>
          <NebulaViewer
            title="Nebula"
            description="Découvrez vos modèles 3D dans une expérience immersive et fluide."
            ctaLabel="Découvrir"
            ctaLink="#"
            models={sampleModels}
          />
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
