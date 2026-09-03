import { useState } from 'react';
import { serviceOptions } from '../../data/contact';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const EMPTY = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  website: '',
};

/**
 * Posts to the same /api/contact the server already validates, so the
 * field names here match its schema exactly. `website` is the honeypot
 * the controller checks — it is hidden from sight and from the tab
 * order, never with `display: none`, which some bots skip.
 */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', msg: '' });

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: 'sending', msg: '' });
    setErrors({});

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setState({ status: 'error', msg: 'Please check the fields above.' });
        return;
      }

      setForm(EMPTY);
      setState({ status: 'done', msg: data.message });
    } catch {
      setState({ status: 'error', msg: 'Could not reach the server.' });
    }
  }

  const sending = state.status === 'sending';

  return (
    <form className="cf" onSubmit={onSubmit} noValidate>
      <div className="cf__row">
        <Field
          id="cf-name"
          label="Your name"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="cf-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="cf__row">
        <Field
          id="cf-company"
          label="Company"
          value={form.company}
          onChange={set('company')}
          autoComplete="organization"
          optional
        />

        <div className="cf__field">
          <label className="label cf__label" htmlFor="cf-service">Service</label>
          <select
            id="cf-service"
            className="cf__input cf__select"
            value={form.service}
            onChange={set('service')}
          >
            <option value="">Choose a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cf__field">
        <label className="label cf__label" htmlFor="cf-message">
          About the project
        </label>
        <textarea
          id="cf-message"
          className="cf__input cf__area"
          rows={5}
          placeholder="What are you shooting, and when do you need it?"
          value={form.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="cf__error">{errors.message}</p>}
      </div>

      {/* Honeypot — off-screen, not display:none, and skipped by tab. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Leave this empty</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>

      <div className="cf__foot">
        <button type="submit" className="cf__submit" disabled={sending}>
          {sending ? 'Sending…' : 'Get a quote'}
        </button>

        <p
          className={`cf__msg cf__msg--${state.status}`}
          role="status"
          aria-live="polite"
        >
          {state.msg}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, optional, type = 'text', ...rest }) {
  return (
    <div className="cf__field">
      <label className="label cf__label" htmlFor={id}>
        {label}
        {optional && <span className="cf__optional"> — optional</span>}
      </label>
      <input
        id={id}
        type={type}
        className="cf__input"
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <p className="cf__error">{error}</p>}
    </div>
  );
}
