import { useAppDispatch } from "@/app/hooks";
import { setPickerIsOpen } from "../uploaderSlice";
import EmptyScreen from "@/components/EmptyScreen";

export function UploaderHint() {
  const dispatch = useAppDispatch();

  return (
    <EmptyScreen>
      <h2 className="text-xl">沒有發票</h2>
      <p className="text-gray-500">
        將財政部寄送的「消費發票彙整通知」郵件中的 .csv 附件拖放至此，或
        <button
          className="text-blue-600 hover:underline dark:text-blue-400"
          onClick={() => dispatch(setPickerIsOpen(true))}
        >
          選取要匯入的檔案
        </button>
      </p>
      <p>
        <a
          href="https://github.com/Lzmxya/paperrolls#faq"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          入門指南
        </a>
      </p>
    </EmptyScreen>
  );
}
