import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import crypto from "crypto";

const taskFilePath = path.join(process.cwd(), "public/mocks/taskData.json");

export async function GET() {
  try {
    const task = await fsPromises.readFile(taskFilePath, "utf-8");
    const json = JSON.parse(task);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No task found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req) {
  try {
    const task = await fsPromises.readFile(taskFilePath, "utf-8");
    const jsonArray = JSON.parse(task);

    const { id, name } = await req.json();

    const taskIndex = jsonArray.findIndex((proj) => proj.id === id);

    if (taskIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "task not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    let desiredtask = jsonArray[taskIndex];
    desiredtask.name = name ? name : desiredtask.name;

    jsonArray[taskIndex] = desiredtask;
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(taskFilePath, updatedData);

    // Step 10: return response to frontend (200 ok)
    return new NextResponse(
      JSON.stringify({ message: "task patched successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const task = await fsPromises.readFile(taskFilePath, "utf-8");
    const jsonArray = JSON.parse(task);
    const { name } = await req.json();
    const id = crypto.randomBytes(16).toString("hex");

    jsonArray.push({ id, name });

    const updatedData = JSON.stringify(jsonArray);
    await fsPromises.writeFile(taskFilePath, updatedData);
    return new NextResponse(
      JSON.stringify({ message: "task created successfully!" }),
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const task = await fsPromises.readFile(taskFilePath, "utf-8");
    const jsonArray = JSON.parse(task);
    const taskIndex = jsonArray.findIndex((proj) => proj.id === id);
    if (taskIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "task not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    jsonArray.splice(taskIndex, 1);
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(taskFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "task deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
