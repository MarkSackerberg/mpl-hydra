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
  publicKey,
} from '@metaplex-foundation/umi';

// Accounts.
export type AddMemberNftInstructionAccounts = {
  authority?: Signer;
  fanout: PublicKey;
  membershipAccount: PublicKey;
  mint: PublicKey;
  metadata: PublicKey;
  systemProgram?: PublicKey;
  rent?: PublicKey;
  tokenProgram?: PublicKey;
};

// Arguments.
export type AddMemberNftInstructionData = {
  discriminator: Array<number>;
  shares: bigint;
};

export type AddMemberNftInstructionDataArgs = { shares: number | bigint };

export function getAddMemberNftInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<AddMemberNftInstructionDataArgs, AddMemberNftInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    AddMemberNftInstructionDataArgs,
    AddMemberNftInstructionData,
    AddMemberNftInstructionData
  >(
    s.struct<AddMemberNftInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['shares', s.u64()],
      ],
      { description: 'AddMemberNftInstructionArgs' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [92, 255, 105, 209, 25, 41, 3, 7],
      } as AddMemberNftInstructionData)
  ) as Serializer<AddMemberNftInstructionDataArgs, AddMemberNftInstructionData>;
}

// Instruction.
export function addMemberNft(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: AddMemberNftInstructionAccounts & AddMemberNftInstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = context.programs.get('mplHydra').publicKey;

  // Resolved accounts.
  const authorityAccount = input.authority ?? context.identity;
  const fanoutAccount = input.fanout;
  const membershipAccountAccount = input.membershipAccount;
  const mintAccount = input.mint;
  const metadataAccount = input.metadata;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const rentAccount =
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111');
  const tokenProgramAccount = input.tokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, true),
  });

  // Fanout.
  keys.push({
    pubkey: fanoutAccount,
    isSigner: false,
    isWritable: isWritable(fanoutAccount, true),
  });

  // Membership Account.
  keys.push({
    pubkey: membershipAccountAccount,
    isSigner: false,
    isWritable: isWritable(membershipAccountAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, false),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Rent.
  keys.push({
    pubkey: rentAccount,
    isSigner: false,
    isWritable: isWritable(rentAccount, false),
  });

  // Token Program.
  keys.push({
    pubkey: tokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(tokenProgramAccount, false),
  });

  // Data.
  const data =
    getAddMemberNftInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
