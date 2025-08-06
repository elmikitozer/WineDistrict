
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Caviste
 * 
 */
export type Caviste = $Result.DefaultSelection<Prisma.$CavistePayload>
/**
 * Model Vin
 * 
 */
export type Vin = $Result.DefaultSelection<Prisma.$VinPayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cavistes
 * const cavistes = await prisma.caviste.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cavistes
   * const cavistes = await prisma.caviste.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.caviste`: Exposes CRUD operations for the **Caviste** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cavistes
    * const cavistes = await prisma.caviste.findMany()
    * ```
    */
  get caviste(): Prisma.CavisteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vin`: Exposes CRUD operations for the **Vin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vins
    * const vins = await prisma.vin.findMany()
    * ```
    */
  get vin(): Prisma.VinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Caviste: 'Caviste',
    Vin: 'Vin',
    Stock: 'Stock'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "caviste" | "vin" | "stock"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Caviste: {
        payload: Prisma.$CavistePayload<ExtArgs>
        fields: Prisma.CavisteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CavisteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CavisteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          findFirst: {
            args: Prisma.CavisteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CavisteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          findMany: {
            args: Prisma.CavisteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>[]
          }
          create: {
            args: Prisma.CavisteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          createMany: {
            args: Prisma.CavisteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CavisteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>[]
          }
          delete: {
            args: Prisma.CavisteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          update: {
            args: Prisma.CavisteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          deleteMany: {
            args: Prisma.CavisteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CavisteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CavisteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>[]
          }
          upsert: {
            args: Prisma.CavisteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CavistePayload>
          }
          aggregate: {
            args: Prisma.CavisteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaviste>
          }
          groupBy: {
            args: Prisma.CavisteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CavisteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CavisteCountArgs<ExtArgs>
            result: $Utils.Optional<CavisteCountAggregateOutputType> | number
          }
        }
      }
      Vin: {
        payload: Prisma.$VinPayload<ExtArgs>
        fields: Prisma.VinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          findFirst: {
            args: Prisma.VinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          findMany: {
            args: Prisma.VinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>[]
          }
          create: {
            args: Prisma.VinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          createMany: {
            args: Prisma.VinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>[]
          }
          delete: {
            args: Prisma.VinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          update: {
            args: Prisma.VinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          deleteMany: {
            args: Prisma.VinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>[]
          }
          upsert: {
            args: Prisma.VinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinPayload>
          }
          aggregate: {
            args: Prisma.VinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVin>
          }
          groupBy: {
            args: Prisma.VinGroupByArgs<ExtArgs>
            result: $Utils.Optional<VinGroupByOutputType>[]
          }
          count: {
            args: Prisma.VinCountArgs<ExtArgs>
            result: $Utils.Optional<VinCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    caviste?: CavisteOmit
    vin?: VinOmit
    stock?: StockOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CavisteCountOutputType
   */

  export type CavisteCountOutputType = {
    vins: number
  }

  export type CavisteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vins?: boolean | CavisteCountOutputTypeCountVinsArgs
  }

  // Custom InputTypes
  /**
   * CavisteCountOutputType without action
   */
  export type CavisteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CavisteCountOutputType
     */
    select?: CavisteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CavisteCountOutputType without action
   */
  export type CavisteCountOutputTypeCountVinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }


  /**
   * Count Type VinCountOutputType
   */

  export type VinCountOutputType = {
    stocks: number
  }

  export type VinCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stocks?: boolean | VinCountOutputTypeCountStocksArgs
  }

  // Custom InputTypes
  /**
   * VinCountOutputType without action
   */
  export type VinCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VinCountOutputType
     */
    select?: VinCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VinCountOutputType without action
   */
  export type VinCountOutputTypeCountStocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Caviste
   */

  export type AggregateCaviste = {
    _count: CavisteCountAggregateOutputType | null
    _avg: CavisteAvgAggregateOutputType | null
    _sum: CavisteSumAggregateOutputType | null
    _min: CavisteMinAggregateOutputType | null
    _max: CavisteMaxAggregateOutputType | null
  }

  export type CavisteAvgAggregateOutputType = {
    id: number | null
  }

  export type CavisteSumAggregateOutputType = {
    id: number | null
  }

  export type CavisteMinAggregateOutputType = {
    id: number | null
    nom: string | null
    adresse: string | null
  }

  export type CavisteMaxAggregateOutputType = {
    id: number | null
    nom: string | null
    adresse: string | null
  }

  export type CavisteCountAggregateOutputType = {
    id: number
    nom: number
    adresse: number
    _all: number
  }


  export type CavisteAvgAggregateInputType = {
    id?: true
  }

  export type CavisteSumAggregateInputType = {
    id?: true
  }

  export type CavisteMinAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
  }

  export type CavisteMaxAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
  }

  export type CavisteCountAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    _all?: true
  }

  export type CavisteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Caviste to aggregate.
     */
    where?: CavisteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cavistes to fetch.
     */
    orderBy?: CavisteOrderByWithRelationInput | CavisteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CavisteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cavistes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cavistes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cavistes
    **/
    _count?: true | CavisteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CavisteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CavisteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CavisteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CavisteMaxAggregateInputType
  }

  export type GetCavisteAggregateType<T extends CavisteAggregateArgs> = {
        [P in keyof T & keyof AggregateCaviste]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaviste[P]>
      : GetScalarType<T[P], AggregateCaviste[P]>
  }




  export type CavisteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CavisteWhereInput
    orderBy?: CavisteOrderByWithAggregationInput | CavisteOrderByWithAggregationInput[]
    by: CavisteScalarFieldEnum[] | CavisteScalarFieldEnum
    having?: CavisteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CavisteCountAggregateInputType | true
    _avg?: CavisteAvgAggregateInputType
    _sum?: CavisteSumAggregateInputType
    _min?: CavisteMinAggregateInputType
    _max?: CavisteMaxAggregateInputType
  }

  export type CavisteGroupByOutputType = {
    id: number
    nom: string
    adresse: string
    _count: CavisteCountAggregateOutputType | null
    _avg: CavisteAvgAggregateOutputType | null
    _sum: CavisteSumAggregateOutputType | null
    _min: CavisteMinAggregateOutputType | null
    _max: CavisteMaxAggregateOutputType | null
  }

  type GetCavisteGroupByPayload<T extends CavisteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CavisteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CavisteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CavisteGroupByOutputType[P]>
            : GetScalarType<T[P], CavisteGroupByOutputType[P]>
        }
      >
    >


  export type CavisteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    vins?: boolean | Caviste$vinsArgs<ExtArgs>
    _count?: boolean | CavisteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caviste"]>

  export type CavisteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
  }, ExtArgs["result"]["caviste"]>

  export type CavisteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
  }, ExtArgs["result"]["caviste"]>

  export type CavisteSelectScalar = {
    id?: boolean
    nom?: boolean
    adresse?: boolean
  }

  export type CavisteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "adresse", ExtArgs["result"]["caviste"]>
  export type CavisteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vins?: boolean | Caviste$vinsArgs<ExtArgs>
    _count?: boolean | CavisteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CavisteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CavisteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CavistePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Caviste"
    objects: {
      vins: Prisma.$StockPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nom: string
      adresse: string
    }, ExtArgs["result"]["caviste"]>
    composites: {}
  }

  type CavisteGetPayload<S extends boolean | null | undefined | CavisteDefaultArgs> = $Result.GetResult<Prisma.$CavistePayload, S>

  type CavisteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CavisteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CavisteCountAggregateInputType | true
    }

  export interface CavisteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Caviste'], meta: { name: 'Caviste' } }
    /**
     * Find zero or one Caviste that matches the filter.
     * @param {CavisteFindUniqueArgs} args - Arguments to find a Caviste
     * @example
     * // Get one Caviste
     * const caviste = await prisma.caviste.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CavisteFindUniqueArgs>(args: SelectSubset<T, CavisteFindUniqueArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Caviste that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CavisteFindUniqueOrThrowArgs} args - Arguments to find a Caviste
     * @example
     * // Get one Caviste
     * const caviste = await prisma.caviste.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CavisteFindUniqueOrThrowArgs>(args: SelectSubset<T, CavisteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Caviste that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteFindFirstArgs} args - Arguments to find a Caviste
     * @example
     * // Get one Caviste
     * const caviste = await prisma.caviste.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CavisteFindFirstArgs>(args?: SelectSubset<T, CavisteFindFirstArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Caviste that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteFindFirstOrThrowArgs} args - Arguments to find a Caviste
     * @example
     * // Get one Caviste
     * const caviste = await prisma.caviste.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CavisteFindFirstOrThrowArgs>(args?: SelectSubset<T, CavisteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cavistes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cavistes
     * const cavistes = await prisma.caviste.findMany()
     * 
     * // Get first 10 Cavistes
     * const cavistes = await prisma.caviste.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cavisteWithIdOnly = await prisma.caviste.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CavisteFindManyArgs>(args?: SelectSubset<T, CavisteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Caviste.
     * @param {CavisteCreateArgs} args - Arguments to create a Caviste.
     * @example
     * // Create one Caviste
     * const Caviste = await prisma.caviste.create({
     *   data: {
     *     // ... data to create a Caviste
     *   }
     * })
     * 
     */
    create<T extends CavisteCreateArgs>(args: SelectSubset<T, CavisteCreateArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cavistes.
     * @param {CavisteCreateManyArgs} args - Arguments to create many Cavistes.
     * @example
     * // Create many Cavistes
     * const caviste = await prisma.caviste.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CavisteCreateManyArgs>(args?: SelectSubset<T, CavisteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cavistes and returns the data saved in the database.
     * @param {CavisteCreateManyAndReturnArgs} args - Arguments to create many Cavistes.
     * @example
     * // Create many Cavistes
     * const caviste = await prisma.caviste.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cavistes and only return the `id`
     * const cavisteWithIdOnly = await prisma.caviste.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CavisteCreateManyAndReturnArgs>(args?: SelectSubset<T, CavisteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Caviste.
     * @param {CavisteDeleteArgs} args - Arguments to delete one Caviste.
     * @example
     * // Delete one Caviste
     * const Caviste = await prisma.caviste.delete({
     *   where: {
     *     // ... filter to delete one Caviste
     *   }
     * })
     * 
     */
    delete<T extends CavisteDeleteArgs>(args: SelectSubset<T, CavisteDeleteArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Caviste.
     * @param {CavisteUpdateArgs} args - Arguments to update one Caviste.
     * @example
     * // Update one Caviste
     * const caviste = await prisma.caviste.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CavisteUpdateArgs>(args: SelectSubset<T, CavisteUpdateArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cavistes.
     * @param {CavisteDeleteManyArgs} args - Arguments to filter Cavistes to delete.
     * @example
     * // Delete a few Cavistes
     * const { count } = await prisma.caviste.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CavisteDeleteManyArgs>(args?: SelectSubset<T, CavisteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cavistes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cavistes
     * const caviste = await prisma.caviste.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CavisteUpdateManyArgs>(args: SelectSubset<T, CavisteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cavistes and returns the data updated in the database.
     * @param {CavisteUpdateManyAndReturnArgs} args - Arguments to update many Cavistes.
     * @example
     * // Update many Cavistes
     * const caviste = await prisma.caviste.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cavistes and only return the `id`
     * const cavisteWithIdOnly = await prisma.caviste.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CavisteUpdateManyAndReturnArgs>(args: SelectSubset<T, CavisteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Caviste.
     * @param {CavisteUpsertArgs} args - Arguments to update or create a Caviste.
     * @example
     * // Update or create a Caviste
     * const caviste = await prisma.caviste.upsert({
     *   create: {
     *     // ... data to create a Caviste
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Caviste we want to update
     *   }
     * })
     */
    upsert<T extends CavisteUpsertArgs>(args: SelectSubset<T, CavisteUpsertArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cavistes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteCountArgs} args - Arguments to filter Cavistes to count.
     * @example
     * // Count the number of Cavistes
     * const count = await prisma.caviste.count({
     *   where: {
     *     // ... the filter for the Cavistes we want to count
     *   }
     * })
    **/
    count<T extends CavisteCountArgs>(
      args?: Subset<T, CavisteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CavisteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Caviste.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CavisteAggregateArgs>(args: Subset<T, CavisteAggregateArgs>): Prisma.PrismaPromise<GetCavisteAggregateType<T>>

    /**
     * Group by Caviste.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CavisteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CavisteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CavisteGroupByArgs['orderBy'] }
        : { orderBy?: CavisteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CavisteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCavisteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Caviste model
   */
  readonly fields: CavisteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Caviste.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CavisteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vins<T extends Caviste$vinsArgs<ExtArgs> = {}>(args?: Subset<T, Caviste$vinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Caviste model
   */
  interface CavisteFieldRefs {
    readonly id: FieldRef<"Caviste", 'Int'>
    readonly nom: FieldRef<"Caviste", 'String'>
    readonly adresse: FieldRef<"Caviste", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Caviste findUnique
   */
  export type CavisteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter, which Caviste to fetch.
     */
    where: CavisteWhereUniqueInput
  }

  /**
   * Caviste findUniqueOrThrow
   */
  export type CavisteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter, which Caviste to fetch.
     */
    where: CavisteWhereUniqueInput
  }

  /**
   * Caviste findFirst
   */
  export type CavisteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter, which Caviste to fetch.
     */
    where?: CavisteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cavistes to fetch.
     */
    orderBy?: CavisteOrderByWithRelationInput | CavisteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cavistes.
     */
    cursor?: CavisteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cavistes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cavistes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cavistes.
     */
    distinct?: CavisteScalarFieldEnum | CavisteScalarFieldEnum[]
  }

  /**
   * Caviste findFirstOrThrow
   */
  export type CavisteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter, which Caviste to fetch.
     */
    where?: CavisteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cavistes to fetch.
     */
    orderBy?: CavisteOrderByWithRelationInput | CavisteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cavistes.
     */
    cursor?: CavisteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cavistes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cavistes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cavistes.
     */
    distinct?: CavisteScalarFieldEnum | CavisteScalarFieldEnum[]
  }

  /**
   * Caviste findMany
   */
  export type CavisteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter, which Cavistes to fetch.
     */
    where?: CavisteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cavistes to fetch.
     */
    orderBy?: CavisteOrderByWithRelationInput | CavisteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cavistes.
     */
    cursor?: CavisteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cavistes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cavistes.
     */
    skip?: number
    distinct?: CavisteScalarFieldEnum | CavisteScalarFieldEnum[]
  }

  /**
   * Caviste create
   */
  export type CavisteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * The data needed to create a Caviste.
     */
    data: XOR<CavisteCreateInput, CavisteUncheckedCreateInput>
  }

  /**
   * Caviste createMany
   */
  export type CavisteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cavistes.
     */
    data: CavisteCreateManyInput | CavisteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Caviste createManyAndReturn
   */
  export type CavisteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * The data used to create many Cavistes.
     */
    data: CavisteCreateManyInput | CavisteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Caviste update
   */
  export type CavisteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * The data needed to update a Caviste.
     */
    data: XOR<CavisteUpdateInput, CavisteUncheckedUpdateInput>
    /**
     * Choose, which Caviste to update.
     */
    where: CavisteWhereUniqueInput
  }

  /**
   * Caviste updateMany
   */
  export type CavisteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cavistes.
     */
    data: XOR<CavisteUpdateManyMutationInput, CavisteUncheckedUpdateManyInput>
    /**
     * Filter which Cavistes to update
     */
    where?: CavisteWhereInput
    /**
     * Limit how many Cavistes to update.
     */
    limit?: number
  }

  /**
   * Caviste updateManyAndReturn
   */
  export type CavisteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * The data used to update Cavistes.
     */
    data: XOR<CavisteUpdateManyMutationInput, CavisteUncheckedUpdateManyInput>
    /**
     * Filter which Cavistes to update
     */
    where?: CavisteWhereInput
    /**
     * Limit how many Cavistes to update.
     */
    limit?: number
  }

  /**
   * Caviste upsert
   */
  export type CavisteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * The filter to search for the Caviste to update in case it exists.
     */
    where: CavisteWhereUniqueInput
    /**
     * In case the Caviste found by the `where` argument doesn't exist, create a new Caviste with this data.
     */
    create: XOR<CavisteCreateInput, CavisteUncheckedCreateInput>
    /**
     * In case the Caviste was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CavisteUpdateInput, CavisteUncheckedUpdateInput>
  }

  /**
   * Caviste delete
   */
  export type CavisteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
    /**
     * Filter which Caviste to delete.
     */
    where: CavisteWhereUniqueInput
  }

  /**
   * Caviste deleteMany
   */
  export type CavisteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cavistes to delete
     */
    where?: CavisteWhereInput
    /**
     * Limit how many Cavistes to delete.
     */
    limit?: number
  }

  /**
   * Caviste.vins
   */
  export type Caviste$vinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Caviste without action
   */
  export type CavisteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caviste
     */
    select?: CavisteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caviste
     */
    omit?: CavisteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CavisteInclude<ExtArgs> | null
  }


  /**
   * Model Vin
   */

  export type AggregateVin = {
    _count: VinCountAggregateOutputType | null
    _avg: VinAvgAggregateOutputType | null
    _sum: VinSumAggregateOutputType | null
    _min: VinMinAggregateOutputType | null
    _max: VinMaxAggregateOutputType | null
  }

  export type VinAvgAggregateOutputType = {
    id: number | null
    année: number | null
    prix: number | null
  }

  export type VinSumAggregateOutputType = {
    id: number | null
    année: number | null
    prix: number | null
  }

  export type VinMinAggregateOutputType = {
    id: number | null
    nom: string | null
    domaine: string | null
    année: number | null
    prix: number | null
  }

  export type VinMaxAggregateOutputType = {
    id: number | null
    nom: string | null
    domaine: string | null
    année: number | null
    prix: number | null
  }

  export type VinCountAggregateOutputType = {
    id: number
    nom: number
    domaine: number
    année: number
    prix: number
    _all: number
  }


  export type VinAvgAggregateInputType = {
    id?: true
    année?: true
    prix?: true
  }

  export type VinSumAggregateInputType = {
    id?: true
    année?: true
    prix?: true
  }

  export type VinMinAggregateInputType = {
    id?: true
    nom?: true
    domaine?: true
    année?: true
    prix?: true
  }

  export type VinMaxAggregateInputType = {
    id?: true
    nom?: true
    domaine?: true
    année?: true
    prix?: true
  }

  export type VinCountAggregateInputType = {
    id?: true
    nom?: true
    domaine?: true
    année?: true
    prix?: true
    _all?: true
  }

  export type VinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vin to aggregate.
     */
    where?: VinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vins to fetch.
     */
    orderBy?: VinOrderByWithRelationInput | VinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vins
    **/
    _count?: true | VinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VinMaxAggregateInputType
  }

  export type GetVinAggregateType<T extends VinAggregateArgs> = {
        [P in keyof T & keyof AggregateVin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVin[P]>
      : GetScalarType<T[P], AggregateVin[P]>
  }




  export type VinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VinWhereInput
    orderBy?: VinOrderByWithAggregationInput | VinOrderByWithAggregationInput[]
    by: VinScalarFieldEnum[] | VinScalarFieldEnum
    having?: VinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VinCountAggregateInputType | true
    _avg?: VinAvgAggregateInputType
    _sum?: VinSumAggregateInputType
    _min?: VinMinAggregateInputType
    _max?: VinMaxAggregateInputType
  }

  export type VinGroupByOutputType = {
    id: number
    nom: string
    domaine: string
    année: number
    prix: number
    _count: VinCountAggregateOutputType | null
    _avg: VinAvgAggregateOutputType | null
    _sum: VinSumAggregateOutputType | null
    _min: VinMinAggregateOutputType | null
    _max: VinMaxAggregateOutputType | null
  }

  type GetVinGroupByPayload<T extends VinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VinGroupByOutputType[P]>
            : GetScalarType<T[P], VinGroupByOutputType[P]>
        }
      >
    >


  export type VinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    domaine?: boolean
    année?: boolean
    prix?: boolean
    stocks?: boolean | Vin$stocksArgs<ExtArgs>
    _count?: boolean | VinCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vin"]>

  export type VinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    domaine?: boolean
    année?: boolean
    prix?: boolean
  }, ExtArgs["result"]["vin"]>

  export type VinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    domaine?: boolean
    année?: boolean
    prix?: boolean
  }, ExtArgs["result"]["vin"]>

  export type VinSelectScalar = {
    id?: boolean
    nom?: boolean
    domaine?: boolean
    année?: boolean
    prix?: boolean
  }

  export type VinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "domaine" | "année" | "prix", ExtArgs["result"]["vin"]>
  export type VinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stocks?: boolean | Vin$stocksArgs<ExtArgs>
    _count?: boolean | VinCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vin"
    objects: {
      stocks: Prisma.$StockPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nom: string
      domaine: string
      année: number
      prix: number
    }, ExtArgs["result"]["vin"]>
    composites: {}
  }

  type VinGetPayload<S extends boolean | null | undefined | VinDefaultArgs> = $Result.GetResult<Prisma.$VinPayload, S>

  type VinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VinCountAggregateInputType | true
    }

  export interface VinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vin'], meta: { name: 'Vin' } }
    /**
     * Find zero or one Vin that matches the filter.
     * @param {VinFindUniqueArgs} args - Arguments to find a Vin
     * @example
     * // Get one Vin
     * const vin = await prisma.vin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VinFindUniqueArgs>(args: SelectSubset<T, VinFindUniqueArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VinFindUniqueOrThrowArgs} args - Arguments to find a Vin
     * @example
     * // Get one Vin
     * const vin = await prisma.vin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VinFindUniqueOrThrowArgs>(args: SelectSubset<T, VinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinFindFirstArgs} args - Arguments to find a Vin
     * @example
     * // Get one Vin
     * const vin = await prisma.vin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VinFindFirstArgs>(args?: SelectSubset<T, VinFindFirstArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinFindFirstOrThrowArgs} args - Arguments to find a Vin
     * @example
     * // Get one Vin
     * const vin = await prisma.vin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VinFindFirstOrThrowArgs>(args?: SelectSubset<T, VinFindFirstOrThrowArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vins
     * const vins = await prisma.vin.findMany()
     * 
     * // Get first 10 Vins
     * const vins = await prisma.vin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vinWithIdOnly = await prisma.vin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VinFindManyArgs>(args?: SelectSubset<T, VinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vin.
     * @param {VinCreateArgs} args - Arguments to create a Vin.
     * @example
     * // Create one Vin
     * const Vin = await prisma.vin.create({
     *   data: {
     *     // ... data to create a Vin
     *   }
     * })
     * 
     */
    create<T extends VinCreateArgs>(args: SelectSubset<T, VinCreateArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vins.
     * @param {VinCreateManyArgs} args - Arguments to create many Vins.
     * @example
     * // Create many Vins
     * const vin = await prisma.vin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VinCreateManyArgs>(args?: SelectSubset<T, VinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vins and returns the data saved in the database.
     * @param {VinCreateManyAndReturnArgs} args - Arguments to create many Vins.
     * @example
     * // Create many Vins
     * const vin = await prisma.vin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vins and only return the `id`
     * const vinWithIdOnly = await prisma.vin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VinCreateManyAndReturnArgs>(args?: SelectSubset<T, VinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vin.
     * @param {VinDeleteArgs} args - Arguments to delete one Vin.
     * @example
     * // Delete one Vin
     * const Vin = await prisma.vin.delete({
     *   where: {
     *     // ... filter to delete one Vin
     *   }
     * })
     * 
     */
    delete<T extends VinDeleteArgs>(args: SelectSubset<T, VinDeleteArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vin.
     * @param {VinUpdateArgs} args - Arguments to update one Vin.
     * @example
     * // Update one Vin
     * const vin = await prisma.vin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VinUpdateArgs>(args: SelectSubset<T, VinUpdateArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vins.
     * @param {VinDeleteManyArgs} args - Arguments to filter Vins to delete.
     * @example
     * // Delete a few Vins
     * const { count } = await prisma.vin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VinDeleteManyArgs>(args?: SelectSubset<T, VinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vins
     * const vin = await prisma.vin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VinUpdateManyArgs>(args: SelectSubset<T, VinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vins and returns the data updated in the database.
     * @param {VinUpdateManyAndReturnArgs} args - Arguments to update many Vins.
     * @example
     * // Update many Vins
     * const vin = await prisma.vin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vins and only return the `id`
     * const vinWithIdOnly = await prisma.vin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VinUpdateManyAndReturnArgs>(args: SelectSubset<T, VinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vin.
     * @param {VinUpsertArgs} args - Arguments to update or create a Vin.
     * @example
     * // Update or create a Vin
     * const vin = await prisma.vin.upsert({
     *   create: {
     *     // ... data to create a Vin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vin we want to update
     *   }
     * })
     */
    upsert<T extends VinUpsertArgs>(args: SelectSubset<T, VinUpsertArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinCountArgs} args - Arguments to filter Vins to count.
     * @example
     * // Count the number of Vins
     * const count = await prisma.vin.count({
     *   where: {
     *     // ... the filter for the Vins we want to count
     *   }
     * })
    **/
    count<T extends VinCountArgs>(
      args?: Subset<T, VinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VinAggregateArgs>(args: Subset<T, VinAggregateArgs>): Prisma.PrismaPromise<GetVinAggregateType<T>>

    /**
     * Group by Vin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VinGroupByArgs['orderBy'] }
        : { orderBy?: VinGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vin model
   */
  readonly fields: VinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stocks<T extends Vin$stocksArgs<ExtArgs> = {}>(args?: Subset<T, Vin$stocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vin model
   */
  interface VinFieldRefs {
    readonly id: FieldRef<"Vin", 'Int'>
    readonly nom: FieldRef<"Vin", 'String'>
    readonly domaine: FieldRef<"Vin", 'String'>
    readonly année: FieldRef<"Vin", 'Int'>
    readonly prix: FieldRef<"Vin", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Vin findUnique
   */
  export type VinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter, which Vin to fetch.
     */
    where: VinWhereUniqueInput
  }

  /**
   * Vin findUniqueOrThrow
   */
  export type VinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter, which Vin to fetch.
     */
    where: VinWhereUniqueInput
  }

  /**
   * Vin findFirst
   */
  export type VinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter, which Vin to fetch.
     */
    where?: VinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vins to fetch.
     */
    orderBy?: VinOrderByWithRelationInput | VinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vins.
     */
    cursor?: VinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vins.
     */
    distinct?: VinScalarFieldEnum | VinScalarFieldEnum[]
  }

  /**
   * Vin findFirstOrThrow
   */
  export type VinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter, which Vin to fetch.
     */
    where?: VinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vins to fetch.
     */
    orderBy?: VinOrderByWithRelationInput | VinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vins.
     */
    cursor?: VinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vins.
     */
    distinct?: VinScalarFieldEnum | VinScalarFieldEnum[]
  }

  /**
   * Vin findMany
   */
  export type VinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter, which Vins to fetch.
     */
    where?: VinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vins to fetch.
     */
    orderBy?: VinOrderByWithRelationInput | VinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vins.
     */
    cursor?: VinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vins.
     */
    skip?: number
    distinct?: VinScalarFieldEnum | VinScalarFieldEnum[]
  }

  /**
   * Vin create
   */
  export type VinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * The data needed to create a Vin.
     */
    data: XOR<VinCreateInput, VinUncheckedCreateInput>
  }

  /**
   * Vin createMany
   */
  export type VinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vins.
     */
    data: VinCreateManyInput | VinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vin createManyAndReturn
   */
  export type VinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * The data used to create many Vins.
     */
    data: VinCreateManyInput | VinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vin update
   */
  export type VinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * The data needed to update a Vin.
     */
    data: XOR<VinUpdateInput, VinUncheckedUpdateInput>
    /**
     * Choose, which Vin to update.
     */
    where: VinWhereUniqueInput
  }

  /**
   * Vin updateMany
   */
  export type VinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vins.
     */
    data: XOR<VinUpdateManyMutationInput, VinUncheckedUpdateManyInput>
    /**
     * Filter which Vins to update
     */
    where?: VinWhereInput
    /**
     * Limit how many Vins to update.
     */
    limit?: number
  }

  /**
   * Vin updateManyAndReturn
   */
  export type VinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * The data used to update Vins.
     */
    data: XOR<VinUpdateManyMutationInput, VinUncheckedUpdateManyInput>
    /**
     * Filter which Vins to update
     */
    where?: VinWhereInput
    /**
     * Limit how many Vins to update.
     */
    limit?: number
  }

  /**
   * Vin upsert
   */
  export type VinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * The filter to search for the Vin to update in case it exists.
     */
    where: VinWhereUniqueInput
    /**
     * In case the Vin found by the `where` argument doesn't exist, create a new Vin with this data.
     */
    create: XOR<VinCreateInput, VinUncheckedCreateInput>
    /**
     * In case the Vin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VinUpdateInput, VinUncheckedUpdateInput>
  }

  /**
   * Vin delete
   */
  export type VinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
    /**
     * Filter which Vin to delete.
     */
    where: VinWhereUniqueInput
  }

  /**
   * Vin deleteMany
   */
  export type VinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vins to delete
     */
    where?: VinWhereInput
    /**
     * Limit how many Vins to delete.
     */
    limit?: number
  }

  /**
   * Vin.stocks
   */
  export type Vin$stocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Vin without action
   */
  export type VinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vin
     */
    select?: VinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vin
     */
    omit?: VinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    id: number | null
    cavisteId: number | null
    vinId: number | null
    quantite: number | null
  }

  export type StockSumAggregateOutputType = {
    id: number | null
    cavisteId: number | null
    vinId: number | null
    quantite: number | null
  }

  export type StockMinAggregateOutputType = {
    id: number | null
    cavisteId: number | null
    vinId: number | null
    quantite: number | null
  }

  export type StockMaxAggregateOutputType = {
    id: number | null
    cavisteId: number | null
    vinId: number | null
    quantite: number | null
  }

  export type StockCountAggregateOutputType = {
    id: number
    cavisteId: number
    vinId: number
    quantite: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    id?: true
    cavisteId?: true
    vinId?: true
    quantite?: true
  }

  export type StockSumAggregateInputType = {
    id?: true
    cavisteId?: true
    vinId?: true
    quantite?: true
  }

  export type StockMinAggregateInputType = {
    id?: true
    cavisteId?: true
    vinId?: true
    quantite?: true
  }

  export type StockMaxAggregateInputType = {
    id?: true
    cavisteId?: true
    vinId?: true
    quantite?: true
  }

  export type StockCountAggregateInputType = {
    id?: true
    cavisteId?: true
    vinId?: true
    quantite?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    id: number
    cavisteId: number
    vinId: number
    quantite: number
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cavisteId?: boolean
    vinId?: boolean
    quantite?: boolean
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cavisteId?: boolean
    vinId?: boolean
    quantite?: boolean
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cavisteId?: boolean
    vinId?: boolean
    quantite?: boolean
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    id?: boolean
    cavisteId?: boolean
    vinId?: boolean
    quantite?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cavisteId" | "vinId" | "quantite", ExtArgs["result"]["stock"]>
  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }
  export type StockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caviste?: boolean | CavisteDefaultArgs<ExtArgs>
    vin?: boolean | VinDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      caviste: Prisma.$CavistePayload<ExtArgs>
      vin: Prisma.$VinPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cavisteId: number
      vinId: number
      quantite: number
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockWithIdOnly = await prisma.stock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks and returns the data updated in the database.
     * @param {StockUpdateManyAndReturnArgs} args - Arguments to update many Stocks.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockUpdateManyAndReturnArgs>(args: SelectSubset<T, StockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    caviste<T extends CavisteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CavisteDefaultArgs<ExtArgs>>): Prisma__CavisteClient<$Result.GetResult<Prisma.$CavistePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vin<T extends VinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VinDefaultArgs<ExtArgs>>): Prisma__VinClient<$Result.GetResult<Prisma.$VinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly id: FieldRef<"Stock", 'Int'>
    readonly cavisteId: FieldRef<"Stock", 'Int'>
    readonly vinId: FieldRef<"Stock", 'Int'>
    readonly quantite: FieldRef<"Stock", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock updateManyAndReturn
   */
  export type StockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CavisteScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    adresse: 'adresse'
  };

  export type CavisteScalarFieldEnum = (typeof CavisteScalarFieldEnum)[keyof typeof CavisteScalarFieldEnum]


  export const VinScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    domaine: 'domaine',
    année: 'année',
    prix: 'prix'
  };

  export type VinScalarFieldEnum = (typeof VinScalarFieldEnum)[keyof typeof VinScalarFieldEnum]


  export const StockScalarFieldEnum: {
    id: 'id',
    cavisteId: 'cavisteId',
    vinId: 'vinId',
    quantite: 'quantite'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CavisteWhereInput = {
    AND?: CavisteWhereInput | CavisteWhereInput[]
    OR?: CavisteWhereInput[]
    NOT?: CavisteWhereInput | CavisteWhereInput[]
    id?: IntFilter<"Caviste"> | number
    nom?: StringFilter<"Caviste"> | string
    adresse?: StringFilter<"Caviste"> | string
    vins?: StockListRelationFilter
  }

  export type CavisteOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    vins?: StockOrderByRelationAggregateInput
  }

  export type CavisteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CavisteWhereInput | CavisteWhereInput[]
    OR?: CavisteWhereInput[]
    NOT?: CavisteWhereInput | CavisteWhereInput[]
    nom?: StringFilter<"Caviste"> | string
    adresse?: StringFilter<"Caviste"> | string
    vins?: StockListRelationFilter
  }, "id">

  export type CavisteOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    _count?: CavisteCountOrderByAggregateInput
    _avg?: CavisteAvgOrderByAggregateInput
    _max?: CavisteMaxOrderByAggregateInput
    _min?: CavisteMinOrderByAggregateInput
    _sum?: CavisteSumOrderByAggregateInput
  }

  export type CavisteScalarWhereWithAggregatesInput = {
    AND?: CavisteScalarWhereWithAggregatesInput | CavisteScalarWhereWithAggregatesInput[]
    OR?: CavisteScalarWhereWithAggregatesInput[]
    NOT?: CavisteScalarWhereWithAggregatesInput | CavisteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Caviste"> | number
    nom?: StringWithAggregatesFilter<"Caviste"> | string
    adresse?: StringWithAggregatesFilter<"Caviste"> | string
  }

  export type VinWhereInput = {
    AND?: VinWhereInput | VinWhereInput[]
    OR?: VinWhereInput[]
    NOT?: VinWhereInput | VinWhereInput[]
    id?: IntFilter<"Vin"> | number
    nom?: StringFilter<"Vin"> | string
    domaine?: StringFilter<"Vin"> | string
    année?: IntFilter<"Vin"> | number
    prix?: FloatFilter<"Vin"> | number
    stocks?: StockListRelationFilter
  }

  export type VinOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    domaine?: SortOrder
    année?: SortOrder
    prix?: SortOrder
    stocks?: StockOrderByRelationAggregateInput
  }

  export type VinWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VinWhereInput | VinWhereInput[]
    OR?: VinWhereInput[]
    NOT?: VinWhereInput | VinWhereInput[]
    nom?: StringFilter<"Vin"> | string
    domaine?: StringFilter<"Vin"> | string
    année?: IntFilter<"Vin"> | number
    prix?: FloatFilter<"Vin"> | number
    stocks?: StockListRelationFilter
  }, "id">

  export type VinOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    domaine?: SortOrder
    année?: SortOrder
    prix?: SortOrder
    _count?: VinCountOrderByAggregateInput
    _avg?: VinAvgOrderByAggregateInput
    _max?: VinMaxOrderByAggregateInput
    _min?: VinMinOrderByAggregateInput
    _sum?: VinSumOrderByAggregateInput
  }

  export type VinScalarWhereWithAggregatesInput = {
    AND?: VinScalarWhereWithAggregatesInput | VinScalarWhereWithAggregatesInput[]
    OR?: VinScalarWhereWithAggregatesInput[]
    NOT?: VinScalarWhereWithAggregatesInput | VinScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vin"> | number
    nom?: StringWithAggregatesFilter<"Vin"> | string
    domaine?: StringWithAggregatesFilter<"Vin"> | string
    année?: IntWithAggregatesFilter<"Vin"> | number
    prix?: FloatWithAggregatesFilter<"Vin"> | number
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    id?: IntFilter<"Stock"> | number
    cavisteId?: IntFilter<"Stock"> | number
    vinId?: IntFilter<"Stock"> | number
    quantite?: IntFilter<"Stock"> | number
    caviste?: XOR<CavisteScalarRelationFilter, CavisteWhereInput>
    vin?: XOR<VinScalarRelationFilter, VinWhereInput>
  }

  export type StockOrderByWithRelationInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
    caviste?: CavisteOrderByWithRelationInput
    vin?: VinOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    cavisteId?: IntFilter<"Stock"> | number
    vinId?: IntFilter<"Stock"> | number
    quantite?: IntFilter<"Stock"> | number
    caviste?: XOR<CavisteScalarRelationFilter, CavisteWhereInput>
    vin?: XOR<VinScalarRelationFilter, VinWhereInput>
  }, "id">

  export type StockOrderByWithAggregationInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Stock"> | number
    cavisteId?: IntWithAggregatesFilter<"Stock"> | number
    vinId?: IntWithAggregatesFilter<"Stock"> | number
    quantite?: IntWithAggregatesFilter<"Stock"> | number
  }

  export type CavisteCreateInput = {
    nom: string
    adresse: string
    vins?: StockCreateNestedManyWithoutCavisteInput
  }

  export type CavisteUncheckedCreateInput = {
    id?: number
    nom: string
    adresse: string
    vins?: StockUncheckedCreateNestedManyWithoutCavisteInput
  }

  export type CavisteUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    vins?: StockUpdateManyWithoutCavisteNestedInput
  }

  export type CavisteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    vins?: StockUncheckedUpdateManyWithoutCavisteNestedInput
  }

  export type CavisteCreateManyInput = {
    id?: number
    nom: string
    adresse: string
  }

  export type CavisteUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
  }

  export type CavisteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
  }

  export type VinCreateInput = {
    nom: string
    domaine: string
    année: number
    prix: number
    stocks?: StockCreateNestedManyWithoutVinInput
  }

  export type VinUncheckedCreateInput = {
    id?: number
    nom: string
    domaine: string
    année: number
    prix: number
    stocks?: StockUncheckedCreateNestedManyWithoutVinInput
  }

  export type VinUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    stocks?: StockUpdateManyWithoutVinNestedInput
  }

  export type VinUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    stocks?: StockUncheckedUpdateManyWithoutVinNestedInput
  }

  export type VinCreateManyInput = {
    id?: number
    nom: string
    domaine: string
    année: number
    prix: number
  }

  export type VinUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
  }

  export type VinUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
  }

  export type StockCreateInput = {
    quantite: number
    caviste: CavisteCreateNestedOneWithoutVinsInput
    vin: VinCreateNestedOneWithoutStocksInput
  }

  export type StockUncheckedCreateInput = {
    id?: number
    cavisteId: number
    vinId: number
    quantite: number
  }

  export type StockUpdateInput = {
    quantite?: IntFieldUpdateOperationsInput | number
    caviste?: CavisteUpdateOneRequiredWithoutVinsNestedInput
    vin?: VinUpdateOneRequiredWithoutStocksNestedInput
  }

  export type StockUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cavisteId?: IntFieldUpdateOperationsInput | number
    vinId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type StockCreateManyInput = {
    id?: number
    cavisteId: number
    vinId: number
    quantite: number
  }

  export type StockUpdateManyMutationInput = {
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type StockUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cavisteId?: IntFieldUpdateOperationsInput | number
    vinId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StockListRelationFilter = {
    every?: StockWhereInput
    some?: StockWhereInput
    none?: StockWhereInput
  }

  export type StockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CavisteCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
  }

  export type CavisteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CavisteMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
  }

  export type CavisteMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
  }

  export type CavisteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type VinCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    domaine?: SortOrder
    année?: SortOrder
    prix?: SortOrder
  }

  export type VinAvgOrderByAggregateInput = {
    id?: SortOrder
    année?: SortOrder
    prix?: SortOrder
  }

  export type VinMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    domaine?: SortOrder
    année?: SortOrder
    prix?: SortOrder
  }

  export type VinMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    domaine?: SortOrder
    année?: SortOrder
    prix?: SortOrder
  }

  export type VinSumOrderByAggregateInput = {
    id?: SortOrder
    année?: SortOrder
    prix?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CavisteScalarRelationFilter = {
    is?: CavisteWhereInput
    isNot?: CavisteWhereInput
  }

  export type VinScalarRelationFilter = {
    is?: VinWhereInput
    isNot?: VinWhereInput
  }

  export type StockCountOrderByAggregateInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    id?: SortOrder
    cavisteId?: SortOrder
    vinId?: SortOrder
    quantite?: SortOrder
  }

  export type StockCreateNestedManyWithoutCavisteInput = {
    create?: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput> | StockCreateWithoutCavisteInput[] | StockUncheckedCreateWithoutCavisteInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCavisteInput | StockCreateOrConnectWithoutCavisteInput[]
    createMany?: StockCreateManyCavisteInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutCavisteInput = {
    create?: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput> | StockCreateWithoutCavisteInput[] | StockUncheckedCreateWithoutCavisteInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCavisteInput | StockCreateOrConnectWithoutCavisteInput[]
    createMany?: StockCreateManyCavisteInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type StockUpdateManyWithoutCavisteNestedInput = {
    create?: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput> | StockCreateWithoutCavisteInput[] | StockUncheckedCreateWithoutCavisteInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCavisteInput | StockCreateOrConnectWithoutCavisteInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutCavisteInput | StockUpsertWithWhereUniqueWithoutCavisteInput[]
    createMany?: StockCreateManyCavisteInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutCavisteInput | StockUpdateWithWhereUniqueWithoutCavisteInput[]
    updateMany?: StockUpdateManyWithWhereWithoutCavisteInput | StockUpdateManyWithWhereWithoutCavisteInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StockUncheckedUpdateManyWithoutCavisteNestedInput = {
    create?: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput> | StockCreateWithoutCavisteInput[] | StockUncheckedCreateWithoutCavisteInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCavisteInput | StockCreateOrConnectWithoutCavisteInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutCavisteInput | StockUpsertWithWhereUniqueWithoutCavisteInput[]
    createMany?: StockCreateManyCavisteInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutCavisteInput | StockUpdateWithWhereUniqueWithoutCavisteInput[]
    updateMany?: StockUpdateManyWithWhereWithoutCavisteInput | StockUpdateManyWithWhereWithoutCavisteInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type StockCreateNestedManyWithoutVinInput = {
    create?: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput> | StockCreateWithoutVinInput[] | StockUncheckedCreateWithoutVinInput[]
    connectOrCreate?: StockCreateOrConnectWithoutVinInput | StockCreateOrConnectWithoutVinInput[]
    createMany?: StockCreateManyVinInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutVinInput = {
    create?: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput> | StockCreateWithoutVinInput[] | StockUncheckedCreateWithoutVinInput[]
    connectOrCreate?: StockCreateOrConnectWithoutVinInput | StockCreateOrConnectWithoutVinInput[]
    createMany?: StockCreateManyVinInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StockUpdateManyWithoutVinNestedInput = {
    create?: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput> | StockCreateWithoutVinInput[] | StockUncheckedCreateWithoutVinInput[]
    connectOrCreate?: StockCreateOrConnectWithoutVinInput | StockCreateOrConnectWithoutVinInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutVinInput | StockUpsertWithWhereUniqueWithoutVinInput[]
    createMany?: StockCreateManyVinInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutVinInput | StockUpdateWithWhereUniqueWithoutVinInput[]
    updateMany?: StockUpdateManyWithWhereWithoutVinInput | StockUpdateManyWithWhereWithoutVinInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type StockUncheckedUpdateManyWithoutVinNestedInput = {
    create?: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput> | StockCreateWithoutVinInput[] | StockUncheckedCreateWithoutVinInput[]
    connectOrCreate?: StockCreateOrConnectWithoutVinInput | StockCreateOrConnectWithoutVinInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutVinInput | StockUpsertWithWhereUniqueWithoutVinInput[]
    createMany?: StockCreateManyVinInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutVinInput | StockUpdateWithWhereUniqueWithoutVinInput[]
    updateMany?: StockUpdateManyWithWhereWithoutVinInput | StockUpdateManyWithWhereWithoutVinInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type CavisteCreateNestedOneWithoutVinsInput = {
    create?: XOR<CavisteCreateWithoutVinsInput, CavisteUncheckedCreateWithoutVinsInput>
    connectOrCreate?: CavisteCreateOrConnectWithoutVinsInput
    connect?: CavisteWhereUniqueInput
  }

  export type VinCreateNestedOneWithoutStocksInput = {
    create?: XOR<VinCreateWithoutStocksInput, VinUncheckedCreateWithoutStocksInput>
    connectOrCreate?: VinCreateOrConnectWithoutStocksInput
    connect?: VinWhereUniqueInput
  }

  export type CavisteUpdateOneRequiredWithoutVinsNestedInput = {
    create?: XOR<CavisteCreateWithoutVinsInput, CavisteUncheckedCreateWithoutVinsInput>
    connectOrCreate?: CavisteCreateOrConnectWithoutVinsInput
    upsert?: CavisteUpsertWithoutVinsInput
    connect?: CavisteWhereUniqueInput
    update?: XOR<XOR<CavisteUpdateToOneWithWhereWithoutVinsInput, CavisteUpdateWithoutVinsInput>, CavisteUncheckedUpdateWithoutVinsInput>
  }

  export type VinUpdateOneRequiredWithoutStocksNestedInput = {
    create?: XOR<VinCreateWithoutStocksInput, VinUncheckedCreateWithoutStocksInput>
    connectOrCreate?: VinCreateOrConnectWithoutStocksInput
    upsert?: VinUpsertWithoutStocksInput
    connect?: VinWhereUniqueInput
    update?: XOR<XOR<VinUpdateToOneWithWhereWithoutStocksInput, VinUpdateWithoutStocksInput>, VinUncheckedUpdateWithoutStocksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StockCreateWithoutCavisteInput = {
    quantite: number
    vin: VinCreateNestedOneWithoutStocksInput
  }

  export type StockUncheckedCreateWithoutCavisteInput = {
    id?: number
    vinId: number
    quantite: number
  }

  export type StockCreateOrConnectWithoutCavisteInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput>
  }

  export type StockCreateManyCavisteInputEnvelope = {
    data: StockCreateManyCavisteInput | StockCreateManyCavisteInput[]
    skipDuplicates?: boolean
  }

  export type StockUpsertWithWhereUniqueWithoutCavisteInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutCavisteInput, StockUncheckedUpdateWithoutCavisteInput>
    create: XOR<StockCreateWithoutCavisteInput, StockUncheckedCreateWithoutCavisteInput>
  }

  export type StockUpdateWithWhereUniqueWithoutCavisteInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutCavisteInput, StockUncheckedUpdateWithoutCavisteInput>
  }

  export type StockUpdateManyWithWhereWithoutCavisteInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutCavisteInput>
  }

  export type StockScalarWhereInput = {
    AND?: StockScalarWhereInput | StockScalarWhereInput[]
    OR?: StockScalarWhereInput[]
    NOT?: StockScalarWhereInput | StockScalarWhereInput[]
    id?: IntFilter<"Stock"> | number
    cavisteId?: IntFilter<"Stock"> | number
    vinId?: IntFilter<"Stock"> | number
    quantite?: IntFilter<"Stock"> | number
  }

  export type StockCreateWithoutVinInput = {
    quantite: number
    caviste: CavisteCreateNestedOneWithoutVinsInput
  }

  export type StockUncheckedCreateWithoutVinInput = {
    id?: number
    cavisteId: number
    quantite: number
  }

  export type StockCreateOrConnectWithoutVinInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput>
  }

  export type StockCreateManyVinInputEnvelope = {
    data: StockCreateManyVinInput | StockCreateManyVinInput[]
    skipDuplicates?: boolean
  }

  export type StockUpsertWithWhereUniqueWithoutVinInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutVinInput, StockUncheckedUpdateWithoutVinInput>
    create: XOR<StockCreateWithoutVinInput, StockUncheckedCreateWithoutVinInput>
  }

  export type StockUpdateWithWhereUniqueWithoutVinInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutVinInput, StockUncheckedUpdateWithoutVinInput>
  }

  export type StockUpdateManyWithWhereWithoutVinInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutVinInput>
  }

  export type CavisteCreateWithoutVinsInput = {
    nom: string
    adresse: string
  }

  export type CavisteUncheckedCreateWithoutVinsInput = {
    id?: number
    nom: string
    adresse: string
  }

  export type CavisteCreateOrConnectWithoutVinsInput = {
    where: CavisteWhereUniqueInput
    create: XOR<CavisteCreateWithoutVinsInput, CavisteUncheckedCreateWithoutVinsInput>
  }

  export type VinCreateWithoutStocksInput = {
    nom: string
    domaine: string
    année: number
    prix: number
  }

  export type VinUncheckedCreateWithoutStocksInput = {
    id?: number
    nom: string
    domaine: string
    année: number
    prix: number
  }

  export type VinCreateOrConnectWithoutStocksInput = {
    where: VinWhereUniqueInput
    create: XOR<VinCreateWithoutStocksInput, VinUncheckedCreateWithoutStocksInput>
  }

  export type CavisteUpsertWithoutVinsInput = {
    update: XOR<CavisteUpdateWithoutVinsInput, CavisteUncheckedUpdateWithoutVinsInput>
    create: XOR<CavisteCreateWithoutVinsInput, CavisteUncheckedCreateWithoutVinsInput>
    where?: CavisteWhereInput
  }

  export type CavisteUpdateToOneWithWhereWithoutVinsInput = {
    where?: CavisteWhereInput
    data: XOR<CavisteUpdateWithoutVinsInput, CavisteUncheckedUpdateWithoutVinsInput>
  }

  export type CavisteUpdateWithoutVinsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
  }

  export type CavisteUncheckedUpdateWithoutVinsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
  }

  export type VinUpsertWithoutStocksInput = {
    update: XOR<VinUpdateWithoutStocksInput, VinUncheckedUpdateWithoutStocksInput>
    create: XOR<VinCreateWithoutStocksInput, VinUncheckedCreateWithoutStocksInput>
    where?: VinWhereInput
  }

  export type VinUpdateToOneWithWhereWithoutStocksInput = {
    where?: VinWhereInput
    data: XOR<VinUpdateWithoutStocksInput, VinUncheckedUpdateWithoutStocksInput>
  }

  export type VinUpdateWithoutStocksInput = {
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
  }

  export type VinUncheckedUpdateWithoutStocksInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    domaine?: StringFieldUpdateOperationsInput | string
    année?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
  }

  export type StockCreateManyCavisteInput = {
    id?: number
    vinId: number
    quantite: number
  }

  export type StockUpdateWithoutCavisteInput = {
    quantite?: IntFieldUpdateOperationsInput | number
    vin?: VinUpdateOneRequiredWithoutStocksNestedInput
  }

  export type StockUncheckedUpdateWithoutCavisteInput = {
    id?: IntFieldUpdateOperationsInput | number
    vinId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type StockUncheckedUpdateManyWithoutCavisteInput = {
    id?: IntFieldUpdateOperationsInput | number
    vinId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type StockCreateManyVinInput = {
    id?: number
    cavisteId: number
    quantite: number
  }

  export type StockUpdateWithoutVinInput = {
    quantite?: IntFieldUpdateOperationsInput | number
    caviste?: CavisteUpdateOneRequiredWithoutVinsNestedInput
  }

  export type StockUncheckedUpdateWithoutVinInput = {
    id?: IntFieldUpdateOperationsInput | number
    cavisteId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type StockUncheckedUpdateManyWithoutVinInput = {
    id?: IntFieldUpdateOperationsInput | number
    cavisteId?: IntFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}