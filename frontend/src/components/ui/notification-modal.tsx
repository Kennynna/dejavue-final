import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X, type LucideIcon } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationConfig {
  type: NotificationType
  title?: string
  message: string
  icon?: LucideIcon
  duration?: number // если 0, то не закрывается автоматически
}

interface NotificationContextType {
  show: (config: NotificationConfig) => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
  close: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const defaultIcons: Record<NotificationType, LucideIcon> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const defaultTitles: Record<NotificationType, string> = {
  success: 'Успешно',
  error: 'Ошибка',
  warning: 'Внимание',
  info: 'Информация',
}

const typeStyles: Record<NotificationType, { icon: string; bg: string; border: string }> = {
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
  },
  error: {
    icon: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
  },
  warning: {
    icon: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
  },
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
  },
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationConfig | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setNotification(null), 200) // даём время на анимацию
  }, [])

  const show = useCallback((config: NotificationConfig) => {
    setNotification(config)
    setIsOpen(true)

    // Автозакрытие
    const duration = config.duration ?? 3000
    if (duration > 0) {
      setTimeout(close, duration)
    }
  }, [close])

  const success = useCallback((message: string, title?: string) => {
    show({ type: 'success', message, title })
  }, [show])

  const error = useCallback((message: string, title?: string) => {
    show({ type: 'error', message, title, duration: 0 }) // ошибки не закрываются автоматически
  }, [show])

  const warning = useCallback((message: string, title?: string) => {
    show({ type: 'warning', message, title })
  }, [show])

  const info = useCallback((message: string, title?: string) => {
    show({ type: 'info', message, title })
  }, [show])

  return (
    <NotificationContext.Provider value={{ show, success, error, warning, info, close }}>
      {children}
      <NotificationModal
        isOpen={isOpen}
        notification={notification}
        onClose={close}
      />
    </NotificationContext.Provider>
  )
}

interface NotificationModalProps {
  isOpen: boolean
  notification: NotificationConfig | null
  onClose: () => void
}

function NotificationModal({ isOpen, notification, onClose }: NotificationModalProps) {
  if (typeof document === 'undefined') return null

  const Icon = notification?.icon ?? (notification ? defaultIcons[notification.type] : null)
  const title = notification?.title ?? (notification ? defaultTitles[notification.type] : '')
  const styles = notification ? typeStyles[notification.type] : null

  return createPortal(
    <AnimatePresence>
      {isOpen && notification && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div
              className={cn(
                'relative rounded-xl border bg-background p-6 shadow-xl',
                styles?.border
              )}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                {Icon && (
                  <div className={cn('mb-4 rounded-full p-3', styles?.bg)}>
                    <Icon className={cn('h-8 w-8', styles?.icon)} />
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {title}
                </h3>

                {/* Message */}
                <p className="mb-6 text-sm text-muted-foreground">
                  {notification.message}
                </p>

                {/* Button */}
                <Button onClick={onClose} className="w-full">
                  Понятно
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

