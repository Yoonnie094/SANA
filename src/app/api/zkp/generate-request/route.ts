import { NextResponse } from "next/server";
import { auth } from "@iden3/js-iden3-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  // Configuración del Verificador (SANA)
  const hostUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const sessionId = 1; // En producción, usar un ID dinámico
  const callbackUrl = `${hostUrl}/api/zkp/verify-proof?sessionId=${sessionId}`;
  const audience = "did:polygonid:polygon:amoy:2qE68xx...placeholder"; // DID del Verificador

  // Crear la solicitud de autorización (ZKP Query)
  const request = auth.createAuthorizationRequest(
    "SANA Doctor Verification",
    audience,
    callbackUrl
  );

  request.id = "7f38a193-0918-4a48-9fac-364756b42b2b";
  request.thid = "7f38a193-0918-4a48-9fac-364756b42b2b";

  // Definir qué queremos verificar (ZKP Query)
  // Ejemplo: Probar que el médico tiene una credencial de "MedicalLicense"
  const proofRequest = {
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      context: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/medical-license.json-ld",
      credentialSubject: {
        isVerifiedDoctor: {
          $eq: true,
        },
      },
      type: "MedicalLicense",
    },
  };

  request.body.scope = [proofRequest as any];

  return NextResponse.json(request);
}
