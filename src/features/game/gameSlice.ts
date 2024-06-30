import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from '../../services/api';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface GameState {
  characters: Character[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GameState = {
  characters: [],
  status: 'idle',
};

export const fetchCharactersAsync = createAsyncThunk(
  'game/fetchCharacters',
  async () => {
    const characters = await fetchCharacters();
    return characters;
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.characters = action.payload;
      })
      .addCase(fetchCharactersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default gameSlice.reducer;
