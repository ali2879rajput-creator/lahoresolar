/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SolarPackage {
  id: string;
  size: string; // e.g. "3kW", "5kW"
  titleUrdu: string;
  titleEnglish: string;
  priceRange: string;
  panelsCount: number;
  panelsWattage: string;
  inverterCapacity: string;
  bestForUrdu: string;
  bestForEnglish: string;
  appliances: string[];
  appliancesUrdu: string[];
  eligibleForNetMetering: boolean;
  recoveryPeriod: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isVoiceTranscribed?: boolean;
}

export interface AuditBooking {
  name: string;
  phone: string;
  city: string;
  averageBill: string;
  message?: string;
  systemSizeInterest: string;
  timestamp: Date;
}
