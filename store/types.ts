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
  'Battles Played': string
  'Battles Won': string
  winRate: string
  'Collection ID': string
  'Created On': string
  'Crusade Champion': string
  Faction: string
  FeaturePhoto: string
  Flavour: string
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
  'Battle Report': string
  'Battle Report Big': string
  Battleground: string
  'Collection ID': string
  'Created On': any
  Disabled: boolean
  Date: string
  Draw: boolean
  'Item ID': string
  'Marked for Greatness': string
  Mission: string
  Name: string
  Likes: number
  Photos: string
  'Power Level': number
  'Published On': string
  Slug: string
  'Team 1': string
  'Team 2': string
  'Updated On': string
  'Winning Team': string
}

export interface LoreFragment {
  Contents: string
  'Created On': string
  Icon: String
  Name: string
  'Related Team': string
  Slug: string
}

export interface Crusade {
  Name: string
  Faction: string
  Player: string
  Battles: number
  Won: number
  Supply: number
  SupplyUsed: number
  Requisition: number
  RequisitionUsed: number
  OrderOfBattle: Array<Unit>
}

export interface Unit {
  Created: string
  Name: string
  Type: string
  Division: Division
  Fluff: string
  Power: number
  CP: number
  Points: number
  IsWarlord: boolean
  Battles: number
  Survived: number
  MarkedForGreatness: number
  XP: number
  KillsMelee: number
  KillsRanged: number
  KillsPsychic: number
  Relic: Relic
  Trait: Trait
  Honours: Array<Honour>
  Scars: Array<Scars>
  Notes: string
}

export interface Relic {
  Name: string
  Description: string
}

export interface Trait {
  Name: string
  Description: string
}

export interface Honour {
  Name: string
  Description: string
}

export interface Scars {
  Name: string
  Description: string
}

enum Division {
  HQ,
  Troop,
  Elite,
  FastAttack,
  HeavySupport,
  Transport,
}

export interface Army {
  Icon: string
  Faction: string
  SubFaction: string
  RealmOfOrigin: string
  StartingSize: number
}

export interface Territory {
  Name: string
  'Size & Type': string
  Upgrades: String
}

export interface Stronghold {
  Name: string
  Type: string
  Population: string
  Barracks: string
  Outposts: string
  Region: string
  Territories: Array<Territory>
  OrderOfBattle: Array<Unit>
}

export interface Strongholder {
  Army: Army
  Stronghold: Stronghold
}
