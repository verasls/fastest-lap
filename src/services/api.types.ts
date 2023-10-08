export interface Race {
  round: string;
  raceName: string;
  date: string;
  time: string;
  circuitName: string;
  country: string;
  sessions: Array<Session>;
  Circuit?: any;
  FirstPractice?: any;
  SecondPractice?: any;
  ThirdPractice?: any;
  Sprint?: any;
  Qualifying?: any;
}

export interface Session {
  sessionName: string;
  sessionDate: string;
  sessionTime: string;
}

export interface MRData {
  RaceTable: {
    Races: Race[];
  };
}

export interface ApiResponse {
  MRData: MRData;
}
