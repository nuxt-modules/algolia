import './../src/module'

declare module '../src/module' {
 interface AlgoliaIndices {
     test_index: {
         foo: string
         bar: number
     }
 }
}
