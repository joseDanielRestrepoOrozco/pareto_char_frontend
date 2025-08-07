export interface Problem {
  id: string;
  name: string;
  frequency: number;
}

export type NewProblem = Omit<Problem, 'id'>;
