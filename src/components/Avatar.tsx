interface AvatarProps {
  className?: string;
  name: string;
}

/**
 * See {@link https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j}.
 */
const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};
const generateColorHslFromString = (str: string) => {
  // getHashOfString
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  // generateHSL
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, 45, 55);
  const l = normalizeHash(hash, 45, 55);

  // HSLtoString
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const Avatar = ({ className, name }: AvatarProps) => {
  const shortName = name.slice(0, 2);
  const color = generateColorHslFromString(name);

  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      <p>{shortName}</p>
    </div>
  );
};

export default Avatar;
