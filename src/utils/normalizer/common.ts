export function normalizeBeneficiaryEmail(
  email: string | string[] | undefined
) {
  if (!email) return undefined;

  return (Array.isArray(email) ? email : [email]).join(',');
}
