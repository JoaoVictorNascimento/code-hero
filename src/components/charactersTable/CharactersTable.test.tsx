import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersTable from './CharactersTable';
import { CharacterType } from '../../types/CharacterItem';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


function renderCharactersTable (
  loading: boolean,
  isEmptySearched: boolean,
  onSearchedValue: () => void,
  characters?: CharacterType[],
) {
  return render(
    <Router>
      <CharactersTable
        characters={characters}
        loading={loading}
        isEmptySearched={isEmptySearched}
        onSearchedValue={onSearchedValue}
      />
    </Router>
  );
}

describe('CharactersTable', () => {
  const characters: CharacterType[] = [
    {
      id: 1,
      name: 'Spider-Man',
      thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/03/58dd080719806', extension: 'jpg' },
      series: { items: [] },
      events: { items: [] },
    },
    {
      id: 2,
      name: 'Iron Man',
      thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/03/58dd080719806', extension: 'jpg' },
      series: { items: [] },
      events: { items: [] },
    },
  ];

  it('should render loading state', () => {
    renderCharactersTable(true, false, () => {}, undefined);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should render no results state', async () => {
    renderCharactersTable(false, true, () => {}, undefined);

    const result = screen.getByTestId('result');
    expect(result).toBeInTheDocument();
    expect(screen.getByText('Busca não realizada')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('result-subTitle')).toHaveTextContent('Não foi possível encontrar personagens relacionados à pesquisa!');
    });
  });

  it('should render characters', () => {
    renderCharactersTable(false, false, () => {}, characters);

    const table = screen.getByTestId('characterTable');
    expect(table).toBeInTheDocument();

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });
});