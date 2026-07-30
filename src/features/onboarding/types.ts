export type QuestionKind = "text" | "choice";

export interface OnboardingChoice {
  value: string;
  label: string;
}

export interface OnboardingQuestion {
  id: OnboardingFieldKey;
  kind: QuestionKind;
  prompt: string;
  placeholder?: string;
  choices?: OnboardingChoice[];
  multiSelect?: boolean;
}

export type OnboardingFieldKey =
  | "name"
  | "role"
  | "skills"
  | "interests"
  | "reason"
  | "goal";

export interface OnboardingAnswers {
  name: string;
  role: string;
  skills: string;
  interests: string;
  reason: string;
  goal: string;
}

export const emptyOnboardingAnswers: OnboardingAnswers = {
  name: "",
  role: "",
  skills: "",
  interests: "",
  reason: "",
  goal: "",
};
