import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { base64ToJson } from "@/utils/DataConversion";

export async function GET(req: Request, context: any) {
  const { params } = context;

  if (!params.byAuthor) {
    return NextResponse.json({
      message: "Invalid Data!",
    });
  }

  try {
    const authorID = parseInt(params.byAuthor);

    const findUserCVS = await prisma.resume.findUnique({
      where: {
        authorID: authorID,
      },
    });

    if (findUserCVS && findUserCVS.all_resumes !== "") {
      //decode base64 to json
      const decodedJSON = base64ToJson(findUserCVS.all_resumes);
      //parse json
      const parsedJSON = JSON.parse(decodedJSON);

      return NextResponse.json({
        message: "Success",
        authorID: authorID,
        cvs: parsedJSON,
      });
    } else {
      return NextResponse.json({
        message: "No Data exist for curr user",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
    });
  }
}
