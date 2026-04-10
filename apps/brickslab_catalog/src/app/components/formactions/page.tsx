"use client";
import { useState } from "react";
import { 
  FormActions,
  Button,
} from "@brickslab./ui-web";
import { FiSave, FiTrash2, FiPlus, FiDownload, FiSend } from "react-icons/fi";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Boutons d'action du formulaire",
  },
  {
    name: "align",
    type: '"left" | "center" | "right" | "between"',
    default: '"right"',
    description: "Alignement horizontal des boutons",
  },
  {
    name: "stacked",
    type: "boolean",
    default: "false",
    description: "Empile les boutons verticalement (utile pour mobile)",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Classes CSS supplémentaires",
  },
];

const usageCode = `import { FormActions, Button } from "@brickslab./ui-web";

// Alignement à droite (défaut)
<FormActions>
  <Button variant="secondary">Annuler</Button>
  <Button type="submit">Enregistrer</Button>
</FormActions>

// Espace entre les groupes
<FormActions align="between">
  <Button variant="danger">Supprimer</Button>
  <div style={{ display: "flex", gap: 12 }}>
    <Button variant="secondary">Brouillon</Button>
    <Button type="submit">Publier</Button>
  </div>
</FormActions>

// Centré
<FormActions align="center">
  <Button variant="secondary">Précédent</Button>
  <Button>Suivant</Button>
</FormActions>

// Empilé (mobile)
<FormActions stacked>
  <Button type="submit" fullWidth>Enregistrer</Button>
  <Button variant="secondary" fullWidth>Annuler</Button>
</FormActions>`;

export default function FormActionsPage() {
  return (
    <div>
      <ComponentHeader
        name="FormActions"
        description="Conteneur pour les boutons d'action d'un formulaire avec options d'alignement et d'empilement"
        section="Form"
      />

      <SectionTitle>Alignements</SectionTitle>
      <SubLabel>right (défaut) · left · center · between</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>right (défaut)</p>
            <FormActions align="right">
              <Button variant="secondary">Annuler</Button>
              <Button>Enregistrer</Button>
            </FormActions>
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>left</p>
            <FormActions align="left">
              <Button variant="secondary">Annuler</Button>
              <Button>Enregistrer</Button>
            </FormActions>
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>center</p>
            <FormActions align="center">
              <Button variant="secondary">Précédent</Button>
              <Button>Suivant</Button>
            </FormActions>
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>between</p>
            <FormActions align="between">
              <Button variant="danger">Supprimer</Button>
              <div style={{ display: "flex", gap: 12 }}>
                <Button variant="secondary">Brouillon</Button>
                <Button>Publier</Button>
              </div>
            </FormActions>
          </div>
        </div>
      </Preview>

      <SectionTitle>Mode empilé</SectionTitle>
      <SubLabel>stacked={false} (défaut) · stacked={true}</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%", maxWidth: 400 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Horizontal (défaut)</p>
            <FormActions>
              <Button variant="secondary">Annuler</Button>
              <Button>Enregistrer</Button>
            </FormActions>
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Empilé (mobile)</p>
            <FormActions stacked>
              <Button fullWidth>Enregistrer</Button>
              <Button variant="secondary" fullWidth>Annuler</Button>
            </FormActions>
          </div>
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Formulaire de création</SectionTitle>
      <SubLabel>Actions avec brouillon et publication</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <FormActions align="between">
            <Button variant="ghost" leftIcon={<FiTrash2 />}>
              Supprimer
            </Button>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="secondary" leftIcon={<FiDownload />}>
                Brouillon
              </Button>
              <Button leftIcon={<FiSend />}>
                Publier
              </Button>
            </div>
          </FormActions>
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Wizard / Multi-étapes</SectionTitle>
      <SubLabel>Navigation entre les étapes avec progression</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <WizardExample />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Modal de confirmation</SectionTitle>
      <SubLabel>Actions de confirmation avec danger</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 500 }}>
          <ModalExample />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Formulaire mobile</SectionTitle>
      <SubLabel>Boutons empilés pleine largeur pour mobile</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 320 }}>
          <MobileFormExample />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Édition avec actions avancées</SectionTitle>
      <SubLabel>Formulaire d'édition avec reset et sauvegarde</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <EditFormExample />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}

// Cas d'usage : Wizard multi-étapes
function WizardExample() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Progress indicator */}
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i < step ? "var(--color-brand)" : "var(--c-border)"
            }}
          />
        ))}
      </div>

      {/* Step content */}
      <div style={{ 
        padding: 32, 
        textAlign: "center",
        background: "var(--c-surface)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--c-border)"
      }}>
        <p style={{ fontSize: 48, margin: 0 }}>📝</p>
        <p style={{ fontSize: 18, fontWeight: 600, margin: "12px 0 4px" }}>
          Étape {step} sur {totalSteps}
        </p>
        <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0 }}>
          Contenu de l'étape {step}
        </p>
      </div>

      {/* Actions */}
      <FormActions align="between">
        <Button 
          variant="secondary" 
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          ← Précédent
        </Button>
        <Button 
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          disabled={step === totalSteps}
        >
          Suivant →
        </Button>
      </FormActions>
    </div>
  );
}

// Cas d'usage : Modal de confirmation
function ModalExample() {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div style={{ 
        padding: 24,
        background: "var(--c-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--c-border)",
        boxShadow: "var(--shadow-lg)"
      }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 600 }}>
          Confirmer la suppression
        </h3>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.6 }}>
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
        </p>
        <FormActions>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => setShowConfirm(false)}>
            Supprimer
          </Button>
        </FormActions>
      </div>
    );
  }

  return (
    <Button variant="danger" onClick={() => setShowConfirm(true)}>
      Supprimer l'élément
    </Button>
  );
}

// Cas d'usage : Formulaire mobile
function MobileFormExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
          Nom complet
        </label>
        <input
          type="text"
          placeholder="Jean Dupont"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            fontSize: 16
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
          Email
        </label>
        <input
          type="email"
          placeholder="john@exemple.com"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            fontSize: 16
          }}
        />
      </div>

      <FormActions stacked>
        <Button fullWidth leftIcon={<FiSave />}>
          Enregistrer
        </Button>
        <Button variant="secondary" fullWidth>
          Annuler
        </Button>
      </FormActions>
    </div>
  );
}

// Cas d'usage : Édition avec actions avancées
function EditFormExample() {
  const [hasChanges, setHasChanges] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
          Titre de l'article
        </label>
        <input
          type="text"
          defaultValue="Mon article de blog"
          onChange={() => setHasChanges(true)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--fontsize-sm)"
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
          Contenu
        </label>
        <textarea
          defaultValue="Contenu de l'article..."
          rows={4}
          onChange={() => setHasChanges(true)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--fontsize-sm)",
            resize: "vertical"
          }}
        />
      </div>

      {hasChanges && (
        <div style={{ 
          padding: 12, 
          background: "var(--c-brand-subtle)",
          border: "1px solid var(--c-brand-border)",
          borderRadius: "var(--radius-md)",
          fontSize: 13,
          color: "var(--color-muted)"
        }}>
          ⚠️ Vous avez des modifications non enregistrées
        </div>
      )}

      {saved && (
        <div style={{ 
          padding: 12, 
          background: "var(--color-success-bg)",
          border: "1px solid var(--color-success-border)",
          borderRadius: "var(--radius-md)",
          fontSize: 13,
          color: "var(--color-success)"
        }}>
          ✅ Modifications enregistrées avec succès
        </div>
      )}

      <FormActions align="between">
        <Button 
          variant="ghost" 
          onClick={() => {
            setHasChanges(false);
            setSaved(false);
          }}
        >
          Réinitialiser
        </Button>
        <div style={{ display: "flex", gap: 12 }}>
          <Button 
            variant="secondary"
            onClick={() => setHasChanges(false)}
          >
            Annuler
          </Button>
          <Button 
            onClick={() => {
              setHasChanges(false);
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </FormActions>
    </div>
  );
}
