const SUPABASE_PUBLIC_URL = import.meta.env.VITE_SUPABASE_URL;

const CardItem = ({ card, cardTypes, onDelete }) => {
  const cardType = cardTypes.find(ct => ct.id === card.type);

  return (
    <div className="border-l-4 pl-4 border-blue-500 bg-blue-50 p-3 rounded">
      {card.image_path && (
        <img
          src={`${SUPABASE_PUBLIC_URL}/storage/v1/object/public/card-images/${card.image_path}`}
          alt="Card visual"
          className="mb-2 rounded max-h-48 object-cover w-full"
        />
      )}
      <h3 className="font-bold text-blue-800 flex items-center">
        {card.title}
        <button
          onClick={() => onDelete(card.id)}
          className="text-red-600 text-xs ml-2 hover:underline"
        >
          Delete
        </button>
      </h3>
      <p className="text-sm text-gray-700">{card.content}</p>
      <span className="text-xs uppercase text-blue-600 bg-blue-100 px-2 py-1 rounded mt-1 inline-block">
        {cardType ? cardType.label : 'Unknown'}
      </span>
    </div>
  );
};

export default CardItem;
