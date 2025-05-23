import getUserSession from "@/functions/get-user";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET all categories
export const GET = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { message: "unauthorized | not logged in" },
        { status: 401 }, // Changed status to 401 for unauthorized
      );
    }

    const categories = await prisma.communityCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { message: "categories fetched successfully", data: categories },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching categories:", error); // Added logging for debugging
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// POST create a new category
export const POST = async (request: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { message: "unauthorized | not logged in" },
        { status: 400 },
      );
    }

    const body = await request.json();
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { message: "Invalid category name" },
        { status: 400 },
      );
    }

    const category = await prisma.communityCategory.create({
      data: { name: body.name },
    });

    return NextResponse.json(
      { message: "category created successfully", data: category },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// PUT update an existing category
export const PUT = async (request: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { message: "unauthorized | not logged in" },
        { status: 400 },
      );
    }

    const body = await request.json();
    if (!body.id || !body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { message: "Invalid category ID or name" },
        { status: 400 },
      );
    }

    const updatedCategory = await prisma.communityCategory.update({
      where: { id: body.id },
      data: { name: body.name },
    });

    return NextResponse.json(
      { message: "category updated successfully", data: updatedCategory },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// DELETE a category
export const DELETE = async (request: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { message: "unauthorized | not logged in" },
        { status: 400 },
      );
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 },
      );
    }

    await prisma.communityCategory.delete({
      where: { id: body.id },
    });

    return NextResponse.json(
      { message: "category deleted successfully" },
      { status: 204 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
