type Props = {
  text: string;
};
export default function Label({ text }: Props) {
  return (
    <div className="w-px-100 h-8 border border-purple-link text-tiny p-1">
      {text}
    </div>
  );
}
