import { Suspense } from "react";
import RoomDetail from "@/components/RoomDetail";

// cacheComponents está activo: leer params es un acceso en tiempo de ejecución
// y debe ocurrir dentro de <Suspense> para que la ruta tenga un static shell.
const RoomPage = ({ params }: PageProps<"/rooms/[id]">) => {
  return (
    <Suspense fallback={null}>
      <RoomDetail params={params} />
    </Suspense>
  );
};

export default RoomPage;
