export const GamePresentationDirection = {
    OriginalToExpectation: 0,
    ExpectationToOriginal: 1,
  } as const;

export type GamePresentationDirectionType = typeof GamePresentationDirection[keyof typeof GamePresentationDirection];