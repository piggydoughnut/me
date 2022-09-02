type Props = {
  text: string;
};
export default function Label({ text }: Props) {
  return (
    <div className="hover:border-purple-400  hover:scale-110 ease-in-out duration-300 rounded w-px-100 h-auto border border-purple-link text-tiny pt-1 pb-1 pl-4 pr-4 uppercase">
      {text}
    </div>
  );
}
