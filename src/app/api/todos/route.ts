import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");
  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Invalid take parameter" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "Invalid skip parameter" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { completed, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { completed, description },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
