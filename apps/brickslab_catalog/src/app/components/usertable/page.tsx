"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { UserTable } from "@brickslab./ui-web";

const props: PropDef[] = [
  { 
    name: "users", 
    type: "User[]", 
    required: true, 
    description: "Liste des utilisateurs à afficher dans le tableau. Chaque utilisateur doit avoir un id, username, email et password." 
  },
  { 
    name: "onEdit", 
    type: "(user: User) => void", 
    required: false, 
    description: "Callback déclenché lors du clic sur le bouton Edit. Reçoit l'utilisateur concerné." 
  },
  { 
    name: "onDelete", 
    type: "(user: User) => void", 
    required: false, 
    description: "Callback déclenché lors du clic sur le bouton Delete. Reçoit l'utilisateur concerné." 
  },
  { 
    name: "title", 
    type: "string", 
    required: false, 
    default: '"Utilisateurs"',
    description: "Titre affiché en haut du tableau." 
  },
];

const usageCode = `import { UserTable } from "@brickslab./ui-web";

const users = [
  { id: "1", username: "john_doe", email: "john@example.com", password: "••••••••" },
  { id: "2", username: "jane_smith", email: "jane@example.com", password: "••••••••" },
  { id: "3", username: "bob_wilson", email: "bob@example.com", password: "••••••••" },
];

<UserTable 
  users={users} 
  onEdit={(user) => console.log("Edit", user)}
  onDelete={(user) => console.log("Delete", user)}
/>`;

export default function UserTablePage() {
  const sampleUsers = [
    { id: "USR-001", username: "john_doe", email: "john.doe@example.com", password: "••••••••" },
    { id: "USR-002", username: "jane_smith", email: "jane.smith@example.com", password: "••••••••" },
    { id: "USR-003", username: "bob_wilson", email: "bob.wilson@example.com", password: "••••••••" },
  ];

  const handleEdit = (user: typeof sampleUsers[0]) => {
    alert(`Edit user: ${user.username}`);
  };

  const handleDelete = (user: typeof sampleUsers[0]) => {
    if (confirm(`Delete user: ${user.username}?`)) {
      alert(`Deleted: ${user.id}`);
    }
  };

  return (
    <div>
      <ComponentHeader
        name="UserTable"
        description="Tableau de liste des utilisateurs avec colonnes ID, Username, Email, Password et actions Edit/Delete. Utilisé dans les dashboards d'administration."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Tableau avec actions</SubLabel>
      <Preview>
        <UserTable 
          users={sampleUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Preview>

      <SubLabel>Tableau sans actions (lecture seule)</SubLabel>
      <Preview>
        <UserTable 
          users={sampleUsers}
          title="Utilisateurs (lecture seule)"
        />
      </Preview>

      <SubLabel>Tableau vide</SubLabel>
      <Preview>
        <UserTable 
          users={[]}
          title="Aucun utilisateur"
        />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      <SectionTitle>Types</SectionTitle>
      <CodeBlock 
        code={`export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type UserTableProps = {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  title?: string;
};`} 
        language="typescript" 
      />
    </div>
  );
}
