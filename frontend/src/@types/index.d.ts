declare interface AppGenericProps {
  children?: React.ReactNode;
  childrenElement: JSX.Element;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>;
}

declare module "*.png" 
