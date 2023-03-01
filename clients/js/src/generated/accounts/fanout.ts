/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Option,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  mapSerializer,
} from '@metaplex-foundation/umi';
import {
  MembershipModel,
  MembershipModelArgs,
  getMembershipModelSerializer,
} from '../types';

export type Fanout = Account<FanoutAccountData>;

export type FanoutAccountData = {
  discriminator: Array<number>;
  authority: PublicKey;
  name: string;
  accountKey: PublicKey;
  totalShares: bigint;
  totalMembers: bigint;
  totalInflow: bigint;
  lastSnapshotAmount: bigint;
  bumpSeed: number;
  accountOwnerBumpSeed: number;
  totalAvailableShares: bigint;
  membershipModel: MembershipModel;
  membershipMint: Option<PublicKey>;
  totalStakedShares: Option<bigint>;
};

export type FanoutAccountDataArgs = {
  authority: PublicKey;
  name: string;
  accountKey: PublicKey;
  totalShares: number | bigint;
  totalMembers: number | bigint;
  totalInflow: number | bigint;
  lastSnapshotAmount: number | bigint;
  bumpSeed: number;
  accountOwnerBumpSeed: number;
  totalAvailableShares: number | bigint;
  membershipModel: MembershipModelArgs;
  membershipMint: Option<PublicKey>;
  totalStakedShares: Option<number | bigint>;
};

export function getFanoutAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<FanoutAccountDataArgs, FanoutAccountData> {
  const s = context.serializer;
  return mapSerializer<
    FanoutAccountDataArgs,
    FanoutAccountData,
    FanoutAccountData
  >(
    s.struct<FanoutAccountData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['authority', s.publicKey()],
        ['name', s.string()],
        ['accountKey', s.publicKey()],
        ['totalShares', s.u64()],
        ['totalMembers', s.u64()],
        ['totalInflow', s.u64()],
        ['lastSnapshotAmount', s.u64()],
        ['bumpSeed', s.u8()],
        ['accountOwnerBumpSeed', s.u8()],
        ['totalAvailableShares', s.u64()],
        ['membershipModel', getMembershipModelSerializer(context)],
        ['membershipMint', s.option(s.publicKey())],
        ['totalStakedShares', s.option(s.u64())],
      ],
      { description: 'Fanout' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [198, 246, 243, 191, 206, 255, 3, 247],
      } as FanoutAccountData)
  ) as Serializer<FanoutAccountDataArgs, FanoutAccountData>;
}

export function deserializeFanout(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): Fanout {
  return deserializeAccount(
    rawAccount,
    getFanoutAccountDataSerializer(context)
  );
}

export async function fetchFanout(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Fanout> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'Fanout');
  return deserializeFanout(context, maybeAccount);
}

export async function safeFetchFanout(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Fanout | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists ? deserializeFanout(context, maybeAccount) : null;
}

export async function fetchAllFanout(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Fanout[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Fanout');
    return deserializeFanout(context, maybeAccount);
  });
}

export async function safeFetchAllFanout(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Fanout[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeFanout(context, maybeAccount as RpcAccount)
    );
}

export function getFanoutGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.get('mplHydra').publicKey;
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      authority: PublicKey;
      name: string;
      accountKey: PublicKey;
      totalShares: number | bigint;
      totalMembers: number | bigint;
      totalInflow: number | bigint;
      lastSnapshotAmount: number | bigint;
      bumpSeed: number;
      accountOwnerBumpSeed: number;
      totalAvailableShares: number | bigint;
      membershipModel: MembershipModelArgs;
      membershipMint: Option<PublicKey>;
      totalStakedShares: Option<number | bigint>;
    }>([
      ['discriminator', s.array(s.u8(), { size: 8 })],
      ['authority', s.publicKey()],
      ['name', s.string()],
      ['accountKey', s.publicKey()],
      ['totalShares', s.u64()],
      ['totalMembers', s.u64()],
      ['totalInflow', s.u64()],
      ['lastSnapshotAmount', s.u64()],
      ['bumpSeed', s.u8()],
      ['accountOwnerBumpSeed', s.u8()],
      ['totalAvailableShares', s.u64()],
      ['membershipModel', getMembershipModelSerializer(context)],
      ['membershipMint', s.option(s.publicKey())],
      ['totalStakedShares', s.option(s.u64())],
    ])
    .deserializeUsing<Fanout>((account) => deserializeFanout(context, account))
    .whereField('discriminator', [198, 246, 243, 191, 206, 255, 3, 247]);
}

export function getFanoutSize(_context = {}): number {
  return 300;
}

export function findFanoutPda(
  context: Pick<Context, 'eddsa' | 'programs' | 'serializer'>,
  seeds: {
    /** The name of the fanout account */
    name: string;
  }
): Pda {
  const s = context.serializer;
  const programId: PublicKey = context.programs.get('mplHydra').publicKey;
  return context.eddsa.findPda(programId, [
    s.string({ size: 'variable' }).serialize('fanout-config'),
    s.string({ size: 'variable' }).serialize(seeds.name),
  ]);
}
