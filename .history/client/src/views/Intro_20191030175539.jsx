import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GameCard from './../components/widgets/gamecard/GameCard'
import BrazilianLeagueGraph from './../components/graphics/brazilianleaguegraph/BrazilianLeagueGraph'
import PlayerCard from './../components/widgets/playercard/PlayerCard'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import WinningProbability from './../components/widgets/winningprobability/WinningProbability'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    "last_games": {
        textAlign: "center",
        marginBottom: "10px"
    },
    "brazilian_league_graph": {
        paddingTop: "5px",
        paddingBottom: "15px"
    },
    "top_players": {
        textAlign: "center",
        paddingBottom: "15px",
    },
    "winning_prob": {
        textAlign: "center",
        marginTop: "20px",
    },
  }))


const Intro = () => {
    const classes = useStyles();
    const [games, setGames ] = useState([])
    const [topPlayers, setTopPlayers ] = useState([])
    const [winningProbability, setWinningProbability ] = useState([])

    const responsive = {
        0: { items: 1 },
        500: { items: 2 },
        900: { items: 4 },
        1024: { items: 5 },
        1400: { items: 6 },

      }
    
    // Axios+
    const fetchGames = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/brazilian_league/last_12_games`)
        .then(response => {
            setGames(response.data)
        })
        .catch(error => {
            console.error(error.message)
        })
    }

    const fetchTopPlayes = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/players/top`)
        .then(response => {
            setTopPlayers(response.data)
        })
        .catch(error => {
            console.error(error.message)
        })
    }   

    const fetchWinningProbability = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/brazilian_league/winning_probability`)
        .then(response => {
            setWinningProbability(response.data)
        })
        .catch(error => {
            console.error(error.message)
        })
    }  

    // ComponentDidMount()
    useEffect( () => { fetchTopPlayes() }, [] )
    useEffect( () => { fetchGames() }, [] )
    useEffect( () => { fetchWinningProbability() }, [] )


    return (
        <>          
        <div>
            <AliceCarousel
            mouseDragEnabled
            buttonsDisabled
            autoPlay={true}
            autoPlayInterval={5000}
            infinite={false}
            responsive={responsive}
            dotsDisabled 
            >
            {games.map((game, key) => (
                <GameCard
                key={key}
                date={game['date']}
                stadium={game['stadium']}
                team_1={game['team_1']}
                team_2={game['team_2']}
                score_team_1={game['score_team_1']}
                score_team_2={game['score_team_2']}
                />

            ))}

            </AliceCarousel>
            </div>

            <div className={classes.winning_prob}>
                <h3>Probabilidade de Vitória na Próxima Partida</h3>
            </div>

            <div>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                    {winningProbability.map((data, key) => (
                    <WinningProbability
                    key={key}
                    team={data['team']}
                    p1={data['p1']}
                    pe={data['pe']}
                    p2={data['p2']}
                />
                ))}
            </Grid>

            </div>

            <div style = {{marginBottom: "15px"}}/>

            <div className={classes.brazilian_league_graph}>
                <BrazilianLeagueGraph/>
            </div>


            <div className={classes.top_players}>
                <h3>Jogadores Mais Caros</h3>
            </div>
            <div>
                <AliceCarousel
                mouseDragEnabled
                buttonsDisabled
                autoPlay={true}
                autoPlayInterval={5000}
                infinite={false}
                responsive={responsive}
                dotsDisabled 
                >
                {topPlayers.map((player, key) => (
                    <PlayerCard
                    key={key}
                    name={player['name']}
                    position={player['position']}
                    nationality={player['nationality']}
                    age={player['age']}
                    team={player['team']}
                    market_value={player['market_value']}
                    stats={player['stats']}
                    />

                ))}
                </AliceCarousel>
            </div>

                    <div style={{paddingTop: "100px"}}/>

        </>
    )
}


export default Intro