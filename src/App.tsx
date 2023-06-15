import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((product1, product2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return product1.localeCompare(product2);

      case SortType.LENGTH:
        return product1.length - product2.length;

      default: return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  reverse = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByAlphabet = () => (
    this.setState({ sortType: SortType.ALPHABET })
  );

  sortByLength = () => (
    this.setState({ sortType: SortType.LENGTH })
  );

  resetSorting = () => (
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    })
  );

  render(): React.ReactNode {
    const { isReversed, sortType } = this.state;
    const reorderedGoods = getReorderedGoods(goodsFromServer, {
      sortType, isReversed,
    });
    const isSorted = sortType !== SortType.NONE || isReversed === true;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })}
            onClick={this.sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': isReversed !== true,
            })}
            onClick={this.reverse}
          >
            Reverse
          </button>

          { isSorted
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetSorting}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {reorderedGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    );
  }
}
