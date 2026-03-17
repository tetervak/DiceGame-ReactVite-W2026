import axios from 'axios';

export interface RollData{
  values: number[];
  total: number;
}

export async function fetchRollData(numberOfDice: number): Promise<RollData> {
    const response =
        await axios.get<RollData>(`http://localhost:8080/api/dice-game/roll-dice?numberOfDice=${numberOfDice}`);
  console.log(response.data)
    return response.data;
}
