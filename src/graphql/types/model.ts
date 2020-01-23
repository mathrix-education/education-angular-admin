export type ModelId = string | number;

/**
 * The base model used in the sdk.
 */
export interface Model<T extends ModelId = ModelId> {
  readonly id: T;
}

/**
 * A model with dates attributes.
 * @see Model
 */
export type ModelWithDates<T extends ModelId = ModelId> = Model<T> & {
  readonly created_at: Date;
  readonly updated_at: Date;
};

/**
 * An model that can be ordered in a collection.
 * @see Model
 */
export type ModelWithOrder<T extends ModelId = ModelId> = Model<T> & { order: number };

/**
 * The combination of a ModelWithOrder and a ModelWithDates.
 * @see ModelWithDates
 * @see ModelWithOrder
 */
export type ModelWithDatesOrder<T extends ModelId = ModelId> = ModelWithDates<T> & ModelWithOrder<T>;
