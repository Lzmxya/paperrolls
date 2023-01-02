import { useAppDispatch } from "@/app/hooks";
import { setPickerIsOpen } from "@/features/uploader";

export default function FloatingActionButton() {
  const dispatch = useAppDispatch();

  return (
    <button
      title="新增發票"
      onClick={() => dispatch(setPickerIsOpen(true))}
      className="h-14 w-14 rounded-2xl bg-blue-300 p-4 hover:bg-blue-400 hover:shadow-lg dark:bg-blue-300/50 dark:hover:bg-blue-200/50"
    >
      +
    </button>
  );
}
