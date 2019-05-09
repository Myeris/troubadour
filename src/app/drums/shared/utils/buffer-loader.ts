export class BufferLoader {
  public bufferList: any[];
  private context: any;
  private urlList: any;
  private onload: any;
  private loadCount: number;

  constructor(context: any, urlList: string[], callback: any) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  public loadBuffer(url: string, index: number): void {
    const request = new XMLHttpRequest();
    const loader = this;
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      loader.context.decodeAudioData(
        request.response,
        (buffer: Buffer) => {
          if (!buffer) {
            throw new Error(`Error decoding file data: ${url}`);
          }

          loader.bufferList[index] = buffer;
          if (loader.loadCount++ === loader.urlList.length) {
            loader.onload(loader.bufferList);
          }
        },
        (error: any) => {
          throw new Error(`decodeAudioData error: ${error}`);
        }
      );
    };

    request.onerror = () => {
      throw new Error('BufferLoader: XHR error');
    };

    request.send();
  }

  public load(): void {
    for (let i = 0; i < this.urlList.length; i++) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}
