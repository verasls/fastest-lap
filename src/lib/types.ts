export type TupleOfLength<
  T,
  N extends number,
  R extends any[] = [],
> = R["length"] extends N ? R : TupleOfLength<T, N, [T, ...R]>;
