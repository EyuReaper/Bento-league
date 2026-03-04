export const mockLeagues = [
  {
    league: {
      id: 39,
      name: "Premier League",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/39.png"
    },
    country: {
      name: "England",
      code: "GB",
      flag: "https://media.api-sports.io/flags/gb.svg"
    }
  }
];

export const mockStandings = [
  {
    league: {
      id: 39,
      name: "Premier League",
      country: "England",
      logo: "https://media.api-sports.io/football/leagues/39.png",
      flag: "https://media.api-sports.io/flags/gb.svg",
      season: 2025,
      standings: [
        [
          { rank: 1, team: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, points: 89, goalsDiff: 62, form: "WWWWW", status: "same", description: "Champions League" },
          { rank: 2, team: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, points: 88, goalsDiff: 58, form: "WWWWW", status: "same", description: "Champions League" },
          { rank: 3, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, points: 82, goalsDiff: 45, form: "WDDWL", status: "same", description: "Champions League" },
          { rank: 4, team: { id: 49, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/49.png" }, points: 68, goalsDiff: 15, form: "LDDLL", status: "same", description: "Champions League" },
          { rank: 5, team: { id: 47, name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png" }, points: 66, goalsDiff: 13, form: "WLLLL", status: "same", description: "Europa League" },
          { rank: 6, team: { id: 34, name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png" }, points: 60, goalsDiff: 23, form: "WDWWW", status: "same", description: "Conference League" },
          { rank: 7, team: { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" }, points: 60, goalsDiff: 11, form: "WWWWW", status: "same", description: null },
          { rank: 8, team: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, points: 60, goalsDiff: -1, form: "WWLLD", status: "same", description: null },
          { rank: 9, team: { id: 48, name: "West Ham", logo: "https://media.api-sports.io/football/teams/48.png" }, points: 52, goalsDiff: -14, form: "LWLLD", status: "same", description: null },
          { rank: 10, team: { id: 35, name: "Bournemouth", logo: "https://media.api-sports.io/football/teams/35.png" }, points: 48, goalsDiff: -13, form: "LLLWW", status: "same", description: null },
          { rank: 11, team: { id: 51, name: "Brighton", logo: "https://media.api-sports.io/football/teams/51.png" }, points: 48, goalsDiff: -7, form: "DLWLL", status: "same", description: null },
          { rank: 12, team: { id: 52, name: "Crystal Palace", logo: "https://media.api-sports.io/football/teams/52.png" }, points: 46, goalsDiff: -6, form: "WWWWD", status: "same", description: null },
          { rank: 13, team: { id: 36, name: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png" }, points: 44, goalsDiff: -4, form: "LDDLD", status: "same", description: null },
          { rank: 14, team: { id: 39, name: "Wolves", logo: "https://media.api-sports.io/football/teams/39.png" }, points: 46, goalsDiff: -13, form: "LLLW L", status: "same", description: null },
          { rank: 15, team: { id: 45, name: "Everton", logo: "https://media.api-sports.io/football/teams/45.png" }, points: 40, goalsDiff: -11, form: "WWDWW", status: "same", description: null },
          { rank: 16, team: { id: 55, name: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png" }, points: 39, goalsDiff: -9, form: "LWDWW", status: "same", description: null },
          { rank: 17, team: { id: 65, name: "Nottingham Forest", logo: "https://media.api-sports.io/football/teams/65.png" }, points: 32, goalsDiff: -18, form: "WLLDL", status: "same", description: null },
          { rank: 18, team: { id: 1359, name: "Luton", logo: "https://media.api-sports.io/football/teams/1359.png" }, points: 26, goalsDiff: -33, form: "LLDLL", status: "same", description: "Relegation" },
          { rank: 19, team: { id: 44, name: "Burnley", logo: "https://media.api-sports.io/football/teams/44.png" }, points: 24, goalsDiff: -37, form: "LLDLW", status: "same", description: "Relegation" },
          { rank: 20, team: { id: 62, name: "Sheffield Utd", logo: "https://media.api-sports.io/football/teams/62.png" }, points: 16, goalsDiff: -69, form: "LLLLL", status: "same", description: "Relegation" }
        ]
      ]
    }
  }
];

export const mockFixtures = [
  {
    fixture: { 
      id: 1001, 
      status: { long: "Live", short: "1H", elapsed: 24 },
      venue: { name: "Anfield", city: "Liverpool" }
    },
    league: {
      id: 39,
      name: "Premier League",
      country: "England",
      logo: "https://media.api-sports.io/football/leagues/39.png",
      flag: "https://media.api-sports.io/flags/gb.svg",
      season: 2025,
      round: "Regular Season - 24"
    },
    teams: {
      home: { name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
      away: { name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }
    },
    goals: { home: 1, away: 0 }
  }
];

export const mockTransfers = [
  {
    player: { id: 101, name: "Kylian Mbappé" },
    update: "2024-03-01",
    transfers: [
      {
        date: "2024-03-01",
        type: "Free",
        teams: {
          in: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
          out: { id: 85, name: "Paris Saint Germain", logo: "https://media.api-sports.io/football/teams/85.png" }
        }
      }
    ]
  },
  {
    player: { id: 102, name: "Jude Bellingham" },
    update: "2023-07-01",
    transfers: [
      {
        date: "2023-07-01",
        type: "Transfer",
        teams: {
          in: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
          out: { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" }
        }
      }
    ]
  }
];

export const mockInjuries = [
  { player: { id: 645, name: "Kevin De Bruyne" }, team: { name: "Man City" }, type: "Missing Fixture", reason: "Hamstring Injury" },
  { player: { id: 290, name: "Alisson Becker" }, team: { name: "Liverpool" }, type: "Questionable", reason: "Muscle Injury" },
  { player: { id: 641, name: "Martin Ødegaard" }, team: { name: "Arsenal" }, type: "Missing Fixture", reason: "Ankle Injury" }
];

export const mockPredictions = [
  {
    predictions: {
      winner: { name: "Arsenal", comment: "Arsenal is expected to win." },
      win_or_draw: true,
      under_over: "-3.5",
      goals: { home: "1.54", away: "0.82" },
      percent: { home: "45%", draw: "25%", away: "30%" }
    }
  }
];

export const mockPlayers = [
  {
    player: { id: 1100, name: "Erling Haaland", photo: "https://media.api-sports.io/football/players/1100.png" },
    statistics: [{ team: { name: "Man City" }, goals: { total: 32, assists: 8 }, games: { rating: "8.4" } }]
  },
  {
    player: { id: 154, name: "Mohamed Salah", photo: "https://media.api-sports.io/football/players/154.png" },
    statistics: [{ team: { name: "Liverpool" }, goals: { total: 24, assists: 12 }, games: { rating: "7.9" } }]
  }
];
