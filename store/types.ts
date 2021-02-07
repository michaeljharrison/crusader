export interface BattleReport {
  createdOn: any
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

export interface Team {
'Battles Played': number 
'Battles Won': number
winRate: string
'Collection ID': string
'Created On': string
'Crusade Champion': string
'Faction': string
'FeaturePhoto': string
'Flavour': string
FlavourQoute: string
Gallery: string
Icon: string
'Item ID': string
Leader: string
LeaderPortrait: string
Name: string
Player: string
'Published On': string
Slug: string
Superfaction: string
TeamColor: string
'Updated On': string
'WZP-Doridia': string
'WZP-Kjelstan': string
'WZP-Ornakir': string
'WZP-TelemonPrime': string
'Win Ratio': string
}

export interface Battleground {
  description: string
  name: string
  rules: string
  rulesFluff: string
}

export interface BattleReport {
  'Battle Report':string
'Battle Report Big': string
'Battleground':string
'Collection ID':string
'Created On':string
Date:string
Draw: boolean
'Item ID':string
'Marked for Greatness':string
Mission:string
Name:string
Photos:string
'Power Level':number
'Published On':string
Slug:string
'Team 1':string
'Team 2':string
'Updated On':string
'Winning Team':string
}