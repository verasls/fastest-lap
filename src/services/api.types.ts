export interface Race {
  round: string;
  raceName: string;
  date: string;
  time: string;
  circuitName: string;
  country: string;
  Circuit?: any;
}

export interface MRData {
  RaceTable: {
    Races: Race[];
  };
}

export interface ApiResponse {
  MRData: MRData;
}
