import {describeImageBuffer} from './services/llm'
// // Imports the Google Cloud client libraries
// const vision = require("@google-cloud/vision");
// const fs = require("fs");
// const path = require("path");

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// /**
//  * TODO(developer): Uncomment the following line before running the sample.
//  */

// const fileName = path.join("img", "test.jpg");
// const request = {
//   image: { content: fs.readFileSync(fileName) },
// };

// const [result] = await client.objectLocalization(request);
// const objects: Array<any> = result.localizedObjectAnnotations;
// objects.forEach((object) => {
//   console.log(`Name: ${object.name}`);
//   console.log(`Confidence: ${object.score}`);
//   const vertices: Array<any> = object.boundingPoly.normalizedVertices;
//   vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
// });
import fs from "fs";

// Read file into a Buffer
const buffer = fs.readFileSync("../img/test1.jpg");

describeImageBuffer(buffer)

