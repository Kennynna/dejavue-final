import { Phone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PHONE_DISPLAY = "+7 (920) 362-32-02";
const PHONE_HREF = "tel:+79203623202";

export function CartOrderNotice() {
  return (
    <Alert className="mt-4 border-border bg-secondary/30 text-left sm:mt-6">
      <Phone className="h-4 w-4 text-primary" />
      <AlertTitle className="text-foreground">
        Оформление онлайн скоро появится
      </AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Оформление заказа через сайт времено недоступен. Позвоните нам —
        назовите ароматы из корзины, и мы подскажем наличие, доставку и способ
        оплаты.
      </AlertDescription>
      <div></div>
      <a
        href={PHONE_HREF}
        className="mt-3 inline-flex items-center justify-center ap-2 text-sm font-medium text-primary underline-offset-4 hover:underline pr-4.5"
      >
        {PHONE_DISPLAY}
      </a>
    </Alert>
  );
}
