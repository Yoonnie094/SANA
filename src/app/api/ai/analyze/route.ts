import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: Request) {
  try {
    const { specialty, requestedData, doctorName } = await req.json();

    const prompt = `
      Actúa como un Guardián de Privacidad Médica con IA para la plataforma SANA.
      Analiza la siguiente solicitud de acceso a datos médicos:
      
      Médico: ${doctorName}
      Especialidad: ${specialty}
      Datos Solicitados: ${requestedData.join(", ")}
      
      Tu tarea es:
      1. Determinar la COHERENCIA: ¿Es normal que un ${specialty} pida estos datos?
      2. Detectar ANOMALÍAS: Si pide más de 4 tipos de datos o datos sensibles no relacionados (ej: Pediatra pidiendo antecedentes penales), márcalo como SOSPECHOSO.
      3. Generar un RESUMEN clínico breve para el médico (máximo 2 líneas) asumiendo que tiene acceso.
      
      Responde estrictamente en formato JSON con la siguiente estructura:
      {
        "isSuspicious": boolean,
        "reason": "string explicativo en español",
        "coherenceScore": number (0-100),
        "medicalSummary": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Limpiar la respuesta por si Gemini devuelve markdown
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const jsonResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze data" }, { status: 500 });
  }
}
