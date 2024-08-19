import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { jsonToBase64 } from "@/utils/DataConversion";
import { base64ToJson } from "@/utils/DataConversion";
import { GetDateTime } from "@/utils/GetDateTime";

export async function POST(req: Request) {
  const {
    authorID,
    resumeID,
    selectedTemplate,
    selectedFontSize,
    fname,
    lname,
    role,
    personalProfile,
    address,
    phone,
    email,
    education,
    workExperience,
    languages,
    socialLinks,
    skills,
  } = await req.json();

  if (!authorID) {
    return NextResponse.json({
      message: "Invalid request data",
    });
  }

  try {
    const existingResume = await prisma.resume.findUnique({
      where: {
        authorID,
      },
    });

    if (existingResume && existingResume.all_resumes?.length !== 0) {
      // Update existing resume
      const newResumeData = {
        resumeID,
        createdAt: GetDateTime(), // Use your existing GetDateTime function
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

      // Decode base64 to JSON
      const decodedData = base64ToJson(existingResume.all_resumes);
      // Parse JSON
      const parsedData = JSON.parse(decodedData);

      const updatedList = [...parsedData, newResumeData];

      // Now convert it to JSON and then encode before pushing to the database
      const jsonList = JSON.stringify(updatedList);
      // Encode it
      const encodedData = jsonToBase64(jsonList);

      const updatedResume = await prisma.resume.update({
        where: { authorID },
        data: {
          all_resumes: encodedData,
        },
      });

      return NextResponse.json({
        message: "Added New CV, CV List Updated!",
        cv: newResumeData,
      });
    } else {
      // Create a new resume

      const cvToAdd = [
        {
          resumeID,
          createdAt: GetDateTime(), // Use your existing GetDateTime function
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
        },
      ];

      // Convert to JSON
      const jsonObject = JSON.stringify(cvToAdd);
      // Now encode JSON
      const encodeJsonObject = jsonToBase64(jsonObject);

      const newResume = await prisma.resume.create({
        data: {
          authorID,
          all_resumes: encodeJsonObject,
        },
      });

      return NextResponse.json({
        message: "Added New CV",
        cv: cvToAdd[0],
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error updating or creating resumes.",
      cause: error
    });
  }
}
