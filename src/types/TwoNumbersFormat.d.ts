import type { DelimiterNoSpace } from "types/DelimiterNoSpace";

type TemplateLiteralPart = string | number;
type Delimiter = " " | "/" | "-";

type TwoParts<
  D extends Delimiter,
  T extends TemplateLiteralPart,
  K extends TemplateLiteralPart,
> = `${T}${D}${K}`;

type SameKind<D extends Delimiter> =
  | TwoParts<D, number, number>
  | TwoParts<D, string, string>;

type WithLeftGeneric<D extends Delimiter, T extends TemplateLiteralPart> =
  | TwoParts<D, T, number>
  | TwoParts<D, T, string>;

type WithRightGeneric<D extends Delimiter, T extends TemplateLiteralPart> =
  | TwoParts<D, number, T>
  | TwoParts<D, string, T>;

export type TwoNumbersWithSpaceWithGenerics<
  T extends TemplateLiteralPart = number,
  K extends TemplateLiteralPart = number,
> = TwoParts<" ", T, K>;
export type TwoNumbersWithSpaceWithLeftGeneric<T extends TemplateLiteralPart> = WithLeftGeneric<" ", T>;
export type TwoNumbersWithSpaceWithRightGeneric<T extends TemplateLiteralPart> = WithRightGeneric<" ", T>;
export type TwoNumbersWithSpace = SameKind<" ">;


export type TwoNumbersWithSlashWithGenerics<
  T extends TemplateLiteralPart = number,
  K extends TemplateLiteralPart = number,
> = TwoParts<"/", T, K>;
export type TwoNumbersWithSlashWithLeftGeneric<T extends TemplateLiteralPart> = WithLeftGeneric<"/", T>;
export type TwoNumbersWithSlashWithRightGeneric<T extends TemplateLiteralPart> = WithRightGeneric<"/", T>;
export type TwoNumbersWithSlash = SameKind<"/">;

export type TwoNumbersWithHyphenWithGenerics<
  T extends TemplateLiteralPart = number,
  K extends TemplateLiteralPart = number,
> = TwoParts<"-", T, K>;
export type TwoNumbersWithHyphenWithLeftGeneric<T extends TemplateLiteralPart> = WithLeftGeneric<"-", T>;
export type TwoNumbersWithHyphenWithRightGeneric<T extends TemplateLiteralPart> = WithRightGeneric<"-", T>;
export type TwoNumbersWithHyphen = SameKind<"-">;

export type TwoNumbersWithOutSpace = SameKind<"/"> | SameKind<"-">;
export type TwoNumbers = TwoNumbersWithOutSpace | TwoNumbersWithSpace;

export type TwoNumbersWithGenerics<
  T extends TemplateLiteralPart = number,
  K extends TemplateLiteralPart = number,
> = `${T}${Delimiter}${K}`;

export type TwoNumbersWithOutSpaceWithGenerics<
  T extends TemplateLiteralPart = number,
  K extends TemplateLiteralPart = number,
> = `${T}${DelimiterNoSpace}${K}`;

export type TwoNumbersWithLeftGeneric<T extends TemplateLiteralPart> =
  | TwoNumbersWithGenerics<T, number>
  | TwoNumbersWithGenerics<T, string>;

export type TwoNumbersWithRightGeneric<T extends TemplateLiteralPart> =
  | TwoNumbersWithGenerics<number, T>
  | TwoNumbersWithGenerics<string, T>;

export type TwoNumbersWithOutSpaceWithLeftGeneric<T extends TemplateLiteralPart> =
  | TwoNumbersWithOutSpaceWithGenerics<T, number>
  | TwoNumbersWithOutSpaceWithGenerics<T, string>;

export type TwoNumbersWithOutSpaceWithRightGeneric<T extends TemplateLiteralPart> =
  | TwoNumbersWithOutSpaceWithGenerics<number, T>
  | TwoNumbersWithOutSpaceWithGenerics<string, T>;
