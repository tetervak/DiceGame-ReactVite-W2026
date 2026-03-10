import { useState } from 'react'
import { fetchRollData } from './data/dice-data';
import { DiceDisplay } from './components/DiceDisplay';
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    type SelectChangeEvent
} from "@mui/material";
import {blue, green, orange} from "@mui/material/colors";
import CheckIcon from '@mui/icons-material/Check';
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient();

function DiceGame() {
    const [numberOfDice, setNumberOfDice] = useState<number>(3);

    const { data: rollData, refetch, isError, error, isFetching } = useQuery({
        queryKey: ['rollData', numberOfDice],
        queryFn: () => fetchRollData(numberOfDice),
        enabled: false,
    });

    const onRollDice = () => {
        refetch();
    };

    const onNumberOfDiceChange = (event: SelectChangeEvent<number>): void => {
        setNumberOfDice(event.target.value as number)
    }

    return (
        <Container maxWidth="sm">
            <h1 style={{color: green[600]}}>Dice Game</h1>

                <FormControl size="small">
                    <FormLabel id="number-of-dice-label" style={{color: blue[600]}}>Number of Dice</FormLabel>
                    <Select value={numberOfDice} onChange={onNumberOfDiceChange}
                        labelId="number-of-dice-label">
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>Two</MenuItem>
                        <MenuItem value={3}>Three</MenuItem>
                        <MenuItem value={4}>Four</MenuItem>
                        <MenuItem value={5}>Five</MenuItem>
                    </Select>
                </FormControl>
                <div style={{margin: '1rem', height: '125px'}}>
                    {
                        isFetching ? <h3 style={{color: orange[600]}}>Rolling...</h3> :
                            isError ? <h3 style={{color: 'red'}}>Error: {error?.message}</h3> :
                                (rollData != undefined) ?
                                    <DiceDisplay values={rollData?.values} /> :
                                    <h3 style={{color: orange[600]}}>No dice rolled yet</h3>
                    }
                </div>
            <p>
                <label style={{fontWeight: "bold", fontSize: "larger"}}>Total</label>: {rollData?.total ?? 0}
            </p>
            <p>
                <Button variant="contained" color="primary" onClick={onRollDice}>Roll <CheckIcon/></Button>
            </p>
        </Container>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DiceGame />
        </QueryClientProvider>
    );
}
export default App
