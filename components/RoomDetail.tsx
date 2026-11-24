"use client";

import { use } from "react";

interface RoomDetailProps {
  params: Promise<{ id: string }>;
}

const RoomDetail = ({ params }: RoomDetailProps) => {
  const { id } = use(params);

  return <main className="px-6 py-8">Detalle {id}</main>;
};

export default RoomDetail;
