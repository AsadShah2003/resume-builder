import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { base64ToJson, jsonToBase64 } from "@/utils/DataConversion";

export async function POST(req: Request) {
  const { authorID, toDeleteID } = await req.json();

  if (!authorID || !toDeleteID) {
    return NextResponse.json({
      message: "Invalid Data!",
    });
  }

  try {
    const findUserCVS = await prisma.resume.findFirst({
      where: {
        authorID: authorID,
      },
    });
    if (findUserCVS && findUserCVS.all_resumes !== "") {
      //Now filter all other user resumes expect with provided with toDeleteID

      const decodeData = base64ToJson(findUserCVS.all_resumes);
      const parsedJSON = JSON.parse(decodeData);

      const otherCVS = parsedJSON.filter(
        (record: { resumeID: any }) => record.resumeID !== toDeleteID
      );

      //stringify the list
      const jsonList = JSON.stringify(otherCVS);
      const encodeList = jsonToBase64(jsonList);

      //Update our db with filtered array
      const updatedCVList = await prisma.resume.update({
        where: {
          authorID,
        },
        data: {
          all_resumes: encodeList,
        },
      });

      return NextResponse.json({
        message: "Deletion Success",
        cvs: updatedCVList,
      });
    } else {
      return NextResponse.json({
        message: "No User Exist with provided author id!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
    });
  }
}
