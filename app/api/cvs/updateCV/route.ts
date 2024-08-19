import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { base64ToJson, jsonToBase64 } from "@/utils/DataConversion";

export async function POST(req: Request) {
  const {
    authorID,
    resumeID,
    createdAt,
    selectedTemplate,
    selectedFontSize,
    personalProfile,
    fname,
    lname,
    role,
    address,
    phone,
    email,
    education,
    workExperience,
    languages,
    socialLinks,
    skills,
  } = await req.json();

  if (!authorID || !resumeID) {
    return NextResponse.json({
      message: "Invalid request data",
    });
  }

  try {
    const searchAuthorCV = await prisma.resume.findUnique({
      where: {
        authorID,
      },
    });

    const decodeData = base64ToJson(searchAuthorCV?.all_resumes);
    const parseDecodedData = JSON.parse(decodeData);

    const otherCVS = parseDecodedData.filter(
      (record: { resumeID: any }) => record.resumeID !== resumeID
    );

    const newResumeData = {
      resumeID,
      createdAt,
      cvData: {
        selectedTemplate,
        selectedFontSize,
        personalProfile,
        fname,
        lname,
        role,
        address,
        phone,
        email,
        education,
        workExperience,
        languages,
        socialLinks,
        skills,
      },
    };

    const newList = [...otherCVS, newResumeData];
    //stringify it with json
    const jsonList = JSON.stringify(newList);

    //encode to base64 before saving in db
    const encodedList = jsonToBase64(jsonList);

    const updateCV = await prisma.resume.update({
      where: {
        authorID,
      },
      data: {
        all_resumes: encodedList,
      },
    });

    return NextResponse.json({
      message: "Updated CV List",
      cv: newResumeData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error updating or creating resumes.",
    });
  }
}
