"use client";
import { useState } from "react";
import { 
  FormGroup, 
  Input, 
  Select,
  Textarea,
  Checkbox,
  Radio,
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
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Le composant de champ (Input, Select, Textarea, etc.)",
  },
  {
    name: "label",
    type: "string",
    description: "Texte du label affiché au-dessus du champ",
  },
  {
    name: "helperText",
    type: "string",
    description: "Texte d'aide affiché en dessous du champ",
  },
  {
    name: "errorText",
    type: "string",
    description: "Message d'erreur affiché en rouge quand le champ a une erreur",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Affiche un indicateur de champ obligatoire (*)",
  },
  {
    name: "layout",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Remplace le layout du Form parent pour ce groupe",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Classes CSS supplémentaires",
  },
  {
    name: "id",
    type: "string",
    description: "ID personnalisé pour le groupe",
  },
];

const usageCode = `import { FormGroup, Input, Select, Textarea } from "@brickslab./ui-web";

// Champ simple avec label
<FormGroup label="Email">
  <Input value={email} onChange={setEmail} />
</FormGroup>

// Champ obligatoire avec texte d'aide
<FormGroup 
  label="Mot de passe" 
  required
  helperText="Minimum 8 caractères"
>
  <Input value={password} onChange={setPassword} type="password" />
</FormGroup>

// Champ avec erreur
<FormGroup 
  label="Email" 
  errorText="Email invalide"
>
  <Input value={email} onChange={setEmail} />
</FormGroup>

// Champ avec Select
<FormGroup label="Rôle" required>
  <Select
    value={role}
    onChange={setRole}
    options={[
      { value: "admin", label: "Admin" },
      { value: "user", label: "Utilisateur" }
    ]}
  />
</FormGroup>`;

export default function FormGroupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [agree, setAgree] = useState(false);
  const [plan, setPlan] = useState("free");

  return (
    <div>
      <ComponentHeader
        name="FormGroup"
        description="Regroupe un champ de formulaire avec son label, texte d'aide et message d'erreur"
        section="Form"
      />

      <SectionTitle>États du champ</SectionTitle>
      <SubLabel>normal · avec aide · avec erreur · obligatoire</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 500 }}>
          <FormGroup label="Champ simple">
            <Input value="valeur" onChange={() => {}} readOnly />
          </FormGroup>
          
          <FormGroup label="Avec texte d'aide" helperText="Ceci est un texte d'aide">
            <Input value="valeur" onChange={() => {}} readOnly />
          </FormGroup>
          
          <FormGroup label="Champ obligatoire" required>
            <Input value="valeur" onChange={() => {}} readOnly />
          </FormGroup>
          
          <FormGroup label="Avec erreur" errorText="Ce champ est requis">
            <Input value="" onChange={() => {}} />
          </FormGroup>
        </div>
      </Preview>

      <SectionTitle>Types de champs supportés</SectionTitle>
      <SubLabel>Input · Select · Textarea · Checkbox · Radio</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 500 }}>
          <FormGroup label="Email" required helperText="Format: exemple@domaine.com">
            <Input 
              value={email} 
              onChange={setEmail} 
              type="email" 
              placeholder="john@exemple.com"
            />
          </FormGroup>

          <FormGroup label="Rôle" required>
            <Select
              value={role}
              onChange={setRole}
              options={[
                { value: "", label: "Sélectionnez un rôle" },
                { value: "admin", label: "Administrateur" },
                { value: "editor", label: "Éditeur" },
                { value: "viewer", label: "Lecteur" }
              ]}
            />
          </FormGroup>

          <FormGroup label="Biographie" helperText="Maximum 500 caractères">
            <Textarea
              value={bio}
              onChange={setBio}
              placeholder="Parlez-nous de vous..."
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <Checkbox 
              checked={agree} 
              onChange={setAgree}
              label="J'accepte les conditions d'utilisation"
            />
          </FormGroup>

          <FormGroup label="Plan choisi">
            <div style={{ display: "flex", gap: 16 }}>
              <Radio value="free" checked={plan === "free"} onChange={() => setPlan("free")} label="Gratuit" />
              <Radio value="pro" checked={plan === "pro"} onChange={() => setPlan("pro")} label="Pro" />
              <Radio value="enterprise" checked={plan === "enterprise"} onChange={() => setPlan("enterprise")} label="Entreprise" />
            </div>
          </FormGroup>
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Profil utilisateur</SectionTitle>
      <SubLabel>Formulaire de profil avec validation en temps réel</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 500 }}>
          <UserProfileForm />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Feedback avec validation</SectionTitle>
      <SubLabel>Validation interactive avec messages d'erreur dynamiques</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 500 }}>
          <FeedbackForm />
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Paramètres de notification</SectionTitle>
      <SubLabel>Préférences avec différents types de champs</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 500 }}>
          <NotificationSettings />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}

// Cas d'usage : Profil utilisateur
function UserProfileForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    website: "",
    bio: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (field === "username") {
      if (!value) newErrors.username = "Le nom d'utilisateur est requis";
      else if (value.length < 3) newErrors.username = "Minimum 3 caractères";
      else delete newErrors.username;
    }
    
    if (field === "email") {
      if (!value) newErrors.email = "L'email est requis";
      else if (!value.includes("@")) newErrors.email = "Email invalide";
      else delete newErrors.email;
    }
    
    if (field === "website" && value && !value.startsWith("http")) {
      newErrors.website = "Doit commencer par http:// ou https://";
    } else if (field === "website") {
      delete newErrors.website;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    validate(field, value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <FormGroup 
        label="Nom d'utilisateur" 
        required
        errorText={errors.username}
        helperText="Visible par les autres utilisateurs"
      >
        <Input 
          value={formData.username} 
          onChange={(val) => handleChange("username", val)}
          placeholder="johndoe"
        />
      </FormGroup>

      <FormGroup 
        label="Email" 
        required
        errorText={errors.email}
      >
        <Input 
          value={formData.email} 
          onChange={(val) => handleChange("email", val)}
          type="email"
          placeholder="john@exemple.com"
        />
      </FormGroup>

      <FormGroup 
        label="Site web"
        errorText={errors.website}
        helperText="Optionnel"
      >
        <Input 
          value={formData.website} 
          onChange={(val) => handleChange("website", val)}
          placeholder="https://monsite.com"
        />
      </FormGroup>

      <FormGroup label="Bio" helperText="Parlez-nous de vous (max 200 caractères)">
        <Textarea
          value={formData.bio}
          onChange={(val) => setFormData({ ...formData, bio: val })}
          placeholder="Décrivez votre expérience..."
          rows={3}
        />
      </FormGroup>
    </div>
  );
}

// Cas d'usage : Feedback avec validation
function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const emailError = !email.includes("@") && email.length > 0;
  const subjectError = !subject;
  const messageError = message.length > 0 && message.length < 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <FormGroup 
        label="Email" 
        required
        errorText={emailError ? "Email invalide" : undefined}
      >
        <Input 
          value={email} 
          onChange={setEmail}
          type="email"
          placeholder="votre@email.com"
        />
      </FormGroup>

      <FormGroup 
        label="Sujet" 
        required
        errorText={subjectError ? "Veuillez choisir un sujet" : undefined}
      >
        <Select
          value={subject}
          onChange={setSubject}
          options={[
            { value: "", label: "Choisissez un sujet" },
            { value: "bug", label: "Signaler un bug" },
            { value: "feature", label: "Suggestion d'amélioration" },
            { value: "other", label: "Autre" }
          ]}
        />
      </FormGroup>

      <FormGroup 
        label="Message" 
        required
        errorText={messageError ? "Minimum 10 caractères" : undefined}
        helperText={`${message.length}/500 caractères`}
      >
        <Textarea
          value={message}
          onChange={setMessage}
          placeholder="Décrivez votre retour..."
          rows={4}
        />
      </FormGroup>
    </div>
  );
}

// Cas d'usage : Paramètres de notification
function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);
  const [frequency, setFrequency] = useState("instant");
  const [phone, setPhone] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <FormGroup label="Canaux de notification">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Checkbox 
            checked={emailNotif} 
            onChange={setEmailNotif}
            label="Notifications par email"
          />
          <Checkbox 
            checked={pushNotif} 
            onChange={setPushNotif}
            label="Notifications push"
          />
          <Checkbox 
            checked={smsNotif} 
            onChange={setSmsNotif}
            label="Notifications SMS"
          />
        </div>
      </FormGroup>

      <FormGroup 
        label="Fréquence des emails"
        helperText="Choisissez la fréquence de réception"
      >
        <Select
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "instant", label: "Instantanée" },
            { value: "daily", label: "Récapitulatif quotidien" },
            { value: "weekly", label: "Récapitulatif hebdomadaire" }
          ]}
        />
      </FormGroup>

      {smsNotif && (
        <FormGroup 
          label="Numéro de téléphone"
          required
          helperText="Format: +33 6 12 34 56 78"
        >
          <Input 
            value={phone} 
            onChange={setPhone}
            placeholder="+33 6 12 34 56 78"
          />
        </FormGroup>
      )}
    </div>
  );
}
