import Logo from './Logo';
import Nav from './Nav';

export default function Title({ title }) {
  return (
    <div className="text-start card-dapp">
      <div className="container px-4 py-2">
        <p className='tx-lg tx-bold m-0'>{title}</p>
      </div>
    </div>
  );
}
