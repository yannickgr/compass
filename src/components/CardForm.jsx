import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const CardForm = ({ title, setTitle, content, setContent, type, setType, onSubmit, onCancel }) => {
  const [cardTypes, setCardTypes] = useState([]);

  useEffect(() => {
    async function fetchCardTypes() {
      const { data, error } = await supabase.from('card_types').select('*').order('label');
      if (error) {
        console.error('Error fetching card types:', error);
      } else {
        setCardTypes(data);
      }
    }
    fetchCardTypes();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a type</option>
            {cardTypes.map(ct => (
              <option key={ct.id} value={ct.id}>
                {ct.label}
              </option>
            ))}
          </select>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;