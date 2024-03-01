declare module "react-likert-scale" {
  export default class Likert extends React.Component<LikertProps, any> {}

  interface LikertProps {
    responses: ResponseOption[];
  }

  interface ResponseOption {
    value: any;
    text: string;
    checked?: boolean;
  }
}
