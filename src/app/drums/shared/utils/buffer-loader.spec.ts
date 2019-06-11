import { BufferLoader } from './buffer-loader';

describe('BufferLoader', () => {
  const buffer: BufferLoader = new BufferLoader(new AudioContext(), ['1', '2', '3'], () => true);

  describe('loadBuffer', () => {
    // TODO
  });

  describe('load', () => {
    it('should should call loadBuffer', () => {
      spyOn(buffer, 'loadBuffer').and.callFake(() => true);
      buffer.load();
      expect(buffer.loadBuffer).toHaveBeenCalledTimes(3);
    });
  });
});
