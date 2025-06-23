import { useEffect, useState } from 'react'
import { fetchCards, insertCard, removeCard } from './lib/cardService'
import CardForm from './components/CardForm'
import CardItem from './components/CardItem';
import { supabase } from './lib/supabaseClient';
import AuthForm from './components/AuthForm';

function App() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (err) {
        console.error(err);
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    loadCards();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const addCard = async (e) => {
    e.preventDefault();
    const newCard = { title, content, type };
    try {
      const data = await insertCard(newCard);
      setCards(prev => [...prev, ...data]);
      setTitle('');
      setContent('');
      setType('');
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCard = async (id) => {
    try {
      await removeCard(id);
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!user ? (
        <AuthForm setUser={setUser} />
      ) : (
        <>
          <div className="text-center mb-4">
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-red-600 underline"
            >
              Log out
            </button>
            <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
          </div>

          <header className="text-3xl font-bold text-center text-blue-700 mb-8">
            🧭 Compass (test)
          </header>

          <button onClick={() => setShowModal(true)} className="block mx-auto mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Card
          </button>

          {showModal && (
            <CardForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              type={type}
              setType={setType}
              onSubmit={addCard}
              onCancel={() => setShowModal(false)}
            />
          )}

          <main className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Domain: yoooo</h2>
            <div className="space-y-4">
              {cards.map(card => (
                <CardItem key={card.id} card={card} onDelete={deleteCard} />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;