import { db, IReceipt } from "@/models";

import IconButton from "@/components/IconButton";
import { ReactComponent as Star } from "@/assets/images/icons/star.svg";
import { ReactComponent as Starred } from "@/assets/images/icons/starred.svg";

interface InboxButtonStarProps {
  invNum: IReceipt["invNum"];
  starred: IReceipt["starred"];
}

export function InboxButtonStar({ invNum, starred }: InboxButtonStarProps) {
  return (
    <IconButton
      label={starred ? "移除星號" : "加上星號"}
      icon={
        starred ? (
          <Starred className="fill-blue-400 stroke-blue-400 dark:fill-current dark:stroke-current" />
        ) : (
          <Star />
        )
      }
      onClick={() => db.receipts.update(invNum, { starred: !starred })}
    />
  );
}
