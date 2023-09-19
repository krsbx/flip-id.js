export function normalizeBeneficiaryEmail(
  email: string | string[] | undefined
) {
  if (!email) return undefined;

  return (Array.isArray(email) ? email : [email]).join(',');
}
export function hasOwnProperty<
  Z extends NonNullable<unknown>,
  X extends NonNullable<unknown> = NonNullable<unknown>,
  Y extends PropertyKey = PropertyKey
>(obj: X, property: Y): obj is X & Record<Y, Z> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(property);
}
