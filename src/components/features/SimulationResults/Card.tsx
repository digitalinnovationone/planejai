import type { LucideIcon } from 'lucide-react'

interface CardProps {
  icon: LucideIcon
  label: string
  value: string
  subtitle: string
  variant?: 'default' | 'primary'
}

const variantClasses = {
  default: {
    card: 'bg-card',
    accent: 'text-primary',
    value: 'text-foreground',
    subtitle: 'text-muted-foreground',
  },
  primary: {
    card: 'bg-primary',
    accent: 'text-primary-foreground',
    value: 'text-primary-foreground',
    subtitle: 'text-primary-foreground/70',
  },
}

export function Card({
  icon: Icon,
  label,
  value,
  subtitle,
  variant = 'default',
}: CardProps) {
  const styles = variantClasses[variant]

  return (
    <div
      className={[
        'rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]',
        styles.card,
      ].join(' ')}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} className={styles.accent} />
        <span
          className={[
            'text-xs font-semibold tracking-widest uppercase',
            styles.accent,
          ].join(' ')}
        >
          {label}
        </span>
      </div>
      <p className={['text-3xl font-semibold', styles.value].join(' ')}>
        {value}
      </p>
      <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>{subtitle}</p>
    </div>
  )
}
