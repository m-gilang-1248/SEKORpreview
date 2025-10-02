export type Sport = 'Futsal' | 'Tenis Meja' | 'Bulu Tangkis' | 'Voli' | 'Basket';

export interface Team {
  name: string;
  score: number;
}

export interface CompletedGame {
  id: string;
  sport: Sport;
  teamA: Team;
  teamB: Team;
  date: string;
  durationSeconds: number;
}