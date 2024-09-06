import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns-tz";

const prisma = new PrismaClient();

// Define the Zod schema
const UserSchema = z.object({
  fullName: z.string(),
  email: z.string().email().min(5),
  countryCode: z.string(),
  phoneNumber: z.string(),
  message: z.string().max(500),
  timeStamp: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format",
  }),
});

export async function POST(request: NextRequest) {
  console.log("data hit backend post route");

  try {
    const json = await request.json();
    console.log("Received data:", json);

    const result = UserSchema.safeParse(json);
    console.log("Validation result:", result);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors },
        { status: 400 }
      );
    }

    const { fullName, email, countryCode, phoneNumber, message, timeStamp } =
      result.data;
    console.log("Parsed data:", result.data);

    const localDateTime = new Date(timeStamp);
    const istDateTime = format(localDateTime, "yyyy-MM-dd HH:mm:ss", {
      timeZone: "Asia/Kolkata",
    });

    const isoDateTime = new Date(istDateTime).toISOString();
    console.log("ISO DateTime:", isoDateTime);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        countryCode,
        phNumber: phoneNumber,
        message,
        submittedAt: isoDateTime,
      },
    });
    console.log("User created:", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

// Function to send a "heartbeat" query
async function keepDatabaseAlive() {
  try {
    // A simple query to keep the connection alive
    await prisma.$queryRaw`SELECT 1;`;
    console.log("Database connection is alive.");
  } catch (error) {
    console.error("Error keeping the database connection alive:", error);
  }
}

// Set the interval to send a query every 1day
setInterval(keepDatabaseAlive, 86400000);

// Remember to properly close the Prisma connection when your app shuts down
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

// export async function GET() {
//   return NextResponse.json({ message: "Express on Vercel" });
// }
