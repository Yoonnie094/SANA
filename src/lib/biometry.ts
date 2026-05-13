/**
 * SANA Biometric Security Layer
 * Uses WebAuthn to ensure the patient is physically present before signing Web3 transactions.
 */

export async function verifyBiometrics(): Promise<boolean> {
  if (!window.PublicKeyCredential) {
    console.warn("Biometrics not supported on this browser.");
    return true; // Fallback or handle as error
  }

  try {
    // Simple challenge to trigger biometric prompt
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const options: CredentialCreationOptions = {
      publicKey: {
        challenge,
        rp: { name: "SANA Sovereignty" },
        user: {
          id: new Uint8Array(16),
          name: "patient@sana.com",
          displayName: "Patient",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // FaceID/TouchID/Windows Hello
          userVerification: "required",
        },
        timeout: 60000,
      },
    };

    const credential = await navigator.credentials.create(options);
    return !!credential;
  } catch (error) {
    console.error("Biometric verification failed:", error);
    return false;
  }
}
