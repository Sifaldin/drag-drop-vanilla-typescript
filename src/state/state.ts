type Listener<T> = (items: T[]) => void;

export class State<T> {
  protected listners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listners.push(listenerFn);
  }
}
