import React, { useState } from 'react';
import Modal from './components/Modal';
import CardForm from './components/CardForm';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const addCard = () => {
    // Add card logic
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Card</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
        </Modal>
      )}
    </div>
  );
}

export default App;
