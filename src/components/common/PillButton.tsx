type PillButton = {
  handleAction: () => void;
  action: string;
}

export function PillButton({ handleAction, action }: PillButton) {
  return (
    <button
      type="button"
      onClick={handleAction}
      className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      {action}
    </button>
  )
}