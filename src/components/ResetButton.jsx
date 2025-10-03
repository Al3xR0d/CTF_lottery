export default function ResetButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 text-sm border border-pink-400 rounded-md hover:bg-pink-400 hover:text-black neon transition-all"
      >
        Сбросить
      </button>
    );
  }
  