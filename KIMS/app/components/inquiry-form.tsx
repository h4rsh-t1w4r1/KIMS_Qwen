"use client";
/**
 * Illustrative inquiry form for a fictional demo. Static export: there is no server, so this form
 * never sends data anywhere. The success state says exactly that. No fake booking confirmation.
 */
import { useState, type FormEvent } from "react";

type Status = "idle" | "error" | "demo";

export function InquiryForm() {
  const fields = useState<Status>("idle");
  const nameField = useState("");
  const noteField = useState("");
  const status = fields[0];
  const setStatus = fields[1];
  const name = nameField[0];
  const setName = nameField[1];
  const note = noteField[0];
  const setNote = noteField[1];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setStatus("error");
      return;
    }
    setStatus("demo");
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} aria-describedby="inquiry-truth">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-name" className="block font-mono text-xs uppercase tracking-[0.14em] text-quiet mb-2">
            Your name
          </label>
          <input
            id="inq-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="w-full border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-quiet/70 focus:border-gold"
            placeholder="Illustrative input"
          />
        </div>
        <div>
          <label htmlFor="inq-dept" className="block font-mono text-xs uppercase tracking-[0.14em] text-quiet mb-2">
            Department (illustrative)
          </label>
          <select
            id="inq-dept"
            name="department"
            className="w-full border border-line bg-canvas px-4 py-3 text-base text-ink focus:border-gold"
          >
            <option>General medicine</option>
            <option>Cardiology</option>
            <option>Orthopaedics</option>
            <option>Paediatrics</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="inq-note" className="block font-mono text-xs uppercase tracking-[0.14em] text-quiet mb-2">
          What would you like to ask?
        </label>
        <textarea
          id="inq-note"
          name="note"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-quiet/70 focus:border-gold"
          placeholder="Type a sample question"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="min-h-[48px] bg-gold px-8 py-3 font-mono text-sm uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Send sample request
        </button>
        <p id="inquiry-truth" className="max-w-[36ch] text-sm text-quiet">
          This demo site has no backend. Nothing is sent, stored, or booked.
        </p>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[2rem]">
        {status === "error" && (
          <p className="text-sm text-ink border-l-2 border-gold pl-4">
            Please enter a name with at least two characters before submitting.
          </p>
        )}
        {status === "demo" && (
          <p className="text-sm text-ink border-l-2 border-gold pl-4">
            Sample received by the page only. This fictional hospital cannot answer, because it does not exist.
          </p>
        )}
      </div>
    </form>
  );
}
