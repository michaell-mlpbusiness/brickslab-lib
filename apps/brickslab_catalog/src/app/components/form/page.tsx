"use client";
import { useState } from "react";
import { 
  Form, 
  FormGroup, 
  Input, 
  Button, 
  FormActions,
  Select,
  Textarea,
  Checkbox,
  FormError
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
    description: "Contenu du formulaire (FormGroup, FormActions, etc.)",
  },
  {
    name: "variant",
    type: '"default" | "compact" | "spacious"',
    default: '"default"',
    description: "Contrôle l'espacement entre les champs du formulaire",
  },
  {
    name: "layout",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Disposition des labels par rapport aux champs",
  },
  {
    name: "onSubmit",
    type: "(e: React.FormEvent<HTMLFormElement>) => void",
    description: "Gestionnaire de soumission (preventDefault automatique)",
  },
  {
    name: "onValidationErrors",
    type: "(errors: Record<string, string>) => void",
    description: "Callback appelé en cas d'erreurs de validation",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Classes CSS supplémentaires",
  },
];

const usageCode = `import { Form, FormGroup, Input, Button, FormActions } from "@brickslab./ui-web";

// Formulaire simple
<Form onSubmit={handleSubmit} variant="default">
  <FormGroup label="Email" required>
    <Input value={email} onChange={setEmail} type="email" />
  </FormGroup>
  <FormActions>
    <Button variant="secondary">Annuler</Button>
    <Button type="submit">Envoyer</Button>
  </FormActions>
</Form>

// Formulaire horizontal
<Form layout="horizontal" variant="spacious">
  <FormGroup label="Nom" required>
    <Input value={name} onChange={setName} />
  </FormGroup>
  <FormActions>
    <Button type="submit">Enregistrer</Button>
  </FormActions>
</Form>`;

export default function FormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <div>
      <ComponentHeader
        name="Form"
        description="Conteneur de formulaire avec options de validation, variantes de spacing et dispositions"
        section="Form"
      />

      <SectionTitle>Variantes de spacing</SectionTitle>
      <SubLabel>default · compact · spacious</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>default</p>
            <Form variant="default" style={{ border: "1px dashed var(--c-border)", padding: 16, borderRadius: 8 }}>
              <FormGroup label="Champ 1">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
              <FormGroup label="Champ 2">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
            </Form>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>compact</p>
            <Form variant="compact" style={{ border: "1px dashed var(--c-border)", padding: 16, borderRadius: 8 }}>
              <FormGroup label="Champ 1">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
              <FormGroup label="Champ 2">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
            </Form>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>spacious</p>
            <Form variant="spacious" style={{ border: "1px dashed var(--c-border)", padding: 16, borderRadius: 8 }}>
              <FormGroup label="Champ 1">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
              <FormGroup label="Champ 2">
                <Input value="valeur" onChange={() => {}} readOnly />
              </FormGroup>
            </Form>
          </div>
        </div>
      </Preview>

      <SectionTitle>Dispositions</SectionTitle>
      <SubLabel>vertical (défaut) · horizontal</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>vertical</p>
            <Form layout="vertical">
              <FormGroup label="Email">
                <Input value={email} onChange={setEmail} placeholder="email@exemple.com" />
              </FormGroup>
              <FormGroup label="Mot de passe">
                <Input value={password} onChange={setPassword} type="password" placeholder="••••••••" />
              </FormGroup>
            </Form>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 8 }}>horizontal</p>
            <Form layout="horizontal">
              <FormGroup label="Email">
                <Input value={email} onChange={setEmail} placeholder="email@exemple.com" />
              </FormGroup>
              <FormGroup label="Mot de passe">
                <Input value={password} onChange={setPassword} type="password" placeholder="••••••••" />
              </FormGroup>
            </Form>
          </div>
        </div>
      </Preview>

      <SectionTitle>Cas d'usage : Connexion</SectionTitle>
      <SubLabel>Formulaire simple avec validation</SubLabel>
      <Preview>
        <Form 
          onSubmit={() => console.log("Login:", { email, password })}
          variant="default"
          style={{ width: "100%", maxWidth: 400 }}
        >
          <FormGroup label="Email" required errorText={!email ? "L'email est requis" : undefined}>
            <Input 
              value={email} 
              onChange={setEmail} 
              type="email" 
              placeholder="john@exemple.com"
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
              }
            />
          </FormGroup>
          <FormGroup label="Mot de passe" required errorText={!password ? "Le mot de passe est requis" : undefined}>
            <Input 
              value={password} 
              onChange={setPassword} 
              type="password" 
              placeholder="••••••••"
            />
          </FormGroup>
          <FormGroup>
            <Checkbox 
              checked={agree} 
              onChange={setAgree}
              label="Se souvenir de moi"
            />
          </FormGroup>
          <FormActions align="right">
            <Button variant="ghost">Mot de passe oublié ?</Button>
            <Button type="submit" variant="primary">Se connecter</Button>
          </FormActions>
        </Form>
      </Preview>

      <SectionTitle>Cas d'usage : Inscription</SectionTitle>
      <SubLabel>Formulaire multi-champs avec différents types d'inputs</SubLabel>
      <Preview>
        <Form 
          onSubmit={() => console.log("Register:", { name, email, role, bio })}
          variant="default"
          style={{ width: "100%" }}
        >
          <FormGroup label="Nom complet" required errorText={!name ? "Le nom est requis" : undefined}>
            <Input 
              value={name} 
              onChange={setName} 
              placeholder="Jean Dupont"
            />
          </FormGroup>
          <FormGroup label="Email" required helperText="Nous ne partagerons jamais votre email">
            <Input 
              value={email} 
              onChange={setEmail} 
              type="email" 
              placeholder="jean@exemple.com"
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
          <FormGroup label="Bio" helperText="Parlez-nous de vous">
            <Textarea
              value={bio}
              onChange={setBio}
              placeholder="Écrivez votre bio ici..."
              rows={4}
            />
          </FormGroup>
          <FormActions align="between">
            <Button variant="secondary">Réinitialiser</Button>
            <Button type="submit">S'inscrire</Button>
          </FormActions>
        </Form>
      </Preview>

      <SectionTitle>Cas d'usage : Paramètres</SectionTitle>
      <SubLabel>Formulaire horizontal pour paramètres utilisateur</SubLabel>
      <Preview>
        <Form 
          layout="horizontal"
          onSubmit={() => console.log("Settings:", { name, email })}
          variant="default"
          style={{ width: "100%" }}
        >
          <FormGroup label="Nom d'utilisateur">
            <Input value={name} onChange={setName} placeholder="jdupont" />
          </FormGroup>
          <FormGroup label="Email de notification">
            <Input value={email} onChange={setEmail} type="email" placeholder="notifications@exemple.com" />
          </FormGroup>
          <FormGroup label="Langue">
            <Select
              value="fr"
              onChange={() => {}}
              options={[
                { value: "fr", label: "Français" },
                { value: "en", label: "English" },
                { value: "es", label: "Español" }
              ]}
            />
          </FormGroup>
          <FormActions>
            <Button variant="secondary">Annuler</Button>
            <Button type="submit">Enregistrer les modifications</Button>
          </FormActions>
        </Form>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
