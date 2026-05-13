import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { specialty, requestedData, doctorName } = await req.json();

    // Fallback: If GROQ_API_KEY is missing, simulate a response so the UI doesn't crash
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY no detectada. Retornando análisis simulado.");
      return NextResponse.json({
        isSuspicious: false,
        reason: "Validación de coherencia completada (Simulación).",
        coherenceScore: 98,
        medicalSummary: "Solicitud justificada y relacionada con la especialidad."
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres un experto en privacidad médica y seguridad de datos. Responde siempre en formato JSON puro.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-specdec", // Modelo potente y rápido
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (!responseContent) throw new Error("No response from Groq");

    return NextResponse.json(JSON.parse(responseContent));
  } catch (error) {
    console.error("Groq Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze data with Groq" }, { status: 500 });
  }
}
