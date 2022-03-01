import './../src/module'

declare module '../src/module' {
 interface AlgoliaIndices {
     coolIndex: {
         foo: string
         bar: number
     }
 }
}
