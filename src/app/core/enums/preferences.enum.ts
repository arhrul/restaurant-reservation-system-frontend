export enum Preference {
  WINDOW,
  PRIVATE,
  ACCESSIBLE,
}

export const PreferencesLabels: Record<Preference, string> = {
  [Preference.WINDOW]: "Next to the window",
  [Preference.PRIVATE]: "Private",
  [Preference.ACCESSIBLE]: "Accessible",
};
