export default function Button({text, classes}) {
  const btnClass = classes;

  return (
    <>
      <button className={btnClass}>{text}</button>
    </>
  );
}
