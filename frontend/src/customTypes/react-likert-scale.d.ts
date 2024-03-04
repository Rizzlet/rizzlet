declare module "react-likert-scale" {
  export default class Likert<T extends ResponseOption> extends React.Component<
    LikertProps<T>,
    any
  > {}

  interface LikertProps<T extends ResponseOption> {
    responses: T[];
    onChange?: (obj: T) => void;
    className?: string;
  }

  interface ResponseOption {
    value: any;
    text: string;
    checked?: boolean;
  }
}
