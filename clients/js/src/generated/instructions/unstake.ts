/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi';

// Accounts.
export type UnstakeInstructionAccounts = {
  member: Signer;
  fanout: PublicKey;
  membershipVoucher: PublicKey;
  membershipMint: PublicKey;
  membershipMintTokenAccount: PublicKey;
  memberStakeAccount: PublicKey;
  systemProgram?: PublicKey;
  tokenProgram?: PublicKey;
  instructions: PublicKey;
};

// Arguments.
export type UnstakeInstructionData = { discriminator: Array<number> };

export type UnstakeInstructionDataArgs = {};

export function getUnstakeInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UnstakeInstructionDataArgs, UnstakeInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UnstakeInstructionDataArgs,
    UnstakeInstructionData,
    UnstakeInstructionData
  >(
    s.struct<UnstakeInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'UnstakeInstructionArgs' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [217, 160, 136, 174, 149, 62, 79, 133],
      } as UnstakeInstructionData)
  ) as Serializer<UnstakeInstructionDataArgs, UnstakeInstructionData>;
}

// Instruction.
export function unstake(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: UnstakeInstructionAccounts
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = context.programs.get('mplHydra').publicKey;

  // Resolved accounts.
  const memberAccount = input.member;
  const fanoutAccount = input.fanout;
  const membershipVoucherAccount = input.membershipVoucher;
  const membershipMintAccount = input.membershipMint;
  const membershipMintTokenAccountAccount = input.membershipMintTokenAccount;
  const memberStakeAccountAccount = input.memberStakeAccount;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const tokenProgramAccount = input.tokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const instructionsAccount = input.instructions;

  // Member.
  signers.push(memberAccount);
  keys.push({
    pubkey: memberAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(memberAccount, true),
  });

  // Fanout.
  keys.push({
    pubkey: fanoutAccount,
    isSigner: false,
    isWritable: isWritable(fanoutAccount, true),
  });

  // Membership Voucher.
  keys.push({
    pubkey: membershipVoucherAccount,
    isSigner: false,
    isWritable: isWritable(membershipVoucherAccount, true),
  });

  // Membership Mint.
  keys.push({
    pubkey: membershipMintAccount,
    isSigner: false,
    isWritable: isWritable(membershipMintAccount, true),
  });

  // Membership Mint Token Account.
  keys.push({
    pubkey: membershipMintTokenAccountAccount,
    isSigner: false,
    isWritable: isWritable(membershipMintTokenAccountAccount, true),
  });

  // Member Stake Account.
  keys.push({
    pubkey: memberStakeAccountAccount,
    isSigner: false,
    isWritable: isWritable(memberStakeAccountAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Token Program.
  keys.push({
    pubkey: tokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(tokenProgramAccount, false),
  });

  // Instructions.
  keys.push({
    pubkey: instructionsAccount,
    isSigner: false,
    isWritable: isWritable(instructionsAccount, false),
  });

  // Data.
  const data = getUnstakeInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
