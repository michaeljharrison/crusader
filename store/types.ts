export interface BattleReport {
  battleReport: string
  gameType: string
  markedForGreatness: string
  planet: string
  player1: string
  player2: string
  powerLevel: number
  winner: string
}

export interface Faction {
  faction: string
  leader: string
  name: string
  played: number
  player: string
  quote: string
  summary: string
  won: number
  winRate: string
  warzonePoints: any[]
}

export interface Battleground {
  description: string
  name: string
  rules: string
  rulesFluff: string
}
