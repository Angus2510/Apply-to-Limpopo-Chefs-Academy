import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import nodemailer from "nodemailer";
import { NewApplyInitialValuesType } from "@/schemas";

// Extend jsPDF type to include lastAutoTable
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export const handleFinalSubmission = async (
  data: NewApplyInitialValuesType
): Promise<void> => {
  try {
    // Generate PDF using jsPDF
    console.log("Generating PDF...");
    const pdfBuffer = await generatePDF(data);

    // Send Email
    console.log("Sending email...");

    await sendEmail(pdfBuffer, data);

    console.log("All operations completed successfully");
  } catch (error) {
    console.error("Error during final submission:", error);
  }
};

const generatePDF = async (
  data: NewApplyInitialValuesType
): Promise<Buffer> => {
  const doc = new jsPDF();
  const margin = 10;

  // Helper function to draw a section with autoTable
  const drawSection = (
    title: string,
    content: Record<string, string | boolean>,
    startY: number,
    doc: jsPDF
  ) => {
    doc.setFontSize(16).setTextColor(40, 40, 40).text(title, margin, startY);
    const rows = Object.entries(content).map(([key, value]) => [
      key,
      typeof value === "boolean" ? (value ? "Yes" : "No") : value,
    ]);
    autoTable(doc, {
      body: rows,
      startY: startY + 10,
      margin: { left: margin, right: margin },
      theme: "grid",
      styles: { fontSize: 12, cellPadding: 4 },
      didDrawPage: (dataArg) => {
        if (
          dataArg.cursor &&
          dataArg.cursor.y > doc.internal.pageSize.height - 20
        ) {
          doc.addPage();
        }
      },
    });

    return doc.lastAutoTable.finalY || startY + 10;
  };

  // Add header
  doc
    .setFontSize(20)
    .setTextColor(40, 40, 40)
    .text("Application Form", 105, 30, { align: "center" });

  // Draw sections
  let yPos = 50;
  yPos = drawSection(
    "Student Details",
    {
      Name: data.studentName || "",
      Surname: data.studentSurname || "",
      "ID Number": data.studentIdNumber || "",
      Email: data.emailAddress || "",
      Phone: data.phone || "",
      "Whatsapp Number": data.whatsapp || "",
      Gender: data.studentGender || "",
      Address: data.studentAddress || "",
      City: data.studentCity || "",
      Province: data.studentProvince || "",
      "Postal Code": data.studentPostalCode || "",
    },
    yPos,
    doc
  );

  yPos = drawSection(
    "Guardian Details",
    {
      Email: data.guardianEmail || "",
      Phone: data.guardianPhone || "",
      Name: data.guardianName || "",
      Surname: data.guardianSurname || "",
      Relation: data.guardianRelation || "",
    },
    yPos + 10,
    doc
  );

  yPos = drawSection(
    "Study Details",
    {
      "Attending School": data.attendingSchool ? "Yes" : "No",
      "Highest Grade": data.highestGrade || "",
      "Year Passed": data.passedYear || "",
      Subjects: data.subjects || "",
    },
    yPos + 10,
    doc
  );

  yPos = drawSection(
    "Course and Campus",
    {
      "Choice of Course": data.choiceOfCourse || "",
      "Campus Choice": data.campusChoice || "",
      Intake: data.intake || "",
      "Need Accommodation": data.needAccommodation ? "Yes" : "No",
      "Accommodation Option": data.accommodationOption || "",
    },
    yPos + 10,
    doc
  );

  const pdfBuffer = doc.output("arraybuffer");
  return Buffer.from(pdfBuffer);
};

const sendEmail = async (
  pdfBuffer: Buffer,
  data: NewApplyInitialValuesType
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const campusEmails = {
    Mokopane: "reception@limpopochefs.co.za",
    Polokwane: "polokwane@limpopochefs.co.za",
  };

  const campusEmail = campusEmails[data.campusChoice || "Mokopane"];

  const mailOptionsCampus = {
    from: process.env.EMAIL_USER,
    to: campusEmail,
    subject: `Application Form for ${data.studentName} ${data.studentSurname}`,
    text: `Application form submitted by ${data.studentName} ${data.studentSurname}. Attached is the application PDF`,
    attachments: [
      {
        filename: "application.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const infoCampus = await transporter.sendMail(mailOptionsCampus);
    console.log("Campus email sent successfully:", infoCampus);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
