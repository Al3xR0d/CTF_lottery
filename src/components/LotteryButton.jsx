export default function LotteryButton({ onClick, disabled }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-6 py-3 text-lg border-2 border-green-400 rounded-md hover:bg-green-400 hover:text-black neon transition-all disabled:opacity-50"
      >
        Жеребьевка
      </button>
    );
  }
  