declare module "comlink-loader?singleton=true!./sketchpad" {
  export const execute: ({
    typeDefs,
    query,
    mocks,
  }: {
    typeDefs: string;
    query: string;
    mocks: string;
  }) => Promise<any>;
}
