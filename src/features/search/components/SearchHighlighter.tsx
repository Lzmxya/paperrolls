import Highlighter from "react-highlight-words";
import { useAppSelector } from "@/app/hooks";

interface SearchHighlighterProps {
  content: string;
}

export function SearchHighlighter({ content }: SearchHighlighterProps) {
  const { terms } = useAppSelector((state) => state.search);

  return (
    <Highlighter
      searchWords={terms}
      autoEscape={true}
      textToHighlight={content}
    />
  );
}
