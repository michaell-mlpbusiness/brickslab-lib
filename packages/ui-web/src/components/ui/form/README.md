# Form Components

A set of components for building forms with consistent styling, validation feedback, and layout options.

## Components

### Form

Container component for forms with variant and layout options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Form content (FormGroup, FormActions, etc.) |
| `variant` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Controls spacing between form fields |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Label positioning layout |
| `onSubmit` | `(e: React.FormEvent<HTMLFormElement>) => void` | - | Form submission handler (prevents default) |
| `onValidationErrors` | `(errors: Record<string, string>) => void` | - | Callback for validation errors |
| `className` | `string` | `''` | Additional CSS classes |

#### Example

```tsx
import { Form, FormGroup, Input, Button, FormActions } from '@brickslab/ui-web';

function MyForm() {
  const handleSubmit = (e) => {
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit} variant="default" layout="vertical">
      <FormGroup label="Email" helperText="Enter your email address">
        <Input value={email} onChange={setEmail} type="email" />
      </FormGroup>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  );
}
```

---

### FormGroup

Groups a form field with its label, helper text, and error message.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The form field component (Input, Select, etc.) |
| `label` | `string` | - | Field label text |
| `helperText` | `string` | - | Helper/description text shown below the field |
| `errorText` | `string` | - | Error message shown in red when field has error |
| `required` | `boolean` | `false` | Shows required indicator (*) next to label |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Overrides parent Form layout |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Custom ID for the group |

#### Example

```tsx
<FormGroup 
  label="Username" 
  helperText="Choose a unique username"
  errorText={errors.username}
  required
>
  <Input value={username} onChange={setUsername} />
</FormGroup>
```

---

### FormError

Displays form-level validation errors with optional field-level details.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | - | General error message at the top |
| `errors` | `Record<string, string \| string[]>` | - | Object mapping field names to error messages |
| `fieldName` | `string` | - | Filter errors to specific field (optional) |
| `showIcon` | `boolean` | `true` | Show error icon |
| `className` | `string` | `''` | Additional CSS classes |

#### Example

```tsx
// General form errors
<FormError 
  message="Please fix the following errors:"
  errors={{
    email: "Invalid email address",
    password: "Password must be at least 8 characters"
  }}
/>

// Single field error
<FormError 
  fieldName="email"
  errors={{ email: "This field is required" }}
/>
```

---

### FormActions

Container for form action buttons with alignment options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Action buttons |
| `align` | `'left' \| 'center' \| 'right' \| 'between'` | `'right'` | Button alignment |
| `stacked` | `boolean` | `false` | Stack buttons vertically |
| `className` | `string` | `''` | Additional CSS classes |

#### Example

```tsx
// Right-aligned (default)
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button type="submit">Save</Button>
</FormActions>

// Space between
<FormActions align="between">
  <Button variant="secondary">Delete</Button>
  <div className="flex gap-2">
    <Button variant="outline">Draft</Button>
    <Button type="submit">Publish</Button>
  </div>
</FormActions>

// Stacked mobile layout
<FormActions stacked>
  <Button type="submit" fullWidth>Save Changes</Button>
  <Button variant="secondary" fullWidth>Cancel</Button>
</FormActions>
```

---

## Complete Example

```tsx
import { useState } from 'react';
import { 
  Form, 
  FormGroup, 
  FormError, 
  FormActions,
  Input, 
  Select, 
  Textarea,
  Button 
} from '@brickslab/ui-web';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} variant="default">
      {Object.keys(errors).length > 0 && (
        <FormError 
          message="Please fix the errors below"
          errors={errors}
        />
      )}

      <FormGroup 
        label="Full Name" 
        required
        errorText={errors.name}
      >
        <Input 
          value={formData.name} 
          onChange={(val) => setFormData({...formData, name: val})}
          placeholder="John Doe"
        />
      </FormGroup>

      <FormGroup 
        label="Email" 
        helperText="We'll never share your email"
        required
        errorText={errors.email}
      >
        <Input 
          value={formData.email} 
          onChange={(val) => setFormData({...formData, email: val})}
          type="email"
          placeholder="john@example.com"
        />
      </FormGroup>

      <FormGroup 
        label="Role" 
        required
        errorText={errors.role}
      >
        <Select
          value={formData.role}
          onChange={(val) => setFormData({...formData, role: val})}
          options={[
            { value: '', label: 'Select a role' },
            { value: 'admin', label: 'Administrator' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' }
          ]}
        />
      </FormGroup>

      <FormGroup 
        label="Bio" 
        helperText="Tell us about yourself"
      >
        <Textarea
          value={formData.bio}
          onChange={(val) => setFormData({...formData, bio: val})}
          placeholder="Write your bio here..."
          rows={4}
        />
      </FormGroup>

      <FormActions align="right">
        <Button variant="secondary">Reset</Button>
        <Button type="submit">Register</Button>
      </FormActions>
    </Form>
  );
}
```

---

## Layout Variants

### Vertical Layout (Default)

Labels appear above form fields.

```
Full Name *
[____________]

Email *
[____________]
```

### Horizontal Layout

Labels appear to the left of form fields (200px fixed width).

```
Full Name *    [____________]
Email *        [____________]
```

---

## Styling

All Form components use CSS custom properties from your theme:

- `--space-*` for spacing
- `--color-error` for error states
- `--color-muted` for helper text
- `--fontsize-*` for typography
- `--radius-*` for border radius

Override these in your CSS to customize the appearance.
