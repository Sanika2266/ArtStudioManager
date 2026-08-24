export enum InquiryStatus {
  New = 0,
  InProgress = 1,
  Completed = 2
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  artworkType?: string;
  preferredSize?: string;
  description?: string;
  referenceImageUrl?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}