declare module "comlink-loader?singleton=true!./sketchpad" {
  export const execute: ({
    typeDefs,
    query,
  }: {
    typeDefs: string;
    query: string;
  }) => Promise<any>;
}
