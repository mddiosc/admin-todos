import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({}); // delete * from todos

  await prisma.todo.createMany({
    data: [
      { description: "Buy groceries", completed: true },
      { description: "Walk the dog" },
      { description: "Do laundry" },
      { description: "Clean the house" },
      { description: "Do the dishes" },
      { description: "Mow the lawn" },
    ],
  });

  return NextResponse.json({ message: "Seed Executed" });
}
