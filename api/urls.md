**Disclaimer: always assume everything will be undefined**
```
Event
{
    "i": [
        {
            "awayfk": "8659",
            "cards": {
                "1": {
                    "14": "1"
                }
            },
            "countryfk": "2",
            "eventfk": "1724352",
            "homefk": "9825",
            "incidents_hash": "1dade4ba2dfd901780ed3307f2adcafa",
            "lineups_hash": "acd83eafe2913ab4c20c8dd2898ae105",
            "live": "1",
            "livestats_hash": "2af671a172a51c0735f5ec38266a374d",
            "livetips_count": 38,
            "livetips_hash": "12e78d536e5af9c00bb249485f7bac2d",
            "n": "44921433",
            "properties": {
                "FirstHalfEnded": "2015-05-24 16:47:20",
                "GameEnded": "2015-05-24 17:50:39",
                "GameStarted": "2015-05-24 16:00:16",
                "LineupConfirmed": "yes",
                "Live": "yes",
                "LiveStatsType": "livestats",
                "Round": "38",
                "SecondHalfEnded": "2015-05-24 17:50:39",
                "SecondHalfStarted": "2015-05-24 17:02:36",
                "Spectators": "59971",
                "VenueName": "Emirates Stadium",
                "Verified": "yes",
                "refereeFK": "443331",
                "venueFK": "315"
            },
            "results": {
                "1": {
                    "p": "9825",
                    "r": {
                        "1": "4",
                        "4": "4",
                        "5": "4",
                        "6": "4"
                    }
                },
                "2": {
                    "p": "8659",
                    "r": {
                        "1": "1",
                        "4": "1",
                        "5": "0",
                        "6": "1"
                    }
                }
            },
            "round": "38",
            "scopes_hash": "false",
            "sportfk": "1",
            "startdate": "2015-05-24 16:00:00",
            "stats": {
                "1": {
                    "bap": "64",
                    "cor": "7",
                    "cro": "7",
                    "fou": "6",
                    "ofs": "1",
                    "sbl": "3",
                    "sof": "8",
                    "son": "12",
                    "yec": "1"
                },
                "2": {
                    "bap": "36",
                    "cor": "3",
                    "cro": "8",
                    "fou": "7",
                    "ofs": "3",
                    "sbl": "2",
                    "sof": "8",
                    "son": "6"
                }
            },
            "stats_hash": "7477e20523ee27611aead90bb10feb88",
            "status_desc_name": "Finished",
            "status_desc_short": "FIN",
            "status_descfk": "6",
            "status_type": "finished",
            "tournament_stagefk": "836118",
            "tournament_templatefk": "47",
            "tournamentfk": "8598",
            "winner": "1",
            "winners": []
        }
    ],
    "n": 44921433,
    "t": 1
}

Posession Incident (actionzone)
{
  awaypos: "36",
  comment: "64",
  elapsed: 90,
  elapsed_plus: 3,
  event_incident_typefk: 352,
  homepos: "64",
  id: 4513497,
  n: 420,
  sortorder: 11,
  stats: {homepos: "64", awaypos: "36"},
  awaypos: "36",
  homepos: "64",
  subtype: "possession",
  type: "special"
}



http://json.mx-api.enetscores.com/live_data/livescore/1/0/?_=:timestamp
{
  i: Array[68] of events
  n: 46186988, a cursor
  t: 68
}

http://json.mx-api.enetscores.com/live_data/livescore/1/:cursor/?_=:timestamp
{
  i: Array[1] of events
  n: a cursor
  t: 1
}

http://json.mx-api.enetscores.com/live_data/event/:eventfk/0?_=:timestamp
{
  i: Array[1] of events
  n: 44921433, a cursor
  t: 1
}

http://json.mx-api.enetscores.com/live_data/event/:eventfk/:cursor?_=:timestamp
{
  i: Array[0]
  n: 0
  t: 0
}

http://json.mx-api.enetscores.com/live_data/actionzones/:eventfk/0?_=:timestamp
{
  i: Array[197] of incidents
  n: 422, a cursor
  s: "finished"
  t: 1
}

http://json.mx-api.enetscores.com/live_data/actionzones/:eventfk/:cursor?_=:timestamp
{
  n: 422, a cursor
  s: "finished"
}

http://ximg.enetscores.com/cdnimg/amalthea/logo/teamlogo/:teamfk
http://json.mx-api.enetscores.com/live_data/event_texts/:eventfk/3?_=:timestamp

http://json.mx-api.enetscores.com/live_data/event_texts/2028499/3?_=1437110923970
```
