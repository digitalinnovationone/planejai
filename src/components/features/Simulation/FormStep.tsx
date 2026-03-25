import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/shared/Button'
import { Input, type InputProps } from '@/components/shared/Input'

interface FormStepProps {
  icon: LucideIcon
  title: string
  question: string
  inputProps: InputProps
  submitButtonProps?: {
    label: string
    emojiIcon?: string
  }
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
}: FormStepProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
      <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
        {question}
      </h3>
      <form className="flex flex-col gap-4">
        <Input {...inputProps} />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button
            type="button"
            // onClick={onBack}
            variant="ghost"
            icon={ArrowLeft}
            className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={!submitButtonProps ? ArrowRight : undefined}
            className="order-1 flex-1 sm:order-2"
          >
            {submitButtonProps?.label ?? 'Próximo'}
            {submitButtonProps?.emojiIcon}
          </Button>
        </div>
      </form>
    </div>
  )
}
