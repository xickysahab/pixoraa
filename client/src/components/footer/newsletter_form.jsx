import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: 'sending', msg: '' });

    try {
      const res = await fetch(`${API}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setState({
          status: 'error',
          msg: data.errors?.email || 'Something went wrong.',
        });
        return;
      }

      setState({ status: 'done', msg: data.message });
      setEmail('');
    } catch {
      setState({ status: 'error', msg: 'Could not reach the server.' });
    }
  }

  return (
    <form className="foot__news" onSubmit={onSubmit} noValidate>
      <p className="label foot__col-label">Newsletter</p>

      <div className="foot__field">
        <label htmlFor="foot-email" className="visually-hidden">
          Email address
        </label>
        <input
          id="foot-email"
          type="email"
          className="foot__input"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state.status === 'error'}
          aria-describedby="foot-news-msg"
          required
        />
        <button
          type="submit"
          className="foot__submit"
          disabled={state.status === 'sending'}
        >
          {state.status === 'sending' ? '…' : 'Join'}
        </button>
      </div>

      <p
        id="foot-news-msg"
        className={`foot__msg foot__msg--${state.status}`}
        role="status"
        aria-live="polite"
      >
        {state.msg}
      </p>
    </form>
  );
}
