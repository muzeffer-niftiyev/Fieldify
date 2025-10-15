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