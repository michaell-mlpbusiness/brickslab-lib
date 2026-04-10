"use client";
import { useState } from "react";
import { 
  FormError,
  Button,
} from "@brickslab./ui-web";
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
    name: "message",
    type: "string",
    description: "Message d'erreur général affiché en haut du bloc",
  },
  {
    name: "errors",
    type: "Record<string, string | string[]>",
    description: "Objet mappant les noms de champs à leurs messages d'erreur",
  },
  {
    name: "fieldName",
    type: "string",
    description: "Filtre les erreurs pour un champ spécifique uniquement",
  },
  {
    name: "showIcon",
    type: "boolean",
    default: "true",
    description: "Affiche l'icône d'erreur à gauche du message",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Classes CSS supplémentaires",
  },
];

const usageCode = `import { FormError } from "@brickslab./ui-web";

// Erreur générale
<FormError message="Veuillez corriger les erreurs ci-dessous" />

// Erreurs multi-champs
<FormError 
  message="Le formulaire contient des erreurs"
  errors={{
    email: "Email invalide",
    password: "Minimum 8 caractères requis",
    username: "Ce nom est déjà pris"
  }}
/>

// Erreur pour un champ spécifique
<FormError 
  fieldName="email"
  errors={{
    email: ["Email requis", "Format invalide"]
  }}
/>

// Sans icône
<FormError 
  message="Une erreur est survenue"
  showIcon={false}
/>`;

export default function FormErrorPage() {
  const [showGeneral, setShowGeneral] = useState(true);
  const [showMulti, setShowMulti] = useState(true);
  const [showSingle, setShowSingle] = useState(true);
  const [showNoIcon, setShowNoIcon] = useState(true);

  const multiErrors = {
    email: "Adresse email invalide",
    password: "Le mot de passe doit contenir au moins 8 caractères",
    username: "Ce nom d'utilisateur est déjà utilisé",
    phone: "Numéro de téléphone invalide"
  };

  const arrayErrors = {
    email: ["L'email est requis", "Format invalide"],
    password: ["Mot de passe requis", "Minimum 8 caractères"]
  };

  return (
    <div>
      <ComponentHeader
        name="FormError"
        description="Affiche les erreurs de validation du formulaire avec messages par champ et icône d'erreur"
        section="Form"
      />

      <SectionTitle>Types d'affichage</SectionTitle>
      <SubLabel>message seul · message + erreurs · erreurs multiples</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Message général</p>
            <FormError message="Veuillez corriger les erreurs ci-dessous" />
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Avec erreurs multi-champs</p>
            <FormError 
              message="Le formulaire contient des erreurs"
              errors={multiErrors}
            />
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Erreurs multiples pour un champ</p>
            <FormError 
              errors={arrayErrors}
            />
          </div>
        </div>
      </Preview>

      <SectionTitle>Filtrage par champ</SectionTitle>
      <SubLabel>fieldName pour afficher une erreur spécifique</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Erreur pour "email" uniquement</p>
            <FormError 
              fieldName="email"
              errors={multiErrors}
            />
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Erreur pour "password" uniquement</p>
            <FormError 
              fieldName="password"
              errors={multiErrors}
            />
          </div>
        </div>
      </Preview>

      <SectionTitle>Options d'affichage</SectionTitle>
      <SubLabel>avec icône (défaut) · sans icône</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Avec icône (défaut)</p>
            <FormError 
              message="Erreur de validation"
              errors={{ field: "Valeur invalide" }}
            />
          </div>
          
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>Sans icône</p>
            <FormError 
              message="Erreur de validation"
              errors={{ field: "Valeur invalide" }}
              showIcon={false}
            />
          </div>
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Validation de formulaire en temps réel</SectionTitle>
      <SubLabel>Erreurs affichées dynamiquement pendant la saisie</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <RealTimeValidationExample />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Erreurs serveur</SectionTitle>
      <SubLabel>Affichage des erreurs retournées par l'API</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <ServerErrorsExample />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Wizard multi-étapes</SectionTitle>
      <SubLabel>Erreurs résumées entre les étapes</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <WizardErrorsExample />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}

// Cas d'usage : Validation en temps réel
function RealTimeValidationExample() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Doit contenir une majuscule";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const hasErrors = Object.keys(errors).length > 0 && Object.values(touched).some(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {hasErrors && (
        <FormError 
          message="Veuillez corriger les erreurs suivantes"
          errors={errors}
        />
      )}
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="john@exemple.com"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: `1px solid ${errors.email && touched.email ? "var(--color-error)" : "var(--c-border)"}`,
              borderRadius: "var(--radius-md)",
              fontSize: "var(--fontsize-sm)"
            }}
          />
          {errors.email && touched.email && (
            <p style={{ fontSize: 12, color: "var(--color-error)", marginTop: 4 }}>{errors.email}</p>
          )}
        </div>

        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Mot de passe *
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onBlur={() => handleBlur("password")}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: `1px solid ${errors.password && touched.password ? "var(--color-error)" : "var(--c-border)"}`,
              borderRadius: "var(--radius-md)",
              fontSize: "var(--fontsize-sm)"
            }}
          />
          {errors.password && touched.password && (
            <p style={{ fontSize: 12, color: "var(--color-error)", marginTop: 4 }}>{errors.password}</p>
          )}
        </div>

        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Confirmer le mot de passe *
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: `1px solid ${errors.confirmPassword && touched.confirmPassword ? "var(--color-error)" : "var(--c-border)"}`,
              borderRadius: "var(--radius-md)",
              fontSize: "var(--fontsize-sm)"
            }}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p style={{ fontSize: 12, color: "var(--color-error)", marginTop: 4 }}>{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Cas d'usage : Erreurs serveur
function ServerErrorsExample() {
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulation d'une réponse API avec erreurs
    setTimeout(() => {
      setServerErrors({
        email: ["Cet email est déjà utilisé"],
        password: ["Ce mot de passe a été compromis dans une fuite de données"],
        username: ["Nom d'utilisateur déjà pris", "Choisissez un nom avec au moins 4 caractères"]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {Object.keys(serverErrors).length > 0 && (
        <FormError 
          message="Impossible de créer le compte. Veuillez corriger les erreurs suivantes :"
          errors={serverErrors}
        />
      )}
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="john@exemple.com"
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
            Nom d'utilisateur
          </label>
          <input
            type="text"
            placeholder="johndoe"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--fontsize-sm)"
            }}
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          isLoading={loading}
          fullWidth
        >
          Créer le compte
        </Button>
      </div>
    </div>
  );
}

// Cas d'usage : Wizard multi-étapes
function WizardErrorsExample() {
  const [step, setStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<Record<number, Record<string, string>>>({});

  const validateStep = (stepNum: number) => {
    const errors: Record<string, string> = {};
    
    if (stepNum === 1) {
      errors.email = "Email invalide";
      errors.password = "Mot de passe trop court";
    } else if (stepNum === 2) {
      errors.firstName = "Prénom requis";
      errors.lastName = "Nom requis";
    }
    
    setStepErrors({ ...stepErrors, [stepNum]: errors });
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: s <= step ? "var(--color-brand)" : "var(--c-border)"
            }}
          />
        ))}
      </div>

      {stepErrors[step] && Object.keys(stepErrors[step]).length > 0 && (
        <FormError 
          message={`Étape ${step} contient des erreurs`}
          errors={stepErrors[step]}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {step === 1 && (
          <>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="john@exemple.com"
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
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--fontsize-sm)"
                }}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                Prénom
              </label>
              <input
                type="text"
                placeholder="Jean"
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
                Nom
              </label>
              <input
                type="text"
                placeholder="Dupont"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--fontsize-sm)"
                }}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <p style={{ textAlign: "center", color: "var(--color-muted)", padding: 32 }}>
            ✅ Toutes les étapes sont validées !
          </p>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Précédent
            </Button>
          )}
          {step < 3 && (
            <Button onClick={nextStep}>
              Suivant
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
