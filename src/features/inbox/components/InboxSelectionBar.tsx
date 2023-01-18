import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearChecked, setDeleting } from "../inboxSlice";

import DropdownMenu from "@/components/DropdownMenu";
import IconButton from "@/components/IconButton";
import { ReactComponent as IconClose } from "@/assets/images/icons/close.svg";
import { ReactComponent as IconDelete } from "@/assets/images/icons/delete.svg";

export function InboxSelectionBar() {
  const dispatch = useAppDispatch();
  const { checkedReceipts } = useAppSelector((state) => state.inbox);

  const menuItems = [
    {
      label: "刪除",
      icon: <IconDelete />,
      onClick: () => dispatch(setDeleting(checkedReceipts)),
    },
  ];

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <IconButton
          label="全部取消選取"
          icon={<IconClose />}
          onClick={() => dispatch(clearChecked())}
        />
        <span className="text-xl">已選取 {checkedReceipts.length} 張發票</span>
      </div>
      <DropdownMenu items={menuItems} icons />
    </div>
  );
}
