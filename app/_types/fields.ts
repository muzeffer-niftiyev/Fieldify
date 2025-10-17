export interface FieldParams {
  params: {
    fieldId: number;
  };
}

export type TextToggleProps = {
  children: string;
};

export type EventType = React.ChangeEvent<HTMLSelectElement>;


export type DaySelectorPropTypes = {
  start: Date;
  end: Date;
}

type ReservedByDate = Record<string, number[]>;

export interface HourRangeProps {
  reservedByDate: ReservedByDate;
}