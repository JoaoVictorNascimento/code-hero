import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CharacterItem from './CharacterItem';
import { CharacterType } from '../../../types/CharacterItem';
import { MediaType } from '../../../types/MediaItem';

const mockCharacter: CharacterType = {
  id: 1,
  name: 'Spider-Man',
  thumbnail: {
    path: 'http://example.com/spiderman',
    extension: 'jpg',
  },
  series: {
    items: [
      { name: 'Series 1', resourceURI: 'http://example.com/series1', available: 3, returned: 3 },
    ],
  },
  events: {
    items: [
      { name: 'Event 1', resourceURI: 'http://example.com/event1', available: 3 },
    ],
  },
};

const emptyItems: MediaType[] = [];

describe('CharacterItem', () => {
  it('should render character information correctly', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <CharacterItem
        onClickTableRow={() => {}}
        {...mockCharacter}
      />
    );

    expect(getByTestId('characterItem-1')).toBeInTheDocument();
    expect(getByAltText('Spider-Man')).toBeInTheDocument();
    expect(getByText('Spider-Man')).toBeInTheDocument();
    expect(getByText('Series 1')).toBeInTheDocument();
    expect(getByText('Event 1')).toBeInTheDocument();
  });

  it('should call onClickTableRow when row is clicked', () => {
    const onClickTableRowMock = jest.fn();
    const { getByTestId } = render(
      <CharacterItem
        onClickTableRow={onClickTableRowMock}
        {...mockCharacter}
      />
    );

    fireEvent.click(getByTestId('characterItem-1'));
    expect(onClickTableRowMock).toHaveBeenCalledWith(1, 'Spider-Man', mockCharacter.thumbnail);
  });

  it('should display "Não possui séries" when there are no series', () => {
    const characterWithoutSeries = { ...mockCharacter, series: { items: emptyItems } };
    const { getByText } = render(
      <CharacterItem
        onClickTableRow={() => {}}
        {...characterWithoutSeries}
      />
    );

    expect(getByText('Não possui séries')).toBeInTheDocument();
  });

  it('should display "Não possui eventos" when there are no events', () => {
    const characterWithoutEvents = { ...mockCharacter, events: { items: emptyItems } };
    const { getByText } = render(
      <CharacterItem
        onClickTableRow={() => {}}
        {...characterWithoutEvents}
      />
    );

    expect(getByText('Não possui eventos')).toBeInTheDocument();
  });
});