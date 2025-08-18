export default function Button({text, classes, onClick}) {
  const btnClass = classes;

  return (
    <>
      <button className={btnClass} onClick={onClick}>{text}</button>
    </>
  );
}
