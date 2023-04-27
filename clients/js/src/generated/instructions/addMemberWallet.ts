/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  ACCOUNT_HEADER_SIZE,
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  findFanoutMembershipVoucherPda,
  getFanoutMembershipVoucherSize,
} from '../accounts';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type AddMemberWalletInstructionAccounts = {
  authority?: Signer;
  member: PublicKey;
  fanout: PublicKey;
  membershipAccount?: PublicKey;
  systemProgram?: PublicKey;
  rent?: PublicKey;
  tokenProgram?: PublicKey;
};

// Data.
export type AddMemberWalletInstructionData = {
  discriminator: Array<number>;
  shares: bigint;
};

export type AddMemberWalletInstructionDataArgs = { shares: number | bigint };

export function getAddMemberWalletInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  AddMemberWalletInstructionDataArgs,
  AddMemberWalletInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    AddMemberWalletInstructionDataArgs,
    any,
    AddMemberWalletInstructionData
  >(
    s.struct<AddMemberWalletInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['shares', s.u64()],
      ],
      { description: 'AddMemberWalletInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [201, 9, 59, 128, 69, 117, 220, 235],
    })
  ) as Serializer<
    AddMemberWalletInstructionDataArgs,
    AddMemberWalletInstructionData
  >;
}

// Args.
export type AddMemberWalletInstructionArgs = AddMemberWalletInstructionDataArgs;

// Instruction.
export function addMemberWallet(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'identity'>,
  input: AddMemberWalletInstructionAccounts & AddMemberWalletInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplHydra',
      'hyDQ4Nz1eYyegS6JfenyKwKzYxRsCWCriYSAjtzP4Vg'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  addObjectProperty(
    resolvingAccounts,
    'membershipAccount',
    input.membershipAccount ??
      findFanoutMembershipVoucherPda(context, {
        fanout: publicKey(input.fanout),
        member: publicKey(input.member),
      })
  );
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'rent',
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111')
  );
  addObjectProperty(
    resolvingAccounts,
    'tokenProgram',
    input.tokenProgram ?? {
      ...context.programs.getPublicKey(
        'splToken',
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      ),
      isWritable: false,
    }
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, true),
  });

  // Member.
  keys.push({
    pubkey: resolvedAccounts.member,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.member, false),
  });

  // Fanout.
  keys.push({
    pubkey: resolvedAccounts.fanout,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.fanout, true),
  });

  // Membership Account.
  keys.push({
    pubkey: resolvedAccounts.membershipAccount,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.membershipAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Rent.
  keys.push({
    pubkey: resolvedAccounts.rent,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.rent, false),
  });

  // Token Program.
  keys.push({
    pubkey: resolvedAccounts.tokenProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenProgram, false),
  });

  // Data.
  const data =
    getAddMemberWalletInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain =
    getFanoutMembershipVoucherSize() + ACCOUNT_HEADER_SIZE;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
