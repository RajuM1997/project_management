import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import crypto from "crypto";

const projectFilePath = path.join(
  process.cwd(),
  "public/mocks/projectData.json"
);

export async function GET() {
  try {
    const project = await fsPromises.readFile(projectFilePath, "utf-8");
    const json = JSON.parse(project);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No project found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req) {
  try {
    const project = await fsPromises.readFile(projectFilePath, "utf-8");
    const jsonArray = JSON.parse(project);

    const { id, name } = await req.json();

    const projectIndex = jsonArray.findIndex((proj) => proj.id === id);

    if (projectIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found!" }),
        {
          status: 404,
          headers: { "content-type": "application/json" },
        }
      );
    }

    let desiredProject = jsonArray[projectIndex];
    desiredProject.name = name ? name : desiredProject.name;

    jsonArray[projectIndex] = desiredProject;
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(projectFilePath, updatedData);

    // Step 10: return response to frontend (200 ok)
    return new NextResponse(
      JSON.stringify({ message: "Project patched successfully!" }),
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
    const project = await fsPromises.readFile(projectFilePath, "utf-8");
    const jsonArray = JSON.parse(project);
    const { name } = await req.json();
    const id = crypto.randomBytes(16).toString("hex");

    jsonArray.push({ id, name });

    const updatedData = JSON.stringify(jsonArray);
    await fsPromises.writeFile(projectFilePath, updatedData);
    return new NextResponse(
      JSON.stringify({ message: "Project created successfully!" }),
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
    const project = await fsPromises.readFile(projectFilePath, "utf-8");
    const jsonArray = JSON.parse(project);
    const projectIndex = jsonArray.findIndex((proj) => proj.id === id);
    if (projectIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: "project not found!" }),
        {
          status: 404,
          headers: { "content-type": "application/json" },
        }
      );
    }

    jsonArray.splice(projectIndex, 1);
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(projectFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Project deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
