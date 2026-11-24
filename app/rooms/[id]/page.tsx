"use client";

import { use } from "react";

const RoomPage = ({ params }: PageProps<"/rooms/[id]">) => {
  const { id } = use(params);

  return <main className="px-6 py-8">Detalle {id}</main>;
};

export default RoomPage;
