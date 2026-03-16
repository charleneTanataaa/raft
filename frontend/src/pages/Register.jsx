import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='pond-home w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className={`bg-white w-100 md:w-120 border border-[var(--pond-deep)] shadow-md p-10`}>
        <form onSubmit={handleSubmit} className="relative z-10 bg-white">
          <Link to="/" className={`text-sm text-[var(--pond-mid)] transition duration-300 hover:text-[var(--pond-deep)]`}>
            &#8592; Back
          </Link>
          <img src="" alt="logo" className="bg-blue-100 my-3 w-full h-40" />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <label htmlFor="email" className="form-label">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            className="block mb-3 form-input w-full px-2 py-1 border border-[var(--pond-surface)] focus:outline-none" />

          <label htmlFor="password" className="form-label">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="block mb-3 form-input w-full px-2 py-1 border border-[var(--pond-surface)] focus:outline-none" />

          <label htmlFor="confirm" className="form-label">Confirm Password</label>
          <input
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className="block mb-3 form-input w-full px-2 py-1 border border-[var(--pond-surface)] focus:outline-none" />

          <button
            type="submit"
            disabled={loading}
            className={`mb-4 text-white py-1 bg-[var(--pond-mid)] hover:bg-[var(--pond-deep)] block w-full transition duration-300`}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className={`underline text-[var(--pond-mid)] hover:text-[var(--pond-deep)] transition duration-300`}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}