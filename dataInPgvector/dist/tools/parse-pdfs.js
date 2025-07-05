import * as fs from 'fs';
import * as path from 'path';
const pdfParse = require('pdf-parse');
import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { PgVector } from "@mastra/pg";
// Helper to parse a single PDF
async function parsePDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}
// Entry point
async function main() {
    const store = new PgVector({
        connectionString: process.env.DATABASE_URL,
    });
    await store.createIndex({
        indexName: "documents",
        dimension: 1536,
    });
    const folderPath = '../../../docs'; // Folder where your 30 PDFs are
    const files = fs.readdirSync(folderPath)
        .filter(file => file.endsWith('.pdf')); // Take only the first 30 PDFs
    for (const fileName of files) {
        const fullPath = path.join(folderPath, fileName);
        try {
            const text = await parsePDF(fullPath);
            const doc = MDocument.fromText(text, {
                metadata: { fileName: fileName },
            });
            console.log(`\n--- ${fileName} ---\n`);
            console.log(text.slice(0, 300)); // Print first 300 characters
            const chunks = await doc.chunk({
                strategy: "recursive",
                size: 256,
                overlap: 50,
            });
            const { embeddings } = await embedMany({
                model: openai.embedding("text-embedding-3-small"),
                values: chunks.map((c) => c.text),
            });
            await store.upsert({
                indexName: "documents",
                vectors: embeddings,
                metadata: chunks.map((chunk) => ({
                    fileName: fileName,
                    text: chunk.text,
                })),
            });
        }
        catch (error) {
            console.error(`Error parsing ${fileName}:`, error);
        }
    }
}
main().catch(console.error);
