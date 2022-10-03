import Highlighter from "react-highlight-words";
import { useAppSelector } from "@/app/hooks";

interface SearchHighlighterProps {
  content: string;
}

export function SearchHighlighter({ content }: SearchHighlighterProps) {
  const { keywords } = useAppSelector((state) => state.search);

  return (
    <Highlighter
      searchWords={keywords}
      autoEscape={true}
      textToHighlight={content}
    />
  );
}
