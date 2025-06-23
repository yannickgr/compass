

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function AuthForm({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error.message);
    } else {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    }
  };

  return (
    <form
      onSubmit={handleAuthSubmit}
      className="max-w-sm mx-auto bg-white p-4 mb-6 rounded shadow space-y-2"
    >
      <h2 className="text-lg font-semibold text-center">
        {isSignUp ? 'Sign Up' : 'Log In'}
      </h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSignUp ? 'Create Account' : 'Log In'}
      </button>
      <p
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-sm text-blue-600 text-center cursor-pointer hover:underline"
      >
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </p>
    </form>
  );
}

export default AuthForm;