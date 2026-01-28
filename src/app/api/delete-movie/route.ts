import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.movies_data.delete({
    where: { id: id },
  });
    return NextResponse.json({ success: true });
}