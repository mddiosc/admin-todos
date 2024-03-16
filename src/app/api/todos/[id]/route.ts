import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  try {
    const { completed, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
