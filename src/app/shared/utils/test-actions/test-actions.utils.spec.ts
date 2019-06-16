import { getActions, TestActions } from './test-actions.utils';

describe('getActions', () => {
  it('should return a new TestActions', () => {
    expect(getActions()).toEqual(new TestActions());
  });
});
