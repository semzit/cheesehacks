// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision");
const fs = require("fs");
const path = require("path");

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
try {
  const files = fs.readdirSync("img");

  files.forEach(async (fileName: any) => {
    console.log(fileName);

    fileName = path.join("img", fileName);

    const request = {
      image: { content: fs.readFileSync(fileName) },
    };

    const [result] = await client.objectLocalization(request);
    const objects: Array<any> = result.localizedObjectAnnotations;
    objects.forEach((object) => {
      console.log(`Name: ${object.name}`);
      console.log(`Confidence: ${object.score}`);
      const vertices: Array<any> = object.boundingPoly.normalizedVertices;
      vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
    });
  });
} catch (err) {
  console.error("Could not list directory", err);
}
