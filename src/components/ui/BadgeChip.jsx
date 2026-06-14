
export default function BadgeChip({ text, type = 'default' }) {
  const getClasses = () => {
    switch (type) {
      case 'primary':
        // Electric Cyan text/border
        return 'text-primary bg-primary/10 border border-primary/20';
      case 'secondary':
        // Hot Orange text/border
        return 'text-secondary bg-secondary/10 border border-secondary/20';
      case 'success':
        // Soft Emerald text/border
        return 'text-tertiary bg-tertiary/10 border border-tertiary/20';
      case 'popular':
        return 'text-primary bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30';
      case 'value':
        return 'text-secondary bg-gradient-to-r from-secondary/10 to-secondary/20 border border-secondary/30';
      default:
        // Default muted gray
        return 'text-bodyText bg-zinc-800/80 border border-zinc-700/60';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono uppercase tracking-wide ${getClasses()}`}>
      {text}
    </span>
  );
}
