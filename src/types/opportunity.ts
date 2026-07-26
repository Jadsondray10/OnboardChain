export type OpportunityType = "gig" | "grant" | "job" | "collab" | "airdrop";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  description: string;
  reward?: string;
  matchScore?: number;
}
