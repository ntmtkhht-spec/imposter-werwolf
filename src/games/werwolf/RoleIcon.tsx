import { roleImages } from '../../assets/roles';
import { ROLES, type RoleId } from './roles';

type Props = {
  role: RoleId;
  size?: number;
  className?: string;
};

/** Renders generated role artwork, or the emoji fallback if none is present. */
export default function RoleIcon({ role, size = 96, className = '' }: Props) {
  const src = roleImages[role];
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={`rounded-2xl object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={`flex items-center justify-center leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.7 }}
      aria-hidden
    >
      {ROLES[role].icon}
    </span>
  );
}
