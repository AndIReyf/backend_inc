export type ResolutionType =
  | 'P144'
  | 'P240'
  | 'P360'
  | 'P480'
  | 'P720'
  | 'P1080'
  | 'P1440'
  | 'P2160';

const VALID_RESOLUTIONS_SET = new Set<ResolutionType>([
  'P144',
  'P240',
  'P360',
  'P480',
  'P720',
  'P1080',
  'P1440',
  'P2160',
]);

export function isValidResolutionArray(
  values: string[],
): values is ResolutionType[] {
  return values.every((value) =>
    VALID_RESOLUTIONS_SET.has(value as ResolutionType),
  );
}
