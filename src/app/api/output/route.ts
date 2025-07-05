import {mastra} from "../../../mastra/index"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    const agent = mastra.getAgent("queryVectorAgent");
 
    const result = await agent.generate(message);
    // You can process the message here as needed
    

    return NextResponse.json({ received: result.text });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}