import { Anthropic } from "@anthropic-ai/sdk";

/**
 * Takes an image buffer and returns a description of the item.
 * @param imageBuffer The image as a Buffer (JPEG, PNG, etc.)
 * @param mimeType The MIME type of the image (default: 'image/jpeg')
 * @returns Description text from Claude
 */
export async function describeImageBuffer(
  imageBuffer: Buffer,
  mimeType: string = "image/jpeg"
): Promise<void> {
    // Convert buffer to base64
    const base64Image = imageBuffer.toString("base64");

    // Initialize Anthropic client
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    try{
        // Build message payload for Claude
        const response = await client.messages.create({
          model: "claude-3-5-sonnet-20240620", // Use a vision-enabled model
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg", // Must match your image type
                    data: base64Image,
                  },
                },
                {
                  type: "text",
                  text: "What is in this image?",
                },
              ],
            },
          ],
        });

        // Extract and log the text response
        const textOutput = response.content
          .map((block) => (block.type === "text" ? block.text : null))
          .filter(Boolean)
          .join("\n");

        console.log(textOutput);
    
    }catch(error){
        console.error("Error calling Anthropic API:", error);
    }




}

// Example usage with a Buffer (e.g., from GCS)
import fs from "fs";

(async () => {
  const buffer = fs.readFileSync("./item.jpg");
  const description = await describeImageBuffer(buffer, "image/jpeg");
  console.log("Item Description:", description);
})();