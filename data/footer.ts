import type { FooterGroup } from "@/types/footer";

// Enlaces como texto plano: no existen esas rutas y no se añaden páginas (CA-26.2).
export const footerGroups: FooterGroup[] = [
  {
    title: "Asistencia",
    links: ["Centro de ayuda", "Opciones de cancelación", "Ayuda a la discapacidad"],
  },
  {
    title: "Modo anfitrión",
    links: ["Publica tu alojamiento", "Recursos para anfitriones", "Foro de la comunidad"],
  },
  {
    title: "Refugio",
    links: ["Novedades", "Empleo", "Tarjetas regalo"],
  },
];
