export default interface FieldComponent {
  value: string;
  onChange: (value: string) => void;
  name: string;
}
