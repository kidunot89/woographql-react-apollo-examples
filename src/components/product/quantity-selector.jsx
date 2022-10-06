import clsx from 'clsx';

const QuantitySelector = (props) => {
  const {
    value,
    onIncrement,
    onDecrement,
    className,
  } = props;

  return (
    <div className={clsx(
      'inline-flex gap-x-3 items-center',
      className && className
    )}>
      <span className="font-sans font-bold">{value}</span>
      <div className="relative inline-block w-20">
        <div
          className={clsx(
            'appearance-none block text-center leading-5',
            'm-0 py-2.5 px-0 h-8',
            'outline-transparent outline outline-2 outline-offset-2',
            'border rounded',
            'quantity-input'
          )}
          type="number"
          value={value}
          readOnly
        />
        <div
          className="icon-button absolute z-10 left-2.5 top-1/2 -translate-y-1/2"
          onClick={onDecrement}
          onKeyPress={onDecrement}
          role="button"
          tabIndex={0}
        >
          <i className="fa-solid fa-minus" />
        </div>
        <div
          className="icon-button absolute z-10 right-2.5 top-1/2 -translate-y-1/2"
          onClick={onIncrement}
          onKeyPress={onIncrement}
          role="button"
          tabIndex={0}
        >
          <i className="fa-solid fa-plus" />
        </div>
      </div>
    </div>
  );
}

export default QuantitySelector;
