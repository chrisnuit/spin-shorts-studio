import React from "react";
import { Composition } from "remotion";
import { Notifications } from "./Composition";
import { NotificationsSchema } from "./schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Notifications"
        component={Notifications}
        durationInFrames={270}
        fps={30}
        width={1280}
        height={720}
        schema={NotificationsSchema}
        defaultProps={{
          beat1Text: "Gestiona tus notificaciones",
          beat2Text: "Elimina la que no te interesa",
          beat3Text: "Cuéntanos el motivo",
          beat5Text: "¡Listo! Tu feedback mejora tu experiencia",
        }}
      />
    </>
  );
};
