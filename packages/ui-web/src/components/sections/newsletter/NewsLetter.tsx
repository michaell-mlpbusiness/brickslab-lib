import React from "react";
import { NewsLetterProps, NewsLetterStatus } from "./NewsLetter.type";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = `
  .bl-newsletter { box-sizing: border-box; }

  .bl-newsletter__header { margin-bottom: var(--space-3); }

  .bl-newsletter__title {
    margin: 0 0 var(--space-1) 0;
    font-size: var(--fontsize-medium);
    font-weight: var(--fontweight-semibold);
    color: var(--color-fg);
    line-height: 1.3;
  }

  .bl-newsletter__description {
    margin: 0;
    font-size: var(--fontsize-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  /* Layout inline : input + bouton sur la même ligne */
  .bl-newsletter__row--inline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }
  .bl-newsletter__row--inline .bl-newsletter__input-wrap {
    flex: 1;
    min-width: 0;
  }

  /* Layout stacked : colonne */
  .bl-newsletter__row--stacked {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  /*
   * Statut final (error | success) :
   * On force toujours une colonne pour intercaler le message
   * entre l'input et le bouton, quel que soit le layout initial.
   */
  .bl-newsletter__row--status-final {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  /* Bague visuelle success autour du wrapper d'input */
  .bl-newsletter__input-success-ring {
    border-radius: var(--radius-sm);
    box-shadow: 0 0 0 1.5px var(--color-success, #16a34a);
  }

  /* Message intercalé entre input et bouton */
  .bl-newsletter__status-message {
    margin: 0;
    font-size: var(--fontsize-xs);
    line-height: 1.5;
    padding: var(--space-1) 0;
  }
  .bl-newsletter__status-message--error {
    color: var(--color-error);
  }
  .bl-newsletter__status-message--success {
    color: var(--color-success, #16a34a);
  }

  /* Erreur de validation (mode inline, hors statut final) */
  .bl-newsletter__validation-error {
    width: 100%;
    order: 10;
    margin: 0;
    font-size: var(--fontsize-xs);
    color: var(--color-error);
    line-height: 1.4;
  }

  /* Responsive : inline -> stacked sous 480px */
  @media (max-width: 480px) {
    .bl-newsletter__row--inline {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function NewsLetter({
  onSubmit,
  title,
  description,
  placeholder = "votre@email.com",
  buttonLabel = "S'inscrire",
  successMessage = "Merci, vous êtes inscrit !",
  status: externalStatus,
  errorText: externalError,
  layout = "inline",
  size = "md",
  fullWidth = false,
  buttonVariant = "primary",
  value: controlledValue,
  onChange: controlledOnChange,
  style,
  className,
}: NewsLetterProps) {
  // -- État interne ----------------------------------------------------------
  const [internalEmail, setInternalEmail] = React.useState("");
  const [internalStatus, setInternalStatus] = React.useState<NewsLetterStatus>("idle");
  const [validationError, setValidationError] = React.useState<string | undefined>();

  const email = controlledValue ?? internalEmail;
  const setEmail = controlledOnChange ?? setInternalEmail;
  const status = externalStatus ?? internalStatus;

  const isLoading = status === "loading";

  // Statut final = l'utilisateur ne peut plus interagir avant reset ou rechargement
  const isStatusFinal = status === "success" || status === "error";

  // Message à afficher entre input et bouton en statut final
  const finalMessage: string | undefined =
    status === "success"
      ? successMessage
      : externalError ?? (status === "error" ? "Une erreur est survenue, réessayez." : undefined);

  // Erreur de validation (uniquement hors statut final, pour le mode inline)
  const inlineValidationError =
    !isStatusFinal && layout === "inline" ? validationError : undefined;

  // Erreur passée à l'Input en mode stacked (affichée sous l'input)
  const inputErrorText =
    !isStatusFinal && layout === "stacked" ? validationError : undefined;

  // -- Ids a11y --------------------------------------------------------------
  const descriptionId = React.useId();
  const liveRegionId = React.useId();
  const statusMsgId = React.useId();

  // -- Handlers --------------------------------------------------------------
  const handleChange = (val: string) => {
    setEmail(val);
    if (validationError) setValidationError(undefined);
  };

  const handleSubmit = async () => {
    if (isStatusFinal || isLoading) return;

    setValidationError(undefined);

    if (!isValidEmail(email)) {
      setValidationError("Adresse email invalide.");
      return;
    }

    if (externalStatus !== undefined) {
      await onSubmit(email.trim());
      return;
    }

    setInternalStatus("loading");
    try {
      await onSubmit(email.trim());
      setInternalStatus("success");
      // On conserve l'email affiché en lecture seule — ne pas reset
    } catch {
      setInternalStatus("error");
    }
  };

  // -- Classes de layout -----------------------------------------------------
  // Statut final force toujours la colonne pour intercaler le message
  const rowClass = isStatusFinal
    ? "bl-newsletter__row--status-final"
    : layout === "inline"
    ? "bl-newsletter__row--inline"
    : "bl-newsletter__row--stacked";

  // Classe du wrapper input pour la bague success
  const inputWrapClass = [
    layout === "inline" && !isStatusFinal ? "bl-newsletter__input-wrap" : undefined,
    status === "success" ? "bl-newsletter__input-success-ring" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>{styles}</style>

      <div
        className={["bl-newsletter", className].filter(Boolean).join(" ")}
        style={{ width: fullWidth ? "100%" : undefined, ...style }}
        role="region"
        aria-label="Inscription à la newsletter"
      >
        {/* En-tête */}
        {(title || description) && (
          <div className="bl-newsletter__header">
            {title && (
              <p className="bl-newsletter__title" role="heading" aria-level={2}>
                {title}
              </p>
            )}
            {description && (
              <p className="bl-newsletter__description" id={descriptionId}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Zone live pour lecteurs d'écran */}
        <div
          id={liveRegionId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
          }}
        >
          {finalMessage ?? validationError ?? ""}
        </div>

        {/* Formulaire — toujours affiché, y compris en statut final */}
        <div
          className={rowClass}
          aria-describedby={description ? descriptionId : undefined}
        >
          {/* Input — statique en statut final */}
          <div className={inputWrapClass || undefined}>
            <Input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder={placeholder}
              size={size}
              fullWidth
              // Bordure rouge sans texte sous l'input : hasError découplé
              anyError={status === "error"}
              // Texte d'erreur uniquement en mode stacked hors statut final
              errorText={inputErrorText}
              // Lecture seule en statut final (pas disabled pour rester sélectionnable)
              readOnly={isStatusFinal}
              disabled={isLoading}
              required
              aria-label="Adresse email"
              aria-describedby={isStatusFinal ? statusMsgId : undefined}
              aria-invalid={status === "error" || Boolean(validationError) ? "true" : undefined}
            />
          </div>

          {/* Message intercalé entre input et bouton (statut final uniquement) */}
          {isStatusFinal && finalMessage && (
            <p
              id={statusMsgId}
              className={[
                "bl-newsletter__status-message",
                status === "error"
                  ? "bl-newsletter__status-message--error"
                  : "bl-newsletter__status-message--success",
              ].join(" ")}
              role="alert"
            >
              {finalMessage}
            </p>
          )}

          {/* Bouton */}
          <Button
            variant={buttonVariant}
            size={size}
            isLoading={isLoading}
            disabled={isStatusFinal || isLoading}
            onClick={handleSubmit}
            type="submit"
            fullWidth={isStatusFinal || layout === "stacked"}
            style={{ flexShrink: 0 }}
            aria-label={isLoading ? "Inscription en cours…" : buttonLabel}
          >
            {buttonLabel}
          </Button>

          {/* Erreur de validation inline (hors statut final) */}
          {inlineValidationError && (
            <p className="bl-newsletter__validation-error" role="alert">
              {inlineValidationError}
            </p>
          )}
        </div>
      </div>
    </>
  );
}