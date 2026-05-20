import { z } from "zod";

export const NotificationsSchema = z.object({
  beat1Text: z.string().default("Gestiona tus notificaciones"),
  beat2Text: z.string().default("Elimina la que no te interesa"),
  beat3Text: z.string().default("Cuéntanos el motivo"),
  beat5Text: z.string().default("¡Listo! Tu feedback mejora tu experiencia"),
});

export type NotificationsProps = z.infer<typeof NotificationsSchema>;
